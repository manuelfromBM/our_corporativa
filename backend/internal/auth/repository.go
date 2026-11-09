package auth

import (
	"context"
	"database/sql"
	"errors"
	"time"

	"backend/internal/platform/database"
	"backend/internal/platform/httpx"
)

type Repository struct {
	db *sql.DB
}

func NewRepository(db *sql.DB) *Repository {
	return &Repository{db: db}
}

// credentialsByEmail devuelve nil si el correo no existe.
func (r *Repository) credentialsByEmail(ctx context.Context, email string) (*credentials, error) {
	var c credentials
	var hash sql.NullString
	err := r.db.QueryRowContext(ctx,
		`SELECT id, correo, nombre, rol, hash_contrasena, activo FROM usuarios WHERE correo = $1`, email,
	).Scan(&c.user.ID, &c.user.Email, &c.user.Name, &c.user.Role, &hash, &c.active)
	if errors.Is(err, sql.ErrNoRows) {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	c.passwordHash = hash.String
	return &c, nil
}

func (r *Repository) createSession(ctx context.Context, userID int64, tokenHash string, expires time.Time) error {
	_, err := r.db.ExecContext(ctx,
		`INSERT INTO sesiones (usuario_id, hash_token, expira_en) VALUES ($1, $2, $3)`,
		userID, tokenHash, database.Time(expires))
	return err
}

// userBySession devuelve nil si la sesión no existe, venció o la cuenta está desactivada.
func (r *Repository) userBySession(ctx context.Context, tokenHash string, now time.Time) (*User, error) {
	var u User
	err := r.db.QueryRowContext(ctx,
		`SELECT u.id, u.correo, u.nombre, u.rol
		 FROM sesiones s JOIN usuarios u ON u.id = s.usuario_id
		 WHERE s.hash_token = $1 AND s.expira_en > $2 AND u.activo = TRUE`,
		tokenHash, database.Time(now),
	).Scan(&u.ID, &u.Email, &u.Name, &u.Role)
	if errors.Is(err, sql.ErrNoRows) {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	return &u, nil
}

func (r *Repository) deleteSession(ctx context.Context, tokenHash string) error {
	_, err := r.db.ExecContext(ctx, `DELETE FROM sesiones WHERE hash_token = $1`, tokenHash)
	return err
}

func (r *Repository) deleteUserSessions(ctx context.Context, userID int64) error {
	_, err := r.db.ExecContext(ctx, `DELETE FROM sesiones WHERE usuario_id = $1`, userID)
	return err
}

// purge borra sesiones vencidas e intentos antiguos para que las tablas no crezcan sin límite.
func (r *Repository) purge(ctx context.Context, now time.Time) error {
	if _, err := r.db.ExecContext(ctx, `DELETE FROM sesiones WHERE expira_en <= $1`, database.Time(now)); err != nil {
		return err
	}
	_, err := r.db.ExecContext(ctx, `DELETE FROM intentos_acceso WHERE intentado_en < $1`, database.Time(now.Add(-24*time.Hour)))
	return err
}

func (r *Repository) countAttempts(ctx context.Context, key string, since time.Time) (int, error) {
	var n int
	err := r.db.QueryRowContext(ctx,
		`SELECT COUNT(*) FROM intentos_acceso WHERE clave = $1 AND intentado_en > $2`, key, database.Time(since),
	).Scan(&n)
	return n, err
}

func (r *Repository) addAttempt(ctx context.Context, key string, at time.Time) error {
	_, err := r.db.ExecContext(ctx, `INSERT INTO intentos_acceso (clave, intentado_en) VALUES ($1, $2)`, key, database.Time(at))
	return err
}

func (r *Repository) clearAttempts(ctx context.Context, key string) error {
	_, err := r.db.ExecContext(ctx, `DELETE FROM intentos_acceso WHERE clave = $1`, key)
	return err
}

// replaceToken crea un token e invalida los anteriores del mismo propósito.
func (r *Repository) replaceToken(ctx context.Context, userID int64, purpose, tokenHash string, now, expires time.Time) error {
	tx, err := r.db.BeginTx(ctx, nil)
	if err != nil {
		return err
	}
	defer tx.Rollback()

	if _, err := tx.ExecContext(ctx,
		`UPDATE tokens_usuario SET usado_en = $1 WHERE usuario_id = $2 AND proposito = $3 AND usado_en IS NULL`,
		database.Time(now), userID, purpose,
	); err != nil {
		return err
	}
	if _, err := tx.ExecContext(ctx,
		`INSERT INTO tokens_usuario (usuario_id, proposito, hash_token, expira_en) VALUES ($1, $2, $3, $4)`,
		userID, purpose, tokenHash, database.Time(expires),
	); err != nil {
		return err
	}
	return tx.Commit()
}

// consumeToken gasta el token, fija la contraseña y cierra las sesiones abiertas, todo o nada.
func (r *Repository) consumeToken(ctx context.Context, tokenHash, passwordHash string, now time.Time) error {
	tx, err := r.db.BeginTx(ctx, nil)
	if err != nil {
		return err
	}
	defer tx.Rollback()

	ts := database.Time(now)
	var userID int64
	err = tx.QueryRowContext(ctx,
		`UPDATE tokens_usuario SET usado_en = $1
		 WHERE hash_token = $2 AND usado_en IS NULL AND expira_en > $3
		   AND usuario_id IN (SELECT id FROM usuarios WHERE activo = TRUE)
		 RETURNING usuario_id`,
		ts, tokenHash, ts,
	).Scan(&userID)
	if errors.Is(err, sql.ErrNoRows) {
		return httpx.Invalid("el enlace no es válido o ya venció")
	}
	if err != nil {
		return err
	}

	if _, err := tx.ExecContext(ctx,
		`UPDATE usuarios SET hash_contrasena = $1, actualizado_en = $2 WHERE id = $3`, passwordHash, ts, userID,
	); err != nil {
		return err
	}
	if _, err := tx.ExecContext(ctx, `DELETE FROM sesiones WHERE usuario_id = $1`, userID); err != nil {
		return err
	}
	return tx.Commit()
}

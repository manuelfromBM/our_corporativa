package accounts

import (
	"context"
	"database/sql"
	"errors"
	"time"

	"backend/internal/platform/database"
	"backend/internal/platform/httpx"
)

var errNotFound = httpx.NotFound("usuario no encontrado")

type Repository struct {
	db *sql.DB
}

func NewRepository(db *sql.DB) *Repository {
	return &Repository{db: db}
}

func (r *Repository) count(ctx context.Context) (int, error) {
	var n int
	err := r.db.QueryRowContext(ctx, `SELECT COUNT(*) FROM usuarios`).Scan(&n)
	return n, err
}

const accountColumns = `id, correo, nombre, rol, activo, hash_contrasena IS NULL, creado_en`

func scanAccount(row interface{ Scan(...any) error }) (Account, error) {
	a := Account{ClientIDs: []int64{}}
	err := row.Scan(&a.ID, &a.Email, &a.Name, &a.Role, &a.Active, &a.Pending, &a.CreatedAt)
	return a, err
}

func (r *Repository) list(ctx context.Context) ([]Account, error) {
	rows, err := r.db.QueryContext(ctx, `SELECT `+accountColumns+` FROM usuarios ORDER BY id`)
	if err != nil {
		return nil, err
	}
	list := []Account{}
	index := map[int64]int{}
	for rows.Next() {
		a, err := scanAccount(rows)
		if err != nil {
			rows.Close()
			return nil, err
		}
		index[a.ID] = len(list)
		list = append(list, a)
	}
	rows.Close()
	if err := rows.Err(); err != nil {
		return nil, err
	}

	rows, err = r.db.QueryContext(ctx, `SELECT usuario_id, cliente_id FROM cliente_usuarios ORDER BY cliente_id`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		var userID, clientID int64
		if err := rows.Scan(&userID, &clientID); err != nil {
			return nil, err
		}
		if i, ok := index[userID]; ok {
			list[i].ClientIDs = append(list[i].ClientIDs, clientID)
		}
	}
	return list, rows.Err()
}

func (r *Repository) get(ctx context.Context, id int64) (*Account, error) {
	a, err := scanAccount(r.db.QueryRowContext(ctx, `SELECT `+accountColumns+` FROM usuarios WHERE id = $1`, id))
	if errors.Is(err, sql.ErrNoRows) {
		return nil, errNotFound
	}
	if err != nil {
		return nil, err
	}

	rows, err := r.db.QueryContext(ctx, `SELECT cliente_id FROM cliente_usuarios WHERE usuario_id = $1 ORDER BY cliente_id`, id)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		var clientID int64
		if err := rows.Scan(&clientID); err != nil {
			return nil, err
		}
		a.ClientIDs = append(a.ClientIDs, clientID)
	}
	return &a, rows.Err()
}

// create guarda el usuario y sus clientes juntos. passwordHash vacío deja la cuenta pendiente.
func (r *Repository) create(ctx context.Context, in CreateInput, passwordHash string) (int64, error) {
	tx, err := r.db.BeginTx(ctx, nil)
	if err != nil {
		return 0, err
	}
	defer tx.Rollback()

	var memberID sql.NullInt64
	if in.MemberSlug != "" {
		err := tx.QueryRowContext(ctx, `SELECT id FROM miembros WHERE slug = $1`, in.MemberSlug).Scan(&memberID)
		if errors.Is(err, sql.ErrNoRows) {
			return 0, httpx.Invalid("el integrante indicado no existe")
		}
		if err != nil {
			return 0, err
		}
	}

	hash := sql.NullString{String: passwordHash, Valid: passwordHash != ""}
	var id int64
	err = tx.QueryRowContext(ctx,
		`INSERT INTO usuarios (correo, nombre, hash_contrasena, rol, miembro_id) VALUES ($1, $2, $3, $4, $5) RETURNING id`,
		in.Email, in.Name, hash, in.Role, memberID,
	).Scan(&id)
	if database.IsUnique(err) {
		return 0, httpx.Conflict("ya existe una cuenta con ese correo")
	}
	if err != nil {
		return 0, err
	}
	if err := insertClients(ctx, tx, id, in.ClientIDs); err != nil {
		return 0, err
	}
	return id, tx.Commit()
}

func (r *Repository) update(ctx context.Context, id int64, name, role string, active bool) error {
	_, err := r.db.ExecContext(ctx,
		`UPDATE usuarios SET nombre = $1, rol = $2, activo = $3, actualizado_en = $4 WHERE id = $5`,
		name, role, active, database.Time(time.Now()), id,
	)
	return err
}

func (r *Repository) setClients(ctx context.Context, userID int64, clientIDs []int64) error {
	tx, err := r.db.BeginTx(ctx, nil)
	if err != nil {
		return err
	}
	defer tx.Rollback()

	if _, err := tx.ExecContext(ctx, `DELETE FROM cliente_usuarios WHERE usuario_id = $1`, userID); err != nil {
		return err
	}
	if err := insertClients(ctx, tx, userID, clientIDs); err != nil {
		return err
	}
	return tx.Commit()
}

func insertClients(ctx context.Context, tx *sql.Tx, userID int64, clientIDs []int64) error {
	for _, clientID := range clientIDs {
		_, err := tx.ExecContext(ctx,
			`INSERT INTO cliente_usuarios (cliente_id, usuario_id) VALUES ($1, $2) ON CONFLICT DO NOTHING`, clientID, userID)
		if database.IsForeignKey(err) {
			return httpx.Invalid("uno de los clientes indicados no existe")
		}
		if err != nil {
			return err
		}
	}
	return nil
}

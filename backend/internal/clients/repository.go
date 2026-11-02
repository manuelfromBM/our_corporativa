package clients

import (
	"context"
	"database/sql"
	"errors"
	"time"

	"backend/internal/platform/database"
	"backend/internal/platform/httpx"
)

var errNotFound = httpx.NotFound("cliente no encontrado")

const columns = `id, name, contact_name, email, phone, created_at, updated_at`

type Repository struct {
	db *sql.DB
}

func NewRepository(db *sql.DB) *Repository {
	return &Repository{db: db}
}

func scanClient(row interface{ Scan(...any) error }) (Client, error) {
	var c Client
	err := row.Scan(&c.ID, &c.Name, &c.ContactName, &c.Email, &c.Phone, &c.CreatedAt, &c.UpdatedAt)
	return c, err
}

func (r *Repository) list(ctx context.Context) ([]Client, error) {
	rows, err := r.db.QueryContext(ctx, `SELECT `+columns+` FROM clients ORDER BY name`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	list := []Client{}
	for rows.Next() {
		c, err := scanClient(rows)
		if err != nil {
			return nil, err
		}
		list = append(list, c)
	}
	return list, rows.Err()
}

func (r *Repository) get(ctx context.Context, id int64) (*Client, error) {
	c, err := scanClient(r.db.QueryRowContext(ctx, `SELECT `+columns+` FROM clients WHERE id = $1`, id))
	if errors.Is(err, sql.ErrNoRows) {
		return nil, errNotFound
	}
	if err != nil {
		return nil, err
	}
	return &c, nil
}

func (r *Repository) create(ctx context.Context, in Input) (int64, error) {
	var id int64
	err := r.db.QueryRowContext(ctx,
		`INSERT INTO clients (name, contact_name, email, phone) VALUES ($1, $2, $3, $4) RETURNING id`,
		in.Name, in.ContactName, in.Email, in.Phone,
	).Scan(&id)
	return id, err
}

func (r *Repository) update(ctx context.Context, id int64, in Input) error {
	res, err := r.db.ExecContext(ctx,
		`UPDATE clients SET name = $1, contact_name = $2, email = $3, phone = $4, updated_at = $5 WHERE id = $6`,
		in.Name, in.ContactName, in.Email, in.Phone, database.Time(time.Now()), id,
	)
	if err != nil {
		return err
	}
	if n, err := res.RowsAffected(); err != nil {
		return err
	} else if n == 0 {
		return errNotFound
	}
	return nil
}

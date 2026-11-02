package database

import (
	"database/sql"
	"errors"
	"time"

	"github.com/jackc/pgx/v5/pgconn"
	_ "github.com/jackc/pgx/v5/stdlib"
)

// Open abre la conexión a Postgres. El esquema lo aplica Migrate.
func Open(url string) (*sql.DB, error) {
	db, err := sql.Open("pgx", url)
	if err != nil {
		return nil, err
	}
	db.SetMaxOpenConns(10)

	if err := db.Ping(); err != nil {
		db.Close()
		return nil, err
	}
	return db, nil
}

// Time formatea t igual que el DEFAULT de las tablas, para poder comparar fechas como texto.
func Time(t time.Time) string {
	return t.UTC().Format("2006-01-02T15:04:05Z")
}

// IsUnique indica si err viene de una restricción UNIQUE o de clave primaria.
func IsUnique(err error) bool {
	return pgCode(err) == "23505"
}

// IsForeignKey indica si err viene de una clave foránea que apunta a un registro inexistente.
func IsForeignKey(err error) bool {
	return pgCode(err) == "23503"
}

func pgCode(err error) string {
	var e *pgconn.PgError
	if errors.As(err, &e) {
		return e.Code
	}
	return ""
}

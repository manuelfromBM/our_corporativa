package database

import (
	"context"
	"database/sql"
	"embed"
	"fmt"
	"log"
	"strings"
)

//go:embed migrations/*.sql
var migrations embed.FS

const suffix = ".up.sql"

// Migrate aplica en orden las migraciones pendientes, cada una en su propia transacción.
func Migrate(ctx context.Context, db *sql.DB) error {
	if _, err := db.ExecContext(ctx, `CREATE TABLE IF NOT EXISTS schema_migrations (
		version    TEXT PRIMARY KEY,
		applied_at TEXT NOT NULL DEFAULT (to_char(now() AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'))
	)`); err != nil {
		return err
	}

	// ReadDir entrega los archivos ordenados por nombre.
	entries, err := migrations.ReadDir("migrations")
	if err != nil {
		return err
	}
	for _, e := range entries {
		if !strings.HasSuffix(e.Name(), suffix) {
			continue
		}
		version := strings.TrimSuffix(e.Name(), suffix)
		var applied int
		if err := db.QueryRowContext(ctx, `SELECT COUNT(*) FROM schema_migrations WHERE version = $1`, version).Scan(&applied); err != nil {
			return err
		}
		if applied > 0 {
			continue
		}
		if err := apply(ctx, db, version, e.Name()); err != nil {
			return fmt.Errorf("migración %s: %w", version, err)
		}
		log.Printf("migración aplicada: %s", version)
	}
	return nil
}

func apply(ctx context.Context, db *sql.DB, version, file string) error {
	script, err := migrations.ReadFile("migrations/" + file)
	if err != nil {
		return err
	}
	tx, err := db.BeginTx(ctx, nil)
	if err != nil {
		return err
	}
	defer tx.Rollback()

	if _, err := tx.ExecContext(ctx, string(script)); err != nil {
		return err
	}
	if _, err := tx.ExecContext(ctx, `INSERT INTO schema_migrations (version) VALUES ($1)`, version); err != nil {
		return err
	}
	return tx.Commit()
}

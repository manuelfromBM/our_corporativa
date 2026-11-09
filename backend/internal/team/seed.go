package team

import (
	"context"
	"database/sql"
	_ "embed"
	"encoding/json"
)

// team.json se generó a partir de frontend/.../ProfileTeamData.ts.
//
//go:embed seed/team.json
var teamJSON []byte

// Seed carga los datos iniciales del equipo si la tabla miembros está vacía.
func Seed(ctx context.Context, db *sql.DB) error {
	var count int
	if err := db.QueryRowContext(ctx, `SELECT COUNT(*) FROM miembros`).Scan(&count); err != nil {
		return err
	}
	if count > 0 {
		return nil
	}

	var members []Member
	if err := json.Unmarshal(teamJSON, &members); err != nil {
		return err
	}

	tx, err := db.BeginTx(ctx, nil)
	if err != nil {
		return err
	}
	defer tx.Rollback()

	for i, m := range members {
		if err := insertMember(tx, i, m); err != nil {
			return err
		}
	}
	return tx.Commit()
}

func insertMember(tx *sql.Tx, pos int, m Member) error {
	var id int64
	err := tx.QueryRow(
		`INSERT INTO miembros (slug, iniciales, imagen, texto_alternativo, insignia, nombre, cargo, bio_tecnica, bio_negocio, posicion)
		 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`,
		m.Slug, m.Initials, m.Img, m.Alt, m.Badge, m.Name, m.Role, m.Tech.Bio, m.Biz.Bio, pos,
	).Scan(&id)
	if err != nil {
		return err
	}

	for i, e := range m.Tech.Experience {
		if _, err := tx.Exec(
			`INSERT INTO miembro_experiencias (miembro_id, empresa, cargo, periodo, descripcion, posicion) VALUES ($1, $2, $3, $4, $5, $6)`,
			id, e.Company, e.Role, e.Period, e.Description, i,
		); err != nil {
			return err
		}
	}
	for i, e := range m.Tech.Education {
		if _, err := tx.Exec(
			`INSERT INTO miembro_estudios (miembro_id, institucion, titulo, periodo, posicion) VALUES ($1, $2, $3, $4, $5)`,
			id, e.Institution, e.Degree, e.Period, i,
		); err != nil {
			return err
		}
	}
	for i, s := range m.Tech.Stats {
		if _, err := tx.Exec(
			`INSERT INTO miembro_estadisticas (miembro_id, valor, etiqueta, posicion) VALUES ($1, $2, $3, $4)`,
			id, s.Value, s.Label, i,
		); err != nil {
			return err
		}
	}
	for i, s := range m.Tech.Skills {
		if _, err := tx.Exec(`INSERT INTO miembro_habilidades (miembro_id, nombre, posicion) VALUES ($1, $2, $3)`, id, s, i); err != nil {
			return err
		}
	}
	for i, t := range m.Tech.Tools {
		if _, err := tx.Exec(`INSERT INTO miembro_herramientas (miembro_id, nombre, posicion) VALUES ($1, $2, $3)`, id, t, i); err != nil {
			return err
		}
	}
	for i, lib := range m.Tech.Libraries {
		var catID int64
		err := tx.QueryRow(
			`INSERT INTO miembro_categorias_librerias (miembro_id, categoria, posicion) VALUES ($1, $2, $3) RETURNING id`,
			id, lib.Category, i,
		).Scan(&catID)
		if err != nil {
			return err
		}
		for j, item := range lib.Items {
			if _, err := tx.Exec(
				`INSERT INTO miembro_librerias (categoria_id, nombre, posicion) VALUES ($1, $2, $3)`,
				catID, item, j,
			); err != nil {
				return err
			}
		}
	}
	for i, c := range m.Biz.Cards {
		if _, err := tx.Exec(
			`INSERT INTO miembro_tarjetas_negocio (miembro_id, icono, titulo, descripcion, posicion) VALUES ($1, $2, $3, $4, $5)`,
			id, c.Icon, c.Title, c.Desc, i,
		); err != nil {
			return err
		}
	}
	return nil
}

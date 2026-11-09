package team

import (
	"context"
	"database/sql"
	"encoding/json"
	"errors"

	"backend/internal/platform/httpx"
)

var errNotFound = httpx.NotFound("miembro no encontrado")

type Repository struct {
	db *sql.DB
}

func NewRepository(db *sql.DB) *Repository {
	return &Repository{db: db}
}

// memberJSON arma el perfil completo de m en Postgres con la forma de Member, para
// traerlo en una sola consulta: con la base lejos, cada viaje extra se nota.
const memberJSON = `json_build_object(
	'slug', m.slug, 'initials', m.iniciales, 'img', m.imagen, 'alt', m.texto_alternativo,
	'badge', m.insignia, 'name', m.nombre, 'role', m.cargo,
	'tech', json_build_object(
		'bio', m.bio_tecnica,
		'experience', COALESCE((SELECT json_agg(json_build_object('company', e.empresa, 'role', e.cargo, 'period', e.periodo, 'description', e.descripcion) ORDER BY e.posicion)
			FROM miembro_experiencias e WHERE e.miembro_id = m.id), '[]'::json),
		'education', COALESCE((SELECT json_agg(json_build_object('institution', e.institucion, 'degree', e.titulo, 'period', e.periodo) ORDER BY e.posicion)
			FROM miembro_estudios e WHERE e.miembro_id = m.id), '[]'::json),
		'stats', COALESCE((SELECT json_agg(json_build_object('value', s.valor, 'label', s.etiqueta) ORDER BY s.posicion)
			FROM miembro_estadisticas s WHERE s.miembro_id = m.id), '[]'::json),
		'skills', COALESCE((SELECT json_agg(h.nombre ORDER BY h.posicion)
			FROM miembro_habilidades h WHERE h.miembro_id = m.id), '[]'::json),
		'tools', COALESCE((SELECT json_agg(h.nombre ORDER BY h.posicion)
			FROM miembro_herramientas h WHERE h.miembro_id = m.id), '[]'::json),
		'libraries', COALESCE((SELECT json_agg(json_build_object('category', c.categoria, 'items', COALESCE((SELECT json_agg(l.nombre ORDER BY l.posicion)
			FROM miembro_librerias l WHERE l.categoria_id = c.id), '[]'::json)) ORDER BY c.posicion)
			FROM miembro_categorias_librerias c WHERE c.miembro_id = m.id), '[]'::json)
	),
	'biz', json_build_object(
		'bio', m.bio_negocio,
		'cards', COALESCE((SELECT json_agg(json_build_object('icon', t.icono, 'title', t.titulo, 'desc', t.descripcion) ORDER BY t.posicion)
			FROM miembro_tarjetas_negocio t WHERE t.miembro_id = m.id), '[]'::json)
	)
)`

// GetAll devuelve todos los miembros con su perfil completo, en el orden original.
func (r *Repository) GetAll(ctx context.Context) ([]Member, error) {
	var raw []byte
	err := r.db.QueryRowContext(ctx,
		`SELECT COALESCE(json_agg(`+memberJSON+` ORDER BY m.posicion), '[]'::json) FROM miembros m`,
	).Scan(&raw)
	if err != nil {
		return nil, err
	}
	members := []Member{}
	return members, json.Unmarshal(raw, &members)
}

// GetSlugs devuelve solo los slugs, para generar las rutas en el frontend.
func (r *Repository) GetSlugs(ctx context.Context) ([]string, error) {
	return queryList(ctx, r.db, `SELECT slug FROM miembros ORDER BY posicion`, nil, scanString)
}

func (r *Repository) GetBySlug(ctx context.Context, slug string) (*Member, error) {
	var raw []byte
	err := r.db.QueryRowContext(ctx, `SELECT `+memberJSON+` FROM miembros m WHERE m.slug = $1`, slug).Scan(&raw)
	if errors.Is(err, sql.ErrNoRows) {
		return nil, errNotFound
	}
	if err != nil {
		return nil, err
	}
	var m Member
	if err := json.Unmarshal(raw, &m); err != nil {
		return nil, err
	}
	return &m, nil
}

// queryList ejecuta query (con un parámetro opcional) y mapea cada fila con scan.
// Devuelve un slice vacío (no nil) para que el JSON sea [] en los campos obligatorios.
func queryList[T any](ctx context.Context, db *sql.DB, query string, arg any, scan func(*sql.Rows) (T, error)) ([]T, error) {
	args := []any{}
	if arg != nil {
		args = append(args, arg)
	}
	rows, err := db.QueryContext(ctx, query, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	list := []T{}
	for rows.Next() {
		item, err := scan(rows)
		if err != nil {
			return nil, err
		}
		list = append(list, item)
	}
	return list, rows.Err()
}

func scanString(rows *sql.Rows) (string, error) {
	var s string
	return s, rows.Scan(&s)
}

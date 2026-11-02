package team

import (
	"context"
	"database/sql"
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

// GetAll devuelve todos los miembros con su perfil completo, en el orden original.
func (r *Repository) GetAll(ctx context.Context) ([]Member, error) {
	ids, err := queryList(ctx, r.db, `SELECT id FROM members ORDER BY position`, nil, func(rows *sql.Rows) (int64, error) {
		var id int64
		return id, rows.Scan(&id)
	})
	if err != nil {
		return nil, err
	}

	members := make([]Member, 0, len(ids))
	for _, id := range ids {
		m, err := r.getByID(ctx, id)
		if err != nil {
			return nil, err
		}
		members = append(members, *m)
	}
	return members, nil
}

// GetSlugs devuelve solo los slugs, para generar las rutas en el frontend.
func (r *Repository) GetSlugs(ctx context.Context) ([]string, error) {
	return queryList(ctx, r.db, `SELECT slug FROM members ORDER BY position`, nil, scanString)
}

func (r *Repository) GetBySlug(ctx context.Context, slug string) (*Member, error) {
	var id int64
	err := r.db.QueryRowContext(ctx, `SELECT id FROM members WHERE slug = $1`, slug).Scan(&id)
	if errors.Is(err, sql.ErrNoRows) {
		return nil, errNotFound
	}
	if err != nil {
		return nil, err
	}
	return r.getByID(ctx, id)
}

func (r *Repository) getByID(ctx context.Context, id int64) (*Member, error) {
	var m Member
	err := r.db.QueryRowContext(ctx,
		`SELECT slug, initials, img, alt, badge, name, role, tech_bio, biz_bio FROM members WHERE id = $1`, id,
	).Scan(&m.Slug, &m.Initials, &m.Img, &m.Alt, &m.Badge, &m.Name, &m.Role, &m.Tech.Bio, &m.Biz.Bio)
	if err != nil {
		return nil, err
	}

	if m.Tech.Experience, err = queryList(ctx, r.db,
		`SELECT company, role, period, description FROM member_experience WHERE member_id = $1 ORDER BY position`, id,
		func(rows *sql.Rows) (Experience, error) {
			var e Experience
			return e, rows.Scan(&e.Company, &e.Role, &e.Period, &e.Description)
		}); err != nil {
		return nil, err
	}

	if m.Tech.Education, err = queryList(ctx, r.db,
		`SELECT institution, degree, period FROM member_education WHERE member_id = $1 ORDER BY position`, id,
		func(rows *sql.Rows) (Education, error) {
			var e Education
			return e, rows.Scan(&e.Institution, &e.Degree, &e.Period)
		}); err != nil {
		return nil, err
	}

	if m.Tech.Stats, err = queryList(ctx, r.db,
		`SELECT value, label FROM member_stats WHERE member_id = $1 ORDER BY position`, id,
		func(rows *sql.Rows) (Stat, error) {
			var s Stat
			return s, rows.Scan(&s.Value, &s.Label)
		}); err != nil {
		return nil, err
	}

	if m.Tech.Skills, err = queryList(ctx, r.db,
		`SELECT name FROM member_skills WHERE member_id = $1 ORDER BY position`, id, scanString); err != nil {
		return nil, err
	}

	if m.Tech.Tools, err = queryList(ctx, r.db,
		`SELECT name FROM member_tools WHERE member_id = $1 ORDER BY position`, id, scanString); err != nil {
		return nil, err
	}

	type category struct {
		id   int64
		name string
	}
	cats, err := queryList(ctx, r.db,
		`SELECT id, category FROM member_library_categories WHERE member_id = $1 ORDER BY position`, id,
		func(rows *sql.Rows) (category, error) {
			var c category
			return c, rows.Scan(&c.id, &c.name)
		})
	if err != nil {
		return nil, err
	}
	for _, c := range cats {
		items, err := queryList(ctx, r.db,
			`SELECT name FROM member_library_items WHERE category_id = $1 ORDER BY position`, c.id, scanString)
		if err != nil {
			return nil, err
		}
		m.Tech.Libraries = append(m.Tech.Libraries, LibraryCategory{Category: c.name, Items: items})
	}

	if m.Biz.Cards, err = queryList(ctx, r.db,
		`SELECT icon, title, description FROM member_biz_cards WHERE member_id = $1 ORDER BY position`, id,
		func(rows *sql.Rows) (BizCard, error) {
			var c BizCard
			return c, rows.Scan(&c.Icon, &c.Title, &c.Desc)
		}); err != nil {
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

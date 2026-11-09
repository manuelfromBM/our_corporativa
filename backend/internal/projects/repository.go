package projects

import (
	"context"
	"database/sql"
	"errors"
	"time"

	"backend/internal/platform/database"
	"backend/internal/platform/httpx"
)

var (
	errNotFound          = httpx.NotFound("proyecto no encontrado")
	errMilestoneNotFound = httpx.NotFound("hito no encontrado")
	errUpdateNotFound    = httpx.NotFound("avance no encontrado")
)

const projectSelect = `SELECT p.id, p.cliente_id, c.nombre, p.requerimiento_id, p.nombre, p.servicio_slug, p.descripcion,
	p.notas_internas, p.estado, p.avance, p.fecha_inicio, p.fecha_entrega, p.creado_en, p.actualizado_en
	FROM proyectos p JOIN clientes c ON c.id = p.cliente_id`

// Condición de todas las consultas del portal: el proyecto debe ser de un cliente del usuario.
const ownedByUser = ` JOIN cliente_usuarios cu ON cu.cliente_id = p.cliente_id AND cu.usuario_id = $1`

type Repository struct {
	db *sql.DB
}

func NewRepository(db *sql.DB) *Repository {
	return &Repository{db: db}
}

func scanProject(row interface{ Scan(...any) error }) (Project, error) {
	var p Project
	err := row.Scan(&p.ID, &p.ClientID, &p.ClientName, &p.RequestID, &p.Name, &p.ServiceSlug, &p.Description,
		&p.InternalNotes, &p.Status, &p.Progress, &p.StartedOn, &p.DueOn, &p.CreatedAt, &p.UpdatedAt)
	return p, err
}

func (r *Repository) queryProjects(ctx context.Context, query string, args ...any) ([]Project, error) {
	rows, err := r.db.QueryContext(ctx, query, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	list := []Project{}
	for rows.Next() {
		p, err := scanProject(rows)
		if err != nil {
			return nil, err
		}
		list = append(list, p)
	}
	return list, rows.Err()
}

func (r *Repository) list(ctx context.Context) ([]Project, error) {
	return r.queryProjects(ctx, projectSelect+` ORDER BY p.id DESC`)
}

func (r *Repository) listForUser(ctx context.Context, userID int64) ([]Project, error) {
	return r.queryProjects(ctx, projectSelect+ownedByUser+` ORDER BY p.id DESC`, userID)
}

func (r *Repository) get(ctx context.Context, id int64) (*Project, error) {
	return projectOrNotFound(scanProject(r.db.QueryRowContext(ctx, projectSelect+` WHERE p.id = $1`, id)))
}

func (r *Repository) getForUser(ctx context.Context, userID, id int64) (*Project, error) {
	return projectOrNotFound(scanProject(r.db.QueryRowContext(ctx, projectSelect+ownedByUser+` WHERE p.id = $2`, userID, id)))
}

func projectOrNotFound(p Project, err error) (*Project, error) {
	if errors.Is(err, sql.ErrNoRows) {
		return nil, errNotFound
	}
	if err != nil {
		return nil, err
	}
	return &p, nil
}

func (r *Repository) create(ctx context.Context, in ProjectInput) (int64, error) {
	var id int64
	err := r.db.QueryRowContext(ctx,
		`INSERT INTO proyectos (cliente_id, requerimiento_id, nombre, servicio_slug, descripcion, notas_internas, avance, fecha_inicio, fecha_entrega)
		 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
		in.ClientID, in.RequestID, in.Name, in.ServiceSlug, in.Description, in.InternalNotes, in.Progress, in.StartedOn, in.DueOn,
	).Scan(&id)
	if err := projectWriteError(err); err != nil {
		return 0, err
	}
	return id, nil
}

// update no toca requerimiento_id: el origen de un proyecto no cambia.
func (r *Repository) update(ctx context.Context, id int64, in ProjectInput) error {
	res, err := r.db.ExecContext(ctx,
		`UPDATE proyectos SET cliente_id = $1, nombre = $2, servicio_slug = $3, descripcion = $4, notas_internas = $5,
		 avance = $6, fecha_inicio = $7, fecha_entrega = $8, actualizado_en = $9 WHERE id = $10`,
		in.ClientID, in.Name, in.ServiceSlug, in.Description, in.InternalNotes, in.Progress, in.StartedOn, in.DueOn,
		database.Time(time.Now()), id,
	)
	if err := projectWriteError(err); err != nil {
		return err
	}
	return affected(res, errNotFound)
}

func projectWriteError(err error) error {
	switch {
	case database.IsForeignKey(err):
		return httpx.Invalid("el cliente indicado no existe")
	case database.IsUnique(err):
		return httpx.Conflict("esa solicitud ya tiene un proyecto")
	}
	return err
}

// setStatus exige que el estado siga siendo from, para que dos cambios simultáneos
// no se salten las transiciones. Al entregar, el avance queda en 100.
func (r *Repository) setStatus(ctx context.Context, id int64, from, to string) error {
	res, err := r.db.ExecContext(ctx,
		`UPDATE proyectos SET estado = $1, avance = CASE WHEN $2 = 'entregado' THEN 100 ELSE avance END, actualizado_en = $3
		 WHERE id = $4 AND estado = $5`,
		to, to, database.Time(time.Now()), id, from,
	)
	if err != nil {
		return err
	}
	return affected(res, httpx.Conflict("el estado del proyecto cambió, recarga e intenta de nuevo"))
}

func (r *Repository) milestones(ctx context.Context, projectID int64) ([]Milestone, error) {
	rows, err := r.db.QueryContext(ctx,
		`SELECT id, proyecto_id, titulo, descripcion, estado, fecha_limite, fecha_completado, posicion
		 FROM proyecto_hitos WHERE proyecto_id = $1 ORDER BY posicion, id`, projectID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	list := []Milestone{}
	for rows.Next() {
		var m Milestone
		if err := rows.Scan(&m.ID, &m.ProjectID, &m.Title, &m.Description, &m.Status, &m.DueOn, &m.CompletedOn, &m.Position); err != nil {
			return nil, err
		}
		list = append(list, m)
	}
	return list, rows.Err()
}

func (r *Repository) addMilestone(ctx context.Context, projectID int64, in MilestoneInput) error {
	today := time.Now().UTC().Format(dateLayout)
	_, err := r.db.ExecContext(ctx,
		`INSERT INTO proyecto_hitos (proyecto_id, titulo, descripcion, estado, fecha_limite, fecha_completado, posicion)
		 VALUES ($1, $2, $3, $4, $5, CASE WHEN $6 = 'completado' THEN $7 END,
		   (SELECT COALESCE(MAX(posicion) + 1, 0) FROM proyecto_hitos WHERE proyecto_id = $8))`,
		projectID, in.Title, in.Description, in.Status, in.DueOn, in.Status, today, projectID,
	)
	if database.IsForeignKey(err) {
		return errNotFound
	}
	return err
}

func (r *Repository) updateMilestone(ctx context.Context, projectID, id int64, in MilestoneInput) error {
	today := time.Now().UTC().Format(dateLayout)
	res, err := r.db.ExecContext(ctx,
		`UPDATE proyecto_hitos SET titulo = $1, descripcion = $2, estado = $3, fecha_limite = $4,
		 fecha_completado = CASE WHEN $5 = 'completado' THEN COALESCE(fecha_completado, $6) END
		 WHERE id = $7 AND proyecto_id = $8`,
		in.Title, in.Description, in.Status, in.DueOn, in.Status, today, id, projectID,
	)
	if err != nil {
		return err
	}
	return affected(res, errMilestoneNotFound)
}

func (r *Repository) deleteMilestone(ctx context.Context, projectID, id int64) error {
	res, err := r.db.ExecContext(ctx, `DELETE FROM proyecto_hitos WHERE id = $1 AND proyecto_id = $2`, id, projectID)
	if err != nil {
		return err
	}
	return affected(res, errMilestoneNotFound)
}

// updates lista del más reciente al más antiguo. Con onlyVisible solo trae lo publicado.
func (r *Repository) updates(ctx context.Context, projectID int64, onlyVisible bool) ([]Update, error) {
	query := `SELECT n.id, n.proyecto_id, COALESCE(u.nombre, ''), n.titulo, n.contenido, n.visible_al_cliente, n.creado_en
		FROM proyecto_avances n LEFT JOIN usuarios u ON u.id = n.autor_id
		WHERE n.proyecto_id = $1`
	if onlyVisible {
		query += ` AND n.visible_al_cliente = TRUE`
	}
	rows, err := r.db.QueryContext(ctx, query+` ORDER BY n.id DESC`, projectID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	list := []Update{}
	for rows.Next() {
		var n Update
		if err := rows.Scan(&n.ID, &n.ProjectID, &n.AuthorName, &n.Title, &n.Body, &n.VisibleToClient, &n.CreatedAt); err != nil {
			return nil, err
		}
		list = append(list, n)
	}
	return list, rows.Err()
}

func (r *Repository) addUpdate(ctx context.Context, projectID, authorID int64, in UpdateInput) error {
	_, err := r.db.ExecContext(ctx,
		`INSERT INTO proyecto_avances (proyecto_id, autor_id, titulo, contenido, visible_al_cliente) VALUES ($1, $2, $3, $4, $5)`,
		projectID, authorID, in.Title, in.Body, in.VisibleToClient,
	)
	if database.IsForeignKey(err) {
		return errNotFound
	}
	return err
}

func (r *Repository) updateUpdate(ctx context.Context, projectID, id int64, in UpdateInput) error {
	res, err := r.db.ExecContext(ctx,
		`UPDATE proyecto_avances SET titulo = $1, contenido = $2, visible_al_cliente = $3 WHERE id = $4 AND proyecto_id = $5`,
		in.Title, in.Body, in.VisibleToClient, id, projectID,
	)
	if err != nil {
		return err
	}
	return affected(res, errUpdateNotFound)
}

func (r *Repository) deleteUpdate(ctx context.Context, projectID, id int64) error {
	res, err := r.db.ExecContext(ctx, `DELETE FROM proyecto_avances WHERE id = $1 AND proyecto_id = $2`, id, projectID)
	if err != nil {
		return err
	}
	return affected(res, errUpdateNotFound)
}

func affected(res sql.Result, notFound error) error {
	n, err := res.RowsAffected()
	if err != nil {
		return err
	}
	if n == 0 {
		return notFound
	}
	return nil
}

package formularios

import (
	"context"
	"database/sql"

	"backend/internal/platform/database"
	"backend/internal/platform/httpx"
)

type Repository struct {
	db *sql.DB
}

func NewRepository(db *sql.DB) *Repository {
	return &Repository{db: db}
}

func (r *Repository) createContacto(ctx context.Context, c Contacto) error {
	_, err := r.db.ExecContext(ctx,
		`INSERT INTO contactos (nombre, correo, telefono, tipo_proyecto, mensaje) VALUES ($1, $2, $3, $4, $5)`,
		c.Nombre, c.Email, c.Telefono, c.TipoProyecto, c.Mensaje,
	)
	return err
}

func (r *Repository) createParticipante(ctx context.Context, p Participante) error {
	_, err := r.db.ExecContext(ctx,
		`INSERT INTO participantes_sorteo (nombre, apellido, correo, usuario_instagram, tipo_negocio, nombre_negocio, comuna, tiene_sitio_web, url_sitio_web)
		 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
		p.Nombre, p.Apellido, p.Correo, p.UsuarioInstagram, p.TipoNegocio, p.NombreNegocio, p.Comuna, p.TieneSitioWeb, p.URLSitioWeb,
	)
	if database.IsUnique(err) {
		return httpx.Conflict("Este correo ya está registrado.")
	}
	return err
}

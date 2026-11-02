package requests

import (
	"context"
	"crypto/rand"
	"database/sql"
	"encoding/json"
	"errors"
	"strings"

	"backend/internal/platform/httpx"
)

type Repository struct {
	db *sql.DB
}

func NewRepository(db *sql.DB) *Repository {
	return &Repository{db: db}
}

// Create guarda el requerimiento con todas sus respuestas en una transacción
// y devuelve el código de seguimiento que se le muestra a la persona.
func (r *Repository) Create(ctx context.Context, req Requerimiento) (string, error) {
	tx, err := r.db.BeginTx(ctx, nil)
	if err != nil {
		return "", err
	}
	defer tx.Rollback()

	prefijo := "REQ-"
	if req.Sorteo {
		prefijo = "SOR-"
	}
	codigo := nuevoCodigo(prefijo)
	var id int64
	err = tx.QueryRowContext(ctx,
		`INSERT INTO requerimientos (codigo, servicio_slug, servicio_titulo, nombre, correo, telefono, empresa, medio_preferido, es_sorteo, enviado_en)
		 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id`,
		codigo, req.Servicio.Slug, req.Servicio.Titulo,
		req.Contacto.Nombre, req.Contacto.Correo, req.Contacto.Telefono, req.Contacto.Empresa, req.Contacto.MedioPreferido,
		req.Sorteo, req.EnviadoEn,
	).Scan(&id)
	if err != nil {
		return "", err
	}

	position := 0
	for _, s := range req.Secciones {
		for _, resp := range s.Respuestas {
			if _, err := tx.ExecContext(ctx,
				`INSERT INTO requerimiento_respuestas (requerimiento_id, seccion_id, seccion_titulo, campo_id, pregunta, respuesta, position)
				 VALUES ($1, $2, $3, $4, $5, $6, $7)`,
				id, s.ID, s.Titulo, resp.ID, resp.Pregunta, string(resp.Respuesta), position,
			); err != nil {
				return "", err
			}
			position++
		}
	}

	return codigo, tx.Commit()
}

// nuevoCodigo genera un código tipo REQ-7KX2PQ (o SOR-7KX2PQ para el sorteo) sin caracteres ambiguos (0/O, 1/I).
func nuevoCodigo(prefijo string) string {
	const alfabeto = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
	b := make([]byte, 6)
	rand.Read(b)
	var sb strings.Builder
	sb.WriteString(prefijo)
	for _, c := range b {
		sb.WriteByte(alfabeto[int(c)%len(alfabeto)])
	}
	return sb.String()
}

// Servicio devuelve el servicio de una solicitud, para crear un proyecto a partir de ella.
func (r *Repository) Servicio(ctx context.Context, id int64) (ServicioRequerimiento, error) {
	var s ServicioRequerimiento
	err := r.db.QueryRowContext(ctx, `SELECT servicio_slug, servicio_titulo FROM requerimientos WHERE id = $1`, id).Scan(&s.Slug, &s.Titulo)
	if errors.Is(err, sql.ErrNoRows) {
		return s, httpx.NotFound("solicitud no encontrada")
	}
	return s, err
}

// GetAll devuelve los requerimientos con sus respuestas, del más reciente al más antiguo.
// Con soloSorteo != nil filtra por la flag es_sorteo.
func (r *Repository) GetAll(ctx context.Context, soloSorteo *bool) ([]RequerimientoGuardado, error) {
	consulta := `SELECT id, codigo, servicio_slug, servicio_titulo, nombre, correo, telefono, empresa, medio_preferido, es_sorteo, enviado_en, creado_en
		 FROM requerimientos`
	args := []any{}
	if soloSorteo != nil {
		consulta += ` WHERE es_sorteo = $1`
		args = append(args, *soloSorteo)
	}
	rows, err := r.db.QueryContext(ctx, consulta+` ORDER BY id DESC`, args...)
	if err != nil {
		return nil, err
	}
	lista := []RequerimientoGuardado{}
	porID := map[int64]int{}
	for rows.Next() {
		var g RequerimientoGuardado
		if err := rows.Scan(
			&g.ID, &g.Codigo, &g.Servicio.Slug, &g.Servicio.Titulo,
			&g.Contacto.Nombre, &g.Contacto.Correo, &g.Contacto.Telefono, &g.Contacto.Empresa, &g.Contacto.MedioPreferido,
			&g.Sorteo, &g.EnviadoEn, &g.CreadoEn,
		); err != nil {
			rows.Close()
			return nil, err
		}
		g.Secciones = []SeccionRespuestas{}
		porID[g.ID] = len(lista)
		lista = append(lista, g)
	}
	rows.Close()
	if err := rows.Err(); err != nil {
		return nil, err
	}

	rows, err = r.db.QueryContext(ctx,
		`SELECT requerimiento_id, seccion_id, seccion_titulo, campo_id, pregunta, respuesta
		 FROM requerimiento_respuestas ORDER BY requerimiento_id, position`,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		var (
			reqID                        int64
			seccionID, seccionTitulo     string
			campoID, pregunta, respuesta string
		)
		if err := rows.Scan(&reqID, &seccionID, &seccionTitulo, &campoID, &pregunta, &respuesta); err != nil {
			return nil, err
		}
		i, ok := porID[reqID]
		if !ok {
			continue
		}
		g := &lista[i]
		// Las respuestas vienen ordenadas, así que una sección nueva empieza cuando cambia el seccion_id.
		if n := len(g.Secciones); n == 0 || g.Secciones[n-1].ID != seccionID {
			g.Secciones = append(g.Secciones, SeccionRespuestas{ID: seccionID, Titulo: seccionTitulo, Respuestas: []RespuestaCampo{}})
		}
		s := &g.Secciones[len(g.Secciones)-1]
		s.Respuestas = append(s.Respuestas, RespuestaCampo{ID: campoID, Pregunta: pregunta, Respuesta: json.RawMessage(respuesta)})
	}
	return lista, rows.Err()
}

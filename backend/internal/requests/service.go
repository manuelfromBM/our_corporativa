package requests

import (
	"context"
	"regexp"
	"strings"

	"backend/internal/platform/httpx"
)

var correoValido = regexp.MustCompile(`^[^\s@]+@[^\s@]+\.[^\s@]+$`)

type Service struct {
	repo        *Repository
	notificador *Notificador
}

func NewService(repo *Repository, notificador *Notificador) *Service {
	return &Service{repo: repo, notificador: notificador}
}

func (s *Service) Create(ctx context.Context, req Requerimiento) (string, error) {
	if msg := validarRequerimiento(&req); msg != "" {
		return "", httpx.Invalid(msg)
	}
	codigo, err := s.repo.Create(ctx, req)
	if err != nil {
		return "", err
	}
	s.notificador.Avisar(req, codigo)
	return codigo, nil
}

func (s *Service) List(ctx context.Context, soloSorteo *bool) ([]RequerimientoGuardado, error) {
	return s.repo.GetAll(ctx, soloSorteo)
}

// Service entrega slug y título del servicio de una solicitud.
func (s *Service) Service(ctx context.Context, id int64) (slug, titulo string, err error) {
	servicio, err := s.repo.Servicio(ctx, id)
	return servicio.Slug, servicio.Titulo, err
}

// validarRequerimiento limpia espacios y revisa lo mínimo para poder contactar a la persona.
func validarRequerimiento(req *Requerimiento) string {
	req.Servicio.Slug = strings.TrimSpace(req.Servicio.Slug)
	req.Servicio.Titulo = strings.TrimSpace(req.Servicio.Titulo)
	req.Contacto.Nombre = strings.TrimSpace(req.Contacto.Nombre)
	req.Contacto.Correo = strings.ToLower(strings.TrimSpace(req.Contacto.Correo))
	req.Contacto.Telefono = strings.TrimSpace(req.Contacto.Telefono)
	req.Contacto.Empresa = strings.TrimSpace(req.Contacto.Empresa)
	req.Contacto.MedioPreferido = strings.TrimSpace(req.Contacto.MedioPreferido)

	switch {
	case req.Servicio.Slug == "":
		return "falta el servicio"
	case req.Contacto.Nombre == "":
		return "falta el nombre"
	case !correoValido.MatchString(req.Contacto.Correo):
		return "el correo no es válido"
	// En el sorteo el contacto principal es el correo, así que el teléfono es opcional.
	case req.Contacto.Telefono == "" && !req.Sorteo:
		return "falta el teléfono"
	case len(req.Secciones) == 0:
		return "no hay respuestas"
	}
	if req.Servicio.Titulo == "" {
		req.Servicio.Titulo = req.Servicio.Slug
	}

	for _, s := range req.Secciones {
		for _, r := range s.Respuestas {
			if r.ID == "" || len(r.Respuesta) == 0 {
				return "hay respuestas incompletas"
			}
		}
	}
	return ""
}

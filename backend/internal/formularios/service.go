package formularios

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

func (s *Service) CreateContacto(ctx context.Context, c Contacto) error {
	if msg := validarContacto(&c); msg != "" {
		return httpx.Invalid(msg)
	}
	if err := s.repo.createContacto(ctx, c); err != nil {
		return err
	}
	s.notificador.AvisarContacto(c)
	return nil
}

func (s *Service) CreateParticipante(ctx context.Context, p Participante) error {
	if msg := validarParticipante(&p); msg != "" {
		return httpx.Invalid(msg)
	}
	if err := s.repo.createParticipante(ctx, p); err != nil {
		return err
	}
	s.notificador.AvisarParticipante(p)
	return nil
}

func validarContacto(c *Contacto) string {
	c.Nombre = strings.TrimSpace(c.Nombre)
	c.Email = strings.ToLower(strings.TrimSpace(c.Email))
	c.Telefono = strings.TrimSpace(c.Telefono)
	c.TipoProyecto = strings.TrimSpace(c.TipoProyecto)
	c.Mensaje = strings.TrimSpace(c.Mensaje)

	switch {
	case c.Nombre == "":
		return "falta el nombre"
	case !correoValido.MatchString(c.Email):
		return "el correo no es válido"
	case c.Telefono == "":
		return "falta el teléfono"
	case c.TipoProyecto == "":
		return "falta el tipo de proyecto"
	case c.Mensaje == "":
		return "falta el mensaje"
	}
	return ""
}

// validarParticipante guarda el correo en minúsculas para que no se repita con otra capitalización.
func validarParticipante(p *Participante) string {
	p.Nombre = strings.TrimSpace(p.Nombre)
	p.Apellido = strings.TrimSpace(p.Apellido)
	p.Correo = strings.ToLower(strings.TrimSpace(p.Correo))
	p.UsuarioInstagram = strings.TrimSpace(p.UsuarioInstagram)
	p.TipoNegocio = strings.TrimSpace(p.TipoNegocio)
	p.NombreNegocio = strings.TrimSpace(p.NombreNegocio)
	p.Comuna = strings.TrimSpace(p.Comuna)

	if !p.TieneSitioWeb {
		p.URLSitioWeb = nil
	} else if p.URLSitioWeb != nil {
		url := strings.TrimSpace(*p.URLSitioWeb)
		p.URLSitioWeb = &url
	}

	switch {
	case p.Nombre == "":
		return "falta el nombre"
	case p.Apellido == "":
		return "falta el apellido"
	case !correoValido.MatchString(p.Correo):
		return "el correo no es válido"
	case p.TipoNegocio == "":
		return "falta el tipo de negocio"
	case p.NombreNegocio == "":
		return "falta el nombre del negocio"
	case p.Comuna == "":
		return "falta la comuna"
	case p.TieneSitioWeb && (p.URLSitioWeb == nil || *p.URLSitioWeb == ""):
		return "falta la URL del sitio web"
	}
	return ""
}

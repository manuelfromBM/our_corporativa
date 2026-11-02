package accounts

import (
	"context"
	"fmt"
	"html"
	"log"
	"net/mail"
	"strings"

	"backend/internal/auth"
	"backend/internal/platform/httpx"
)

type Service struct {
	repo   *Repository
	auth   *auth.Service
	mailer auth.Mailer
	appURL string
}

func NewService(repo *Repository, authService *auth.Service, mailer auth.Mailer, appURL string) *Service {
	return &Service{repo: repo, auth: authService, mailer: mailer, appURL: appURL}
}

// Bootstrap crea la primera cuenta admin; sin ella nadie podría invitar a nadie.
// Solo actúa con la tabla vacía, así cambiar las variables después no toca ninguna cuenta.
func (s *Service) Bootstrap(ctx context.Context, email, password string) error {
	if email == "" {
		return nil
	}
	n, err := s.repo.count(ctx)
	if err != nil || n > 0 {
		return err
	}
	in := CreateInput{Email: email, Name: "Administrador", Role: auth.RoleAdmin}
	if _, err := s.repo.create(ctx, in, auth.HashPassword(password)); err != nil {
		return err
	}
	log.Printf("cuenta admin inicial creada: %s", email)
	return nil
}

// CreateActive crea una cuenta con contraseña, sin pasar por la invitación.
func (s *Service) CreateActive(ctx context.Context, in CreateInput, password string) error {
	in.Email = auth.NormalizeEmail(in.Email)
	_, err := s.repo.create(ctx, in, auth.HashPassword(password))
	return err
}

func (s *Service) List(ctx context.Context) ([]Account, error) {
	return s.repo.list(ctx)
}

// Invite crea la cuenta sin contraseña y envía el enlace para activarla.
func (s *Service) Invite(ctx context.Context, in CreateInput) (*CreateResult, error) {
	in.Email = auth.NormalizeEmail(in.Email)
	in.Name = strings.TrimSpace(in.Name)
	in.MemberSlug = strings.TrimSpace(in.MemberSlug)
	// ParseAddress también acepta "Nombre <correo>"; aquí solo sirve el correo solo.
	if addr, err := mail.ParseAddress(in.Email); err != nil || addr.Address != in.Email {
		return nil, httpx.Invalid("el correo no es válido")
	}
	if in.Name == "" {
		return nil, httpx.Invalid("falta el nombre")
	}
	if err := validateRole(in.Role); err != nil {
		return nil, err
	}
	if len(in.ClientIDs) > 0 && in.Role != auth.RoleClient {
		return nil, httpx.Invalid("solo las cuentas de cliente se asocian a clientes")
	}

	id, err := s.repo.create(ctx, in, "")
	if err != nil {
		return nil, err
	}
	account, err := s.repo.get(ctx, id)
	if err != nil {
		return nil, err
	}

	// La cuenta ya existe: si el correo falla se informa y se puede reenviar.
	sent := true
	if err := s.sendInvitation(ctx, account); err != nil {
		log.Printf("error al enviar la invitación: %v", err)
		sent = false
	}
	return &CreateResult{Account: *account, InvitationSent: sent}, nil
}

// ResendInvitation genera un enlace nuevo e invalida el anterior.
func (s *Service) ResendInvitation(ctx context.Context, id int64) error {
	account, err := s.repo.get(ctx, id)
	if err != nil {
		return err
	}
	if !account.Pending {
		return httpx.Conflict("la cuenta ya está activada")
	}
	if !account.Active {
		return httpx.Conflict("la cuenta está desactivada")
	}
	return s.sendInvitation(ctx, account)
}

func (s *Service) sendInvitation(ctx context.Context, a *Account) error {
	token, err := s.auth.IssueToken(ctx, a.ID, auth.PurposeInvite)
	if err != nil {
		return err
	}
	link := fmt.Sprintf("%s/activar-cuenta?token=%s", s.appURL, token)
	body := fmt.Sprintf(`<p>Hola %s:</p>
<p>Te creamos una cuenta en BM Code Lab. Para activarla, define tu contraseña. El enlace vence en 7 días.</p>
<p><a href="%s">Activar mi cuenta</a></p>`, html.EscapeString(a.Name), link)
	return s.mailer.Send(ctx, a.Email, "Activa tu cuenta de BM Code Lab", body)
}

// Update cambia nombre, rol o estado. Un admin no puede quitarse permisos a sí mismo,
// lo que además garantiza que siempre quede al menos un admin activo.
func (s *Service) Update(ctx context.Context, actorID, id int64, in UpdateInput) (*Account, error) {
	account, err := s.repo.get(ctx, id)
	if err != nil {
		return nil, err
	}

	name, role, active := account.Name, account.Role, account.Active
	if in.Name != nil {
		if name = strings.TrimSpace(*in.Name); name == "" {
			return nil, httpx.Invalid("falta el nombre")
		}
	}
	if in.Role != nil {
		if err := validateRole(*in.Role); err != nil {
			return nil, err
		}
		role = *in.Role
	}
	if in.Active != nil {
		active = *in.Active
	}
	if actorID == id && (role != account.Role || !active) {
		return nil, httpx.Forbidden("no puedes cambiar tu propio rol ni desactivar tu cuenta")
	}
	if role != auth.RoleClient && len(account.ClientIDs) > 0 {
		return nil, httpx.Invalid("primero quita los clientes asociados a la cuenta")
	}

	if err := s.repo.update(ctx, id, name, role, active); err != nil {
		return nil, err
	}
	if !active {
		if err := s.auth.RevokeSessions(ctx, id); err != nil {
			return nil, err
		}
	}
	return s.repo.get(ctx, id)
}

// SetClients reemplaza los clientes cuyos proyectos puede ver la cuenta.
func (s *Service) SetClients(ctx context.Context, id int64, clientIDs []int64) (*Account, error) {
	account, err := s.repo.get(ctx, id)
	if err != nil {
		return nil, err
	}
	if account.Role != auth.RoleClient && len(clientIDs) > 0 {
		return nil, httpx.Invalid("solo las cuentas de cliente se asocian a clientes")
	}
	if err := s.repo.setClients(ctx, id, clientIDs); err != nil {
		return nil, err
	}
	return s.repo.get(ctx, id)
}

func validateRole(role string) error {
	switch role {
	case auth.RoleClient, auth.RoleMember, auth.RoleAdmin:
		return nil
	}
	return httpx.Invalid("el rol no es válido")
}

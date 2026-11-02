package auth

import (
	"context"
	"fmt"
	"html"
	"log"
	"strings"
	"time"

	"backend/internal/platform/httpx"
)

const (
	maxLoginFailures = 5
	loginWindow      = 15 * time.Minute

	maxForgotRequests = 3
	forgotWindow      = time.Hour

	inviteTTL = 7 * 24 * time.Hour
	resetTTL  = time.Hour
)

// Mismo mensaje para cualquier fallo, para no revelar qué correos tienen cuenta.
var errBadCredentials = httpx.Unauthorized("correo o contraseña incorrectos")

type Mailer interface {
	Send(ctx context.Context, to, subject, html string) error
}

type Service struct {
	repo       *Repository
	mailer     Mailer
	appURL     string
	sessionTTL time.Duration
	// dummyHash iguala el tiempo de respuesta cuando el correo no existe.
	dummyHash string
}

func NewService(repo *Repository, mailer Mailer, appURL string, sessionTTL time.Duration) *Service {
	return &Service{
		repo:       repo,
		mailer:     mailer,
		appURL:     appURL,
		sessionTTL: sessionTTL,
		dummyHash:  HashPassword(newToken()),
	}
}

// Login valida las credenciales y crea una sesión. Devuelve el token que irá en la cookie.
func (s *Service) Login(ctx context.Context, email, password string) (string, time.Time, *User, error) {
	email = NormalizeEmail(email)
	now := time.Now()
	key := "login:" + email

	failures, err := s.repo.countAttempts(ctx, key, now.Add(-loginWindow))
	if err != nil {
		return "", time.Time{}, nil, err
	}
	if failures >= maxLoginFailures {
		return "", time.Time{}, nil, httpx.TooMany("demasiados intentos, espera unos minutos")
	}

	cred, err := s.repo.credentialsByEmail(ctx, email)
	if err != nil {
		return "", time.Time{}, nil, err
	}
	hash := s.dummyHash
	if cred != nil && cred.passwordHash != "" {
		hash = cred.passwordHash
	}
	ok, err := verifyPassword(password, hash)
	if err != nil {
		return "", time.Time{}, nil, err
	}
	if !ok || cred == nil || cred.passwordHash == "" || !cred.active {
		if err := s.repo.addAttempt(ctx, key, now); err != nil {
			return "", time.Time{}, nil, err
		}
		return "", time.Time{}, nil, errBadCredentials
	}

	if err := s.repo.clearAttempts(ctx, key); err != nil {
		return "", time.Time{}, nil, err
	}
	if err := s.repo.purge(ctx, now); err != nil {
		return "", time.Time{}, nil, err
	}
	token := newToken()
	expires := now.Add(s.sessionTTL)
	if err := s.repo.createSession(ctx, cred.user.ID, hashToken(token), expires); err != nil {
		return "", time.Time{}, nil, err
	}
	return token, expires, &cred.user, nil
}

func (s *Service) Logout(ctx context.Context, token string) error {
	return s.repo.deleteSession(ctx, hashToken(token))
}

// Authenticate devuelve el usuario de una sesión vigente, o nil si no hay ninguna.
func (s *Service) Authenticate(ctx context.Context, token string) (*User, error) {
	return s.repo.userBySession(ctx, hashToken(token), time.Now())
}

// RevokeSessions cierra todas las sesiones de un usuario.
func (s *Service) RevokeSessions(ctx context.Context, userID int64) error {
	return s.repo.deleteUserSessions(ctx, userID)
}

// ForgotPassword nunca revela si el correo existe: el resultado visible es siempre el mismo,
// y el envío va aparte para que el tiempo de respuesta tampoco lo delate.
func (s *Service) ForgotPassword(ctx context.Context, email string) error {
	email = NormalizeEmail(email)
	now := time.Now()
	key := "forgot:" + email

	requests, err := s.repo.countAttempts(ctx, key, now.Add(-forgotWindow))
	if err != nil {
		return err
	}
	if requests >= maxForgotRequests {
		return nil
	}
	if err := s.repo.addAttempt(ctx, key, now); err != nil {
		return err
	}

	cred, err := s.repo.credentialsByEmail(ctx, email)
	if err != nil {
		return err
	}
	// Quien aún no activa su cuenta usa su invitación, no este flujo.
	if cred == nil || !cred.active || cred.passwordHash == "" {
		return nil
	}

	token, err := s.IssueToken(ctx, cred.user.ID, PurposeReset)
	if err != nil {
		return err
	}
	link := fmt.Sprintf("%s/restablecer-contrasena?token=%s", s.appURL, token)
	body := fmt.Sprintf(`<p>Hola %s:</p>
<p>Recibimos una solicitud para cambiar tu contraseña de BM Code Lab. El enlace vence en una hora.</p>
<p><a href="%s">Crear una contraseña nueva</a></p>
<p>Si no fuiste tú, puedes ignorar este correo.</p>`, html.EscapeString(cred.user.Name), link)

	go func() {
		ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
		defer cancel()
		if err := s.mailer.Send(ctx, cred.user.Email, "Recupera tu contraseña de BM Code Lab", body); err != nil {
			log.Printf("error al enviar la recuperación de contraseña: %v", err)
		}
	}()
	return nil
}

// ResetPassword fija la contraseña con un token de invitación o de recuperación.
func (s *Service) ResetPassword(ctx context.Context, token, password string) error {
	if err := validatePassword(password); err != nil {
		return err
	}
	return s.repo.consumeToken(ctx, hashToken(token), HashPassword(password), time.Now())
}

// IssueToken genera un token de un solo uso e invalida los anteriores del mismo propósito.
func (s *Service) IssueToken(ctx context.Context, userID int64, purpose string) (string, error) {
	ttl := resetTTL
	if purpose == PurposeInvite {
		ttl = inviteTTL
	}
	now := time.Now()
	token := newToken()
	if err := s.repo.replaceToken(ctx, userID, purpose, hashToken(token), now, now.Add(ttl)); err != nil {
		return "", err
	}
	return token, nil
}

// NormalizeEmail deja el correo en la forma en que se guarda.
func NormalizeEmail(email string) string {
	return strings.ToLower(strings.TrimSpace(email))
}

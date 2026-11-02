package config

import (
	"errors"
	"fmt"
	"net/mail"
	"net/url"
	"os"
	"strings"
	"time"
)

// Largo mínimo de contraseña, compartido por el bootstrap y las contraseñas de usuarios.
const MinPasswordLength = 12

type Config struct {
	Env         string // development | production
	Port        string
	DatabaseURL string
	// AppURL es la URL pública del frontend; con ella se arman los enlaces de los correos.
	AppURL       string
	SessionTTL   time.Duration
	ResendAPIKey string
	MailFrom     string
	// TeamEmails reciben un aviso por cada solicitud nueva.
	TeamEmails []string
	// Crean la primera cuenta admin si aún no hay usuarios.
	BootstrapAdminEmail    string
	BootstrapAdminPassword string
}

func (c Config) Production() bool { return c.Env == "production" }

// Load lee las variables de entorno y falla al arrancar si la configuración no es válida.
func Load() (Config, error) {
	c := Config{
		Env:                    getEnv("APP_ENV", "development"),
		Port:                   getEnv("PORT", "8080"),
		DatabaseURL:            os.Getenv("DATABASE_URL"),
		AppURL:                 strings.TrimRight(getEnv("APP_URL", "http://localhost:3000"), "/"),
		ResendAPIKey:           os.Getenv("RESEND_API_KEY"),
		MailFrom:               getEnv("MAIL_FROM", "noreply@bmcodelab.cl"),
		TeamEmails:             splitEmails(os.Getenv("TEAM_EMAILS")),
		BootstrapAdminEmail:    strings.ToLower(strings.TrimSpace(os.Getenv("BOOTSTRAP_ADMIN_EMAIL"))),
		BootstrapAdminPassword: os.Getenv("BOOTSTRAP_ADMIN_PASSWORD"),
	}

	var err error
	if c.SessionTTL, err = time.ParseDuration(getEnv("SESSION_TTL", "168h")); err != nil || c.SessionTTL <= 0 {
		return c, errors.New("SESSION_TTL no es una duración válida (ej: 168h)")
	}
	return c, c.validate()
}

func (c Config) validate() error {
	if c.DatabaseURL == "" {
		return errors.New("falta DATABASE_URL")
	}
	if !strings.HasPrefix(c.DatabaseURL, "postgres://") && !strings.HasPrefix(c.DatabaseURL, "postgresql://") {
		return errors.New("DATABASE_URL debe ser una cadena postgresql:// de Neon")
	}
	if c.Env != "development" && c.Env != "production" {
		return fmt.Errorf("APP_ENV debe ser development o production, no %q", c.Env)
	}
	u, err := url.Parse(c.AppURL)
	if err != nil || u.Host == "" || (u.Scheme != "http" && u.Scheme != "https") {
		return errors.New("APP_URL no es una URL válida")
	}
	for _, email := range c.TeamEmails {
		if _, err := mail.ParseAddress(email); err != nil {
			return fmt.Errorf("TEAM_EMAILS tiene un correo inválido: %q", email)
		}
	}
	if (c.BootstrapAdminEmail == "") != (c.BootstrapAdminPassword == "") {
		return errors.New("BOOTSTRAP_ADMIN_EMAIL y BOOTSTRAP_ADMIN_PASSWORD deben definirse juntas")
	}
	if c.BootstrapAdminEmail != "" {
		if _, err := mail.ParseAddress(c.BootstrapAdminEmail); err != nil {
			return errors.New("BOOTSTRAP_ADMIN_EMAIL no es un correo válido")
		}
		if len(c.BootstrapAdminPassword) < MinPasswordLength {
			return fmt.Errorf("BOOTSTRAP_ADMIN_PASSWORD debe tener al menos %d caracteres", MinPasswordLength)
		}
	}
	if c.Production() {
		if u.Scheme != "https" {
			return errors.New("en producción APP_URL debe usar https")
		}
		if c.ResendAPIKey == "" {
			return errors.New("en producción falta RESEND_API_KEY")
		}
	}
	return nil
}

// splitEmails lee una lista separada por comas.
func splitEmails(value string) []string {
	var emails []string
	for _, email := range strings.Split(value, ",") {
		if email = strings.TrimSpace(email); email != "" {
			emails = append(emails, email)
		}
	}
	return emails
}

func getEnv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}

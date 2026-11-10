package server

import (
	"database/sql"

	"backend/internal/accounts"
	"backend/internal/auth"
	"backend/internal/clients"
	"backend/internal/config"
	"backend/internal/formularios"
	"backend/internal/platform/mail"
	"backend/internal/projects"
	"backend/internal/requests"
	"backend/internal/team"
)

// Container reúne las dependencias ya construidas de la aplicación.
type Container struct {
	Config          config.Config
	AuthService     *auth.Service
	AccountsService *accounts.Service

	Auth           *auth.Handler
	Accounts       *accounts.Handler
	Clients        *clients.Handler
	Formularios    *formularios.Handler
	PortalProjects *projects.PortalHandler
	AdminProjects  *projects.AdminHandler
	Requests       *requests.Handler
	Team           *team.Handler
}

func NewContainer(db *sql.DB, cfg config.Config) *Container {
	mailer := mail.New(cfg.ResendAPIKey, cfg.MailFrom)

	authService := auth.NewService(auth.NewRepository(db), mailer, cfg.AppURL, cfg.SessionTTL)
	accountsService := accounts.NewService(accounts.NewRepository(db), authService, mailer, cfg.AppURL)
	clientsService := clients.NewService(clients.NewRepository(db))
	requestsService := requests.NewService(requests.NewRepository(db), requests.NewNotificador(mailer, cfg.TeamEmails, cfg.AppURL))
	projectsService := projects.NewService(projects.NewRepository(db), requestsService)
	teamService := team.NewService(team.NewRepository(db))
	formulariosService := formularios.NewService(formularios.NewRepository(db), formularios.NewNotificador(mailer, cfg.TeamEmails, cfg.AppURL))

	return &Container{
		Config:          cfg,
		AuthService:     authService,
		AccountsService: accountsService,

		Auth:           auth.NewHandler(authService, cfg.Production()),
		Accounts:       accounts.NewHandler(accountsService),
		Clients:        clients.NewHandler(clientsService),
		Formularios:    formularios.NewHandler(formulariosService),
		PortalProjects: projects.NewPortalHandler(projectsService),
		AdminProjects:  projects.NewAdminHandler(projectsService),
		Requests:       requests.NewHandler(requestsService),
		Team:           team.NewHandler(teamService),
	}
}

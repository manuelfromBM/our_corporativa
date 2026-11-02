package server

import (
	"github.com/gin-gonic/gin"

	"backend/internal/auth"
	"backend/internal/platform/httpx"
)

// Límite del cuerpo: un formulario completo pesa pocos KB, esto deja margen de sobra.
const maxBody = 256 << 10

// NewRouter es el único lugar donde se conectan rutas y middleware.
func NewRouter(c *Container) *gin.Engine {
	if c.Config.Production() {
		gin.SetMode(gin.ReleaseMode)
	}
	r := gin.New()
	r.Use(httpx.RequestID(), httpx.Logger(), httpx.Recover(), httpx.LimitBody(maxBody))
	// El backend solo recibe tráfico de Next.js, así que no se confía en cabeceras X-Forwarded-*.
	if err := r.SetTrustedProxies(nil); err != nil {
		panic(err)
	}

	api := r.Group("/api")

	// Público.
	api.GET("/team", c.Team.List)
	api.GET("/team/slugs", c.Team.Slugs)
	api.GET("/team/:slug", c.Team.Get)
	api.POST("/requerimientos", c.Requests.Create)
	api.POST("/contactos", c.Formularios.CreateContacto)
	api.POST("/sorteo/participantes", c.Formularios.CreateParticipante)

	// Autenticación.
	api.POST("/auth/login", c.Auth.Login)
	api.POST("/auth/logout", c.Auth.Logout)
	api.POST("/auth/password/forgot", c.Auth.ForgotPassword)
	api.POST("/auth/password/reset", c.Auth.ResetPassword)

	session := auth.RequireSession(c.AuthService)
	api.GET("/auth/me", session, c.Auth.Me)

	// Portal del cliente.
	portal := api.Group("/portal", session, auth.RequireRole(auth.RoleClient))
	portal.GET("/projects", c.PortalProjects.List)
	portal.GET("/projects/:id", c.PortalProjects.Get)

	// Gestión interna.
	admin := api.Group("/admin", session, auth.RequireRole(auth.RoleMember, auth.RoleAdmin))
	admin.GET("/requests", c.Requests.List)

	admin.GET("/clients", c.Clients.List)
	admin.POST("/clients", c.Clients.Create)
	admin.GET("/clients/:id", c.Clients.Get)
	admin.PUT("/clients/:id", c.Clients.Update)

	admin.GET("/projects", c.AdminProjects.List)
	admin.POST("/projects", c.AdminProjects.Create)
	admin.GET("/projects/:id", c.AdminProjects.Get)
	admin.PUT("/projects/:id", c.AdminProjects.Update)
	admin.POST("/projects/:id/status", c.AdminProjects.SetStatus)
	admin.POST("/projects/:id/milestones", c.AdminProjects.AddMilestone)
	admin.PUT("/projects/:id/milestones/:milestoneId", c.AdminProjects.UpdateMilestone)
	admin.DELETE("/projects/:id/milestones/:milestoneId", c.AdminProjects.DeleteMilestone)
	admin.POST("/projects/:id/updates", c.AdminProjects.AddUpdate)
	admin.PUT("/projects/:id/updates/:updateId", c.AdminProjects.EditUpdate)
	admin.DELETE("/projects/:id/updates/:updateId", c.AdminProjects.DeleteUpdate)

	// Cuentas: solo administradores.
	users := api.Group("/admin/users", session, auth.RequireRole(auth.RoleAdmin))
	users.GET("", c.Accounts.List)
	users.POST("", c.Accounts.Invite)
	users.PATCH("/:id", c.Accounts.Update)
	users.PUT("/:id/clients", c.Accounts.SetClients)
	users.POST("/:id/invitation", c.Accounts.ResendInvitation)

	return r
}

package auth

import (
	"slices"

	"github.com/gin-gonic/gin"

	"backend/internal/platform/httpx"
)

const (
	CookieName = "bm_session"
	userKey    = "auth_user"
)

// RequireSession exige una sesión vigente y deja al usuario en el contexto.
// El rol se lee de la base en cada petición, así un cambio de permisos aplica de inmediato.
func RequireSession(s *Service) gin.HandlerFunc {
	return func(c *gin.Context) {
		token, err := c.Cookie(CookieName)
		if err != nil {
			httpx.Fail(c, httpx.Unauthorized("debes iniciar sesión"))
			return
		}
		user, err := s.Authenticate(c.Request.Context(), token)
		if err != nil {
			httpx.Fail(c, err)
			return
		}
		if user == nil {
			httpx.Fail(c, httpx.Unauthorized("debes iniciar sesión"))
			return
		}
		c.Set(userKey, user)
		c.Next()
	}
}

// RequireRole va después de RequireSession.
func RequireRole(roles ...string) gin.HandlerFunc {
	return func(c *gin.Context) {
		if !slices.Contains(roles, CurrentUser(c).Role) {
			httpx.Fail(c, httpx.Forbidden("no tienes permiso para esta acción"))
			return
		}
		c.Next()
	}
}

// CurrentUser devuelve el usuario que dejó RequireSession.
func CurrentUser(c *gin.Context) *User {
	return c.MustGet(userKey).(*User)
}

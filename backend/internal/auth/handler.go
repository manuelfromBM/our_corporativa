package auth

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"

	"backend/internal/platform/httpx"
)

type Handler struct {
	service *Service
	// secureCookie es false solo en desarrollo, donde no hay https.
	secureCookie bool
}

func NewHandler(service *Service, secureCookie bool) *Handler {
	return &Handler{service: service, secureCookie: secureCookie}
}

func (h *Handler) Login(c *gin.Context) {
	var body struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	if err := httpx.Decode(c, &body); err != nil {
		httpx.Fail(c, err)
		return
	}
	token, expires, user, err := h.service.Login(c.Request.Context(), body.Email, body.Password)
	if err != nil {
		httpx.Fail(c, err)
		return
	}
	h.setCookie(c, token, expires)
	httpx.JSON(c, http.StatusOK, user)
}

func (h *Handler) Logout(c *gin.Context) {
	if token, err := c.Cookie(CookieName); err == nil {
		if err := h.service.Logout(c.Request.Context(), token); err != nil {
			httpx.Fail(c, err)
			return
		}
	}
	h.setCookie(c, "", time.Unix(0, 0))
	httpx.JSON(c, http.StatusOK, gin.H{"ok": true})
}

func (h *Handler) Me(c *gin.Context) {
	httpx.JSON(c, http.StatusOK, CurrentUser(c))
}

func (h *Handler) ForgotPassword(c *gin.Context) {
	var body struct {
		Email string `json:"email"`
	}
	if err := httpx.Decode(c, &body); err != nil {
		httpx.Fail(c, err)
		return
	}
	if err := h.service.ForgotPassword(c.Request.Context(), body.Email); err != nil {
		httpx.Fail(c, err)
		return
	}
	httpx.JSON(c, http.StatusOK, gin.H{"ok": true})
}

// ResetPassword sirve tanto para activar una invitación como para recuperar la contraseña.
func (h *Handler) ResetPassword(c *gin.Context) {
	var body struct {
		Token    string `json:"token"`
		Password string `json:"password"`
	}
	if err := httpx.Decode(c, &body); err != nil {
		httpx.Fail(c, err)
		return
	}
	if err := h.service.ResetPassword(c.Request.Context(), body.Token, body.Password); err != nil {
		httpx.Fail(c, err)
		return
	}
	httpx.JSON(c, http.StatusOK, gin.H{"ok": true})
}

func (h *Handler) setCookie(c *gin.Context, token string, expires time.Time) {
	http.SetCookie(c.Writer, &http.Cookie{
		Name:     CookieName,
		Value:    token,
		Path:     "/",
		Expires:  expires,
		HttpOnly: true,
		Secure:   h.secureCookie,
		SameSite: http.SameSiteLaxMode,
	})
}

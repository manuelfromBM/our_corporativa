package formularios

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"backend/internal/platform/httpx"
)

type Handler struct {
	service *Service
}

func NewHandler(service *Service) *Handler {
	return &Handler{service: service}
}

func (h *Handler) CreateContacto(c *gin.Context) {
	var in Contacto
	if err := httpx.Decode(c, &in); err != nil {
		httpx.Fail(c, err)
		return
	}
	if err := h.service.CreateContacto(c.Request.Context(), in); err != nil {
		httpx.Fail(c, err)
		return
	}
	httpx.JSON(c, http.StatusCreated, gin.H{"ok": true})
}

func (h *Handler) CreateParticipante(c *gin.Context) {
	var in Participante
	if err := httpx.Decode(c, &in); err != nil {
		httpx.Fail(c, err)
		return
	}
	if err := h.service.CreateParticipante(c.Request.Context(), in); err != nil {
		httpx.Fail(c, err)
		return
	}
	httpx.JSON(c, http.StatusCreated, gin.H{"ok": true})
}

package requests

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"

	"backend/internal/platform/httpx"
)

type Handler struct {
	service *Service
}

func NewHandler(service *Service) *Handler {
	return &Handler{service: service}
}

// List acepta ?sorteo=true|false para ver solo las solicitudes del sorteo o solo las de /cotizar.
func (h *Handler) List(c *gin.Context) {
	var soloSorteo *bool
	if v, ok := c.GetQuery("sorteo"); ok {
		b, err := strconv.ParseBool(v)
		if err != nil {
			httpx.Fail(c, httpx.Invalid("sorteo debe ser true o false"))
			return
		}
		soloSorteo = &b
	}
	lista, err := h.service.List(c.Request.Context(), soloSorteo)
	if err != nil {
		httpx.Fail(c, err)
		return
	}
	httpx.JSON(c, http.StatusOK, lista)
}

func (h *Handler) Create(c *gin.Context) {
	var req Requerimiento
	if err := httpx.Decode(c, &req); err != nil {
		httpx.Fail(c, err)
		return
	}
	codigo, err := h.service.Create(c.Request.Context(), req)
	if err != nil {
		httpx.Fail(c, err)
		return
	}
	httpx.JSON(c, http.StatusCreated, gin.H{"codigo": codigo})
}

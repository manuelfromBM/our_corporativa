package team

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

func (h *Handler) List(c *gin.Context) {
	members, err := h.service.List(c.Request.Context())
	if err != nil {
		httpx.Fail(c, err)
		return
	}
	httpx.JSON(c, http.StatusOK, members)
}

func (h *Handler) Slugs(c *gin.Context) {
	slugs, err := h.service.Slugs(c.Request.Context())
	if err != nil {
		httpx.Fail(c, err)
		return
	}
	httpx.JSON(c, http.StatusOK, slugs)
}

func (h *Handler) Get(c *gin.Context) {
	member, err := h.service.Get(c.Request.Context(), c.Param("slug"))
	if err != nil {
		httpx.Fail(c, err)
		return
	}
	httpx.JSON(c, http.StatusOK, member)
}

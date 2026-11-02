package clients

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
	list, err := h.service.List(c.Request.Context())
	if err != nil {
		httpx.Fail(c, err)
		return
	}
	httpx.JSON(c, http.StatusOK, list)
}

func (h *Handler) Get(c *gin.Context) {
	id, err := httpx.ParamID(c, "id")
	if err != nil {
		httpx.Fail(c, err)
		return
	}
	client, err := h.service.Get(c.Request.Context(), id)
	if err != nil {
		httpx.Fail(c, err)
		return
	}
	httpx.JSON(c, http.StatusOK, client)
}

func (h *Handler) Create(c *gin.Context) {
	var in Input
	if err := httpx.Decode(c, &in); err != nil {
		httpx.Fail(c, err)
		return
	}
	client, err := h.service.Create(c.Request.Context(), in)
	if err != nil {
		httpx.Fail(c, err)
		return
	}
	httpx.JSON(c, http.StatusCreated, client)
}

func (h *Handler) Update(c *gin.Context) {
	id, err := httpx.ParamID(c, "id")
	if err != nil {
		httpx.Fail(c, err)
		return
	}
	var in Input
	if err := httpx.Decode(c, &in); err != nil {
		httpx.Fail(c, err)
		return
	}
	client, err := h.service.Update(c.Request.Context(), id, in)
	if err != nil {
		httpx.Fail(c, err)
		return
	}
	httpx.JSON(c, http.StatusOK, client)
}

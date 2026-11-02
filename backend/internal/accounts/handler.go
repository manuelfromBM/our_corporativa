package accounts

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"backend/internal/auth"
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

func (h *Handler) Invite(c *gin.Context) {
	var in CreateInput
	if err := httpx.Decode(c, &in); err != nil {
		httpx.Fail(c, err)
		return
	}
	result, err := h.service.Invite(c.Request.Context(), in)
	if err != nil {
		httpx.Fail(c, err)
		return
	}
	httpx.JSON(c, http.StatusCreated, result)
}

func (h *Handler) ResendInvitation(c *gin.Context) {
	id, err := httpx.ParamID(c, "id")
	if err != nil {
		httpx.Fail(c, err)
		return
	}
	if err := h.service.ResendInvitation(c.Request.Context(), id); err != nil {
		httpx.Fail(c, err)
		return
	}
	httpx.JSON(c, http.StatusOK, gin.H{"ok": true})
}

func (h *Handler) Update(c *gin.Context) {
	id, err := httpx.ParamID(c, "id")
	if err != nil {
		httpx.Fail(c, err)
		return
	}
	var in UpdateInput
	if err := httpx.Decode(c, &in); err != nil {
		httpx.Fail(c, err)
		return
	}
	account, err := h.service.Update(c.Request.Context(), auth.CurrentUser(c).ID, id, in)
	if err != nil {
		httpx.Fail(c, err)
		return
	}
	httpx.JSON(c, http.StatusOK, account)
}

func (h *Handler) SetClients(c *gin.Context) {
	id, err := httpx.ParamID(c, "id")
	if err != nil {
		httpx.Fail(c, err)
		return
	}
	var body struct {
		ClientIDs []int64 `json:"client_ids"`
	}
	if err := httpx.Decode(c, &body); err != nil {
		httpx.Fail(c, err)
		return
	}
	account, err := h.service.SetClients(c.Request.Context(), id, body.ClientIDs)
	if err != nil {
		httpx.Fail(c, err)
		return
	}
	httpx.JSON(c, http.StatusOK, account)
}

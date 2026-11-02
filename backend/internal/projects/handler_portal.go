package projects

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"backend/internal/auth"
	"backend/internal/platform/httpx"
)

// PortalHandler atiende /api/portal/*. Solo usa las lecturas filtradas por usuario y sus DTO.
type PortalHandler struct {
	service *Service
}

func NewPortalHandler(service *Service) *PortalHandler {
	return &PortalHandler{service: service}
}

func (h *PortalHandler) List(c *gin.Context) {
	list, err := h.service.PortalList(c.Request.Context(), auth.CurrentUser(c).ID)
	if err != nil {
		httpx.Fail(c, err)
		return
	}
	out := make([]portalProject, 0, len(list))
	for _, p := range list {
		out = append(out, toPortalProject(p))
	}
	httpx.JSON(c, http.StatusOK, out)
}

func (h *PortalHandler) Get(c *gin.Context) {
	id, err := httpx.ParamID(c, "id")
	if err != nil {
		httpx.Fail(c, err)
		return
	}
	p, milestones, updates, err := h.service.PortalDetail(c.Request.Context(), auth.CurrentUser(c).ID, id)
	if err != nil {
		httpx.Fail(c, err)
		return
	}
	httpx.JSON(c, http.StatusOK, toPortalDetail(*p, milestones, updates))
}

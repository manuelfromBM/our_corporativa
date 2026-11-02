package projects

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"backend/internal/auth"
	"backend/internal/platform/httpx"
)

// AdminHandler atiende /api/admin/projects/*. Las escrituras responden el detalle
// actualizado, para que el panel no tenga que volver a pedirlo.
type AdminHandler struct {
	service *Service
}

func NewAdminHandler(service *Service) *AdminHandler {
	return &AdminHandler{service: service}
}

func (h *AdminHandler) List(c *gin.Context) {
	list, err := h.service.List(c.Request.Context())
	if err != nil {
		httpx.Fail(c, err)
		return
	}
	out := make([]adminProject, 0, len(list))
	for _, p := range list {
		out = append(out, toAdminProject(p))
	}
	httpx.JSON(c, http.StatusOK, out)
}

func (h *AdminHandler) Get(c *gin.Context) {
	id, err := httpx.ParamID(c, "id")
	if err != nil {
		httpx.Fail(c, err)
		return
	}
	h.respondDetail(c, http.StatusOK, id)
}

func (h *AdminHandler) Create(c *gin.Context) {
	var in ProjectInput
	if err := httpx.Decode(c, &in); err != nil {
		httpx.Fail(c, err)
		return
	}
	id, err := h.service.Create(c.Request.Context(), in)
	if err != nil {
		httpx.Fail(c, err)
		return
	}
	h.respondDetail(c, http.StatusCreated, id)
}

func (h *AdminHandler) Update(c *gin.Context) {
	h.withProject(c, func(id int64) error {
		var in ProjectInput
		if err := httpx.Decode(c, &in); err != nil {
			return err
		}
		return h.service.Update(c.Request.Context(), id, in)
	})
}

func (h *AdminHandler) SetStatus(c *gin.Context) {
	h.withProject(c, func(id int64) error {
		var body struct {
			Status string `json:"status"`
		}
		if err := httpx.Decode(c, &body); err != nil {
			return err
		}
		return h.service.SetStatus(c.Request.Context(), id, body.Status)
	})
}

func (h *AdminHandler) AddMilestone(c *gin.Context) {
	h.withProject(c, func(id int64) error {
		var in MilestoneInput
		if err := httpx.Decode(c, &in); err != nil {
			return err
		}
		return h.service.AddMilestone(c.Request.Context(), id, in)
	})
}

func (h *AdminHandler) UpdateMilestone(c *gin.Context) {
	h.withProject(c, func(id int64) error {
		milestoneID, err := httpx.ParamID(c, "milestoneId")
		if err != nil {
			return err
		}
		var in MilestoneInput
		if err := httpx.Decode(c, &in); err != nil {
			return err
		}
		return h.service.UpdateMilestone(c.Request.Context(), id, milestoneID, in)
	})
}

func (h *AdminHandler) DeleteMilestone(c *gin.Context) {
	h.withProject(c, func(id int64) error {
		milestoneID, err := httpx.ParamID(c, "milestoneId")
		if err != nil {
			return err
		}
		return h.service.DeleteMilestone(c.Request.Context(), id, milestoneID)
	})
}

func (h *AdminHandler) AddUpdate(c *gin.Context) {
	h.withProject(c, func(id int64) error {
		var in UpdateInput
		if err := httpx.Decode(c, &in); err != nil {
			return err
		}
		return h.service.AddUpdate(c.Request.Context(), id, auth.CurrentUser(c).ID, in)
	})
}

func (h *AdminHandler) EditUpdate(c *gin.Context) {
	h.withProject(c, func(id int64) error {
		updateID, err := httpx.ParamID(c, "updateId")
		if err != nil {
			return err
		}
		var in UpdateInput
		if err := httpx.Decode(c, &in); err != nil {
			return err
		}
		return h.service.EditUpdate(c.Request.Context(), id, updateID, in)
	})
}

func (h *AdminHandler) DeleteUpdate(c *gin.Context) {
	h.withProject(c, func(id int64) error {
		updateID, err := httpx.ParamID(c, "updateId")
		if err != nil {
			return err
		}
		return h.service.DeleteUpdate(c.Request.Context(), id, updateID)
	})
}

// withProject lee el :id, ejecuta la escritura y responde el detalle actualizado.
func (h *AdminHandler) withProject(c *gin.Context, write func(id int64) error) {
	id, err := httpx.ParamID(c, "id")
	if err != nil {
		httpx.Fail(c, err)
		return
	}
	if err := write(id); err != nil {
		httpx.Fail(c, err)
		return
	}
	h.respondDetail(c, http.StatusOK, id)
}

func (h *AdminHandler) respondDetail(c *gin.Context, status int, id int64) {
	p, milestones, updates, err := h.service.Detail(c.Request.Context(), id)
	if err != nil {
		httpx.Fail(c, err)
		return
	}
	httpx.JSON(c, status, toAdminDetail(*p, milestones, updates))
}

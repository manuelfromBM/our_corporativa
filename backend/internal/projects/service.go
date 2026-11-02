package projects

import (
	"context"
	"slices"
	"strings"
	"time"

	"backend/internal/platform/httpx"
)

const dateLayout = "2006-01-02"

// Transiciones permitidas. Se puede pausar desde cualquier estado activo y retomar
// en cualquiera; entregado solo se reabre pasando a revisión.
var transitions = map[string][]string{
	StatusPending:   {StatusDiscovery, StatusPaused},
	StatusDiscovery: {StatusDesign, StatusBuild, StatusPaused},
	StatusDesign:    {StatusBuild, StatusDiscovery, StatusPaused},
	StatusBuild:     {StatusReview, StatusDesign, StatusPaused},
	StatusReview:    {StatusDelivered, StatusBuild, StatusPaused},
	StatusDelivered: {StatusReview},
	StatusPaused:    {StatusPending, StatusDiscovery, StatusDesign, StatusBuild, StatusReview},
}

// RequestLookup obtiene el servicio de una solicitud sin depender del paquete requests.
type RequestLookup interface {
	Service(ctx context.Context, id int64) (slug, titulo string, err error)
}

type Service struct {
	repo     *Repository
	requests RequestLookup
}

func NewService(repo *Repository, requests RequestLookup) *Service {
	return &Service{repo: repo, requests: requests}
}

// Vista del cliente. Toda lectura pasa por userID: un proyecto ajeno responde igual
// que uno inexistente, para no confirmar que existe.

func (s *Service) PortalList(ctx context.Context, userID int64) ([]Project, error) {
	return s.repo.listForUser(ctx, userID)
}

func (s *Service) PortalDetail(ctx context.Context, userID, id int64) (*Project, []Milestone, []Update, error) {
	p, err := s.repo.getForUser(ctx, userID, id)
	if err != nil {
		return nil, nil, nil, err
	}
	milestones, err := s.repo.milestones(ctx, id)
	if err != nil {
		return nil, nil, nil, err
	}
	updates, err := s.repo.updates(ctx, id, true)
	if err != nil {
		return nil, nil, nil, err
	}
	return p, milestones, updates, nil
}

// Gestión interna.

func (s *Service) List(ctx context.Context) ([]Project, error) {
	return s.repo.list(ctx)
}

func (s *Service) Detail(ctx context.Context, id int64) (*Project, []Milestone, []Update, error) {
	p, err := s.repo.get(ctx, id)
	if err != nil {
		return nil, nil, nil, err
	}
	milestones, err := s.repo.milestones(ctx, id)
	if err != nil {
		return nil, nil, nil, err
	}
	updates, err := s.repo.updates(ctx, id, false)
	if err != nil {
		return nil, nil, nil, err
	}
	return p, milestones, updates, nil
}

// Create crea un proyecto. Con request_id convierte esa solicitud en proyecto y
// toma de ella el servicio y, si falta, el nombre.
func (s *Service) Create(ctx context.Context, in ProjectInput) (int64, error) {
	if in.RequestID != nil {
		slug, titulo, err := s.requests.Service(ctx, *in.RequestID)
		if err != nil {
			return 0, err
		}
		in.ServiceSlug = slug
		if strings.TrimSpace(in.Name) == "" {
			in.Name = titulo
		}
	}
	if err := normalizeProject(&in); err != nil {
		return 0, err
	}
	return s.repo.create(ctx, in)
}

func (s *Service) Update(ctx context.Context, id int64, in ProjectInput) error {
	if err := normalizeProject(&in); err != nil {
		return err
	}
	return s.repo.update(ctx, id, in)
}

func (s *Service) SetStatus(ctx context.Context, id int64, status string) error {
	if _, known := transitions[status]; !known {
		return httpx.Invalid("el estado no es válido")
	}
	p, err := s.repo.get(ctx, id)
	if err != nil {
		return err
	}
	if !slices.Contains(transitions[p.Status], status) {
		return httpx.Conflict("no se puede pasar de " + p.Status + " a " + status)
	}
	return s.repo.setStatus(ctx, id, p.Status, status)
}

func (s *Service) AddMilestone(ctx context.Context, projectID int64, in MilestoneInput) error {
	if err := normalizeMilestone(&in); err != nil {
		return err
	}
	return s.repo.addMilestone(ctx, projectID, in)
}

func (s *Service) UpdateMilestone(ctx context.Context, projectID, id int64, in MilestoneInput) error {
	if err := normalizeMilestone(&in); err != nil {
		return err
	}
	return s.repo.updateMilestone(ctx, projectID, id, in)
}

func (s *Service) DeleteMilestone(ctx context.Context, projectID, id int64) error {
	return s.repo.deleteMilestone(ctx, projectID, id)
}

func (s *Service) AddUpdate(ctx context.Context, projectID, authorID int64, in UpdateInput) error {
	if err := normalizeUpdate(&in); err != nil {
		return err
	}
	return s.repo.addUpdate(ctx, projectID, authorID, in)
}

func (s *Service) EditUpdate(ctx context.Context, projectID, id int64, in UpdateInput) error {
	if err := normalizeUpdate(&in); err != nil {
		return err
	}
	return s.repo.updateUpdate(ctx, projectID, id, in)
}

func (s *Service) DeleteUpdate(ctx context.Context, projectID, id int64) error {
	return s.repo.deleteUpdate(ctx, projectID, id)
}

func normalizeProject(in *ProjectInput) error {
	in.Name = strings.TrimSpace(in.Name)
	in.ServiceSlug = strings.TrimSpace(in.ServiceSlug)
	in.Description = strings.TrimSpace(in.Description)
	in.InternalNotes = strings.TrimSpace(in.InternalNotes)

	if in.Name == "" {
		return httpx.Invalid("falta el nombre")
	}
	if in.ClientID <= 0 {
		return httpx.Invalid("falta el cliente")
	}
	if in.Progress < 0 || in.Progress > 100 {
		return httpx.Invalid("el avance debe estar entre 0 y 100")
	}
	var err error
	if in.StartedOn, err = normalizeDate(in.StartedOn); err != nil {
		return err
	}
	in.DueOn, err = normalizeDate(in.DueOn)
	return err
}

func normalizeMilestone(in *MilestoneInput) error {
	in.Title = strings.TrimSpace(in.Title)
	in.Description = strings.TrimSpace(in.Description)
	if in.Status == "" {
		in.Status = MilestonePending
	}

	if in.Title == "" {
		return httpx.Invalid("falta el título")
	}
	if in.Status != MilestonePending && in.Status != MilestoneInProgress && in.Status != MilestoneDone {
		return httpx.Invalid("el estado del hito no es válido")
	}
	var err error
	in.DueOn, err = normalizeDate(in.DueOn)
	return err
}

func normalizeUpdate(in *UpdateInput) error {
	in.Title = strings.TrimSpace(in.Title)
	in.Body = strings.TrimSpace(in.Body)
	if in.Title == "" {
		return httpx.Invalid("falta el título")
	}
	return nil
}

// normalizeDate valida una fecha AAAA-MM-DD; vacía equivale a sin fecha.
func normalizeDate(date *string) (*string, error) {
	if date == nil || strings.TrimSpace(*date) == "" {
		return nil, nil
	}
	v := strings.TrimSpace(*date)
	if _, err := time.Parse(dateLayout, v); err != nil {
		return nil, httpx.Invalid("las fechas deben tener el formato AAAA-MM-DD")
	}
	return &v, nil
}

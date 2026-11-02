package projects

// Respuestas para el cliente. Cada campo se copia de forma explícita: lo que no está
// aquí (notas internas, avances ocultos, origen del proyecto) no sale al portal.

type portalProject struct {
	ID          int64   `json:"id"`
	ClientName  string  `json:"client_name"`
	Name        string  `json:"name"`
	ServiceSlug string  `json:"service_slug"`
	Description string  `json:"description"`
	Status      string  `json:"status"`
	Progress    int     `json:"progress"`
	StartedOn   *string `json:"started_on"`
	DueOn       *string `json:"due_on"`
	UpdatedAt   string  `json:"updated_at"`
}

type portalMilestone struct {
	ID          int64   `json:"id"`
	Title       string  `json:"title"`
	Description string  `json:"description"`
	Status      string  `json:"status"`
	DueOn       *string `json:"due_on"`
	CompletedOn *string `json:"completed_on"`
}

type portalUpdate struct {
	ID         int64  `json:"id"`
	AuthorName string `json:"author_name"`
	Title      string `json:"title"`
	Body       string `json:"body"`
	CreatedAt  string `json:"created_at"`
}

type portalDetail struct {
	portalProject
	Milestones []portalMilestone `json:"milestones"`
	Updates    []portalUpdate    `json:"updates"`
}

func toPortalProject(p Project) portalProject {
	return portalProject{
		ID:          p.ID,
		ClientName:  p.ClientName,
		Name:        p.Name,
		ServiceSlug: p.ServiceSlug,
		Description: p.Description,
		Status:      p.Status,
		Progress:    p.Progress,
		StartedOn:   p.StartedOn,
		DueOn:       p.DueOn,
		UpdatedAt:   p.UpdatedAt,
	}
}

func toPortalDetail(p Project, milestones []Milestone, updates []Update) portalDetail {
	d := portalDetail{
		portalProject: toPortalProject(p),
		Milestones:    make([]portalMilestone, 0, len(milestones)),
		Updates:       make([]portalUpdate, 0, len(updates)),
	}
	for _, m := range milestones {
		d.Milestones = append(d.Milestones, portalMilestone{
			ID:          m.ID,
			Title:       m.Title,
			Description: m.Description,
			Status:      m.Status,
			DueOn:       m.DueOn,
			CompletedOn: m.CompletedOn,
		})
	}
	for _, n := range updates {
		d.Updates = append(d.Updates, portalUpdate{
			ID:         n.ID,
			AuthorName: n.AuthorName,
			Title:      n.Title,
			Body:       n.Body,
			CreatedAt:  n.CreatedAt,
		})
	}
	return d
}

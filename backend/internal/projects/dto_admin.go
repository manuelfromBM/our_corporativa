package projects

// Respuestas internas: incluyen notas y avances ocultos.

type adminProject struct {
	ID            int64   `json:"id"`
	ClientID      int64   `json:"client_id"`
	ClientName    string  `json:"client_name"`
	RequestID     *int64  `json:"request_id"`
	Name          string  `json:"name"`
	ServiceSlug   string  `json:"service_slug"`
	Description   string  `json:"description"`
	InternalNotes string  `json:"internal_notes"`
	Status        string  `json:"status"`
	Progress      int     `json:"progress"`
	StartedOn     *string `json:"started_on"`
	DueOn         *string `json:"due_on"`
	CreatedAt     string  `json:"created_at"`
	UpdatedAt     string  `json:"updated_at"`
}

type adminMilestone struct {
	ID          int64   `json:"id"`
	Title       string  `json:"title"`
	Description string  `json:"description"`
	Status      string  `json:"status"`
	DueOn       *string `json:"due_on"`
	CompletedOn *string `json:"completed_on"`
	Position    int     `json:"position"`
}

type adminUpdate struct {
	ID              int64  `json:"id"`
	AuthorName      string `json:"author_name"`
	Title           string `json:"title"`
	Body            string `json:"body"`
	VisibleToClient bool   `json:"visible_to_client"`
	CreatedAt       string `json:"created_at"`
}

type adminDetail struct {
	adminProject
	Milestones []adminMilestone `json:"milestones"`
	Updates    []adminUpdate    `json:"updates"`
}

func toAdminProject(p Project) adminProject {
	return adminProject{
		ID:            p.ID,
		ClientID:      p.ClientID,
		ClientName:    p.ClientName,
		RequestID:     p.RequestID,
		Name:          p.Name,
		ServiceSlug:   p.ServiceSlug,
		Description:   p.Description,
		InternalNotes: p.InternalNotes,
		Status:        p.Status,
		Progress:      p.Progress,
		StartedOn:     p.StartedOn,
		DueOn:         p.DueOn,
		CreatedAt:     p.CreatedAt,
		UpdatedAt:     p.UpdatedAt,
	}
}

func toAdminDetail(p Project, milestones []Milestone, updates []Update) adminDetail {
	d := adminDetail{
		adminProject: toAdminProject(p),
		Milestones:   make([]adminMilestone, 0, len(milestones)),
		Updates:      make([]adminUpdate, 0, len(updates)),
	}
	for _, m := range milestones {
		d.Milestones = append(d.Milestones, adminMilestone{
			ID:          m.ID,
			Title:       m.Title,
			Description: m.Description,
			Status:      m.Status,
			DueOn:       m.DueOn,
			CompletedOn: m.CompletedOn,
			Position:    m.Position,
		})
	}
	for _, n := range updates {
		d.Updates = append(d.Updates, adminUpdate{
			ID:              n.ID,
			AuthorName:      n.AuthorName,
			Title:           n.Title,
			Body:            n.Body,
			VisibleToClient: n.VisibleToClient,
			CreatedAt:       n.CreatedAt,
		})
	}
	return d
}

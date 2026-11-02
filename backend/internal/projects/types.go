package projects

// Estados de un proyecto.
const (
	StatusPending   = "por_iniciar"
	StatusDiscovery = "levantamiento"
	StatusDesign    = "diseno"
	StatusBuild     = "desarrollo"
	StatusReview    = "revision"
	StatusDelivered = "entregado"
	StatusPaused    = "pausado"
)

// Estados de un hito.
const (
	MilestonePending    = "pendiente"
	MilestoneInProgress = "en_curso"
	MilestoneDone       = "completado"
)

// Project es el modelo de dominio. No tiene tags JSON a propósito: lo que sale por la API
// pasa por los DTO, para que las notas internas no lleguen por descuido al portal.
type Project struct {
	ID            int64
	ClientID      int64
	ClientName    string
	RequestID     *int64
	Name          string
	ServiceSlug   string
	Description   string
	InternalNotes string
	Status        string
	Progress      int
	StartedOn     *string
	DueOn         *string
	CreatedAt     string
	UpdatedAt     string
}

type Milestone struct {
	ID          int64
	ProjectID   int64
	Title       string
	Description string
	Status      string
	DueOn       *string
	CompletedOn *string
	Position    int
}

type Update struct {
	ID              int64
	ProjectID       int64
	AuthorName      string
	Title           string
	Body            string
	VisibleToClient bool
	CreatedAt       string
}

// ProjectInput son los campos que edita el equipo. El estado cambia solo con SetStatus.
type ProjectInput struct {
	ClientID      int64   `json:"client_id"`
	RequestID     *int64  `json:"request_id"` // Solicitud de /cotizar que originó el proyecto.
	Name          string  `json:"name"`
	ServiceSlug   string  `json:"service_slug"`
	Description   string  `json:"description"`
	InternalNotes string  `json:"internal_notes"`
	Progress      int     `json:"progress"`
	StartedOn     *string `json:"started_on"`
	DueOn         *string `json:"due_on"`
}

type MilestoneInput struct {
	Title       string  `json:"title"`
	Description string  `json:"description"`
	Status      string  `json:"status"`
	DueOn       *string `json:"due_on"`
}

type UpdateInput struct {
	Title           string `json:"title"`
	Body            string `json:"body"`
	VisibleToClient bool   `json:"visible_to_client"`
}

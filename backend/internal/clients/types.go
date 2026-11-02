package clients

// Client es una empresa o persona que contrata proyectos.
type Client struct {
	ID          int64  `json:"id"`
	Name        string `json:"name"`
	ContactName string `json:"contact_name"`
	Email       string `json:"email"`
	Phone       string `json:"phone"`
	CreatedAt   string `json:"created_at"`
	UpdatedAt   string `json:"updated_at"`
}

type Input struct {
	Name        string `json:"name"`
	ContactName string `json:"contact_name"`
	Email       string `json:"email"`
	Phone       string `json:"phone"`
}

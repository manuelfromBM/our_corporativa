package accounts

// Account es un usuario visto desde la administración. Nunca incluye datos de contraseña.
type Account struct {
	ID        int64   `json:"id"`
	Email     string  `json:"email"`
	Name      string  `json:"name"`
	Role      string  `json:"role"`
	Active    bool    `json:"active"`
	Pending   bool    `json:"pending"` // Invitado que aún no crea su contraseña.
	ClientIDs []int64 `json:"client_ids"`
	CreatedAt string  `json:"created_at"`
}

type CreateInput struct {
	Email      string  `json:"email"`
	Name       string  `json:"name"`
	Role       string  `json:"role"`
	ClientIDs  []int64 `json:"client_ids"`
	MemberSlug string  `json:"member_slug"` // Enlaza a un integrante con su perfil público.
}

// UpdateInput solo cambia los campos presentes.
type UpdateInput struct {
	Name   *string `json:"name"`
	Role   *string `json:"role"`
	Active *bool   `json:"active"`
}

// CreateResult permite avisar que la cuenta se creó aunque el correo haya fallado.
type CreateResult struct {
	Account
	InvitationSent bool `json:"invitation_sent"`
}

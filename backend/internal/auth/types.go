package auth

const (
	RoleClient = "cliente"
	RoleMember = "integrante"
	RoleAdmin  = "admin"
)

// Propósitos de los tokens de un solo uso.
const (
	PurposeInvite = "invitacion"
	PurposeReset  = "recuperacion"
)

// User es la persona autenticada en la petición actual.
type User struct {
	ID    int64  `json:"id"`
	Email string `json:"email"`
	Name  string `json:"name"`
	Role  string `json:"role"`
}

// credentials son los datos necesarios para validar un login. Nunca salen de este paquete.
type credentials struct {
	user         User
	passwordHash string
	active       bool
}

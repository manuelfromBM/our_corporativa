package httpx

import "net/http"

// Error es un error de dominio con un mensaje apto para mostrarle al usuario.
// Los servicios lo devuelven sin saber de HTTP; Fail lo traduce al código de respuesta.
type Error struct {
	kind    kind
	Message string
}

type kind int

const (
	kindInvalid kind = iota
	kindUnauthorized
	kindForbidden
	kindNotFound
	kindConflict
	kindTooManyRequests
)

func (e *Error) Error() string { return e.Message }

func Invalid(msg string) error      { return &Error{kindInvalid, msg} }
func Unauthorized(msg string) error { return &Error{kindUnauthorized, msg} }
func Forbidden(msg string) error    { return &Error{kindForbidden, msg} }
func NotFound(msg string) error     { return &Error{kindNotFound, msg} }
func Conflict(msg string) error     { return &Error{kindConflict, msg} }
func TooMany(msg string) error      { return &Error{kindTooManyRequests, msg} }

func (k kind) status() int {
	switch k {
	case kindUnauthorized:
		return http.StatusUnauthorized
	case kindForbidden:
		return http.StatusForbidden
	case kindNotFound:
		return http.StatusNotFound
	case kindConflict:
		return http.StatusConflict
	case kindTooManyRequests:
		return http.StatusTooManyRequests
	default:
		return http.StatusBadRequest
	}
}

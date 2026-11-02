package httpx

import (
	"encoding/json"
	"errors"
	"log"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// JSON responde v con el código indicado.
func JSON(c *gin.Context, status int, v any) {
	c.JSON(status, v)
}

// Fail responde {"error": "mensaje"}. Cualquier error que no sea de dominio se registra
// y responde 500 sin exponer el detalle.
func Fail(c *gin.Context, err error) {
	var e *Error
	if errors.As(err, &e) {
		c.AbortWithStatusJSON(e.kind.status(), gin.H{"error": e.Message})
		return
	}
	log.Printf("error [%s]: %v", c.GetString(requestIDKey), err)
	c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "error interno"})
}

// Decode lee el cuerpo JSON en v.
func Decode(c *gin.Context, v any) error {
	if err := json.NewDecoder(c.Request.Body).Decode(v); err != nil {
		return Invalid("datos inválidos")
	}
	return nil
}

// ParamID lee un parámetro numérico de la ruta. Si no es válido, el recurso no existe.
func ParamID(c *gin.Context, name string) (int64, error) {
	id, err := strconv.ParseInt(c.Param(name), 10, 64)
	if err != nil || id <= 0 {
		return 0, NotFound("no encontrado")
	}
	return id, nil
}

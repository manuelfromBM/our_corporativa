package httpx

import (
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"log"
	"net/http"
	"runtime/debug"
	"time"

	"github.com/gin-gonic/gin"
)

const requestIDKey = "request_id"

// RequestID asigna a cada petición un identificador para cruzar respuestas con logs.
func RequestID() gin.HandlerFunc {
	return func(c *gin.Context) {
		b := make([]byte, 8)
		rand.Read(b)
		id := hex.EncodeToString(b)
		c.Set(requestIDKey, id)
		c.Header("X-Request-ID", id)
		c.Next()
	}
}

// Logger registra método, ruta, estado y duración. No registra query, cabeceras ni cuerpo,
// porque pueden traer tokens o datos personales.
func Logger() gin.HandlerFunc {
	return func(c *gin.Context) {
		start := time.Now()
		c.Next()
		log.Printf("%s %s %d %s [%s]", c.Request.Method, c.Request.URL.Path, c.Writer.Status(),
			time.Since(start).Round(time.Millisecond), c.GetString(requestIDKey))
	}
}

// Recover convierte un panic en un 500. Se usa en vez del de Gin, que al registrar
// el panic vuelca las cabeceras de la petición, incluida la cookie de sesión.
func Recover() gin.HandlerFunc {
	return func(c *gin.Context) {
		defer func() {
			if r := recover(); r != nil {
				Fail(c, fmt.Errorf("panic: %v\n%s", r, debug.Stack()))
			}
		}()
		c.Next()
	}
}

// LimitBody corta los cuerpos mayores a max bytes.
func LimitBody(max int64) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Request.Body = http.MaxBytesReader(c.Writer, c.Request.Body, max)
		c.Next()
	}
}

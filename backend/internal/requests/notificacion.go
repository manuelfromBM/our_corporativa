package requests

import (
	"bytes"
	"context"
	_ "embed"
	"encoding/json"
	"fmt"
	"html/template"
	"log"
	"strings"
	"time"
	_ "time/tzdata"

	"backend/internal/platform/mail"
)

//go:embed plantillas/solicitud.html
var plantillaSolicitud string

var correoSolicitud = template.Must(template.New("solicitud").Parse(plantillaSolicitud))

// Mailer entrega el correo; lo implementa mail.Client.
type Mailer interface {
	Deliver(ctx context.Context, m mail.Message) error
}

// Notificador avisa al equipo de cada solicitud nueva.
type Notificador struct {
	mailer  Mailer
	destino []string
	appURL  string
}

func NewNotificador(mailer Mailer, destino []string, appURL string) *Notificador {
	if len(destino) == 0 {
		log.Print("TEAM_EMAILS está vacío: las solicitudes nuevas no se avisarán por correo")
	}
	return &Notificador{mailer: mailer, destino: destino, appURL: appURL}
}

// Avisar envía en segundo plano: la solicitud ya está guardada y un fallo del correo
// no debe llegarle a quien la envió.
func (n *Notificador) Avisar(req Requerimiento, codigo string) {
	if len(n.destino) == 0 {
		return
	}
	go func() {
		msg, err := n.mensaje(req, codigo, time.Now())
		if err == nil {
			ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
			defer cancel()
			err = n.mailer.Deliver(ctx, msg)
		}
		if err != nil {
			log.Printf("error al avisar la solicitud %s: %v", codigo, err)
		}
	}()
}

func (n *Notificador) mensaje(req Requerimiento, codigo string, ahora time.Time) (mail.Message, error) {
	asunto := fmt.Sprintf("Nueva solicitud %s · %s · %s", codigo, req.Servicio.Titulo, req.Contacto.Nombre)
	if req.Sorteo {
		asunto = fmt.Sprintf("Nueva solicitud del sorteo %s · %s", codigo, req.Contacto.Nombre)
	}

	// El nombre viene del formulario: un salto de línea no puede llegar al asunto.
	asunto = strings.Join(strings.Fields(asunto), " ")

	secciones := make([]seccionCorreo, 0, len(req.Secciones))
	for _, s := range req.Secciones {
		seccion := seccionCorreo{Titulo: s.Titulo}
		for _, r := range s.Respuestas {
			seccion.Respuestas = append(seccion.Respuestas, respuestaCorreo{Pregunta: r.Pregunta, Texto: textoRespuesta(r.Respuesta)})
		}
		secciones = append(secciones, seccion)
	}

	var html bytes.Buffer
	err := correoSolicitud.Execute(&html, datosCorreo{
		Asunto:    asunto,
		Codigo:    codigo,
		Fecha:     fechaChile(ahora),
		Sorteo:    req.Sorteo,
		Servicio:  req.Servicio.Titulo,
		Contacto:  req.Contacto,
		WhatsApp:  soloDigitos(req.Contacto.Telefono),
		Secciones: secciones,
		PanelURL:  n.appURL + "/login-bm-327",
		Anio:      ahora.Year(),
	})
	if err != nil {
		return mail.Message{}, err
	}
	return mail.Message{To: n.destino, ReplyTo: req.Contacto.Correo, Subject: asunto, HTML: html.String()}, nil
}

type datosCorreo struct {
	Asunto    string
	Codigo    string
	Fecha     string
	Sorteo    bool
	Servicio  string
	Contacto  ContactoRequerimiento
	WhatsApp  string
	Secciones []seccionCorreo
	PanelURL  string
	Anio      int
}

type seccionCorreo struct {
	Titulo     string
	Respuestas []respuestaCorreo
}

type respuestaCorreo struct {
	Pregunta string
	Texto    string
}

// textoRespuesta muestra igual que el panel una respuesta de texto, lista u opción sí/no.
func textoRespuesta(raw json.RawMessage) string {
	var texto string
	if json.Unmarshal(raw, &texto) == nil {
		return texto
	}
	var lista []string
	if json.Unmarshal(raw, &lista) == nil {
		return strings.Join(lista, ", ")
	}
	var opcion bool
	if json.Unmarshal(raw, &opcion) == nil {
		if opcion {
			return "Sí"
		}
		return "No"
	}
	return string(raw)
}

func fechaChile(t time.Time) string {
	if zona, err := time.LoadLocation("America/Santiago"); err == nil {
		t = t.In(zona)
	}
	return t.Format("02-01-2006 15:04") + " hrs"
}

// WhatsApp necesita solo dígitos (con código de país).
func soloDigitos(telefono string) string {
	return strings.Map(func(r rune) rune {
		if r >= '0' && r <= '9' {
			return r
		}
		return -1
	}, telefono)
}

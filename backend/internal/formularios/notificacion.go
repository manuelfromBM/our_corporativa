package formularios

import (
	"bytes"
	"context"
	"embed"
	"fmt"
	"html/template"
	"log"
	"strings"
	"time"
	_ "time/tzdata"

	"backend/internal/platform/mail"
)

//go:embed plantillas/*.html
var plantillasFS embed.FS

// html/template escapa los datos del formulario, así que nadie puede inyectar HTML en los correos.
var plantillas = template.Must(template.ParseFS(plantillasFS, "plantillas/*.html"))

// Mailer entrega el correo; lo implementa mail.Client.
type Mailer interface {
	Deliver(ctx context.Context, m mail.Message) error
}

// Notificador envía los correos de los formularios de contacto y del sorteo.
type Notificador struct {
	mailer Mailer
	equipo []string
	appURL string
}

func NewNotificador(mailer Mailer, equipo []string, appURL string) *Notificador {
	return &Notificador{mailer: mailer, equipo: equipo, appURL: appURL}
}

// encabezado reúne lo que usan las piezas comunes de base.html.
type encabezado struct {
	Asunto   string
	Resumen  string
	Etiqueta string
	Fecha    string
	Anio     int
	Pie      string
}

type boton struct {
	URL   string
	Texto string
}

// AvisarContacto avisa al equipo de una consulta nueva; responder el correo le contesta a quien escribió.
func (n *Notificador) AvisarContacto(c Contacto) {
	if len(n.equipo) == 0 {
		return
	}
	ahora := time.Now()
	asunto := limpiarAsunto(fmt.Sprintf("[%s] Consulta de %s", c.TipoProyecto, c.Nombre))
	datos := struct {
		encabezado
		Contacto Contacto
		WhatsApp string
	}{
		encabezado: n.encabezado(asunto, c.Nombre+" envió una consulta desde el sitio.", "Formulario de contacto", "Aviso interno para el equipo.", ahora),
		Contacto:   c,
		WhatsApp:   soloDigitos(c.Telefono),
	}
	n.enviar("contacto", "contacto.html", datos, mail.Message{To: n.equipo, ReplyTo: c.Email, Subject: asunto})
}

// AvisarParticipante confirma la inscripción al participante y avisa al equipo.
// Son correos independientes: si uno falla, el otro igual sale.
func (n *Notificador) AvisarParticipante(p Participante) {
	ahora := time.Now()
	instagram := strings.TrimPrefix(p.UsuarioInstagram, "@")
	sitio := ""
	if p.URLSitioWeb != nil {
		sitio = *p.URLSitioWeb
	}

	asunto := "¡Tu participación en el sorteo fue registrada!"
	confirmacion := struct {
		encabezado
		P            Participante
		Instagram    string
		SitioWeb     string
		BotonDetalle boton
		BotonSitio   boton
	}{
		encabezado:   n.encabezado(asunto, "Recibimos tu registro al sorteo de BM Code Lab.", "Sorteo BM Code Lab", "Recibiste este correo porque te inscribiste en nuestro sorteo.", ahora),
		P:            p,
		Instagram:    instagram,
		SitioWeb:     sitio,
		BotonDetalle: boton{URL: n.appURL + "/registro-sorteo/detalle", Texto: "Detallar mi sitio web"},
		BotonSitio:   boton{URL: n.appURL + "/", Texto: "Conocer BM Code Lab"},
	}
	n.enviar("sorteo (participante)", "sorteo_participante.html", confirmacion, mail.Message{To: []string{p.Correo}, Subject: asunto})

	if len(n.equipo) == 0 {
		return
	}
	asuntoEquipo := limpiarAsunto(fmt.Sprintf("[Sorteo] %s %s · %s", p.Nombre, p.Apellido, p.TipoNegocio))
	aviso := struct {
		encabezado
		P         Participante
		Instagram string
		SitioWeb  string
	}{
		encabezado: n.encabezado(asuntoEquipo, p.Nombre+" "+p.Apellido+" se inscribió en el sorteo.", "Nueva participación · Sorteo", "Aviso interno para el equipo.", ahora),
		P:          p,
		Instagram:  instagram,
		SitioWeb:   sitio,
	}
	n.enviar("sorteo (equipo)", "sorteo_equipo.html", aviso, mail.Message{To: n.equipo, ReplyTo: p.Correo, Subject: asuntoEquipo})
}

func (n *Notificador) encabezado(asunto, resumen, etiqueta, pie string, ahora time.Time) encabezado {
	return encabezado{Asunto: asunto, Resumen: resumen, Etiqueta: etiqueta, Fecha: fechaChile(ahora), Anio: ahora.Year(), Pie: pie}
}

// enviar arma el HTML y lo manda en segundo plano: los datos ya están guardados y un
// fallo del correo no debe llegarle a quien llenó el formulario (si reintentara, se duplicaría).
func (n *Notificador) enviar(que, plantilla string, datos any, msg mail.Message) {
	var html bytes.Buffer
	if err := plantillas.ExecuteTemplate(&html, plantilla, datos); err != nil {
		log.Printf("error al armar el correo de %s: %v", que, err)
		return
	}
	msg.HTML = html.String()
	go func() {
		ctx, cancel := context.WithTimeout(context.Background(), 15*time.Second)
		defer cancel()
		if err := n.mailer.Deliver(ctx, msg); err != nil {
			log.Printf("error al enviar el correo de %s a %s: %v", que, strings.Join(msg.To, ", "), err)
		}
	}()
}

// El nombre viene del formulario: un salto de línea no puede llegar al asunto.
func limpiarAsunto(asunto string) string {
	return strings.Join(strings.Fields(asunto), " ")
}

var (
	diasES  = [...]string{"domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"}
	mesesES = [...]string{"enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"}
)

// fechaChile da la fecha completa en español, ej: "lunes, 9 de noviembre de 2026 · 14:05 hrs".
func fechaChile(t time.Time) string {
	if zona, err := time.LoadLocation("America/Santiago"); err == nil {
		t = t.In(zona)
	}
	return fmt.Sprintf("%s, %d de %s de %d · %s hrs", diasES[t.Weekday()], t.Day(), mesesES[t.Month()-1], t.Year(), t.Format("15:04"))
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

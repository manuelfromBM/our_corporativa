package formularios

import (
	"context"
	"os"
	"path/filepath"
	"strings"
	"sync"
	"testing"
	"time"

	"backend/internal/platform/mail"
)

type mailerFalso struct {
	mu       sync.Mutex
	enviados []mail.Message
	listo    chan struct{}
}

func (m *mailerFalso) Deliver(_ context.Context, msg mail.Message) error {
	m.mu.Lock()
	m.enviados = append(m.enviados, msg)
	m.mu.Unlock()
	m.listo <- struct{}{}
	return nil
}

func esperar(t *testing.T, m *mailerFalso, n int) []mail.Message {
	t.Helper()
	for i := 0; i < n; i++ {
		select {
		case <-m.listo:
		case <-time.After(2 * time.Second):
			t.Fatalf("se esperaban %d correos, llegaron %d", n, i)
		}
	}
	m.mu.Lock()
	defer m.mu.Unlock()
	return m.enviados
}

// guardar deja el HTML en CORREOS_DIR (si está definido) para revisarlo en un navegador.
func guardar(t *testing.T, nombre, html string) {
	if dir := os.Getenv("CORREOS_DIR"); dir != "" {
		if err := os.WriteFile(filepath.Join(dir, nombre), []byte(html), 0o644); err != nil {
			t.Fatal(err)
		}
	}
}

func TestAvisarContacto(t *testing.T) {
	m := &mailerFalso{listo: make(chan struct{}, 4)}
	n := NewNotificador(m, []string{"equipo@bmcodelab.cl"}, "https://www.bmcodelab.cl")

	n.AvisarContacto(Contacto{
		Nombre:       "Ana <b>Pérez</b>\n",
		Email:        "ana@ejemplo.cl",
		Telefono:     "+56 9 1234 5678",
		TipoProyecto: "Pagina web",
		Mensaje:      "Hola,\nquiero una web.",
	})

	msg := esperar(t, m, 1)[0]
	if msg.ReplyTo != "ana@ejemplo.cl" || msg.To[0] != "equipo@bmcodelab.cl" {
		t.Fatalf("destinatarios incorrectos: %+v", msg)
	}
	if strings.Contains(msg.Subject, "\n") {
		t.Fatalf("el asunto tiene saltos de línea: %q", msg.Subject)
	}
	if strings.Contains(msg.HTML, "<b>Pérez</b>") {
		t.Fatal("el nombre no se escapó en el HTML")
	}
	if !strings.Contains(msg.HTML, "wa.me/56912345678") {
		t.Fatal("falta el enlace de WhatsApp")
	}
	guardar(t, "contacto.html", msg.HTML)
}

func TestAvisarParticipante(t *testing.T) {
	m := &mailerFalso{listo: make(chan struct{}, 4)}
	n := NewNotificador(m, []string{"equipo@bmcodelab.cl"}, "https://www.bmcodelab.cl")
	sitio := "javascript:alert(1)"

	n.AvisarParticipante(Participante{
		Nombre: "Luis", Apellido: "Rojas", Correo: "luis@ejemplo.cl", UsuarioInstagram: "@luis.rojas",
		TipoNegocio: "Barbería / Peluquería", NombreNegocio: "Barbería Luis", Comuna: "Ñuñoa",
		TieneSitioWeb: true, URLSitioWeb: &sitio,
	})

	enviados := esperar(t, m, 2)
	var participante, equipo mail.Message
	for _, msg := range enviados {
		if msg.To[0] == "luis@ejemplo.cl" {
			participante = msg
		} else {
			equipo = msg
		}
	}
	if participante.Subject == "" || equipo.Subject == "" {
		t.Fatalf("faltan correos: %+v", enviados)
	}
	if equipo.ReplyTo != "luis@ejemplo.cl" {
		t.Fatalf("el aviso al equipo debe responder al participante: %q", equipo.ReplyTo)
	}
	if !strings.Contains(participante.HTML, "https://www.bmcodelab.cl/registro-sorteo/detalle") {
		t.Fatal("falta el enlace para detallar el sitio")
	}
	if strings.Contains(equipo.HTML, "@@") || !strings.Contains(equipo.HTML, "instagram.com/luis.rojas") {
		t.Fatal("el usuario de Instagram no se normalizó")
	}
	if strings.Contains(equipo.HTML, `href="javascript:`) {
		t.Fatal("una URL javascript: llegó a un enlace")
	}
	guardar(t, "sorteo_participante.html", participante.HTML)
	guardar(t, "sorteo_equipo.html", equipo.HTML)
}

func TestSinEquipoSoloConfirmaAlParticipante(t *testing.T) {
	m := &mailerFalso{listo: make(chan struct{}, 4)}
	n := NewNotificador(m, nil, "http://localhost:3000")

	n.AvisarContacto(Contacto{Nombre: "Ana", Email: "ana@ejemplo.cl", Telefono: "1", TipoProyecto: "Otro", Mensaje: "x"})
	n.AvisarParticipante(Participante{Nombre: "Luis", Apellido: "Rojas", Correo: "luis@ejemplo.cl", TipoNegocio: "Otro", NombreNegocio: "X", Comuna: "Y"})

	enviados := esperar(t, m, 1)
	time.Sleep(100 * time.Millisecond)
	if len(m.enviados) != 1 || enviados[0].To[0] != "luis@ejemplo.cl" {
		t.Fatalf("sin TEAM_EMAILS solo debe salir la confirmación: %+v", m.enviados)
	}
}

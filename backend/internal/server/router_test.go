package server

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/http/cookiejar"
	"net/http/httptest"
	"net/url"
	"os"
	"regexp"
	"strings"
	"sync"
	"testing"
	"time"

	"backend/internal/config"
	"backend/internal/platform/database"
	"backend/internal/team"
)

const (
	adminEmail    = "admin@bmcodelab.cl"
	adminPassword = "clave-del-admin-123"
	userPassword  = "clave-de-usuario-123"
)

var tokenRe = regexp.MustCompile(`token=([A-Za-z0-9_-]+)`)

type app struct {
	t   *testing.T
	url string
	log *safeBuffer // Sin RESEND_API_KEY los correos quedan en el log.
}

// safeBuffer permite leer el log mientras el envío en segundo plano escribe en él.
type safeBuffer struct {
	mu  sync.Mutex
	buf bytes.Buffer
}

func (b *safeBuffer) Write(p []byte) (int, error) {
	b.mu.Lock()
	defer b.mu.Unlock()
	return b.buf.Write(p)
}

func (b *safeBuffer) String() string {
	b.mu.Lock()
	defer b.mu.Unlock()
	return b.buf.String()
}

type client struct {
	app  *app
	http *http.Client
}

// testDatabaseURL crea un esquema propio para el test, así cada uno parte vacío.
func testDatabaseURL(t *testing.T) string {
	t.Helper()
	base := os.Getenv("TEST_DATABASE_URL")
	if base == "" {
		t.Fatal("falta TEST_DATABASE_URL: los tests necesitan una base Postgres de pruebas")
	}
	admin, err := database.Open(base)
	if err != nil {
		t.Fatal(err)
	}
	schema := fmt.Sprintf("test_%d", time.Now().UnixNano())
	if _, err := admin.Exec(`CREATE SCHEMA ` + schema); err != nil {
		t.Fatal(err)
	}
	t.Cleanup(func() {
		admin.Exec(`DROP SCHEMA ` + schema + ` CASCADE`)
		admin.Close()
	})

	u, err := url.Parse(base)
	if err != nil {
		t.Fatal(err)
	}
	q := u.Query()
	q.Set("search_path", schema)
	u.RawQuery = q.Encode()
	return u.String()
}

func newApp(t *testing.T) *app {
	t.Helper()
	ctx := context.Background()
	db, err := database.Open(testDatabaseURL(t))
	if err != nil {
		t.Fatal(err)
	}
	t.Cleanup(func() { db.Close() })
	if err := database.Migrate(ctx, db); err != nil {
		t.Fatal(err)
	}
	if err := database.Migrate(ctx, db); err != nil {
		t.Fatalf("migrar dos veces debe ser inocuo: %v", err)
	}
	if err := team.Seed(ctx, db); err != nil {
		t.Fatal(err)
	}

	cfg := config.Config{
		Env: "development", AppURL: "http://app.test", SessionTTL: time.Hour, TeamEmails: []string{"equipo@bmcodelab.cl", "otro@bmcodelab.cl"},
	}
	c := NewContainer(db, cfg)
	if err := c.AccountsService.Bootstrap(ctx, adminEmail, adminPassword); err != nil {
		t.Fatal(err)
	}

	logs := &safeBuffer{}
	previous := log.Writer()
	log.SetOutput(logs)
	t.Cleanup(func() { log.SetOutput(previous) })

	srv := httptest.NewServer(NewRouter(c))
	t.Cleanup(srv.Close)
	return &app{t: t, url: srv.URL, log: logs}
}

func (a *app) anon() *client {
	jar, _ := cookiejar.New(nil)
	return &client{app: a, http: &http.Client{Jar: jar}}
}

func (a *app) login(email, password string) *client {
	a.t.Helper()
	c := a.anon()
	c.want(http.StatusOK, "POST", "/api/auth/login", map[string]any{"email": email, "password": password})
	return c
}

// lastToken devuelve el último token enviado por correo.
func (a *app) lastToken() string {
	a.t.Helper()
	found := tokenRe.FindAllStringSubmatch(a.log.String(), -1)
	if len(found) == 0 {
		a.t.Fatal("no se envió ningún token")
	}
	return found[len(found)-1][1]
}

// invite crea una cuenta, la activa e inicia su sesión.
func (a *app) invite(admin *client, email, role string, clientIDs ...int64) (*client, int64) {
	a.t.Helper()
	body := map[string]any{"email": email, "name": "Persona", "role": role}
	if len(clientIDs) > 0 {
		body["client_ids"] = clientIDs
	}
	res := admin.want(http.StatusCreated, "POST", "/api/admin/users", body)
	a.anon().want(http.StatusOK, "POST", "/api/auth/password/reset", map[string]any{"token": a.lastToken(), "password": userPassword})
	return a.login(email, userPassword), int64(res["id"].(float64))
}

func (c *client) want(status int, method, path string, body any) map[string]any {
	c.app.t.Helper()
	raw := c.raw(status, method, path, body)
	out := map[string]any{}
	if strings.HasPrefix(raw, "{") {
		if err := json.Unmarshal([]byte(raw), &out); err != nil {
			c.app.t.Fatal(err)
		}
	}
	return out
}

func (c *client) raw(status int, method, path string, body any) string {
	c.app.t.Helper()
	reader := bytes.NewReader(nil)
	if body != nil {
		b, _ := json.Marshal(body)
		reader = bytes.NewReader(b)
	}
	req, _ := http.NewRequest(method, c.app.url+path, reader)
	res, err := c.http.Do(req)
	if err != nil {
		c.app.t.Fatal(err)
	}
	defer res.Body.Close()
	buf := &bytes.Buffer{}
	buf.ReadFrom(res.Body)
	if res.StatusCode != status {
		c.app.t.Fatalf("%s %s: esperaba %d, llegó %d: %s", method, path, status, res.StatusCode, buf)
	}
	return buf.String()
}

func TestPublicRoutes(t *testing.T) {
	a := newApp(t)
	anon := a.anon()
	anon.raw(http.StatusOK, "GET", "/api/team", nil)
	anon.raw(http.StatusOK, "GET", "/api/team/slugs", nil)
	anon.raw(http.StatusOK, "GET", "/api/team/manuel", nil)
	if got := anon.want(http.StatusNotFound, "GET", "/api/team/nadie", nil); got["error"] != "miembro no encontrado" {
		t.Fatalf("error inesperado: %v", got)
	}
	anon.want(http.StatusBadRequest, "POST", "/api/requerimientos", map[string]any{})
	anon.want(http.StatusNotFound, "GET", "/api/requerimientos", nil)
	anon.want(http.StatusUnauthorized, "GET", "/api/admin/requests", nil)
}

func TestContactoSeGuarda(t *testing.T) {
	a := newApp(t)
	anon := a.anon()
	anon.want(http.StatusBadRequest, "POST", "/api/contactos", map[string]any{})
	anon.want(http.StatusCreated, "POST", "/api/contactos", map[string]any{
		"nombre": "Ana", "email": "ana@test.cl", "telefono": "+56911111111", "tipoProyecto": "Pagina web", "mensaje": "Hola",
	})
}

func TestParticipanteNoSeRepite(t *testing.T) {
	a := newApp(t)
	anon := a.anon()
	participante := map[string]any{
		"nombre": "Ana", "apellido": "Rojas", "correo": "ana@test.cl", "usuario_instagram": "@ana",
		"tipo_negocio": "Otro", "nombre_negocio": "Ana Store", "comuna": "Maipú",
		"tiene_sitio_web": true, "url_sitio_web": nil,
	}
	anon.want(http.StatusBadRequest, "POST", "/api/sorteo/participantes", participante)

	participante["tiene_sitio_web"] = false
	anon.want(http.StatusCreated, "POST", "/api/sorteo/participantes", participante)

	participante["correo"] = "ANA@test.cl"
	anon.want(http.StatusConflict, "POST", "/api/sorteo/participantes", participante)
}

func TestCookieIsHttpOnly(t *testing.T) {
	a := newApp(t)
	b, _ := json.Marshal(map[string]string{"email": adminEmail, "password": adminPassword})
	res, err := http.Post(a.url+"/api/auth/login", "application/json", bytes.NewReader(b))
	if err != nil {
		t.Fatal(err)
	}
	defer res.Body.Close()
	cookie := res.Header.Get("Set-Cookie")
	if !strings.Contains(cookie, "HttpOnly") || !strings.Contains(cookie, "SameSite=Lax") {
		t.Fatalf("cookie insegura: %s", cookie)
	}
}

func TestLoginLockout(t *testing.T) {
	a := newApp(t)
	anon := a.anon()
	bad := map[string]any{"email": adminEmail, "password": "incorrecta"}
	for range 5 {
		anon.want(http.StatusUnauthorized, "POST", "/api/auth/login", bad)
	}
	anon.want(http.StatusTooManyRequests, "POST", "/api/auth/login", bad)
	// Ni siquiera la contraseña correcta entra durante el bloqueo.
	anon.want(http.StatusTooManyRequests, "POST", "/api/auth/login", map[string]any{"email": adminEmail, "password": adminPassword})
}

func TestUnknownEmailGetsSameAnswer(t *testing.T) {
	a := newApp(t)
	anon := a.anon()
	wrongPassword := anon.want(http.StatusUnauthorized, "POST", "/api/auth/login", map[string]any{"email": adminEmail, "password": "incorrecta"})
	unknown := anon.want(http.StatusUnauthorized, "POST", "/api/auth/login", map[string]any{"email": "nadie@test.cl", "password": "incorrecta"})
	if wrongPassword["error"] != unknown["error"] {
		t.Fatalf("los mensajes delatan qué correos existen: %v / %v", wrongPassword, unknown)
	}
	anon.want(http.StatusOK, "POST", "/api/auth/password/forgot", map[string]any{"email": "nadie@test.cl"})
}

func TestInvitationTokenIsSingleUse(t *testing.T) {
	a := newApp(t)
	admin := a.login(adminEmail, adminPassword)
	a.anon().want(http.StatusUnauthorized, "GET", "/api/auth/me", nil)
	admin.want(http.StatusCreated, "POST", "/api/admin/users", map[string]any{"email": "nuevo@test.cl", "name": "Nuevo", "role": "integrante"})
	token := a.lastToken()

	// Antes de activar no se puede entrar.
	a.anon().want(http.StatusUnauthorized, "POST", "/api/auth/login", map[string]any{"email": "nuevo@test.cl", "password": userPassword})

	anon := a.anon()
	anon.want(http.StatusBadRequest, "POST", "/api/auth/password/reset", map[string]any{"token": token, "password": "corta"})
	anon.want(http.StatusOK, "POST", "/api/auth/password/reset", map[string]any{"token": token, "password": userPassword})
	anon.want(http.StatusBadRequest, "POST", "/api/auth/password/reset", map[string]any{"token": token, "password": "otra-clave-larga-456"})
	a.login("nuevo@test.cl", userPassword)
}

func TestPasswordRecoveryClosesSessions(t *testing.T) {
	a := newApp(t)
	admin := a.login(adminEmail, adminPassword)
	user, _ := a.invite(admin, "persona@test.cl", "integrante")

	a.anon().want(http.StatusOK, "POST", "/api/auth/password/forgot", map[string]any{"email": "persona@test.cl"})
	var token string
	for range 100 { // El correo sale en segundo plano.
		if strings.Contains(a.log.String(), "/restablecer-contrasena?token=") {
			token = a.lastToken()
			break
		}
		time.Sleep(10 * time.Millisecond)
	}
	a.anon().want(http.StatusOK, "POST", "/api/auth/password/reset", map[string]any{"token": token, "password": "clave-nueva-789-abc"})

	user.want(http.StatusUnauthorized, "GET", "/api/auth/me", nil)
	a.anon().want(http.StatusUnauthorized, "POST", "/api/auth/login", map[string]any{"email": "persona@test.cl", "password": userPassword})
	a.login("persona@test.cl", "clave-nueva-789-abc")
}

func TestRolesAndAccountRules(t *testing.T) {
	a := newApp(t)
	admin := a.login(adminEmail, adminPassword)
	me := admin.want(http.StatusOK, "GET", "/api/auth/me", nil)
	if _, leaked := me["password_hash"]; leaked {
		t.Fatal("se expuso el hash")
	}
	adminID := int(me["id"].(float64))

	member, memberID := a.invite(admin, "integrante@test.cl", "integrante")
	member.want(http.StatusOK, "GET", "/api/admin/clients", nil)
	member.want(http.StatusForbidden, "GET", "/api/admin/users", nil)
	member.want(http.StatusForbidden, "GET", "/api/portal/projects", nil)

	admin.want(http.StatusConflict, "POST", "/api/admin/users", map[string]any{"email": "INTEGRANTE@test.cl", "name": "x", "role": "cliente"})
	admin.want(http.StatusBadRequest, "POST", "/api/admin/users", map[string]any{"email": "x@test.cl", "name": "x", "role": "root"})
	admin.want(http.StatusBadRequest, "POST", "/api/admin/users", map[string]any{"email": "x@test.cl", "name": "x", "role": "cliente", "client_ids": []int{999}})
	admin.want(http.StatusForbidden, "PATCH", fmt.Sprintf("/api/admin/users/%d", adminID), map[string]any{"role": "cliente"})
	admin.want(http.StatusForbidden, "PATCH", fmt.Sprintf("/api/admin/users/%d", adminID), map[string]any{"active": false})

	admin.want(http.StatusOK, "PATCH", fmt.Sprintf("/api/admin/users/%d", memberID), map[string]any{"active": false})
	member.want(http.StatusUnauthorized, "GET", "/api/auth/me", nil)
	a.anon().want(http.StatusUnauthorized, "POST", "/api/auth/login", map[string]any{"email": "integrante@test.cl", "password": userPassword})
}

func TestLogout(t *testing.T) {
	a := newApp(t)
	admin := a.login(adminEmail, adminPassword)
	admin.want(http.StatusOK, "POST", "/api/auth/logout", nil)
	admin.want(http.StatusUnauthorized, "GET", "/api/auth/me", nil)
}

func TestPortalIsolation(t *testing.T) {
	a := newApp(t)
	admin := a.login(adminEmail, adminPassword)
	acme := int64(admin.want(http.StatusCreated, "POST", "/api/admin/clients", map[string]any{"name": "Acme"})["id"].(float64))
	otra := int64(admin.want(http.StatusCreated, "POST", "/api/admin/clients", map[string]any{"name": "Otra"})["id"].(float64))
	owner, _ := a.invite(admin, "acme@test.cl", "cliente", acme)
	stranger, _ := a.invite(admin, "otra@test.cl", "cliente", otra)

	p := admin.want(http.StatusCreated, "POST", "/api/admin/projects", map[string]any{
		"client_id": acme, "name": "Sitio", "description": "visible", "internal_notes": "MARGEN-SECRETO", "progress": 30,
	})
	path := fmt.Sprintf("/api/admin/projects/%d", int(p["id"].(float64)))
	portal := fmt.Sprintf("/api/portal/projects/%d", int(p["id"].(float64)))
	admin.want(http.StatusOK, "POST", path+"/updates", map[string]any{"title": "AVANCE-OCULTO"})
	admin.want(http.StatusOK, "POST", path+"/updates", map[string]any{"title": "Publicado", "visible_to_client": true})
	admin.want(http.StatusOK, "POST", path+"/milestones", map[string]any{"title": "Diseño", "status": "completado"})

	body := owner.raw(http.StatusOK, "GET", portal, nil)
	for _, secret := range []string{"MARGEN-SECRETO", "AVANCE-OCULTO", "internal_notes", "visible_to_client", "request_id"} {
		if strings.Contains(body, secret) {
			t.Fatalf("el portal expone %q: %s", secret, body)
		}
	}
	if !strings.Contains(body, "Publicado") || !strings.Contains(body, "Diseño") {
		t.Fatalf("faltan datos en el portal: %s", body)
	}
	if list := owner.raw(http.StatusOK, "GET", "/api/portal/projects", nil); strings.Contains(list, "MARGEN-SECRETO") || !strings.Contains(list, "Sitio") {
		t.Fatalf("lista incorrecta: %s", list)
	}

	// Ajeno e inexistente responden lo mismo.
	foreign := stranger.raw(http.StatusNotFound, "GET", portal, nil)
	missing := stranger.raw(http.StatusNotFound, "GET", "/api/portal/projects/99999", nil)
	if foreign != missing {
		t.Fatalf("se distingue un proyecto ajeno: %s / %s", foreign, missing)
	}
	if list := stranger.raw(http.StatusOK, "GET", "/api/portal/projects", nil); list != "[]" {
		t.Fatalf("ve proyectos ajenos: %s", list)
	}

	owner.want(http.StatusForbidden, "GET", path, nil)
	owner.want(http.StatusForbidden, "GET", "/api/admin/requests", nil)
	a.anon().want(http.StatusUnauthorized, "GET", portal, nil)
}

func TestStatusTransitions(t *testing.T) {
	a := newApp(t)
	admin := a.login(adminEmail, adminPassword)
	client := admin.want(http.StatusCreated, "POST", "/api/admin/clients", map[string]any{"name": "Acme"})
	p := admin.want(http.StatusCreated, "POST", "/api/admin/projects", map[string]any{"client_id": client["id"], "name": "Sitio"})
	path := fmt.Sprintf("/api/admin/projects/%d/status", int(p["id"].(float64)))

	admin.want(http.StatusConflict, "POST", path, map[string]any{"status": "entregado"})
	admin.want(http.StatusBadRequest, "POST", path, map[string]any{"status": "inventado"})
	for _, s := range []string{"levantamiento", "desarrollo", "pausado", "revision", "entregado"} {
		p = admin.want(http.StatusOK, "POST", path, map[string]any{"status": s})
	}
	if p["progress"] != float64(100) {
		t.Fatalf("al entregar el avance debe ser 100: %v", p["progress"])
	}
	admin.want(http.StatusConflict, "POST", path, map[string]any{"status": "desarrollo"})
}

func TestProjectValidationAndNestedOwnership(t *testing.T) {
	a := newApp(t)
	admin := a.login(adminEmail, adminPassword)
	client := admin.want(http.StatusCreated, "POST", "/api/admin/clients", map[string]any{"name": "Acme"})

	admin.want(http.StatusBadRequest, "POST", "/api/admin/projects", map[string]any{"client_id": 999, "name": "x"})
	admin.want(http.StatusBadRequest, "POST", "/api/admin/projects", map[string]any{"client_id": client["id"], "name": "x", "progress": 101})
	admin.want(http.StatusBadRequest, "POST", "/api/admin/projects", map[string]any{"client_id": client["id"], "name": "x", "due_on": "31-10-2026"})

	one := admin.want(http.StatusCreated, "POST", "/api/admin/projects", map[string]any{"client_id": client["id"], "name": "Uno"})
	two := admin.want(http.StatusCreated, "POST", "/api/admin/projects", map[string]any{"client_id": client["id"], "name": "Dos"})
	onePath := fmt.Sprintf("/api/admin/projects/%d", int(one["id"].(float64)))
	twoPath := fmt.Sprintf("/api/admin/projects/%d", int(two["id"].(float64)))

	admin.want(http.StatusNotFound, "POST", "/api/admin/projects/999/milestones", map[string]any{"title": "x"})
	withMilestone := admin.want(http.StatusOK, "POST", onePath+"/milestones", map[string]any{"title": "Hito"})
	milestone := int(withMilestone["milestones"].([]any)[0].(map[string]any)["id"].(float64))
	// Un hito no se puede tocar a través de otro proyecto.
	admin.want(http.StatusNotFound, "DELETE", fmt.Sprintf("%s/milestones/%d", twoPath, milestone), nil)
	admin.want(http.StatusOK, "DELETE", fmt.Sprintf("%s/milestones/%d", onePath, milestone), nil)
}

func TestConvertRequestIntoProject(t *testing.T) {
	a := newApp(t)
	admin := a.login(adminEmail, adminPassword)
	a.anon().want(http.StatusCreated, "POST", "/api/requerimientos", map[string]any{
		"servicio": map[string]any{"slug": "desarrollo-web", "titulo": "Desarrollo web"},
		"contacto": map[string]any{"nombre": "Ana", "correo": "ana@test.cl", "telefono": "123"},
		"secciones": []any{map[string]any{"id": "s", "titulo": "S", "respuestas": []any{
			map[string]any{"id": "r", "pregunta": "P", "respuesta": "R"},
		}}},
		"enviado_en": "2026-10-31T00:00:00Z",
	})
	var list []map[string]any
	json.Unmarshal([]byte(admin.raw(http.StatusOK, "GET", "/api/admin/requests", nil)), &list)
	if len(list) != 1 {
		t.Fatalf("solicitudes: %d", len(list))
	}
	client := admin.want(http.StatusCreated, "POST", "/api/admin/clients", map[string]any{"name": "Ana"})
	in := map[string]any{"client_id": client["id"], "request_id": list[0]["id"]}

	p := admin.want(http.StatusCreated, "POST", "/api/admin/projects", in)
	if p["name"] != "Desarrollo web" || p["service_slug"] != "desarrollo-web" {
		t.Fatalf("no tomó los datos de la solicitud: %v", p)
	}
	admin.want(http.StatusConflict, "POST", "/api/admin/projects", in)
	admin.want(http.StatusNotFound, "POST", "/api/admin/projects", map[string]any{"client_id": client["id"], "request_id": 999})
}

func TestSessionReadsRequests(t *testing.T) {
	a := newApp(t)
	admin := a.login(adminEmail, adminPassword)
	admin.raw(http.StatusOK, "GET", "/api/admin/requests", nil)

	cliente, _ := a.invite(admin, "cliente@empresa.cl", "cliente")
	cliente.want(http.StatusForbidden, "GET", "/api/admin/requests", nil)
}

func TestNewRequestNotifiesTeam(t *testing.T) {
	a := newApp(t)
	a.anon().want(http.StatusCreated, "POST", "/api/requerimientos", map[string]any{
		"servicio": map[string]any{"slug": "web", "titulo": "Sitio web"},
		"contacto": map[string]any{"nombre": "<script>Ana</script>", "correo": "ana@empresa.cl", "telefono": "+56 9 1234 5678"},
		"secciones": []map[string]any{{"id": "s", "titulo": "Proyecto", "respuestas": []map[string]any{
			{"id": "a", "pregunta": "Objetivo", "respuesta": "Vender online"},
			{"id": "b", "pregunta": "Módulos", "respuesta": []string{"Pagos", "Blog"}},
			{"id": "c", "pregunta": "Tiene dominio", "respuesta": true},
		}}},
	})

	for i := 0; i < 100 && !strings.Contains(a.log.String(), "correo omitido"); i++ {
		time.Sleep(10 * time.Millisecond)
	}
	got := a.log.String()
	for _, want := range []string{
		"equipo@bmcodelab.cl, otro@bmcodelab.cl: Nueva solicitud REQ-", "Sitio web",
		"Vender online", "Pagos, Blog", "Sí", "https://wa.me/56912345678",
		"http://app.test/login-bm-327", "&lt;script&gt;Ana",
	} {
		if !strings.Contains(got, want) {
			t.Fatalf("falta %q en el correo:\n%s", want, got)
		}
	}
	if strings.Contains(got[strings.Index(got, "<!DOCTYPE"):], "<script>Ana") {
		t.Fatal("el nombre debe ir escapado en el HTML")
	}
}

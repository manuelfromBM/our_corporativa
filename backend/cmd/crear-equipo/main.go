// crear-equipo crea las cuentas del equipo con una contraseña aleatoria y las deja en un
// archivo que solo puede leer su dueño. Las cuentas que ya existen no se tocan.
//
//	go run ./cmd/crear-equipo [archivo]
package main

import (
	"context"
	"crypto/rand"
	"fmt"
	"log"
	"os"
	"strings"

	"backend/internal/accounts"
	"backend/internal/auth"
	"backend/internal/config"
	"backend/internal/platform/database"
	"backend/internal/server"
	"backend/internal/team"

	"github.com/joho/godotenv"
)

const emailDomain = "bmcodelab.cl"

// Sin caracteres que se confundan al copiarlos a mano (0/O, 1/l/I).
const passwordChars = "abcdefghjkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789"

var members = []struct{ slug, name, role string }{
	{"manuel", "Manuel Díaz", auth.RoleAdmin},
	{"bastian", "Bastián Madrid", auth.RoleAdmin},
	{"cristian", "Cristian San Martín", auth.RoleMember},
	{"byron", "Byron Santis", auth.RoleMember},
}

func main() {
	if err := run(); err != nil {
		log.Fatal(err)
	}
}

func run() error {
	path := "credenciales_equipo.txt"
	if len(os.Args) > 1 {
		path = os.Args[1]
	}

	_ = godotenv.Load("../.env")

	cfg, err := config.Load()
	if err != nil {
		return err
	}
	ctx := context.Background()
	db, err := database.Open(cfg.DatabaseURL)
	if err != nil {
		return err
	}
	defer db.Close()
	if err := database.Migrate(ctx, db); err != nil {
		return err
	}
	if err := team.Seed(ctx, db); err != nil {
		return err
	}

	service := server.NewContainer(db, cfg).AccountsService
	existing, err := service.List(ctx)
	if err != nil {
		return err
	}
	taken := map[string]bool{}
	for _, a := range existing {
		taken[a.Email] = true
	}

	var lines []string
	for _, m := range members {
		email := m.slug + "@" + emailDomain
		if taken[email] {
			fmt.Printf("%s ya existe, no se modifica\n", m.slug)
			continue
		}
		password := newPassword()
		in := accounts.CreateInput{Email: email, Name: m.name, Role: m.role, MemberSlug: m.slug}
		if err := service.CreateActive(ctx, in, password); err != nil {
			return fmt.Errorf("%s: %w", m.slug, err)
		}
		lines = append(lines, fmt.Sprintf("%s\t%s\t%s\n", m.slug, password, m.role))
		fmt.Printf("%s creado\n", m.slug)
	}
	if len(lines) == 0 {
		return nil
	}

	file, err := os.OpenFile(path, os.O_CREATE|os.O_APPEND|os.O_WRONLY, 0o600)
	if err != nil {
		return err
	}
	defer file.Close()
	_, err = file.WriteString(strings.Join(lines, ""))
	return err
}

// newPassword genera 16 caracteres aleatorios en grupos de 4, con guiones: 19 en total.
func newPassword() string {
	var b strings.Builder
	for i, n := range randomBytes(16) {
		if i > 0 && i%4 == 0 {
			b.WriteByte('-')
		}
		b.WriteByte(passwordChars[int(n)%len(passwordChars)])
	}
	return b.String()
}

// randomBytes descarta los valores altos para que todos los caracteres sean igual de probables.
func randomBytes(n int) []byte {
	limit := 256 - 256%len(passwordChars)
	out := make([]byte, 0, n)
	buf := make([]byte, 1)
	for len(out) < n {
		rand.Read(buf)
		if int(buf[0]) < limit {
			out = append(out, buf[0])
		}
	}
	return out
}

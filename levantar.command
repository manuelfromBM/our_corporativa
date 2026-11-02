#!/bin/zsh
# Levanta el backend (Gin) y el frontend (Next.js) liberando antes los puertos ocupados.
# Doble clic para ejecutar. Ctrl+C (o cerrar la ventana) detiene ambos.

BACKEND_PORT=8080
FRONTEND_PORT=3000

ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT" || exit 1

kill_port() {
  local port=$1
  local pids=$(lsof -ti tcp:"$port" -sTCP:LISTEN 2>/dev/null)
  if [[ -n "$pids" ]]; then
    echo "→ Puerto $port ocupado (PID: ${pids//$'\n'/ }), cerrando..."
    echo "$pids" | xargs kill 2>/dev/null
    sleep 1
    pids=$(lsof -ti tcp:"$port" -sTCP:LISTEN 2>/dev/null)
    [[ -n "$pids" ]] && echo "$pids" | xargs kill -9 2>/dev/null
  fi
}

cleanup() {
  echo ""
  echo "→ Deteniendo servidores..."
  [[ -n "$BACKEND_PID" ]] && kill "$BACKEND_PID" 2>/dev/null
  [[ -n "$FRONTEND_PID" ]] && kill "$FRONTEND_PID" 2>/dev/null
  # go run y npm lanzan procesos hijos; se cierran por puerto para no dejar nada colgado.
  kill_port $BACKEND_PORT
  kill_port $FRONTEND_PORT
  echo "✓ Listo"
  exit 0
}
trap cleanup INT TERM HUP

kill_port $BACKEND_PORT
kill_port $FRONTEND_PORT

echo "→ Levantando backend en :$BACKEND_PORT..."
(cd "$ROOT/backend" && PORT=$BACKEND_PORT go run ./cmd/server) 2>&1 | sed "s/^/[backend]  /" &
BACKEND_PID=$!

# El frontend necesita el backend arriba para mostrar las páginas del equipo.
for i in {1..60}; do
  curl -s -o /dev/null "http://localhost:$BACKEND_PORT/api/team/slugs" && break
  sleep 0.5
done
if ! curl -s -o /dev/null "http://localhost:$BACKEND_PORT/api/team/slugs"; then
  echo "✗ El backend no respondió. Revisa los mensajes de [backend] arriba."
  cleanup
fi
echo "✓ Backend listo"

echo "→ Levantando frontend en :$FRONTEND_PORT..."
(cd "$ROOT/frontend" && BACKEND_URL="http://localhost:$BACKEND_PORT" npm run dev -- -p $FRONTEND_PORT) 2>&1 | sed "s/^/[frontend] /" &
FRONTEND_PID=$!

echo ""
echo "  Frontend: http://localhost:$FRONTEND_PORT"
echo "  Backend:  http://localhost:$BACKEND_PORT/api/team"
echo "  Login:    http://localhost:$FRONTEND_PORT/login-bm-327"
echo "  Ctrl+C para detener ambos"
echo ""

wait

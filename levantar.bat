@echo off
REM Levanta el backend (Gin) y el frontend (Next.js) liberando antes los puertos ocupados.
REM Doble clic para ejecutar. Presiona una tecla en esta ventana para detener ambos.
setlocal

set "BACKEND_PORT=8080"
set "FRONTEND_PORT=3000"

set "ROOT=%~dp0"
cd /d "%ROOT%" || exit /b 1

call :kill_port %BACKEND_PORT%
call :kill_port %FRONTEND_PORT%

echo -^> Levantando backend en :%BACKEND_PORT%...
set "PORT=%BACKEND_PORT%"
start "" /b /d "%ROOT%backend" go run ./cmd/server
set "PORT="

REM El frontend necesita el backend arriba para mostrar las paginas del equipo.
set /a TRIES=0
:wait_backend
REM En Windows un curl a un puerto cerrado tarda ~2s, asi que primero se mira con netstat si ya escucha.
netstat -ano | findstr /r /c:":%BACKEND_PORT% .*LISTENING" >nul && curl -s --max-time 5 -o nul "http://127.0.0.1:%BACKEND_PORT%/api/team/slugs" && goto backend_ok
set /a TRIES+=1
REM ~2 min: compilar + migraciones/seed contra Neon puede tardar bastante.
if %TRIES% geq 120 goto backend_fail
ping -n 2 127.0.0.1 >nul
goto wait_backend

:backend_fail
echo X El backend no respondio. Revisa los mensajes del backend arriba.
call :cleanup
pause
exit /b 1

:backend_ok
echo OK Backend listo

echo -^> Levantando frontend en :%FRONTEND_PORT%...
set "BACKEND_URL=http://localhost:%BACKEND_PORT%"
start "" /b /d "%ROOT%frontend" cmd /c npm run dev -- -p %FRONTEND_PORT%

echo.
echo   Frontend: http://localhost:%FRONTEND_PORT%
echo   Backend:  http://localhost:%BACKEND_PORT%/api/team
echo   Login:    http://localhost:%FRONTEND_PORT%/login-bm-327
echo   Presiona una tecla para detener ambos
echo.

pause >nul
call :cleanup
exit /b 0

:kill_port
set "KP_PORT=%~1"
for /f "tokens=5" %%p in ('netstat -ano ^| findstr /r /c:":%KP_PORT% .*LISTENING"') do (
  if not "%%p"=="0" (
    echo -^> Puerto %KP_PORT% ocupado ^(PID: %%p^), cerrando...
    taskkill /F /T /PID %%p >nul 2>&1
  )
)
exit /b 0

:cleanup
echo.
echo -^> Deteniendo servidores...
REM go run y npm lanzan procesos hijos; se cierran por puerto para no dejar nada colgado.
call :kill_port %BACKEND_PORT%
call :kill_port %FRONTEND_PORT%
echo OK Listo
exit /b 0

#!/usr/bin/env python3
"""
Genera el correo de bienvenida a partir de la plantilla correo_bienvenida.html
y lo envía por Gmail.

Uso:
    1. Edita los datos del cliente en DATOS (más abajo).
    2. Ejecuta:
         python3 enviar_bienvenida.py --dry-run   # genera y muestra, sin enviar
         python3 enviar_bienvenida.py             # envía a zirariel327@gmail.com
         python3 enviar_bienvenida.py --to otro@correo.com

La plantilla vive en correo_bienvenida.html, entre los comentarios
@@PLANTILLA-INICIO y @@PLANTILLA-FIN. Este script ejecuta ese bloque con Node,
así el correo enviado es idéntico a la vista previa del editor.

Credenciales: archivo .env.correo en la raíz (lo ignora git), con
    SMTP_USER=cuenta_que_envia@gmail.com
    SMTP_PASSWORD=contraseña de aplicación de Google
Opcionales: SMTP_HOST (smtp.gmail.com), SMTP_PORT (465), SMTP_FROM_NAME (BM Code Lab)
"""

import argparse
import json
import os
import re
import shutil
import smtplib
import ssl
import subprocess
import sys
from datetime import date, timedelta
from email.message import EmailMessage
from email.utils import formataddr, make_msgid
from pathlib import Path

ROOT = Path(__file__).resolve().parent
TEMPLATE = ROOT / "correo_bienvenida.html"
ENV_FILE = ROOT / ".env.correo"
DEFAULT_TO = [
    "zirariel327@gmail.com",
    "cr.sanmartino.react@gmail.com",
    "ariel.bm.enterprise@gmail.com",
    "bastian.bm.enterprise@gmail.com",
    "byronsalga345@gmail.com",
]


def next_business_day() -> str:
    day = date.today() + timedelta(days=1)
    while day.weekday() >= 5:
        day += timedelta(days=1)
    return day.isoformat()


# ============================================================
# Datos del correo (los mismos campos que el formulario del editor)
# ============================================================
DATOS = {
    "clientContact": "Camila Rojas",
    "clientCompany": "Empresa Ejemplo SpA",
    "projectName": "Sitio web corporativo",
    "kickoffDate": next_business_day(),      # formato AAAA-MM-DD
    "kickoffTime": "10:00",
    "kickoffMode": "Google Meet",             # Google Meet | Zoom | Microsoft Teams | Presencial
    "team": ["manuel", "bastian", "cristian", "byron"],
    "lead": "manuel",                         # contacto principal
    "sender": "manuel",                       # quién firma
    "channels": ["email", "whatsapp", "meet"],  # email | whatsapp | meet | slack
    "hours": "Lunes a viernes, 9:00 a 18:00",
    "responseTime": "24 horas hábiles",
}

# Convierte DATOS al mismo objeto que arma readForm() en el editor y llama a la plantilla
NODE_RUNNER = r"""
const fs = require("fs");
const input = JSON.parse(fs.readFileSync(0, "utf8"));
const api = new Function(input.code + "\nreturn { TEAM, buildEmail, buildSubject, buildPlainText };")();
const d = { ...input.data };
d.team = api.TEAM.filter((m) => d.team.includes(m.id));
d.leadMember = api.TEAM.find((m) => m.id === d.lead) || api.TEAM[0];
d.senderMember = api.TEAM.find((m) => m.id === d.sender) || api.TEAM[0];
process.stdout.write(JSON.stringify({
  subject: api.buildSubject(d),
  html: api.buildEmail(d),
  text: api.buildPlainText(d),
}));
"""


def load_env_file(path: Path) -> None:
    """Carga KEY=VALUE de un archivo simple sin pisar variables ya definidas."""
    if not path.exists():
        return
    for line in path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))


def render_template(data: dict) -> dict:
    """Ejecuta la plantilla JS de correo_bienvenida.html y devuelve asunto, html y texto."""
    if not shutil.which("node"):
        raise RuntimeError("Se necesita Node.js para generar el correo desde la plantilla.")

    source = TEMPLATE.read_text(encoding="utf-8")
    match = re.search(r"// @@PLANTILLA-INICIO.*?\n(.*?)// @@PLANTILLA-FIN", source, flags=re.S)
    if not match:
        raise RuntimeError(f"No encontré los marcadores @@PLANTILLA-INICIO/FIN en {TEMPLATE.name}.")

    result = subprocess.run(
        ["node", "-e", NODE_RUNNER],
        input=json.dumps({"code": match.group(1), "data": data}),
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        raise RuntimeError(f"Error al generar el correo:\n{result.stderr}")
    return json.loads(result.stdout)


def login(smtp: smtplib.SMTP, user: str, password: str) -> None:
    """Inicia sesión con AUTH LOGIN: con AUTH PLAIN Gmail a veces corta la conexión
    en vez de responder, y se pierde el mensaje de error real."""
    smtp.ehlo()
    if "LOGIN" in smtp.esmtp_features.get("auth", "").upper().split():
        smtp.esmtp_features["auth"] = "LOGIN"
    smtp.login(user, password)


def parse_recipients(values: list[str]) -> list[str]:
    """Acepta direcciones separadas por espacios, comas o punto y coma."""
    return [addr for v in values for addr in re.split(r"[;,\s]+", v) if addr]


def build_message(email: dict, sender: str, sender_name: str, to: list[str]) -> EmailMessage:
    msg = EmailMessage()
    msg["Subject"] = email["subject"]
    msg["From"] = formataddr((sender_name, sender))
    msg["To"] = ", ".join(to)
    msg["Reply-To"] = sender
    msg["Message-ID"] = make_msgid(domain=sender.split("@")[-1])
    msg.set_content(email["text"])
    msg.add_alternative(email["html"], subtype="html")
    return msg


def main() -> int:
    parser = argparse.ArgumentParser(description="Envía el correo de bienvenida de BM Code Lab.")
    parser.add_argument("--to", nargs="+", default=DEFAULT_TO,
                        help="Uno o más destinatarios (por defecto la lista DEFAULT_TO)")
    parser.add_argument("--dry-run", action="store_true", help="Genera el correo sin enviarlo")
    args = parser.parse_args()

    load_env_file(ENV_FILE)
    user = os.environ.get("SMTP_USER", "")
    password = os.environ.get("SMTP_PASSWORD", "")
    host = os.environ.get("SMTP_HOST", "smtp.gmail.com")
    port = int(os.environ.get("SMTP_PORT", "465"))
    sender_name = os.environ.get("SMTP_FROM_NAME", "BM Code Lab")

    if not args.dry_run and not (user and password):
        print(f"Faltan SMTP_USER y/o SMTP_PASSWORD en {ENV_FILE.name}.", file=sys.stderr)
        return 1

    try:
        email = render_template(DATOS)
    except RuntimeError as exc:
        print(exc, file=sys.stderr)
        return 1

    recipients = parse_recipients(args.to)
    invalid = [r for r in recipients if not re.fullmatch(r"[^@\s]+@[^@\s]+\.[^@\s]+", r)]
    if not recipients or invalid:
        print(f"Destinatarios inválidos: {', '.join(invalid) or '(ninguno)'}", file=sys.stderr)
        return 1

    msg = build_message(email, user or "remitente@ejemplo.com", sender_name, recipients)
    print(f"Asunto:  {msg['Subject']}")
    print(f"De:      {msg['From']}")
    print(f"Para:    {msg['To']}")

    if args.dry_run:
        print("\n--- Texto plano ---\n" + email["text"])
        return 0

    context = ssl.create_default_context()
    try:
        if port == 465:
            with smtplib.SMTP_SSL(host, port, context=context) as smtp:
                login(smtp, user, password)
                smtp.send_message(msg)
        else:
            with smtplib.SMTP(host, port) as smtp:
                smtp.starttls(context=context)
                login(smtp, user, password)
                smtp.send_message(msg)
    except smtplib.SMTPAuthenticationError:
        print("Gmail rechazó el usuario o la contraseña. Revisa que SMTP_PASSWORD sea una "
              "contraseña de aplicación (no la contraseña normal).", file=sys.stderr)
        return 1
    except (smtplib.SMTPException, OSError) as exc:
        print(f"No se pudo enviar el correo: {exc}", file=sys.stderr)
        return 1

    print("Correo enviado ✓")
    return 0


if __name__ == "__main__":
    sys.exit(main())

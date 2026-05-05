import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY)

const TIPOS_PROYECTO = [
    'Pagina web',
    'App movil',
    'Sistema a medida',
    'E-commerce',
    'Consultoria',
    'Mantención / Soporte',
    'Otro'
] as const

type TipoProyecto = (typeof TIPOS_PROYECTO)[number]

interface DataFormContacto{
    nombre: string
    email: string
    telefono: string
    mensaje: string
    tipoProyecto: TipoProyecto
}

function validarDatos(data:unknown): data is DataFormContacto{
    if (!data || typeof data !== 'object') return false
    const d = data as Record<string, unknown>
    return(
        typeof d.nombre === 'string' && d.nombre.trim().length > 0 &&
        typeof d.email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email) &&
        typeof d.telefono === 'string' && d.telefono.trim().length > 0 &&
        typeof d.mensaje === 'string' && d.mensaje.trim().length > 0 &&
        typeof d.tipoProyecto === 'string' && TIPOS_PROYECTO.includes(d.tipoProyecto as TipoProyecto)
    )

}

function emailHtml(data: DataFormContacto): string {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
    <body style="margin:0;padding:0;background:#f4f4f5;font-family:'Segoe UI',sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 0;">
        <tr><td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
            
            <!-- Header -->
            <tr>
              <td style="background:#0f172a;padding:32px 40px;">
                <p style="margin:0;color:#94a3b8;font-size:13px;letter-spacing:2px;text-transform:uppercase;">Nueva consulta</p>
                <h1 style="margin:8px 0 0;color:#ffffff;font-size:24px;font-weight:700;">Formulario de Contacto</h1>
              </td>
            </tr>

            <!-- Badge tipo proyecto -->
            <tr>
              <td style="padding:28px 40px 0;">
                <span style="display:inline-block;background:#eff6ff;color:#1d4ed8;font-size:12px;font-weight:600;letter-spacing:1px;text-transform:uppercase;padding:6px 14px;border-radius:20px;">
                  ${data.tipoProyecto}
                </span>
              </td>
            </tr>

            <!-- Datos -->
            <tr>
              <td style="padding:24px 40px;">
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:12px 0;border-bottom:1px solid #f1f5f9;">
                      <p style="margin:0 0 2px;color:#94a3b8;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Nombre</p>
                      <p style="margin:0;color:#0f172a;font-size:16px;font-weight:600;">${data.nombre}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:12px 0;border-bottom:1px solid #f1f5f9;">
                      <p style="margin:0 0 2px;color:#94a3b8;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Email</p>
                      <p style="margin:0;font-size:15px;"><a href="mailto:${data.email}" style="color:#1d4ed8;text-decoration:none;">${data.email}</a></p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:12px 0;border-bottom:1px solid #f1f5f9;">
                      <p style="margin:0 0 2px;color:#94a3b8;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Teléfono</p>
                      <p style="margin:0;color:#0f172a;font-size:15px;">${data.telefono}</p>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:12px 0;">
                      <p style="margin:0 0 8px;color:#94a3b8;font-size:11px;text-transform:uppercase;letter-spacing:1px;">Mensaje</p>
                      <p style="margin:0;color:#334155;font-size:15px;line-height:1.7;white-space:pre-line;">${data.mensaje}</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f8fafc;padding:20px 40px;border-top:1px solid #e2e8f0;">
                <p style="margin:0;color:#94a3b8;font-size:12px;">
                  Enviado el ${new Date().toLocaleDateString('es-CL', { dateStyle: 'full' })} · Tu sitio web corporativo
                </p>
              </td>
            </tr>

          </table>
        </td></tr>
      </table>
    </body>
    </html>
  `
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    if (!validarDatos(body)) {
      return NextResponse.json(
        { error: 'Datos del formulario inválidos.' },
        { status: 400 }
      )
    }

    const { error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: process.env.EMAIL_CONTANCTO!,
      replyTo: body.email,         
      subject: `[${body.tipoProyecto}] Consulta de ${body.nombre}`,
      html: emailHtml(body),
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Error al enviar el correo.' }, { status: 500 })
    }

    return NextResponse.json({ ok: true }, { status: 200 })

  } catch (err) {
    console.error('Contact route error:', err)
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 })
  }
}
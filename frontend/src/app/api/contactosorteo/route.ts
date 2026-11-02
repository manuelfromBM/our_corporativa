export const runtime = 'nodejs'
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { emailHtml } from "./correo";
import { emailHtmlAdmin } from "./notificacion";
import { guardarEnBackend } from '@/lib/guardarEnBackend'


const opcionesNegocio = [
    "Barbería / Peluquería",
    "Restaurante / Café / Pastelería",
    "Estética / Belleza / Spa",
    "Tecnología / Startup",
    "Tienda / E-commerce",
    "Servicio profesional",
    "Salud / Bienestar",
    "Educación / Tutorías",
    "Otro",
] as const

type NegocioTipo = (typeof opcionesNegocio)[number]

export interface DatosFormSorteo{
    nombre: string
    apellido: string
    correo: string
    usuario_instagram: string
    tipo_negocio: NegocioTipo
    nombre_negocio: string
    comuna: string
    tiene_sitio_web: boolean
    url_sitio_web: string | null
}

function validarDatos(data:unknown): data is DatosFormSorteo{
    if (!data || typeof data !== 'object') return false
    const d = data as Record<string, unknown>
    return(
        typeof d.nombre === 'string' && d.nombre.trim().length > 0 &&
        typeof d.apellido === 'string' && d.apellido.trim().length > 0 &&
        typeof d.correo === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.correo) &&
        typeof d.usuario_instagram === 'string' && 
        typeof d.tipo_negocio === 'string' && opcionesNegocio.includes(d.tipo_negocio as NegocioTipo) &&
        typeof d.nombre_negocio === 'string' && d.nombre_negocio.trim().length > 0 &&
        typeof d.comuna === 'string' && d.comuna.trim().length > 0 &&
        typeof d.tiene_sitio_web === 'boolean' &&
        (d.tiene_sitio_web === false || (typeof d.url_sitio_web === 'string' && d.url_sitio_web.trim().length > 0))
    )

}


export async function POST(req: Request) {
  try {

    const body = await req.json()
    console.log("Body recibido:", body)       
    console.log("Validación:", validarDatos(body))

    if (!validarDatos(body)) {
      console.log("Falló la validación")
      return NextResponse.json(
        { error: 'Datos del formulario inválidos.' },
        { status: 400 }
      )
    }
  // El backend rechaza con 409 un correo ya registrado.
  const errorAlGuardar = await guardarEnBackend('/api/sorteo/participantes', body)
  if (errorAlGuardar) return errorAlGuardar

  // new Resend() lanza una excepción sin API key. En local se permite registrar sin correos;
  // en producción la falta de la key sigue siendo un error.
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    if (process.env.NODE_ENV === 'production') throw new Error('Falta RESEND_API_KEY')
    console.warn('[contactosorteo] Sin RESEND_API_KEY: participante guardado, correos omitidos.')
    return NextResponse.json({ ok: true }, { status: 200 })
  }
  const resend = new Resend(apiKey)
  const { error } = await resend.emails.send({
    from: 'noreply@bmcodelab.cl',                        
    to: body.correo,
    subject: `¡Tu participación en el sorteo fue registrada!`,  
    html: emailHtml(body),
  })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Error al enviar el correo.' }, { status: 500 })
    }

  await resend.emails.send({
    from: 'noreply@bmcodelab.cl',
    to: process.env.EMAIL_CONTANCTO!,
    subject: `[Sorteo] ${body.nombre} ${body.apellido} — ${body.tipo_negocio}`,
    html: emailHtmlAdmin(body),
  })

    return NextResponse.json({ ok: true }, { status: 200 })

  } catch (err) {
    console.error('Contact route error:', err)
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 })
  }
}
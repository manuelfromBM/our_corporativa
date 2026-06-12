import { NextResponse } from "next/server";
import { Resend } from "resend";
import { emailHtml } from "./correo";
import { emailHtmlAdmin } from "./notificacion";
import { prisma } from '@/lib/prisma'

const resend = new Resend(process.env.RESEND_API_KEY)

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
}

function validarDatos(data:unknown): data is DatosFormSorteo{
    if (!data || typeof data !== 'object') return false
    const d = data as Record<string, unknown>
    return(
        typeof d.nombre === 'string' && d.nombre.trim().length > 0 &&
        typeof d.apellido === 'string' && d.apellido.trim().length > 0 &&
        typeof d.correo === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.correo) &&
        typeof d.usuario_instagram === 'string' && 
        typeof d.tipo_negocio === 'string' && opcionesNegocio.includes(d.tipo_negocio as NegocioTipo)
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
    const yaExiste = await prisma.participante.findUnique({
        where: { correo: body.correo }
      })

      if (yaExiste) {
        return NextResponse.json(
          { error: 'Este correo ya está registrado.' },
          { status: 409 }
        )
      }

  await prisma.participante.create({
    data: {
      nombre: body.nombre,
      apellido: body.apellido,
      correo: body.correo,
      usuario_instagram: body.usuario_instagram,
      tipo_negocio: body.tipo_negocio,
    }
  })
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
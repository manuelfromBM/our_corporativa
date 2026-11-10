import { NextResponse } from "next/server";
import { guardarEnBackend } from "@/lib/guardarEnBackend";


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

export async function POST(req: Request) {
  try {
    const body = await req.json()

    if (!validarDatos(body)) {
      return NextResponse.json(
        { error: 'Datos del formulario inválidos.' },
        { status: 400 }
      )
    }

    // El backend guarda la consulta y avisa al equipo por correo.
    const errorAlGuardar = await guardarEnBackend('/api/contactos', body)
    if (errorAlGuardar) return errorAlGuardar

    return NextResponse.json({ ok: true }, { status: 200 })

  } catch (err) {
    console.error('Contact route error:', err)
    return NextResponse.json({ error: 'Error interno del servidor.' }, { status: 500 })
  }
}
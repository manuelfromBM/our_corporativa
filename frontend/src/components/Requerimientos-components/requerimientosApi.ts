import SERVICIOS from "@/components/BM-components/servicios/Servicios.data";
import { DefinicionPaso, ValorCampo, ValoresFormulario } from "./tipos";
import { campoVisible, estaVacio, leerValor } from "./validacion";

export interface RespuestaCampo {
    id: string;
    pregunta: string;
    respuesta: ValorCampo;
}

export interface SeccionRespuestas {
    id: string;
    titulo: string;
    respuestas: RespuestaCampo[];
}

// Solo se incluyen los campos visibles y respondidos del servicio elegido,
// con la pregunta en texto para que el equipo pueda leerlo tal cual en la toma de requerimientos.
export function construirSecciones(pasos: DefinicionPaso[], valores: ValoresFormulario): SeccionRespuestas[] {
    return pasos
        .map((paso) => ({
            id: paso.id,
            titulo: paso.titulo,
            respuestas: paso.campos
                .filter((campo) => campoVisible(campo, valores) && !estaVacio(leerValor(campo, valores)))
                .map((campo) => {
                    const valor = leerValor(campo, valores);
                    return { id: campo.id, pregunta: campo.label, respuesta: typeof valor === "string" ? valor.trim() : valor };
                }),
        }))
        .filter((s) => s.respuestas.length > 0);
}

export function construirPayload(slug: string, pasos: DefinicionPaso[], valores: ValoresFormulario) {
    const servicio = SERVICIOS.find((s) => s.slug === slug);
    const texto = (id: string) => (typeof valores[id] === "string" ? (valores[id] as string).trim() : "");
    return {
        servicio: { slug, titulo: servicio?.tec.titulo ?? slug },
        contacto: {
            nombre: texto("nombre"),
            correo: texto("correo").toLowerCase(),
            telefono: texto("telefono"),
            empresa: texto("empresa"),
            medio_preferido: texto("medioContacto"),
        },
        secciones: construirSecciones(pasos, valores),
        enviado_en: new Date().toISOString(),
    };
}

export type PayloadRequerimiento = ReturnType<typeof construirPayload>;

export interface ResultadoEnvio {
    codigo: string;
}

// TODO: reemplazar por el endpoint real cuando se conecte el backend.
// Mock: simula la latencia de red y devuelve un código de seguimiento.
export async function enviarRequerimiento(payload: PayloadRequerimiento): Promise<ResultadoEnvio> {
    console.log("[cotizar] payload:", payload);
    await new Promise((r) => setTimeout(r, 900));
    const codigo = `REQ-${Date.now().toString(36).toUpperCase().slice(-6)}`;
    return { codigo };
}

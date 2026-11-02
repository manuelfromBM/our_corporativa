import type { SeccionRespuestas } from "@/components/Requerimientos-components/requerimientosApi";
import { cabeceraSesion } from "@/lib/sesionAdmin";

const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:8080";

export interface SolicitudGuardada {
    id: number;
    codigo: string;
    creado_en: string;
    enviado_en: string;
    // true si llegó desde el registro al sorteo (columna es_sorteo).
    sorteo: boolean;
    servicio: { slug: string; titulo: string };
    contacto: {
        nombre: string;
        correo: string;
        telefono: string;
        empresa: string;
        medio_preferido: string;
    };
    secciones: SeccionRespuestas[];
}

// Solo se llama desde el servidor, con la sesión de quien abrió la página.
export async function getSolicitudes(): Promise<SolicitudGuardada[]> {
    const res = await fetch(`${BACKEND_URL}/api/admin/requests`, {
        headers: (await cabeceraSesion()) ?? {},
        cache: "no-store",
    });
    if (!res.ok) {
        throw new Error(`Error al obtener las solicitudes: ${res.status}`);
    }
    return res.json();
}

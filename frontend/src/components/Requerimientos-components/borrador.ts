import { ValoresFormulario } from "./tipos";

// Guarda el avance en el navegador para que la persona pueda cerrar la pestaña y retomar.
// localStorage puede no estar disponible (modo privado, bloqueos), por eso todo va en try/catch.

const CLAVE = "bm-cotizar-borrador";

export interface Borrador {
    servicio: string;
    valores: ValoresFormulario;
    paso: number;
}

export function leerBorrador(): Borrador | null {
    try {
        const crudo = localStorage.getItem(CLAVE);
        if (!crudo) return null;
        const borrador = JSON.parse(crudo) as Borrador;
        return typeof borrador?.servicio === "string" && typeof borrador.valores === "object" ? borrador : null;
    } catch {
        return null;
    }
}

export function guardarBorrador(borrador: Borrador) {
    try {
        localStorage.setItem(CLAVE, JSON.stringify(borrador));
    } catch {
        // Sin almacenamiento el flujo funciona igual, solo no se recupera el avance.
    }
}

export function borrarBorrador() {
    try {
        localStorage.removeItem(CLAVE);
    } catch {
        // ignorado
    }
}

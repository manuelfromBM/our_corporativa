import { DefinicionPaso, FormularioServicio } from "../tipos";
import { pasoAlcance, pasoCierre, pasoContacto } from "./comunes";
import consultoriaTecnica from "./consultoria-tecnica";
import desarrolloWeb from "./desarrollo-web";
import aplicacionesMoviles from "./aplicaciones-moviles";
import integracionIa from "./integracion-ia";
import seguridadGestion from "./seguridad-gestion";
import automatizacion from "./automatizacion";
import devopsHosting from "./devops-hosting";
import soporteMantenimiento from "./soporte-mantenimiento";

// Un formulario por cada slug de Servicios.data.ts
export const FORMULARIOS: Record<string, FormularioServicio> = Object.fromEntries(
    [
        consultoriaTecnica,
        desarrolloWeb,
        aplicacionesMoviles,
        integracionIa,
        seguridadGestion,
        automatizacion,
        devopsHosting,
        soporteMantenimiento,
    ].map((f) => [f.slug, f]),
);

// Pasos completos (sin el selector ni el resumen) para el servicio elegido.
export function pasosDelServicio(slug: string): DefinicionPaso[] {
    const formulario = FORMULARIOS[slug];
    if (!formulario) return [];
    return [pasoContacto, ...formulario.pasos, pasoAlcance, pasoCierre];
}

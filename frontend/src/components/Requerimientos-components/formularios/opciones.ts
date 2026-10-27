import { ValoresFormulario } from "../tipos";

// Listas de opciones reutilizadas por varios formularios.

export const opcionesSiNo = ["Sí", "No"] as const;

export const opcionesFrecuencia = [
    "Varias veces al día",
    "Una vez al día",
    "Algunas veces por semana",
    "Algunas veces al mes",
] as const;

export const opcionesHorasSemanales = [
    "Menos de 5 horas",
    "Entre 5 y 20 horas",
    "Entre 20 y 40 horas",
    "Más de 40 horas",
    "No lo tengo medido",
] as const;

export const opcionesPersonas = ["1 persona", "2 a 5 personas", "6 a 20 personas", "Más de 20 personas"] as const;

export const opcionesAccesoCodigo = [
    "Sí, tengo acceso al código y a las cuentas",
    "Solo tengo algunas credenciales",
    "Lo maneja el proveedor anterior",
    "No lo sé",
] as const;

// Helpers para condiciones de visibilidad.
export const es = (id: string, ...valores: string[]) => (v: ValoresFormulario) =>
    typeof v[id] === "string" && valores.includes(v[id] as string);
export const noEs = (id: string, ...valores: string[]) => (v: ValoresFormulario) =>
    typeof v[id] === "string" && v[id] !== "" && !valores.includes(v[id] as string);
export const incluye = (id: string, ...valores: string[]) => (v: ValoresFormulario) =>
    Array.isArray(v[id]) && (v[id] as string[]).some((x) => valores.includes(x));

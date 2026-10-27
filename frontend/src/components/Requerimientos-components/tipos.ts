export type ValorCampo = string | string[] | boolean;

// Todas las respuestas del flujo, indexadas por id de campo.
// Los ids son únicos en todo el flujo (los de cada servicio llevan prefijo).
export type ValoresFormulario = Record<string, ValorCampo>;
export type ErroresFormulario = Record<string, string | undefined>;

export type TipoCampo =
    | "text"
    | "email"
    | "tel"
    | "url"
    | "textarea"
    | "select"
    | "radio"
    | "checkbox"
    | "checkboxGroup";

export interface DefinicionCampo {
    id: string;
    tipo: TipoCampo;
    label: string;
    requerido?: boolean;
    placeholder?: string;
    ayuda?: string;
    autoComplete?: string;
    opciones?: readonly string[];
    // "medio" permite poner dos campos cortos en la misma fila en escritorio.
    ancho?: "completo" | "medio";
    // El campo solo se muestra (y valida) si esta condición se cumple.
    visibleSi?: (valores: ValoresFormulario) => boolean;
}

export interface DefinicionPaso {
    id: string;
    titulo: string;
    descripcion: string;
    campos: DefinicionCampo[];
}

export interface FormularioServicio {
    slug: string;
    // Texto corto que se muestra al elegir el servicio, explicando qué le vamos a preguntar.
    intro: string;
    pasos: DefinicionPaso[];
}

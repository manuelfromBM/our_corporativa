import { DefinicionCampo, DefinicionPaso, ErroresFormulario, ValorCampo, ValoresFormulario } from "./tipos";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const urlRegex = /^(https?:\/\/)?[^\s.]+\.[^\s]{2,}$/i;
const telefonoRegex = /^\+?[\d\s()-]{8,}$/;

export const campoVisible = (campo: DefinicionCampo, valores: ValoresFormulario) =>
    !campo.visibleSi || campo.visibleSi(valores);

export function valorInicial(campo: DefinicionCampo): ValorCampo {
    if (campo.tipo === "checkbox") return false;
    if (campo.tipo === "checkboxGroup") return [];
    return "";
}

// Lee el valor de un campo, con su valor por defecto si aún no se ha respondido.
export const leerValor = (campo: DefinicionCampo, valores: ValoresFormulario) =>
    valores[campo.id] ?? valorInicial(campo);

export function estaVacio(valor: ValorCampo) {
    if (typeof valor === "boolean") return !valor;
    if (Array.isArray(valor)) return valor.length === 0;
    return !valor.trim();
}

export function validarCampo(campo: DefinicionCampo, valores: ValoresFormulario): string | undefined {
    if (!campoVisible(campo, valores)) return undefined;

    const valor = leerValor(campo, valores);

    if (estaVacio(valor)) {
        if (!campo.requerido) return undefined;
        if (campo.tipo === "checkbox") return "Debes aceptar para continuar.";
        if (campo.tipo === "checkboxGroup") return "Selecciona al menos una opción.";
        if (campo.tipo === "select" || campo.tipo === "radio") return "Selecciona una opción.";
        return "Este campo es obligatorio.";
    }

    if (typeof valor !== "string") return undefined;
    if (campo.tipo === "email" && !emailRegex.test(valor.trim())) return "Ingresa un correo válido.";
    if (campo.tipo === "url" && !urlRegex.test(valor.trim())) return "Ingresa una dirección web válida.";
    if (campo.tipo === "tel" && !telefonoRegex.test(valor.trim())) return "Ingresa un teléfono válido.";
    return undefined;
}

export function validarPaso(paso: DefinicionPaso, valores: ValoresFormulario): ErroresFormulario {
    const errores: ErroresFormulario = {};
    for (const campo of paso.campos) {
        const error = validarCampo(campo, valores);
        if (error) errores[campo.id] = error;
    }
    return errores;
}

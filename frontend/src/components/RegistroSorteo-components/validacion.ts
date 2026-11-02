import { DefinicionBloque, DefinicionCampo, ErroresRegistro, ValoresRegistro } from "./campos";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const urlRegex = /^(https?:\/\/)?[^\s.]+\.[^\s]{2,}$/i;
const instagramRegex = /^@?[a-zA-Z0-9._]{1,30}$/;

export const campoVisible = (campo: DefinicionCampo, valores: ValoresRegistro) =>
    !campo.visibleSi || campo.visibleSi(valores);

export function validarCampo(campo: DefinicionCampo, valores: ValoresRegistro): string | undefined {
    if (!campoVisible(campo, valores)) return undefined;

    const valor = valores[campo.id];
    const vacio =
        typeof valor === "boolean" ? !valor :
        Array.isArray(valor) ? valor.length === 0 :
        !valor.trim();

    if (vacio) {
        if (!campo.requerido) return undefined;
        if (campo.tipo === "checkbox") return "Debes confirmar este punto para participar.";
        if (campo.tipo === "select" || campo.tipo === "radio") return "Selecciona una opción.";
        return "Este campo es obligatorio.";
    }

    if (typeof valor !== "string") return undefined;
    if (campo.tipo === "email" && !emailRegex.test(valor.trim())) return "Ingresa un correo válido.";
    if (campo.tipo === "url" && !urlRegex.test(valor.trim())) return "Ingresa una dirección web válida.";
    if (campo.id === "instagram" && !instagramRegex.test(valor.trim())) return "Ingresa un usuario de Instagram válido.";
    return undefined;
}

export function validarBloque(bloque: DefinicionBloque, valores: ValoresRegistro): ErroresRegistro {
    const errores: ErroresRegistro = {};
    for (const campo of bloque.campos) {
        const error = validarCampo(campo, valores);
        if (error) errores[campo.id] = error;
    }
    return errores;
}

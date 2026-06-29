export interface CamposFormulario {
    nombre: string;
    apellido: string;
    correo: string;
    instagram: string;
    negocio: string;
    nombreNegocio: string;
    comuna: string;
    tieneSitio: "si" | "no" | "";
    urlSitio: string;
}

export interface ErroresFormulario {
    nombre?: string;
    apellido?: string;
    correo?: string;
    instagram?: string;
    negocio?: string;
    nombreNegocio?: string;
    comuna?: string;
    envio?: string;
    tieneSitio?: string;
    urlSitio?: string;
}

export const opcionesNegocio = [
    "Barbería / Peluquería",
    "Restaurante / Café / Pastelería",
    "Estética / Belleza / Spa",
    "Tecnología / Startup",
    "Tienda / E-commerce",
    "Servicio profesional",
    "Salud / Bienestar",
    "Educación / Tutorías",
    "Otro",
];
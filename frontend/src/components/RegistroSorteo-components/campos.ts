import { opcionesNegocio } from "@/components/Sorteo-components/sections/Formulario/campos";

export interface ValoresRegistro {
    // Bloque 1 · Datos del participante
    nombreCompleto: string;
    correo: string;
    instagram: string;
    comuna: string;
    // Bloque 2 · Información del negocio
    nombreNegocio: string;
    rubro: string;
    negocioFuncionando: string;
    tieneSitio: string;
    urlSitio: string;
    // Bloque 3 · Necesidades del negocio
    productosServicios: string;
    objetivoWeb: string;
    funcionalidades: string[];
    tieneMaterial: string;
    motivoSorteo: string;
    // Bloque 4 · Confirmaciones de participación
    sigueInstagram: boolean;
    compartioHistoria: boolean;
    etiquetoAmigos: boolean;
    aceptaBases: boolean;
    autorizaDatos: boolean;
}

export type CampoId = keyof ValoresRegistro;
export type ErroresRegistro = Partial<Record<CampoId | "envio", string>>;

export type TipoCampo = "text" | "email" | "url" | "textarea" | "select" | "radio" | "checkbox" | "checkboxGroup";

export interface DefinicionCampo {
    id: CampoId;
    tipo: TipoCampo;
    label: string;
    requerido?: boolean;
    placeholder?: string;
    ayuda?: string;
    autoComplete?: string;
    opciones?: readonly string[];
    // El campo solo se muestra (y valida) si esta condición se cumple.
    visibleSi?: (valores: ValoresRegistro) => boolean;
}

export interface DefinicionBloque {
    id: string;
    titulo: string;
    descripcion: string;
    campos: DefinicionCampo[];
}

export const opcionesSiNo = ["Sí", "No"] as const;

export const opcionesFuncionando = [
    "Sí, está funcionando",
    "No, está por comenzar",
    "No, por ahora es una idea",
] as const;

export const opcionesFuncionalidades = [
    "Catálogo de productos o servicios",
    "Formulario de contacto",
    "Botón de WhatsApp",
    "Agenda o reservas online",
    "Tienda online / pagos",
    "Galería de fotos",
    "Blog o noticias",
    "Integración con redes sociales",
    "Otra",
] as const;

export const opcionesMaterial = [
    "Sí, tengo todo",
    "Tengo algo, pero me falta",
    "No, no tengo nada aún",
] as const;

export const valoresIniciales: ValoresRegistro = {
    nombreCompleto: "",
    correo: "",
    instagram: "",
    comuna: "",
    nombreNegocio: "",
    rubro: "",
    negocioFuncionando: "",
    tieneSitio: "",
    urlSitio: "",
    productosServicios: "",
    objetivoWeb: "",
    funcionalidades: [],
    tieneMaterial: "",
    motivoSorteo: "",
    sigueInstagram: false,
    compartioHistoria: false,
    etiquetoAmigos: false,
    aceptaBases: false,
    autorizaDatos: false,
};

export const bloques: DefinicionBloque[] = [
    {
        id: "participante",
        titulo: "Datos del participante",
        descripcion: "Para identificar y contactar a la persona inscrita.",
        campos: [
            { id: "nombreCompleto", tipo: "text", label: "Nombre y apellido", requerido: true, placeholder: "Tu nombre y apellido", autoComplete: "name" },
            { id: "correo", tipo: "email", label: "Correo electrónico", requerido: true, placeholder: "tu@correo.com", autoComplete: "email" },
            { id: "instagram", tipo: "text", label: "Usuario de Instagram", requerido: true, placeholder: "@tu_usuario" },
            { id: "comuna", tipo: "text", label: "Comuna donde vives o funciona tu negocio", requerido: true, placeholder: "Tu comuna" },
        ],
    },
    {
        id: "negocio",
        titulo: "Información del negocio",
        descripcion: "Para entender a quién pertenece el proyecto y qué hace.",
        campos: [
            { id: "nombreNegocio", tipo: "text", label: "Nombre del negocio o emprendimiento", requerido: true, placeholder: "El nombre de tu negocio" },
            { id: "rubro", tipo: "select", label: "Rubro o actividad principal", requerido: true, opciones: opcionesNegocio },
            { id: "negocioFuncionando", tipo: "radio", label: "¿Tu negocio está funcionando actualmente?", requerido: true, opciones: opcionesFuncionando },
            { id: "tieneSitio", tipo: "radio", label: "¿Tienes sitio web actualmente?", requerido: true, opciones: opcionesSiNo },
            {
                id: "urlSitio",
                tipo: "url",
                label: "¿Cuál es la dirección de tu sitio web?",
                placeholder: "https://tusitio.cl",
                visibleSi: (v) => v.tieneSitio === "Sí",
            },
        ],
    },
    {
        id: "necesidades",
        titulo: "Necesidades del negocio",
        descripcion: "Para conocer el proyecto y preparar una web adecuada si resultas ganador.",
        campos: [
            { id: "productosServicios", tipo: "textarea", label: "¿Qué productos o servicios ofreces?" },
            { id: "objetivoWeb", tipo: "textarea", label: "¿Qué te gustaría lograr con tu página web?", ayuda: "Ej: conseguir más clientes, vender online, mostrar tu trabajo..." },
            { id: "funcionalidades", tipo: "checkboxGroup", label: "¿Qué funcionalidades necesitarías?", opciones: opcionesFuncionalidades },
            { id: "tieneMaterial", tipo: "radio", label: "¿Tienes logo, fotografías y contenido para tu web?", opciones: opcionesMaterial },
            { id: "motivoSorteo", tipo: "textarea", label: "¿Por qué te gustaría ganar este sorteo?" },
        ],
    },
    {
        id: "confirmaciones",
        titulo: "Confirmaciones de participación",
        descripcion: "Para dejar constancia de las condiciones y facilitar la verificación.",
        campos: [
            { id: "sigueInstagram", tipo: "checkbox", label: "Confirmo que sigo la cuenta de Instagram", requerido: true },
            { id: "compartioHistoria", tipo: "checkbox", label: "Confirmo que compartí la publicación en mis historias", requerido: true },
            { id: "etiquetoAmigos", tipo: "checkbox", label: "Confirmo que etiqueté a amigos en la publicación", requerido: true },
            { id: "aceptaBases", tipo: "checkbox", label: "Acepto las bases legales del sorteo", requerido: true },
            { id: "autorizaDatos", tipo: "checkbox", label: "Autorizo el uso de mis datos con fines relacionados con el sorteo", requerido: true },
        ],
    },
];

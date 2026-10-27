import { DefinicionPaso } from "../tipos";
import { es } from "./opciones";

// Pasos que se repiten para todos los servicios: al inicio los datos de contacto
// y al final el alcance general del proyecto y la preferencia de contacto.

export const pasoContacto: DefinicionPaso = {
    id: "contacto",
    titulo: "Tus datos",
    descripcion: "Para saber con quién hablamos y cómo es tu negocio. Solo te contactaremos por este proyecto.",
    campos: [
        { id: "nombre", tipo: "text", label: "Nombre y apellido", requerido: true, autoComplete: "name", placeholder: "Ej: Camila Rojas", ancho: "medio" },
        { id: "cargo", tipo: "text", label: "Cargo o rol", autoComplete: "organization-title", placeholder: "Ej: Dueña, Gerente, Jefe de TI", ancho: "medio" },
        { id: "correo", tipo: "email", label: "Correo electrónico", requerido: true, autoComplete: "email", placeholder: "nombre@empresa.cl", ancho: "medio" },
        { id: "telefono", tipo: "tel", label: "Teléfono / WhatsApp", requerido: true, autoComplete: "tel", placeholder: "+56 9 1234 5678", ancho: "medio" },
        { id: "empresa", tipo: "text", label: "Nombre de la empresa o emprendimiento", requerido: true, autoComplete: "organization", ancho: "medio" },
        { id: "ciudad", tipo: "text", label: "Comuna / ciudad", autoComplete: "address-level2", placeholder: "Ej: Melipilla", ancho: "medio" },
        {
            id: "rubro",
            tipo: "select",
            label: "Rubro",
            requerido: true,
            opciones: [
                "Comercio / retail",
                "Gastronomía",
                "Salud y bienestar",
                "Educación",
                "Construcción e inmobiliaria",
                "Servicios profesionales",
                "Transporte y logística",
                "Turismo y hotelería",
                "Agrícola / industrial",
                "Tecnología",
                "Belleza y estética",
                "ONG / sector público",
                "Otro",
            ],
        },
        { id: "rubroOtro", tipo: "text", label: "¿Cuál es tu rubro?", requerido: true, visibleSi: es("rubro", "Otro") },
        {
            id: "tamano",
            tipo: "radio",
            label: "Tamaño del equipo",
            requerido: true,
            opciones: ["Solo yo", "2 a 10 personas", "11 a 50 personas", "51 a 200 personas", "Más de 200 personas"],
        },
        {
            id: "presencia",
            tipo: "text",
            label: "Sitio web o redes sociales actuales",
            placeholder: "Ej: www.miempresa.cl o @miempresa",
            ayuda: "Nos ayuda a conocer tu negocio antes de la reunión.",
        },
    ],
};

export const pasoAlcance: DefinicionPaso = {
    id: "alcance",
    titulo: "Objetivos, plazos y presupuesto",
    descripcion:
        "Esto nos permite proponerte una solución realista desde la primera reunión. Si no tienes algo claro, elige la opción que más se acerque.",
    campos: [
        {
            id: "objetivo",
            tipo: "textarea",
            label: "Si este proyecto sale perfecto, ¿qué cambia en tu negocio?",
            requerido: true,
            placeholder: "Ej: Queremos recibir pedidos online y dejar de anotarlos a mano por WhatsApp.",
        },
        {
            id: "plazo",
            tipo: "radio",
            label: "¿Para cuándo lo necesitas?",
            requerido: true,
            opciones: ["Lo antes posible (menos de 1 mes)", "En 1 a 3 meses", "En 3 a 6 meses", "No tengo apuro"],
        },
        {
            id: "fechaLimite",
            tipo: "radio",
            label: "¿Hay alguna fecha límite fija?",
            ayuda: "Ej: un lanzamiento, una feria, una temporada alta o un requisito legal.",
            opciones: ["Sí", "No"],
        },
        { id: "fechaLimiteDetalle", tipo: "text", label: "¿Qué fecha y por qué?", requerido: true, visibleSi: es("fechaLimite", "Sí") },
        {
            id: "presupuesto",
            tipo: "select",
            label: "Presupuesto estimado (CLP)",
            requerido: true,
            ayuda: "Es solo referencial: nos ayuda a proponerte opciones que se ajusten a tu realidad.",
            opciones: [
                "Menos de $500.000",
                "$500.000 – $1.500.000",
                "$1.500.000 – $3.000.000",
                "$3.000.000 – $6.000.000",
                "Más de $6.000.000",
                "Aún no lo tengo definido",
            ],
        },
        {
            id: "decision",
            tipo: "radio",
            label: "¿Quién toma la decisión final?",
            opciones: ["Yo", "Yo junto a otras personas", "Otra persona o un directorio"],
        },
        {
            id: "cotizacionesPrevias",
            tipo: "radio",
            label: "¿Has cotizado o trabajado este proyecto con otro proveedor?",
            opciones: ["No, es la primera vez", "Sí, estoy comparando cotizaciones", "Sí, y no resultó como esperaba"],
        },
        {
            id: "cotizacionesDetalle",
            tipo: "textarea",
            label: "¿Qué pasó o qué te ofrecieron?",
            placeholder: "Nos ayuda a no repetir lo que no funcionó.",
            visibleSi: es("cotizacionesPrevias", "Sí, y no resultó como esperaba"),
        },
    ],
};

export const pasoCierre: DefinicionPaso = {
    id: "cierre",
    titulo: "Cómo seguimos",
    descripcion: "Último paso. Cuéntanos cómo prefieres que te contactemos para la toma de requerimientos.",
    campos: [
        {
            id: "medioContacto",
            tipo: "radio",
            label: "Medio de contacto preferido",
            requerido: true,
            opciones: ["WhatsApp", "Llamada telefónica", "Correo electrónico", "Videollamada (Meet / Zoom)", "Reunión presencial"],
        },
        {
            id: "horario",
            tipo: "checkboxGroup",
            label: "¿En qué horario te acomoda?",
            opciones: ["Mañana (9:00 – 13:00)", "Tarde (14:00 – 18:00)", "Después de las 18:00", "Cualquier horario"],
        },
        {
            id: "origen",
            tipo: "select",
            label: "¿Cómo nos conociste?",
            opciones: ["Google", "Instagram", "Facebook", "LinkedIn", "Recomendación", "Sorteo / evento", "Otro"],
        },
        {
            id: "comentarios",
            tipo: "textarea",
            label: "¿Algo más que debamos saber?",
            placeholder: "Dudas, ideas sueltas, enlaces a documentos o cualquier detalle que no hayamos preguntado.",
        },
        {
            id: "aceptaPrivacidad",
            tipo: "checkbox",
            label: "Acepto que BM Code Lab use estos datos solo para contactarme y preparar una propuesta.",
            requerido: true,
        },
    ],
};

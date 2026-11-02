import { DefinicionPaso } from "@/components/Requerimientos-components/tipos";
import { es } from "@/components/Requerimientos-components/formularios/opciones";

// Formulario para que el participante detalle el sitio web que quiere si gana.
// Usa los mismos tipos que /cotizar y se guarda en la misma tabla, marcado como sorteo.
// Las opciones se limitan a lo que incluye el premio (sin carrito, pagos ni integraciones avanzadas).

// Slug con el que se guarda en servicio_slug: el premio es un sitio web.
export const SLUG_PRODUCTO_SORTEO = "desarrollo-web";
export const TITULO_PRODUCTO_SORTEO = "Sitio web del sorteo";

export const pasosProductoSorteo: DefinicionPaso[] = [
    {
        id: "sorteo-contacto",
        titulo: "Tus datos",
        descripcion: "Los tomamos de tu registro. Revisa que estén bien y cuéntanos cómo prefieres que te contactemos.",
        campos: [
            { id: "nombre", tipo: "text", label: "Nombre y apellido", requerido: true, autoComplete: "name", ancho: "medio" },
            { id: "correo", tipo: "email", label: "Correo electrónico", requerido: true, autoComplete: "email", ancho: "medio" },
            { id: "empresa", tipo: "text", label: "Nombre del negocio", requerido: true, autoComplete: "organization", ancho: "medio" },
            { id: "telefono", tipo: "tel", label: "Teléfono / WhatsApp", autoComplete: "tel", placeholder: "+56 9 1234 5678", ancho: "medio" },
            {
                id: "medioContacto",
                tipo: "radio",
                label: "Si ganas, ¿cómo prefieres que te contactemos?",
                requerido: true,
                opciones: ["Correo electrónico", "WhatsApp", "Llamada telefónica", "Videollamada (Meet / Zoom)"],
            },
        ],
    },
    {
        id: "sorteo-sitio",
        titulo: "Tu sitio web",
        descripcion: "Cuéntanos qué tipo de sitio imaginas y para qué lo usarías.",
        campos: [
            {
                id: "sorteo_tipo",
                tipo: "radio",
                label: "¿Qué tipo de sitio te gustaría?",
                requerido: true,
                opciones: [
                    "Sitio informativo / corporativo",
                    "Landing page (una sola página)",
                    "Catálogo de productos o servicios (sin venta online)",
                    "Portafolio",
                    "No lo sé, quiero que me aconsejen",
                ],
            },
            {
                id: "sorteo_objetivos",
                tipo: "checkboxGroup",
                label: "¿Qué debe lograr el sitio?",
                requerido: true,
                opciones: [
                    "Conseguir contactos o cotizaciones",
                    "Dar a conocer la marca",
                    "Mostrar mis productos o trabajos",
                    "Recibir reservas o consultas por WhatsApp",
                    "Informar a clientes actuales",
                    "Verme más profesional",
                ],
            },
            {
                id: "sorteo_publico",
                tipo: "textarea",
                label: "¿Quiénes son tus clientes?",
                placeholder: "Ej: Familias de la comuna que buscan tortas personalizadas para cumpleaños.",
            },
            {
                id: "sorteo_diferencia",
                tipo: "textarea",
                label: "¿Qué te diferencia de tu competencia?",
                placeholder: "Lo que te gustaría que el sitio destaque de tu negocio.",
            },
        ],
    },
    {
        id: "sorteo-contenido",
        titulo: "Secciones y contenido",
        descripcion: "Marca todo lo que imaginas; si ganas lo priorizamos juntos en la reunión inicial.",
        campos: [
            {
                id: "sorteo_secciones",
                tipo: "checkboxGroup",
                label: "Secciones que debería tener",
                opciones: ["Inicio", "Nosotros", "Servicios / productos", "Galería o portafolio", "Testimonios", "Preguntas frecuentes", "Contacto"],
            },
            {
                id: "sorteo_funcionalidades",
                tipo: "checkboxGroup",
                label: "Funcionalidades",
                ayuda: "El premio no incluye carrito de compras, pagos online ni integraciones avanzadas.",
                opciones: [
                    "Formulario de contacto",
                    "Botón de WhatsApp",
                    "Mapa / ubicación",
                    "Enlaces a redes sociales",
                    "Galería de fotos",
                    "Horarios de atención",
                ],
            },
            {
                id: "sorteo_contenidoListo",
                tipo: "checkboxGroup",
                label: "¿Qué contenido tienes listo?",
                opciones: ["Textos", "Fotografías propias", "Videos", "Lista de productos o servicios con precios", "Nada aún"],
            },
        ],
    },
    {
        id: "sorteo-diseno",
        titulo: "Diseño y dominio",
        descripcion: "Lo que ya tengas nos ahorra tiempo; lo que falte lo vemos contigo.",
        campos: [
            {
                id: "sorteo_identidad",
                tipo: "radio",
                label: "¿Tienes identidad de marca?",
                requerido: true,
                opciones: ["Logo y colores definidos", "Solo el logo", "No, aún no tengo"],
            },
            {
                id: "sorteo_estilo",
                tipo: "checkboxGroup",
                label: "¿Qué estilo buscas?",
                opciones: ["Minimalista", "Corporativo / formal", "Moderno / tecnológico", "Colorido / juvenil", "Elegante / premium", "Cercano / familiar"],
            },
            {
                id: "sorteo_referencias",
                tipo: "textarea",
                label: "Sitios que te gusten (y por qué)",
                placeholder: "Pega enlaces de sitios de referencia, aunque sean de otro rubro.",
            },
            {
                id: "sorteo_dominio",
                tipo: "radio",
                label: "¿Tienes un nombre de dominio en mente?",
                opciones: ["Sí", "No, necesito ayuda para elegirlo", "Ya tengo un dominio comprado"],
            },
            {
                id: "sorteo_dominioNombre",
                tipo: "text",
                label: "¿Cuál?",
                placeholder: "minegocio.com",
                visibleSi: es("sorteo_dominio", "Sí", "Ya tengo un dominio comprado"),
            },
            {
                id: "comentarios",
                tipo: "textarea",
                label: "¿Algo más que debamos saber?",
                placeholder: "Ideas sueltas, dudas o cualquier detalle que no hayamos preguntado.",
            },
        ],
    },
];

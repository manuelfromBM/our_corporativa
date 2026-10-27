import { FormularioServicio } from "../tipos";
import { es } from "./opciones";

const APP_EXISTENTE = ["Tengo una app publicada que quiero mejorar", "Tengo una app que quiero rehacer"];

const aplicacionesMoviles: FormularioServicio = {
    slug: "aplicaciones-moviles",
    intro: "Te preguntaremos por la idea de la app, quiénes la usarán, qué funciones necesita y cómo se publicará.",
    pasos: [
        {
            id: "app-idea",
            titulo: "La idea",
            descripcion: "Cuéntanos qué quieres construir y para quién.",
            campos: [
                {
                    id: "app_situacion",
                    tipo: "radio",
                    label: "¿En qué punto estás?",
                    requerido: true,
                    opciones: ["Es una idea nueva", "Tengo diseños o un prototipo", ...APP_EXISTENTE],
                },
                {
                    id: "app_enlaceExistente",
                    tipo: "text",
                    label: "Enlace a la app en las tiendas o nombre de la app",
                    requerido: true,
                    visibleSi: es("app_situacion", ...APP_EXISTENTE),
                },
                {
                    id: "app_descripcion",
                    tipo: "textarea",
                    label: "¿Qué hace la app y qué problema resuelve?",
                    requerido: true,
                    placeholder: "Ej: Que mis clientes reserven hora en la peluquería, paguen y reciban un recordatorio.",
                },
                {
                    id: "app_usuarios",
                    tipo: "radio",
                    label: "¿Quién la usará?",
                    requerido: true,
                    opciones: ["Clientes finales (público general)", "Otras empresas", "Mi equipo de trabajo (uso interno)", "Una mezcla de los anteriores"],
                },
                {
                    id: "app_cantidadUsuarios",
                    tipo: "radio",
                    label: "¿Cuántos usuarios esperas el primer año?",
                    opciones: ["Menos de 100", "100 a 1.000", "1.000 a 10.000", "Más de 10.000", "No lo sé"],
                },
                {
                    id: "app_plataformas",
                    tipo: "radio",
                    label: "¿En qué plataformas?",
                    requerido: true,
                    opciones: ["iOS y Android", "Solo Android", "Solo iOS", "iOS, Android y versión web", "No lo sé"],
                },
            ],
        },
        {
            id: "app-funcionalidades",
            titulo: "Funcionalidades",
            descripcion: "Marca todo lo que imaginas. Luego definimos juntos qué entra en la primera versión.",
            campos: [
                {
                    id: "app_funcionalidades",
                    tipo: "checkboxGroup",
                    label: "¿Qué debería poder hacer?",
                    requerido: true,
                    opciones: [
                        "Registro e inicio de sesión",
                        "Ingreso con Google / Apple",
                        "Perfil de usuario",
                        "Notificaciones push",
                        "Pagos dentro de la app",
                        "Mapas o geolocalización",
                        "Cámara o escaneo de QR",
                        "Chat o mensajería",
                        "Reservas o agenda",
                        "Catálogo de productos",
                        "Subir fotos o archivos",
                        "Funcionar sin internet",
                        "Panel de administración web",
                        "Funciones con inteligencia artificial",
                        "Reportes y estadísticas",
                    ],
                },
                {
                    id: "app_roles",
                    tipo: "textarea",
                    label: "¿Qué tipos de usuario habrá y qué puede hacer cada uno?",
                    placeholder: "Ej: Cliente (reserva y paga), Profesional (ve su agenda), Administrador (gestiona todo).",
                },
                {
                    id: "app_integraciones",
                    tipo: "checkboxGroup",
                    label: "¿Debe conectarse con algo que ya tengas?",
                    opciones: ["Mi sitio web", "ERP o sistema de gestión", "CRM", "Pasarela de pago", "Sistema de facturación", "API de otro proveedor", "Nada por ahora"],
                },
                {
                    id: "app_integracionesDetalle",
                    tipo: "textarea",
                    label: "Detalle de las integraciones",
                    placeholder: "Nombre de los sistemas y qué información debe viajar entre ellos.",
                    visibleSi: (v) => Array.isArray(v.app_integraciones) && v.app_integraciones.some((x) => x !== "Nada por ahora"),
                },
            ],
        },
        {
            id: "app-publicacion",
            titulo: "Diseño, publicación y modelo",
            descripcion: "Lo necesario para llevar la app a las tiendas y mantenerla viva.",
            campos: [
                {
                    id: "app_diseno",
                    tipo: "radio",
                    label: "¿Tienes el diseño de las pantallas?",
                    requerido: true,
                    opciones: ["Sí, en Figma u otra herramienta", "Tengo bocetos o ideas en papel", "No, necesito el diseño completo"],
                },
                {
                    id: "app_cuentasTiendas",
                    tipo: "radio",
                    label: "¿Tienes cuentas de desarrollador en App Store / Google Play?",
                    opciones: ["Sí, en ambas", "Solo en una", "No", "No sé qué es eso"],
                },
                {
                    id: "app_monetizacion",
                    tipo: "radio",
                    label: "¿Cómo genera ingresos la app?",
                    opciones: ["Gratuita (apoya mi negocio)", "Pago por descarga", "Suscripción", "Compras dentro de la app", "Publicidad", "Es de uso interno, no aplica"],
                },
                {
                    id: "app_referencias",
                    tipo: "textarea",
                    label: "Apps parecidas o que te inspiren",
                    placeholder: "Nombres o enlaces, y qué te gusta de cada una.",
                },
                {
                    id: "app_mantenimiento",
                    tipo: "radio",
                    label: "¿Te interesa que la mantengamos después del lanzamiento?",
                    opciones: ["Sí", "Quizás, quiero saber más", "No, la mantendrá mi equipo"],
                },
            ],
        },
    ],
};

export default aplicacionesMoviles;

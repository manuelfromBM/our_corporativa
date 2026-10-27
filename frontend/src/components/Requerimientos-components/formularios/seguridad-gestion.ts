import { FormularioServicio } from "../tipos";
import { incluye } from "./opciones";

const INCIDENTE = "Tuvimos un incidente (hackeo, virus, pérdida de datos)";

const seguridadGestion: FormularioServicio = {
    slug: "seguridad-gestion",
    intro: "Te preguntaremos por tu entorno (equipos, cuentas y sistemas) y las prácticas de seguridad que tienen hoy.",
    pasos: [
        {
            id: "seg-entorno",
            titulo: "Tu entorno",
            descripcion: "Una foto general de lo que hay que proteger.",
            campos: [
                {
                    id: "seg_motivo",
                    tipo: "checkboxGroup",
                    label: "¿Qué te motiva a revisar la seguridad?",
                    requerido: true,
                    opciones: [
                        INCIDENTE,
                        "Revisión preventiva",
                        "Requisito de un cliente o de la normativa (ej: Ley de datos personales, ISO 27001)",
                        "Ordenar cuentas y accesos del equipo",
                        "Implementar respaldos",
                        "Gestionar los equipos de la empresa",
                        "Capacitar al equipo",
                    ],
                },
                {
                    id: "seg_incidenteDetalle",
                    tipo: "textarea",
                    label: "¿Qué pasó y cuándo?",
                    requerido: true,
                    ayuda: "Si el incidente sigue activo, indícalo: lo priorizamos.",
                    visibleSi: incluye("seg_motivo", INCIDENTE),
                },
                {
                    id: "seg_usuarios",
                    tipo: "radio",
                    label: "¿Cuántas personas tienen acceso a los sistemas?",
                    requerido: true,
                    opciones: ["1 a 5", "6 a 20", "21 a 50", "Más de 50"],
                },
                {
                    id: "seg_dispositivos",
                    tipo: "checkboxGroup",
                    label: "¿Qué equipos usan?",
                    opciones: [
                        "Computadores Windows",
                        "Computadores Mac",
                        "Celulares de la empresa",
                        "Celulares personales para trabajar",
                        "Servidores en la oficina",
                        "Servidores en la nube",
                    ],
                },
                {
                    id: "seg_plataformas",
                    tipo: "checkboxGroup",
                    label: "¿Qué plataformas usan?",
                    opciones: ["Google Workspace", "Microsoft 365", "ERP o sistema de gestión", "Sistema propio", "Hosting / sitio web", "AWS, Azure o Google Cloud"],
                },
                {
                    id: "seg_datosCriticos",
                    tipo: "textarea",
                    label: "¿Qué información sería grave perder o que se filtrara?",
                    requerido: true,
                    placeholder: "Ej: Base de clientes, fichas médicas, contabilidad, contratos.",
                },
            ],
        },
        {
            id: "seg-practicas",
            titulo: "Prácticas actuales",
            descripcion: "No hay respuestas malas: es para saber desde dónde partimos.",
            campos: [
                {
                    id: "seg_respaldos",
                    tipo: "radio",
                    label: "¿Hacen respaldos de la información?",
                    requerido: true,
                    opciones: ["Sí, automáticos y probados", "Sí, manuales y de vez en cuando", "No", "No lo sé"],
                },
                {
                    id: "seg_2fa",
                    tipo: "radio",
                    label: "¿Usan verificación en dos pasos (2FA)?",
                    opciones: ["Sí, en todas las cuentas", "En algunas", "No", "No sé qué es"],
                },
                {
                    id: "seg_contrasenas",
                    tipo: "radio",
                    label: "¿Cómo manejan las contraseñas?",
                    opciones: ["Con un gestor de contraseñas", "En una planilla o documento compartido", "Cada persona las suyas", "Compartimos las mismas contraseñas"],
                },
                {
                    id: "seg_antivirus",
                    tipo: "radio",
                    label: "¿Los equipos tienen antivirus o protección?",
                    opciones: ["Sí, todos", "Algunos", "No", "No lo sé"],
                },
                {
                    id: "seg_salidas",
                    tipo: "radio",
                    label: "Cuando alguien deja la empresa, ¿se le quitan los accesos?",
                    opciones: ["Sí, siempre y de inmediato", "A veces, sin un proceso claro", "No"],
                },
                {
                    id: "seg_politicas",
                    tipo: "radio",
                    label: "¿Tienen políticas de seguridad escritas?",
                    opciones: ["Sí", "Algo informal", "No"],
                },
            ],
        },
    ],
};

export default seguridadGestion;

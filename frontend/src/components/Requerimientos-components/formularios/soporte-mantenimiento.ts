import { FormularioServicio } from "../tipos";
import { noEs, opcionesAccesoCodigo } from "./opciones";

const soporteMantenimiento: FormularioServicio = {
    slug: "soporte-mantenimiento",
    intro: "Te preguntaremos qué hay que mantener, quién lo construyó, qué problemas tiene hoy y qué tipo de soporte necesitas.",
    pasos: [
        {
            id: "sop-producto",
            titulo: "Lo que hay que mantener",
            descripcion: "Mientras más sepamos del producto, más rápido podremos hacernos cargo.",
            campos: [
                {
                    id: "sop_productos",
                    tipo: "checkboxGroup",
                    label: "¿Qué necesitas mantener?",
                    requerido: true,
                    opciones: ["Sitio web", "Tienda online", "App móvil", "Sistema a medida", "Servidores o infraestructura"],
                },
                {
                    id: "sop_url",
                    tipo: "text",
                    label: "Enlace o nombre del producto",
                    placeholder: "www.miempresa.cl",
                },
                {
                    id: "sop_desarrollador",
                    tipo: "radio",
                    label: "¿Quién lo desarrolló?",
                    requerido: true,
                    opciones: ["BM Code Lab", "Otra agencia o freelancer", "Un equipo interno", "No lo sé"],
                },
                {
                    id: "sop_tecnologias",
                    tipo: "textarea",
                    label: "¿Con qué tecnologías está hecho?",
                    placeholder: "Si no lo sabes, déjalo en blanco: lo revisamos nosotros.",
                },
                { id: "sop_acceso", tipo: "radio", label: "¿Tienes acceso al código y a las cuentas?", requerido: true, opciones: opcionesAccesoCodigo },
                {
                    id: "sop_documentacion",
                    tipo: "radio",
                    label: "¿Existe documentación técnica?",
                    opciones: ["Sí", "Algo", "No", "No lo sé"],
                },
            ],
        },
        {
            id: "sop-soporte",
            titulo: "El soporte que necesitas",
            descripcion: "Para proponerte el plan que mejor calce con tu ritmo.",
            campos: [
                {
                    id: "sop_urgencia",
                    tipo: "radio",
                    label: "¿Hay algún problema ahora mismo?",
                    requerido: true,
                    opciones: ["Sí, algo no funciona y es urgente", "Hay problemas menores", "No, es preventivo"],
                },
                {
                    id: "sop_problema",
                    tipo: "textarea",
                    label: "Describe el problema",
                    requerido: true,
                    placeholder: "Qué pasa, desde cuándo y a quién afecta.",
                    visibleSi: noEs("sop_urgencia", "No, es preventivo"),
                },
                {
                    id: "sop_necesidades",
                    tipo: "checkboxGroup",
                    label: "¿Qué tipo de ayuda necesitas?",
                    requerido: true,
                    opciones: [
                        "Corregir errores",
                        "Actualizaciones de seguridad",
                        "Cambios de contenido",
                        "Nuevas funcionalidades",
                        "Monitoreo",
                        "Respaldos",
                        "Mejorar la velocidad",
                        "Soporte a usuarios",
                    ],
                },
                {
                    id: "sop_frecuencia",
                    tipo: "radio",
                    label: "¿Cada cuánto necesitas cambios?",
                    opciones: ["Todas las semanas", "Una o dos veces al mes", "Ocasionalmente"],
                },
                {
                    id: "sop_respuesta",
                    tipo: "radio",
                    label: "Tiempo de respuesta esperado",
                    opciones: ["El mismo día", "Entre 24 y 48 horas", "Durante la semana"],
                },
                {
                    id: "sop_modalidad",
                    tipo: "radio",
                    label: "¿Qué modalidad prefieres?",
                    opciones: ["Plan mensual fijo", "Bolsa de horas", "Pago por cada requerimiento", "No lo sé, quiero que me orienten"],
                },
            ],
        },
    ],
};

export default soporteMantenimiento;

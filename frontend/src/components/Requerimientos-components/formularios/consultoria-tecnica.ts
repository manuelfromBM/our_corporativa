import { FormularioServicio } from "../tipos";
import { incluye } from "./opciones";

const consultoriaTecnica: FormularioServicio = {
    slug: "consultoria-tecnica",
    intro: "Te preguntaremos por la tecnología que usas hoy, el problema que quieres resolver y qué esperas recibir de la consultoría.",
    pasos: [
        {
            id: "cons-situacion",
            titulo: "Tu situación actual",
            descripcion: "Queremos entender con qué herramientas trabajas hoy y quién se encarga de ellas.",
            campos: [
                {
                    id: "cons_motivo",
                    tipo: "checkboxGroup",
                    label: "¿Por qué buscas una consultoría?",
                    requerido: true,
                    opciones: [
                        "Quiero digitalizar mi negocio y no sé por dónde partir",
                        "Evaluar si mi tecnología actual es la adecuada",
                        "Elegir entre proveedores, herramientas o cotizaciones",
                        "Tengo problemas de costos, lentitud o caídas",
                        "Planificar un proyecto nuevo antes de construirlo",
                        "Revisar arquitectura o seguridad de un sistema",
                        "Otro",
                    ],
                },
                { id: "cons_motivoOtro", tipo: "text", label: "Cuéntanos el otro motivo", requerido: true, visibleSi: incluye("cons_motivo", "Otro") },
                {
                    id: "cons_herramientas",
                    tipo: "checkboxGroup",
                    label: "¿Qué herramientas o sistemas usan hoy?",
                    requerido: true,
                    opciones: [
                        "Excel / Google Sheets",
                        "ERP o sistema de gestión",
                        "CRM",
                        "Sitio web",
                        "Tienda online",
                        "App móvil",
                        "Sistema desarrollado a medida",
                        "Servicios en la nube (AWS, Azure, Google Cloud)",
                        "Google Workspace / Microsoft 365",
                        "Ninguna todavía",
                    ],
                },
                {
                    id: "cons_herramientasDetalle",
                    tipo: "textarea",
                    label: "Nombres de los sistemas y proveedores que usan",
                    placeholder: "Ej: Bsale para ventas, WordPress en Hostinger, planillas compartidas en Drive.",
                },
                {
                    id: "cons_equipoTi",
                    tipo: "radio",
                    label: "¿Quién se encarga hoy de la tecnología?",
                    requerido: true,
                    opciones: ["Un equipo interno de TI", "Una persona del equipo (no exclusiva)", "Un proveedor externo", "Nadie en particular"],
                },
            ],
        },
        {
            id: "cons-desafio",
            titulo: "El desafío y lo que esperas",
            descripcion: "Mientras más concreto, mejor podremos preparar la primera sesión.",
            campos: [
                {
                    id: "cons_problema",
                    tipo: "textarea",
                    label: "¿Cuál es el principal problema o decisión que tienes hoy?",
                    requerido: true,
                    placeholder: "Ej: Nos ofrecieron tres sistemas distintos para inventario y no sabemos cuál conviene.",
                },
                {
                    id: "cons_impacto",
                    tipo: "radio",
                    label: "¿Cómo te está afectando?",
                    opciones: [
                        "Estamos perdiendo ventas o clientes",
                        "El equipo pierde mucho tiempo",
                        "Pagamos más de lo que deberíamos",
                        "Hay riesgo para la información",
                        "Aún no afecta, es preventivo",
                    ],
                },
                {
                    id: "cons_entregables",
                    tipo: "checkboxGroup",
                    label: "¿Qué te gustaría recibir?",
                    requerido: true,
                    opciones: [
                        "Diagnóstico escrito de la situación",
                        "Hoja de ruta tecnológica (roadmap)",
                        "Recomendación de herramientas o proveedores",
                        "Estimación de costos y tiempos",
                        "Propuesta de arquitectura",
                        "Acompañamiento durante la implementación",
                    ],
                },
                {
                    id: "cons_modalidad",
                    tipo: "radio",
                    label: "¿Qué formato te acomoda?",
                    opciones: ["Una sesión puntual", "Sesiones periódicas", "Un proyecto de consultoría completo", "No sé, necesito orientación"],
                },
                {
                    id: "cons_documentacion",
                    tipo: "radio",
                    label: "¿Tienen documentación de sus sistemas o procesos?",
                    opciones: ["Sí, bastante completa", "Algo, pero desordenada", "No tenemos"],
                },
            ],
        },
    ],
};

export default consultoriaTecnica;

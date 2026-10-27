import { FormularioServicio } from "../tipos";
import { incluye, opcionesFrecuencia, opcionesHorasSemanales, opcionesPersonas } from "./opciones";

const automatizacion: FormularioServicio = {
    slug: "automatizacion",
    intro: "Te preguntaremos qué tareas repetitivas tienen, cómo se hacen hoy y con qué herramientas trabajan.",
    pasos: [
        {
            id: "auto-tareas",
            titulo: "Las tareas a automatizar",
            descripcion: "Piensa en lo que hacen a mano todos los días o todas las semanas.",
            campos: [
                {
                    id: "auto_tareas",
                    tipo: "checkboxGroup",
                    label: "¿Qué tareas te gustaría automatizar?",
                    requerido: true,
                    opciones: [
                        "Responder mensajes o consultas",
                        "Enviar recordatorios (citas, pagos, renovaciones)",
                        "Ingresar pedidos o ventas",
                        "Facturación y cobranza",
                        "Armar reportes",
                        "Pasar datos de un sistema a otro",
                        "Control de inventario",
                        "Agendamiento",
                        "Incorporación de clientes o trabajadores",
                        "Otra",
                    ],
                },
                { id: "auto_tareasOtra", tipo: "text", label: "¿Cuál otra tarea?", requerido: true, visibleSi: incluye("auto_tareas", "Otra") },
                {
                    id: "auto_proceso",
                    tipo: "textarea",
                    label: "Describe la tarea más importante, paso a paso",
                    requerido: true,
                    placeholder: "Ej: Recibimos el pedido por WhatsApp, lo anotamos en Excel, emitimos la boleta en el SII y avisamos al repartidor.",
                },
                { id: "auto_frecuencia", tipo: "radio", label: "¿Con qué frecuencia se hace?", opciones: opcionesFrecuencia },
                { id: "auto_personas", tipo: "radio", label: "¿Cuántas personas participan?", opciones: opcionesPersonas },
                { id: "auto_horas", tipo: "radio", label: "¿Cuánto tiempo le dedican a la semana?", opciones: opcionesHorasSemanales },
                {
                    id: "auto_errores",
                    tipo: "radio",
                    label: "¿Se cometen errores en ese proceso?",
                    opciones: ["Sí, con frecuencia", "A veces", "Rara vez"],
                },
            ],
        },
        {
            id: "auto-herramientas",
            titulo: "Herramientas y resultado esperado",
            descripcion: "Para que la automatización funcione con lo que ya usas, sin cambiarte de todo.",
            campos: [
                {
                    id: "auto_herramientas",
                    tipo: "checkboxGroup",
                    label: "¿Qué herramientas usan en ese proceso?",
                    requerido: true,
                    opciones: [
                        "WhatsApp / WhatsApp Business",
                        "Correo (Gmail, Outlook)",
                        "Excel / Google Sheets",
                        "Google Calendar",
                        "ERP (Defontana, Bsale, SAP, etc.)",
                        "CRM (HubSpot, Pipedrive, etc.)",
                        "Tienda online",
                        "Facturación electrónica / SII",
                        "Formularios (Google Forms, Typeform)",
                        "Sistema propio",
                        "Papel y lápiz",
                    ],
                },
                {
                    id: "auto_herramientasDetalle",
                    tipo: "text",
                    label: "Nombre exacto de los sistemas que usan",
                    placeholder: "Ej: Bsale, Gmail, planilla 'Pedidos 2026' en Drive",
                },
                {
                    id: "auto_usoActual",
                    tipo: "radio",
                    label: "¿Ya usan alguna herramienta de automatización?",
                    opciones: ["Sí (Zapier, Make, n8n u otra)", "Macros o fórmulas en Excel", "No"],
                },
                {
                    id: "auto_resultado",
                    tipo: "textarea",
                    label: "¿Cómo debería funcionar en el mejor de los casos?",
                    placeholder: "Ej: Que el pedido de WhatsApp quede registrado solo, se emita la boleta y el cliente reciba el seguimiento.",
                },
                {
                    id: "auto_formato",
                    tipo: "radio",
                    label: "¿Cómo prefieres la solución?",
                    opciones: ["Integrada a las herramientas que ya uso", "Una página web o panel nuevo", "Una app móvil", "Lo que ustedes recomienden"],
                },
            ],
        },
    ],
};

export default automatizacion;

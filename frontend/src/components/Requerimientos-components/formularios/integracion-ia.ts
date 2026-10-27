import { FormularioServicio } from "../tipos";
import { incluye, opcionesFrecuencia, opcionesHorasSemanales, opcionesPersonas } from "./opciones";

const integracionIa: FormularioServicio = {
    slug: "integracion-ia",
    intro: "Te preguntaremos qué tarea quieres resolver con IA, cómo se hace hoy, dónde están los datos y qué nivel de autonomía esperas.",
    pasos: [
        {
            id: "ia-caso",
            titulo: "El proceso a mejorar",
            descripcion: "La IA aporta valor cuando resuelve una tarea concreta. Ayúdanos a identificarla.",
            campos: [
                {
                    id: "ia_casos",
                    tipo: "checkboxGroup",
                    label: "¿Qué te gustaría que hiciera la IA?",
                    requerido: true,
                    opciones: [
                        "Asistente o chatbot que atienda clientes",
                        "Responder mensajes de WhatsApp, correo o redes",
                        "Leer documentos y extraer datos (facturas, contratos, formularios)",
                        "Generar reportes o resúmenes",
                        "Buscar respuestas en documentos internos",
                        "Analizar datos o hacer predicciones",
                        "Generar contenido (textos, publicaciones, descripciones)",
                        "Un agente que ejecute tareas en mis sistemas",
                        "Otro",
                    ],
                },
                { id: "ia_casosOtro", tipo: "text", label: "Describe el otro caso", requerido: true, visibleSi: incluye("ia_casos", "Otro") },
                {
                    id: "ia_procesoActual",
                    tipo: "textarea",
                    label: "¿Cómo se hace esa tarea hoy, paso a paso?",
                    requerido: true,
                    placeholder: "Ej: Llega un correo con una orden de compra en PDF, una persona la abre, copia los datos al ERP y responde confirmando.",
                },
                { id: "ia_frecuencia", tipo: "radio", label: "¿Con qué frecuencia ocurre?", opciones: opcionesFrecuencia },
                { id: "ia_personas", tipo: "radio", label: "¿Cuántas personas participan?", opciones: opcionesPersonas },
                { id: "ia_horas", tipo: "radio", label: "¿Cuánto tiempo le dedican a la semana?", opciones: opcionesHorasSemanales },
            ],
        },
        {
            id: "ia-datos",
            titulo: "Datos, canales y control",
            descripcion: "Para saber con qué información trabajará la IA y dónde debe funcionar.",
            campos: [
                {
                    id: "ia_fuentes",
                    tipo: "checkboxGroup",
                    label: "¿Dónde está la información que usaría?",
                    requerido: true,
                    opciones: [
                        "Documentos PDF o Word",
                        "Planillas Excel / Google Sheets",
                        "Base de datos propia",
                        "ERP o CRM",
                        "Correos",
                        "Conversaciones de WhatsApp",
                        "Mi sitio web",
                        "No está digitalizada",
                    ],
                },
                {
                    id: "ia_canales",
                    tipo: "checkboxGroup",
                    label: "¿Dónde debería funcionar?",
                    opciones: ["Sitio web", "WhatsApp", "Instagram / Facebook", "Correo", "App móvil", "Sistema interno", "Slack / Teams"],
                },
                {
                    id: "ia_datosSensibles",
                    tipo: "radio",
                    label: "¿Maneja datos sensibles?",
                    requerido: true,
                    opciones: ["Sí, datos personales de clientes", "Sí, datos financieros o de salud", "No", "No lo sé"],
                },
                {
                    id: "ia_usoActual",
                    tipo: "radio",
                    label: "¿Ya usan IA en el negocio?",
                    opciones: ["Sí, ChatGPT u otras de forma manual", "Sí, integrada en algún sistema", "No"],
                },
                {
                    id: "ia_autonomia",
                    tipo: "radio",
                    label: "¿Cuánta autonomía debería tener?",
                    requerido: true,
                    opciones: [
                        "Que actúe sola",
                        "Que proponga y una persona apruebe",
                        "Solo como apoyo para el equipo",
                        "No lo sé, quiero que me orienten",
                    ],
                },
                {
                    id: "ia_exito",
                    tipo: "textarea",
                    label: "¿Cómo sabrías que funcionó?",
                    placeholder: "Ej: Responder el 70% de las consultas sin intervención y bajar el tiempo de respuesta a menos de 5 minutos.",
                },
            ],
        },
    ],
};

export default integracionIa;

import { FormularioServicio } from "../tipos";
import { noEs, opcionesAccesoCodigo } from "./opciones";

const PROYECTO_NUEVO = "Proyecto nuevo, aún no está publicado";

const devopsHosting: FormularioServicio = {
    slug: "devops-hosting",
    intro: "Te preguntaremos qué hay que publicar o mantener en línea, dónde está hoy y qué nivel de disponibilidad necesitas.",
    pasos: [
        {
            id: "dev-infra",
            titulo: "Infraestructura actual",
            descripcion: "Dónde vive hoy tu sitio, app o sistema (si es que ya existe).",
            campos: [
                {
                    id: "dev_situacion",
                    tipo: "radio",
                    label: "¿Cuál es tu situación?",
                    requerido: true,
                    opciones: [
                        PROYECTO_NUEVO,
                        "Ya está publicado y quiero migrarlo",
                        "Ya está publicado y quiero ordenarlo o mejorarlo",
                        "Tengo caídas o lentitud",
                    ],
                },
                {
                    id: "dev_componentes",
                    tipo: "checkboxGroup",
                    label: "¿Qué hay que alojar?",
                    requerido: true,
                    opciones: ["Sitio web", "Tienda online", "Aplicación web", "Backend / API", "Base de datos", "Correo corporativo", "Archivos o almacenamiento"],
                },
                {
                    id: "dev_proveedor",
                    tipo: "select",
                    label: "¿Dónde está alojado hoy?",
                    ancho: "medio",
                    opciones: ["Hosting compartido (cPanel)", "Vercel / Netlify", "AWS", "Azure", "Google Cloud", "DigitalOcean", "Servidor propio", "No lo sé", "Otro"],
                    visibleSi: noEs("dev_situacion", PROYECTO_NUEVO),
                },
                {
                    id: "dev_trafico",
                    tipo: "select",
                    label: "Visitas mensuales aproximadas",
                    ancho: "medio",
                    opciones: ["Menos de 1.000", "1.000 a 10.000", "10.000 a 100.000", "Más de 100.000", "No lo sé"],
                },
                {
                    id: "dev_tecnologias",
                    tipo: "textarea",
                    label: "¿Con qué tecnologías está hecho?",
                    placeholder: "Ej: WordPress con MySQL, o Next.js con Node y PostgreSQL. Si no lo sabes, déjalo en blanco.",
                },
                { id: "dev_acceso", tipo: "radio", label: "¿Tienes acceso al código y a las cuentas?", opciones: opcionesAccesoCodigo },
            ],
        },
        {
            id: "dev-operacion",
            titulo: "Requisitos de operación",
            descripcion: "Qué tan crítico es que esté siempre funcionando y qué quieres resolver.",
            campos: [
                {
                    id: "dev_necesidades",
                    tipo: "checkboxGroup",
                    label: "¿Qué necesitas?",
                    requerido: true,
                    opciones: [
                        "Publicación automática de cambios (CI/CD)",
                        "Respaldos automáticos",
                        "Monitoreo y alertas",
                        "Certificado SSL (https)",
                        "Mejorar velocidad (CDN, caché)",
                        "Ambiente de pruebas",
                        "Escalar cuando haya más tráfico",
                        "Correos corporativos",
                        "Configurar dominio y DNS",
                    ],
                },
                {
                    id: "dev_criticidad",
                    tipo: "radio",
                    label: "Si se cae, ¿qué tan grave es?",
                    requerido: true,
                    opciones: ["Crítico: debe estar 24/7", "Importante, pero tolera cortes breves", "No es crítico"],
                },
                {
                    id: "dev_incidentes",
                    tipo: "textarea",
                    label: "Problemas recientes",
                    placeholder: "Ej: Se cae los fines de semana, el certificado venció, se llenó el disco.",
                    visibleSi: noEs("dev_situacion", PROYECTO_NUEVO),
                },
                {
                    id: "dev_gastoMensual",
                    tipo: "select",
                    label: "¿Cuánto pagas hoy (o esperas pagar) al mes por infraestructura?",
                    opciones: ["Menos de $20.000", "$20.000 – $100.000", "$100.000 – $500.000", "Más de $500.000", "No lo sé"],
                },
            ],
        },
    ],
};

export default devopsHosting;

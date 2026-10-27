import { FormularioServicio, ValoresFormulario } from "../tipos";
import { es, incluye, noEs } from "./opciones";

const SITIO_NUEVO = "Un sitio nuevo desde cero";
const TIENDA = "Tienda online (e-commerce)";

const vendeOnline = (v: ValoresFormulario) =>
    es("web_tipo", TIENDA)(v) || incluye("web_funcionalidades", "Carrito de compras", "Pagos online")(v);

const desarrolloWeb: FormularioServicio = {
    slug: "desarrollo-web",
    intro: "Te preguntaremos qué tipo de sitio necesitas, qué debe hacer, qué contenido tienes y cómo imaginas el diseño.",
    pasos: [
        {
            id: "web-proyecto",
            titulo: "Tipo de proyecto",
            descripcion: "Cuéntanos si partimos de cero o trabajamos sobre algo que ya existe.",
            campos: [
                {
                    id: "web_situacion",
                    tipo: "radio",
                    label: "¿Qué necesitas?",
                    requerido: true,
                    opciones: [SITIO_NUEVO, "Rediseñar mi sitio actual", "Mejoras o funciones nuevas en mi sitio actual", "Migrar mi sitio a otra plataforma"],
                },
                {
                    id: "web_urlActual",
                    tipo: "url",
                    label: "Dirección de tu sitio actual",
                    requerido: true,
                    placeholder: "www.miempresa.cl",
                    ancho: "medio",
                    visibleSi: noEs("web_situacion", SITIO_NUEVO),
                },
                {
                    id: "web_plataformaActual",
                    tipo: "select",
                    label: "¿Con qué está hecho?",
                    ancho: "medio",
                    opciones: ["WordPress", "Wix", "Shopify", "Squarespace", "Jumpseller", "Desarrollo a medida", "No lo sé", "Otra"],
                    visibleSi: noEs("web_situacion", SITIO_NUEVO),
                },
                {
                    id: "web_problemasActual",
                    tipo: "textarea",
                    label: "¿Qué no te gusta o qué quieres cambiar del sitio actual?",
                    requerido: true,
                    placeholder: "Ej: Se ve antiguo, carga lento en el celular y no puedo cambiar los precios yo mismo.",
                    visibleSi: noEs("web_situacion", SITIO_NUEVO),
                },
                {
                    id: "web_tipo",
                    tipo: "radio",
                    label: "¿Qué tipo de sitio es?",
                    requerido: true,
                    opciones: [
                        "Sitio informativo / corporativo",
                        "Landing page (una sola página)",
                        TIENDA,
                        "Portal con registro de usuarios",
                        "Blog o sitio de contenidos",
                        "Plataforma o sistema web a medida",
                        "Portafolio",
                    ],
                },
                {
                    id: "web_objetivos",
                    tipo: "checkboxGroup",
                    label: "¿Qué debe lograr el sitio?",
                    requerido: true,
                    opciones: [
                        "Conseguir contactos o cotizaciones",
                        "Vender productos o servicios online",
                        "Dar a conocer la marca",
                        "Recibir reservas o agendar citas",
                        "Informar a clientes actuales",
                        "Automatizar procesos internos",
                    ],
                },
                {
                    id: "web_publico",
                    tipo: "textarea",
                    label: "¿Quiénes visitarán el sitio?",
                    placeholder: "Ej: Dueños de casa de la zona sur de Santiago, entre 30 y 55 años, que buscan remodelar.",
                },
            ],
        },
        {
            id: "web-funcionalidades",
            titulo: "Contenido y funcionalidades",
            descripcion: "Marca todo lo que imaginas. No te preocupes si es mucho: después priorizamos juntos.",
            campos: [
                {
                    id: "web_paginas",
                    tipo: "radio",
                    label: "¿Cuántas páginas o secciones aproximadamente?",
                    opciones: ["1 (landing)", "2 a 5", "6 a 10", "Más de 10", "No lo sé"],
                },
                {
                    id: "web_secciones",
                    tipo: "checkboxGroup",
                    label: "Secciones que debería tener",
                    opciones: ["Inicio", "Nosotros", "Servicios / productos", "Portafolio o proyectos", "Blog / noticias", "Testimonios", "Equipo", "Preguntas frecuentes", "Contacto"],
                },
                {
                    id: "web_funcionalidades",
                    tipo: "checkboxGroup",
                    label: "Funcionalidades",
                    opciones: [
                        "Formulario de contacto",
                        "Botón de WhatsApp",
                        "Reservas o agenda online",
                        "Pagos online",
                        "Carrito de compras",
                        "Registro e inicio de sesión",
                        "Panel para editar contenido yo mismo",
                        "Varios idiomas",
                        "Chat o asistente con IA",
                        "Integración con ERP, CRM o facturación",
                        "Suscripción a newsletter",
                        "Mapa / ubicación",
                    ],
                },
                {
                    id: "web_cantidadProductos",
                    tipo: "radio",
                    label: "¿Cuántos productos venderías?",
                    requerido: true,
                    opciones: ["Menos de 20", "Entre 20 y 100", "Entre 100 y 1.000", "Más de 1.000"],
                    visibleSi: vendeOnline,
                },
                {
                    id: "web_mediosPago",
                    tipo: "checkboxGroup",
                    label: "Medios de pago",
                    opciones: ["Webpay (Transbank)", "Mercado Pago", "Flow", "Transferencia bancaria", "PayPal", "No lo sé"],
                    visibleSi: vendeOnline,
                },
                {
                    id: "web_despacho",
                    tipo: "checkboxGroup",
                    label: "¿Cómo entregas los productos?",
                    opciones: ["Despacho propio", "Courier (Starken, Chilexpress, Blue Express...)", "Retiro en tienda", "Productos digitales / no aplica"],
                    visibleSi: vendeOnline,
                },
                {
                    id: "web_editor",
                    tipo: "radio",
                    label: "¿Quién actualizará el contenido una vez publicado?",
                    opciones: ["Yo o mi equipo", "BM Code Lab", "Ambos"],
                },
            ],
        },
        {
            id: "web-diseno",
            titulo: "Diseño, marca y dominio",
            descripcion: "Lo que ya tengas nos ahorra tiempo; lo que falte lo podemos crear.",
            campos: [
                {
                    id: "web_identidad",
                    tipo: "radio",
                    label: "¿Tienes identidad de marca?",
                    requerido: true,
                    opciones: ["Logo y manual de marca (colores, tipografías)", "Solo el logo", "No, necesito que la creen"],
                },
                {
                    id: "web_contenidoListo",
                    tipo: "checkboxGroup",
                    label: "¿Qué contenido tienes listo?",
                    opciones: ["Textos", "Fotografías propias", "Videos", "Fichas de productos", "Nada aún"],
                },
                {
                    id: "web_estilo",
                    tipo: "checkboxGroup",
                    label: "¿Qué estilo buscas?",
                    opciones: ["Minimalista", "Corporativo / formal", "Moderno / tecnológico", "Colorido / juvenil", "Elegante / premium", "Cercano / familiar"],
                },
                {
                    id: "web_referencias",
                    tipo: "textarea",
                    label: "Sitios que te gusten (y por qué)",
                    placeholder: "Pega enlaces de sitios de referencia, aunque sean de otro rubro.",
                },
                {
                    id: "web_dominio",
                    tipo: "radio",
                    label: "¿Tienes dominio y hosting?",
                    requerido: true,
                    opciones: ["Tengo dominio y hosting", "Solo el dominio", "No tengo ninguno", "No sé qué es eso"],
                },
                {
                    id: "web_dominioNombre",
                    tipo: "text",
                    label: "¿Cuál es tu dominio?",
                    placeholder: "miempresa.cl",
                    visibleSi: es("web_dominio", "Tengo dominio y hosting", "Solo el dominio"),
                },
            ],
        },
    ],
};

export default desarrolloWeb;

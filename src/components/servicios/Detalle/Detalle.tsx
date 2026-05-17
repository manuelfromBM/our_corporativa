"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./Detalle.module.css";
import SERVICIOS from "@/components/servicios/Servicios.data";
import Link from "next/link";

const DETALLE: Record<
    string,
    {
        tagline: string;
        descTec: string;
        descCas: string;
        featuresTec: string[];
        featuresCas: string[];
    }
> = {
    "consultoria-tecnica": {
        tagline: "Claridad antes de construir",
        descTec:
            "Realizamos una auditoría completa de tu infraestructura actual, identificamos cuellos de botella, evaluamos la deuda técnica acumulada y definimos un roadmap tecnológico alineado a tu stack. Entregamos un documento de arquitectura con recomendaciones priorizadas y estimaciones de esfuerzo.",
        descCas:
            "Antes de invertir en tecnología, necesitas saber exactamente qué necesitas y por qué. Nos sentamos contigo a entender tu negocio, analizamos lo que ya tienes y te explicamos con claridad qué herramientas te convienen, cuánto costarán y cuánto tiempo tomará. Sin tecnicismos, sin sorpresas.",
        featuresTec: [
            "Auditoría de infraestructura y stack tecnológico",
            "Definición de arquitectura escalable",
            "Roadmap técnico priorizado",
            "Análisis de costos y estimación de esfuerzo",
        ],
        featuresCas: [
            "Diagnóstico claro de qué tecnología necesitas",
            "Explicación en lenguaje sencillo, sin jerga",
            "Plan de acción con tiempos y costos reales",
            "Acompañamiento en la toma de decisiones",
        ],
    },
    "desarrollo-web": {
        tagline: "Tu presencia digital, construida para durar",
        descTec:
            "Desarrollamos plataformas web con Next.js y React, con SSR, SSG y rendering híbrido según las necesidades del proyecto. Integramos APIs REST o GraphQL, implementamos autenticación segura, optimizamos Core Web Vitals y desplegamos en infraestructura cloud con CI/CD automatizado.",
        descCas:
            "Tu sitio web es tu mejor vendedor — trabaja las 24 horas, llega a clientes que no conoces aún y proyecta la imagen que tu negocio merece. Lo construimos desde cero: rápido, bonito, fácil de actualizar y optimizado para que Google te encuentre. Tú te enfocas en tu negocio, nosotros en que tu web funcione.",
        featuresTec: [
            "Next.js con SSR, SSG y App Router",
            "Integración con APIs REST y GraphQL",
            "Optimización de Core Web Vitals y SEO técnico",
            "CI/CD y despliegue en Vercel, AWS o GCP",
        ],
        featuresCas: [
            "Diseño moderno adaptado a tu marca",
            "Optimizado para aparecer en Google",
            "Fácil de actualizar sin saber programar",
            "Rápido en cualquier dispositivo",
        ],
    },
    "aplicaciones-moviles": {
        tagline: "Tu negocio en el bolsillo de tus clientes",
        descTec:
            "Construimos aplicaciones móviles con React Native para iOS y Android desde una sola base de código. Integramos push notifications, pagos in-app, autenticación biométrica, geolocalización y conexión con APIs externas. Gestionamos la publicación en App Store y Google Play.",
        descCas:
            "Una app propia pone tu negocio directamente en el teléfono de tus clientes, donde pasan la mayor parte del día. La lanzamos en iOS y Android para que puedan comprar, agendar, consultar o contactarte sin fricciones, desde donde estén. Sin complicaciones técnicas de tu parte.",
        featuresTec: [
            "React Native para iOS y Android",
            "Push notifications y pagos in-app",
            "Autenticación biométrica y OAuth",
            "Publicación y gestión en tiendas",
        ],
        featuresCas: [
            "Disponible en App Store y Google Play",
            "Experiencia fluida en cualquier dispositivo",
            "Notificaciones para fidelizar clientes",
            "Integración con tus sistemas actuales",
        ],
    },
    "integracion-ia": {
        tagline: "Automatiza lo repetitivo, enfócate en lo importante",
        descTec:
            "Diseñamos e implementamos flujos de automatización con LLMs (OpenAI, Anthropic, modelos open source), RAG sobre datos propios, agentes con herramientas, clasificadores y sistemas de búsqueda semántica. Conectamos los modelos a tus datos y procesos reales mediante APIs y pipelines.",
        descCas:
            "Tu negocio puede responder preguntas de clientes automáticamente, clasificar documentos, generar reportes o procesar información sin que nadie lo haga manualmente. Identificamos qué tareas repetitivas consumen más tiempo en tu operación y las automatizamos con inteligencia artificial, de forma práctica y medible.",
        featuresTec: [
            "Integración con LLMs y APIs de IA",
            "RAG sobre documentos y datos propios",
            "Agentes y flujos de automatización",
            "Búsqueda semántica e indexación vectorial",
        ],
        featuresCas: [
            "Automatización de tareas repetitivas",
            "Asistentes que responden por tu negocio",
            "Procesamiento de documentos e información",
            "Resultados medibles desde el primer mes",
        ],
    },
    "seguridad-gestion": {
        tagline: "Protege lo que construiste",
        descTec:
            "Implementamos políticas de control de acceso, gestión de identidades (IAM), MDM para dispositivos corporativos, auditorías de seguridad, cifrado de datos en tránsito y en reposo, y cumplimiento de normativas. Definimos procesos de respuesta ante incidentes y recuperación.",
        descCas:
            "Controlamos quién accede a qué dentro de tu empresa, protegemos tus dispositivos y nos aseguramos de que tus datos estén seguros. Si algo sale mal, tenemos un plan. Porque una brecha de seguridad no solo cuesta dinero — cuesta la confianza de tus clientes.",
        featuresTec: [
            "Control de acceso y gestión de identidades",
            "MDM y gestión de dispositivos corporativos",
            "Auditorías de seguridad y pentest básico",
            "Planes de respuesta ante incidentes",
        ],
        featuresCas: [
            "Control de quién accede a tu información",
            "Protección de dispositivos del equipo",
            "Respaldo y recuperación de datos",
            "Tranquilidad ante cualquier eventualidad",
        ],
    },
    "Automatización": {
        tagline: "Interfaces que enamoran y convierten",
        descTec:
            "Diseñamos sistemas de diseño completos con componentes reutilizables, tokens de diseño y documentación. Realizamos investigación de usuarios, wireframing, prototipado en Figma y pruebas de usabilidad. Entregamos assets listos para desarrollo con especificaciones técnicas detalladas.",
        descCas:
            "El diseño de tu producto digital es lo primero que ven tus clientes. Una interfaz confusa los aleja; una interfaz clara y bonita los convierte. Creamos experiencias que se sienten intuitivas desde el primer uso, que reflejan tu marca y que hacen que los usuarios quieran volver.",
        featuresTec: [
            "Sistema de diseño y componentes en Figma",
            "Investigación de usuarios y pruebas de usabilidad",
            "Tokens de diseño y documentación técnica",
            "Prototipado interactivo de alta fidelidad",
        ],
        featuresCas: [
            "Diseño adaptado a tu marca e identidad",
            "Interfaces intuitivas desde el primer uso",
            "Optimizado para móvil y escritorio",
            "Entrega lista para que el equipo desarrolle",
        ],
    },
    "devops-hosting": {
        tagline: "Infraestructura que no te da dolores de cabeza",
        descTec:
            "Diseñamos y operamos pipelines de CI/CD, gestionamos infraestructura como código con Terraform, configuramos monitoreo y alertas con Grafana/Datadog, implementamos estrategias de escalado automático y optimizamos costos en AWS, GCP o Azure.",
        descCas:
            "Nos encargamos de que tu web o app cargue rápido, no se caiga y escale sin problemas cuando tu negocio crezca. Gestionamos toda la infraestructura técnica para que tú no tengas que preocuparte por actualizaciones, caídas o cuellos de botella.",
        featuresTec: [
            "CI/CD con GitHub Actions o GitLab",
            "Infraestructura como código con Terraform",
            "Monitoreo, alertas y observabilidad",
            "Escalado automático y optimización de costos",
        ],
        featuresCas: [
            "Tu sitio siempre disponible y rápido",
            "Actualizaciones sin interrupciones",
            "Escala cuando tu tráfico crece",
            "Sin sorpresas en la factura del hosting",
        ],
    },
    "soporte-mantenimiento": {
        tagline: "El lanzamiento es solo el comienzo",
        descTec:
            "Proporcionamos SLAs de disponibilidad, monitoreo proactivo, gestión de parches y actualizaciones de dependencias, corrección de bugs con priorización por impacto, mejoras continuas y soporte técnico con tiempo de respuesta definido según el plan contratado.",
        descCas:
            "Publicar tu producto es solo el primer paso. Después viene mantenerlo actualizado, arreglar los problemas que aparecen con el uso real y seguir mejorándolo. Estamos contigo después del lanzamiento para que tu inversión siga rindiendo con el tiempo.",
        featuresTec: [
            "SLAs de disponibilidad y tiempo de respuesta",
            "Monitoreo proactivo y gestión de alertas",
            "Actualizaciones de dependencias y parches",
            "Mejoras continuas con priorización ágil",
        ],
        featuresCas: [
            "Siempre hay alguien disponible para ayudarte",
            "Arreglamos problemas antes de que los notes",
            "Actualizaciones regulares sin que lo pidas",
            "Tu producto mejora con el tiempo",
        ],
    },
};

/* ── Componente de bloque de servicio ─────────────────────── */
function ServicioBloque({
    servicio,
    modo,
    index,
}: {
    servicio: (typeof SERVICIOS)[0];
    modo: "tec" | "cas";
    index: number;
}) {
    const detalle = DETALLE[servicio.slug];
    const desc = modo === "tec" ? detalle.descTec : detalle.descCas;
    const features = modo === "tec" ? detalle.featuresTec : detalle.featuresCas;
    const titulo = modo === "tec" ? servicio.tec.titulo : servicio.cas.titulo;
    const esImpar = index % 2 === 0;

    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            id={servicio.slug}
            ref={ref}
            className={`${styles.bloque} ${visible ? styles.bloqueVisible : ""} ${esImpar ? styles.bloqueImpar : styles.bloquePar}`}
            style={{ "--accent": servicio.accentColor } as React.CSSProperties}
        >
            {/* Imagen */}
            <div className={styles.bloqueImagen}>
                <div className={styles.imagenMarco}>
                    <img
                        src={servicio.imageSrc}
                        alt={servicio.imageAlt}
                        className={styles.imagen}
                    />
                    <div className={styles.imagenOverlay} />
                    {/* Número grande decorativo */}
                    <span className={styles.numDecorativo}>{servicio.num}</span>
                </div>
            </div>

            {/* Contenido */}
            <div className={styles.bloqueContenido}>
                <div className={styles.bloqueHeader}>
                    <span className={styles.tagline}>{detalle.tagline}</span>
                    <h2 className={styles.bloqueTitulo}>{titulo}</h2>
                </div>

                <p className={styles.bloqueDesc}>{desc}</p>

                <ul className={styles.featuresList}>
                    {features.map((f, i) => (
                        <li key={i} className={styles.featureItem}>
                            <span className={styles.featureDot} aria-hidden="true" />
                            {f}
                        </li>
                    ))}
                </ul>

                <Link href="/#contacto" className={styles.bloqueCta}>
                    Hablemos de este servicio
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Link>
            </div>
        </div>
    );
}

/* ── Página principal ─────────────────────────────────────── */
export default function ServiciosPage() {
    const [modo, setModo] = useState<"tec" | "cas">("cas");
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [activoSlug, setActivoSlug] = useState(SERVICIOS[0].slug);

    const handleToggle = (nuevoModo: "tec" | "cas") => {
        if (nuevoModo === modo) return;
        setIsTransitioning(true);
        setTimeout(() => {
            setModo(nuevoModo);
            setIsTransitioning(false);
        }, 220);
    };

    // Detectar qué sección está en vista para el sidebar
    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        SERVICIOS.forEach((s) => {
            const el = document.getElementById(s.slug);
            if (!el) return;
            const obs = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setActivoSlug(s.slug); },
                { threshold: 0.4 }
            );
            obs.observe(el);
            observers.push(obs);
        });

        return () => observers.forEach((o) => o.disconnect());
    }, []);

    const scrollTo = (slug: string) => {
        const el = document.getElementById(slug);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <div className={styles.pagina}>
            {/* Fondo */}
            <div className={styles.bgGrid} aria-hidden="true" />
            <div className={styles.bgOrb1} aria-hidden="true" />
            <div className={styles.bgOrb2} aria-hidden="true" />

            {/* ── HERO compacto ── */}
            <header className={styles.heroCompacto}>
                <span className={styles.heroPill}>Lo que hacemos</span>
                <h1 className={styles.heroTitulo}>
                    Nuestros <span className={styles.gradientText}>servicios</span>
                </h1>
                <p className={styles.heroSub}>
                    Cada solución está pensada para el momento en que se encuentra tu negocio.
                    Explorá en detalle lo que podemos construir juntos.
                </p>

                {/* Toggle */}
                <div className={styles.toggleWrap}>
                    <div className={styles.togglePill}>
                        <button
                            className={`${styles.toggleBtn} ${modo === "cas" ? styles.toggleActive : ""}`}
                            onClick={() => handleToggle("cas")}
                        >
                            Para empresas
                        </button>
                        <button
                            className={`${styles.toggleBtn} ${modo === "tec" ? styles.toggleActive : ""}`}
                            onClick={() => handleToggle("tec")}
                        >
                            Para técnicos
                        </button>
                    </div>
                </div>
            </header>

            {/* ── LAYOUT PRINCIPAL ── */}
            <div className={styles.layout}>

                {/* Sidebar sticky */}
                <aside className={styles.sidebar}>
                    <p className={styles.sidebarLabel}>Servicios</p>
                    <nav className={styles.sidebarNav}>
                        {SERVICIOS.map((s) => {
                            const titulo = modo === "tec" ? s.tec.titulo : s.cas.titulo;
                            const esActivo = activoSlug === s.slug;
                            return (
                                <button
                                    key={s.slug}
                                    className={`${styles.sidebarItem} ${esActivo ? styles.sidebarItemActivo : ""}`}
                                    style={{ "--accent": s.accentColor } as React.CSSProperties}
                                    onClick={() => scrollTo(s.slug)}
                                >
                                    <span className={styles.sidebarNum}>{s.num}</span>
                                    <span className={styles.sidebarTitulo}>{titulo}</span>
                                    {esActivo && <span className={styles.sidebarIndicador} aria-hidden="true" />}
                                </button>
                            );
                        })}
                    </nav>
                </aside>

                {/* Bloques de contenido */}
                <main
                    className={`${styles.contenido} ${isTransitioning ? styles.contenidoFading : ""}`}
                >
                    {SERVICIOS.map((s, i) => (
                        <ServicioBloque
                            key={s.slug}
                            servicio={s}
                            modo={modo}
                            index={i}
                        />
                    ))}
                </main>

            </div>
        </div>
    );
}

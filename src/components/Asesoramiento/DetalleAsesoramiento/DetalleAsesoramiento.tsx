"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./DetalleA.module.css";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

/* ── DATOS COMPLETOS POR TEMA ──────────────────────────────── */
const TEMAS = [
    {
        slug: "publico",
        num: "01",
        accentColor: "#00c896",
        pill: "¿Esto es para ti?",
        titulo: "Trabajamos con negocios reales en etapas reales",
        descripcion:
            "No trabajamos con grandes corporaciones ni con startups de Silicon Valley. Trabajamos con el dueño de una clínica que quiere organizar sus turnos, el consultor que necesita proyectar más profesionalismo, o el emprendimiento que ya tiene clientes pero aún gestiona todo desde el teléfono. Si te reconociste en alguno de estos casos, estás en el lugar correcto.",
        imageSrc: "/BM-imagenes/asesoramiento/publico_objetivo.jpeg",
        imageAlt: "Nuestro público objetivo",
        bloques: [
            {
                icono: "🏢",
                titulo: "PYMEs en crecimiento",
                descripcion:
                    "Empresas de 1 a 50 personas que necesitan tecnología sin el costo de un equipo interno. Les entregamos soluciones que escalan con el negocio — sin que tengan que contratar un CTO ni mantener servidores.",
                features: [
                    "Soluciones a medida sin costos fijos de equipo interno",
                    "Tecnología que escala cuando el negocio crece",
                    "Acompañamiento continuo después del lanzamiento",
                    "Presupuestos claros y sin sorpresas",
                ],
            },
            {
                icono: "👤",
                titulo: "Profesionales independientes",
                descripcion:
                    "Consultores, freelancers y especialistas que quieren digitalizar su servicio, automatizar procesos repetitivos y proyectar una imagen más profesional. La tecnología les da tiempo para enfocarse en lo que saben hacer.",
                features: [
                    "Presencia digital que genera confianza",
                    "Automatización de tareas administrativas repetitivas",
                    "Herramientas que trabajan mientras tú duermes",
                    "Imagen profesional desde el primer contacto",
                ],
            },
            {
                icono: "🚀",
                titulo: "Startups y emprendimientos",
                descripcion:
                    "Ideas con potencial que necesitan un MVP sólido, validación rápida y tecnología que no frene el lanzamiento al mercado. Construimos rápido, priorizamos lo que importa y dejamos margen para iterar.",
                features: [
                    "MVPs funcionales en plazos reales",
                    "Arquitectura pensada para crecer sin reescribir todo",
                    "Foco en validación antes de escalar",
                    "Asesoría técnica desde el primer día",
                ],
            },
            {
                icono: "🛒",
                titulo: "Comercios y retail local",
                descripcion:
                    "Negocios locales que quieren dar el salto digital: tienda online, sistema de gestión o simplemente una presencia que les traiga más clientes. El paso de lo físico a lo digital, sin perder la identidad del negocio.",
                features: [
                    "Tiendas online conectadas a tu operación actual",
                    "Gestión de stock, ventas y clientes en un solo lugar",
                    "Presencia en buscadores para llegar a nuevos clientes",
                    "Integración con medios de pago locales",
                ],
            },
        ],
    },
    {
        slug: "beneficios",
        num: "02",
        accentColor: "#3b82f6",
        pill: "¿Qué cambia?",
        titulo: "La tecnología bien aplicada devuelve tiempo, visibilidad y control",
        descripcion:
            "No te vendemos una web o una app. Te devolvemos tiempo, visibilidad y control sobre tu negocio. La tecnología bien aplicada no es un gasto — es la palanca que multiplica lo que ya haces bien, sin que todo dependa de ti para funcionar.",
        imageSrc: "/BM-imagenes/asesoramiento/asesoramiento3.png",
        imageAlt: "Beneficios de trabajar con BM Code Lab",
        bloques: [
            {
                icono: "⏱",
                titulo: "Tiempo recuperado",
                descripcion:
                    "Cada proceso que automatizamos es tiempo que dejas de perder en tareas repetitivas. Desde responder las mismas preguntas a distintos clientes hasta generar reportes manuales — todo eso puede eliminarse.",
                features: [
                    "Automatización de respuestas y consultas frecuentes",
                    "Procesos administrativos que corren solos",
                    "Menos reuniones de seguimiento, más trabajo real",
                    "Tu equipo enfocado en lo que genera valor",
                ],
            },
            {
                icono: "👁",
                titulo: "Visibilidad real",
                descripcion:
                    "Una presencia digital bien construida te hace encontrable. No solo en Google — también en la percepción de tus clientes. Un negocio con tecnología sólida proyecta confianza antes de que alguien te contacte.",
                features: [
                    "Optimización para aparecer en búsquedas relevantes",
                    "Imagen digital coherente con tu marca",
                    "Canales de contacto claros y funcionales",
                    "Presencia que trabaja por ti las 24 horas",
                ],
            },
            {
                icono: "🎛",
                titulo: "Control sin depender de ti",
                descripcion:
                    "El mayor problema de los negocios en crecimiento es que todo pasa por una sola persona. Construimos sistemas que funcionan solos, con datos claros para que puedas tomar decisiones sin estar en el medio de todo.",
                features: [
                    "Dashboards con métricas que importan",
                    "Procesos documentados y delegables",
                    "Sistemas que no se caen cuando no estás",
                    "Decisiones basadas en datos, no en intuición",
                ],
            },
            {
                icono: "🤝",
                titulo: "Sin equipo interno que mantener",
                descripcion:
                    "Accedes a un equipo completo — diseñadores, desarrolladores, estrategas — sin los costos fijos de contratarlos. Pagas por lo que necesitas, cuando lo necesitas, con la calidad de un equipo dedicado.",
                features: [
                    "Equipo multidisciplinario sin costo fijo mensual",
                    "Comunicación directa con quienes construyen",
                    "Sin burocracia ni reuniones vacías",
                    "Soporte continuo después del lanzamiento",
                ],
            },
        ],
    },
    {
        slug: "soluciones",
        num: "03",
        accentColor: "#00c896",
        pill: "¿Qué necesitas?",
        titulo: "Cada etapa de tu negocio tiene su herramienta correcta",
        descripcion:
            "Depende de tu momento. Si estás consiguiendo tus primeros clientes, necesitas presencia y credibilidad. Si ya tienes una base sólida, quizás el siguiente paso es vender sin límite horario. Y si tu operación creció, un sistema a medida te devuelve el control. Te ayudamos a identificar cuál es la tuya.",
        imageSrc: "/BM-imagenes/asesoramiento/asesoramiento.jpeg",
        imageAlt: "Soluciones para cada etapa",
        bloques: [
            {
                icono: "🌐",
                titulo: "Web corporativa — para empezar bien",
                descripcion:
                    "Si estás en tus primeras etapas o quieres renovar tu imagen, una web profesional es tu mejor inversión. Te posiciona, genera confianza y trabaja por ti las 24 horas para atraer nuevos clientes antes de que te contacten.",
                features: [
                    "Diseño adaptado a tu marca e identidad",
                    "Optimizada para aparecer en Google",
                    "Rápida en cualquier dispositivo",
                    "Fácil de actualizar sin saber programar",
                ],
            },
            {
                icono: "🛍",
                titulo: "E-commerce — para vender sin límites",
                descripcion:
                    "Cuando ya tienes clientes y quieres escalar, una tienda online te permite vender en cualquier horario, a cualquier persona, sin depender de tu presencia física. El salto de tener clientes a tener un canal de ventas autónomo.",
                features: [
                    "Catálogo de productos fácil de gestionar",
                    "Integración con medios de pago locales e internacionales",
                    "Gestión de stock y pedidos en un solo lugar",
                    "Experiencia de compra fluida en móvil y escritorio",
                ],
            },
            {
                icono: "📱",
                titulo: "Aplicación móvil — para fidelizar",
                descripcion:
                    "Una app pone tu negocio en el bolsillo de tus clientes. Ideal cuando ya tienes una base establecida y quieres profundizar la relación con ellos — notificaciones, programas de fidelidad, reservas o compras directas.",
                features: [
                    "Disponible en App Store y Google Play",
                    "Notificaciones push para mantener el contacto",
                    "Experiencia personalizada por usuario",
                    "Integración con tus sistemas actuales",
                ],
            },
            {
                icono: "⚙️",
                titulo: "Sistema a medida — para optimizar",
                descripcion:
                    "Cuando tu operación creció y empiezas a perder tiempo en tareas repetitivas, un sistema personalizado automatiza procesos y te devuelve el control. No es un software genérico — es una herramienta construida para tu forma de trabajar.",
                features: [
                    "Automatización de los procesos específicos de tu negocio",
                    "Integración con las herramientas que ya usas",
                    "Reportes y métricas a medida",
                    "Escalable a medida que el negocio crece",
                ],
            },
        ],
    },
];

/* ── BLOQUE DE CONTENIDO ────────────────────────────────────── */
function BloqueContenido({
    bloque,
    index,
    accentColor,
}: {
    bloque: (typeof TEMAS)[0]["bloques"][0];
    index: number;
    accentColor: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const esImpar = index % 2 !== 0;

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.08 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`${styles.bloque} ${visible ? styles.bloqueVisible : ""} ${esImpar ? styles.bloquePar : ""}`}
            style={{ "--accent": accentColor } as React.CSSProperties}
        >
            <div className={styles.bloqueIcono}>{bloque.icono}</div>
            <div className={styles.bloqueContenido}>
                <h3 className={styles.bloqueTitulo}>{bloque.titulo}</h3>
                <p className={styles.bloqueDesc}>{bloque.descripcion}</p>
                <ul className={styles.featuresList}>
                    {bloque.features.map((f, i) => (
                        <li key={i} className={styles.featureItem}>
                            <span className={styles.featureDot} aria-hidden="true" />
                            {f}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

/* ── PANEL DE TEMA ──────────────────────────────────────────── */
function PanelTema({ tema }: { tema: (typeof TEMAS)[0] }) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold: 0.05 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            id={tema.slug}
            ref={ref}
            className={`${styles.panel} ${visible ? styles.panelVisible : ""}`}
            style={{ "--accent": tema.accentColor } as React.CSSProperties}
        >
            {/* Header del panel */}
            <div className={styles.panelHeader}>
                <div className={styles.panelHeaderTexto}>
                    <span className={styles.panelPill}>{tema.pill}</span>
                    <h2 className={styles.panelTitulo}>{tema.titulo}</h2>
                    <p className={styles.panelDesc}>{tema.descripcion}</p>
                </div>
                <div className={styles.panelHeaderImagen}>
                    <div className={styles.imagenMarco}>
                        <img
                            src={tema.imageSrc}
                            alt={tema.imageAlt}
                            className={styles.imagen}
                        />
                        <div className={styles.imagenOverlay} />
                        <span className={styles.numDecorativo}>{tema.num}</span>
                    </div>
                </div>
            </div>

            {/* Divisor */}
            <div className={styles.divisor}>
                <span className={styles.divisorLinea} />
                <span className={styles.divisorTexto}>En detalle</span>
                <span className={styles.divisorLinea} />
            </div>

            {/* Bloques de detalle */}
            <div className={styles.bloquesGrid}>
                {tema.bloques.map((b, i) => (
                    <BloqueContenido
                        key={i}
                        bloque={b}
                        index={i}
                        accentColor={tema.accentColor}
                    />
                ))}
            </div>

            {/* CTA al final del panel */}
            <div className={styles.panelCta}>
                <p className={styles.panelCtaTexto}>
                    ¿Esto es lo que necesita tu negocio?
                </p>
                <Link href="/#contacto" className={styles.panelCtaBtn}>
                    Hablemos de tu proyecto
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Link>
            </div>
        </div>
    );
}

/* ── PÁGINA PRINCIPAL ───────────────────────────────────────── */
export default function AsesoriaDetalle() {
    const searchParams = useSearchParams();
    const [activoSlug, setActivoSlug] = useState(TEMAS[0].slug);

    // Scroll al tema correcto cuando llega con ?tema= o #hash
    useEffect(() => {
        const tema = searchParams.get("tema");
        if (tema) {
            const el = document.getElementById(tema);
            if (el) {
                setTimeout(() => {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 300);
            }
        }
    }, [searchParams]);

    // Detectar qué panel está en vista
    useEffect(() => {
        const observers: IntersectionObserver[] = [];
        TEMAS.forEach((t) => {
            const el = document.getElementById(t.slug);
            if (!el) return;
            const obs = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setActivoSlug(t.slug); },
                { threshold: 0.25 }
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
            <div className={styles.bgGrid} aria-hidden="true" />
            <div className={styles.bgOrb1} aria-hidden="true" />
            <div className={styles.bgOrb2} aria-hidden="true" />

            {/* Hero compacto */}
            <header className={styles.hero}>
                <span className={styles.heroPill}>Asesoramiento</span>
                <h1 className={styles.heroTitulo}>
                    Todo lo que necesitas{" "}
                    <span className={styles.gradientText}>saber antes de empezar</span>
                </h1>
                <p className={styles.heroSub}>
                    Sin tecnicismos ni presión. Aquí encontrarás quiénes somos para,
                    qué cambia cuando trabajas con nosotros y qué herramienta necesita
                    tu negocio según el momento en que estás.
                </p>
            </header>

            {/* Layout sidebar + contenido */}
            <div className={styles.layout}>

                {/* Sidebar sticky */}
                <aside className={styles.sidebar}>
                    <p className={styles.sidebarLabel}>En esta página</p>
                    <nav className={styles.sidebarNav}>
                        {TEMAS.map((t) => {
                            const esActivo = activoSlug === t.slug;
                            return (
                                <button
                                    key={t.slug}
                                    className={`${styles.sidebarItem} ${esActivo ? styles.sidebarActivo : ""}`}
                                    style={{ "--accent": t.accentColor } as React.CSSProperties}
                                    onClick={() => scrollTo(t.slug)}
                                >
                                    <span className={styles.sidebarNum}>{t.num}</span>
                                    <span className={styles.sidebarTitulo}>{t.pill}</span>
                                    {esActivo && <span className={styles.sidebarIndicador} aria-hidden="true" />}
                                </button>
                            );
                        })}
                    </nav>

                    <div className={styles.sidebarCta}>
                        <p className={styles.sidebarCtaTexto}>
                            ¿Listo para dar el primer paso?
                        </p>
                        <Link href="/#contacto" className={styles.sidebarCtaBtn}>
                            Contáctanos
                        </Link>
                    </div>
                </aside>

                {/* Paneles de contenido */}
                <main className={styles.contenido}>
                    {TEMAS.map((t) => (
                        <PanelTema key={t.slug} tema={t} />
                    ))}
                </main>

            </div>
        </div>
    );
}

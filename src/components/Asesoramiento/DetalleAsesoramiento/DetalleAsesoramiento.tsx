"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./DetalleA.module.css";
import Link from "next/link";


const BLOQUES = [
    {
        slug: "publico",
        num: "01",
        accentColor: "#00c896",
        imageSrc: "", // TODO: reemplazar con ruta real ej: "/BM-imagenes/asesoria/publico.jpg"
        imageAlt: "Nuestro público objetivo",
        tagline: "¿Esto es para ti?",
        titulo: "Negocios reales en etapas reales",
        descripcion:
            "No trabajamos con grandes corporaciones. Trabajamos con el dueño de una clínica que quiere organizar sus turnos, el consultor que necesita proyectar más profesionalismo, o el emprendimiento que ya tiene clientes pero aún gestiona todo desde el teléfono. Si te reconociste en alguno de estos casos, estás en el lugar correcto.",
        features: [
            {
                titulo: "PYMEs en crecimiento",
                desc: "Empresas de 1 a 50 personas que necesitan tecnología sin el costo de un equipo interno. Les entregamos soluciones que escalan con el negocio.",
            },
            {
                titulo: "Profesionales independientes",
                desc: "Consultores, freelancers y especialistas que quieren digitalizar su servicio, automatizar procesos y proyectar una imagen más profesional.",
            },
            {
                titulo: "Startups y emprendimientos",
                desc: "Ideas con potencial que necesitan un MVP sólido, validación rápida y tecnología que no frene el lanzamiento al mercado.",
            },
            {
                titulo: "Comercios y retail local",
                desc: "Negocios que quieren dar el salto digital: tienda online, sistema de gestión o simplemente una presencia que les traiga más clientes.",
            },
        ],
    },
    {
        slug: "beneficios",
        num: "02",
        accentColor: "#3b82f6",
        imageSrc: "", // TODO: reemplazar con ruta real
        imageAlt: "Beneficios de trabajar con BM Code Lab",
        tagline: "Lo que cambia cuando trabajas con nosotros",
        titulo: "Tecnología que trabaja para ti, no al revés",
        descripcion:
            "No te vendemos una web o una app. Te devolvemos tiempo, visibilidad y control sobre tu negocio. La tecnología bien aplicada no es un gasto — es la palanca que multiplica lo que ya haces bien, sin que todo dependa de ti para funcionar.",
        features: [
            {
                titulo: "Sin equipo interno que mantener",
                desc: "Accedes a un equipo de desarrollo completo sin los costos fijos de contratar in-house. Pagas por lo que necesitas, cuando lo necesitas.",
            },
            {
                titulo: "Tecnología a tu medida",
                desc: "Nada genérico. Cada solución se diseña desde cero según los procesos y objetivos de tu negocio. Lo que construimos es tuyo.",
            },
            {
                titulo: "Comunicación directa y sin burocracia",
                desc: "Hablas directamente con quienes construyen tu producto. Sin intermediarios, sin reuniones vacías, con avances reales y visibles.",
            },
            {
                titulo: "Soporte más allá del lanzamiento",
                desc: "La relación no termina cuando entregamos. Estamos contigo en el mantenimiento, las mejoras y el crecimiento de lo que construimos juntos.",
            },
        ],
    },
    {
        slug: "soluciones",
        num: "03",
        accentColor: "#00c896",
        imageSrc: "", // TODO: reemplazar con ruta real
        imageAlt: "Qué solución necesita tu negocio",
        tagline: "¿Qué necesita tu negocio hoy?",
        titulo: "Cada etapa tiene su herramienta",
        descripcion:
            "Depende de tu momento. Si estás consiguiendo tus primeros clientes, necesitas presencia y credibilidad. Si ya tienes una base sólida, quizás el siguiente paso es vender sin límite horario. Y si tu operación creció, un sistema a medida te devuelve el control. Te ayudamos a identificar cuál es la tuya.",
        features: [
            {
                titulo: "Web corporativa — para empezar bien",
                desc: "Si estás en tus primeras etapas, una web profesional es tu mejor inversión. Te posiciona, genera confianza y trabaja por ti las 24 horas para atraer nuevos clientes.",
            },
            {
                titulo: "E-commerce — para vender sin límites",
                desc: "Cuando ya tienes clientes y quieres escalar, una tienda online te permite vender en cualquier horario, a cualquier persona, sin depender de tu presencia física.",
            },
            {
                titulo: "Aplicación móvil — para fidelizar",
                desc: "Una app pone tu negocio en el bolsillo de tus clientes. Ideal cuando ya tienes una base establecida y quieres profundizar la relación con ellos.",
            },
            {
                titulo: "Sistema a medida — para optimizar",
                desc: "Cuando tu operación creció y empiezas a perder tiempo en tareas repetitivas, un sistema personalizado automatiza procesos y te devuelve el control.",
            },
        ],
    },
];

/* ── BLOQUE INDIVIDUAL ───────────────────────────────────── */
function AsesoramientoBloque({
    bloque,
    index,
}: {
    bloque: (typeof BLOQUES)[0];
    index: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    const esImpar = index % 2 === 0;

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
            id={bloque.slug}
            ref={ref}
            className={`${styles.bloque} ${visible ? styles.bloqueVisible : ""} ${esImpar ? styles.bloqueImpar : styles.bloquePar}`}
            style={{ "--accent": bloque.accentColor } as React.CSSProperties}
        >
            {/* Imagen */}
            <div className={styles.bloqueImagen}>
                <div className={styles.imagenMarco}>
                    {bloque.imageSrc ? (
                        <img
                            src={bloque.imageSrc}
                            alt={bloque.imageAlt}
                            className={styles.imagen}
                        />
                    ) : (
                        <div className={styles.imagenPlaceholder}>
                            <span className={styles.placeholderNum}>{bloque.num}</span>
                        </div>
                    )}
                    <div className={styles.imagenOverlay} />
                    <span className={styles.numDecorativo}>{bloque.num}</span>
                </div>
            </div>

            {/* Contenido */}
            <div className={styles.bloqueContenido}>
                <div className={styles.bloqueHeader}>
                    <span className={styles.tagline}>{bloque.tagline}</span>
                    <h2 className={styles.bloqueTitulo}>{bloque.titulo}</h2>
                </div>

                <p className={styles.bloqueDesc}>{bloque.descripcion}</p>

                <ul className={styles.featuresList}>
                    {bloque.features.map((f, i) => (
                        <li key={i} className={styles.featureItem}>
                            <span className={styles.featureDot} aria-hidden="true" />
                            <div>
                                <strong className={styles.featureTitulo}>{f.titulo}</strong>
                                <p className={styles.featureDesc}>{f.desc}</p>
                            </div>
                        </li>
                    ))}
                </ul>

                <Link href="/#contacto" className={styles.bloqueCta}>
                    Hablemos de tu proyecto
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Link>
            </div>
        </div>
    );
}

/* ── PÁGINA PRINCIPAL ────────────────────────────────────── */
export default function AsesoramientoPage() {
    const [activoSlug, setActivoSlug] = useState(BLOQUES[0].slug);

    useEffect(() => {
        const observers: IntersectionObserver[] = [];
        BLOQUES.forEach((b) => {
            const el = document.getElementById(b.slug);
            if (!el) return;
            const obs = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setActivoSlug(b.slug); },
                { threshold: 0.35 }
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
                <span className={styles.heroPill}>¿Por dónde empezamos?</span>
                <h1 className={styles.heroTitulo}>
                    Tecnología que tiene{" "}
                    <span className={styles.gradientText}>sentido para tu negocio</span>
                </h1>
                <p className={styles.heroSub}>
                    Antes de hablar de soluciones, hablamos de tu momento.
                    Aquí te ayudamos a entender quiénes somos, qué cambia cuando trabajas
                    con nosotros y qué herramienta necesitas según dónde estás parado hoy.
                </p>
            </header>

            {/* ── LAYOUT PRINCIPAL ── */}
            <div className={styles.layout}>

                {/* Sidebar sticky */}
                <aside className={styles.sidebar}>
                    <p className={styles.sidebarLabel}>En esta página</p>
                    <nav className={styles.sidebarNav}>
                        {BLOQUES.map((b) => {
                            const esActivo = activoSlug === b.slug;
                            return (
                                <button
                                    key={b.slug}
                                    className={`${styles.sidebarItem} ${esActivo ? styles.sidebarItemActivo : ""}`}
                                    style={{ "--accent": b.accentColor } as React.CSSProperties}
                                    onClick={() => scrollTo(b.slug)}
                                >
                                    <span className={styles.sidebarNum}>{b.num}</span>
                                    <span className={styles.sidebarTitulo}>{b.tagline}</span>
                                    {esActivo && <span className={styles.sidebarIndicador} aria-hidden="true" />}
                                </button>
                            );
                        })}
                    </nav>

                    {/* CTA en el sidebar */}
                    <div className={styles.sidebarCta}>
                        <p className={styles.sidebarCtaText}>¿Listo para dar el siguiente paso?</p>
                        <Link href="/#contacto" className={styles.sidebarCtaBtn}>
                            Contáctanos
                        </Link>
                    </div>
                </aside>

                {/* Bloques */}
                <main className={styles.contenido}>
                    {BLOQUES.map((b, i) => (
                        <AsesoramientoBloque key={b.slug} bloque={b} index={i} />
                    ))}
                </main>

            </div>
        </div>
    );
}

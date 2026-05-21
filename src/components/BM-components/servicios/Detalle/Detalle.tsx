"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./Detalle.module.css";
import SERVICIOS from "@/components/BM-components/servicios/Servicios.data";
import Link from "next/link";
import { DETALLE } from "./textos";

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

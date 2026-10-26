"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./DetalleA.module.css";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { TEMAS } from './TextoAsesoramiento'


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
                        <Image
                            src={tema.imageSrc}
                            alt={tema.imageAlt}
                            className={styles.imagen}
                            fill
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
        if (!searchParams) return;

        const tema = searchParams.get("tema");

        if (tema) {
            const el = document.getElementById(tema);
            if (el) {
                el.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
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

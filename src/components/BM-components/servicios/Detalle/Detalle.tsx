"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import styles from "./Detalle.module.css";
import SERVICIOS from "@/components/BM-components/servicios/Servicios.data";
import { DETALLE } from "./textos";
import Image from "next/image";

/* ── TARJETA DE SERVICIO RELACIONADO ── */
function ServicioRelacionado({ servicio }: { servicio: (typeof SERVICIOS)[0] }) {
    return (
        <Link
            href={`/servicios/${servicio.slug}`}
            className={styles.relCard}
            style={{ "--card-color": servicio.accentColor } as React.CSSProperties}
        >
            <div className={styles.relCardGlow} />

            <div className={styles.relImagenWrap}>
                <Image
                    src={servicio.imageSrc}
                    alt={servicio.imageAlt}
                    className={styles.relImagen}
                />
                <div className={styles.relImagenOverlay} />
                <span className={styles.relNum}>{servicio.num}</span>
                <div className={styles.relImagenAccent} />
            </div>

            <div className={styles.relFooter}>
                <h3 className={styles.relTitulo}>{servicio.tec.titulo}</h3>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={styles.relArrow} aria-hidden="true">
                    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </Link>
    );
}

/* ── PÁGINA DE DETALLE ── */
export default function DetalleServicio() {
    const params = useParams();
    const slug = params?.slug as string;

    const servicio = SERVICIOS.find((s) => s.slug === slug);
    const detalle = slug ? DETALLE[slug] : null;

    const heroRef = useRef<HTMLDivElement>(null);
    const contenidoRef = useRef<HTMLDivElement>(null);
    const relacionadosRef = useRef<HTMLDivElement>(null);

    const [heroVisible, setHeroVisible] = useState(false);
    const [contenidoVisible, setContenidoVisible] = useState(false);
    const [relacionadosVisible, setRelacionadosVisible] = useState(false);

    useEffect(() => {
        const observe = (ref: React.RefObject<HTMLDivElement | null>,
            setVisible: React.Dispatch<React.SetStateAction<boolean>>) => {
            if (!ref.current) return;

            const observer = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                }
            });

            observer.observe(ref.current);

            return observer;
        };

        const o1 = observe(heroRef, setHeroVisible);
        const o2 = observe(contenidoRef, setContenidoVisible);
        const o3 = observe(relacionadosRef, setRelacionadosVisible);

        return () => { o1?.disconnect(); o2?.disconnect(); o3?.disconnect(); };
    }, []);

    // Servicios relacionados — todos menos el actual
    const relacionados = SERVICIOS.filter((s) => s.slug !== slug);

    // Fallback si el slug no existe
    if (!servicio || !detalle) {
        return (
            <div className={styles.notFound}>
                <p>Servicio no encontrado.</p>
                <Link href="/servicios" className={styles.backLink}>← Volver a servicios</Link>
            </div>
        );
    }

    return (
        <div className={styles.pagina} style={{ "--accent": servicio.accentColor } as React.CSSProperties}>
            {/* Fondo */}
            <div className={styles.bgGrid} aria-hidden="true" />
            <div className={styles.bgOrb1} aria-hidden="true" />
            <div className={styles.bgOrb2} aria-hidden="true" />

            {/* Breadcrumb */}
            <nav className={styles.breadcrumb} aria-label="Navegación">
                <Link href="/#servicios" className={styles.breadcrumbLink}>Servicios</Link>
                <span className={styles.breadcrumbSep} aria-hidden="true">/</span>
                <span className={styles.breadcrumbActual}>{servicio.tec.titulo}</span>
            </nav>

            {/* ── HERO DEL SERVICIO ── */}
            <div
                ref={heroRef}
                className={`${styles.hero} ${heroVisible ? styles.heroVisible : ""}`}
            >
                {/* Imagen */}
                <div className={styles.heroImagen}>
                    <div className={styles.imagenMarco}>
                        <Image
                            src={servicio.imageSrc}
                            alt={servicio.imageAlt}
                            className={styles.imagen}
                        />
                        <div className={styles.imagenOverlay} />
                        <span className={styles.numDecorativo}>{servicio.num}</span>
                    </div>
                </div>

                {/* Info principal */}
                <div className={styles.heroInfo}>
                    <span className={styles.heroPill}>{detalle.tagline}</span>
                    <h1 className={styles.heroTitulo}>{servicio.tec.titulo}</h1>
                    <p className={styles.heroDesc}>{detalle.descCas}</p>

                    <Link href="/#contacto" className={styles.heroCta}>
                        Hablemos de este servicio
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                </div>
            </div>

            {/* ── FEATURES ── */}
            <div
                ref={contenidoRef}
                className={`${styles.contenido} ${contenidoVisible ? styles.contenidoVisible : ""}`}
            >
                <div className={styles.contenidoInner}>
                    <h2 className={styles.featuresTitle}>¿Qué incluye?</h2>
                    <ul className={styles.featuresList}>
                        {detalle.featuresCas.map((f, i) => (
                            <li
                                key={i}
                                className={styles.featureItem}
                                style={{ "--delay": `${i * 0.08}s` } as React.CSSProperties}
                            >
                                <span className={styles.featureDot} aria-hidden="true" />
                                {f}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* ── SERVICIOS RELACIONADOS ── */}
            <div
                ref={relacionadosRef}
                className={`${styles.relacionados} ${relacionadosVisible ? styles.relacionadosVisible : ""}`}
            >
                <div className={styles.relacionadosHeader}>
                    <h2 className={styles.relacionadosTitulo}>Otros servicios</h2>
                    <Link href="/#servicios" className={styles.relacionadosVerTodos}>
                        Ver todos
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                            <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                </div>

                <div className={styles.relacionadosGrid}>
                    {relacionados.map((s) => (
                        <ServicioRelacionado key={s.slug} servicio={s} />
                    ))}
                </div>
            </div>
        </div>
    );
}

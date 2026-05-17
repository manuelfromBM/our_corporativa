import React from "react";
import Link from 'next/link'
import styles from "./Hero.module.css";

interface FilmSlot {
    src: string;
    alt: string;
}
const SLOTS_IZQUIERDA: FilmSlot[] = [
    { src: "BM-imagenes/imghero/img1.webp", alt: "" },
    { src: "BM-imagenes/imghero/img2.webp", alt: "" },
    { src: "BM-imagenes/imghero/img3.jpg", alt: "" },
    { src: "BM-imagenes/imghero/img4.jpg", alt: "" },
    { src: "BM-imagenes/imghero/img5.jpg", alt: "" },
    { src: "BM-imagenes/imghero/img5.jpg", alt: "" },
];

const SLOTS_DERECHA: FilmSlot[] = [
    { src: "BM-imagenes/imghero/img1.webp", alt: "" },
    { src: "BM-imagenes/imghero/img2.webp", alt: "" },
    { src: "BM-imagenes/imghero/img3.jpg", alt: "" },
    { src: "BM-imagenes/imghero/img4.jpg", alt: "" },
    { src: "BM-imagenes/imghero/img5.jpg", alt: "" },
    { src: "BM-imagenes/imghero/img5.jpg", alt: "" },
];

function Perforacion() {
    return <div className={styles.perf} aria-hidden="true" />;
}

function FilmStrip({
    slots,
    direction,
}: {
    slots: FilmSlot[];
    direction: "up" | "down";
}) {
    // Duplicamos el array para que el loop sea seamless
    const doubled = [...slots, ...slots];

    return (
        <div
            className={`${styles.filmStrip} ${direction === "up" ? styles.filmUp : styles.filmDown
                }`}
            aria-hidden="true"
        >
            {/* Degradados en los bordes para que la cinta "desaparezca" */}
            <div className={styles.filmFadeTop} />
            <div className={styles.filmFadeBottom} />

            <div className={styles.filmTrack}>
                {doubled.map((slot, i) => (
                    <div key={i} className={styles.filmFrame}>
                        {/* Perforaciones laterales */}
                        <div className={styles.filmPerfs}>
                            {Array.from({ length: 4 }).map((_, j) => (
                                <Perforacion key={j} />
                            ))}
                        </div>

                        {/* Imagen */}
                        <div className={styles.filmImage}>
                            {slot.src ? (
                                <img src={slot.src} alt={slot.alt} className={styles.frameImg} />
                            ) : (
                                /* Placeholder hasta que haya imagen real */
                                <div className={styles.framePlaceholder} />
                            )}
                        </div>

                        {/* Perforaciones lado derecho */}
                        <div className={styles.filmPerfs}>
                            {Array.from({ length: 4 }).map((_, j) => (
                                <Perforacion key={j} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/* ── HERO ───────────────────────────────────────────────────── */

export default function Hero() {
    return (
        <section id="inicio" className={styles.hero}>
            <div className={styles.heroBackground}>
                <div className={`${styles.gradientOrb} ${styles.orb1}`} />
                <div className={`${styles.gradientOrb} ${styles.orb2}`} />
                <div className={`${styles.gradientOrb} ${styles.orb3}`} />
                <div className={styles.gridOverlay} />
            </div>

            {/* Cinta izquierda — sube */}
            <FilmStrip slots={SLOTS_IZQUIERDA} direction="up" />

            <div className={styles.heroContainer}>
                <div className={styles.heroContent}>
                    <div className={styles.heroBadge}>
                        <span className={styles.badgeDot} />
                        Desarrollo de software - Chile
                    </div>

                    <h1 className={styles.heroTitle}>
                        Tu negocio, funcionando
                        <span className={styles.highlight}>sin que todo dependa de ti</span>
                    </h1>

                    <p className={styles.heroSubtitle}>
                        En <strong>BM Code Lab</strong>  te devolvemos tiempo, visibilidad y control.
                        Construimos tecnología que trabaja por tu empresa las 24 horas —
                        mientras tú te enfocas en lo que realmente importa.
                    </p>

                    <div className={styles.heroButtons}>
                        <Link href="/#contacto" className={styles.btnPrimary}>
                            Nuestros trabajos
                            <svg className={styles.btnIcon} viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </Link>
                        <Link href="/#servicios" className={styles.btnSecondary}>
                            Ver Servicios
                        </Link>
                    </div>

                    <div className={styles.heroStats}>
                        <div className={styles.statItem}>
                            <div className={styles.statNumber}>SaaS</div>
                            <div className={styles.statLabel}>Proyectos</div>
                        </div>
                        <div className={styles.statDivider} />
                        <div className={styles.statItem}>
                            <div className={styles.statNumber}>100%</div>
                            <div className={styles.statLabel}>Compromiso</div>
                        </div>
                        <div className={styles.statDivider} />
                        <div className={styles.statItem}>
                            <div className={styles.statNumber}>24/7</div>
                            <div className={styles.statLabel}>Soporte</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cinta derecha — baja */}
            <FilmStrip slots={SLOTS_DERECHA} direction="down" />
        </section>
    );
}

import React from "react";
import Link from 'next/link'
import styles from "./Hero.module.css";
import HeroTerminal from "./HeroTerminal";

/* Nodos principales del flujo: cliente → automatización → proceso → resultado */
const NODOS_FLUJO = [
    { cx: 120, cy: 220 },
    { cx: 300, cy: 180 },
    { cx: 470, cy: 220 },
    { cx: 640, cy: 180 },
];

const NODOS_SECUNDARIOS = [
    { cx: 330, cy: 80 },
    { cx: 40, cy: 220 },
    { cx: 200, cy: 270 },
    { cx: 400, cy: 240 },
    { cx: 560, cy: 270 },
    { cx: 600, cy: 130 },
];

/* Red técnica decorativa: textura de fondo, no información */
function RedTecnica() {
    return (
        <svg
            className={styles.network}
            viewBox="0 0 800 300"
            preserveAspectRatio="xMinYMax meet"
            fill="none"
            aria-hidden="true"
        >
            <defs>
                <linearGradient id="heroNetGrad" x1="0" y1="0" x2="800" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="var(--bm-secondary)" />
                    <stop offset="1" stopColor="var(--bm-primary)" />
                </linearGradient>
            </defs>

            <g stroke="url(#heroNetGrad)" strokeWidth="1" strokeLinejoin="round">
                {/* Flujo principal, sube hacia la terminal */}
                <path d="M0 220 H120 L160 180 H300 L340 220 H470 L510 180 H640 L700 120 H800" />
                {/* Ramas */}
                <path d="M0 270 H200 L230 240 H400 L430 270 H560" />
                <path d="M160 180 V110 L190 80 H330" />
                <path d="M40 300 V220" />
                <path d="M510 180 L560 130 H600" />
                <path d="M340 220 V300" />
            </g>

            {/* Pulso de datos recorriendo el flujo principal */}
            <path
                className={styles.networkPulse}
                d="M0 220 H120 L160 180 H300 L340 220 H470 L510 180 H640 L700 120 H800"
                pathLength={100}
                stroke="var(--bm-primary)"
                strokeWidth="1.6"
                strokeLinecap="round"
            />

            {NODOS_SECUNDARIOS.map((n) => (
                <circle key={`${n.cx}-${n.cy}`} cx={n.cx} cy={n.cy} r="2.5" fill="url(#heroNetGrad)" />
            ))}

            {NODOS_FLUJO.map((n) => (
                <g key={`${n.cx}-${n.cy}`}>
                    <circle cx={n.cx} cy={n.cy} r="9" stroke="url(#heroNetGrad)" strokeWidth="1" opacity="0.6" />
                    <circle cx={n.cx} cy={n.cy} r="3.5" fill="url(#heroNetGrad)" />
                </g>
            ))}
        </svg>
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
                <RedTecnica />
                <div className={styles.grain} />
            </div>

            <div className={styles.heroContainer}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>
                        <span className={styles.titleLine}>Tu negocio,</span>
                        <span className={styles.titleLine}>funcionando</span>
                        <span className={`${styles.titleLine} ${styles.highlight}`}>sin que todo dependa de ti</span>
                    </h1>

                    <p className={styles.heroSubtitle}>
                        En <strong>BM Code Lab</strong>  te devolvemos tiempo, visibilidad y control.
                        Construimos tecnología que trabaja por tu empresa las 24 horas —
                        mientras tú te enfocas en lo que realmente importa.
                    </p>

                    <div className={styles.heroButtons}>
                        <Link href="/#contacto" className={styles.btnPrimary}>
                            Hablemos de tu proyecto
                            <svg className={styles.btnIcon} viewBox="0 0 20 20" fill="currentColor">
                                <path
                                    fillRule="evenodd"
                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </Link>
                        <Link href="/#servicios" className={styles.linkSecondary}>
                            Ver Servicios
                            <span className={styles.linkArrow} aria-hidden="true">→</span>
                        </Link>
                    </div>
                </div>

                <div className={styles.heroVisual}>
                    <HeroTerminal />
                </div>
            </div>
        </section>
    );
}

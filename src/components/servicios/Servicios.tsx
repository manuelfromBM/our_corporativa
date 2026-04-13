"use client";

import { useState } from "react";
import styles from "./Servicios.module.css";
import SERVICIOS, { type Servicio } from "./Servicios.data";


// ─── Subcomponente: tarjeta individual ────────────────────────────────────────
function ServiceCard({
    servicio,
    modo,
    isTransitioning,
}: {
    servicio: Servicio;
    modo: "tec" | "cas";
    isTransitioning: boolean;
}) {
    const contenido = modo === "tec" ? servicio.tec : servicio.cas;

    return (
        <div
            className={styles.card}
            style={{ "--card-color": servicio.accentColor } as React.CSSProperties}
        >
            <div className={styles.cardGlow} />

            <div className={styles.cardHeader}>
                <div className={styles.iconWrapper}>
                    <span className={styles.icon}>{servicio.icon}</span>
                </div>
                <span className={styles.cardNumber}>{servicio.num}</span>
            </div>

            <div
                className={`${styles.cardContent} ${isTransitioning ? styles.cardContentFading : ""
                    }`}
            >
                <h3 className={styles.cardTitle}>{contenido.titulo}</h3>
                <p className={styles.cardDescription}>{contenido.desc}</p>
            </div>

            <div className={styles.cardFooter}>
                <span className={styles.learnMore}>Más información →</span>
            </div>
        </div>
    );
}

// ─── Componente principal ──────────────────────────────────────────────────────
export default function ServiciosSection() {
    const [modo, setModo] = useState<"tec" | "cas">("tec");
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handleToggle = (nuevoModo: "tec" | "cas") => {
        if (nuevoModo === modo) return;
        setIsTransitioning(true);
        setTimeout(() => {
            setModo(nuevoModo);
            setIsTransitioning(false);
        }, 220);
    };

    const subtitulo =
        modo === "tec"
            ? "Stack tecnológico y especificaciones"
            : "Beneficios claros para tu negocio";

    return (
        <section className={styles.section}>
            {/* Partículas de fondo */}
            <div className={styles.particles}>
                {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className={styles.particle} />
                ))}
            </div>

            <div className={styles.container}>
                {/* Encabezado */}
                <div className={styles.headerSection}>
                    <h2 className={styles.title}>Nuestros Servicios</h2>
                    <p className={styles.subtitle}>
                        Transformamos ideas en soluciones digitales innovadoras con
                        tecnología de vanguardia
                    </p>

                    {/* Toggle */}
                    <div className={styles.toggleWrap}>
                        <div className={styles.togglePill}>
                            <button
                                className={`${styles.toggleBtn} ${modo === "cas" ? styles.toggleBtnActive : ""
                                    }`}
                                onClick={() => handleToggle("cas")}
                            >
                                Para empresas
                            </button>
                            <button
                                className={`${styles.toggleBtn} ${modo === "tec" ? styles.toggleBtnActive : ""
                                    }`}
                                onClick={() => handleToggle("tec")}
                            >
                                Para técnicos
                            </button>
                        </div>
                    </div>

                    <p
                        className={`${styles.toggleSubtitle} ${isTransitioning ? styles.toggleSubtitleFading : ""
                            }`}
                    >
                        {subtitulo}
                    </p>
                </div>

                {/* Grid de cards */}
                <div className={styles.grid}>
                    {SERVICIOS.map((s) => (
                        <ServiceCard
                            key={s.num}
                            servicio={s}
                            modo={modo}
                            isTransitioning={isTransitioning}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

"use client";

import { useState } from "react";
import styles from "./Servicios.module.css";
import SERVICIOS, { type Servicio } from "./Servicios.data";

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
        className={`${styles.cardContent} ${
          isTransitioning ? styles.cardContentFading : ""
        }`}
      >
        <h3 className={styles.cardTitle}>{contenido.titulo}</h3>
        <p className={styles.cardDescription}>{contenido.desc}</p>
      </div>

      <div className={styles.cardFooter}>
        <span className={styles.learnMore}>Mas informacion -&gt;</span>
      </div>
    </div>
  );
}

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
      ? "Stack tecnologico y enfoque tecnico"
      : "Beneficios claros para tu negocio";

  return (
    <section id="servicios" className={styles.section}>
      <div className={styles.particles}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className={styles.particle} />
        ))}
      </div>

      <div className={styles.container}>
        <div className={styles.headerSection}>
          <span className={styles.badge}>Lo que hacemos</span>
          <h2 className={styles.title}>Nuestros servicios</h2>
          <p className={styles.subtitle}>
            Transformamos ideas en soluciones digitales modernas con foco en
            rendimiento, claridad y crecimiento real.
          </p>

          <div className={styles.toggleWrap}>
            <div className={styles.togglePill}>
              <button
                className={`${styles.toggleBtn} ${
                  modo === "cas" ? styles.toggleBtnActive : ""
                }`}
                onClick={() => handleToggle("cas")}
              >
                Para empresas
              </button>
              <button
                className={`${styles.toggleBtn} ${
                  modo === "tec" ? styles.toggleBtnActive : ""
                }`}
                onClick={() => handleToggle("tec")}
              >
                Para tecnicos
              </button>
            </div>
          </div>

          <p
            className={`${styles.toggleSubtitle} ${
              isTransitioning ? styles.toggleSubtitleFading : ""
            }`}
          >
            {subtitulo}
          </p>
        </div>

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

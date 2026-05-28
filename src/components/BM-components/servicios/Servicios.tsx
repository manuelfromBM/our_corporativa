"use client";

import styles from "./Servicios.module.css";
import SERVICIOS, { type Servicio } from "./Servicios.data";
import Image from "next/image";

function ServiceCard({ servicio }: { servicio: Servicio }) {
  const href = `/servicios/${servicio.slug}`;

  return (
    <a
      href={href}
      className={styles.card}
      style={{ "--card-color": servicio.accentColor } as React.CSSProperties}
    >
      <div className={styles.cardGlow} />

      <div className={styles.imagenWrap}>
        <Image
          className={styles.imagen}
          src={servicio.imageSrc}
          alt={servicio.imageAlt}
          fill
        />
        <div className={styles.imagenOverlay} />
        <span className={styles.cardNumber}>{servicio.num}</span>
      </div>

      <div className={styles.cardFooter}>
        <h3 className={styles.cardTitle}>{servicio.tec.titulo}</h3>
        <svg
          className={styles.arrow}
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M2 7h10M8 3l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </a>
  );
}

export default function ServiciosSection() {
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
        </div>

        <div className={styles.grid}>
          {SERVICIOS.map((s) => (
            <ServiceCard key={s.num} servicio={s} />
          ))}
        </div>
      </div>
    </section>
  );
}

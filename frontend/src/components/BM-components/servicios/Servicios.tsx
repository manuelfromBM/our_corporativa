import Link from "next/link";
import Image from "next/image";
import styles from "./Servicios.module.css";
import SERVICIOS, { type Servicio } from "./Servicios.data";
import CircuitBackground from "../Circuit/CircuitBackground";

function ServiceCard({ servicio }: { servicio: Servicio }) {
  return (
    <Link href={`/servicios/${servicio.slug}`} className={styles.card}>
      <div className={styles.cardGlow} />

      <div className={styles.imagenWrap}>
        <Image
          className={styles.imagen}
          src={servicio.imageSrc}
          alt={servicio.imageAlt}
          fill
          sizes="(max-width: 768px) 80vw, (max-width: 1024px) 50vw, 25vw"
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
    </Link>
  );
}

export default function ServiciosSection() {
  return (
    <section id="servicios" className={styles.section}>
      <CircuitBackground variant="section" />

      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Lo que hacemos</span>
          <h2 className={styles.title}>
            Servicios que mantienen{" "}
            <span className={styles.highlight}>tu negocio en marcha</span>
          </h2>
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
        <p className={styles.swipeHint}>Desliza para ver más servicios →</p>
      </div>
    </section>
  );
}

"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./Asesoramiento.module.css";

const tarjetas = [
  {
    numero: "01",
    tema: "publico" as const,
    titulo: "¿Esto es para ti?",
    enganche:
      "El dueño de una clínica que quiere organizar sus turnos. El consultor que necesita proyectar más profesionalismo. El emprendimiento que ya tiene clientes pero aún gestiona todo desde el teléfono.",
    cierre: "Si te reconociste, estás en el lugar correcto.",
    cta: "Conoce a quiénes ayudamos",
    href: "/asesoria?tema=publico",
    imageSrc: "/BM-imagenes/asesoramiento/publico_objetivo.jpeg",
    imageAlt: "Persona trabajando en su negocio",
  },
  {
    numero: "02",
    tema: "beneficios" as const,
    titulo: "¿Qué cambia cuando trabajas con nosotros?",
    enganche:
      "No te vendemos una web. Te devolvemos tiempo, visibilidad y control sobre tu negocio. La tecnología bien aplicada no es un gasto.",
    cierre: "Es la palanca que multiplica lo que ya haces bien.",
    cta: "Descubre qué incluye trabajar con nosotros",
    href: "/asesoria?tema=beneficios",
    imageSrc: "/BM-imagenes/asesoramiento/asesoramiento3.png",
    imageAlt: "Gráfico de crecimiento de negocio",
  },
  {
    numero: "03",
    tema: "soluciones" as const,
    titulo: "¿Qué necesita tu negocio hoy?",
    enganche:
      "Si estás consiguiendo tus primeros clientes, necesitas presencia y credibilidad. Si ya tienes una base sólida, el siguiente paso es vender sin límite horario.",
    cierre: "Cada etapa tiene su herramienta. Te ayudamos a identificar cuál es la tuya.",
    cta: "Descubre qué necesita tu negocio",
    href: "/asesoria?tema=soluciones",
    imageSrc: "/BM-imagenes/asesoramiento/asesoramiento.jpeg",
    imageAlt: "Soluciones tecnológicas para tu negocio",
  },
];

interface TarjetaProps {
  data: (typeof tarjetas)[0];
  index: number;
}

function Tarjeta({ data, index }: TarjetaProps) {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <a
      href={data.href}
      className={`${styles.tarjeta} ${hovered ? styles.tarjetaHover : ""}`}
      style={{ "--delay": `${index * 0.12}s` } as React.CSSProperties}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Número */}
      <span className={styles.numero}>{data.numero}</span>

      {/* Imagen */}
      <div className={styles.imagenWrap}>
        {!imgError ? (
          <img
            src={data.imageSrc}
            alt={data.imageAlt}
            className={styles.imagen}
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className={styles.imagen}
            style={{
              background: "rgba(255,255,255,0.04)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(255,255,255,0.2)",
              fontSize: "2rem",
            }}
            aria-hidden="true"
          >
            {data.numero}
          </div>
        )}
        <div className={styles.imagenOverlay} aria-hidden="true" />
      </div>

      {/* Contenido */}
      <div className={styles.contenido}>
        <h3 className={styles.titulo}>{data.titulo}</h3>
        <p className={styles.enganche}>{data.enganche}</p>
        <p className={styles.cierre}>{data.cierre}</p>
      </div>

      {/* CTA */}
      <div className={styles.ctaRow}>
        <span className={styles.cta}>{data.cta}</span>
        <svg
          className={styles.ctaArrow}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M3 8h10M9 4l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Borde activo */}
      <div className={styles.borderGlow} aria-hidden="true" />
    </a>
  );
}

export default function SeccionAsesoramiento() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${visible ? styles.visible : ""}`}
      id="asesoramiento"
    >
      <div className={styles.bgGrid} aria-hidden="true" />
      <div className={styles.bgOrb1} aria-hidden="true" />
      <div className={styles.bgOrb2} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.pill}>¿Por dónde empezamos?</span>
          <h2 className={styles.seccionTitulo}>
            Tecnología que tiene{" "}
            <span className={styles.gradientText}>sentido para tu negocio</span>
          </h2>
          <p className={styles.seccionSubtitulo}>
            Antes de hablar de soluciones, hablamos de tu momento. La herramienta
            correcta depende de dónde estás parado hoy.
          </p>
        </div>

        <div className={styles.grid}>
          {tarjetas.map((t, i) => (
            <Tarjeta key={t.tema} data={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
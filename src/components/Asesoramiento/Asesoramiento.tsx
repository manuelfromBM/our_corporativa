"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./Asesoramiento.module.css";

/* ── PLACEHOLDER SVG mientras el equipo decide imagen ── */
function ImagePlaceholder({ tema }: { tema: "publico" | "beneficios" | "soluciones" }) {
  const configs = {
    publico: {
      accent: "#00c896",
      paths: (
        <>
          <circle cx="80" cy="52" r="18" stroke="#00c896" strokeWidth="1.5" fill="none" opacity="0.7" />
          <path d="M52 88c0-15.464 12.536-28 28-28s28 12.536 28 20" stroke="#00c896" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.7" />
          <circle cx="112" cy="48" r="13" stroke="#3b82f6" strokeWidth="1.2" fill="none" opacity="0.5" />
          <path d="M92 78c0-11 8.954-18 20-18" stroke="#3b82f6" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.5" />
          <circle cx="48" cy="48" r="13" stroke="#3b82f6" strokeWidth="1.2" fill="none" opacity="0.5" />
          <path d="M68 78c0-11-8.954-18-20-18" stroke="#3b82f6" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.5" />
          <circle cx="80" cy="52" r="6" fill="#00c896" opacity="0.25" />
        </>
      ),
    },
    beneficios: {
      accent: "#3b82f6",
      paths: (
        <>
          <path d="M40 90 L60 60 L75 72 L95 40 L115 55 L120 45" stroke="#3b82f6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.8" />
          <path d="M40 90 L60 60 L75 72 L95 40 L115 55 L120 45" stroke="#00c896" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.3" strokeDasharray="4 6" />
          <circle cx="60" cy="60" r="3.5" fill="#3b82f6" opacity="0.8" />
          <circle cx="75" cy="72" r="3.5" fill="#3b82f6" opacity="0.8" />
          <circle cx="95" cy="40" r="3.5" fill="#00c896" opacity="0.9" />
          <circle cx="115" cy="55" r="3.5" fill="#3b82f6" opacity="0.8" />
          <path d="M113 43 L120 45 L118 52" stroke="#00c896" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7" />
        </>
      ),
    },
    soluciones: {
      accent: "#00c896",
      paths: (
        <>
          <circle cx="80" cy="64" r="22" stroke="#00c896" strokeWidth="1.5" fill="none" opacity="0.6" />
          <circle cx="80" cy="64" r="12" stroke="#3b82f6" strokeWidth="1.2" fill="none" opacity="0.5" />
          <circle cx="80" cy="64" r="4" fill="#00c896" opacity="0.7" />
          <line x1="80" y1="36" x2="80" y2="28" stroke="#00c896" strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
          <line x1="80" y1="92" x2="80" y2="100" stroke="#00c896" strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
          <line x1="52" y1="64" x2="44" y2="64" stroke="#00c896" strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
          <line x1="108" y1="64" x2="116" y2="64" stroke="#00c896" strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
          <line x1="60" y1="44" x2="54" y2="38" stroke="#3b82f6" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
          <line x1="100" y1="44" x2="106" y2="38" stroke="#3b82f6" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
          <line x1="60" y1="84" x2="54" y2="90" stroke="#3b82f6" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
          <line x1="100" y1="84" x2="106" y2="90" stroke="#3b82f6" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
        </>
      ),
    },
  };

  const c = configs[tema];

  return (
    <svg
      viewBox="0 0 160 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.placeholderSvg}
      aria-hidden="true"
    >
      <rect width="160" height="128" rx="10" fill="rgba(255,255,255,0.03)" />
      {c.paths}
      {/* Glow central */}
      <ellipse cx="80" cy="64" rx="30" ry="20" fill={c.accent} opacity="0.06" />
    </svg>
  );
}

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
  },
];

/* ── Prop para imagen real cuando el equipo decida ──
   Si se pasa `imageSrc`, se muestra esa imagen.
   Si no, se muestra el placeholder SVG.
*/
interface TarjetaProps {
  data: (typeof tarjetas)[0];
  index: number;
  imageSrc?: string;
  imageAlt?: string;
}

function Tarjeta({ data, index, imageSrc, imageAlt }: TarjetaProps) {
  const [hovered, setHovered] = useState(false);

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

      {/* Imagen / Placeholder */}
      <div className={styles.imagenWrap}>
        {imageSrc ? (
          <img src={imageSrc} alt={imageAlt ?? data.titulo} className={styles.imagen} />
        ) : (
          <ImagePlaceholder tema={data.tema} />
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

/* ────────────────────────────────────────────────────── */

export default function SeccionAsesoramiento() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${visible ? styles.visible : ""}`}
      id="descubre"
    >
      <div className={styles.bgGrid} aria-hidden="true" />
      <div className={styles.bgOrb1} aria-hidden="true" />
      <div className={styles.bgOrb2} aria-hidden="true" />

      <div className={styles.container}>

        {/* ENCABEZADO */}
        <div className={styles.header}>
          <span className={styles.pill}>¿Por dónde empezamos?</span>
          <h2 className={styles.seccionTitulo}>
            Tecnología que tiene{" "}
            <span className={styles.gradientText}>sentido para tu negocio</span>
          </h2>
          <p className={styles.seccionSubtitulo}>
            Antes de hablar de soluciones, hablamos de tu momento.
            La herramienta correcta depende de dónde estás parado hoy.
          </p>
        </div>

        {/* GRID */}
        <div className={styles.grid}>
          {tarjetas.map((t, i) => (
            <Tarjeta key={t.tema} data={t} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}

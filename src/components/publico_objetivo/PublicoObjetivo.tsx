"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./PublicoObjetivo.module.css";

const segmentos = [
  {
    id: "pymes",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="18" width="28" height="18" rx="2" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 18V14a8 8 0 0 1 16 0v4" stroke="currentColor" strokeWidth="1.8" />
        <rect x="16" y="24" width="8" height="6" rx="1" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="20" cy="10" r="2" fill="currentColor" opacity="0.4" />
      </svg>
    ),
    titulo: "PYMEs en crecimiento",
    descripcion:
      "Empresas que necesitan tecnología a medida sin el costo de un equipo interno. Soluciones escalables que crecen con tu negocio.",
    tag: "1–50 empleados",
  },
  {
    id: "independientes",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="20" cy="13" r="7" stroke="currentColor" strokeWidth="1.8" />
        <path d="M6 34c0-7.732 6.268-14 14-14s14 6.268 14 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M26 20l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    titulo: "Profesionales independientes",
    descripcion:
      "Freelancers, consultores y especialistas que quieren digitalizar su servicio, automatizar procesos y destacar con presencia profesional online.",
    tag: "Autónomos & Freelance",
  },
  {
    id: "startups",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 6 L34 20 L20 34 L6 20 Z" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="20" cy="20" r="4" fill="currentColor" opacity="0.35" />
        <path d="M20 6v6M34 20h-6M20 34v-6M6 20h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    titulo: "Startups & emprendimientos",
    descripcion:
      "Ideas con potencial que requieren un MVP sólido, validación rápida y tecnología que no frene el lanzamiento al mercado.",
    tag: "Early-stage",
  },
  {
    id: "comercios",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 16h28M6 16l3-8h22l3 8M6 16v18h28V16" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <rect x="15" y="24" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.6" />
        <path d="M10 22v4M30 22v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    titulo: "Comercios & retail",
    descripcion:
      "Negocios locales que quieren dar el salto digital: tiendas online, sistemas de gestión, catálogos y presencia en buscadores.",
    tag: "Negocios locales",
  },
];

const beneficios = [
  {
    numero: "01",
    titulo: "Sin equipos internos",
    descripcion:
      "Accedés a un equipo de desarrollo completo sin los costos fijos de contratar in-house. Pagás por lo que necesitás.",
  },
  {
    numero: "02",
    titulo: "Tecnología a tu medida",
    descripcion:
      "Nada genérico. Cada solución se diseña desde cero según los procesos y objetivos de tu negocio.",
  },
  {
    numero: "03",
    titulo: "Escalabilidad real",
    descripcion:
      "Lo que construimos hoy está pensado para crecer mañana. Arquitectura flexible que acompaña tu expansión.",
  },
  {
    numero: "04",
    titulo: "Comunicación directa",
    descripcion:
      "Sin intermediarios ni burocracia. Hablás directamente con quienes construyen tu producto.",
  },
  {
    numero: "05",
    titulo: "Precio transparente",
    descripcion:
      "Presupuesto claro desde el inicio. Sin sorpresas, sin costos ocultos, con métricas de avance visibles.",
  },
  {
    numero: "06",
    titulo: "Soporte continuo",
    descripcion:
      "La relación no termina con el lanzamiento. Mantenimiento, mejoras y soporte técnico en el largo plazo.",
  },
];

export default function SeccionPublicoObjetivo() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeSegmento, setActiveSegmento] = useState(0);

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
    <section ref={sectionRef} className={`${styles.section} ${visible ? styles.visible : ""}`} id="publico-objetivo">
      {/* Fondo decorativo */}
      <div className={styles.bgGrid} aria-hidden="true" />
      <div className={styles.bgOrb1} aria-hidden="true" />
      <div className={styles.bgOrb2} aria-hidden="true" />

      <div className={styles.container}>

        {/* ── ENCABEZADO ── */}
        <div className={styles.header}>
          <span className={styles.pill}>¿Para quién?</span>
          <h2 className={styles.titulo}>
            Tecnología pensada para{" "}
            <span className={styles.gradientText}>quienes construyen</span>
          </h2>
          <p className={styles.subtitulo}>
            No trabajamos con todos. Nos enfocamos en negocios reales que necesitan soluciones
            concretas, sin burocracia corporativa ni presupuestos de Fortune 500.
          </p>
        </div>

        {/* ── SEGMENTOS ── */}
        <div className={styles.segmentosGrid}>
          {segmentos.map((seg, i) => (
            <button
              key={seg.id}
              className={`${styles.segmentoCard} ${activeSegmento === i ? styles.segmentoActive : ""}`}
              onClick={() => setActiveSegmento(i)}
              style={{ "--delay": `${i * 0.1}s` } as React.CSSProperties}
            >
              <div className={styles.segmentoIcono}>{seg.icon}</div>
              <div className={styles.segmentoContenido}>
                <span className={styles.segmentoTag}>{seg.tag}</span>
                <h3 className={styles.segmentoTitulo}>{seg.titulo}</h3>
                <p className={styles.segmentoDescripcion}>{seg.descripcion}</p>
              </div>
              <div className={styles.segmentoGlow} aria-hidden="true" />
            </button>
          ))}
        </div>

        {/* ── DIVISOR ── */}
        <div className={styles.divisor}>
          <span className={styles.divisorLinea} />
          <span className={styles.divisorText}>Por qué elegirnos</span>
          <span className={styles.divisorLinea} />
        </div>

        {/* ── BENEFICIOS ── */}
        <div className={styles.beneficiosHeader}>
          <h2 className={styles.titulo}>
            Ventajas que{" "}
            <span className={styles.gradientText}>importan de verdad</span>
          </h2>
          <p className={styles.subtitulo}>
            Los motivos concretos por los que los negocios en crecimiento nos eligen
            para construir su tecnología.
          </p>
        </div>

        <div className={styles.beneficiosGrid}>
          {beneficios.map((b, i) => (
            <div
              key={b.numero}
              className={styles.beneficioCard}
              style={{ "--delay": `${i * 0.08}s` } as React.CSSProperties}
            >
              <span className={styles.beneficioNumero}>{b.numero}</span>
              <div className={styles.beneficioContenido}>
                <h4 className={styles.beneficioTitulo}>{b.titulo}</h4>
                <p className={styles.beneficioDescripcion}>{b.descripcion}</p>
              </div>
              <div className={styles.beneficioAccent} aria-hidden="true" />
            </div>
          ))}
        </div>

        {/* ── CTA FINAL ── */}
        <div className={styles.ctaWrap}>
          <p className={styles.ctaText}>¿Tu negocio encaja en alguno de estos perfiles?</p>
          <a href="#contacto" className={styles.ctaBtn}>
            Hablemos de tu proyecto
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}

"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./NuestroProceso.module.css";

const pasos = [
  {
    numero: "01",
    icono: (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="1.6" />
        <path d="M16 10v6l4 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 6L6 4M24 6l2-4M16 6V4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.45" />
      </svg>
    ),
    titulo: "Diagnóstico",
    bajada: "Antes de escribir código, entendemos el problema real.",
    descripcion:
      "Analizamos tus objetivos de negocio para que cada decisión técnica tenga un propósito. La tecnología trabaja para ti, no al revés.",
  },
  {
    numero: "02",
    icono: (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="8" width="24" height="16" rx="3" stroke="currentColor" strokeWidth="1.6" />
        <path d="M10 16l3 3 5-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 13h4M20 16h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
    titulo: "Arquitectura",
    bajada: "Simple para el usuario, potente para el negocio.",
    descripcion:
      "Diseñamos una estructura sólida y limpia, descompuesta en piezas manejables. Sin complejidad innecesaria que frene el crecimiento.",
  },
  {
    numero: "03",
    icono: (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 4l3 6h6l-5 4 2 6-6-4-6 4 2-6-5-4h6z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <circle cx="16" cy="16" r="3" fill="currentColor" opacity="0.3" />
      </svg>
    ),
    titulo: "Prevención",
    bajada: "Pensamos en lo que nadie quiere pensar.",
    descripcion:
      "Anticipamos fallos, gestionamos picos de tráfico y protegemos tus datos. Tu tranquilidad depende de nuestra capacidad de prever el 'qué pasaría si'.",
  },
  {
    numero: "04",
    icono: (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 26l5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <rect x="9" y="9" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M13 16h6M16 13v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="25" cy="7" r="3" stroke="currentColor" strokeWidth="1.4" opacity="0.55" />
      </svg>
    ),
    titulo: "Iteraciones",
    bajada: "Versiones funcionales desde las primeras semanas.",
    descripcion:
      "No trabajamos a ciegas. Podés ver y probar el avance desde etapas tempranas, lo que nos permite ajustar el rumbo antes de que sea tarde.",
  },
  {
    numero: "05",
    icono: (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 28V18M10 22l6-10 6 10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M8 10c0-4.418 3.582-6 8-6s8 1.582 8 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
        <circle cx="16" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
    titulo: "Despegue",
    bajada: "Optimizado, probado y listo para escalar.",
    descripcion:
      "Entregamos un sistema de alto rendimiento, fácil de mantener y diseñado para durar. El lanzamiento es solo el comienzo.",
  },
];

export default function SeccionNuestroProceso() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activo, setActivo] = useState<number | null>(null);

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
      id="proceso"
    >
      <div className={styles.bgGrid} aria-hidden="true" />
      <div className={styles.bgOrb} aria-hidden="true" />

      <div className={styles.container}>

        {/* ENCABEZADO */}
        <div className={styles.header}>
          <span className={styles.pill}>Nuestro proceso</span>
          <h2 className={styles.titulo}>
            Del problema{" "}
            <span className={styles.gradientText}>a la solución</span>
          </h2>
          <p className={styles.subtitulo}>
            Cinco pasos que convierten una idea o un dolor de negocio
            en tecnología que funciona, escala y dura.
          </p>
        </div>

        {/* LÍNEA DE PASOS */}
        <div className={styles.timeline}>
          {pasos.map((paso, i) => (
            <div
              key={paso.numero}
              className={`${styles.paso} ${activo === i ? styles.pasoActivo : ""}`}
              style={{ "--delay": `${i * 0.1}s` } as React.CSSProperties}
              onMouseEnter={() => setActivo(i)}
              onMouseLeave={() => setActivo(null)}
            >
              {/* Conector */}
              {i < pasos.length - 1 && (
                <div className={styles.conector}>
                  <div
                    className={`${styles.conectorLinea} ${activo === i ? styles.conectorActivo : ""}`}
                  />
                </div>
              )}

              {/* Número + Icono */}
              <div className={styles.pasoHead}>
                <div className={styles.pasoIconWrap}>
                  <span className={styles.pasoNumero}>{paso.numero}</span>
                  <div className={styles.pasoIcono}>{paso.icono}</div>
                </div>
              </div>

              {/* Contenido */}
              <div className={styles.pasoBody}>
                <p className={styles.pasoBajada}>{paso.bajada}</p>
                <h3 className={styles.pasoTitulo}>{paso.titulo}</h3>
                <p className={styles.pasoDescripcion}>{paso.descripcion}</p>
              </div>

              {/* Glow de fondo */}
              <div className={styles.pasoGlow} aria-hidden="true" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

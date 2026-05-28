"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./PromocionK.module.css";

const PILARES = [
  {
    icono: (
      <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="5" width="22" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 3v4M19 3v4M3 11h22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="8" y="15" width="4" height="4" rx="1" fill="currentColor" opacity="0.5" />
        <rect x="16" y="15" width="4" height="4" rx="1" fill="currentColor" opacity="0.3" />
      </svg>
    ),
    titulo: "Gestión de citas",
    desc: "Agenda, disponibilidad y recordatorios automáticos. Tu operación diaria, sin fricción.",
  },
  {
    icono: (
      <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="14" cy="10" r="5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 24c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M19 6l2-2M21 8h2M19 10l2 2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
    titulo: "Tu perfil profesional",
    desc: "Muestra tu trabajo, tu estilo y tu historia. Un espacio tuyo que construye confianza.",
  },
  {
    icono: (
      <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 6h20M4 14h14M4 22h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="22" cy="20" r="4" stroke="currentColor" strokeWidth="1.4" />
        <path d="M20.5 20l1 1 2-2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    titulo: "Contenido y marketing",
    desc: "Publica, comparte y llega a nuevos clientes desde la misma plataforma donde los gestionas.",
  },
  {
    icono: (
      <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 4C8.477 4 4 8.477 4 14s4.477 10 10 10 10-4.477 10-10S19.523 4 14 4z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 4c-2.5 2.5-4 5.8-4 10s1.5 7.5 4 10M14 4c2.5 2.5 4 5.8 4 10s-1.5 7.5-4 10M4 14h20" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
    titulo: "Red de servicios",
    desc: "Descubrí prestadores, seguí su contenido y reservá. Todo en un solo lugar.",
  },
];

/* ── Anillos orbitales animados alrededor del logo ── */
function LogoOrbital() {
  return (
    <div className={styles.logoWrap} aria-hidden="true">
      {/* Anillos */}
      <div className={`${styles.anillo} ${styles.anillo1}`} />
      <div className={`${styles.anillo} ${styles.anillo2}`} />
      <div className={`${styles.anillo} ${styles.anillo3}`} />

      {/* Partículas orbitando */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className={styles.particula}
          style={{ "--i": i } as React.CSSProperties}
        />
      ))}

      {/* Glow central */}
      <div className={styles.logoGlow} />

      {/* Logo */}
      <div className={styles.logoContenedor}>
        <Image
          src="/KronaLogo.jpg"
          alt="Krona"
          width={100}
          height={100}
          className={styles.logoImg}
          priority
        />
      </div>
    </div>
  );
}

export default function AppPromo() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="krona"
      ref={sectionRef}
      className={`${styles.container} ${visible ? styles.visible : ""}`}
    >
      {/* Fondo */}
      <div className={styles.bgGrid} aria-hidden="true" />
      <div className={styles.bgOrb1} aria-hidden="true" />
      <div className={styles.bgOrb2} aria-hidden="true" />
      <div className={styles.bgOrb3} aria-hidden="true" />

      <div className={styles.content}>

        {/* ── HERO DEL PRODUCTO ── */}
        <div className={styles.heroProducto}>
          <LogoOrbital />

          <div className={styles.heroTexto}>
            <span className={styles.badge}>
              <span className={styles.badgeDot} />
              Producto propio · En desarrollo
            </span>

            <h2 className={styles.title}>
              Conoce{" "}
              <span className={styles.titleAccent}>Krona</span>
            </h2>

            <p className={styles.tagline}>
              Gestiona tu negocio. Muestra tu trabajo.<br />
              Conecta con tus clientes.
            </p>

            <p className={styles.subtitle}>
              Krona es la plataforma que centraliza todo lo que necesita un prestador de servicios:
              agenda inteligente, perfil profesional propio y herramientas de marketing — en un solo lugar,
              sin malabarismos entre apps.
            </p>
          </div>
        </div>

        {/* ── PILARES ── */}
        <div className={styles.pilaresGrid}>
          {PILARES.map((p, i) => (
            <div
              key={i}
              className={styles.pilar}
              style={{ "--delay": `${i * 0.1}s` } as React.CSSProperties}
            >
              <div className={styles.pilarIcono}>{p.icono}</div>
              <h3 className={styles.pilarTitulo}>{p.titulo}</h3>
              <p className={styles.pilarDesc}>{p.desc}</p>
              <div className={styles.pilarGlow} aria-hidden="true" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

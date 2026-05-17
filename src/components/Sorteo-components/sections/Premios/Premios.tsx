"use client";

import styles from "./Premios.module.css";

import { FaCrown, FaMedal, FaStar } from "react-icons/fa";
import { GiRibbonMedal } from "react-icons/gi";

// ── Definición de los premios ──
const premios = [
  {
    lugar: "Segundo Premio",
    icono: <FaMedal style={{ color: '#c0c0c0'}} />,
    titulo: "Landing Premium",
    descripcion:
      "Una página de aterrizaje de alta conversión, optimizada para captar clientes y mostrar tu negocio.",
    beneficios: [
      "Diseño personalizado",
      "3 meses de hosting",
      "Dominio .com incluido",
      "100% responsive",
      "Soporte 30 días",
    ],
    destacado: false,
  },
  {
    lugar: "Gran Premio",
    icono: <FaCrown style={{ color: '#ffd700'}}/>,
    titulo: "Sitio Web Completo",
    descripcion:
      "Tu sitio web profesional completo, con múltiples secciones, galería y formularios de contacto.",
    beneficios: [
      "Diseño 100% personalizado",
      "6 meses de hosting",
      "Dominio .com incluido",
      "Totalmente responsive",
      "SEO básico optimizado",
      "Soporte 60 días",
    ],

    destacado: true,
    etiqueta: (
      <>
        <FaStar style={{ marginRight: "6px", 
          color: '#ffd700',
          filter: "drop-shadow(0 0 6px rgba(225, 215, 0, 0.5))",
          }} />
        Primer Premio
      </>
    ),
  },
  {
    lugar: "Tercer Premio",
    icono: <GiRibbonMedal style={{ color: '#cd7f32'}}/>,
    titulo: "Carta Digital",
    descripcion:
      "Una carta o menú digital elegante, perfecta para negocios gastronómicos o de servicios.",
    beneficios: [
      "Diseño personalizado",
      "1 mes de hosting",
      "Dominio incluido",
      "Responsive",
      "Soporte 15 días",
    ],
    destacado: false,
  },
];

const Premios = () => {
  return (
    <section className={styles.seccion} id="premios">

      {/* ── Encabezado de la sección ── */}
      <div className={styles.encabezado}>

        <div className={styles.etiquetaContainer}>
          <span className={styles.linea}></span>

          <span className={styles.etiqueta}>Premios</span>

          <span className={styles.linea}></span>
        </div>
        

        <h2 className={styles.titulo}>
          Lo que puedes ganar
        </h2>

        <div className={styles.divisor} />

        <p className={styles.subtitulo}>
          Tres ganadores recibirán una página web profesional
          diseñada a medida, ideal para destacar su negocio y comenzar a crecer
          en el mundo digital.
          <br />
          ¡Participa y haz que tu emprendimiento brille con una presencia online de primera!
        </p>
      </div>

      {/* ── Grilla de cards ── */}
      <div className={styles.grilla}>
        {premios.map((premio) => (
          <div
            key={premio.titulo}
            className={`${styles.card} ${
              premio.destacado ? styles.destacada : ""
            }`}
          >

            {/* Etiqueta de primer premio */}
            {premio.etiqueta && (
              <span className={styles.badgePremio}>
                {premio.etiqueta}
              </span>
            )}

            {/* Ícono */}
            <span
              className={`${styles.icono} ${
                premio.destacado ? styles.iconoDestacado : ""
              }`}
            >
              {premio.icono}
            </span>

            {/* Lugar */}
            <p className={styles.lugar}>{premio.lugar}</p>

            {/* Título */}
            <h3 className={styles.cardTitulo}>{premio.titulo}</h3>

            {/* Descripción */}
            <p className={styles.descripcion}>
              {premio.descripcion}
            </p>

            {/* Beneficios */}
            <ul className={styles.beneficios}>
              {premio.beneficios.map((b) => (
                <li key={b} className={styles.beneficio}>
                  <span className={styles.punto} />
                  {b}
                </li>
              ))}
            </ul>

          </div>
        ))}
      </div>

    </section>
  );
};

export default Premios;
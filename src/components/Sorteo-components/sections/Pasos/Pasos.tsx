"use client";

import { FaInstagram, FaShareAlt, FaUsers, FaLightbulb } from "react-icons/fa";
import styles from "./Pasos.module.css";

// ── Datos de cada paso ──
const pasos = [
  {
    numero: "01",
    icono: (
      <FaInstagram style={{ color: '#22d3ee'}} />
    ),
    titulo: "Seguir la cuenta",
    descripcion:
      "Seguí nuestra cuenta de Instagram para estar al tanto del sorteo y el anuncio de los ganadores.",
  },
  {
    numero: "02",
    icono: (
      <FaShareAlt style={{ color: "#22d3ee" }} />
    ),
    titulo: "Compartir en historias",
    descripcion:
      "Compartí la publicación del sorteo en tus historias de Instagram para que más personas se enteren.",
  },
  {
    numero: "03",
    icono: (
      <FaUsers style={{ color: "#22d3ee" }} />
    ),
    titulo: "Etiquetar amigos",
    descripcion:
      "Etiquetá a 2 amigos en los comentarios de la publicación. Cada etiqueta suma más chances de ganar.",
  },
];

const Pasos = () => {
  return (
    <section className={styles.seccion} id="pasos">

      {/* ── Resplandor de fondo centrado ── */}
      <div className={styles.resplandor} />

      <div className={styles.contenedor}>

        {/* ── Encabezado de la sección ── */}
        <div className={styles.encabezado}>

          <div className={styles.etiquetaContainer}>
            <span className={styles.linea}></span>

            <span className={styles.etiqueta}>Cómo participar</span>

            <span className={styles.linea}></span>
          </div>

          <h2 className={styles.titulo}>3 pasos simples</h2>
          
          <div className={styles.divisor} />

         <p className={styles.subtitulo}>
            Participar es totalmente gratis y solo te tomará unos minutos.
            <br />
            Sigue los pasos y podrías ser uno de los ganadores para llevar
            tu emprendimiento al siguiente nivel con una página web profesional
            diseñada a medida.
            <br />
            ¡No pierdas esta oportunidad de hacer crecer tu negocio en el mundo digital!
          </p>

        </div>

        {/* ── Grilla de pasos ── */}
        <div className={styles.grilla}>
          {pasos.map((paso, index) => (
            <div
              key={paso.numero}
              className={styles.card}
              style={{ animationDelay: `${index * 0.12}s` }}
            >
              {/* Número grande de fondo decorativo */}
              <span className={styles.numeroDecorativo}>{paso.numero}</span>

              {/* Ícono en caja con borde */}
              <div className={styles.iconoBox}>
                <span className={styles.icono}>{paso.icono}</span>
              </div>

              {/* Título del paso */}
              <h3 className={styles.cardTitulo}>{paso.titulo}</h3>

              {/* Descripción */}
              <p className={styles.descripcion}>{paso.descripcion}</p>
            </div>
          ))}
        </div>

        {/* ── Nota importante al pie ── */}
        <div className={styles.nota}>

          <span className={styles.notaIcono}>
            <FaLightbulb />
          </span>

          <p className={styles.notaTexto}>
            <strong>Tip importante:</strong> Mientras más comentarios,
            etiquetas y participaciones realices, más oportunidades tendrás
            de ganar.
            <br />
            ¡Invita a tus amigos y aumenta tus posibilidades de llevarte uno
            de los premios!
          </p>

        </div>

      </div>
    </section>
  );
};

export default Pasos;
"use client";

import styles from "./Reglas.module.css";

// ── Listado de reglas del sorteo ──
const reglas = [
  {
    numero: "01",
    texto:
      "La participación es completamente gratuita. No se solicitan pagos, suscripciones ni datos bancarios bajo ningún concepto.",
    destacada: "completamente gratuita",
  },
  {
    numero: "02",
    texto:
      "El sorteo solo es válido si se cumplen los 3 siguientes pasos al participar: seguir la cuenta, compartir en historias y etiquetar amigos.",
    destacada: "3 pasos de participación",
  },
  {
    numero: "03",
    texto:
      "Los ganadores serán anunciados públicamente en nuestra cuenta de Instagram una vez finalizado el sorteo.",
    destacada: "anunciados públicamente",
  },
  {
    numero: "04",
    texto:
      "El premio incluye el diseño y desarrollo de la página web, dominio y el hosting por el período indicado en cada premio.",
    destacada: "diseño y desarrollo",
  },
  {
    numero: "05",
    texto:
      "Los ganadores tendrán 7 días corridos para comunicarse y proporcionar la información necesaria para desarrollar su sitio.",
    destacada: "7 días corridos",
  },
  {
    numero: "06",
    texto:
      "El organizador se reserva el derecho de descalificar participaciones que incumplan las condiciones o sean fraudulentas.",
    destacada: "descalificar",
  },
];

// ── Función que resalta la palabra clave dentro del texto ──
const TextoConDestacado = ({
  texto,
  destacada,
}: {
  texto: string;
  destacada: string;
}) => {
  // Divide el texto en la palabra clave para resaltarla
  const partes = texto.split(destacada);
  return (
    <>
      {partes[0]}
      <strong className={styles.destacado}>{destacada}</strong>
      {partes[1]}
    </>
  );
};

const Reglas = () => {
  return (
    <section className={styles.seccion} id="reglas">
      <div className={styles.contenedor}>

        {/* ── Encabezado centrado ── */}
        <div className={styles.encabezado}>
          
          <div className={styles.etiquetaContainer}>
            <span className={styles.linea}></span>

            <span className={styles.etiqueta}>Transparencia</span>

            <span className={styles.linea}></span>
          </div>

          <h2 className={styles.titulo}>Reglas del sorteo</h2>
          <div className={styles.divisor} />

          <p className={styles.subtitulo}>
            Todo claro desde el principio. Sin letra chica.
          </p>
        </div>

        {/* ── Grilla de reglas ── */}
        <div className={styles.grilla}>
          {reglas.map((regla, index) => (
            <div
              key={regla.numero}
              className={styles.card}
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              {/* Número de la regla */}
              <div className={styles.numero}>{regla.numero}</div>

              {/* Texto con palabra clave resaltada */}
              <p className={styles.texto}>
                <TextoConDestacado
                  texto={regla.texto}
                  destacada={regla.destacada}
                />
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Reglas;
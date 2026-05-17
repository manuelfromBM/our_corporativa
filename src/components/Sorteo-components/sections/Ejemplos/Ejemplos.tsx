"use client";

import styles from "./Ejemplos.module.css";

// ── Datos de cada ejemplo de página ──
const ejemplos = [
  {
    tipo: "Estética & Salud",
    nombre: "Barbería Clásica",
    tema: "barb",
  },
  {
    tipo: "Gastronomía",
    nombre: "Restaurante & Café",
    tema: "rest",
  },
  {
    tipo: "Tecnología",
    nombre: "Startup & SaaS",
    tema: "tech",
  },
  {
    tipo: "Comercio",
    nombre: "Tienda Online",
    tema: "shop",
  },
];

// ── Componente de mockup interno de cada card ──
// Simula visualmente cómo se vería un sitio web en miniatura
const MockupPantalla = ({ tema }: { tema: string }) => (
  <div className={styles.mockup}>

    {/* Barra superior del navegador con los 3 puntos */}
    <div className={`${styles.mockBarra} ${styles[`mockBarra_${tema}`]}`}>
      <span className={`${styles.mockPunto} ${styles[`punto1_${tema}`]}`} />
      <span className={`${styles.mockPunto} ${styles[`punto2_${tema}`]}`} />
      <span className={`${styles.mockPunto} ${styles[`punto3_${tema}`]}`} />
    </div>

    {/* Contenido simulado del sitio */}
    <div className={styles.mockContenido}>

      {/* Hero del sitio simulado */}
      <div className={`${styles.mockHero} ${styles[`mockHero_${tema}`]}`} />

      {/* Líneas de texto simuladas */}
      <div className={styles.mockLinea} style={{ width: "70%" }} />
      <div className={`${styles.mockLinea} ${styles.mockLineaCorta}`} />

      {/* Mini cards simuladas */}
      <div className={styles.mockCards}>
        <div className={`${styles.mockMini} ${styles[`mockMini1_${tema}`]}`} />
        <div className={styles.mockMini} />
        <div className={styles.mockMini} />
        <div className={`${styles.mockMini} ${styles[`mockMini2_${tema}`]}`} />
      </div>

      {/* Línea final de texto */}
      <div className={styles.mockLinea} style={{ width: "80%", marginTop: "4px" }} />
    </div>
  </div>
);

const Ejemplos = () => {
  return (
    <section className={styles.seccion} id="ejemplos">
      <div className={styles.contenedor}>

        {/* ── Encabezado centrado ── */}
        <div className={styles.encabezado}>

          <div className={styles.etiquetaContainer}>

            <span className={styles.linea}></span>

            <span className={styles.etiqueta}>Ejemplos</span>

            <span className={styles.linea}></span>

          </div>
          

          <h2 className={styles.titulo}>Páginas que diseñamos</h2>

          <div className={styles.divisor} />

          <p className={styles.subtitulo}>
            Sitios profesionales para todo tipo de negocio,
            hechos con atención al detalle.
          </p>
        </div>

        {/* ── Grilla de cards ── */}
        <div className={styles.grilla}>
          {ejemplos.map((ej, index) => (
            <div
              key={ej.nombre}
              className={styles.card}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Mockup visual del sitio */}
              <MockupPantalla tema={ej.tema} />

              {/* Capa de degradado + texto sobre el mockup */}
              <div className={styles.overlay}>
                <p className={`${styles.overlayTipo} ${styles[`tipo_${ej.tema}`]}`}>
                  ✦ {ej.tipo}
                </p>
                <h3 className={styles.overlayNombre}>{ej.nombre}</h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Ejemplos;
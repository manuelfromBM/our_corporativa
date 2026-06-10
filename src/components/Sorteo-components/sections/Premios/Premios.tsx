"use client";

import Image from "next/image";
import styles from "./Premios.module.css";

const premios = [
  {
    imagen: "/Sorteo-imagenes/paginaweb.png",
    etiqueta: "Diseño",
    titulo: "Tu Sitio Web",
    tagline: "Hecho a medida para tu negocio",
    descripcion:
      "Tu página web corporativa diseñada desde cero, pensada para tu rubro, tu estilo y lo que quieres comunicar.",
    beneficios: [
      "Diseño 100% personalizado",
      "Se ve bien en celular, tablet y computador",
      "Secciones para mostrar tu negocio",
      "Formulario de contacto incluido",
      "Tu página web corporativa completa",
    ],
  },
  {
    imagen: "/Sorteo-imagenes/hosting.jpg",
    etiqueta: "Publicación",
    titulo: "Lista para publicar",
    tagline: "En internet desde el primer día",
    descripcion:
      "Nos encargamos de que tu web esté visible con tu propio nombre de dominio, sin que tengas que preocuparte por nada técnico.",
    beneficios: [
      "Dominio .com incluido (primer año)",
      "Publicación y puesta en marcha incluida",
      "Tu negocio en internet con URL propia",
      "Sin costos ocultos al inicio",
      "Renovación anual del dominio a cargo del ganador",
    ],
  },
  {
    imagen: "/Sorteo-imagenes/asesoramiento.webp",
    etiqueta: "Acompañamiento",
    titulo: "Te acompañamos",
    tagline: "De principio a fin, sin dejarte solo",
    descripcion:
      "Trabajamos contigo en cada etapa: te escuchamos, ajustamos y entregamos un resultado que realmente te represente.",
    beneficios: [
      "Reunión inicial para conocer tu negocio",
      "Revisiones y ajustes durante el proceso",
      "Asesoría en diseño, imágenes y contenido",
      "Entrega formal con reunión de cierre",
      "Soporte post-entrega para dudas o arreglos",
    ],
  },
];

const Premios = () => {
  return (
    <section className={styles.seccion} id="premios">

      <div className={styles.encabezado}>
        <div className={styles.etiquetaContainer}>
          <span className={styles.linea} />
          <span className={styles.etiqueta}>Premios</span>
          <span className={styles.linea} />
        </div>

        <h2 className={styles.titulo}>Lo que puedes ganar</h2>

        <div className={styles.divisor} />

        <p className={styles.subtitulo}>
          Tres emprendedores ganarán una <strong>página web corporativa completa</strong>:
          diseño personalizado, publicación en internet y acompañamiento de principio a fin.
          <br />
          Todo lo que necesitas para que tu negocio tenga presencia digital profesional desde el día uno.
        </p>
      </div>

      <div className={styles.grilla}>
        {premios.map((premio) => (
          <div key={premio.titulo} className={styles.card}>

            {/* Imagen */}
            <div className={styles.imagenWrap}>
              <Image
                src={premio.imagen}
                alt={premio.titulo}
                className={styles.imagen}
                fill
              />
              <span className={styles.etiquetaImagen}>{premio.etiqueta}</span>
            </div>

            <div className={styles.cardContenido}>
              <h3 className={styles.cardTitulo}>{premio.titulo}</h3>
              <p className={styles.tagline}>{premio.tagline}</p>
              <p className={styles.descripcion}>{premio.descripcion}</p>

              <div className={styles.separador} />

              <ul className={styles.beneficios}>
                {premio.beneficios.map((b) => (
                  <li key={b} className={styles.beneficio}>
                    <span className={styles.punto} />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        ))}
      </div>

      <p className={styles.hint}>
        Cada premio incluye los tres componentes — diseño, publicación y acompañamiento.
      </p>

    </section>
  );
};

export default Premios;

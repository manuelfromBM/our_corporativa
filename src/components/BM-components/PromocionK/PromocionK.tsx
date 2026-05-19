import Image from "next/image";
import Link from "next/link";
import styles from "./PromocionK.module.css";

const teamImages = [
  {
    src: "/BM-imagenes/img_krona_1.jpg",
    alt: "Equipo de desarrollo",
    label: "Nuestro trabajo",
  },
  {
    src: "/KronaLogo.jpg",
    alt: "Innovacion tecnologica",
    label: "Innovacion",
  },
  {
    src: "/BM-imagenes/fotogrupal.png",
    alt: "Experiencia de usuario",
    label: "Nuestro equipo",
  },
];

export default function AppPromo() {
  return (
    <section id="krona" className={styles.container}>
      <div className={styles.content}>
        <span className={styles.badge}>Producto propio</span>

        <h2 className={styles.title}>
          Conoce
          <span className={styles.titleAccent}> Krona</span>
        </h2>

        <p className={styles.subtitle}>
          Nuestra app para reservas, gestion y atencion digital. Estamos
          construyendo una experiencia pensada para negocios que necesitan
          orden, velocidad y una presencia moderna.
        </p>

        <div className={styles.imagesGrid}>
          {teamImages.map((image, index) => (
            <div
              key={image.src}
              className={styles.imageWrapper}
              style={{ animationDelay: `${0.35 + index * 0.15}s` }}
            >
              <div className={styles.imageGlow}></div>
              <Image
                src={image.src}
                alt={image.alt}
                width={280}
                height={280}
                className={styles.image}
                priority={index === 0}
              />
              <div className={styles.imageOverlay}>
                <span className={styles.imageLabel}>{image.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

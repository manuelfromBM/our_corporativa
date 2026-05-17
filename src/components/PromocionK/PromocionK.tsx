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

        <div className={styles.ctaSection}>
          <p className={styles.ctaText}>Quieres ver lo que estamos creando?</p>
          <Link href="/krona" className={styles.notifyButton}>
            <span>Ir a Krona</span>
            <svg
              className={styles.buttonIcon}
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M7.5 15L12.5 10L7.5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

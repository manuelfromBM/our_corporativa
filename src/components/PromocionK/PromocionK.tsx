import React from "react";
import Image from "next/image";
import styles from "./PromocionK.module.css";

const AppPromo: React.FC = () => {
  const teamImages = [
    {
      src: "/EquipoKronaAnime.jpg",
      alt: "Equipo de desarrollo",
      label: "Nuestro Equipo"
    },
    {
      src: "/KronaLogo.jpg",
      alt: "Innovación tecnológica",
      label: "Innovación"
    },
    {
      src: "/Work.jpg",
      alt: "Experiencia de usuario",
      label: "Experiencia"
    }
  ];

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <span className={styles.badge}>Muy Pronto</span>
        
        <h2 className={styles.title}>
          Próximamente
          <span className={styles.titleAccent}> Nuestra App</span>
        </h2>
        
        <p className={styles.subtitle}>
          Una nueva experiencia está en camino. Estamos construyendo algo increíble 
          que transformará la forma en que interactúas con la tecnología.
        </p>

        <div className={styles.imagesGrid}>
          {teamImages.map((image, index) => (
            <div 
              key={index} 
              className={styles.imageWrapper}
              style={{ animationDelay: `${0.4 + index * 0.2}s` }}
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
          <p className={styles.ctaText}>¿Quieres ser el primero en probarlo?</p>
          <button className={styles.notifyButton}>
            <span>Go to the App</span>
            <svg 
              className={styles.buttonIcon} 
              width="20" 
              height="20" 
              viewBox="0 0 20 20" 
              fill="none"
            >
              <path 
                d="M7.5 15L12.5 10L7.5 5" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default AppPromo;
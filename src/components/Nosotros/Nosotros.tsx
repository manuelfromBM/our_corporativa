import Image from "next/image";
import styles from "./Nosotros.module.css";

export default function NosotrosSection() {
  return (
    <section id="nosotros" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.textBox}>
          <span className={styles.badge}>Quiénes Somos</span>
          <h2 className={styles.title}>
            Transformando Ideas en 
            <span className={styles.highlight}> Realidad Digital</span>
          </h2>
          <p className={styles.description}>
            Somos un equipo apasionado por la tecnología, enfocados en crear 
            soluciones innovadoras que aporten valor real. Combinamos creatividad, 
            experiencia técnica y compromiso para llevar tu visión al siguiente nivel.
          </p>
          <p className={styles.description}>
            Nuestro objetivo es transformar ideas en productos funcionales, 
            escalables y modernos que impulsen el crecimiento de tu negocio.
          </p>
          
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>50+</span>
              <span className={styles.statLabel}>Proyectos</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>30+</span>
              <span className={styles.statLabel}>Clientes</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>5+</span>
              <span className={styles.statLabel}>Años</span>
            </div>
          </div>
        </div>

        <div className={styles.images}>
          <div className={styles.imageWrapper}>
            <div className={styles.imageGlow}></div>
            <Image
              src="/BMBlanco.jpeg"
              alt="Equipo de desarrollo trabajando"
              fill
              className={styles.image}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className={styles.imageOverlay}>
              <span className={styles.imageLabel}>Innovación</span>
            </div>
          </div>

          <div className={styles.imageWrapper}>
            <div className={styles.imageGlow}></div>
            <Image
              src="/BMAnimeDuoc.jpg"
              alt="Trabajo colaborativo en equipo"
              fill
              className={styles.image}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className={styles.imageOverlay}>
              <span className={styles.imageLabel}>Colaboración</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
import Image from "next/image"
import styles from "./Hero.module.css"

export default function SectionHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContainer}>

        <div className={styles.heroContent}>
          <h1>Gestiona tu negocio de servicios en un solo lugar.</h1>
          <p>
            Agenda, pagos, promoción y métricas en una sola plataforma diseñada 
            para profesionales y pymes modernas.
          </p>

          <div className={styles.heroButtons}>
            <a href="#" className={styles.btnPrimary}>Acceso anticipado</a>
            <a href="#" className={styles.btnSecondary}>Ver cómo funciona</a>
          </div>
        </div>

        <div className={styles.heroMockup}>
          <Image
            src="/Krona-imagenes/Cliente-usando-krona.png"
            alt="usando krona"
            width={2000}
            height={110}
          />
        </div>

      </div>
    </section>)
}
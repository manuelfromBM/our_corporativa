import Image from "next/image";
import styles from "./Nosotros.module.css";
import { team } from './Nosotros.team'

export default function NosotrosSection() {
  return (
    <section id="Nosotros" className={styles.section}>
      <div className={styles.container}>

        {/* Bloque de texto — ahora centrado arriba */}
        <div className={styles.textBox}>
          <span className={styles.badge}>Quienes somos</span>

          <h2 className={styles.title}>
            Transformamos ideas en
            <span className={styles.highlight}> productos digitales reales</span>
          </h2>

          <p className={styles.description}>
            Somos un equipo apasionado por la tecnología y enfocado en crear
            soluciones innovadoras que aporten valor real. Combinamos
            creatividad, experiencia técnica y compromiso para llevar cada
            proyecto al siguiente nivel.
          </p>

          <p className={styles.description}>
            Nuestro objetivo es construir productos funcionales, escalables y
            modernos que impulsen el crecimiento de cada negocio con el que
            trabajamos.
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

        {/* Grilla de tarjetas del equipo */}
        <div className={styles.teamGrid}>
          {team.map((member, i) => (
            <div key={i} className={styles.teamCard}>
              <div className={styles.imageGlow}></div>
              <div className={styles.cardImageWrapper}>
                <Image
                  src={member.img}
                  alt={member.alt}
                  fill
                  className={styles.image}
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className={styles.cardInfo}>
                <span className={styles.memberName}>{member.name}</span>
                <span className={styles.memberRole}>{member.role}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
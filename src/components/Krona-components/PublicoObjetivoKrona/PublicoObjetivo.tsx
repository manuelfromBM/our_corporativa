import { Briefcase, StoreIcon, Building2Icon } from 'lucide-react'
import styles from "./PublicoObjetivoKrona.module.css"
import { PiNavigationArrow } from 'react-icons/pi'

export default function PublicoObjetivo() {
  return (
    <section className={styles.target}>
      <div className={styles.targetContainer}>
        <h2>¿Es Krona para ti?</h2>
      </div>

      <div className={styles.targetSlider}>

        {/* Profesional independiente */}
        <div className={styles.targetCard}>
          <div
            className={styles.cardBg}
            style={{ backgroundImage: "url('/Krona-imagenes/Profesional-independiente.png')" }}
          />
          <div className={styles.cardContent}>
            <div className={styles.icon}>
              <Briefcase size={28} strokeWidth={1.5} />
            </div>
            <h3>Profesional independiente</h3>
            <p>Si hoy gestionas todo por WhatsApp y notas... esto es para ti.</p>
          </div>
        </div>

        {/* Pyme */}
        <div className={styles.targetCard}>
          <div
            className={styles.cardBg}
            style={{ backgroundImage: "url('/Krona-imagenes/Pyme.png')" }}
          />
          <div className={styles.cardContent}>
            <div className={styles.icon}>
              <StoreIcon size={28} strokeWidth={1.5} />
            </div>
            <h3>Pyme</h3>
            <p>Si tu negocio depende de reservas manuales y planillas, puedes automatizarlo.</p>
          </div>
        </div>

        {/* Empresa */}
        <div className={styles.targetCard}>
          <div
            className={styles.cardBg}
            style={{ backgroundImage: "url('/Krona-imagenes/Empresa.png')" }}
          />
          <div className={styles.cardContent}>
            <div className={styles.icon}>
              <Building2Icon size={28} strokeWidth={1.5} />
            </div>
            <h3>Empresa pequeña</h3>
            <p>Si necesitas métricas claras y control de ingresos en tiempo real.</p>
          </div>
        </div>

        {/* Servicios locales */}
        <div className={styles.targetCard}>
          <div
            className={styles.cardBg}
            style={{ backgroundImage: "url('/Krona-imagenes/Negocios-local.png')" }}
          />
          <div className={styles.cardContent}>
            <div className={styles.icon}>
              <PiNavigationArrow size={28} />
            </div>
            <h3>Servicios locales</h3>
            <p>Si quieres que nuevos clientes te descubran por ubicación.</p>
          </div>
        </div>

      </div>
    </section>
  )
}
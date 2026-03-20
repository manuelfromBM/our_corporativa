import styles from "./PublicoObjetivoKrona.module.css"

export default function PublicoObjetivo() {
    return(
        <section className={styles.target}>
            <div className={styles.targetContainer}>

                <h2>¿Es Krona para ti?</h2>

                <div className={styles.targetSlider}>

                <div className={styles.targetCard}>
                    <div className={styles.icon}>🧑‍💼</div>
                    <h3>Profesional independiente</h3>
                    <p>Si hoy gestionas todo por WhatsApp y notas... esto es para ti.</p>
                </div>

                <div className={styles.targetCard}>
                    <div className={styles.icon}>🏪</div>
                    <h3>Pyme</h3>
                    <p>Si tu negocio depende de reservas manuales y planillas, puedes automatizarlo.</p>
                </div>

                <div className={styles.targetCard}>
                    <div className={styles.icon}>🏢</div>
                    <h3>Empresa pequeña</h3>
                    <p>Si necesitas métricas claras y control de ingresos en tiempo real.</p>
                </div>

                <div className={styles.targetCard}>
                    <div className={styles.icon}>📍</div>
                    <h3>Servicios locales</h3>
                    <p>Si quieres que nuevos clientes te descubran por ubicación.</p>
                </div>

                </div>

            </div>
        </section>
    )
}
import styles from "./DashboardKrona.module.css";

export default function DashboardKronaSection() {
  return (
   <section className={styles.features}>
  <div className={styles.featuresContainer}>

    <h2 className={styles.featuresTitle}>
      Todo tu negocio en un solo panel
    </h2>

    <p className={styles.featuresSubtitle}>
      Krona te da control total con métricas, reservas y pagos en tiempo real.
    </p>

    <div className={styles.featureCard}>

      <div className={styles.featureHeader}>
        <span className={styles.featureIcon}>📊</span>
        <h3>Dashboard Inteligente</h3>
      </div>

      <p className={styles.featureDescription}>
        Visualiza reservas, ingresos y crecimiento de tu negocio en tiempo real
        desde un panel simple pero poderoso.
      </p>

      <div className={styles.metrics}>

        <div className={styles.metric}>
          <span>Reservas hoy</span>
          <strong>28</strong>
        </div>

        <div className={styles.metric}>
          <span>Ingresos</span>
          <strong>$124.000</strong>
        </div>

        <div className={styles.metric}>
          <span>Clientes nuevos</span>
          <strong>7</strong>
        </div>

      </div>

      <div className={styles.growth}>
        📈 +32% esta semana
      </div>

    </div>

  </div>
</section>
  );
}

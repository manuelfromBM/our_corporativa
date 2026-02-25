import styles from "./DashboardKrona.module.css";

export default function DashboardKronaSection() {
  return (
    <section className={styles.dashboardSection}>
      <div className={styles.container}>

        {/* LADO IZQUIERDO - TEXTO */}
        <div className={styles.left}>

          <span className={styles.badge}>
            📊 Vista del sistema
          </span>

          <h2 className={styles.title}>
            Así se ve tu negocio con Krona.
          </h2>

          <p className={styles.description}>
            Un panel moderno, claro y poderoso que te permite visualizar
            ingresos, citas y clientes en tiempo real.
          </p>

          <div className={styles.highlightBox}>
            <p>
              📈 Métricas claras  
              <br />
              📅 Agenda organizada  
              <br />
              💰 Control total de ingresos  
              <br />
              👥 Gestión completa de clientes  
            </p>
          </div>

        </div>

        {/* LADO DERECHO - IMAGEN */}
        <div className={styles.right}>
          <img
            src="./DashboardKrona.png"
            alt="Dashboard Krona"
            className={styles.dashboardImage}
          />
        </div>

      </div>
    </section>
  );
}

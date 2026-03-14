"use client";
import styles from "./ComoFunciona.module.css";

export default function ComoFunciona() {

  const steps = [
    {
      title: "Crea tu negocio",
      desc: "Registra tu negocio en minutos y configura tu perfil profesional.",
      icon: "🏪"
    },
    {
      title: "Configura tus servicios",
      desc: "Define horarios, precios y duración de cada servicio.",
      icon: "⚙️"
    },
    {
      title: "Recibe reservas",
      desc: "Tus clientes pueden reservar automáticamente desde tu agenda.",
      icon: "📅"
    },
    {
      title: "Gestiona todo",
      desc: "Controla ingresos, clientes y crecimiento desde tu panel.",
      icon: "📊"
    }
  ];

  return (
    <section className={styles.how}>

      <h2>Cómo funciona Krona</h2>
      <p className={styles.subtitle}>
        Empieza a automatizar tu negocio en solo unos pasos.
      </p>

      <div className={styles.grid}>

        {steps.map((step, index) => (
          <div key={index} className={styles.card}>

            <div className={styles.icon}>
              {step.icon}
            </div>

            <h3>{step.title}</h3>

            <p>{step.desc}</p>

          </div>
        ))}

      </div>

    </section>
  );
}
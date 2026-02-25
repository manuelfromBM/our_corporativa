import styles from "./NosotrosKrona.module.css";

export default function NosotrosKronaSection() {
  return (
    <section className={styles.nosotros}>
      <div className={styles.container}>
        
        {/* MINI ETIQUETA */}
        <span className={styles.badge}>
          💡 Sobre Krona
        </span>

        {/* TÍTULO */}
        <h2 className={styles.title}>
          Construido para emprendedores reales.
        </h2>

        {/* DESCRIPCIÓN PRINCIPAL */}
        <p className={styles.description}>
          Krona nace con una misión clara: simplificar la administración de pequeños y medianos negocios. 
          Sabemos que emprender no es fácil, y que el tiempo es el recurso más valioso. 
          Por eso creamos una herramienta moderna, intuitiva y poderosa que te ayuda a organizar 
          tu empresa sin complicaciones.
        </p>

        {/* TARJETAS */}
        <div className={styles.cards}>
          
          <div className={styles.card}>
            <h3 className={styles.cardTitle}>🚀 Nuestra misión</h3>
            <p className={styles.cardText}>
              Ayudar a emprendedores a administrar su negocio de forma profesional,
              sin depender de múltiples herramientas desordenadas.
            </p>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>🔐 Nuestra visión</h3>
            <p className={styles.cardText}>
              Convertirnos en el sistema de gestión preferido por emprendedores
              que buscan crecer con organización y tecnología.
            </p>
          </div>

          <div className={styles.card}>
            <h3 className={styles.cardTitle}>⚡ Nuestro enfoque</h3>
            <p className={styles.cardText}>
              Simplicidad, eficiencia y diseño moderno. Krona está pensada
              para ser fácil de usar y potente al mismo tiempo.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

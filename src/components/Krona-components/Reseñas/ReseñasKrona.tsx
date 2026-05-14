import styles from "./ReseñasKrona.module.css";

const reviewsRowOne = [
  {
    name: "Carlos R.",
    business: "Barbería",
    text: "Antes coordinaba todo por WhatsApp. Con Krona ahora mi agenda se llena sola.",
  },
  {
    name: "María L.",
    business: "Estética",
    text: "Krona me permitió ordenar mis reservas y entender cuánto gano realmente.",
  },
  {
    name: "Javier M.",
    business: "Entrenador personal",
    text: "Ahora mis clientes reservan solos y yo solo me enfoco en entrenar.",
  },
  {
    name: "Fernanda P.",
    business: "Manicure",
    text: "Dejé de perder horas respondiendo mensajes para confirmar horarios.",
  },
];

const reviewsRowTwo = [
  {
    name: "Andrea G.",
    business: "Centro de masajes",
    text: "Tengo mis horarios, clientes y reservas en un solo lugar. Todo se siente más profesional.",
  },
  {
    name: "Tomás V.",
    business: "Kinesiología",
    text: "El orden que necesitaba para dejar de improvisar cada semana.",
  },
  {
    name: "Daniela S.",
    business: "Peluquería",
    text: "Mis promociones ahora llegan mejor a mis clientes y se ve todo más claro.",
  },
  {
    name: "Matías C.",
    business: "Servicio técnico",
    text: "Krona me ayudó a organizar mi negocio sin depender de mil notas sueltas.",
  },
];

function ReviewCard({
  name,
  business,
  text,
}: {
  name: string;
  business: string;
  text: string;
}) {
  return (
    <article className={styles.reviewCard}>
      <div className={styles.stars}>★★★★★</div>

      <p className={styles.reviewText}>“{text}”</p>

      <div className={styles.author}>
        <div className={styles.avatar}>{name.charAt(0)}</div>

        <div>
          <strong>{name}</strong>
          <span>{business}</span>
        </div>
      </div>
    </article>
  );
}

export default function ResenasKrona() {
  return (
    <section className={styles.reviewsSection}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <span className={styles.badge}>Opiniones reales</span>

          <h2>Menos caos, más control: así se siente usar Krona</h2>

          <p>
            Profesionales y negocios de servicios están comenzando a ordenar sus
            reservas, clientes y crecimiento con Krona.
          </p>
        </div>

        <div className={styles.floatingArea}>
          <div className={styles.glowOne}></div>
          <div className={styles.glowTwo}></div>

          <div className={`${styles.marqueeTrack} ${styles.rowOne}`}>
            {[...reviewsRowOne, ...reviewsRowOne].map((review, index) => (
              <ReviewCard
                key={`row-one-${index}`}
                name={review.name}
                business={review.business}
                text={review.text}
              />
            ))}
          </div>

          <div className={`${styles.marqueeTrack} ${styles.rowTwo}`}>
            {[...reviewsRowTwo, ...reviewsRowTwo].map((review, index) => (
              <ReviewCard
                key={`row-two-${index}`}
                name={review.name}
                business={review.business}
                text={review.text}
              />
            ))}
          </div>

          <div className={`${styles.marqueeTrack} ${styles.rowThree}`}>
            {[...reviewsRowOne, ...reviewsRowTwo].map((review, index) => (
              <ReviewCard
                key={`row-three-${index}`}
                name={review.name}
                business={review.business}
                text={review.text}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
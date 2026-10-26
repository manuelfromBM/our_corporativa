import { Instagram, Share2, Users } from "lucide-react";
import styles from "./Pasos.module.css";
import Image from "next/image";

const steps = [
  {
    number: "01",
    title: "Seguir la cuenta",
    description:
      "Sigue nuestra cuenta de Instagram para estar al tanto del sorteo y el anuncio de los ganadores.",
    image: "/Sorteo-imagenes/telefono4.jpeg",
    icon: Instagram,
  },
  {
    number: "02",
    title: "Compartir en historias",
    description:
      "Comparte la publicación del sorteo en tus historias de Instagram para que más personas conozcan esta oportunidad.",
    image: "/Sorteo-imagenes/telefono2.jpeg",
    icon: Share2,
  },
  {
    number: "03",
    title: "Etiquetar amigos",
    description:
      "Etiqueta a tus amigos emprendedores en los comentarios de la publicación. Cada etiqueta suma más oportunidades de ganar.",
    image: "/Sorteo-imagenes/telefono3.jpeg",
    icon: Users,
  },
];

export default function HowToParticipate() {
  return (
    <section className={styles.howToSection}>
      <div className={styles.inner}>

        {/* Sidebar izquierdo */}
        <div className={styles.sidebar}>
          <span>CÓMO PARTICIPAR</span>
          <h2>3 pasos simples</h2>
          <p>
            Participar es totalmente gratis y solo te tomará unos minutos.
            No necesitas experiencia previa ni cumplir ningún requisito especial,
            cualquier persona puede unirse. Mientras más activo seas en la
            comunidad, más chances tendrás de llevarte el premio. Sigue los
            pasos, comparte con tus amigos y déjate sorprender.
          </p>
          <hr className={styles.divider} />
          <div className={styles.sidebarNote}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p>
              El ganador se anuncia en por publicacion de Instagram al finalizar
              el periodo del sorteo. ¡Activa las notificaciones para no perderte nada!
            </p>
          </div>
        </div>

        {/* Columna derecha: tarjetas */}
        <div className={styles.stepsWrapper}>
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <article key={step.number} className={styles.stepCard}>
                <div className={styles.imageSide}>
                  <Image src={step.image} alt={step.title} fill />
                </div>
                <div className={styles.contentSide}>
                  <div className={styles.stepMeta}>
                    <span className={styles.stepNumber}>PASO {step.number}</span>
                    <div className={styles.iconBox}>
                      <Icon size={14} />
                    </div>
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}

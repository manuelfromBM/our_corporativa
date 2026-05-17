import { Briefcase, Building2Icon, MapPinIcon, StoreIcon } from "lucide-react";
import styles from "./PublicoObjetivoKrona.module.css";

const targets = [
  {
    id: "independientes",
    icon: Briefcase,
    title: "Profesionales independientes",
    description:
      "Si hoy gestionas tus reservas por WhatsApp, Krona te ayuda a ordenar tu agenda.",
    tag: "Servicios personales",
    image: "/Krona-imagenes/Profesional-independiente.png",
  },
  {
    id: "pymes",
    icon: StoreIcon,
    title: "Pymes de servicios",
    description:
      "Centraliza reservas, clientes y pagos en una plataforma más profesional.",
    tag: "Negocios en crecimiento",
    image: "/Krona-imagenes/Pyme.png",
  },
  {
    id: "empresas",
    icon: Building2Icon,
    title: "Empresas pequeñas",
    description:
      "Gestiona equipos, horarios y servicios desde un sistema conectado.",
    tag: "Operación organizada",
    image: "/Krona-imagenes/Empresa.png",
  },
  {
    id: "locales",
    icon: MapPinIcon,
    title: "Servicios locales",
    description:
      "Haz que nuevos clientes te descubran por ubicación y cercanía.",
    tag: "Visibilidad local",
    image: "/Krona-imagenes/Negocios-local.png",
  },
];

export default function PublicoObjetivo() {
  const carouselTargets = [...targets, ...targets];

  return (
    <section className={styles.target}>
      <div className={styles.targetContainer}>
        <h2>¿Es Krona para ti?</h2>

        <p className={styles.targetSubtitle}>
          Diseñado para profesionales, pymes y negocios de servicios que quieren
          ordenar su gestión diaria.
        </p>

        <div className={styles.carouselMask}>
          <div className={styles.targetSlider}>
            {carouselTargets.map((target, index) => {
              const Icon = target.icon;

              return (
                <article
                  className={styles.targetCard}
                  key={`${target.id}-${index}`}
                >
                  <div
                    className={styles.cardBg}
                    style={{ backgroundImage: `url(${target.image})` }}
                  />

                  <div className={styles.cardContent}>
                    <div className={styles.icon}>
                      <Icon size={28} strokeWidth={2.2} />
                    </div>

                    <h3>{target.title}</h3>
                    <p>{target.description}</p>
                    <span className={styles.targetTag}>{target.tag}</span>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
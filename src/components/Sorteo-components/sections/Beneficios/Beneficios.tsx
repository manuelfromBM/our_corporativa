"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Beneficios.module.css";

type Benefit = {
  id: number;
  shortTitle: string;
  title: string;
  description: string;
};

const benefits: Benefit[] = [
  {
    id: 1,
    shortTitle: "Más profesional",
    title: "Tu negocio se ve más profesional",
    description:
      "Una página web transmite confianza, orden y seriedad, ayudando a que tu marca destaque frente a otros negocios que solo dependen de redes sociales.",
  },
  {
    id: 2,
    shortTitle: "Todo ordenado",
    title: "Toda tu información en un solo lugar",
    description:
      "Servicios, productos, precios aproximados, galería, ubicación, preguntas frecuentes y contacto directo, todo claro para que el cliente entienda rápido qué ofreces.",
  },
  {
    id: 3,
    shortTitle: "Más ventas",
    title: "Convierte tus redes en ventas reales",
    description:
      "Tus publicaciones, historias o anuncios pueden llevar a las personas a una web clara, diseñada para que terminen escribiéndote, cotizando o comprando.",
  },
  {
    id: 4,
    shortTitle: "Google",
    title: "Puedes aparecer en Google",
    description:
      "Cuando alguien busca un servicio como el tuyo, tu página puede ayudarte a ser encontrado más fácilmente y atraer clientes que ya están interesados.",
  },
  {
    id: 5,
    shortTitle: "Catálogo digital",
    title: "Funciona como tu catálogo digital",
    description:
      "Muestra tus mejores trabajos, productos, categorías y formas de pedido en una vitrina profesional disponible para cualquier persona.",
  },
  {
    id: 6,
    shortTitle: "24/7",
    title: "Trabaja por ti las 24 horas",
    description:
      "Tu web sigue mostrando tu negocio aunque estés ocupado, descansando o fuera de horario. El cliente puede conocerte y contactarte en cualquier momento.",
  },
  {
    id: 7,
    shortTitle: "Ahorra tiempo",
    title: "Ahorra tiempo respondiendo lo mismo",
    description:
      "Una página bien hecha responde dudas frecuentes antes de que el cliente te escriba, ayudando a que llegue más informado y con mayor intención de compra.",
  },
  {
    id: 8,
    shortTitle: "Espacio propio",
    title: "Tu espacio propio, no del algoritmo",
    description:
      "Las redes sociales cambian, bajan el alcance o pueden fallar. Tu web es un activo propio que puede crecer con el tiempo y fortalecer tu marca.",
  },
];

export default function Beneficios() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [poppingBubble, setPoppingBubble] = useState<number | null>(null);
  const bubbleRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeBenefit = benefits[activeIndex];

  const handleBubbleClick = (index: number) => {
    setPoppingBubble(benefits[index].id);

    setTimeout(() => {
      setActiveIndex(index);
      setPoppingBubble(null);
    }, 180);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % benefits.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const activeBubble = bubbleRefs.current[activeIndex];

    if (activeBubble && window.innerWidth <= 768) {
      activeBubble.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [activeIndex]);

  return (
    <section className={styles.benefitsBubblesSection} id="beneficios">
      <div className={styles.benefitsBubblesContainer}>
        <div className={styles.benefitsBubblesHeader}>
          <span className={styles.benefitsBubblesEyebrow}>
            Beneficios de tener una página web
          </span>

          <h2 className={styles.benefitsBubblesTitle}>
            Descubre lo que una web puede hacer por tu negocio
          </h2>

          <p className={styles.benefitsBubblesSubtitle}>
            Tu página web no solo se ve bien: también te ayuda a vender mejor,
            ordenar tu negocio y generar más confianza.
          </p>
        </div>

        <div className={styles.benefitsBubblesStage}>
          <article className={styles.benefitBubbleCard} aria-live="polite">
            <span className={styles.benefitBubbleCardNumber}>
              Beneficio {String(activeBenefit.id).padStart(2, "0")}
            </span>

            <h3 className={styles.benefitBubbleCardTitle}>
              {activeBenefit.title}
            </h3>

            <p className={styles.benefitBubbleCardDescription}>
              {activeBenefit.description}
            </p>

            <div className={styles.benefitBubbleCardFooter}>
              <span>Las redes atraen miradas.</span>
              <strong>Tu web las convierte en clientes.</strong>
            </div>
          </article>

          <div
            className={styles.benefitsBubblesList}
            aria-label="Lista de beneficios"
          >
            {benefits.map((benefit, index) => {
              const isActive = activeIndex === index;
              const isPopping = poppingBubble === benefit.id;

              return (
                <button
                  key={benefit.id}
                  ref={(el) => {
                    bubbleRefs.current[index] = el;
                  }}
                  type="button"
                  className={[
                    styles.benefitBubble,
                    styles[`benefitBubble${benefit.id}`],
                    isActive ? styles.isActive : "",
                    isPopping ? styles.isPopping : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => handleBubbleClick(index)}
                  aria-pressed={isActive}
                  aria-label={`Ver beneficio: ${benefit.title}`}
                >
                  <span className={styles.benefitBubbleNumber}>
                    {String(benefit.id).padStart(2, "0")}
                  </span>

                  <span className={styles.benefitBubbleText}>
                    {benefit.shortTitle}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
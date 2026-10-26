"use client";

import { useState } from "react";
import {
  CalendarClock,
  BarChart3,
  MessagesSquare,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import styles from "./BeneficiosKrona.module.css";

const comparisons = [
  {
    id: "reservas",
    icon: CalendarClock,
    tag: "Reservas",
    without: "Horas coordinando reservas manualmente.",
    with: "Agenda automatizada en tiempo real.",
    visualTitle: "Agenda inteligente",
    visualText: "Reservas organizadas, horarios disponibles y menos errores.",
  },
  {
    id: "ingresos",
    icon: BarChart3,
    tag: "Ingresos",
    without: "Ingresos poco claros y difíciles de medir.",
    with: "Control visual de ventas, reservas y crecimiento.",
    visualTitle: "Métricas claras",
    visualText: "Visualiza cómo evoluciona tu negocio desde un solo panel.",
  },
  {
    id: "organizacion",
    icon: MessagesSquare,
    tag: "Organización",
    without: "Mensajes, notas y clientes repartidos en distintas partes.",
    with: "Toda tu operación centralizada en un solo lugar.",
    visualTitle: "Todo conectado",
    visualText: "Clientes, reservas y gestión diaria trabajando juntos.",
  },
  {
    id: "crecimiento",
    icon: TrendingUp,
    tag: "Crecimiento",
    without: "Trabajas más, pero no siempre logras escalar.",
    with: "Procesos ordenados para crecer de forma profesional.",
    visualTitle: "Crecimiento ordenado",
    visualText: "Automatiza tareas repetitivas y enfócate en hacer crecer tu negocio.",
  },
];

export default function AntesDespuesKrona() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeItem = comparisons[activeIndex];
  const ActiveIcon = activeItem.icon;

  const goToPrevious = () => {
    setActiveIndex((prev) =>
      prev === 0 ? comparisons.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setActiveIndex((prev) =>
      prev === comparisons.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <section className={styles.beforeAfter}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.badge}>Antes y después</span>

          <h2>De reservas improvisadas a un negocio organizado</h2>

          <p>
            Mira cómo cambia la gestión de tu negocio cuando dejas de improvisar
            y comienzas a operar con Krona.
          </p>
        </div>

        <div className={styles.carousel}>
          <button
            className={`${styles.arrowButton} ${styles.leftArrow}`}
            onClick={goToPrevious}
            aria-label="Ver comparación anterior"
          >
            <ChevronLeft size={22} />
          </button>

          <article className={styles.card}>
            <div className={styles.content}>
              <div className={styles.cardTop}>
                <div className={styles.iconBox}>
                  <ActiveIcon size={28} />
                </div>

                <div>
                  <span className={styles.cardTag}>{activeItem.tag}</span>
                  <h3>{activeItem.visualTitle}</h3>
                </div>
              </div>

              <div className={styles.comparisonGrid}>
                <div className={styles.withoutBox}>
                  <span>Sin Krona</span>
                  <p>{activeItem.without}</p>
                </div>

                <div className={styles.withBox}>
                  <span>Con Krona</span>
                  <p>{activeItem.with}</p>
                </div>
              </div>
            </div>

            <div className={styles.visual}>
              {/* 
                Aquí después puedes reemplazar este bloque por:
                <Image src="/images/krona/agenda.png" alt="Agenda Krona" width={420} height={320} />
              */}

              <div className={styles.mockupCard}>
                <div className={styles.mockupHeader}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>

                <div className={styles.mockupIcon}>
                  <ActiveIcon size={38} />
                </div>

                <h4>{activeItem.visualTitle}</h4>
                <p>{activeItem.visualText}</p>

                <div className={styles.mockupLines}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </article>

          <button
            className={`${styles.arrowButton} ${styles.rightArrow}`}
            onClick={goToNext}
            aria-label="Ver siguiente comparación"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        <div className={styles.dots}>
          {comparisons.map((item, index) => (
            <button
              key={item.id}
              className={`${styles.dot} ${
                activeIndex === index ? styles.activeDot : ""
              }`}
              onClick={() => setActiveIndex(index)}
              aria-label={`Ver comparación ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
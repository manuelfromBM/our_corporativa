"use client";

import { useState } from "react";
import {
  CalendarDays,
  CreditCard,
  BarChart3,
  Megaphone,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import styles from "./FuncionalidadesKrona.module.css";

type Feature = {
  id: string;
  title: string;
  short: string;
  description: string;
  benefits: string[];
  icon: React.ElementType;
};

const features: Feature[] = [
  {
    id: "agenda",
    title: "Agenda inteligente",
    short: "Organiza reservas, horarios y disponibilidad en tiempo real.",
    description:
      "Gestiona tus reservas desde un solo lugar, visualiza horarios disponibles y evita la coordinación manual en cada cita.",
    benefits: [
      "Reservas en tiempo real",
      "Horarios siempre actualizados",
      "Menos coordinación manual",
    ],
    icon: CalendarDays,
  },
  {
    id: "pagos",
    title: "Pagos integrados",
    short: "Recibe pagos de forma simple y más profesional.",
    description:
      "Facilita el cobro de tus servicios con un sistema que te ayuda a recibir pagos de manera ordenada y sin depender de procesos dispersos.",
    benefits: [
      "Cobros más simples",
      "Menos fricción para el cliente",
      "Más orden financiero",
    ],
    icon: CreditCard,
  },
  {
    id: "metricas",
    title: "Dashboard de métricas",
    short: "Entiende cómo evoluciona tu negocio con datos claros.",
    description:
      "Visualiza ingresos, reservas y crecimiento en un panel pensado para ayudarte a tomar decisiones con más claridad.",
    benefits: [
      "Métricas visuales",
      "Seguimiento del rendimiento",
      "Mejores decisiones",
    ],
    icon: BarChart3,
  },
  {
    id: "feed",
    title: "Feed promocional",
    short: "Promociona tus servicios y aumenta tu visibilidad.",
    description:
      "Publica novedades, promociones y contenido para mantener tu negocio activo frente a nuevos y actuales clientes.",
    benefits: [
      "Más visibilidad",
      "Promociones destacadas",
      "Mayor conexión con clientes",
    ],
    icon: Megaphone,
  },
  {
    id: "local",
    title: "Descubrimiento local",
    short: "Haz que te encuentren por ubicación y cercanía.",
    description:
      "Ayuda a que nuevos clientes descubran tu negocio según su ubicación y encuentren servicios cercanos con mayor facilidad.",
    benefits: [
      "Mayor alcance local",
      "Más posibilidades de descubrimiento",
      "Impulso para captar clientes cercanos",
    ],
    icon: MapPin,
  },
];

export default function TodoConectadoKrona() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeItem = features[activeIndex];
  const ActiveIcon = activeItem.icon;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <span className={styles.badge}>Centro operativo</span>
          <h2>Todo tu negocio conectado en una sola plataforma</h2>
          <p>
            Centraliza agenda, pagos, métricas, promoción y visibilidad local
            en un sistema pensado para negocios de servicios.
          </p>
        </div>

        <div className={styles.layout}>
          <div className={styles.sidebar}>
            {features.map((item, index) => {
              const ItemIcon = item.icon;
              const isActive = index === activeIndex;

              return (
                <button
                  key={item.id}
                  className={`${styles.featureButton} ${
                    isActive ? styles.featureButtonActive : ""
                  }`}
                  onClick={() => setActiveIndex(index)}
                  type="button"
                >
                  <div className={styles.featureIcon}>
                    <ItemIcon size={22} />
                  </div>

                  <div className={styles.featureText}>
                    <h3>{item.title}</h3>
                    <p>{item.short}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className={styles.previewPanel}>
            <div className={styles.previewCard}>
              <div className={styles.previewTop}>
                <div className={styles.previewTitleWrap}>
                  <div className={styles.previewIcon}>
                    <ActiveIcon size={26} />
                  </div>

                  <div>
                    <span className={styles.previewMiniLabel}>
                      Módulo principal
                    </span>
                    <h3>{activeItem.title}</h3>
                  </div>
                </div>
              </div>

              <p className={styles.previewDescription}>
                {activeItem.description}
              </p>

              <div className={styles.benefits}>
                {activeItem.benefits.map((benefit) => (
                  <div key={benefit} className={styles.benefitItem}>
                    <CheckCircle2 size={16} />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              <div className={styles.mockupArea}>
                {activeItem.id === "agenda" && (
                  <div className={styles.mockupWindow}>
                    <div className={styles.windowHeader}>
                      <span />
                      <span />
                      <span />
                    </div>

                    <div className={styles.calendarBlock}>
                      <div className={styles.calendarRow}>
                        <span className={styles.calendarTitle}>Lunes</span>
                        <span className={styles.calendarChip}>09:00</span>
                      </div>
                      <div className={styles.calendarRow}>
                        <span className={styles.calendarTitle}>Martes</span>
                        <span className={styles.calendarChip}>11:30</span>
                      </div>
                      <div className={styles.calendarRow}>
                        <span className={styles.calendarTitle}>Miércoles</span>
                        <span className={styles.calendarChip}>15:00</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeItem.id === "pagos" && (
                  <div className={styles.mockupWindow}>
                    <div className={styles.windowHeader}>
                      <span />
                      <span />
                      <span />
                    </div>

                    <div className={styles.paymentCard}>
                      <div className={styles.paymentTop}>
                        <span>Pago recibido</span>
                        <strong>$24.990</strong>
                      </div>
                      <div className={styles.paymentLine} />
                      <div className={styles.paymentBottom}>
                        <small>Reserva confirmada</small>
                        <div className={styles.paymentTag}>Completado</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeItem.id === "metricas" && (
                  <div className={styles.mockupWindow}>
                    <div className={styles.windowHeader}>
                      <span />
                      <span />
                      <span />
                    </div>

                    <div className={styles.chartBlock}>
                      <div className={styles.chartBars}>
                        <span className={styles.bar1} />
                        <span className={styles.bar2} />
                        <span className={styles.bar3} />
                        <span className={styles.bar4} />
                      </div>

                      <div className={styles.metricCards}>
                        <div className={styles.metricMiniCard}>
                          <small>Reservas</small>
                          <strong>128</strong>
                        </div>
                        <div className={styles.metricMiniCard}>
                          <small>Ingresos</small>
                          <strong>$480K</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeItem.id === "feed" && (
                  <div className={styles.mockupWindow}>
                    <div className={styles.windowHeader}>
                      <span />
                      <span />
                      <span />
                    </div>

                    <div className={styles.feedPost}>
                      <div className={styles.feedImage} />
                      <div className={styles.feedTextLine} />
                      <div className={styles.feedTextLineShort} />
                      <div className={styles.feedFooter}>
                        <span>Promoción destacada</span>
                        <div className={styles.feedTag}>Activo</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeItem.id === "local" && (
                  <div className={styles.mockupWindow}>
                    <div className={styles.windowHeader}>
                      <span />
                      <span />
                      <span />
                    </div>

                    <div className={styles.mapBlock}>
                      <div className={styles.mapGrid} />
                      <div className={styles.mapPinMain} />
                      <div className={styles.mapPinSmall1} />
                      <div className={styles.mapPinSmall2} />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.quickStats}>
              <div className={styles.quickStat}>
                <strong>+ orden</strong>
                <span>menos gestión dispersa</span>
              </div>
              <div className={styles.quickStat}>
                <strong>+ claridad</strong>
                <span>mejores decisiones</span>
              </div>
              <div className={styles.quickStat}>
                <strong>+ crecimiento</strong>
                <span>más capacidad para avanzar</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
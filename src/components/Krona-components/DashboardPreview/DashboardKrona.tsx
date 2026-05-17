"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Package,
  Store,
  Building2,
  Monitor,
  Smartphone,
  ChevronDown,
  LucideIcon,
} from "lucide-react";

import styles from "./DashboardKrona.module.css";

type PlanId = "emprende" | "pyme" | "avanzado";
type DeviceView = "pc" | "mobile";

interface Plan {
  id: PlanId;
  icon: LucideIcon;
  name: string;
  price: string;
  short: string;
  description: string;
  features: string[];
  dashboardPc: string;
  dashboardMobile: string;
}

const plans: Plan[] = [
  {
    id: "emprende",
    icon: Package,
    name: "Plan Emprende",
    price: "$9.990",
    short: "Ideal para profesionales independientes.",
    description:
      "Pensado para quienes gestionan su propio servicio y necesitan agenda, pagos y presencia digital en un solo lugar.",
    features: [
      "Perfil público profesional",
      "Agenda inteligente",
      "Gestión de reservas",
      "Pagos integrados",
      "Métricas básicas",
    ],
    dashboardPc: "/Krona-imagenes/plan-emprende.png",
    dashboardMobile: "/Krona-imagenes/plan-emprende-mobile.png",
  },
  {
    id: "pyme",
    icon: Store,
    name: "Plan Pyme",
    price: "$19.990",
    short: "Para negocios con equipo y más operación.",
    description:
      "Centraliza reservas, clientes, empleados, disponibilidad e historial desde un panel profesional.",
    features: [
      "Todo lo de Emprende",
      "Gestión de empleados",
      "Historial avanzado",
      "Multi-dispositivo",
      "Dashboard operativo",
    ],
    dashboardPc: "/Krona-imagenes/plan-pyme.png",
    dashboardMobile: "/Krona-imagenes/plan-pyme-mobile.png",
  },
  {
    id: "avanzado",
    icon: Building2,
    name: "Plan Avanzado",
    price: "$34.990",
    short: "Control completo para empresas de servicios.",
    description:
      "Diseñado para empresas que necesitan métricas avanzadas, control de recursos, stock y rendimiento por equipo.",
    features: [
      "Todo lo de Pyme",
      "Dashboard avanzado",
      "Stock y recursos",
      "Rendimiento por empleado",
      "Insights y reportes",
    ],
    dashboardPc: "/Krona-imagenes/plan-empresa.png",
    dashboardMobile: "/Krona-imagenes/plan-empresa-mobile.png",
  },
];

  export default function DashboardPlans() {
  const [deviceView, setDeviceView] = useState<DeviceView>("pc");
  const [activePlan, setActivePlan] = useState<PlanId>("emprende");

  const activeIndex = plans.findIndex((plan) => plan.id === activePlan);

  const getPanelPosition = (index: number) => {
    if (index === activeIndex) return styles.panelCenter;

    const prevIndex = activeIndex === 0 ? plans.length - 1 : activeIndex - 1;
    const nextIndex = activeIndex === plans.length - 1 ? 0 : activeIndex + 1;

    if (index === prevIndex) return styles.panelLeft;
    if (index === nextIndex) return styles.panelRight;

    return "";
  };

  return (
    <section className={styles.dashboardPlans}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>Dashboards por plan</span>
        <h2>Visualiza Krona según el nivel de tu negocio</h2>
        <p>
          Compara cómo se ve la experiencia de Krona en cada plan, desde un profesional
          independiente hasta una empresa con operación avanzada.
        </p>
      </div>

      <div className={styles.content}>
        {/* IZQUIERDA */}
        <div className={styles.left}>
          <div className={styles.deviceToggle}>
            <button
              type="button"
              className={deviceView === "pc" ? styles.deviceActive : ""}
              onClick={() => setDeviceView("pc")}
            >
              <Monitor size={18} />
              PC
            </button>

            <button
              type="button"
              className={deviceView === "mobile" ? styles.deviceActive : ""}
              onClick={() => setDeviceView("mobile")}
            >
              <Smartphone size={18} />
              Móvil
            </button>
          </div>

          <div className={styles.dashboardStage}>
            {plans.map((plan, index) => {
            const imageSrc =
              deviceView === "pc" ? plan.dashboardPc : plan.dashboardMobile;

            return (
              <button
                type="button"
                key={plan.id}
                className={`${styles.dashboardPanel} ${getPanelPosition(index)}`}
                onClick={() => setActivePlan(plan.id)}
              >
                <div className={styles.panelTop}>
                  <span>{plan.name}</span>
                </div>

                <div className={styles.panelImageBox}>
                  <Image
                    src={imageSrc}
                    alt={`Dashboard de ${plan.name} en ${deviceView}`}
                    width={500}
                    height={650}
                    className={styles.panelImage}
                  />
                </div>
              </button>
            );
          })}
          </div>
          </div>

        {/* DERECHA */}
        <div className={styles.right}>
          {plans.map((plan) => {
            const PlanIcon = plan.icon;
            const isActive = activePlan === plan.id;

            return (
              <article
                key={plan.id}
                className={`${styles.planCard} ${isActive ? styles.planCardActive : ""}`}
              >
                <button
                  type="button"
                  className={styles.planButton}
                  onClick={() => setActivePlan(plan.id)}
                >
                  <div className={styles.planIconBox}>
                    <PlanIcon size={24} strokeWidth={1.7} />
                  </div>

                  <div className={styles.planText}>
                    <h3>{plan.name}</h3>
                    <p>{plan.short}</p>
                  </div>

                  <div className={styles.planPriceBox}>
                    <strong>{plan.price}</strong>
                    <span>/ mes</span>
                  </div>

                  <ChevronDown
                    size={22}
                    className={`${styles.chevron} ${isActive ? styles.chevronActive : ""}`}
                  />
                </button>

                {isActive && (
                  <div className={styles.planDetails}>
                    <p>{plan.description}</p>

                    <ul>
                      {plan.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

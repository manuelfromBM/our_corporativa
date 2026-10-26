"use client";

import Image from "next/image";
import { useState } from "react";
import {
  HandCoinsIcon,
  ClipboardListIcon,
  SmartphoneIcon,
  ChartNoAxesCombinedIcon,
  LucideIcon,
  CalendarCheckIcon,
  CreditCardIcon,
  ChartColumnIncreasingIcon,
  FolderKanbanIcon,
  XIcon,
  Maximize2Icon,
} from "lucide-react";

import styles from "./ProblemasKrona.module.css";

type SolutionId = "sol1" | "sol2" | "sol3" | "sol4";

interface Problem {
  id: SolutionId;
  icon: LucideIcon;
  title: string;
  sub: string;
  num: string;
}

interface Solution {
  id: SolutionId;
  icon: LucideIcon;
  title: string;
  body: string;
  feats: string[];
  image: string;
  alt: string;
}

const problems: Problem[] = [
  {
    id: "sol1",
    icon: SmartphoneIcon,
    title: "Agenda por WhatsApp",
    sub: "Mensajes perdidos y doble-bookings constantes",
    num: "01",
  },
  {
    id: "sol2",
    icon: ClipboardListIcon,
    title: "Planillas manuales",
    sub: "Sin control de disponibilidad ni historial real",
    num: "02",
  },
  {
    id: "sol3",
    icon: HandCoinsIcon,
    title: "Cobros informales",
    sub: "Transferencias sin registro ni reportes",
    num: "03",
  },
  {
    id: "sol4",
    icon: ChartNoAxesCombinedIcon,
    title: "Cero métricas",
    sub: "No sabes qué vende más ni cuándo tienes más demanda",
    num: "04",
  },
];

const solutions: Solution[] = [
  {
    id: "sol1",
    icon: CalendarCheckIcon,
    title: "Agenda inteligente en tiempo real",
    body: "Olvídate de los mensajes de WhatsApp. Krona gestiona tu disponibilidad, confirma reservas automáticamente y evita conflictos de horario con tecnología WebSocket.",
    feats: [
      "Disponibilidad en vivo",
      "Auto-confirmación",
      "Anti doble-booking",
      "Notificaciones push",
    ],
    image: "/Krona-imagenes/agenda-inteligente.png",
    alt: "Agenda inteligente de Krona con reservas en tiempo real",
  },
  {
    id: "sol2",
    icon: FolderKanbanIcon,
    title: "Gestión centralizada sin planillas",
    body: "Un panel profesional reemplaza tus planillas. Ve reservas, clientes, historial y disponibilidad en tiempo real desde cualquier dispositivo.",
    feats: [
      "Panel unificado",
      "Historial completo",
      "Multi-dispositivo",
      "Filtros avanzados",
    ],
    image: "/Krona-imagenes/gestion-centralizada.png",
    alt: "Panel centralizado de Krona para reemplazar planillas manuales",
  },
  {
    id: "sol3",
    icon: CreditCardIcon,
    title: "Pagos integrados con registro total",
    body: "Acepta pagos directamente en la app con Stripe, Flow o Mercado Pago. Cada cobro queda registrado con historial, reportes y liquidaciones automáticas.",
    feats: [
      "Stripe / Flow",
      "Mercado Pago",
      "Historial de cobros",
      "Reportes automáticos",
    ],
    image: "/Krona-imagenes/pagos-registro.png",
    alt: "Dashboard de pagos integrados de Krona con historial y reportes",
  },
  {
    id: "sol4",
    icon: ChartColumnIncreasingIcon,
    title: "Dashboard de métricas en tiempo real",
    body: "Visualiza ingresos, servicios más vendidos, visitas a tu perfil y rendimiento por empleado. Toma decisiones basadas en datos reales, no en intuición.",
    feats: ["KPIs en vivo", "Por empleado", "Servicios top", "Exportar datos"],
    image: "/Krona-imagenes/metricas-integradas.png",
    alt: "Dashboard de métricas de Krona con ingresos, reservas y servicios más vendidos",
  },
];

export default function ProblemasKronaSection() {
  const [active, setActive] = useState<SolutionId>("sol1");
  const [previewImage, setPreviewImage] = useState<Solution | null>(null);

  return (
    <section className={styles.problemSolution}>
      {/* Líneas de circuito SVG decorativas */}
      <div className={styles.circuitLines}>
        <svg
          viewBox="0 0 900 600"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <g stroke="rgba(124,77,255,0.25)" strokeWidth="1" fill="none">
            <polyline points="900,0 820,0 820,80 750,80 750,140 680,140" />
            <circle
              cx="680"
              cy="140"
              r="4"
              fill="rgba(124,77,255,0.5)"
              stroke="none"
            />
            <polyline points="900,600 840,600 840,500 780,500 780,420" />
            <circle
              cx="780"
              cy="420"
              r="3"
              fill="rgba(91,143,255,0.5)"
              stroke="none"
            />
            <polyline points="0,300 60,300 60,220 120,220" />
            <circle
              cx="120"
              cy="220"
              r="3"
              fill="rgba(124,77,255,0.4)"
              stroke="none"
            />
          </g>
        </svg>
      </div>

      <div className={styles.psContainer}>
        {/* LEFT */}
        <div className={styles.psLeft}>
          <div className={styles.psEyebrow}>El problema</div>

          <h2 className={styles.psTitle}>
            Gestionas tu negocio
            <br />
            en modo <em>caos.</em>
          </h2>

          <div className={styles.psItems}>
            {problems.map((p) => {
              const Icon = p.icon;

              return (
                <button
                  type="button"
                  key={p.id}
                  className={`${styles.psItem} ${
                    active === p.id ? styles.active : ""
                  }`}
                  onClick={() => setActive(p.id)}
                >
                  <div className={styles.psItemIcon}>
                    <Icon size={24} strokeWidth={1.7} />
                  </div>

                  <div className={styles.psItemText}>
                    <strong>{p.title}</strong>
                    <span>{p.sub}</span>
                  </div>

                  <span className={styles.psItemNum}>{p.num}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT */}
        <div className={styles.psRight}>
          {solutions
            .filter((s) => s.id === active)
            .map((s) => {
              const SolutionIcon = s.icon;

              return (
                <div key={s.id} className={styles.solutionCard}>
                  <div className={styles.solutionHeader}>
                    <div className={styles.psIconRight}>
                      <SolutionIcon size={26} strokeWidth={1.7} />
                    </div>

                    <div className={styles.solutionMeta}>
                      <div className={styles.solutionStatus}>
                        Resuelto por Krona
                      </div>
                      <h3>{s.title}</h3>
                    </div>
                  </div>

                  <div className={styles.solutionDivider} />

                  <p>{s.body}</p>

                  <button
                    type="button"
                    className={styles.solutionImageBox}
                    onClick={() => setPreviewImage(s)}
                    aria-label={`Ampliar imagen: ${s.title}`}
                  >
                    <Image
                      src={s.image}
                      alt={s.alt}
                      width={1100}
                      height={675}
                      className={styles.solutionImage}
                      priority={active === "sol1"}
                    />

                    <span className={styles.zoomHint}>
                      <Maximize2Icon size={14} />
                      Ver en grande
                    </span>
                  </button>

                  <div className={styles.solutionFeatures}>
                    {s.feats.map((f) => (
                      <span key={f} className={styles.sFeat}>
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {previewImage && (
        <div
          className={styles.imageModal}
          onClick={() => setPreviewImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Vista ampliada de imagen Krona"
        >
          <button
            type="button"
            className={styles.closeModal}
            onClick={() => setPreviewImage(null)}
            aria-label="Cerrar imagen ampliada"
          >
            <XIcon size={24} strokeWidth={2.2} />
          </button>

          <div
            className={styles.modalImageWrap}
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={previewImage.image}
              alt={previewImage.alt}
              width={1400}
              height={860}
              className={styles.modalImage}
              priority
            />

            <div className={styles.modalCaption}>
              <strong>{previewImage.title}</strong>
              <span>{previewImage.alt}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
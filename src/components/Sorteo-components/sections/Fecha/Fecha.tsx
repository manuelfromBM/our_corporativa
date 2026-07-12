"use client";

import { useEffect, useState } from "react";
import styles from "./Fecha.module.css";

type DateStrip = {
  label: string;
  title: string;
  dateText: string;
  targetDate: string;
  description: string;
};

const dateStrips: DateStrip[] = [
  {
    label: "CIERRE DEL SORTEO",
    title: "Último día para participar",
    dateText: "17 de julio de 2026",
    targetDate: "2026-07-19T23:59:00",
    description: "Participa antes del cierre oficial.",
  },
  {
    label: "ANUNCIO DE GANADORES",
    title: "Publicación oficial en Instagram",
    dateText: "20 de julio de 2026",
    targetDate: "2026-07-22T20:00:00",
    description: "Conoce a los ganadores en nuestra cuenta.",
  },
];

function getDaysLeft(targetDate: string) {
  const now = new Date();
  const target = new Date(targetDate);

  const difference = target.getTime() - now.getTime();

  if (difference <= 0) return 0;

  return Math.ceil(difference / (1000 * 60 * 60 * 24));
}

export default function GiveawayDateStrips() {
  const [daysLeftList, setDaysLeftList] = useState<number[]>([]);

  useEffect(() => {
    const updateDays = () => {
      const updatedDays = dateStrips.map((strip) =>
        getDaysLeft(strip.targetDate)
      );
      setDaysLeftList(updatedDays);
    };

    updateDays();

    const interval = setInterval(() => {
      updateDays();
    }, 1000 * 60 ); // actualiza cada 1 minuto

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className={styles.dateStripsSection}
      aria-label="Fechas importantes del sorteo"
    >
      <div className={styles.dateStripsContainer}>
        {dateStrips.map((strip, index) => (
          <article className={styles.dateStrip} key={strip.label}>
            <div className={styles.dateStripContent}>
              <div className={styles.dateStripText}>
                <span className={styles.dateStripLabel}>{strip.label}</span>
                <h3 className={styles.dateStripTitle}>{strip.title}</h3>
                <p className={styles.dateStripDescription}>
                  {strip.description}
                </p>
              </div>

              <div className={styles.dateStripInfo}>
                <span className={styles.dateStripDate}>{strip.dateText}</span>
                <span className={styles.dateStripDays}>
                  {daysLeftList[index] > 0
                    ? `Faltan ${daysLeftList[index]} días`
                    : "Fecha alcanzada"}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
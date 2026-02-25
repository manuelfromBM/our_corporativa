"use client";

import styles from "./ProblemasKrona.module.css"
import { useState } from "react";
export default function ProblemasKronaSection() {

  const [activeSolution, setActiveSolution] = useState("sol1");

  return (
    <section className={styles.problemSolution}>
      <div className={styles.psContainer}>

        {/* IZQUIERDA */}
        <div className={styles.psLeft}
        onMouseLeave={() => setActiveSolution("sol1")}>
          <h2>¿Te suena familiar?</h2>

          <div
            className={styles.psItem}
            onMouseEnter={() => setActiveSolution("sol1")}
          >
            <span>❌</span>
            <p>Pierdes reservas por mala coordinación.</p>
          </div>

          <div
            className={styles.psItem}
            onMouseEnter={() => setActiveSolution("sol2")}
          >
            <span>❌</span>
            <p>Todo lo gestionas por mensajes y notas.</p>
          </div>

          <div
            className={styles.psItem}
            onMouseEnter={() => setActiveSolution("sol3")}
          >
            <span>❌</span>
            <p>No sabes cuánto ganas realmente al mes.</p>
          </div>

          <div
            className={styles.psItem}
            onMouseEnter={() => setActiveSolution("sol4")}
          >
            <span>❌</span>
            <p>No tienes métricas claras para crecer.</p>
          </div>
        </div>

        {/* DERECHA */}
        <div className={styles.psRight}>

          <div className={`${styles.solution} ${activeSolution === "sol1" ? styles.active : ""}`}>
            <h3>📅 Agenda Inteligente</h3>
            <p>Nunca pierdas una reserva. Todo se organiza automáticamente.</p>
          </div>

          <div className={`${styles.solution} ${activeSolution === "sol2" ? styles.active : ""}`}>
            <h3>📲 Sistema Centralizado</h3>
            <p>Olvídate del caos. Todo tu negocio en un solo lugar.</p>
          </div>

          <div className={`${styles.solution} ${activeSolution === "sol3" ? styles.active : ""}`}>
            <h3>💳 Control de Ingresos</h3>
            <p>Visualiza ganancias en tiempo real, sin cálculos manuales.</p>
          </div>

          <div className={`${styles.solution} ${activeSolution === "sol4" ? styles.active : ""}`}>
            <h3>📊 Métricas Claras</h3>
            <p>Toma decisiones estratégicas con datos reales.</p>
          </div>

        </div>
      </div>
    </section>
    );
}
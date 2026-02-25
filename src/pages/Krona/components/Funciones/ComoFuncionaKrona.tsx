"use client";
import { useState } from "react";
import styles from "./ComoFuncionaKrona.module.css";

export default function ComoFunciona() {
  const [activeStep, setActiveStep] = useState("step1");
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { offsetWidth, offsetHeight } = e.currentTarget;
    const { offsetX, offsetY } = e.nativeEvent;

    const rotateY = ((offsetX / offsetWidth) - 0.5) * 15;
    const rotateX = ((offsetY / offsetHeight) - 0.5) * -15;

    setRotate({ x: rotateX, y: rotateY });
  };

  const resetRotation = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <section className={styles.howItWorks}>
      <h2>Así funciona Krona</h2>
      <p className={styles.subtitle}>
        De caos a control en solo 3 pasos.
      </p>

      <div className={styles.container}>

        {/* IZQUIERDA */}
        <div className={styles.steps}>
          <div 
            className={`${styles.step} ${activeStep === "step1" ? styles.active : ""}`}
            onMouseEnter={() => setActiveStep("step1")}
          >
            <span>01</span>
            <h4>Configura tu negocio</h4>
          </div>

          <div 
            className={`${styles.step} ${activeStep === "step2" ? styles.active : ""}`}
            onMouseEnter={() => setActiveStep("step2")}
          >
            <span>02</span>
            <h4>Recibe reservas</h4>
          </div>

          <div 
            className={`${styles.step} ${activeStep === "step3" ? styles.active : ""}`}
            onMouseEnter={() => setActiveStep("step3")}
          >
            <span>03</span>
            <h4>Analiza y crece</h4>
          </div>
        </div>

        {/* DERECHA */}
        <div
          className={styles.content}
          onMouseMove={handleMouseMove}
          onMouseLeave={resetRotation}
          style={{
            transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`
          }}
        >
          <div className={styles.particles}>
            {Array.from({ length: 50 }).map((_, i) => (
              <span key={i}></span>
            ))}
          </div>

          {/* Número holograma */}
          <div className={styles.bigNumber}>
            {activeStep === "step1" && "01"}
            {activeStep === "step2" && "02"}
            {activeStep === "step3" && "03"}
          </div>

          {activeStep === "step1" && (
            <>
              <h3>Los clientes te descubren</h3>
              <p>Tu negocio aparece visible y profesional en Krona.</p>
            </>
          )}

          {activeStep === "step2" && (
            <>
              <h3>Agendan en segundos</h3>
              <p>El sistema organiza automáticamente tu disponibilidad.</p>
            </>
          )}

          {activeStep === "step3" && (
            <>
              <h3>Gestionas y creces</h3>
              <p>Métricas, ingresos y control total en un solo lugar.</p>
            </>
          )}

        </div>

      </div>
    </section>
  );
}
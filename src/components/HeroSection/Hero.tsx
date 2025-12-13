import React from "react";
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.heroBackground}>
                <div className={`${styles.gradientOrb} ${styles.orb1}`}></div>
                <div className={`${styles.gradientOrb} ${styles.orb2}`}></div>
                <div className={styles.gridOverlay}></div>
            </div>

            <div className={styles.heroContainer}>
                <div className={styles.heroContent}>

                    <h1 className={styles.heroTitle}>
                        Impulsamos tu Negocio con
                        <span className={styles.highlight}> Soluciones Digitales Modernas</span>
                    </h1>

                    <p className={styles.heroSubtitle}>
                        En <strong>BM Code Lab</strong> ayudamos a PYMES y profesionales
                        independientes a crecer mediante desarrollo web, apps móviles,
                        integración de IA, DevOps, seguridad y soporte continuo.
                    </p>

                    <div className={styles.heroButtons}>
                        <a href="#contacto" className={styles.btnPrimary}>
                            Contáctanos
                            <svg className={styles.btnIcon} viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </a>
                        <a href="#servicios" className={styles.btnSecondary}>
                            Ver Servicios
                        </a>
                    </div>

                    <div className={styles.heroStats}>
                        <div className={styles.statItem}>
                            <div className={styles.statNumber}>50+</div>
                            <div className={styles.statLabel}>Proyectos</div>
                        </div>
                        <div className={styles.statDivider}></div>
                        <div className={styles.statItem}>
                            <div className={styles.statNumber}>98%</div>
                            <div className={styles.statLabel}>Satisfacción</div>
                        </div>
                        <div className={styles.statDivider}></div>
                        <div className={styles.statItem}>
                            <div className={styles.statNumber}>24/7</div>
                            <div className={styles.statLabel}>Soporte</div>
                        </div>
                    </div>
                </div>

                <div className={styles.heroImageContainer}>
                    <div className={`${styles.imageDecoration} ${styles.decoration1}`}></div>
                    <div className={`${styles.imageDecoration} ${styles.decoration2}`}></div>
                    <img
                        src="Blog-articulo-informatica.jpg"
                        alt="Equipo BM Code Lab"
                        className={styles.heroImage}
                    />
                    <div className={`${styles.floatingCard} ${styles.card1}`}>
                        <div className={styles.cardIcon}>⚡</div>
                        <div className={styles.cardText}>Desarrollo Rápido</div>
                    </div>
                    <div className={`${styles.floatingCard} ${styles.card2}`}>
                        <div className={styles.cardIcon}>🚀</div>
                        <div className={styles.cardText}>Innovación</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
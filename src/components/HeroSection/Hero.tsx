import React from "react";
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section id="inicio" className={styles.hero}>
            <div className={styles.heroBackground}>
                <div className={`${styles.gradientOrb} ${styles.orb1}`}></div>
                <div className={`${styles.gradientOrb} ${styles.orb2}`}></div>
                <div className={`${styles.gradientOrb} ${styles.orb3}`}></div>
                <div className={styles.gridOverlay}></div>
            </div>

            <div className={styles.heroContainer}>
                <div className={styles.heroContent}>
                    <div className={styles.heroBadge}>
                        <span className={styles.badgeDot}></span>
                        Desarrollo de software - Chile
                    </div>

                    <h1 className={styles.heroTitle}>
                        Impulsamos tu Negocio con
                        <span className={styles.highlight}> soluciones digitales modernas</span>
                    </h1>

                    <p className={styles.heroSubtitle}>
                        En <strong>BM Code Lab</strong> ayudamos a PYMES y profesionales
                        independientes a crecer mediante desarrollo web, apps moviles,
                        integracion de IA, DevOps, seguridad y soporte continuo.
                    </p>

                    <div className={styles.heroButtons}>
                        <a href="/#contacto" className={styles.btnPrimary}>
                            Nuestros trabajos
                            <svg className={styles.btnIcon} viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </a>
                        <a href="/#servicios" className={styles.btnSecondary}>
                            Ver Servicios
                        </a>
                    </div>

                    <div className={styles.heroStats}>
                        <div className={styles.statItem}>
                            <div className={styles.statNumber}>SaaS</div>
                            <div className={styles.statLabel}>Proyectos</div>
                        </div>
                        <div className={styles.statDivider}></div>
                        <div className={styles.statItem}>
                            <div className={styles.statNumber}>100%</div>
                            <div className={styles.statLabel}>Compromiso</div>
                        </div>
                        <div className={styles.statDivider}></div>
                        <div className={styles.statItem}>
                            <div className={styles.statNumber}>24/7</div>
                            <div className={styles.statLabel}>Soporte</div>
                        </div>
                    </div>
                </div>

                {/* <div className={styles.heroVisual}>
                    <div className={styles.visualGlow}></div>
                    <div className={styles.visualGlowSecondary}></div>
                    <img
                        src="/BM-imagenes/img_hero_BM.png"
                        alt="Mockup de codigo BM Code Lab"
                        className={styles.heroIllustration}
                    />
                </div> */}
            </div>
        </section>
    );
}

import React from "react";
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero}>
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
                        <a href="#contacto" className={styles.btnPrimary}>
                            Contactanos
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

                <div className={styles.heroVisual}>
                    <div className={styles.visualGlow}></div>
                    <div className={styles.visualGlowSecondary}></div>

                    <div className={`${styles.floatingCard} ${styles.card1}`}>
                        <span className={styles.cardStatusDot}></span>
                        <div className={styles.cardText}>Desarrollo rapido</div>
                    </div>

                    <div className={styles.codeWindow}>
                        <div className={styles.codeHeader}>
                            <div className={styles.windowDots}>
                                <span className={styles.windowDot}></span>
                                <span className={styles.windowDot}></span>
                                <span className={`${styles.windowDot} ${styles.windowDotActive}`}></span>
                            </div>

                            <div className={styles.codeTabs}>
                                <span className={`${styles.codeTab} ${styles.codeTabActive}`}>app.tsx</span>
                                <span className={styles.codeTab}>api.ts</span>
                                <span className={styles.codeTab}>deploy.yml</span>
                            </div>
                        </div>

                        <div className={styles.codeBody}>
                            <div className={styles.codeRow}>
                                <span className={styles.lineNumber}>1</span>
                                <span className={`${styles.codeLine} ${styles.lineWide}`}></span>
                            </div>
                            <div className={styles.codeRow}>
                                <span className={styles.lineNumber}>2</span>
                                <span className={`${styles.codeLine} ${styles.lineMedium} ${styles.lineAccent}`}></span>
                            </div>
                            <div className={styles.codeRow}>
                                <span className={styles.lineNumber}>3</span>
                                <span className={`${styles.codeLine} ${styles.lineFull} ${styles.lineMuted}`}></span>
                            </div>
                            <div className={styles.codeRow}>
                                <span className={styles.lineNumber}>4</span>
                                <span className={`${styles.codeLine} ${styles.lineLong}`}></span>
                            </div>
                            <div className={styles.codeRow}>
                                <span className={styles.lineNumber}>5</span>
                                <span className={`${styles.codeLine} ${styles.lineShort}`}></span>
                            </div>
                            <div className={styles.codeRow}>
                                <span className={styles.lineNumber}>6</span>
                                <span className={`${styles.codeLine} ${styles.lineWide} ${styles.lineSoft}`}></span>
                            </div>
                            <div className={styles.codeRow}>
                                <span className={styles.lineNumber}>7</span>
                                <span className={`${styles.codeLine} ${styles.lineFull} ${styles.lineMuted}`}></span>
                            </div>
                            <div className={styles.codeRow}>
                                <span className={styles.lineNumber}>8</span>
                                <span className={`${styles.codeLine} ${styles.lineMedium} ${styles.lineAccent}`}></span>
                            </div>
                        </div>

                        <div className={styles.metricsGrid}>
                            <div className={styles.metricCard}>
                                <div className={styles.metricValue}>99%</div>
                                <div className={styles.metricLabel}>Disponibilidad</div>
                            </div>
                            <div className={styles.metricCard}>
                                <div className={styles.metricValue}>&lt;2s</div>
                                <div className={styles.metricLabel}>Tiempo de carga</div>
                            </div>
                            <div className={styles.metricCard}>
                                <div className={styles.metricValue}>A+</div>
                                <div className={styles.metricLabel}>Seguridad</div>
                            </div>
                        </div>
                    </div>

                    <div className={`${styles.floatingCard} ${styles.card2}`}>
                        <span className={styles.cardStatusDot}></span>
                        <div className={styles.cardText}>Innovacion continua</div>
                    </div>
                </div>
            </div>
        </section>
    );
}

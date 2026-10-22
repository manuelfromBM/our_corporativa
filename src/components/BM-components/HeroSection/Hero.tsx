import Link from "next/link";
import styles from "./Hero.module.css";
import HeroTerminal from "./HeroTerminal";
import CircuitBackground from "../Circuit/CircuitBackground";

/* ── HERO ───────────────────────────────────────────────────── */

export default function Hero() {
    return (
        <section id="inicio" className={styles.hero}>
            <CircuitBackground variant="hero" />

            <div className={styles.grid}>
                <div className={styles.content}>
                    <span className={styles.badge}>BM Code Lab</span>

                    <h1 className={styles.title}>
                        Tu negocio, funcionando{" "}
                        <span className={styles.highlight}>sin que todo dependa de ti</span>
                    </h1>

                    <p className={styles.subtitle}>
                        En <strong>BM Code Lab</strong> te devolvemos tiempo, visibilidad y control.
                        Construimos tecnología que trabaja por tu empresa las 24 horas —
                        mientras tú te enfocas en lo que realmente importa.
                    </p>

                    <div className={styles.buttons}>
                        <Link href="/#contacto" className={styles.btnPrimary}>
                            Hablemos de tu proyecto →
                        </Link>
                        <Link href="/#servicios" className={styles.btnSecondary}>
                            Ver servicios
                        </Link>
                    </div>
                </div>

                <HeroTerminal />
            </div>
        </section>
    );
}

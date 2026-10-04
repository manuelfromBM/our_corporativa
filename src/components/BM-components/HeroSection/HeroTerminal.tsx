"use client";

import { useEffect, useState } from "react";
import styles from "./Hero.module.css";

const CODE_LINES = [
    "$ bmcodelab deploy --client=tu-empresa",
    "",
    "> analizando procesos manuales...",
    "> generando automatización...",
    "> conectando dashboards en tiempo real",
    "",
    "✔ 3 tareas repetitivas eliminadas",
    "✔ soporte 24/7 activado",
    "",
    "listo. tu negocio ya no depende de ti.",
];

const FULL_TEXT = CODE_LINES.join("\n");
const TYPE_DELAY = 18;
const RESTART_DELAY = 2200;

/* Terminal decorativa: escribe el mensaje caracter a caracter y reinicia en loop */
export default function HeroTerminal() {
    const [typed, setTyped] = useState(0);

    useEffect(() => {
        // Sin animación si el usuario prefiere movimiento reducido
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setTyped(FULL_TEXT.length);
            return;
        }

        let i = 0;
        let timer: ReturnType<typeof setTimeout>;

        const tick = () => {
            setTyped(i);
            if (i < FULL_TEXT.length) {
                i++;
                timer = setTimeout(tick, TYPE_DELAY);
            } else {
                i = 0;
                timer = setTimeout(tick, RESTART_DELAY);
            }
        };
        tick();

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={styles.terminalStage} aria-hidden="true">
            <div className={styles.terminal}>
                <div className={styles.terminalTop}>
                    <div className={styles.terminalDots}>
                        <span />
                        <span />
                        <span />
                    </div>
                    <span className={styles.terminalTitle}>bmcodelab.sh</span>
                    <span className={styles.live}>
                        <i className={styles.liveDot} />
                        en vivo
                    </span>
                </div>

                <div className={styles.terminalBody}>
                    {/* Texto completo invisible: reserva el alto final y evita saltos de layout */}
                    <span className={styles.terminalGhost}>{FULL_TEXT}▌</span>
                    <span className={styles.terminalTyped}>
                        {FULL_TEXT.slice(0, typed)}
                        <span className={styles.cursor}>▌</span>
                    </span>
                </div>
            </div>
        </div>
    );
}

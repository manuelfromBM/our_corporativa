"use client";

import { useEffect, useState } from "react";
import styles from "./Hero.module.css";

interface Slide {
    title: string;
    status: string;
    lines: string[];
}

const SLIDES: Slide[] = [
    {
        title: "circuito.sh",
        status: "en vivo",
        lines: [
            "$ bmcodelab run --circuito",
            "",
            "> detectando cuellos de botella...",
            "> conectando nodos del proceso...",
            "> la corriente ya fluye sola",
            "",
            "✔ automatización encendida",
            "✔ 0 tareas manuales pendientes",
            "",
            "listo. tu negocio ya enciende solo.",
        ],
    },
    {
        title: "deploy.sh",
        status: "desplegando",
        lines: [
            "$ bmcodelab deploy --client=tu-empresa",
            "",
            "> compilando tu proyecto...",
            "> ejecutando pruebas... 42/42 ok",
            "> publicando en producción...",
            "",
            "✔ sitio en línea",
            "✔ certificado SSL activo",
            "",
            "listo. tu web ya trabaja por ti.",
        ],
    },
    {
        title: "monitor.sh",
        status: "monitoreando",
        lines: [
            "$ bmcodelab monitor --24/7",
            "",
            "> uptime: 99.9%",
            "> tiempo de respuesta: 120ms",
            "> respaldos al día",
            "",
            "✔ 0 incidencias abiertas",
            "✔ soporte activo",
            "",
            "todo en orden. tú enfócate en tu negocio.",
        ],
    },
];

const TEXTS = SLIDES.map((s) => s.lines.join("\n"));
const TYPE_DELAY = 28;
const NEXT_DELAY = 2400;
const REDUCED_MOTION_DELAY = 6000;

/* Terminal estilo macOS en carrusel: escribe cada slide caracter a caracter y pasa a la siguiente */
export default function HeroTerminal() {
    const [active, setActive] = useState(0);
    const [typed, setTyped] = useState(0);

    // Cambia de slide reiniciando el texto en el mismo render (evita mostrar un trozo del texto nuevo)
    const goTo = (next: number | ((a: number) => number)) => {
        setTyped(0);
        setActive(next);
    };

    useEffect(() => {
        const text = TEXTS[active];

        // Sin animación de escritura si el usuario prefiere movimiento reducido
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setTyped(text.length);
            const t = setTimeout(() => goTo((a) => (a + 1) % SLIDES.length), REDUCED_MOTION_DELAY);
            return () => clearTimeout(t);
        }

        let i = 0;
        let timer: ReturnType<typeof setTimeout>;

        const tick = () => {
            setTyped(i);
            if (i < text.length) {
                i++;
                timer = setTimeout(tick, TYPE_DELAY);
            } else {
                timer = setTimeout(() => goTo((a) => (a + 1) % SLIDES.length), NEXT_DELAY);
            }
        };
        tick();

        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [active]);

    return (
        <div className={styles.terminalWrap}>
            <div className={styles.terminalStack} aria-hidden="true">
                {SLIDES.map((slide, i) => (
                    <div key={slide.title} className={`${styles.terminal} ${i === active ? styles.terminalActive : ""}`}>
                        <div className={styles.terminalTop}>
                            <div className={styles.terminalDots}>
                                <span /><span /><span />
                            </div>
                            <span className={styles.terminalTitle}>{slide.title}</span>
                            <span className={styles.terminalLive}>
                                <i className={styles.liveDot} />
                                {slide.status}
                            </span>
                        </div>

                        <div className={styles.terminalBody}>
                            {/* Texto completo invisible: reserva el alto final y evita saltos de layout */}
                            <span className={styles.terminalGhost}>{TEXTS[i]}▌</span>
                            <span className={styles.terminalTyped}>
                                {i === active ? TEXTS[i].slice(0, typed) : ""}
                                <span className={styles.cursor}>▌</span>
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.carouselDots}>
                {SLIDES.map((slide, i) => (
                    <button
                        key={slide.title}
                        type="button"
                        className={i === active ? styles.dotActive : ""}
                        onClick={() => i !== active && goTo(i)}
                        aria-label={`Ver terminal ${slide.title}`}
                    />
                ))}
            </div>
        </div>
    );
}

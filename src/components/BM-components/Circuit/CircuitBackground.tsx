import { forwardRef } from "react";
import styles from "./Circuit.module.css";

type Joint = { cx: number; cy: number; delay?: string };

interface CircuitLayout {
    viewBox: string;
    /* Traza superior (corriente verde) e inferior (corriente azul) */
    mainA: string;
    mainB: string;
    /* Trazas verticales decorativas, sin corriente */
    branches: string[];
    /* delay = tiempo que tarda la corriente en llegar a cada nodo */
    jointsA: Joint[];
    jointsB: Joint[];
    jointsIdle: Joint[];
}

const LAYOUTS: Record<"hero" | "section", CircuitLayout> = {
    hero: {
        viewBox: "0 0 1200 700",
        mainA: "M0 140 H180 L220 180 H420 L460 140 H760 L800 180 H1200",
        mainB: "M0 560 H160 L200 520 H480 L520 560 H860 L900 520 H1200",
        branches: [
            "M120 0 V100 L160 140 V260",
            "M1040 0 V120 L1000 160 V320",
            "M300 700 V600 L340 560 V460",
            "M900 700 V580 L860 540 V420",
        ],
        jointsA: [
            { cx: 0, cy: 140, delay: "0s" },
            { cx: 180, cy: 140, delay: "0.86s" },
            { cx: 220, cy: 180, delay: "1.14s" },
            { cx: 460, cy: 140, delay: "2.37s" },
            { cx: 800, cy: 180, delay: "4.08s" },
        ],
        jointsB: [
            { cx: 0, cy: 560, delay: "1.5s" },
            { cx: 160, cy: 560, delay: "2.46s" },
            { cx: 200, cy: 520, delay: "2.8s" },
            { cx: 520, cy: 560, delay: "4.82s" },
            { cx: 900, cy: 520, delay: "7.2s" },
        ],
        jointsIdle: [
            { cx: 160, cy: 140 },
            { cx: 1000, cy: 160 },
            { cx: 340, cy: 560 },
            { cx: 860, cy: 540 },
        ],
    },
    section: {
        viewBox: "0 0 1200 500",
        mainA: "M0 100 H200 L240 140 H480 L520 100 H800 L840 140 H1200",
        mainB: "M0 400 H180 L220 360 H500 L540 400 H820 L860 360 H1200",
        branches: [
            "M140 0 V60 L180 100 V180",
            "M1060 0 V80 L1020 120 V220",
            "M320 500 V440 L360 400 V320",
            "M880 500 V460 L840 420 V340",
        ],
        jointsA: [
            { cx: 0, cy: 100, delay: "0s" },
            { cx: 200, cy: 100, delay: "0.9s" },
            { cx: 240, cy: 140, delay: "1.2s" },
            { cx: 520, cy: 100, delay: "2.5s" },
            { cx: 840, cy: 140, delay: "4.1s" },
        ],
        jointsB: [
            { cx: 0, cy: 400, delay: "1.5s" },
            { cx: 180, cy: 400, delay: "2.4s" },
            { cx: 220, cy: 360, delay: "2.7s" },
            { cx: 540, cy: 400, delay: "4.8s" },
            { cx: 860, cy: 360, delay: "7.1s" },
        ],
        jointsIdle: [
            { cx: 180, cy: 100 },
            { cx: 1020, cy: 120 },
            { cx: 360, cy: 400 },
            { cx: 840, cy: 420 },
        ],
    },
};

function Joints({ joints, className }: { joints: Joint[]; className: string }) {
    return (
        <g className={className}>
            {joints.map((j) => (
                <circle
                    key={`${j.cx}-${j.cy}`}
                    cx={j.cx}
                    cy={j.cy}
                    r="4"
                    style={j.delay ? { animationDelay: j.delay } : undefined}
                />
            ))}
        </g>
    );
}

interface Props {
    variant?: "hero" | "section";
    className?: string;
    /* Contenido extra dibujado sobre el circuito (p. ej. enlaces a los puertos del hero) */
    children?: React.ReactNode;
}

/* Fondo decorativo de circuito: trazas tipo PCB, nodos y corriente que avanza */
const CircuitBackground = forwardRef<SVGSVGElement, Props>(function CircuitBackground(
    { variant = "section", className, children },
    ref
) {
    const l = LAYOUTS[variant];

    return (
        <svg
            ref={ref}
            className={`${styles.circuit} ${className ?? ""}`}
            viewBox={l.viewBox}
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
        >
            <g className={styles.trace}>
                <path d={l.mainA} />
                <path d={l.mainB} />
                {l.branches.map((d) => (
                    <path key={d} d={d} />
                ))}
            </g>

            <path className={styles.pulse} pathLength={100} d={l.mainA} />
            <path className={`${styles.pulse} ${styles.pulseAlt}`} pathLength={100} d={l.mainB} />

            <Joints joints={l.jointsA} className={`${styles.joint} ${styles.flashA}`} />
            <Joints joints={l.jointsB} className={`${styles.joint} ${styles.flashB}`} />
            <Joints joints={l.jointsIdle} className={styles.joint} />

            {children}
        </svg>
    );
});

export default CircuitBackground;

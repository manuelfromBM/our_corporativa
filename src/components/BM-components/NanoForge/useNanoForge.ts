"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/*
 * Nano-forja: un enjambre de nanobots sale de un punto de origen (el botón),
 * se enlaza como una molécula sobre el contorno y el interior de la tarjeta
 * y después la "imprime" con una línea de escaneo.
 *
 * El canvas debe cubrir la tarjeta y el origen (puede sobresalir) y la tarjeta
 * debe estar maquetada (aunque oculta) para poder calcular los puntos de destino.
 */

export type NanoPhase = "idle" | "building" | "printing" | "built";

interface Particle {
    sx: number; sy: number;
    tx: number; ty: number;
    x: number; y: number;
    px: number; py: number;
    edge: boolean;
    delay: number;
    dur: number;
    wobble: number;
    r: number;
    color: string;
    alpha: number;
    fade: number;
}

interface Rect { x: number; y: number; w: number; h: number }

interface Options {
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
    cardRef: React.RefObject<HTMLElement | null>;
    originRef: React.RefObject<HTMLElement | null>;
    edgeStep?: number;      // separación de nanobots en el borde
    gridStep?: number;      // separación de nanobots en el interior
}

const COLORS = ["#16c47f", "#2f6fed", "#5fe3b0"];
const BOND_DIST = 26;       // distancia máxima para dibujar un enlace
const SCAN_MS = 1000;       // duración de la "impresión"

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const rand = (a: number, b: number) => a + Math.random() * (b - a);

export function useNanoForge({ canvasRef, cardRef, originRef, edgeStep = 10, gridStep = 28 }: Options) {
    const [phase, setPhase] = useState<NanoPhase>("idle");
    const rafRef = useRef<number | null>(null);

    useEffect(() => () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
    }, []);

    const build = useCallback(() => {
        const canvas = canvasRef.current;
        const card = cardRef.current;
        const origin = originRef.current;
        if (!canvas || !card || !origin) return;

        // Sin animación si el usuario prefiere movimiento reducido
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            card.style.setProperty("--scan", "100%");
            setPhase("built");
            return;
        }

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Canvas a la resolución de la pantalla
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const s = canvas.getBoundingClientRect();
        canvas.width = s.width * dpr;
        canvas.height = s.height * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const local = (el: HTMLElement): Rect => {
            const r = el.getBoundingClientRect();
            return { x: r.left - s.left, y: r.top - s.top, w: r.width, h: r.height };
        };

        const rect = local(card);
        const o = local(origin);
        const ox = o.x + o.w / 2;
        const oy = o.y + o.h / 2;

        // Puntos destino: contorno de la tarjeta + una retícula interior
        const pts: { x: number; y: number; edge: boolean }[] = [];
        for (let x = rect.x; x <= rect.x + rect.w; x += edgeStep) {
            pts.push({ x, y: rect.y, edge: true }, { x, y: rect.y + rect.h, edge: true });
        }
        for (let y = rect.y + edgeStep; y < rect.y + rect.h; y += edgeStep) {
            pts.push({ x: rect.x, y, edge: true }, { x: rect.x + rect.w, y, edge: true });
        }
        for (let x = rect.x + gridStep; x < rect.x + rect.w - gridStep / 2; x += gridStep) {
            for (let y = rect.y + gridStep; y < rect.y + rect.h - gridStep / 2; y += gridStep) {
                pts.push({ x: x + rand(-3, 3), y: y + rand(-3, 3), edge: false });
            }
        }

        const particles: Particle[] = pts.map((p) => {
            const angle = Math.random() * Math.PI * 2;
            const spread = rand(4, 30);
            const sx = ox + Math.cos(angle) * spread;
            const sy = oy + Math.sin(angle) * spread;
            return {
                sx, sy, tx: p.x, ty: p.y,
                x: sx, y: sy, px: sx, py: sy,
                edge: p.edge,
                // los del borde llegan primero: dibujan el "esqueleto" de la tarjeta
                delay: p.edge ? rand(0, 450) : rand(250, 850),
                dur: rand(900, 1350),
                wobble: rand(-70, 70),
                r: p.edge ? rand(1.4, 2) : rand(1, 1.6),
                color: COLORS[(Math.random() * COLORS.length) | 0],
                alpha: 0,
                fade: 1,
            };
        });

        const draw = (withTrails: boolean) => {
            ctx.clearRect(0, 0, s.width, s.height);
            ctx.globalCompositeOperation = "lighter";
            const live = particles.filter((p) => p.alpha * p.fade > 0.02);

            // Enlaces "moleculares": rejilla espacial para no comparar todos con todos
            const grid = new Map<string, Particle[]>();
            for (const p of live) {
                const key = `${(p.x / BOND_DIST) | 0},${(p.y / BOND_DIST) | 0}`;
                const cell = grid.get(key);
                if (cell) cell.push(p);
                else grid.set(key, [p]);
            }
            ctx.lineWidth = 0.7;
            for (const p of live) {
                const cx = (p.x / BOND_DIST) | 0;
                const cy = (p.y / BOND_DIST) | 0;
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        const cell = grid.get(`${cx + i},${cy + j}`);
                        if (!cell) continue;
                        for (const q of cell) {
                            if (q === p || q.x < p.x) continue;
                            const d = Math.hypot(q.x - p.x, q.y - p.y);
                            if (d > BOND_DIST) continue;
                            const a = (1 - d / BOND_DIST) * 0.55 * Math.min(p.alpha * p.fade, q.alpha * q.fade);
                            ctx.strokeStyle = `rgba(95, 227, 176, ${a})`;
                            ctx.beginPath();
                            ctx.moveTo(p.x, p.y);
                            ctx.lineTo(q.x, q.y);
                            ctx.stroke();
                        }
                    }
                }
            }

            for (const p of live) {
                const a = p.alpha * p.fade;
                ctx.fillStyle = p.color;
                // estela corta mientras viajan
                if (withTrails) {
                    ctx.globalAlpha = a;
                    ctx.strokeStyle = p.color;
                    ctx.lineWidth = p.r;
                    ctx.beginPath();
                    ctx.moveTo(p.px, p.py);
                    ctx.lineTo(p.x, p.y);
                    ctx.stroke();
                }
                // halo + núcleo
                ctx.globalAlpha = a * 0.18;
                ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 3.2, 0, Math.PI * 2); ctx.fill();
                ctx.globalAlpha = a;
                ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
            }
            ctx.globalAlpha = 1;
            ctx.globalCompositeOperation = "source-over";
        };

        card.style.setProperty("--scan", "0%");
        setPhase("building");

        const flightEnd = Math.max(...particles.map((p) => p.delay + p.dur));
        const t0 = performance.now();
        let printStart = 0;
        let current: NanoPhase = "building";

        const tick = (now: number) => {
            const t = now - t0;

            // ── Vuelo: trayectoria curva que se endereza al llegar ──
            for (const p of particles) {
                p.px = p.x; p.py = p.y;
                const k = Math.min(Math.max((t - p.delay) / p.dur, 0), 1);
                const e = easeInOut(k);
                const dx = p.tx - p.sx, dy = p.ty - p.sy;
                const len = Math.hypot(dx, dy) || 1;
                const bend = Math.sin(k * Math.PI) * p.wobble;
                p.x = p.sx + dx * e + (-dy / len) * bend;
                p.y = p.sy + dy * e + (dx / len) * bend;
                // pequeño temblor una vez en posición: siguen "trabajando"
                if (k === 1) {
                    p.x += Math.sin(now / 90 + p.tx) * 0.4;
                    p.y += Math.cos(now / 110 + p.ty) * 0.4;
                }
                p.alpha = k === 0 ? 0 : 1;
            }

            // ── Impresión: la línea de escaneo solidifica la tarjeta ──
            if (current === "building" && t >= flightEnd + 150) {
                current = "printing";
                printStart = now;
                setPhase("printing");
            }
            if (current === "printing") {
                const k = Math.min((now - printStart) / SCAN_MS, 1);
                card.style.setProperty("--scan", `${(k * 100).toFixed(2)}%`);
                const scanY = rect.y + rect.h * k;
                // los nanobots por encima del escaneo se "funden" con la tarjeta
                for (const p of particles) {
                    if (p.ty < scanY - 6) p.fade = Math.max(p.fade - (p.edge ? 0.025 : 0.08), p.edge ? 0.35 : 0);
                }
                if (k >= 1) {
                    current = "built";
                    setPhase("built");
                }
            }

            // ── Tras construirla, el borde de nanobots se apaga suavemente ──
            if (current === "built") {
                let alive = false;
                for (const p of particles) {
                    p.fade = Math.max(p.fade - 0.03, 0);
                    if (p.fade > 0) alive = true;
                }
                draw(false);
                if (!alive) {
                    ctx.clearRect(0, 0, s.width, s.height);
                    rafRef.current = null;
                    return;
                }
            } else {
                draw(current === "building");
            }
            rafRef.current = requestAnimationFrame(tick);
        };

        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(tick);
    }, [canvasRef, cardRef, originRef, edgeStep, gridStep]);

    return { phase, build };
}

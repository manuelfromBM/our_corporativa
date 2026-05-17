"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Trophy, Server, Gift, CheckCircle, Shield, Star } from "lucide-react";
import styles from "./Hero.module.css";


const stats = [
    { icon: Trophy,  value: "3",    label: "Ganadores" },
    { icon: Server,  value: "3",    label: "Meses hosting" },
    { icon: Gift,    value: "100%", label: "Gratuito"      },
];

const Hero = () => {
    const glowRef = useRef<HTMLDivElement>(null);

    // Efecto de brillo animado
    useEffect(() => {
        const el = glowRef.current;
        if (!el) return;

        const handleMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth  - 0.5) * 30;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            el.style.transform = `translate(calc(-50% + ${x}px), ${y}px)`;
        };
        
        window.addEventListener("mousemove", handleMove, { passive: true });
        return () => window.removeEventListener("mousemove", handleMove);
    }, []);

    return (
        <section className={styles.hero} id="inicio">
 
            {/* ── Glow background ── */}
            <div className={styles.glowLayer}>
                <div className={styles.glowMain} ref={glowRef} />
                <div className={styles.glowLeft}  />
                <div className={styles.glowRight} />
            </div>

            {/* ── Floating orbs ── */}
            <div className={`${styles.orb} ${styles.orbA}`} />
            <div className={`${styles.orb} ${styles.orbB}`} />

            {/* ── Content ── */}
            <div className={styles.content}>

                {/* Badge */}
                <div className={styles.badge}>
                    <span className={styles.badgeDot} />
                    <Gift size={16} /> Sorteo Gratuito .
                    <CheckCircle size={16} /> Sin costo ·
                    <Shield size={16} /> Sin trampa
                </div>

                {/* Heading */}
                <h1 className={styles.heading}>
                    Gana una{" "}

                    <span className={styles.gradText}>
                        Página Web<br />Profesional
                    </span>
                </h1>

                {/* Subheading */}
                <p className={styles.sub}>
                    Sabemos todo el esfuerzo que hay detrás de un emprendimiento
                    Por eso participa gratis y podrías ganar una página web profesional 
                    para mostrar tu trabajo como corresponde y llegar a más clientes.
                </p>

                {/* CTA buttons */}
                <div className={styles.btns}>
                    <Link href="#formulario" className={styles.btnPrimary}>
                        <Star size={16} /> Participa Ahora
                        <ArrowRight size={16} />
                    </Link>
                    <Link href="#premios" className={styles.btnSecondary}>
                        Ver Premios
                        <ArrowRight size={15} />
                    </Link>
                </div>

                {/* Stats */}
                <div className={styles.stats}>
                    {stats.map(({ icon: Icon, value, label }, i) => (
                        <>
                            <div className={styles.stat} key={label}>
                                <Icon size={16} className={styles.statIcon} />
                                <span className={styles.statValue}>{value}</span>
                                <span className={styles.statLabel}>{label}</span>
                            </div>
                            {i < stats.length - 1 && (
                                <div className={styles.statSep} key={`sep-${i}`} />
                            )}
                        </>
                    ))}
                </div>
                
            </div>
        </section>
    );
};

export default Hero;
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Gift, CheckCircle } from "lucide-react";
import styles from "./Hero.module.css";

const trustPoints = ["Sin costo", "3 ganadores", "Dominio incluido"];

const promoImages = [
    { src: "/Sorteo-imagenes/promo1barber.png", alt: "Ejemplo de página web ganadora para una barbería", wallClass: "wallItem1" },
    { src: "/Sorteo-imagenes/promo2pasteleria.png", alt: "Ejemplo de página web ganadora para una pastelería", wallClass: "wallItem2" },
    { src: "/Sorteo-imagenes/promo3taller.png", alt: "Ejemplo de página web ganadora para un taller", wallClass: "wallItem3" },
    { src: "/Sorteo-imagenes/promo4salon.png", alt: "Ejemplo de página web ganadora para un salón", wallClass: "wallItem4" },
] as const;

const Hero = () => {
    const glowRef = useRef<HTMLDivElement>(null);

    // Efecto de brillo animado
    useEffect(() => {
        const el = glowRef.current;
        if (!el) return;

        const handleMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 30;
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
                <div className={styles.glowLeft} />
                <div className={styles.glowRight} />
            </div>

            {/* ── Floating orbs ── */}
            <div className={`${styles.orb} ${styles.orbA}`} />
            <div className={`${styles.orb} ${styles.orbB}`} />

            {/* ── Content ── */}
            <div className={styles.content}>

                <div className={styles.textCol}>
                    {/* Eyebrow */}
                    <div className={styles.badge}>
                        <span className={styles.badgeDot} />
                        ✦ Sorteo Gratuito · 3 Ganadores
                    </div>

                    {/* Heading */}
                    <h1 className={styles.heading}>
                        Tu negocio merece<br />
                        una web profesional.<br />
                        <span className={styles.gradText}>
                            Nosotros podríamos<br />crearla gratis.
                        </span>
                    </h1>

                    {/* Subheading */}
                    <p className={styles.sub}>
                        Participa en el sorteo y gana una página web diseñada
                        especialmente para tu negocio, con dominio, publicación
                        y acompañamiento incluidos.
                    </p>

                    {/* CTA buttons */}
                    <div className={styles.btns}>
                        <Link href="#formulario" className={styles.btnPrimary}>
                            <Gift size={16} /> Quiero participar gratis
                        </Link>
                        <Link href="#premios" className={styles.btnSecondary}>
                            Ver el premio
                            <ArrowRight size={15} />
                        </Link>
                    </div>

                    {/* Trust row */}
                    <div className={styles.trustRow}>
                        {trustPoints.map((point) => (
                            <span key={point} className={styles.trustItem}>
                                <CheckCircle size={14} /> {point}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Visual: pared de fotos con ejemplos de páginas web ganadoras */}
                <div className={styles.heroVisual}>
                    <div className={styles.wallGrid}>
                        {promoImages.map((image, i) => (
                            <div
                                key={image.src}
                                className={`${styles.wallItem} ${styles[image.wallClass]}`}
                            >
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    priority={i === 0}
                                    className={styles.wallImage}
                                    sizes="(min-width: 900px) 30vw, 45vw"
                                />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Hero;

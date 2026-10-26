"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, CreditCard, BarChart3, Megaphone, MapPin, ArrowRight } from "lucide-react";
import styles from "./PromocionK.module.css";

/* Módulos tomados de la landing de Krona (/krona) */
const MODULOS = [
  { icono: CalendarDays, titulo: "Agenda inteligente", desc: "Reservas, horarios y disponibilidad en tiempo real." },
  { icono: CreditCard, titulo: "Pagos integrados", desc: "Cobra tus servicios de forma simple y profesional." },
  { icono: BarChart3, titulo: "Dashboard de métricas", desc: "Ingresos, reservas y crecimiento con datos claros." },
  { icono: Megaphone, titulo: "Feed promocional", desc: "Publica novedades y promociones para ganar visibilidad." },
  { icono: MapPin, titulo: "Descubrimiento local", desc: "Que nuevos clientes te encuentren por cercanía." },
];

export default function AppPromo() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="krona"
      ref={sectionRef}
      className={`${styles.container} ${visible ? styles.visible : ""}`}
    >
      <div className={styles.content}>

        {/* ── HERO DEL PRODUCTO ── */}
        <div className={styles.heroProducto}>
          <div className={styles.heroTexto}>
            <span className={styles.badge}>
              <Image src="/KronaLogo.jpg" alt="" width={22} height={22} className={styles.badgeLogo} />
              Producto propio · En desarrollo
            </span>

            <h2 className={styles.title}>
              Gestiona tu negocio de servicios en un solo lugar con{" "}
              <span className={styles.titleAccent}>Krona</span>.
            </h2>

            <p className={styles.subtitle}>
              Agenda, pagos, promoción y métricas en una sola plataforma diseñada
              para profesionales y pymes modernas.
            </p>

            <div className={styles.botones}>
              <Link href="/krona" className={styles.btnPrimary}>
                Conocer Krona <ArrowRight size={16} />
              </Link>
              <Link href="/krona#beta" className={styles.btnSecondary}>
                Acceso anticipado
              </Link>
            </div>
          </div>

          <div className={styles.mockup}>
            <Image
              src="/Krona-imagenes/Cliente-usando-krona.png"
              alt="Profesional usando el dashboard de Krona"
              width={1536}
              height={1024}
              sizes="(max-width: 992px) 90vw, 50vw"
            />
          </div>
        </div>

        {/* ── MÓDULOS ── */}
        <div className={styles.modulosGrid}>
          {MODULOS.map(({ icono: Icono, titulo, desc }, i) => (
            <div
              key={titulo}
              className={styles.modulo}
              style={{ "--delay": `${i * 0.08}s` } as React.CSSProperties}
            >
              <div className={styles.moduloIcono}><Icono size={22} /></div>
              <h3 className={styles.moduloTitulo}>{titulo}</h3>
              <p className={styles.moduloDesc}>{desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

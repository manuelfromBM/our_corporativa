"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";
import { sorteoAbierto } from "@/components/Sorteo-components/fechas";

const NAV_ITEMS = [
    { href: "/#inicio", label: "Inicio" },
    { href: "/#servicios", label: "Servicios" },
    { href: "/#asesoramiento", label: "Asesoramiento" },
    { href: "/#nosotros", label: "Nosotros" },
    { href: "/#krona", label: "Krona" },
    { href: "/#posteate", label: "Posteate" },
];

const NavbarPrincipal: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    // Se calcula en el cliente para que el HTML del servidor no quede con un estado viejo.
    const [sorteoActivo, setSorteoActivo] = useState(false);

    // Revisa cada 30 s para apagar el link al cerrar el sorteo, sin esperar a que se recargue la página
    useEffect(() => {
        const update = () => setSorteoActivo(sorteoAbierto());
        update();
        const interval = setInterval(update, 30_000);
        return () => clearInterval(interval);
    }, []);

    // Cierra el menú móvil al hacer scroll o al pasar a escritorio
    useEffect(() => {
        if (!menuOpen) return;
        const close = () => setMenuOpen(false);
        const onResize = () => { if (window.innerWidth > 760) close(); };
        window.addEventListener("scroll", close, { passive: true });
        window.addEventListener("resize", onResize);
        return () => {
            window.removeEventListener("scroll", close);
            window.removeEventListener("resize", onResize);
        };
    }, [menuOpen]);

    const closeMenu = () => setMenuOpen(false);

    return (
        <nav className={styles.navbar}>
            <div className={styles.inner}>
                <Link href="/" className={styles.logo} onClick={closeMenu}>
                    <span className={styles.logoBadge}>
                        <Image src="/BM-imagenes/iconoBM2.png" alt="" width={22} height={22} />
                    </span>
                    BM <span className={styles.highlight}>Code Lab</span>
                </Link>

                <button
                    type="button"
                    className={`${styles.toggle} ${menuOpen ? styles.open : ""}`}
                    onClick={() => setMenuOpen((o) => !o)}
                    aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
                    aria-expanded={menuOpen}
                    aria-controls="bm-nav-links"
                >
                    <span /><span /><span />
                </button>

                <div id="bm-nav-links" className={`${styles.links} ${menuOpen ? styles.open : ""}`}>
                    {NAV_ITEMS.map((item) => (
                        <Link key={item.href} href={item.href} className={styles.link} onClick={closeMenu}>
                            {item.label}
                        </Link>
                    ))}
                    {sorteoActivo ? (
                        <Link href="/sorteo" className={`${styles.link} ${styles.sorteo}`} onClick={closeMenu}>
                            <span className={styles.sorteoDot} aria-hidden="true" />
                            Sorteo
                        </Link>
                    ) : (
                        <span
                            className={`${styles.link} ${styles.sorteo} ${styles.sorteoOff}`}
                            aria-disabled="true"
                            title="No hay un sorteo activo"
                        >
                            <span className={styles.sorteoDot} aria-hidden="true" />
                            Sorteo
                        </span>
                    )}
                    <Link href="/#contacto" className={styles.cta} onClick={closeMenu}>
                        Contáctanos
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default NavbarPrincipal;

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";

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
                    <Link href="/#contacto" className={styles.cta} onClick={closeMenu}>
                        Contáctanos
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default NavbarPrincipal;

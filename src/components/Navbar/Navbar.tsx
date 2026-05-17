"use client";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import React, { useState, useEffect } from "react";
import styles from './Navbar.module.css';
import Link from 'next/link'

const NavbarPrincipal: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 80);
            // Cierra el menú al hacer scroll
            if (menuOpen) setMenuOpen(false);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [menuOpen]);

    // Bloquea el scroll del body cuando el menú está abierto
    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    const navItems = [
        { href: "/#inicio", label: "Inicio" },
        { href: "/#servicios", label: "Servicios" },
        { href: "/#asesoramiento", label: "Asesoramiento" },
        { href: "/#nosotros", label: "Nosotros" },
        { href: "/#krona", label: "Krona" },
    ];

    const handleNavClick = () => setMenuOpen(false);

    return (
        <>
            <Navbar className={`${styles.NavBar} ${scrolled ? styles.Scrolled : ''} ${menuOpen ? styles.MenuOpenBar : ''}`}>
                <div className={styles.NavInner}>
                    {/* Izquierda: Brand */}
                    <div className={styles.BrandContainer}>
                        <img src="/BM-imagenes/logodefinitivonav.jpeg" alt="BM Code Lab" className={styles.imgLogo} />

                    </div>

                    {/* Centro: Nav links (desktop) */}
                    <Nav className={styles.NavLinks}>
                        {navItems.map((item) => (
                            <Nav.Link
                                key={item.href}
                                href={item.href}
                                className={styles.NavLink}
                            >
                                {item.label}
                            </Nav.Link>
                        ))}
                    </Nav>

                    {/* Derecha: CTA (desktop) + Hamburger (mobile) */}
                    <div className={styles.RightSection}>
                        <Link href="/#contacto" className={styles.CTAButton} onClick={handleNavClick}>
                            Contáctanos
                        </Link>

                        <button
                            className={`${styles.HamburgerBtn} ${menuOpen ? styles.HamburgerOpen : ''}`}
                            onClick={() => setMenuOpen(!menuOpen)}
                            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
                            aria-expanded={menuOpen}
                        >
                            <span className={styles.HamburgerLine} />
                            <span className={styles.HamburgerLine} />
                            <span className={styles.HamburgerLine} />
                        </button>
                    </div>
                </div>
            </Navbar>

            {/* Mobile Dropdown Menu */}
            <div className={`${styles.MobileMenu} ${menuOpen ? styles.MobileMenuOpen : ''}`}>
                <div className={styles.MobileMenuInner}>
                    {navItems.map((item, i) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={styles.MobileNavLink}
                            style={{ animationDelay: `${i * 0.06}s` }}
                            onClick={handleNavClick}
                        >
                            {item.label}
                        </Link>
                    ))}
                    <Link
                        href="/#contacto"
                        className={styles.MobileCTAButton}
                        style={{ animationDelay: `${navItems.length * 0.06}s` }}
                        onClick={handleNavClick}
                    >
                        Contáctanos
                    </Link>
                </div>
            </div>

            {/* Backdrop */}
            {menuOpen && (
                <div
                    className={styles.MobileBackdrop}
                    onClick={() => setMenuOpen(false)}
                />
            )}
        </>
    );
};

export default NavbarPrincipal;

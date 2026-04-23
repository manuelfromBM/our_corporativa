"use client";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import React, { useState, useEffect } from "react";
import styles from './Navbar.module.css';

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
        { href: "#Inicio", label: "Inicio" },
        { href: "#Servicios", label: "Servicios" },
        { href: "#Proyectos", label: "Proyectos" },
        { href: "#Nosotros", label: "Nosotros" },
    ];

    const handleNavClick = () => setMenuOpen(false);

    return (
        <>
            <Navbar className={`${styles.NavBar} ${scrolled ? styles.Scrolled : ''} ${menuOpen ? styles.MenuOpenBar : ''}`}>
                <div className={styles.NavInner}>
                    {/* Izquierda: Brand */}
                    <div className={styles.BrandContainer}>
                        <div className={styles.LogoBadge}>BM</div>
                        <a href="#Inicio" className={styles.Brand} onClick={handleNavClick}>
                            BM <span className={styles.BrandAccent}>CODE LAB</span>
                        </a>
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
                        <a href="#Contacto" className={styles.CTAButton}>
                            Contáctanos
                        </a>

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
                        <a
                            key={item.href}
                            href={item.href}
                            className={styles.MobileNavLink}
                            style={{ animationDelay: `${i * 0.06}s` }}
                            onClick={handleNavClick}
                        >
                            {item.label}
                        </a>
                    ))}
                    <a
                        href="#Contacto"
                        className={styles.MobileCTAButton}
                        style={{ animationDelay: `${navItems.length * 0.06}s` }}
                        onClick={handleNavClick}
                    >
                        Contáctanos
                    </a>
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

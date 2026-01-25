
"use client"

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from './Navbar.module.css';

const NavbarPrincipal: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { href: "#Inicio", label: "Inicio" },
        { href: "#Krona", label: "Krona" },
        { href: "#Servicios", label: "Servicios" },
        { href: "#Nosotros", label: "Nosotros" },
        { href: "#Contacto", label: "Contacto" }
    ];

    return (
        <Navbar className={`${styles.NavBar} ${scrolled ? styles.Scrolled : ''}`}>
            <Container>
                <div className={styles.BrandContainer}>
                    <div className={styles.LogoWrapper}>
                        <Image
                            src="/img_definitive.jpeg"
                            alt="BM CODE LAB logo"
                            width={60}
                            height={60}
                            className={styles.Logo}
                            priority
                        />
                    </div>
                    <Navbar.Brand href="#home" className={styles.Brand}>
                        <span className={styles.BrandText}>BM CODE LAB</span>
                    </Navbar.Brand>
                </div>
                
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
            </Container>
        </Navbar>
    );
};

export default NavbarPrincipal;
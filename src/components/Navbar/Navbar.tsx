"use client"

//import Link from "next/link";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import React from "react";
import Image from "next/image"
import styles from './Navbar.module.css';

const NavbarPrincipal: React.FC = () => {
    return (
        <>
            <Navbar className={styles.NavBar}>
                <Container>
                    <Image
                        src="/logo3.jpg"
                        alt="logo"
                        width={60}
                        height={60}
                        style={{ borderRadius: 50 }}

                    />
                    {/* <Navbar.Brand href="#home">BM Code Lab</Navbar.Brand> */}
                    <Nav className="me-auto">
                        <Nav.Link href="#Inicio" className={styles.ItemsNav}>Inicio</Nav.Link>
                        <Nav.Link href="#Servicios" className={styles.ItemsNav}>Servicios</Nav.Link>
                        <Nav.Link href="#Nosotros" className={styles.ItemsNav}>Nosotros</Nav.Link>
                        <Nav.Link href="#Contacto" className={styles.ItemsNav}>Contacto</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}
export default NavbarPrincipal;

"use client"

//import Link from "next/link";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import React, { useState } from "react";
import Image from "next/image"
import styles from './Navbar.module.css';

const NavbarPrincipal: React.FC = () => {
    return (
        <>
            <Navbar style={{ backgroundColor: 'black' }}>
                <Container>
                    <Image
                        src="/imgCarrusel/logo.jpg"
                        alt="logo"
                        width={60}
                        height={60}
                        style={{ borderRadius: 50 }}

                    />
                    {/* <Navbar.Brand href="#home">BM Code Lab</Navbar.Brand> */}
                    <Nav className="me-auto">
                        <Nav.Link style={{ color: 'white' }}>Inicio</Nav.Link>
                        <Nav.Link style={{ color: 'white' }}>Nosotros</Nav.Link>
                        <Nav.Link style={{ color: 'white' }}>Servicios</Nav.Link>
                        <Nav.Link style={{ color: 'white' }}>Contacto</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}
export default NavbarPrincipal;

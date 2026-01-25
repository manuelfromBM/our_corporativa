"use client"

import { Container, Row, Col } from 'react-bootstrap'
import styles from './Footer.module.css'
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'

const FooterContainer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: FaGithub, href: "#", label: "GitHub" },
        { icon: FaLinkedin, href: "#", label: "LinkedIn" },
        { icon: FaTwitter, href: "#", label: "Twitter" },
    ];

    const quickLinks = [
        { href: "#Inicio", label: "Inicio" },
        { href: "#Krona", label: "Krona" },
        { href: "#Servicios", label: "Servicios" },
        { href: "#Nosotros", label: "Nosotros" },
    ];

    return (
        <footer className={styles.FooterContainer}>
            <Container>
                <Row className={styles.FooterMain}>
                    {/* Columna 1: Información de la empresa */}
                    <Col lg={4} md={6} className={styles.FooterCol}>
                        <div className={styles.BrandSection}>
                            <h5 className={styles.FooterTitle}>
                                <span className={styles.BrandGradient}>BM CODE LAB</span>
                            </h5>
                            <p className={styles.FooterDescription}>
                                Transformando ideas en soluciones digitales innovadoras. 
                                Desarrollo web y software a medida.
                            </p>
                            <div className={styles.SocialLinks}>
                                {socialLinks.map((social) => (
                                    <a 
                                        key={social.label}
                                        href={social.href} 
                                        className={styles.SocialLink}
                                        aria-label={social.label}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <social.icon />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </Col>

                    {/* Columna 2: Enlaces rápidos */}
                    <Col lg={2} md={6} className={styles.FooterCol}>
                        <h6 className={styles.FooterSubtitle}>Enlaces Rápidos</h6>
                        <ul className={styles.LinkList}>
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <a href={link.href} className={styles.FooterLink}>
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </Col>

                    {/* Columna 3: Servicios */}
                    <Col lg={3} md={6} className={styles.FooterCol}>
                        <h6 className={styles.FooterSubtitle}>Servicios</h6>
                        <ul className={styles.LinkList}>
                            <li><a href="#" className={styles.FooterLink}>Desarrollo Web</a></li>
                            <li><a href="#" className={styles.FooterLink}>Aplicaciones Móviles</a></li>
                            <li><a href="#" className={styles.FooterLink}>Consultoría IT</a></li>
                            <li><a href="#" className={styles.FooterLink}>Cloud Solutions</a></li>
                        </ul>
                    </Col>

                    {/* Columna 4: Contacto */}
                    <Col lg={3} md={6} className={styles.FooterCol}>
                        <h6 className={styles.FooterSubtitle}>Contacto</h6>
                        <div className={styles.ContactInfo}>
                            <a href="mailto:info@bmcodelab.com" className={styles.ContactItem}>
                                <FaEnvelope className={styles.ContactIcon} />
                                <span>infobmdocelab@gmail.com</span>
                            </a>
                            <a href="tel:+56912345678" className={styles.ContactItem}>
                                <FaPhone className={styles.ContactIcon} />
                                <span>+56 9 2381 2190</span>
                            </a>
                            <div className={styles.ContactItem}>
                                <FaMapMarkerAlt className={styles.ContactIcon} />
                                <span>Melipilla, Chile</span>
                            </div>
                        </div>
                    </Col>
                </Row>

                {/* Separador */}
                <div className={styles.FooterDivider}></div>

                {/* Footer Bottom */}
                <Row className={styles.FooterBottom}>
                    <Col md={6} className={styles.CopyrightCol}>
                        <p className={styles.FooterText}>
                            © {currentYear} BM Code Lab. Todos los derechos reservados.
                        </p>
                    </Col>
                    <Col md={6} className={styles.LegalLinksCol}>
                        <a href="#" className={styles.LegalLink}>Política de Privacidad</a>
                        <span className={styles.Separator}>|</span>
                        <a href="#" className={styles.LegalLink}>Términos de Servicio</a>
                        <span className={styles.Separator}>|</span>
                        <a href="#" className={styles.LegalLink}>Cookies</a>
                    </Col>
                </Row>
            </Container>

            {/* Efecto de brillo animado */}
            <div className={styles.GlowEffect}></div>
        </footer>
    )
}

export default FooterContainer
"use client"

import { Container, Row, Col } from 'react-bootstrap'
import styles from './Footer.module.css'


const FooterContainer = () => {
    return (
        <footer className={styles.FooterContainer}>
            <Container>
                <Row>
                    <Col md={6}>
                        <h5 className={styles.FooterTitle}>BM Code Lab</h5>
                        <p className={styles.FooterText}>Todos los derechos reservados © 2025</p>
                    </Col>
                    <Col md={6} className="text-md-end">
                        <a href="#" className={`${styles.FooterLink} me-3`}>Política de Privacidad</a>
                        <a href="#" className={styles.FooterLink}>Contacto</a>
                    </Col>
                </Row>
            </Container>
        </footer>
    )


}

export default FooterContainer
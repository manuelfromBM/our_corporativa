import Link from "next/link";
import Image from "next/image";
import { FaLinkedin, FaFacebook, FaEnvelope, FaPhone, FaMapMarkerAlt, FaInstagram } from "react-icons/fa";
import styles from "./Footer.module.css";

const SOCIAL_LINKS = [
    { icon: FaFacebook, href: "https://www.facebook.com/profile.php?id=61581507736516&locale=es_LA", label: "Facebook" },
    { icon: FaLinkedin, href: "#", label: "LinkedIn" },
    { icon: FaInstagram, href: "https://www.instagram.com/bm_code_lab/", label: "Instagram" },
];

const QUICK_LINKS = [
    { href: "/#inicio", label: "Inicio" },
    { href: "/#servicios", label: "Servicios" },
    { href: "/#asesoramiento", label: "Asesoramiento" },
    { href: "/#nosotros", label: "Nosotros" },
    { href: "/#krona", label: "Krona" },
];

const SERVICE_LINKS = [
    { href: "/servicios/desarrollo-web", label: "Desarrollo Web" },
    { href: "/servicios/aplicaciones-moviles", label: "Aplicaciones Móviles" },
    { href: "/servicios/consultoria-tecnica", label: "Consultoría IT" },
    { href: "/servicios/devops-hosting", label: "Cloud Solutions" },
];

const FooterContainer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <div className={styles.top}>
                    {/* Marca */}
                    <div className={styles.brand}>
                        <Link href="/" className={styles.logo}>
                            <span className={styles.logoBadge}>
                                <Image src="/BM-imagenes/iconoBM2.png" alt="" width={22} height={22} />
                            </span>
                            BM <span className={styles.highlight}>Code Lab</span>
                        </Link>
                        <p className={styles.tagline}>
                            Transformando ideas en soluciones digitales innovadoras.
                            Desarrollo web y software a medida.
                        </p>
                        <div className={styles.socials}>
                            {SOCIAL_LINKS.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    className={styles.social}
                                    aria-label={social.label}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <social.icon />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navegación */}
                    <nav className={styles.nav} aria-label="Enlaces rápidos">
                        <span className={styles.navTitle}>Navegación</span>
                        {QUICK_LINKS.map((link) => (
                            <Link key={link.href} href={link.href}>{link.label}</Link>
                        ))}
                    </nav>

                    {/* Servicios */}
                    <nav className={styles.nav} aria-label="Servicios">
                        <span className={styles.navTitle}>Servicios</span>
                        {SERVICE_LINKS.map((link) => (
                            <Link key={link.href} href={link.href}>{link.label}</Link>
                        ))}
                    </nav>

                    {/* Contacto */}
                    <div className={styles.nav}>
                        <span className={styles.navTitle}>Contacto</span>
                        <a href="mailto:infobmdocelab@gmail.com" className={styles.contactItem}>
                            <FaEnvelope className={styles.contactIcon} />
                            infobmdocelab@gmail.com
                        </a>
                        <a href="tel:+56994872535" className={styles.contactItem}>
                            <FaPhone className={styles.contactIcon} />
                            +56 9 9487 2535
                        </a>
                        <span className={styles.contactItem}>
                            <FaMapMarkerAlt className={styles.contactIcon} />
                            Melipilla, Chile
                        </span>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <span>© {currentYear} BM Code Lab. Todos los derechos reservados.</span>
                    <Link href="/#contacto" className={styles.btnPrimary}>
                        Hablemos de tu proyecto →
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default FooterContainer;

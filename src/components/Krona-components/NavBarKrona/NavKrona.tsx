import styles from "./NavKrona.module.css";

export default function NavKronaSection() {
    return (
        <section className={styles.header}>
            <div className={styles.logo}>
                <div className={styles.navsecond}>
                    <span className={styles.label}>Krona</span>
                    <ul className={styles.nav}></ul>
                    <a className={styles.cta} href="#Contacto">
                        Solicitar demo
                    </a>
                </div>
            </div>
        </section>
    )
}

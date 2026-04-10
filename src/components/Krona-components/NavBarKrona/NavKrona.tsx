"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./NavKrona.module.css";

export default function NavKrona() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>

        <div className={styles.left}>
          <Link href="/Krona" className={styles.logoWrap} aria-label="Ir al inicio de Krona">
            <Image
              src="/KronaLogo.jpg"
              alt="Logo Krona"
              width={46}
              height={46}
              className={styles.logoKrona}
            />
          </Link>
        </div>

        <div className={styles.center}>
          <Link href="/Krona" className={styles.brand} aria-label="Krona">
            <Image src="/Krona-imagenes/K.png" alt="k logo" width={46} height={46} className={styles.k} />
            <Image src="/Krona-imagenes/R.png" alt="r logo" width={46} height={46} className={styles.r} />
            <Image src="/Krona-imagenes/O.png" alt="o logo" width={46} height={46} className={styles.o} />
            <Image src="/Krona-imagenes/N.png" alt="n logo" width={46} height={46} className={styles.n} />
            <Image src="/Krona-imagenes/A.png" alt="a logo" width={46} height={46} className={styles.a} />
          </Link>
        </div>

        <div className={styles.right}>
          <Link href="#inicio" className={styles.link}>Inicio</Link>
          <Link href="#ventajas" className={styles.link}>Ventajas</Link>
          <Link href="#funciones" className={styles.link}>Funciones</Link>
          <Link href="#beta" className={styles.cta}>Beta privada</Link>
        </div>

      </nav>
    </header>
  );
}
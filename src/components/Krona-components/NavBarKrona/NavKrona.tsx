"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./NavKrona.module.css";

export default function NavKrona() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.left}>
          <div className={styles.links}>
            <Link href="#inicio" className={styles.link}>
              Inicio
            </Link>
            <Link href="#ventajas" className={styles.link}>
              Ventajas
            </Link>
            <Link href="#funciones" className={styles.link}>
              Funciones
            </Link>
          </div>
        </div>

        <div className={styles.center}>
          <Link
            href="/Krona"
            className={styles.brand}
            aria-label="Ir al inicio de Krona"
          >
            <Image
              src="/Krona-imagenes/K.png"
              alt="K"
              width={60}
              height={60}
              className={styles.k}
              priority
            />
            <Image
              src="/Krona-imagenes/R.png"
              alt="R"
              width={60}
              height={60}
              className={styles.r}
              priority
            />
            <Image
              src="/Krona-imagenes/O.png"
              alt="O"
              width={60}
              height={60}
              className={styles.o}
              priority
            />
            <Image
              src="/Krona-imagenes/N.png"
              alt="N"
              width={60}
              height={60}
              className={styles.n}
              priority
            />
            <Image
              src="/Krona-imagenes/A.png"
              alt="A"
              width={60}
              height={60}
              className={styles.a}
              priority
            />
          </Link>
        </div>

        <div className={styles.right}>
          <Link href="#beta" className={styles.cta}>
            Beta privada
          </Link>
        </div>
      </nav>
    </header>
  );
}
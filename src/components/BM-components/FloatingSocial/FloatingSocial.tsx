import React from "react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import styles from "./FloatingSocial.module.css";

export default function FloatingSocial() {
    return (
        <div className={styles.stack}>
            <a
                href="https://www.instagram.com/bm_code_lab/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={`${styles.fab} ${styles.instagram}`}
            >
                <FaInstagram className={styles.icon} />
            </a>

            <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={`${styles.fab} ${styles.linkedin}`}
            >
                <FaLinkedin className={styles.icon} />
            </a>
        </div>
    );
}

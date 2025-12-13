import React from "react";
import styles from './BtnWasap.module.css'


export default function WhatsAppButton() {
    const phone = "56994872535"; // <-- tu número SIN "+"
    const message = encodeURIComponent("¡Hola! Quiero más información");

    return (
        <a
            href={`https://wa.me/${phone}?text=${message}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.fab}
        >
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                alt="WhatsApp"
                className={styles.icon}
            />
        </a>
    );
}


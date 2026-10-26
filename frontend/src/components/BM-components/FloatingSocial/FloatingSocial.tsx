"use client";

import React, { useEffect, useRef, useState } from "react";
import { FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import styles from "./FloatingSocial.module.css";

const SOCIALS = [
  {
    key: "whatsapp",
    href: `https://wa.me/56994872535?text=${encodeURIComponent("¡Hola! Quiero más información")}`,
    label: "WhatsApp",
    icon: FaWhatsapp,
    className: styles.whatsapp,
  },
  {
    key: "instagram",
    href: "https://www.instagram.com/bm_code_lab/",
    label: "Instagram",
    icon: FaInstagram,
    className: styles.instagram,
  },
  {
    key: "linkedin",
    href: "#",
    label: "LinkedIn",
    icon: FaLinkedin,
    className: styles.linkedin,
  },
];

export default function FloatingSocial() {
  const [index, setIndex] = useState(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const id = setInterval(() => {
      if (!pausedRef.current) {
        setIndex((i) => (i + 1) % SOCIALS.length);
      }
    }, 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className={styles.carousel}
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      <div className={styles.track}>
        {SOCIALS.map((s, i) => {
          const Icon = s.icon;
          const offset = i - index;
          return (
            <a
              key={s.key}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              aria-hidden={i !== index}
              tabIndex={i === index ? 0 : -1}
              className={`${styles.fab} ${s.className} ${i === index ? styles.fabActive : ""}`}
              style={{ "--offset": offset } as React.CSSProperties}
            >
              <Icon className={styles.icon} />
            </a>
          );
        })}
      </div>

      <div className={styles.dots}>
        {SOCIALS.map((s, i) => (
          <button
            key={s.key}
            type="button"
            aria-label={`Ver ${s.label}`}
            className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}

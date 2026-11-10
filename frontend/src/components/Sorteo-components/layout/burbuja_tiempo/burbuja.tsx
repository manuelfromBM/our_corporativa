"use client";

import { useEffect, useState } from "react";
import styles from "./burbuja.module.css";
import { CIERRE_SORTEO } from "../../fechas";

export default function BurbujaTiempoRestante() {
    const targetDate = CIERRE_SORTEO;

    const calculateTimeLeft = () => {
        const difference = targetDate.getTime() - new Date().getTime();

        if (difference <= 0) {
            return {
                expired: true,
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
            };
        }

        return {
            expired: false,
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / (1000 * 60)) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    };

    // Se calcula en el cliente para que el HTML del servidor no quede con un tiempo viejo.
    const [timeLeft, setTimeLeft] = useState<ReturnType<typeof calculateTimeLeft> | null>(null);

    useEffect(() => {
        const update = () => setTimeLeft(calculateTimeLeft());
        update();
        const interval = setInterval(update, 1000);

        return () => clearInterval(interval);
    }, []);

    if (!timeLeft) return null;

    const getUrgencyClass = () => {
        if (timeLeft.expired) return styles.expired;
        if (timeLeft.days <= 5) return styles.urgent;
        if (timeLeft.days <= 10) return styles.warning;
        return "";
    };

    const pad = (n: number) => n.toString().padStart(2, "0");

    return (
        <div className={`${styles.countdown} ${getUrgencyClass()}`}>
            {timeLeft.expired ? (
                <>
                    <span className={styles.title}>Sorteo</span>
                    <span className={styles.days}>0</span>
                    <span className={styles.time}>Finalizó</span>
                </>
            ) : (
                <>
                    <span className={styles.title}>Faltan</span>
                    <span className={styles.days}>{timeLeft.days}</span>
                    <span className={styles.time}>días</span>
                    <span className={styles.clock}>
                        {pad(timeLeft.hours)}h {pad(timeLeft.minutes)}m {pad(timeLeft.seconds)}s
                    </span>
                </>
            )}
        </div>
    );
}
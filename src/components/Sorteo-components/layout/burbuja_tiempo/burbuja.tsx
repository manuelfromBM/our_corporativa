"use client";

import { useEffect, useState } from "react";
import styles from "./burbuja.module.css";

export default function BurbujaTiempoRestante() {
    const targetDate = new Date("2026-07-19T23:59:59-04:00");

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

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

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
                        {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
                    </span>
                </>
            )}
        </div>
    );
}
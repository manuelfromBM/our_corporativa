"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";
import styles from "./Admin.module.css";

export default function FormularioRecuperar() {
    const [usuario, setUsuario] = useState("");
    const [error, setError] = useState("");
    const [enviando, setEnviando] = useState(false);
    const [enviado, setEnviado] = useState(false);

    async function solicitar(e: FormEvent) {
        e.preventDefault();
        setError("");
        setEnviando(true);
        try {
            const res = await fetch("/api/auth/password/forgot", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ usuario }),
            });
            if (res.ok) {
                // El backend responde igual exista o no la cuenta: nunca confirmamos el correo.
                setEnviado(true);
                return;
            }
            const data = await res.json().catch(() => ({}));
            setError(data.error ?? "No se pudo procesar la solicitud.");
        } catch {
            setError("No se pudo conectar. Intenta de nuevo.");
        }
        setEnviando(false);
    }

    if (enviado) {
        return (
            <section className={styles.pantalla}>
                <div className={styles.tarjeta}>
                    <span className={styles.etiqueta}>BM Code Lab</span>
                    <h1 className={styles.titulo}>Revisa tu correo</h1>
                    <p className={styles.texto}>
                        Si existe una cuenta asociada, te enviamos un enlace para crear una contraseña nueva.
                        El enlace vence en una hora.
                    </p>
                    <Link href="/login-bm-327" className={styles.botonSecundario}>
                        Volver al acceso
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.pantalla}>
            <form className={styles.tarjeta} onSubmit={solicitar}>
                <span className={styles.etiqueta}>BM Code Lab</span>
                <h1 className={styles.titulo}>Recupera tu contraseña</h1>
                <p className={styles.texto}>
                    Escribe tu usuario o correo y te enviaremos un enlace para crear una contraseña nueva.
                </p>

                <label className={styles.campo}>
                    Usuario o correo
                    <input
                        className={styles.input}
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        autoComplete="username"
                        autoCapitalize="none"
                        autoFocus
                        required
                    />
                </label>

                {error && <p className={styles.error} role="alert">{error}</p>}

                <button type="submit" className={styles.boton} disabled={enviando}>
                    {enviando ? "Enviando…" : "Enviar enlace"}
                </button>
                <Link href="/login-bm-327" className={styles.botonSecundario}>
                    Volver al acceso
                </Link>
            </form>
        </section>
    );
}

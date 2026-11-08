"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import styles from "./Admin.module.css";

export default function FormularioLogin() {
    const router = useRouter();
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [enviando, setEnviando] = useState(false);

    async function ingresar(e: FormEvent) {
        e.preventDefault();
        setError("");
        setEnviando(true);
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ usuario, password }),
            });
            if (res.ok) {
                router.replace("/admin");
                router.refresh();
                return;
            }
            const data = await res.json().catch(() => ({}));
            setError(res.status === 401 ? "Usuario o contraseña incorrectos." : data.error ?? "No se pudo iniciar sesión.");
        } catch {
            setError("No se pudo conectar. Intenta de nuevo.");
        }
        setEnviando(false);
    }

    return (
        <section className={styles.pantalla}>
            <form className={styles.tarjeta} onSubmit={ingresar}>
                <span className={styles.etiqueta}>BM Code Lab</span>
                <h1 className={styles.titulo}>Acceso del equipo</h1>

                <label className={styles.campo}>
                    Usuario
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
                <label className={styles.campo}>
                    Contraseña
                    <input
                        className={styles.input}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                        required
                    />
                </label>

                {error && <p className={styles.error} role="alert">{error}</p>}

                <button type="submit" className={styles.boton} disabled={enviando}>
                    {enviando ? "Ingresando…" : "Ingresar"}
                </button>
                <Link href="/recuperar-contrasena" className={styles.botonSecundario}>
                    ¿Olvidaste tu contraseña?
                </Link>
            </form>
        </section>
    );
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import styles from "./Admin.module.css";

// Debe coincidir con config.MinPasswordLength del backend.
const MIN_LARGO = 12;

export default function FormularioRestablecer({ token }: { token: string }) {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [confirmar, setConfirmar] = useState("");
    const [error, setError] = useState("");
    const [enviando, setEnviando] = useState(false);
    const [listo, setListo] = useState(false);

    if (!token) {
        return (
            <section className={styles.pantalla}>
                <div className={styles.tarjeta}>
                    <span className={styles.etiqueta}>BM Code Lab</span>
                    <h1 className={styles.titulo}>Enlace no válido</h1>
                    <p className={styles.texto}>
                        Este enlace está incompleto o ya venció. Solicita uno nuevo para continuar.
                    </p>
                    <Link href="/recuperar-contrasena" className={styles.boton}>
                        Solicitar otro enlace
                    </Link>
                </div>
            </section>
        );
    }

    async function cambiar(e: FormEvent) {
        e.preventDefault();
        setError("");

        if (password.length < MIN_LARGO) {
            setError(`La contraseña debe tener al menos ${MIN_LARGO} caracteres.`);
            return;
        }
        if (password !== confirmar) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        setEnviando(true);
        try {
            const res = await fetch("/api/auth/password/reset", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password }),
            });
            if (res.ok) {
                setListo(true);
                return;
            }
            const data = await res.json().catch(() => ({}));
            setError(data.error ?? "No se pudo cambiar la contraseña.");
        } catch {
            setError("No se pudo conectar. Intenta de nuevo.");
        }
        setEnviando(false);
    }

    if (listo) {
        return (
            <section className={styles.pantalla}>
                <div className={styles.tarjeta}>
                    <span className={styles.etiqueta}>BM Code Lab</span>
                    <h1 className={styles.titulo}>Contraseña actualizada</h1>
                    <p className={styles.texto}>
                        Ya puedes ingresar con tu contraseña nueva.
                    </p>
                    <button
                        type="button"
                        className={styles.boton}
                        onClick={() => {
                            router.replace("/login-bm-327");
                            router.refresh();
                        }}
                    >
                        Ir al acceso
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.pantalla}>
            <form className={styles.tarjeta} onSubmit={cambiar}>
                <span className={styles.etiqueta}>BM Code Lab</span>
                <h1 className={styles.titulo}>Crea una contraseña nueva</h1>
                <p className={styles.texto}>
                    Debe tener al menos {MIN_LARGO} caracteres.
                </p>

                <label className={styles.campo}>
                    Contraseña nueva
                    <input
                        className={styles.input}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password"
                        minLength={MIN_LARGO}
                        autoFocus
                        required
                    />
                </label>
                <label className={styles.campo}>
                    Repite la contraseña
                    <input
                        className={styles.input}
                        type="password"
                        value={confirmar}
                        onChange={(e) => setConfirmar(e.target.value)}
                        autoComplete="new-password"
                        minLength={MIN_LARGO}
                        required
                    />
                </label>

                {error && <p className={styles.error} role="alert">{error}</p>}

                <button type="submit" className={styles.boton} disabled={enviando}>
                    {enviando ? "Guardando…" : "Guardar contraseña"}
                </button>
            </form>
        </section>
    );
}

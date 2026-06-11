"use client";

import { useState } from "react";
import { ArrowRight, CircleCheckBig } from "lucide-react";
import styles from "./Formulario.module.css";

interface CamposFormulario {
    nombre: string;
    apellido: string;
    correo: string;
    instagram: string;
    negocio: string;
}

interface ErroresFormulario {
    nombre?: string;
    apellido?: string;
    correo?: string;
    instagram?: string;
    negocio?: string;
    envio?: string;
}

const opcionesNegocio = [
    "Barbería / Peluquería",
    "Restaurante / Café / Pastelería",
    "Estética / Belleza / Spa",
    "Tecnología / Startup",
    "Tienda / E-commerce",
    "Servicio profesional",
    "Salud / Bienestar",
    "Educación / Tutorías",
    "Otro",
];

const Formulario = () => {
    const [campos, setCampos] = useState<CamposFormulario>({
        nombre: "",
        apellido: "",
        correo: "",
        instagram: "",
        negocio: "",
    });

    const [errores, setErrores] = useState<ErroresFormulario>({});
    const [enviado, setEnviado] = useState(false);
    const [cargando, setCargando] = useState(false);

    const actualizarCampo = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setCampos((prev) => ({ ...prev, [name]: value }));
        if (errores[name as keyof ErroresFormulario]) {
            setErrores((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    const validar = (): ErroresFormulario => {
        const nuevosErrores: ErroresFormulario = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!campos.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio.";
        if (!campos.apellido.trim()) nuevosErrores.apellido = "El apellido es obligatorio.";
        if (!emailRegex.test(campos.correo)) nuevosErrores.correo = "Ingresá un correo válido.";
        if (!campos.instagram.trim()) nuevosErrores.instagram = "El usuario de Instagram es obligatorio.";
        if (!campos.negocio) nuevosErrores.negocio = "Selecciona el tipo de negocio.";

        // ← Ya no hay validación de checks

        return nuevosErrores;
    };

    const manejarEnvio = async (e: React.FormEvent) => {
        e.preventDefault();

        const nuevosErrores = validar();
        if (Object.keys(nuevosErrores).length > 0) {
            setErrores(nuevosErrores);
            return;
        }

        setCargando(true);
        setErrores({});

        try {
            const payload = {
                nombre: campos.nombre.trim(),
                apellido: campos.apellido.trim(),
                correo: campos.correo.trim(),
                usuario_instagram: campos.instagram.trim(),
                tipo_negocio: campos.negocio,
            };

            console.log("🚀 Enviando payload:", payload);

            const res = await fetch("/api/contactosorteo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            // ← Leer el body UNA sola vez
            const data = await res.json().catch(() => ({}));
            console.log("📬 Status:", res.status, "| Respuesta:", data);

            if (!res.ok) {
                throw new Error(data?.error ?? "Error al enviar el formulario.");
            }

            setEnviado(true);
        } catch (err) {
            const mensaje =
                err instanceof Error
                    ? err.message
                    : "Ocurrió un error inesperado. Intentá de nuevo.";
            setErrores({ envio: mensaje });
        } finally {
            setCargando(false);
        }
    };

    if (enviado) {
        return (
            <section className={styles.seccion} id="formulario">
                <div className={styles.resplandor}></div>
                <div className={styles.contenedor}>
                    <div className={styles.cardExito}>
                        <div className={styles.exitoIcono}>
                            <CircleCheckBig size={42} color="#22c55e" />
                        </div>
                        <h3 className={styles.exitoTitulo}>¡Participación registrada!</h3>
                        <p className={styles.exitoTexto}>
                            Tu participación fue registrada con éxito. Te notificaremos por
                            correo y anunciaremos los ganadores en Instagram.
                            <br /><br />
                            ¡Buena suerte!
                        </p>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.exitoBtn}
                        >
                            Seguir en Instagram
                            <ArrowRight size={15} />
                        </a>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.seccion} id="formulario">
            <div className={styles.resplandor} />
            <div className={styles.contenedor}>

                <div className={styles.encabezado}>
                    <div className={styles.etiquetaContainer}>
                        <span className={styles.linea}></span>
                        <span className={styles.etiqueta}>Registrate</span>
                        <span className={styles.linea}></span>
                    </div>
                    <h2 className={styles.titulo}>Participa Ahora</h2>
                    <div className={styles.divisor} />
                    <p className={styles.subtitulo}>
                        Completa el formulario y confirma que realizaste los pasos
                        para registrar tu participación.
                    </p>
                </div>

                <div className={styles.card}>
                    <form onSubmit={manejarEnvio} noValidate>

                        <div className={styles.fila}>
                            <div className={styles.grupo}>
                                <label htmlFor="nombre" className={styles.label}>
                                    Nombre <span className={styles.requerido}>*</span>
                                </label>
                                <input
                                    type="text"
                                    id="nombre"
                                    name="nombre"
                                    value={campos.nombre}
                                    onChange={actualizarCampo}
                                    placeholder="Tu nombre"
                                    autoComplete="given-name"
                                    className={`${styles.input} ${errores.nombre ? styles.inputError : ""}`}
                                />
                                {errores.nombre && <span className={styles.error}>{errores.nombre}</span>}
                            </div>

                            <div className={styles.grupo}>
                                <label htmlFor="apellido" className={styles.label}>
                                    Apellido <span className={styles.requerido}>*</span>
                                </label>
                                <input
                                    type="text"
                                    id="apellido"
                                    name="apellido"
                                    value={campos.apellido}
                                    onChange={actualizarCampo}
                                    placeholder="Tu apellido"
                                    autoComplete="family-name"
                                    className={`${styles.input} ${errores.apellido ? styles.inputError : ""}`}
                                />
                                {errores.apellido && <span className={styles.error}>{errores.apellido}</span>}
                            </div>
                        </div>

                        <div className={styles.grupo}>
                            <label htmlFor="correo" className={styles.label}>
                                Correo electrónico <span className={styles.requerido}>*</span>
                            </label>
                            <input
                                type="email"
                                id="correo"
                                name="correo"
                                value={campos.correo}
                                onChange={actualizarCampo}
                                placeholder="tu@correo.com"
                                autoComplete="email"
                                className={`${styles.input} ${errores.correo ? styles.inputError : ""}`}
                            />
                            {errores.correo && <span className={styles.error}>{errores.correo}</span>}
                        </div>

                        <div className={styles.grupo}>
                            <label htmlFor="instagram" className={styles.label}>
                                Usuario de Instagram <span className={styles.requerido}>*</span>
                            </label>
                            <input
                                type="text"
                                id="instagram"
                                name="instagram"
                                value={campos.instagram}
                                onChange={actualizarCampo}
                                placeholder="@tu_usuario"
                                className={`${styles.input} ${errores.instagram ? styles.inputError : ""}`}
                            />
                            {errores.instagram && <span className={styles.error}>{errores.instagram}</span>}
                        </div>

                        <div className={styles.grupo}>
                            <label htmlFor="negocio" className={styles.label}>
                                Tipo de negocio <span className={styles.requerido}>*</span>
                            </label>
                            <select
                                id="negocio"
                                name="negocio"
                                value={campos.negocio}
                                onChange={actualizarCampo}
                                className={`${styles.select} ${errores.negocio ? styles.inputError : ""}`}
                            >
                                <option value="">Seleccioná una opción...</option>
                                {opcionesNegocio.map((op) => (
                                    <option key={op} value={op}>{op}</option>
                                ))}
                            </select>
                            {errores.negocio && <span className={styles.error}>{errores.negocio}</span>}
                        </div>

                        {errores.envio && (
                            <p className={styles.error} style={{ marginBottom: "1rem" }}>
                                {errores.envio}
                            </p>
                        )}

                        <button type="submit" className={styles.boton} disabled={cargando}>
                            <span>{cargando ? "Enviando..." : "✦ Registrar Participación"}</span>
                            {!cargando && <ArrowRight size={16} />}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Formulario;
"use client";

import { useState } from "react";
import { ArrowRight, CircleCheckBig } from "lucide-react";
import styles from "./Formulario.module.css";
import { CamposFormulario } from "./campos";
import { ErroresFormulario } from "./campos";
import { opcionesNegocio } from "./campos";       // ya lo tenés
import ModalTerminos from "./Modal/ModalCondiciones"; // ← nuevo

const Formulario = () => {
    const [campos, setCampos] = useState<CamposFormulario>({
        nombre: "",
        apellido: "",
        correo: "",
        instagram: "",
        negocio: "",
        nombreNegocio: "",
        comuna: "",
        tieneSitio: "",
        urlSitio: "",
        terminos: "",
    });

    const [errores, setErrores] = useState<ErroresFormulario>({});
    const [enviado, setEnviado] = useState(false);
    const [cargando, setCargando] = useState(false);
/*__________________________________________________________*/
    const [modalAbierto, setModalAbierto] = useState(false);
    const [aceptaTerminos, setAceptaTerminos] = useState(false);
    const [terminosVistos, setTerminosVistos] = useState(false);
/*__________________________________________________________*/
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
        if (!emailRegex.test(campos.correo)) nuevosErrores.correo = "Ingresa un correo válido.";
        if (!campos.instagram.trim()) nuevosErrores.instagram = "El usuario de Instagram es obligatorio.";
        if (!campos.negocio) nuevosErrores.negocio = "Selecciona el tipo de negocio.";
        if (!campos.comuna) nuevosErrores.comuna = "Ingresa tu comuna"
        if (!campos.tieneSitio) nuevosErrores.tieneSitio = "Indica si tenés sitio web.";
        if (campos.tieneSitio === "si" && !campos.urlSitio.trim()) { nuevosErrores.urlSitio = "Ingresa la URL de tu sitio web."; }
        if (!campos.nombreNegocio) nuevosErrores.nombreNegocio = "Indica el nombre de tu negocio"
        if (!aceptaTerminos) nuevosErrores.terminos = "Debes aceptar los términos para participar.";
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
                nombre_negocio: campos.nombreNegocio.trim(),
                comuna: campos.comuna.trim(),
                tiene_sitio_web: campos.tieneSitio === "si",
                url_sitio_web: campos.tieneSitio === "si" ? campos.urlSitio.trim() : null,
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
                                <option value="">Selecciona una opción...</option>
                                {opcionesNegocio.map((op) => (
                                    <option key={op} value={op}>{op}</option>
                                ))}
                            </select>
                            {errores.negocio && <span className={styles.error}>{errores.negocio}</span>}
                        </div>

                        <div className={styles.grupo}>
                            <label htmlFor="nombre_negocio" className={styles.label}>
                                Nombre de tu negocio <span className={styles.requerido}>*</span>
                            </label>
                            <input
                                type="text"
                                id="nombre_negocio"
                                name="nombreNegocio"
                                value={campos.nombreNegocio}
                                onChange={actualizarCampo}
                                placeholder="El nombre de tu negocio"
                                autoComplete="given-name"
                                className={`${styles.input} ${errores.nombreNegocio ? styles.inputError : ""}`}
                            />
                            {errores.nombreNegocio && <span className={styles.error}>{errores.nombreNegocio}</span>}
                        </div>

                        <div className={styles.grupo}>
                            <label htmlFor="comuna" className={styles.label}>
                                Comuna <span className={styles.requerido}>*</span>
                            </label>
                            <input
                                type="text"
                                id="comuna"
                                name="comuna"
                                value={campos.comuna}
                                onChange={actualizarCampo}
                                placeholder="Tu comuna"
                                autoComplete="family-name"
                                className={`${styles.input} ${errores.comuna ? styles.inputError : ""}`}
                            />
                            {errores.comuna && <span className={styles.error}>{errores.comuna}</span>}
                        </div>

                        <div className={styles.grupo}>
                            <label className={styles.label}>
                                ¿Tiene sitio web actualmente? <span className={styles.requerido}>*</span>
                            </label>

                            <div className={styles.radioGroup}>
                                <label className={styles.radioLabel}>
                                    <input
                                        type="radio"
                                        name="tieneSitio"
                                        value="si"
                                        checked={campos.tieneSitio === "si"}
                                        onChange={actualizarCampo}
                                    />
                                    Sí
                                </label>
                                <label className={styles.radioLabel}>
                                    <input
                                        type="radio"
                                        name="tieneSitio"
                                        value="no"
                                        checked={campos.tieneSitio === "no"}
                                        onChange={actualizarCampo}
                                    />
                                    No
                                </label>
                            </div>

                            {errores.tieneSitio && (
                                <span className={styles.error}>{errores.tieneSitio}</span>
                            )}
                        </div>

                        {/* URL — solo si respondió "sí" */}
                        {campos.tieneSitio === "si" && (
                            <div className={styles.grupo}>
                                <label htmlFor="urlSitio" className={styles.label}>
                                    URL del sitio web <span className={styles.requerido}>*</span>
                                </label>
                                <input
                                    type="url"
                                    id="urlSitio"
                                    name="urlSitio"
                                    value={campos.urlSitio}
                                    onChange={actualizarCampo}
                                    placeholder="https://tusitio.cl"
                                    className={`${styles.input} ${errores.urlSitio ? styles.inputError : ""}`}
                                />
                                {errores.urlSitio && (
                                    <span className={styles.error}>{errores.urlSitio}</span>
                                )}
                            </div>
                        )}

                        {errores.envio && (
                            <p className={styles.error} style={{ marginBottom: "1rem" }}>
                                {errores.envio}
                            </p>
                        )}
{/*__________________________________________________________________________________*/}
                        <ModalTerminos
                            abierto={modalAbierto}
                            onCerrar={() => setModalAbierto(false)}
                        />

                        <div className={styles.grupo}>
                            <label className={`${styles.checkLabel} ${!terminosVistos ? styles.checkLabelDeshabilitado : ""}`}>
                                <input
                                    type="checkbox"
                                    checked={aceptaTerminos}
                                    disabled={!terminosVistos}
                                    onChange={(e) => {
                                        setAceptaTerminos(e.target.checked);
                                        if (errores.terminos) setErrores((prev) => ({ ...prev, terminos: undefined }));
                                    }}
                                    className={styles.checkbox}
                                />
                                <span>
                                    He leído y acepto los{" "}
                                    <button
                                        type="button"
                                        className={styles.linkTerminos}
                                        onClick={() => {
                                            setModalAbierto(true);
                                            setTerminosVistos(true);  // ← se habilita el checkbox al abrir
                                        }}
                                    >
                                        términos y condiciones
                                    </button>
                                </span>
                            </label>
                            {!terminosVistos && (
                                <span className={styles.ayuda}>Debes leer los términos antes de aceptar.</span>
                            )}
                            {errores.terminos && <span className={styles.error}>{errores.terminos}</span>}
                        </div>
{/*__________________________________________________________________________________*/}
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
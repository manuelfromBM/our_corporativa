"use client";

import { useState } from "react";
import styles from "./FormularioRegistro.module.css";
import Campo from "./Campo";
import { bloques, CampoId, ErroresRegistro, ValoresRegistro, valoresIniciales } from "./campos";
import { campoVisible, validarBloque } from "./validacion";
import { construirPayload, enviarRegistro } from "./registroApi";
import DetalleProductoSorteo from "./DetalleProductoSorteo";

const FormularioRegistro = () => {
    const [valores, setValores] = useState<ValoresRegistro>(valoresIniciales);
    const [errores, setErrores] = useState<ErroresRegistro>({});
    const [paso, setPaso] = useState(0);
    const [cargando, setCargando] = useState(false);
    const [enviado, setEnviado] = useState(false);
    // Tras registrarse se ofrece detallar el sitio web que quiere; "omitido" vuelve al mensaje de éxito.
    const [detallando, setDetallando] = useState(false);

    const bloque = bloques[paso];
    const esUltimo = paso === bloques.length - 1;

    const actualizar = (id: CampoId, valor: ValoresRegistro[CampoId]) => {
        setValores((prev) => ({ ...prev, [id]: valor }));
        if (errores[id]) setErrores((prev) => ({ ...prev, [id]: undefined }));
    };

    const bloqueValido = () => {
        const nuevosErrores = validarBloque(bloque, valores);
        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const siguiente = () => {
        if (bloqueValido()) setPaso((p) => p + 1);
    };

    const anterior = () => {
        setErrores({});
        setPaso((p) => p - 1);
    };

    const manejarEnvio = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!esUltimo) return siguiente();
        if (!bloqueValido()) return;

        setCargando(true);
        try {
            await enviarRegistro(construirPayload(valores));
            setEnviado(true);
        } catch (err) {
            setErrores({ envio: err instanceof Error ? err.message : "Ocurrió un error inesperado. Intenta de nuevo." });
        } finally {
            setCargando(false);
        }
    };

    if (enviado && detallando) {
        return (
            <DetalleProductoSorteo
                valoresIniciales={{ nombre: valores.nombreCompleto, correo: valores.correo, empresa: valores.nombreNegocio }}
                onOmitir={() => setDetallando(false)}
            />
        );
    }

    if (enviado) {
        return (
            <section className={styles.seccion}>
                <div className={styles.contenedor}>
                    <div className={`${styles.card} ${styles.exito}`}>
                        <div className={styles.exitoIcono} aria-hidden="true">✓</div>
                        <h2 className={styles.exitoTitulo}>¡Participación registrada!</h2>
                        <p className={styles.exitoTexto}>
                            Gracias, {valores.nombreCompleto}. Te contactaremos por correo y anunciaremos a los ganadores en Instagram.
                        </p>
                        <p className={styles.exitoTexto}>
                            ¿Quieres contarnos cómo sería tu sitio web? Es opcional, pero si ganas partimos con tu proyecto ya entendido.
                        </p>
                        <div className={styles.exitoAcciones}>
                            <button type="button" onClick={() => setDetallando(true)}
                                className={`${styles.boton} ${styles.botonPrimario}`}>
                                Detallar mi sitio web →
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.seccion}>
            <div className={styles.contenedor}>
                <header className={styles.encabezado}>
                    <span className={styles.etiqueta}>Sorteo</span>
                    <h1 className={styles.titulo}>Registra tu participación</h1>
                    <p className={styles.subtitulo}>
                        Completa los {bloques.length} pasos para quedar inscrito en el sorteo.
                    </p>
                </header>

                <ol className={styles.stepper}>
                    {bloques.map((b, i) => {
                        const estado = i < paso ? styles.pasoCompleto : i === paso ? styles.pasoActivo : "";
                        return (
                            <li key={b.id} className={`${styles.paso} ${estado}`} aria-current={i === paso ? "step" : undefined}>
                                <span className={styles.pasoBarra} />
                                <span>
                                    <span className={styles.pasoNumero}>{String(i + 1).padStart(2, "0")}</span>
                                    <span className={styles.pasoTexto}>{b.titulo}</span>
                                </span>
                            </li>
                        );
                    })}
                </ol>

                <div className={styles.card}>
                    <form onSubmit={manejarEnvio} noValidate>
                        <fieldset key={bloque.id} className={styles.fieldset}>
                            <span className={styles.bloqueEtiqueta}>Paso {paso + 1} de {bloques.length}</span>
                            <legend className={styles.legend}>{bloque.titulo}</legend>
                            <p className={styles.descripcion}>{bloque.descripcion}</p>

                            <div className={styles.campos}>
                                {bloque.campos
                                    .filter((campo) => campoVisible(campo, valores))
                                    .map((campo) => (
                                        <Campo
                                            key={campo.id}
                                            campo={campo}
                                            valor={valores[campo.id]}
                                            error={errores[campo.id]}
                                            onChange={(v) => actualizar(campo.id, v)}
                                        />
                                    ))}
                            </div>
                        </fieldset>

                        {errores.envio && <p className={styles.errorEnvio} role="alert">{errores.envio}</p>}

                        <div className={styles.acciones}>
                            {paso > 0 && (
                                <button type="button" onClick={anterior} disabled={cargando}
                                    className={`${styles.boton} ${styles.botonSecundario}`}>
                                    ← Anterior
                                </button>
                            )}
                            <button type="submit" disabled={cargando}
                                className={`${styles.boton} ${styles.botonPrimario}`}>
                                {esUltimo ? (cargando ? "Enviando..." : "Registrar participación") : "Siguiente →"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default FormularioRegistro;

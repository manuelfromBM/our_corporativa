"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import styles from "@/components/Requerimientos-components/FlujoRequerimientos.module.css";
import Campo from "@/components/Requerimientos-components/Campo";
import Resumen from "@/components/Requerimientos-components/Resumen";
import { ErroresFormulario, ValorCampo, ValoresFormulario } from "@/components/Requerimientos-components/tipos";
import { campoVisible, leerValor, validarPaso } from "@/components/Requerimientos-components/validacion";
import { construirPayload, construirSecciones, enviarRequerimiento } from "@/components/Requerimientos-components/requerimientosApi";
import { pasosProductoSorteo, SLUG_PRODUCTO_SORTEO, TITULO_PRODUCTO_SORTEO } from "./formularioProducto";

interface DetalleProductoSorteoProps {
    // Datos que ya entregó en el registro, para no volver a pedirlos.
    valoresIniciales: ValoresFormulario;
    // Sin onOmitir (al llegar desde el enlace del correo), "Ahora no" vuelve a /sorteo.
    onOmitir?: () => void;
}

// Mismo flujo por pasos que /cotizar, pero con un formulario fijo del sitio web del premio.
// Etapas: 0..n-1 = pasos del formulario, n = resumen.
const DetalleProductoSorteo = ({ valoresIniciales, onOmitir }: DetalleProductoSorteoProps) => {
    const pasos = pasosProductoSorteo;
    const [valores, setValores] = useState<ValoresFormulario>(valoresIniciales);
    const [errores, setErrores] = useState<ErroresFormulario>({});
    const [etapa, setEtapa] = useState(0);
    const [cargando, setCargando] = useState(false);
    const [codigo, setCodigo] = useState<string | null>(null);
    const tarjetaRef = useRef<HTMLDivElement>(null);

    const etapaResumen = pasos.length;
    const titulos = [...pasos.map((p) => p.titulo), "Resumen"];
    const total = titulos.length;
    const paso = etapa < pasos.length ? pasos[etapa] : null;

    const irA = (nueva: number) => {
        setErrores({});
        setEtapa(nueva);
        tarjetaRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const actualizar = (id: string, valor: ValorCampo) => {
        setValores((prev) => ({ ...prev, [id]: valor }));
        if (errores[id]) setErrores((prev) => ({ ...prev, [id]: undefined }));
    };

    const etapaValida = () => {
        if (!paso) return true;
        const nuevos = validarPaso(paso, valores);
        setErrores(nuevos);
        const ids = Object.keys(nuevos);
        if (ids.length) {
            document
                .querySelector<HTMLElement>(`[data-campo="${ids[0]}"] input, [data-campo="${ids[0]}"] select, [data-campo="${ids[0]}"] textarea`)
                ?.focus();
        }
        return ids.length === 0;
    };

    // El resumen pide "servicio" al tocar "Cambiar"; aquí no hay selector, así que vuelve al primer paso.
    const editarSeccion = (pasoId: string) => {
        const indice = pasos.findIndex((p) => p.id === pasoId);
        irA(Math.max(indice, 0));
    };

    const manejarEnvio = async (e: React.FormEvent) => {
        e.preventDefault();
        if (etapa < etapaResumen) {
            if (etapaValida()) irA(etapa + 1);
            return;
        }

        const invalido = pasos.findIndex((p) => Object.keys(validarPaso(p, valores)).length > 0);
        if (invalido !== -1) {
            irA(invalido);
            setErrores(validarPaso(pasos[invalido], valores));
            return;
        }

        setCargando(true);
        try {
            const payload = construirPayload(SLUG_PRODUCTO_SORTEO, pasos, valores, { sorteo: true, titulo: TITULO_PRODUCTO_SORTEO });
            const resultado = await enviarRequerimiento(payload);
            setCodigo(resultado.codigo);
        } catch (err) {
            setErrores({ envio: err instanceof Error ? err.message : "Ocurrió un error inesperado. Intenta de nuevo." });
        } finally {
            setCargando(false);
        }
    };

    if (codigo) {
        return (
            <section className={styles.seccion}>
                <div className={styles.contenedor}>
                    <div className={`${styles.card} ${styles.exito}`}>
                        <div className={styles.exitoIcono} aria-hidden="true">✓</div>
                        <h1 className={styles.exitoTitulo}>¡Guardamos el detalle de tu sitio!</h1>
                        <p className={styles.exitoTexto}>
                            Gracias, {String(valores.nombre ?? "").split(" ")[0]}. Tu código es{" "}
                            <strong className={styles.exitoCodigo}>{codigo}</strong>. Si resultas ganador, partimos desde aquí.
                        </p>
                        <div className={styles.exitoAcciones}>
                            <Link href="/" className={`${styles.boton} ${styles.botonPrimario}`}>Volver al inicio</Link>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    const progreso = Math.round((etapa / (total - 1)) * 100);
    const textoBoton = etapa === etapaResumen ? (cargando ? "Enviando..." : "Enviar detalle") : "Siguiente →";

    return (
        <section className={styles.seccion}>
            <div className={styles.contenedor}>
                <header className={styles.encabezado}>
                    <span className={styles.etiqueta}>Sorteo · Participación registrada</span>
                    <h1 className={styles.titulo}>Cuéntanos cómo sería tu sitio web</h1>
                    <p className={styles.subtitulo}>
                        Es opcional y no cambia tus chances, pero si ganas nos permite partir con tu proyecto entendido desde el primer día.
                    </p>
                </header>

                <div className={styles.progreso}>
                    <div className={styles.progresoInfo}>
                        <span>Paso {etapa + 1} de {total} · <strong>{titulos[etapa]}</strong></span>
                        <span>{progreso}%</span>
                    </div>
                    <div className={styles.progresoBarra} role="progressbar" aria-valuenow={progreso} aria-valuemin={0} aria-valuemax={100} aria-label="Avance del formulario">
                        <span style={{ width: `${progreso}%` }} />
                    </div>
                    <ol className={styles.etapas}>
                        {titulos.map((t, i) => {
                            const estado = i < etapa ? styles.etapaCompleta : i === etapa ? styles.etapaActiva : "";
                            return (
                                <li key={t} className={`${styles.etapa} ${estado}`} aria-current={i === etapa ? "step" : undefined}>
                                    {i < etapa ? (
                                        <button type="button" onClick={() => irA(i)} className={styles.etapaBoton} title={`Volver a ${t}`}>
                                            <span className={styles.etapaNum}>✓</span>
                                            <span className={styles.etapaTexto}>{t}</span>
                                        </button>
                                    ) : (
                                        <span className={styles.etapaBoton}>
                                            <span className={styles.etapaNum}>{i + 1}</span>
                                            <span className={styles.etapaTexto}>{t}</span>
                                        </span>
                                    )}
                                </li>
                            );
                        })}
                    </ol>
                </div>

                <div ref={tarjetaRef} className={styles.card}>
                    <form onSubmit={manejarEnvio} noValidate>
                        {paso && (
                            <fieldset key={paso.id} className={styles.fieldset}>
                                <span className={styles.bloqueEtiqueta}>{TITULO_PRODUCTO_SORTEO} · Paso {etapa + 1} de {total}</span>
                                <legend className={styles.legend}>{paso.titulo}</legend>
                                <p className={styles.descripcion}>{paso.descripcion}</p>
                                <div className={styles.campos}>
                                    {paso.campos
                                        .filter((campo) => campoVisible(campo, valores))
                                        .map((campo) => (
                                            <Campo
                                                key={campo.id}
                                                campo={campo}
                                                valor={leerValor(campo, valores)}
                                                error={errores[campo.id]}
                                                onChange={(v) => actualizar(campo.id, v)}
                                            />
                                        ))}
                                </div>
                            </fieldset>
                        )}

                        {etapa === etapaResumen && (
                            <fieldset className={styles.fieldset}>
                                <span className={styles.bloqueEtiqueta}>Paso {total} de {total}</span>
                                <legend className={styles.legend}>Revisa tus respuestas</legend>
                                <p className={styles.descripcion}>Confirma que todo esté bien antes de enviar. Puedes editar cualquier sección.</p>
                                <Resumen servicio={TITULO_PRODUCTO_SORTEO} secciones={construirSecciones(pasos, valores)} onEditar={editarSeccion} />
                            </fieldset>
                        )}

                        {errores.envio && <p className={styles.errorEnvio} role="alert">{errores.envio}</p>}

                        <div className={styles.acciones}>
                            {etapa > 0 ? (
                                <button type="button" onClick={() => irA(etapa - 1)} disabled={cargando}
                                    className={`${styles.boton} ${styles.botonSecundario}`}>
                                    ← Anterior
                                </button>
                            ) : onOmitir ? (
                                <button type="button" onClick={onOmitir} disabled={cargando}
                                    className={`${styles.boton} ${styles.botonSecundario}`}>
                                    Ahora no
                                </button>
                            ) : (
                                <Link href="/sorteo" className={`${styles.boton} ${styles.botonSecundario}`}>
                                    Ahora no
                                </Link>
                            )}
                            <button type="submit" disabled={cargando} className={`${styles.boton} ${styles.botonPrimario}`}>
                                {textoBoton}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default DetalleProductoSorteo;

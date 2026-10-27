"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import styles from "./FlujoRequerimientos.module.css";
import SERVICIOS from "@/components/BM-components/servicios/Servicios.data";
import Campo from "./Campo";
import SelectorServicio from "./SelectorServicio";
import Resumen from "./Resumen";
import { FORMULARIOS, pasosDelServicio } from "./formularios";
import { ErroresFormulario, ValorCampo, ValoresFormulario } from "./tipos";
import { campoVisible, leerValor, validarPaso } from "./validacion";
import { construirPayload, construirSecciones, enviarRequerimiento } from "./requerimientosApi";
import { borrarBorrador, guardarBorrador, leerBorrador } from "./borrador";

// Etapas del flujo: 0 = elegir servicio, 1..n = pasos del formulario, n + 1 = resumen.
const FlujoRequerimientos = () => {
    const searchParams = useSearchParams();
    const [servicio, setServicio] = useState("");
    const [valores, setValores] = useState<ValoresFormulario>({});
    const [errores, setErrores] = useState<ErroresFormulario>({});
    const [etapa, setEtapa] = useState(0);
    const [cargando, setCargando] = useState(false);
    const [codigo, setCodigo] = useState<string | null>(null);
    const [borradorRecuperado, setBorradorRecuperado] = useState(false);
    const [listo, setListo] = useState(false);
    const tarjetaRef = useRef<HTMLDivElement>(null);

    const pasos = useMemo(() => pasosDelServicio(servicio), [servicio]);
    const etapaResumen = pasos.length + 1;
    const titulos = ["Servicio", ...pasos.map((p) => p.titulo), "Resumen"];
    const total = servicio ? titulos.length : 1;
    const paso = etapa >= 1 && etapa <= pasos.length ? pasos[etapa - 1] : null;
    const tituloServicio = SERVICIOS.find((s) => s.slug === servicio)?.tec.titulo ?? "";

    // Al montar: recupera el borrador y/o preselecciona el servicio de ?servicio=slug
    useEffect(() => {
        const desdeUrl = searchParams.get("servicio") ?? "";
        const slugUrl = FORMULARIOS[desdeUrl] ? desdeUrl : "";
        const borrador = leerBorrador();

        if (borrador && FORMULARIOS[borrador.servicio]) {
            const mismoServicio = !slugUrl || slugUrl === borrador.servicio;
            setValores(borrador.valores);
            setServicio(slugUrl || borrador.servicio);
            setEtapa(mismoServicio ? Math.min(borrador.paso, pasosDelServicio(borrador.servicio).length + 1) : 0);
            setBorradorRecuperado(true);
        } else if (slugUrl) {
            setServicio(slugUrl);
        }
        setListo(true);
    }, [searchParams]);

    useEffect(() => {
        if (listo && !codigo && servicio) guardarBorrador({ servicio, valores, paso: etapa });
    }, [listo, codigo, servicio, valores, etapa]);

    const irA = (nueva: number) => {
        setErrores({});
        setEtapa(nueva);
        tarjetaRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const actualizar = (id: string, valor: ValorCampo) => {
        setValores((prev) => ({ ...prev, [id]: valor }));
        if (errores[id]) setErrores((prev) => ({ ...prev, [id]: undefined }));
    };

    const enfocarPrimerError = (ids: string[]) => {
        const primero = document.querySelector<HTMLElement>(
            `[data-campo="${ids[0]}"] input, [data-campo="${ids[0]}"] select, [data-campo="${ids[0]}"] textarea`,
        );
        primero?.focus();
    };

    const etapaValida = () => {
        if (etapa === 0) {
            if (servicio) return true;
            setErrores({ servicio: "Elige el servicio que necesitas." });
            return false;
        }
        if (!paso) return true;
        const nuevos = validarPaso(paso, valores);
        setErrores(nuevos);
        const ids = Object.keys(nuevos);
        if (ids.length) enfocarPrimerError(ids);
        return ids.length === 0;
    };

    const elegirServicio = (slug: string) => {
        setServicio(slug);
        setErrores({});
    };

    const editarSeccion = (pasoId: string) => {
        const indice = pasos.findIndex((p) => p.id === pasoId);
        irA(indice === -1 ? 0 : indice + 1);
    };

    const reiniciar = () => {
        borrarBorrador();
        setValores({});
        setServicio("");
        setCodigo(null);
        setBorradorRecuperado(false);
        irA(0);
    };

    const manejarEnvio = async (e: React.FormEvent) => {
        e.preventDefault();
        if (etapa < etapaResumen) {
            if (etapaValida()) irA(etapa + 1);
            return;
        }

        // Revalida todo por si se editó algo desde el resumen
        const invalido = pasos.findIndex((p) => Object.keys(validarPaso(p, valores)).length > 0);
        if (invalido !== -1) {
            irA(invalido + 1);
            setErrores(validarPaso(pasos[invalido], valores));
            return;
        }

        setCargando(true);
        try {
            const resultado = await enviarRequerimiento(construirPayload(servicio, pasos, valores));
            borrarBorrador();
            setCodigo(resultado.codigo);
        } catch (err) {
            setErrores({ envio: err instanceof Error ? err.message : "Ocurrió un error inesperado. Intenta de nuevo." });
        } finally {
            setCargando(false);
        }
    };

    if (codigo) {
        const medio = typeof valores.medioContacto === "string" ? valores.medioContacto.toLowerCase() : "el medio que elegiste";
        return (
            <section className={styles.seccion}>
                <div className={styles.contenedor}>
                    <div className={`${styles.card} ${styles.exito}`}>
                        <div className={styles.exitoIcono} aria-hidden="true">✓</div>
                        <h1 className={styles.exitoTitulo}>¡Recibimos tu solicitud!</h1>
                        <p className={styles.exitoTexto}>
                            Gracias, {String(valores.nombre ?? "").split(" ")[0]}. Tu código de seguimiento es{" "}
                            <strong className={styles.exitoCodigo}>{codigo}</strong>.
                        </p>
                        <ol className={styles.exitoPasos}>
                            <li><strong>Revisamos tus respuestas</strong> sobre {tituloServicio.toLowerCase()} en 24 a 48 horas hábiles.</li>
                            <li><strong>Te contactamos por {medio}</strong> para agendar la toma de requerimientos.</li>
                            <li><strong>Llegamos a la reunión con tu caso estudiado</strong> y una primera propuesta de alcance.</li>
                        </ol>
                        <div className={styles.exitoAcciones}>
                            <Link href="/" className={`${styles.boton} ${styles.botonSecundario}`}>Volver al inicio</Link>
                            <button type="button" onClick={reiniciar} className={`${styles.boton} ${styles.botonPrimario}`}>
                                Cotizar otro servicio
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    const progreso = servicio ? Math.round((etapa / (total - 1)) * 100) : 0;
    const textoBoton = etapa === 0 ? "Comenzar →" : etapa === etapaResumen ? (cargando ? "Enviando..." : "Enviar solicitud") : "Siguiente →";

    return (
        <section className={styles.seccion}>
            <div className={styles.contenedor}>
                <header className={styles.encabezado}>
                    <span className={styles.etiqueta}>Cotiza tu proyecto</span>
                    <h1 className={styles.titulo}>Cuéntanos qué necesitas</h1>
                    <p className={styles.subtitulo}>
                        Unos minutos aquí nos ahorran horas en la reunión: llegamos con tu caso estudiado y no partimos de cero.
                    </p>
                </header>

                {borradorRecuperado && etapa > 0 && (
                    <div className={styles.aviso} role="status">
                        <span>Retomamos tus respuestas guardadas.</span>
                        <button type="button" onClick={reiniciar} className={styles.avisoBoton}>Empezar de nuevo</button>
                    </div>
                )}

                {servicio && (
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
                )}

                <div ref={tarjetaRef} className={styles.card}>
                    <form onSubmit={manejarEnvio} noValidate>
                        {etapa === 0 && (
                            <fieldset className={styles.fieldset}>
                                {tituloServicio && <span className={styles.bloqueEtiqueta}>Paso 1 de {total}</span>}
                                <legend id="selector-label" className={styles.legend}>¿Qué servicio necesitas?</legend>
                                <p className={styles.descripcion}>
                                    Elige el que más se acerque. Según tu elección te haremos preguntas específicas; si necesitas más de uno, parte por el principal y lo conversamos en la reunión.
                                </p>
                                <SelectorServicio seleccionado={servicio} error={errores.servicio} onSeleccionar={elegirServicio} />
                            </fieldset>
                        )}

                        {paso && (
                            <fieldset key={paso.id} className={styles.fieldset}>
                                <span className={styles.bloqueEtiqueta}>{tituloServicio} · Paso {etapa + 1} de {total}</span>
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

                        {etapa === etapaResumen && servicio && (
                            <fieldset className={styles.fieldset}>
                                <span className={styles.bloqueEtiqueta}>Paso {total} de {total}</span>
                                <legend className={styles.legend}>Revisa tus respuestas</legend>
                                <p className={styles.descripcion}>Confirma que todo esté bien antes de enviar. Puedes editar cualquier sección.</p>
                                <Resumen servicio={tituloServicio} secciones={construirSecciones(pasos, valores)} onEditar={editarSeccion} />
                            </fieldset>
                        )}

                        {errores.envio && <p className={styles.errorEnvio} role="alert">{errores.envio}</p>}

                        <div className={styles.acciones}>
                            {etapa > 0 && (
                                <button type="button" onClick={() => irA(etapa - 1)} disabled={cargando}
                                    className={`${styles.boton} ${styles.botonSecundario}`}>
                                    ← Anterior
                                </button>
                            )}
                            <button type="submit" disabled={cargando} className={`${styles.boton} ${styles.botonPrimario}`}>
                                {textoBoton}
                            </button>
                        </div>
                    </form>
                </div>

                <p className={styles.nota}>Tus respuestas se guardan en este navegador hasta que envíes la solicitud.</p>
            </div>
        </section>
    );
};

export default FlujoRequerimientos;

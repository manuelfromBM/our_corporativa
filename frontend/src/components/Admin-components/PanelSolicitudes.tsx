"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { ValorCampo } from "@/components/Requerimientos-components/tipos";
import type { SolicitudGuardada } from "@/lib/requerimientosAdminApi";
import styles from "./PanelSolicitudes.module.css";

const formatoFecha = new Intl.DateTimeFormat("es-CL", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/Santiago",
});

function fecha(iso: string) {
    const d = new Date(iso);
    return Number.isNaN(d.getTime()) ? iso : formatoFecha.format(d);
}

function textoRespuesta(valor: ValorCampo) {
    if (Array.isArray(valor)) return valor.join(", ");
    if (typeof valor === "boolean") return valor ? "Sí" : "No";
    return valor;
}

// WhatsApp necesita solo dígitos (con código de país).
function enlaceWhatsapp(telefono: string) {
    return `https://wa.me/${telefono.replace(/\D/g, "")}`;
}

export default function PanelSolicitudes({ solicitudes }: { solicitudes: SolicitudGuardada[] }) {
    const [busqueda, setBusqueda] = useState("");
    const [servicio, setServicio] = useState("");
    const [origen, setOrigen] = useState<"" | "cotizar" | "sorteo">("");
    const [seleccionada, setSeleccionada] = useState<number | null>(solicitudes[0]?.id ?? null);
    // En móvil se muestra la lista o el detalle, no ambos.
    const [verDetalle, setVerDetalle] = useState(false);

    const servicios = useMemo(() => {
        const mapa = new Map<string, string>();
        solicitudes.forEach((s) => mapa.set(s.servicio.slug, s.servicio.titulo));
        return [...mapa.entries()];
    }, [solicitudes]);

    const filtradas = useMemo(() => {
        const q = busqueda.trim().toLowerCase();
        return solicitudes.filter((s) => {
            if (servicio && s.servicio.slug !== servicio) return false;
            if (origen && s.sorteo !== (origen === "sorteo")) return false;
            if (!q) return true;
            const { nombre, correo, empresa, telefono } = s.contacto;
            return [s.codigo, nombre, correo, empresa, telefono].some((v) => v.toLowerCase().includes(q));
        });
    }, [solicitudes, busqueda, servicio, origen]);

    const actual = solicitudes.find((s) => s.id === seleccionada);

    return (
        <section className={styles.seccion}>
            <header className={styles.encabezado}>
                <div>
                    <Link href="/admin" className={styles.volverPanel}>
                        ← Volver al panel
                    </Link>
                    <span className={styles.etiqueta}>Panel interno</span>
                    <h1 className={styles.titulo}>Solicitudes de cotización</h1>
                </div>
                <p className={styles.total}>
                    {solicitudes.length} {solicitudes.length === 1 ? "solicitud" : "solicitudes"}
                </p>
            </header>

            {solicitudes.length === 0 ? (
                <p className={styles.vacio}>Todavía no llega ninguna solicitud desde /cotizar.</p>
            ) : (
                <div className={`${styles.grilla} ${verDetalle ? styles.mostrandoDetalle : ""}`}>
                    <aside className={styles.lista}>
                        <div className={styles.filtros}>
                            <input
                                type="search"
                                className={styles.input}
                                placeholder="Buscar por nombre, empresa, correo o código"
                                value={busqueda}
                                onChange={(e) => setBusqueda(e.target.value)}
                            />
                            <select className={styles.input} value={servicio} onChange={(e) => setServicio(e.target.value)}>
                                <option value="">Todos los servicios</option>
                                {servicios.map(([slug, titulo]) => (
                                    <option key={slug} value={slug}>
                                        {titulo}
                                    </option>
                                ))}
                            </select>
                            <select className={styles.input} value={origen} onChange={(e) => setOrigen(e.target.value as typeof origen)}>
                                <option value="">Cotizar y sorteo</option>
                                <option value="cotizar">Solo /cotizar</option>
                                <option value="sorteo">Solo sorteo</option>
                            </select>
                        </div>

                        {filtradas.length === 0 ? (
                            <p className={styles.sinResultados}>Ninguna solicitud coincide con la búsqueda.</p>
                        ) : (
                            <ul className={styles.items}>
                                {filtradas.map((s) => (
                                    <li key={s.id}>
                                        <button
                                            type="button"
                                            className={`${styles.item} ${s.id === seleccionada ? styles.itemActivo : ""}`}
                                            onClick={() => {
                                                setSeleccionada(s.id);
                                                setVerDetalle(true);
                                            }}
                                        >
                                            <span className={styles.itemFila}>
                                                <strong className={styles.itemNombre}>{s.contacto.nombre}</strong>
                                                <span className={styles.itemFecha}>{fecha(s.creado_en)}</span>
                                            </span>
                                            <span className={styles.itemEmpresa}>{s.contacto.empresa || "Sin empresa"}</span>
                                            <span className={styles.itemFila}>
                                                <span className={styles.chip}>{s.sorteo ? "Sorteo" : s.servicio.titulo}</span>
                                                <span className={styles.codigo}>{s.codigo}</span>
                                            </span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </aside>

                    <article className={styles.detalle}>
                        {actual ? (
                            <>
                                <button type="button" className={styles.volver} onClick={() => setVerDetalle(false)}>
                                    ← Volver a la lista
                                </button>

                                <div className={styles.detalleCabecera}>
                                    <div>
                                        <span className={styles.chip}>{actual.servicio.titulo}</span>
                                        <h2 className={styles.detalleNombre}>{actual.contacto.nombre}</h2>
                                        <p className={styles.detalleMeta}>
                                            {actual.codigo} · recibida el {fecha(actual.creado_en)}
                                        </p>
                                    </div>
                                </div>

                                <dl className={styles.contacto}>
                                    <div>
                                        <dt>Correo</dt>
                                        <dd>
                                            <a href={`mailto:${actual.contacto.correo}?subject=${encodeURIComponent(`Tu solicitud ${actual.codigo}`)}`}>
                                                {actual.contacto.correo}
                                            </a>
                                        </dd>
                                    </div>
                                    <div>
                                        <dt>Teléfono</dt>
                                        <dd>
                                            {actual.contacto.telefono ? (
                                                <a href={enlaceWhatsapp(actual.contacto.telefono)} target="_blank" rel="noreferrer">
                                                    {actual.contacto.telefono}
                                                </a>
                                            ) : (
                                                "—"
                                            )}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt>Empresa</dt>
                                        <dd>{actual.contacto.empresa || "—"}</dd>
                                    </div>
                                    <div>
                                        <dt>Prefiere</dt>
                                        <dd>{actual.contacto.medio_preferido || "—"}</dd>
                                    </div>
                                </dl>

                                {actual.secciones.map((sec) => (
                                    <section key={sec.id} className={styles.bloque}>
                                        <h3 className={styles.bloqueTitulo}>{sec.titulo}</h3>
                                        <dl className={styles.respuestas}>
                                            {sec.respuestas.map((r) => (
                                                <div key={r.id} className={styles.respuesta}>
                                                    <dt>{r.pregunta}</dt>
                                                    <dd>
                                                        {Array.isArray(r.respuesta) ? (
                                                            <ul className={styles.opciones}>
                                                                {r.respuesta.map((op) => (
                                                                    <li key={op}>{op}</li>
                                                                ))}
                                                            </ul>
                                                        ) : (
                                                            textoRespuesta(r.respuesta)
                                                        )}
                                                    </dd>
                                                </div>
                                            ))}
                                        </dl>
                                    </section>
                                ))}
                            </>
                        ) : (
                            <p className={styles.sinResultados}>Elige una solicitud para ver el detalle.</p>
                        )}
                    </article>
                </div>
            )}
        </section>
    );
}

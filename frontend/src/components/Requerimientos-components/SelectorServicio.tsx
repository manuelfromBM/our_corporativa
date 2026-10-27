"use client";

import styles from "./FlujoRequerimientos.module.css";
import SERVICIOS from "@/components/BM-components/servicios/Servicios.data";
import { FORMULARIOS } from "./formularios";

interface SelectorServicioProps {
    seleccionado: string;
    error?: string;
    onSeleccionar: (slug: string) => void;
}

const SelectorServicio = ({ seleccionado, error, onSeleccionar }: SelectorServicioProps) => {
    const disponibles = SERVICIOS.filter((s) => FORMULARIOS[s.slug]);
    const formulario = FORMULARIOS[seleccionado];

    return (
        <>
            <div role="radiogroup" aria-labelledby="selector-label" aria-describedby={error ? "selector-error" : undefined}
                className={`${styles.servicios} ${error ? styles.serviciosError : ""}`}>
                {disponibles.map((s) => (
                    <label key={s.slug} className={styles.servicio}>
                        <input type="radio" name="servicio" value={s.slug} className={styles.servicioInput}
                            checked={seleccionado === s.slug} onChange={() => onSeleccionar(s.slug)} />
                        <span className={styles.servicioNum}>{s.num}</span>
                        <span className={styles.servicioTitulo}>{s.tec.titulo}</span>
                        <span className={styles.servicioDesc}>{s.cas.desc}</span>
                    </label>
                ))}
            </div>
            {error && <p id="selector-error" className={styles.errorCampo} role="alert">{error}</p>}

            {formulario && (
                <div className={styles.intro} aria-live="polite">
                    <strong>¿Qué te vamos a preguntar?</strong>
                    <p>{formulario.intro}</p>
                </div>
            )}
        </>
    );
};

export default SelectorServicio;

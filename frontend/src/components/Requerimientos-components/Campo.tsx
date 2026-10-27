"use client";

import styles from "./Campo.module.css";
import { DefinicionCampo, ValorCampo } from "./tipos";

interface CampoProps {
    campo: DefinicionCampo;
    valor: ValorCampo;
    error?: string;
    onChange: (valor: ValorCampo) => void;
}

const Campo = ({ campo, valor, error, onChange }: CampoProps) => {
    const { id, tipo, label, requerido, placeholder, ayuda, autoComplete, opciones = [] } = campo;
    const etiqueta = (
        <>
            {label}{requerido && <span className={styles.requerido} aria-hidden="true">*</span>}
        </>
    );
    const claseInput = `${styles.input} ${error ? styles.inputError : ""}`;
    const claseGrupo = `${styles.grupo} ${campo.ancho === "medio" ? styles.medio : ""}`;
    const descritoPor = [ayuda && `${id}-ayuda`, error && `${id}-error`].filter(Boolean).join(" ") || undefined;

    const renderControl = () => {
        switch (tipo) {
            case "textarea":
                return (
                    <textarea id={id} name={id} rows={4} placeholder={placeholder}
                        className={`${claseInput} ${styles.textarea}`} aria-invalid={!!error} aria-describedby={descritoPor}
                        value={valor as string} onChange={(e) => onChange(e.target.value)} />
                );
            case "select":
                return (
                    <select id={id} name={id} className={`${claseInput} ${styles.select}`}
                        aria-invalid={!!error} aria-describedby={descritoPor}
                        value={valor as string} onChange={(e) => onChange(e.target.value)}>
                        <option value="">Selecciona una opción...</option>
                        {opciones.map((op) => <option key={op} value={op}>{op}</option>)}
                    </select>
                );
            case "radio":
                return opciones.map((op) => (
                    <label key={op} className={styles.opcion}>
                        <input type="radio" name={id} value={op} className={styles.control}
                            checked={valor === op} onChange={() => onChange(op)} />
                        {op}
                    </label>
                ));
            case "checkboxGroup": {
                const seleccion = valor as string[];
                return opciones.map((op) => (
                    <label key={op} className={styles.opcion}>
                        <input type="checkbox" name={id} value={op} className={styles.control}
                            checked={seleccion.includes(op)}
                            onChange={(e) => onChange(
                                e.target.checked ? [...seleccion, op] : seleccion.filter((s) => s !== op)
                            )} />
                        {op}
                    </label>
                ));
            }
            case "checkbox":
                return null;
            default:
                return (
                    <input type={tipo} id={id} name={id} placeholder={placeholder} autoComplete={autoComplete}
                        className={claseInput} aria-invalid={!!error} aria-describedby={descritoPor}
                        value={valor as string} onChange={(e) => onChange(e.target.value)} />
                );
        }
    };

    // Un checkbox suelto lleva el label a su derecha; el resto usa label arriba.
    if (tipo === "checkbox") {
        return (
            <div className={claseGrupo} data-campo={id}>
                <label className={`${styles.confirmacion} ${error ? styles.confirmacionError : ""}`}>
                    <input type="checkbox" id={id} name={id} className={styles.control}
                        checked={valor as boolean} onChange={(e) => onChange(e.target.checked)} />
                    <span>{etiqueta}</span>
                </label>
                {error && <p id={`${id}-error`} className={styles.error} role="alert">{error}</p>}
            </div>
        );
    }

    const esGrupo = tipo === "radio" || tipo === "checkboxGroup";

    return (
        <div className={claseGrupo} data-campo={id}>
            {esGrupo
                ? <p id={`${id}-label`} className={styles.label}>
                    {etiqueta}
                    {tipo === "checkboxGroup" && <span className={styles.multiple}>Puedes marcar varias</span>}
                </p>
                : <label htmlFor={id} className={styles.label}>{etiqueta}</label>}
            {ayuda && <small id={`${id}-ayuda`} className={styles.ayuda}>{ayuda}</small>}
            {esGrupo ? (
                <div role={tipo === "radio" ? "radiogroup" : "group"} aria-labelledby={`${id}-label`} aria-describedby={descritoPor}
                    className={`${styles.opciones} ${error ? styles.opcionesError : ""}`}>
                    {renderControl()}
                </div>
            ) : renderControl()}
            {error && <p id={`${id}-error`} className={styles.error} role="alert">{error}</p>}
        </div>
    );
};

export default Campo;

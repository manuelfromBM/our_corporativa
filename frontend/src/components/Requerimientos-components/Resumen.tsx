"use client";

import styles from "./FlujoRequerimientos.module.css";
import { SeccionRespuestas } from "./requerimientosApi";
import { ValorCampo } from "./tipos";

interface ResumenProps {
    servicio: string;
    secciones: SeccionRespuestas[];
    // Lleva al paso donde está la sección para corregirla.
    onEditar: (pasoId: string) => void;
}

function Respuesta({ valor }: { valor: ValorCampo }) {
    if (typeof valor === "boolean") return <>{valor ? "Sí" : "No"}</>;
    if (Array.isArray(valor)) {
        return (
            <ul className={styles.resumenChips}>
                {valor.map((v) => <li key={v}>{v}</li>)}
            </ul>
        );
    }
    return <span className={styles.resumenTexto}>{valor}</span>;
}

const Resumen = ({ servicio, secciones, onEditar }: ResumenProps) => (
    <div className={styles.resumen}>
        <div className={styles.resumenServicio}>
            <span>Servicio</span>
            <strong>{servicio}</strong>
            <button type="button" className={styles.resumenEditar} onClick={() => onEditar("servicio")}>
                Cambiar
            </button>
        </div>

        {secciones.map((seccion) => (
            <section key={seccion.id} className={styles.resumenSeccion}>
                <header className={styles.resumenHeader}>
                    <h3>{seccion.titulo}</h3>
                    <button type="button" className={styles.resumenEditar} onClick={() => onEditar(seccion.id)}>
                        Editar
                    </button>
                </header>
                <dl className={styles.resumenLista}>
                    {seccion.respuestas.map((r) => (
                        <div key={r.id} className={styles.resumenFila}>
                            <dt>{r.pregunta}</dt>
                            <dd><Respuesta valor={r.respuesta} /></dd>
                        </div>
                    ))}
                </dl>
            </section>
        ))}
    </div>
);

export default Resumen;

"use client";

import { useState } from "react";
import { ArrowRight, Check, CircleCheckBig  } from "lucide-react";
import styles from "./Formulario.module.css";

// Tipos del formulario 
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
    checks?: string;
}

interface ChecksFormulario {
    siguioCuenta: boolean;
    compartioHistoria: boolean;
    etiqueto: boolean;
    aceptaReglas: boolean;
}

// Opciones del selector de tipo de negocio 
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

// Lista de checkboxes con su key y etiqueta
const itemsCheck = [
    { key: "siguioCuenta",      etiqueta: "Seguí la cuenta de Instagram del sorteo" },
    { key: "compartioHistoria", etiqueta: "Compartí la publicación en mis historias" },
    { key: "etiqueto",          etiqueta: "Etiqueté a 2 amigos en los comentarios" },
    { key: "aceptaReglas",      etiqueta: "Acepto las reglas del sorteo y entiendo que la participación es gratuita" },
] as const;

const Formulario = () => {
    // Estado de los campos de texto
    const [campos, setCampos] = useState<CamposFormulario>({
        nombre: "",
        apellido: "",
        correo: "",
        instagram: "",
        negocio: "",
    });

    // Estado de los checkboxes
    const [checks, setChecks] = useState<ChecksFormulario>({
        siguioCuenta: false,
        compartioHistoria: false,
        etiqueto: false,
        aceptaReglas: false,
    });

    // Estado de errores de validación 
    const [errores, setErrores] = useState<ErroresFormulario>({});

    // Estado de envío exitoso
    const [enviado, setEnviado] = useState(false);

    // Actualiza un campo de texto
    const actualizarCampo = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setCampos((prev) => ({ ...prev, [name]: value }));

        // Limpia el error del campo al escribir
        if (errores[name as keyof ErroresFormulario]) {
            setErrores((prev) => ({ ...prev, [name]: undefined }));
        }
    };

    // Actualiza un checkbox y limpia el error si es necesario
    const actualizarCheck = (key: keyof ChecksFormulario) => {
        setChecks((prev) => ({ ...prev, [key]: !prev[key] }));
        if (errores.checks) {
            setErrores((prev) => ({ ...prev, checks: undefined }));
        }
    };

    //  Valida el formulario y retorna los errores encontrados 
    const validar = (): ErroresFormulario => {
        const nuevosErrores: ErroresFormulario = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!campos.nombre.trim())    nuevosErrores.nombre    = "El nombre es obligatorio.";
        if (!campos.apellido.trim())  nuevosErrores.apellido  = "El apellido es obligatorio.";
        if (!emailRegex.test(campos.correo)) nuevosErrores.correo = "Ingresá un correo válido.";
        if (!campos.instagram.trim()) nuevosErrores.instagram = "El usuario de Instagram es obligatorio.";
        if (!campos.negocio)          nuevosErrores.negocio   = "Seleccioná el tipo de negocio.";

        // Verifica que todos los checks estén marcados
        const todosChecks = Object.values(checks).every(Boolean);
        if (!todosChecks) nuevosErrores.checks = "Debés completar todos los pasos y aceptar las reglas.";

        return nuevosErrores;
    };

    // Maneja el envío del formulario 
    const manejarEnvio = (e: React.FormEvent) => {
        e.preventDefault();
        const nuevosErrores = validar();

        if (Object.keys(nuevosErrores).length > 0) {
            setErrores(nuevosErrores);
            return;
        }

        // Aquí iría la llamada a la API o backend
        setEnviado(true);
    };

    // Vista de éxito tras el envío 
    if (enviado) {
        return (
            <section className={styles.seccion} id="formulario">
                <div className={styles.resplandor}></div>

                <div className={styles.contenedor}>

                    <div className={styles.cardExito}>
                        
                        {/* Icono de éxito */}
                        <div className={styles.exitoIcono}>
                            <CircleCheckBig size={42} color="#22c55e" />
                        </div>

                        <h3 className={styles.exitoTitulo}>
                            ¡Participación registrada!
                        </h3>

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


            {/* ── Resplandor de fondo ── */}
            <div className={styles.resplandor} />
        
            <div className={styles.contenedor}>

        
                {/* ── Encabezado centrado ── */}
                <div className={styles.encabezado}>

                    <div className={styles.etiquetaContainer}>
                        <span className={styles.linea}></span>
                        <span className={styles.etiqueta}>Registrate</span>
                        <span className={styles.linea}></span>
                    </div>
                    

                    <h2 className={styles.titulo}>Participá Ahora</h2>
                    <div className={styles.divisor} />

                    <p className={styles.subtitulo}>
                        Completá el formulario y confirmá que realizaste los pasos
                        para registrar tu participación.
                    </p>
                </div>
        
                {/* ── Card del formulario ── */}
                <div className={styles.card}>
                    <form onSubmit={manejarEnvio} noValidate>

                        {/* ── Fila: Nombre y Apellido ── */}
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
                                {errores.nombre && (
                                    <span className={styles.error}>{errores.nombre}</span>
                                )}
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
                                {errores.apellido && (
                                    <span className={styles.error}>{errores.apellido}</span>
                                )}
                            </div>
                        </div>
                          
                        {/* ── Campo: Correo electrónico ── */}
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
                            {errores.correo && (
                                <span className={styles.error}>{errores.correo}</span>
                            )}
                        </div>
                        
                        {/* ── Campo: Instagram ── */}
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
                            {errores.instagram && (
                                <span className={styles.error}>{errores.instagram}</span>
                            )}
                        </div>
                        
                        {/* ── Campo: Tipo de negocio ── */}
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
                            {errores.negocio && (
                                <span className={styles.error}>{errores.negocio}</span>
                            )}
                        </div>
                        
                        {/* ── Sección de checkboxes ── */}
                        <div className={styles.checksSeccion}>
                            <p className={styles.checksTitulo}>
                                Confirmá que completaste los pasos
                            </p>
                            
                            {itemsCheck.map(({ key, etiqueta }) => (
                                <label key={key} className={styles.checkItem}>
                                    {/* Checkbox personalizado ── */}
                                    <div
                                        className={`${styles.checkBox} ${checks[key] ? styles.checkBoxActivo : ""}`}
                                        onClick={() => actualizarCheck(key)}
                                        role="checkbox"
                                        aria-checked={checks[key]}
                                        tabIndex={0}
                                        onKeyDown={(e) => e.key === " " && actualizarCheck(key)}
                                    >
                                        {checks[key] && <Check size={11} strokeWidth={3} />}
                                    </div>

                                    {/* Texto de la etiqueta ── */}
                                    <span
                                        className={styles.checkEtiqueta}
                                        onClick={() => actualizarCheck(key)}
                                    >
                                        {etiqueta}
                                    </span>
                                </label>
                            ))}

                            {/* Error de checks ── */}
                            {errores.checks && (
                                <span className={styles.error}>{errores.checks}</span>
                            )}
                        </div>
                        
                        {/* ── Botón de envío ── */}
                        <button type="submit" className={styles.boton}>
                            <span>✦ Registrar Participación</span>
                            <ArrowRight size={16} />
                        </button>
                    </form>
                </div>
            </div>  
        </section>  
    );      
};      

export default Formulario;
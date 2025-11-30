"use client";

import React, { use } from "react"
import styles from './Contacto.module.css'
import { useState } from "react"

const SeccionContacto: React.FC = () => {

    const [form, setForm] = useState({
        nombre: "",
        email: "",
        telefono: "",
        tipoProyecto: "",
        mensaje: "",
    })

    const cambioValor = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const subidaDatos = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Formulario enviado:", form);
    };

    return (
        <div className={styles.divPrincipal}>
            <div className={styles.divTitulo}>
                <h2 className={styles.titulo}>Contacto</h2>
            </div>
            <div className={styles.divFila}>
                <div className={styles.textoGrande}>
                    <h3 className={styles.subTitulo}>¿Buscas más detalles? Hablemos</h3>
                    <p className={styles.textoPequeno}>Estamos listos para ayudarte a transformar tus ideas en soluciones tecnológicas reales. Completa el formulario y te responderemos a la brevedad.</p>
                </div>
                <div className={styles.divFormulario}>
                    <form onSubmit={subidaDatos} className={styles.formulario}>
                        <div>
                            <input
                                type="text"
                                name="nombre"
                                placeholder="Nombre"
                                value={form.nombre}
                                onChange={cambioValor}
                                className={styles.inputFormulario}
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={cambioValor}
                                className={styles.inputFormulario}
                                required
                            />
                        </div>

                        <div>
                            <input
                                type="tel"
                                name="telefono"
                                placeholder="Telefono"
                                value={form.telefono}
                                onChange={cambioValor}
                                className={styles.inputFormulario}
                            />
                        </div>

                        <div>
                            <select
                                name="tipoProyecto"
                                value={form.tipoProyecto}
                                onChange={cambioValor}
                                className={styles.inputFormulario}
                            >
                                <option value="">Selecciona una opción</option>
                                <option>Página web</option>
                                <option>App móvil</option>
                                <option>Sistema a medida</option>
                                <option>E-commerce</option>
                                <option>Consultoría</option>
                                <option>Otro</option>
                            </select>
                        </div>

                        <div>
                            <textarea
                                name="mensaje"
                                placeholder="Mensaje"
                                value={form.mensaje}
                                onChange={cambioValor}
                                className={styles.inputFormulario}
                                required
                            ></textarea>
                        </div>

                        <button type="submit" className={styles.btnFormulario}>Enviar</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SeccionContacto
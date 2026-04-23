"use client";

import { useState } from "react";
import styles from "./Contacto.module.css";

export default function SeccionContacto() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    tipoProyecto: "",
    mensaje: "",
  });

  const cambioValor = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const subidaDatos = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Formulario enviado:", form);
  };

  return (
    <section id="Contacto" className={styles.section}>
      <span id="contacto" className={styles.anchorAlias} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.header}>
          <span className={styles.eyebrow}>Hablemos</span>
          <h2 className={styles.title}>
            Tienes un proyecto <span>en mente</span>?
          </h2>
          <p className={styles.subtitle}>
            Cuentanos que necesitas y te respondemos en menos de 24 horas. Sin
            compromisos.
          </p>
        </div>

        <form onSubmit={subidaDatos} className={styles.form}>
          <div className={styles.formGrid}>
            <label className={styles.field}>
              <span className={styles.label}>Nombre</span>
              <input
                type="text"
                name="nombre"
                placeholder="Tu nombre"
                value={form.nombre}
                onChange={cambioValor}
                className={styles.input}
                required
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Email</span>
              <input
                type="email"
                name="email"
                placeholder="tu@email.com"
                value={form.email}
                onChange={cambioValor}
                className={styles.input}
                required
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Telefono</span>
              <input
                type="tel"
                name="telefono"
                placeholder="+56 9 1234 5678"
                value={form.telefono}
                onChange={cambioValor}
                className={styles.input}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Tipo de proyecto</span>
              <select
                name="tipoProyecto"
                value={form.tipoProyecto}
                onChange={cambioValor}
                className={styles.input}
              >
                <option value="">Selecciona una opcion</option>
                <option value="Pagina web">Pagina web</option>
                <option value="App movil">App movil</option>
                <option value="Sistema a medida">Sistema a medida</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Consultoria">Consultoria</option>
                <option value="Otro">Otro</option>
              </select>
            </label>

            <label className={`${styles.field} ${styles.fieldFull}`}>
              <span className={styles.label}>En que podemos ayudarte?</span>
              <textarea
                name="mensaje"
                placeholder="Describe tu proyecto..."
                value={form.mensaje}
                onChange={cambioValor}
                className={`${styles.input} ${styles.textarea}`}
                required
              />
            </label>
          </div>

          <button type="submit" className={styles.submitButton}>
            Enviar mensaje
          </button>
        </form>
      </div>
    </section>
  );
}

"use client";
import styles from "./ReseñasKrona.module.css";

export default function ReseñasKrona() {

const testimonials = [

        {
        name:"Carlos R.",
        role:"Barbería",
        text:"Antes coordinaba todo por WhatsApp. Con Krona ahora mi agenda se llena sola."
        },

        {
        name:"María L.",
        role:"Estética",
        text:"Krona me permitió ordenar mis reservas y entender cuánto gano realmente."
        },

        {
        name:"Javier M.",
        role:"Entrenador Personal",
        text:"Ahora mis clientes reservan solos y yo solo me enfoco en entrenar."
        }

    ];

    return(

        <section className={styles.testimonials}>

        <h2>Profesionales ya están cambiando su negocio</h2>

        <p className={styles.subtitle}>
        Krona está ayudando a ordenar y automatizar negocios de servicios.
        </p>

        <div className={styles.slider}>

        {testimonials.map((t,index)=>(

        <div key={index} className={styles.card}>

        <div className={styles.stars}>★★★★★</div>

        <p className={styles.text}>
        &ldquo;{t.text}&rdquo;
        </p>

        <div className={styles.user}>
        <strong>{t.name}</strong>
        <span>{t.role}</span>
        </div>

        </div>

    ))}

    </div>

    </section>

    )

}
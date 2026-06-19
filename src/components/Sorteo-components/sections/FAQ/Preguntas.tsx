"use client";

import { useState } from "react";
import styles from "./Preguntas.module.css";

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "¿Debo pagar algo para participar?",
    answer:
      "No. La participación es completamente gratuita. BM Code Lab no solicita pagos, suscripciones ni datos bancarios para participar en el sorteo.",
  },
  {
    question: "¿Qué incluye el premio?",
    answer:
      "El premio incluye el diseño y desarrollo de una página web corporativa, publicación en internet, dominio .cl por el primer año, hosting por 12 meses y acompañamiento durante el proceso.",
  },
  {
    question: "¿Qué no incluye el premio?",
    answer:
      "El premio no incluye carrito de compras, sin servidor dedicado a base de datos, integraciones avanzadas, pasarelas de pago, mantención mensual posterior ni renovación del dominio después del primer año.",
  },
  {
    question: "¿Puedo participar si aún no tengo empresa formalizada?",
    answer:
      "Sí. Puedes participar aunque tu emprendimiento esté comenzando o todavía no esté formalizado. Lo importante es que tengas un negocio, servicio, proyecto o idea que quieras mostrar de forma profesional en internet.",
  },
  {
    question: "¿Qué pasa si no tengo logo, fotos o textos?",
    answer:
      "No hay problema. En caso de ganar, te orientaremos para definir una identidad visual simple, estructura de contenido, textos básicos e imágenes adecuadas para tu página.",
  },
  {
    question: "¿Qué ocurre después de ganar?",
    answer:
      "Coordinaremos una reunión inicial para conocer tu negocio, solicitar la información necesaria y comenzar el proceso de planificación, diseño y desarrollo de tu página web.",
  },
  {
    question: "¿Puedo solicitar modificaciones?",
    answer:
      "Sí. Durante el proceso se considerarán revisiones y ajustes razonables. Cambios mayores fuera del alcance inicial podrían cotizarse aparte.",
  },
  {
    question: "¿Dónde se anunciarán los ganadores?",
    answer:
      "Los ganadores serán anunciados públicamente en nuestra cuenta oficial de Instagram, mediante una publicación o historia oficial de BM Code Lab.",
  },
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setActiveIndex((currentIndex) => (currentIndex === index ? null : index));
  };

  return (
    <section className={styles.faqSection} id="faq">
      <div className={styles.faqContainer}>
        <div className={styles.faqHeader}>
          <span className={styles.faqEyebrow}>Preguntas frecuentes</span>

          <h2 className={styles.faqTitle}>
            Dudas comunes sobre el sorteo
          </h2>

          <p className={styles.faqDescription}>
            Queremos que todo sea claro desde el principio. Revisa las preguntas
            más importantes antes de registrar tu participación.
          </p>
        </div>

        <div className={styles.faqList}>
          {faqs.map((faq, index) => {
            const isActive = activeIndex === index;

            return (
              <article
                className={`${styles.faqItem} ${
                  isActive ? styles.faqItemActive : ""
                }`}
                key={faq.question}
              >
                <button
                  className={styles.faqQuestion}
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isActive}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span>{faq.question}</span>

                  <span className={styles.faqIcon}>
                    {isActive ? "−" : "+"}
                  </span>
                </button>

                <div
                  className={styles.faqAnswerWrapper}
                  id={`faq-answer-${index}`}
                >
                  <p className={styles.faqAnswer}>{faq.answer}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
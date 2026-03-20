// "use client";
// import { useEffect, useRef, useState } from "react";
// import styles from"./BeneficiosKrona.module.css";

// export default function BeneficiosKrona() {
//   const sectionRef = useRef<HTMLDivElement>(null);
//   const [visibleRows, setVisibleRows] = useState<number[]>([]);

//   useEffect(() => {
//   const rows = sectionRef.current?.querySelectorAll(`.${styles.row}`);

//   if (!rows) return;

//   const observer = new IntersectionObserver(
//     (entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           const index = Array.from(rows).indexOf(entry.target as Element);
//           setVisibleRows((prev) =>
//             prev.includes(index) ? prev : [...prev, index]
//           );
//         }
//       });
//     },
//     { threshold: 0.2 }
//   );

//   rows.forEach((row) => observer.observe(row));

//   return () => observer.disconnect();
// }, []);

//   const data = [
//     {
//       before: "Horas coordinando manualmente cada reserva.",
//       after: "Agenda automatizada en tiempo real."
//     },
//     {
//       before: "No sabes cuánto ganas realmente al mes.",
//       after: "Control claro de ingresos y crecimiento."
//     },
//     {
//       before: "Todo gestionado en mensajes y notas sueltas.",
//       after: "Sistema centralizado en un solo lugar."
//     },
//     {
//       before: "Trabajas más, pero no escalas.",
//       after: "Crecimiento estructurado y profesional."
//     }
//   ];

//   return (
//     <section className={styles.benefits}>
//       <h2>De la improvisación al control total</h2>
//       <p className={styles.subtitle}>
//         Así cambia tu negocio cuando comienzas a usar Krona.
//       </p>

//       <div className={styles.container} ref={sectionRef}>
//         {data.map((item, index) => (
//           <div
//             key={index}
//             className={`${styles.row} ${
//               visibleRows.includes(index) ? styles.visible : ""
//             }`}
//           >
//             <div className={styles.before}>
//               <span>Sin Krona</span>
//               <p>{item.before}</p>
//             </div>

//             <div className={styles.divider}></div>

//             <div className={styles.after}>
//               <span>Con Krona</span>
//               <p>{item.after}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }
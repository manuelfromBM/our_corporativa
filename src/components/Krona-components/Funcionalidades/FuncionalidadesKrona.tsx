// "use client";
// import { useState } from "react";
// import styles from "./FuncionalidadesKrona.module.css";

// export default function FuncionalidadesKrona() {
//   const [active, setActive] = useState("agenda");

//   return (
//     <section className={styles.features}>
//       <h2>Todo lo que necesitas para gestionar tu negocio</h2>

//       <div className={styles.container}>

//         {/* LADO IZQUIERDO */}
//         <div className={styles.menu}>

//           <div
//             className={`${styles.menuItem} ${active === "agenda" ? styles.active : ""}`}
//             onMouseEnter={() => setActive("agenda")}
//           >
//             📅 Agenda Inteligente
//           </div>

//           <div
//             className={`${styles.menuItem} ${active === "pagos" ? styles.active : ""}`}
//             onMouseEnter={() => setActive("pagos")}
//           >
//             💳 Pagos Integrados
//           </div>

//           <div
//             className={`${styles.menuItem} ${active === "metricas" ? styles.active : ""}`}
//             onMouseEnter={() => setActive("metricas")}
//           >
//             📊 Dashboard de Métricas
//           </div>

//           <div
//             className={`${styles.menuItem} ${active === "feed" ? styles.active : ""}`}
//             onMouseEnter={() => setActive("feed")}
//           >
//             📰 Feed Promocional
//           </div>

//           <div
//             className={`${styles.menuItem} ${active === "mapa" ? styles.active : ""}`}
//             onMouseEnter={() => setActive("mapa")}
//           >
//             🗺️ Descubrimiento Local
//           </div>

//         </div>

//         {/* LADO DERECHO */}
//         <div className={styles.preview}>

//           {active === "agenda" && (
//             <div className={styles.card}>
//               <h3>Organización automática</h3>
//               <p>Tu disponibilidad se gestiona en tiempo real sin errores.</p>
//             </div>
//           )}

//           {active === "pagos" && (
//             <div className={styles.card}>
//               <h3>Pagos seguros y centralizados</h3>
//               <p>Cobra online y registra ingresos automáticamente.</p>
//             </div>
//           )}

//           {active === "metricas" && (
//             <div className={styles.card}>
//               <h3>Métricas claras</h3>
//               <p>Visualiza crecimiento, ingresos y rendimiento.</p>
//             </div>
//           )}

//           {active === "feed" && (
//             <div className={styles.card}>
//               <h3>Mayor visibilidad</h3>
//               <p>Promociona tus servicios dentro del ecosistema Krona.</p>
//             </div>
//           )}

//           {active === "mapa" && (
//             <div className={styles.card}>
//               <h3>Descubrimiento por ubicación</h3>
//               <p>Conecta con clientes cercanos a tu negocio.</p>
//             </div>
//           )}

//         </div>
//       </div>
//     </section>
//   );
// }
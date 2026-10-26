import styles from "./Posteate.module.css";
import CircuitBackground from "../Circuit/CircuitBackground";
import { PROBLEMAS, CANALES, FLUJO, CATEGORIAS, ETAPAS } from "./Posteate.data";

/* ── Tarjeta de ejemplo: una publicación estructurada ── */
function PostEjemplo() {
  return (
    <div className={styles.post} aria-hidden="true">
      <div className={styles.postTop}>
        <span className={styles.postDots}><i /><i /><i /></span>
        <span className={styles.postUrl}>posteate.cl/melipilla</span>
      </div>

      <div className={styles.postBody}>
        <div className={styles.postMeta}>
          <span className={styles.postCategoria}>Arriendos y propiedades</span>
          <span className={styles.postEstado}>Vigente</span>
        </div>

        <h4 className={styles.postTitulo}>Arriendo casa 3D 2B, sector centro</h4>

        <dl className={styles.postAtributos}>
          <div><dt>Precio</dt><dd>$450.000 / mes</dd></div>
          <div><dt>Ubicación</dt><dd>Melipilla centro</dd></div>
          <div><dt>Publicado</dt><dd>Hace 3 semanas</dd></div>
          <div><dt>Tipo</dt><dd>Casa</dd></div>
        </dl>

        <span className={styles.postBoton}>Contactar</span>
      </div>
    </div>
  );
}

export default function PosteateSection() {
  return (
    <section id="posteate" className={styles.section}>
      <CircuitBackground variant="section" />

      <div className={styles.container}>

        {/* ── ENCABEZADO ── */}
        <header className={styles.header}>
          <span className={styles.badge}>Producto propio · Melipilla</span>

          <h2 className={styles.title}>
            Conoce <span className={styles.highlight}>Posteate</span>
          </h2>

          <p className={styles.tagline}>
            La información local ya existe; el problema es que está dispersa.
          </p>

          <p className={styles.description}>
            Posteate es una plataforma de información y publicaciones locales que reúne en un solo
            lugar lo que hoy se comparte disperso en redes sociales, grupos y foros. No es otra red
            social: es un espacio donde la información de tu comunidad se encuentra de forma rápida,
            organizada y persistente.
          </p>
        </header>

        {/* ── PROBLEMA / SOLUCIÓN ── */}
        <div className={styles.comparativa}>
          <div className={styles.problema}>
            <span className={styles.etiqueta}>El problema</span>
            <h3 className={styles.subtitulo}>Información fragmentada</h3>

            <div className={styles.canales}>
              {CANALES.map((c) => (
                <span key={c} className={styles.canal}>{c}</span>
              ))}
            </div>

            <ul className={styles.listaProblemas}>
              {PROBLEMAS.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>

          <div className={styles.solucion}>
            <span className={`${styles.etiqueta} ${styles.etiquetaVerde}`}>La solución</span>
            <h3 className={styles.subtitulo}>Publica una vez, encuéntralo siempre</h3>
            <p className={styles.texto}>
              Cada publicación tiene precio, ubicación, categoría, estado y fecha. Así puede
              encontrarse aunque hayan pasado semanas, y su relevancia pesa más que el tamaño de la
              audiencia de quien la publica.
            </p>
            <PostEjemplo />
          </div>
        </div>

        {/* ── FLUJO ── */}
        <ol className={styles.flujo}>
          {FLUJO.map((f) => (
            <li key={f.paso} className={styles.paso}>
              <span className={styles.pasoNodo}>{f.paso}</span>
              <h4 className={styles.pasoTitulo}>{f.titulo}</h4>
              <p className={styles.pasoDesc}>{f.desc}</p>
            </li>
          ))}
        </ol>

        {/* ── CATEGORÍAS ── */}
        <div className={styles.categoriasBox}>
          <h3 className={styles.subtitulo}>¿Qué podrás encontrar?</h3>
          <div className={styles.categorias}>
            {CATEGORIAS.map((c) => (
              <span key={c} className={styles.categoria}>{c}</span>
            ))}
          </div>
        </div>

        {/* ── VISIÓN ── */}
        <div className={styles.vision}>
          <span className={styles.etiqueta}>Visión</span>
          <div className={styles.etapas}>
            {ETAPAS.map((e, i) => (
              <div key={e.titulo} className={styles.etapa}>
                <span className={`${styles.etapaNodo} ${i === 0 ? styles.etapaActiva : ""}`} />
                <h4 className={styles.etapaTitulo}>{e.titulo}</h4>
                <p className={styles.etapaDesc}>{e.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

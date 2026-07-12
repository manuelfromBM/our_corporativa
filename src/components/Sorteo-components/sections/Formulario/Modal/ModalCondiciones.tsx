"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";
import styles from "./ModalCondiciones.module.css";

interface Props {
    abierto: boolean;
    onCerrar: () => void;
}

const ModalTerminos = ({ abierto, onCerrar }: Props) => {
    useEffect(() => {
        if (abierto) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [abierto]);

    if (!abierto) return null;

    return createPortal(
        <div className={styles.overlay} onClick={onCerrar} role="dialog" aria-modal="true" aria-labelledby="modal-titulo">
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>

                <div className={styles.cabecera}>
                    <h2 id="modal-titulo" className={styles.titulo}>
                        Bases y Condiciones del Sorteo
                    </h2>
                    <button className={styles.cerrar} onClick={onCerrar} aria-label="Cerrar modal">
                        <X size={20} />
                    </button>
                </div>

                <div className={styles.cuerpo}>
                    <p className={styles.fecha}>
                        &quot;Gana una Página Web Profesional&quot; · BM Code Lab · Vigencia: hasta el 15 de julio de 2026 · Versión 2.0
                    </p>

                    <h3 className={styles.seccionTitulo}>Artículo 1. Organizador</h3>
                    <p>
                        El sorteo es organizado por <strong>BM Code Lab</strong>, empresa de desarrollo de software con sede en Melipilla, Chile.
                        Contacto: <strong>infobmcodelab@gmail.com</strong> · +56 9 94872535.
                        BM Code Lab actúa como único responsable del diseño, ejecución y entrega del premio, sin relación contractual con Instagram ni con Meta Platforms Inc.
                    </p>

                    <h3 className={styles.seccionTitulo}>Artículo 2. Objetivo y descripción del sorteo</h3>
                    <p>
                        El sorteo tiene carácter promocional y busca apoyar a emprendedores chilenos entregando presencia digital profesional sin costo.
                        Se sortearán <strong>3 (tres) premios</strong> entre los participantes que cumplan la totalidad de los requisitos establecidos en estas bases.
                    </p>

                    <h3 className={styles.seccionTitulo}>Artículo 3. Período de participación</h3>
                    <ul className={styles.lista}>
                        <li><strong>Apertura:</strong> desde la publicación oficial en Instagram de BM Code Lab.</li>
                        <li><strong>Cierre:</strong> 15 de julio de 2026, a las 23:59 hrs (hora de Chile continental, UTC-4).</li>
                        <li><strong>Anuncio de ganadores:</strong> 17 de julio de 2026, mediante publicación en Instagram.</li>
                    </ul>
                    <p>BM Code Lab se reserva el derecho de modificar estas fechas por causas justificadas, notificando el cambio con anticipación en su cuenta de Instagram.</p>

                    <h3 className={styles.seccionTitulo}>Artículo 4. Requisitos para participar</h3>
                    <p>Puede participar cualquier persona natural que cumpla todos los requisitos siguientes:</p>
                    <ul className={styles.lista}>
                        <li>Ser mayor de 18 años o actuar con autorización de su representante legal.</li>
                        <li>Tener residencia en Chile.</li>
                        <li>Contar con una cuenta de Instagram activa, pública y propia.</li>
                        <li>Tener o representar un emprendimiento, negocio o proyecto con necesidad de presencia digital.</li>
                    </ul>
                    <p>No podrán participar colaboradores, socios ni familiares directos de BM Code Lab.</p>

                    <h3 className={styles.seccionTitulo}>Artículo 5. Mecánica de participación</h3>
                    <p>Para quedar válidamente inscrito, el participante debe completar los tres pasos en su totalidad:</p>
                    <ul className={styles.lista}>
                        <li><strong>Paso 1 — Seguir la cuenta:</strong> seguir la cuenta oficial de Instagram de BM Code Lab y mantener el seguimiento activo hasta el anuncio de ganadores.</li>
                        <li><strong>Paso 2 — Compartir en historias:</strong> compartir la publicación oficial del sorteo en sus historias de Instagram (debe ser visible al momento de la verificación).</li>
                        <li><strong>Paso 3 — Etiquetar amigos:</strong> etiquetar a al menos un (1) emprendedor en los comentarios de la publicación oficial. Cada etiqueta adicional otorga mayores oportunidades de selección.</li>
                    </ul>
                    <p>Adicionalmente, el participante debe completar el formulario de registro disponible en el sitio web de BM Code Lab. El incumplimiento de cualquiera de los pasos anteriores invalidará automáticamente la participación, sin derecho a reclamo.</p>

                    <h3 className={styles.seccionTitulo}>Artículo 6. Descripción y alcance del premio</h3>
                    <p>El premio consiste en el diseño, desarrollo y publicación inicial de una página web corporativa informativa, principalmente frontend. Cada premio incluye:</p>
                    <ul className={styles.lista}>
                        <li><strong>Diseño personalizado:</strong> sitio diseñado desde cero, responsive (móvil, tablet, escritorio).</li>
                        <li><strong>Formulario de contacto:</strong> formulario básico incluido para que los visitantes puedan comunicarse con el negocio.</li>
                        <li><strong>Dominio .cl:</strong> registro del dominio elegido por el primer año, sujeto a disponibilidad y valor estándar de mercado.</li>
                        <li><strong>Publicación inicial:</strong> despliegue del sitio en una plataforma seleccionada por BM Code Lab (Vercel, Netlify u otra equivalente).</li>
                        <li><strong>Acompañamiento:</strong> reunión inicial, hasta 2 rondas de revisión, asesoría en contenido e imágenes, reunión de cierre y soporte post-entrega por 7 días corridos.</li>
                    </ul>

                    <h3 className={styles.seccionTitulo}>Artículo 7. Lo que no incluye el premio</h3>
                    <p>El premio no incluye, entre otros:</p>
                    <ul className={styles.lista}>
                        <li>Renovación anual del dominio a partir del segundo año.</li>
                        <li>Tienda online, carrito de compras ni pasarelas de pago.</li>
                        <li>Sistema de reservas complejo, panel administrativo avanzado, sistema de usuarios o login.</li>
                        <li>CRM, ERP, inventario, automatizaciones avanzadas ni integración con sistemas externos complejos.</li>
                        <li>Aplicaciones móviles ni desarrollo multiplataforma.</li>
                        <li>Campañas publicitarias</li>
                        <li>Fotografía profesional, branding completo, redacción avanzada ni diseño de identidad corporativa.</li>
                        <li>Modificaciones estructurales o nuevas funcionalidades una vez aprobado el diseño final.</li>
                    </ul>

                    <h3 className={styles.seccionTitulo}>Artículo 8. Contenido e imágenes a cargo del ganador</h3>
                    <p>
                        El ganador deberá entregar oportunamente textos, imágenes, logo, datos de contacto, redes sociales e información de servicios.
                        El ganador será responsable de entregar contenidos sobre los cuales tenga derecho de uso.
                        BM Code Lab podrá sugerir el uso de bancos de imágenes gratuitas o recursos libres de derechos cuando sea necesario.
                    </p>

                    <h3 className={styles.seccionTitulo}>Artículo 9. Selección de ganadores</h3>
                    <p>
                        Los ganadores serán seleccionados de forma aleatoria entre todos los participantes válidos registrados al cierre del sorteo.
                        Se seleccionarán adicionalmente <strong>3 suplentes</strong> en orden de prelación, quienes podrán recibir el premio si algún ganador principal no responde o renuncia en el plazo establecido.
                    </p>

                    <h3 className={styles.seccionTitulo}>Artículo 10. Premio de consolación</h3>
                    <p>Las primeras 10 personas inscritas correctamente podrán escoger uno de los siguientes beneficios:</p>
                    <ul className={styles.lista}>
                        <li>20% de descuento en una página web corporativa informativa contratada con BM Code Lab, o</li>
                        <li>Asesoría inicial sin costo: reunión de orientación de hasta 45 minutos sobre presencia digital y marketing.</li>
                    </ul>
                    <p>Este beneficio no es canjeable por dinero, no es transferible y deberá utilizarse dentro de los 30 días corridos desde el cierre del sorteo.</p>

                    <h3 className={styles.seccionTitulo}>Artículo 11. Notificación y aceptación del premio</h3>
                    <ul className={styles.lista}>
                        <li>Los ganadores serán anunciados el <strong>17 de julio de 2026</strong> mediante publicación en Instagram y contactados por mensaje directo desde la cuenta oficial.</li>
                        <li>El ganador dispone de <strong>7 días corridos</strong> desde el anuncio para responder.</li>
                        <li>Si un ganador no responde en el plazo, el premio será cedido al primer suplente.</li>
                        <li>El premio es personal e intransferible. No es canjeable por dinero ni por otros servicios.</li>
                    </ul>

                    <h3 className={styles.seccionTitulo}>Artículo 12. Proceso de entrega del sitio web</h3>
                    <ul className={styles.lista}>
                        <li>El proceso comenzará con una reunión inicial para conocer el negocio y definir el alcance del sitio.</li>
                        <li>Se realizarán hasta 2 rondas de revisión y ajuste.</li>
                        <li>El plazo estimado de entrega es de <strong>4 a 6 semanas</strong> desde la reunión inicial, sujeto a la entrega oportuna de contenidos por parte del ganador.</li>
                    </ul>

                    <h3 className={styles.seccionTitulo}>Artículo 13. Descalificación</h3>
                    <p>BM Code Lab podrá descalificar a un participante si se detecta:</p>
                    <ul className={styles.lista}>
                        <li>Participación con cuentas falsas, duplicadas o automatizadas (bots).</li>
                        <li>Etiquetado de usuarios sin su consentimiento o de cuentas inexistentes.</li>
                        <li>Cualquier conducta fraudulenta, engañosa o contraria al espíritu del sorteo.</li>
                        <li>Incumplimiento de los términos de uso de Instagram o de estas bases.</li>
                    </ul>

                    <h3 className={styles.seccionTitulo}>Artículo 14. Protección de datos personales</h3>
                    <p>Los datos personales proporcionados en el formulario serán utilizados exclusivamente para la gestión del sorteo. BM Code Lab se compromete a:</p>
                    <ul className={styles.lista}>
                        <li>No ceder ni vender los datos a terceros.</li>
                        <li>Proteger la información conforme a la <strong>Ley N° 19.628</strong> sobre protección de la vida privada.</li>
                        <li>Eliminar los datos una vez finalizado el proceso del sorteo, salvo autorización expresa del participante.</li>
                    </ul>

                    <h3 className={styles.seccionTitulo}>Artículo 15. Responsabilidad e Instagram</h3>
                    <p>
                        BM Code Lab no se responsabiliza por fallas técnicas de Instagram u otras circunstancias ajenas a su control.
                        Este sorteo no está patrocinado, avalado ni asociado de ninguna forma con Instagram ni con Meta Platforms Inc.
                        BM Code Lab se reserva el derecho de suspender o cancelar el sorteo por causas de fuerza mayor.
                    </p>

                    <h3 className={styles.seccionTitulo}>Artículo 16. Autorización de uso de imagen</h3>
                    <p>
                        Al participar y/o ganar el sorteo, el participante autoriza a BM Code Lab a mencionar su nombre de usuario y negocio en publicaciones relacionadas con el sorteo, con fines exclusivamente promocionales y sin contraprestación económica. Asimismo, en caso de resultar ganador, el participante autoriza a que el sitio web o página desarrollada para su negocio sea exhibido dentro del portafolio de trabajos publicado en el sitio oficial de BM Code Lab (bmcodelab.cl), como muestra de los servicios realizados
                    </p>

                    <h3 className={styles.seccionTitulo}>Artículo 17. Legislación aplicable</h3>
                    <p>
                        El presente sorteo se rige por las leyes de la República de Chile. Cualquier controversia será sometida a los tribunales ordinarios de justicia competentes en Melipilla, Chile.
                    </p>

                    <p style={{ marginTop: "1.5rem", color: "#555", fontSize: "0.8rem" }}>
                        Al participar en el sorteo, el participante declara haber leído, comprendido y aceptado íntegramente estas bases y condiciones. · BM Code Lab © 2026 · Versión 2.0
                    </p>
                </div>

                <div className={styles.pie}>
                    <button className={styles.botonAceptar} onClick={onCerrar}>
                        Entendido
                    </button>
                </div>

            </div>
        </div>,
        document.body
    );
};

export default ModalTerminos;
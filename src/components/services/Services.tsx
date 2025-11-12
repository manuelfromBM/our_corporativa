import React from "react"
import style from "@/components/services/Services.module.css"

const Servicios:React.FC = () => {
    const serviceData = [
        { title: "Consultoría Técnica", description: "Soluciones personalizadas para tu infraestructura digital." },
        { title: "Desarrollo Web", description: "Aplicaciones modernas, escalables y seguras." },
        { title: "Aplicaciones Móviles", description: "Experiencias nativas y cross-platform con React Native." },
        { title: "Integración de IA", description: "Automatización inteligente con LLMs y vector search." },
        { title: "Seguridad y MDM", description: "Protección de datos y gestión de dispositivos BYOD." },
        { title: "UX/UI", description: "Interfaces intuitivas centradas en el usuario." },
        { title: "DevOps & Hosting", description: "Contenedores, CI/CD y despliegue eficiente." },
        { title: "Soporte & Mantenimiento", description: "Acompañamiento continuo y mejoras evolutivas." },
    ]
    return (
        <section className={style.section}>
            <div className={style.container}>
                <h2 className={style.title}>Nuestros Servicios</h2>
                <div className={style.grid}>
                    { 
                    serviceData.map((services, index) => (         
                        <article className={style.card} key={index}>
                            <h3 className={style.cardTitle}>{services.title}</h3>
                            <p className={style.cardDescription}>{services.description}</p>
                        </article>
                    ))
                    }
                </div>
            </div>
        </section>
    )
}

export default Servicios
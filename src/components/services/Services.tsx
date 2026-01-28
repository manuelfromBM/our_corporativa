"use client"

import React from "react"
import style from "@/components/services/Services.module.css"
import { 
    FaCode, 
    FaMobile, 
    FaBrain, 
    FaShieldAlt, 
    FaPalette, 
    FaCloud, 
    FaHeadset,
    FaLightbulb 
} from "react-icons/fa"

const Servicios: React.FC = () => {
    const serviceData = [
        { 
            icon: FaLightbulb,
            title: "Consultoría Técnica", 
            description: "Soluciones personalizadas para tu infraestructura digital.",
            color: "#96f8ff"
        },
        { 
            icon: FaCode,
            title: "Desarrollo Web", 
            description: "Aplicaciones modernas, escalables y seguras.",
            color: "#8a00c0"
        },
        { 
            icon: FaMobile,
            title: "Aplicaciones Móviles", 
            description: "Experiencias nativas y cross-platform con React Native.",
            color: "#00d4f5"
        },
        { 
            icon: FaBrain,
            title: "Integración de IA", 
            description: "Automatización inteligente con LLMs y vector search.",
            color: "#b933ff"
        },
        { 
            icon: FaShieldAlt,
            title: "Seguridad y MDM", 
            description: "Protección de datos y gestión de dispositivos BYOD.",
            color: "#00fff7"
        },
        { 
            icon: FaPalette,
            title: "UX/UI", 
            description: "Interfaces intuitivas centradas en el usuario.",
            color: "#ff00ff"
        },
        { 
            icon: FaCloud,
            title: "DevOps & Hosting", 
            description: "Contenedores, CI/CD y despliegue eficiente.",
            color: "#00bfff"
        },
        { 
            icon: FaHeadset,
            title: "Soporte & Mantenimiento", 
            description: "Acompañamiento continuo y mejoras evolutivas.",
            color: "#9d00ff"
        },
    ]

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const card = e.currentTarget
        const rect = card.getBoundingClientRect()
        const x = ((e.clientX - rect.left) / rect.width) * 100
        const y = ((e.clientY - rect.top) / rect.height) * 100
        
        card.style.setProperty('--mouse-x', `${x}%`)
        card.style.setProperty('--mouse-y', `${y}%`)
    }

    return (
        <section id="Servicios" className={style.section}>
            <div className={style.container}>
                <div className={style.headerSection}>
                    <h2 className={style.title}>Nuestros Servicios</h2>
                    <p className={style.subtitle}>
                        Transformamos ideas en soluciones digitales innovadoras con tecnología de vanguardia
                    </p>
                </div>
                
                <div className={style.grid}>
                    {serviceData.map((service, index) => {
                        const Icon = service.icon
                        return (
                            <article 
                                className={style.card} 
                                key={index}
                                onMouseMove={handleMouseMove}
                                style={{ '--card-color': service.color } as React.CSSProperties}
                            >
                                <div className={style.cardHeader}>
                                    <div className={style.iconWrapper}>
                                        <Icon className={style.icon} />
                                    </div>
                                    <div className={style.cardNumber}>
                                        {String(index + 1).padStart(2, '0')}
                                    </div>
                                </div>
                                
                                <div className={style.cardContent}>
                                    <h3 className={style.cardTitle}>{service.title}</h3>
                                    <p className={style.cardDescription}>{service.description}</p>
                                </div>
                                
                                <div className={style.cardFooter}>
                                    <span className={style.learnMore}>
                                        Más información →
                                    </span>
                                </div>
                                
                                <div className={style.cardGlow}></div>
                            </article>
                        )
                    })}
                </div>
            </div>
            
            {/* Partículas de fondo */}
            <div className={style.particles}>
                {[...Array(20)].map((_, i) => (
                    <div key={i} className={style.particle}></div>
                ))}
            </div>
        </section>
    )
}

export default Servicios
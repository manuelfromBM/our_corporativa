"use client"

import React from "react"
import styles from './Carrusel.module.css'
import ImagenesCarrusel from "./imagenesCarrusel"
import Carousel from "react-bootstrap/Carousel"


const CarruselInicio: React.FC = () => {
    return (
        <section id="Inicio" className={styles.SectionPrincipal}>
            <Carousel>
                <Carousel.Item>
                    <ImagenesCarrusel
                        src="/imgCarrusel/redneuronal.png"
                        alt="primera imagen"
                        text="Servicios"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <ImagenesCarrusel
                        src="/imgCarrusel/imagen1.jpg"
                        alt="segunda imagen"
                        text="Servicios"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <ImagenesCarrusel
                        src="/imgCarrusel/imagen1.jpg"
                        alt="tercera imagen"
                        text="Servicios"
                    />
                </Carousel.Item>
            </Carousel>
        </section>
    )

}

export default CarruselInicio
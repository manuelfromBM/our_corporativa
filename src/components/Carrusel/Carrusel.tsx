"use client"

import React from "react"
import ImagenesCarrusel from "./imagenesCarrusel"
import Carousel from "react-bootstrap/Carousel"


const CarruselInicio: React.FC = () => {
    return (
        <>
            <Carousel>
                <Carousel.Item>
                    <ImagenesCarrusel
                        src="/imgCarrusel/imagen1.jpg"
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
        </>
    )

}

export default CarruselInicio
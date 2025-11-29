import React from "react"
import Image from "next/image"

interface AtributosImagen {
    src: string;
    alt: string;
    text?: string; //opcional
}

const ImagenesCarrusel = ({ src, alt, text }: AtributosImagen) => {
    return (
        <div style={{ position: 'relative', width: '100%', height: '550px' }}>
            <Image
                src={src}
                alt={alt}
                fill
                style={{ objectFit: "fill", filter: "brightness(100%)" }}
                priority
            />
            {text && (
                <div className="position-absolute top-150 start-50 translate-middle text-white text-center">
                    <h3>{text}</h3>
                </div>
            )}
        </div>
    )
}

export default ImagenesCarrusel
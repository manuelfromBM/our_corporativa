import styles from './Home.module.css'
import NavbarPrincipal from '@/components/Navbar/Navbar'
import CarruselInicio from '@/components/Carrusel/Carrusel'

export default function Inicio() {
    return (
        <div>
            <NavbarPrincipal />
            <CarruselInicio></CarruselInicio>
        </div>
    )
}
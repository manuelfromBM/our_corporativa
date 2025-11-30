// import styles from './Home.module.css'
import NavbarPrincipal from '@/components/Navbar/Navbar'
import CarruselInicio from '@/components/Carrusel/Carrusel'
import AppPromo from '@/components/PromocionK/PromocionK'
import NosotrosSection from '@/components/Nosotros/Nosotros'

export default function Inicio() {
    return (
        <div>
            <NavbarPrincipal />
            <CarruselInicio></CarruselInicio>
            <AppPromo/>
            <NosotrosSection></NosotrosSection>
        </div>
    )
}
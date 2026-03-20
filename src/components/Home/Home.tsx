//import styles from './Home.module.css'
import HeroBranch from '@/components/HeroSection/Hero'
import AppPromo from '@/components/PromocionK/PromocionK'
import NosotrosSection from '@/components/Nosotros/Nosotros'

export default function Inicio() {
  return (
    <div>
      <HeroBranch />
      <AppPromo />
      <NosotrosSection />
    </div>
  )
}

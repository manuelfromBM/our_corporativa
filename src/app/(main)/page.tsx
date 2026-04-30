
import SeccionContacto from "@/components/Contacto/Contacto";
import Servicios from "@/components/servicios/Servicios";
import HeroBranch from '@/components/HeroSection/Hero'
import AppPromo from '@/components/PromocionK/PromocionK'
import NosotrosSection from '@/components/Nosotros/Nosotros'
import SeccionAsesoramiento from "@/components/Asesoramiento/Asesoramiento";
import SeccionNuestroProceso from "@/components/NuestroProceso/NuestroProceso";

export default function Home() {
  return (
    <>
      <HeroBranch />
      <Servicios />
      <SeccionAsesoramiento />
      <SeccionNuestroProceso />
      <NosotrosSection />
      <AppPromo />
      <SeccionContacto />
    </>
  )
}
//G-5VK3L72BE1 id de medicion para google analytics




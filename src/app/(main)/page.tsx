
import SeccionContacto from "@/components/BM-components/Contacto/Contacto";
import Servicios from "@/components/BM-components/servicios/Servicios";
import HeroBranch from '@/components/BM-components/HeroSection/Hero'
import AppPromo from '@/components/BM-components/PromocionK/PromocionK'
import NosotrosSection from '@/components/BM-components/Nosotros/Nosotros'
import SeccionAsesoramiento from "@/components/BM-components/Asesoramiento/Asesoramiento";
// import SeccionNuestroProceso from "@/components/NuestroProceso/NuestroProceso";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: 'BM Code Lab — Desarrollo web y consultoría tecnológica' },
  description: 'Desarrollamos soluciones digitales a medida: desarrollo web, apps móviles, integración de IA y consultoría tecnológica para empresas en Chile.',
};

export default function Home() {
  return (
    <>
      <HeroBranch />
      <Servicios />
      <SeccionAsesoramiento />
      {/* <SeccionNuestroProceso /> */}
      <NosotrosSection />
      <AppPromo />
      <SeccionContacto />
    </>
  )
}
//G-5VK3L72BE1 id de medicion para google analytics




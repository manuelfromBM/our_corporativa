
import SeccionContacto from "@/components/Contacto/Contacto";
import Servicios from "@/components/servicios/Servicios";
import HeroBranch from '@/components/HeroSection/Hero'
import AppPromo from '@/components/PromocionK/PromocionK'
import NosotrosSection from '@/components/Nosotros/Nosotros'
import SeccionAsesoramiento from "@/components/Asesoramiento/Asesoramiento";
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




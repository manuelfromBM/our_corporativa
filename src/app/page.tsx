
import SeccionContacto from "@/components/Contacto/Contacto";
import Servicios from "@/components/services/Services";
import Inicio from "@/components/Home/Home";
import WhatsAppButton from "@/components/BtnWasap/BtnWasap";
import NavbarPrincipal from "@/components/Navbar/Navbar";


export default function Home() {
  return (
      
    <>
      <NavbarPrincipal/>
      <Inicio />
      <Servicios />
      <WhatsAppButton />
      <SeccionContacto />
    </>
  )
}
//G-5VK3L72BE1 id de medicion para google analytics





import Servicios from "@/components/services/Services";
import Inicio from "@/pages/Home/Home";
import SeccionContacto from "@/components/Contacto/Contacto";
import WhatsAppButton from "@/components/BtnWasap/BtnWasap";


export default function Home() {
  return (
    <>
      <Inicio />
      <Servicios />
      <WhatsAppButton />
      <SeccionContacto />
    </>
  )
}
//import Navbar from "@/components/Navbar/Navbar";




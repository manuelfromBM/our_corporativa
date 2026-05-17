//import Navbar from "@/components/Sorteo-components/layout/Navbar";
import Hero from "@/components/Sorteo-components/sections/Hero/Hero";
import Premios from "@/components/Sorteo-components/sections/Premios/Premios";
import Pasos from "@/components/Sorteo-components/sections/Pasos/Pasos";
import Ejemplos from "@/components/Sorteo-components/sections/Ejemplos/Ejemplos";
import Reglas from "@/components/Sorteo-components/sections/Reglas/Reglas";
import Formulario from "@/components/Sorteo-components/sections/Formulario/Formulario";
import Footer from "@/components/Sorteo-components/sections/Footer/Footer";

export default function SorteoPage() {
    return (

        <div className="sorteo-theme">
            <section id="inicio">
              <Hero ></Hero>
            </section>
            <section id="premios">
              <Premios ></Premios>
            </section>
            <section id="pasos">
              <Pasos ></Pasos>
            </section>
            <section id="ejemplos">
              <Ejemplos ></Ejemplos>
            </section>
            <section id="reglas">
              <Reglas ></Reglas>
            </section>
            <section id="formulario">
              <Formulario ></Formulario>
            </section>
            <Footer ></Footer>
        </div>
    );
}
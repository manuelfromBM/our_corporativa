import BeneficiosKrona from "@/components/Krona-components/Beneficios/BeneficiosKrona";
import ComoFunciona from "@/components/Krona-components/Como_Funciona/ComoFunciona";
import CTAKrona from "@/components/Krona-components/CTA/CtaKrona";
import DashboardKronaSection from "@/components/Krona-components/DashboardPreview/DashboardKrona";
import FuncionalidadesKrona from "@/components/Krona-components/Funcionalidades/FuncionalidadesKrona";
import SectionHero from "@/components/Krona-components/Hero/Hero";
import ProblemasKonaSection from "@/components/Krona-components/Problemas/ProblemasKrona";
import PublicoObjetivo from "@/components/Krona-components/PublicoObjetivoKrona/PublicoObjetivo";
import ReseñasKrona from "@/components/Krona-components/Reseñas/ReseñasKrona";


export default function Kronapage() {
  return (
    <div className="krona-theme">
      <section id="inicio">
        <SectionHero />
      </section>

      <section id="publico">
        <PublicoObjetivo />
      </section>

      <section id="problemas">
        <ProblemasKonaSection />
      </section>

      <section id="dashboard">
          <DashboardKronaSection />
      </section>

      <section id="como-funciona">
        <ComoFunciona />
      </section>

      <section id="ventajas">
        <BeneficiosKrona />
      </section>

      <section id="funciones">
        <FuncionalidadesKrona />
      </section>

      <section id="reseñas">
        <ReseñasKrona />
      </section>

      <section id="beta">
        <CTAKrona />
      </section>
    </div>
  );
}
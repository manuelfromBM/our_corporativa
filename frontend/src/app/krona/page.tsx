import BeneficiosKrona from "@/components/Krona-components/Beneficios/BeneficiosKrona";
import ComoFunciona from "@/components/Krona-components/Como_Funciona/ComoFunciona";
import CTAKrona from "@/components/Krona-components/CTA/CtaKrona";
import DashboardKronaSection from "@/components/Krona-components/DashboardPreview/DashboardKrona";
import FuncionalidadesKrona from "@/components/Krona-components/Funcionalidades/FuncionalidadesKrona";
import SectionHero from "@/components/Krona-components/Hero/Hero";
import ProblemasKonaSection from "@/components/Krona-components/Problemas/ProblemasKrona";
import PublicoObjetivo from "@/components/Krona-components/PublicoObjetivoKrona/PublicoObjetivo";
import ReseñasKrona from "@/components/Krona-components/Reseñas/ReseñasKrona";
import type { Metadata } from "next";
import { OG_BASE } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Krona — Gestiona tu negocio de servicios",
  description: "Agenda, pagos, promoción y métricas en una sola plataforma diseñada para profesionales y pymes de servicios.",
  alternates: { canonical: "https://www.bmcodelab.cl/krona" },
  openGraph: {
    ...OG_BASE,
    title: "Krona — Gestiona tu negocio de servicios",
    description: "Agenda, pagos, promoción y métricas en una sola plataforma para profesionales y pymes.",
    url: "https://www.bmcodelab.cl/krona",
  },
};

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
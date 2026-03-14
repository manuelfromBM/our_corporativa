import BeneficiosKrona from "@/pages/Krona/components/Beneficios/BeneficiosKrona";
import ComoFunciona from "@/pages/Krona/components/Como_Funciona/ComoFunciona";
import CTAKrona from "@/pages/Krona/components/CTA/CtaKrona";
import DashboardKronaSection from "@/pages/Krona/components/DashboardPreview/DashboardKrona";
import DashboardPreviewSection from "@/pages/Krona/components/DashboardPreview/DashboardKrona";
import FuncionalidadesKrona from "@/pages/Krona/components/Funcionalidades/FuncionalidadesKrona";
import SectionHero from "@/pages/Krona/components/Hero/Hero";
import NavKronaSection from "@/pages/Krona/components/NavBarKrona/NavKrona";
import ProblemasKonaSection from "@/pages/Krona/components/Problemas/ProblemasKrona";
import PublicoObjetivo from "@/pages/Krona/components/PublicoObjetivoKrona/PublicoObjetivo";
import ReseñasKrona from "@/pages/Krona/components/Reseñas/ReseñasKrona";
import "@/Styles/Krona-theme.css";


export default function Kronapage (){
    return( <div className="Krona-theme">
                <NavKronaSection />
                <SectionHero />
                <PublicoObjetivo/>
                <ProblemasKonaSection/>
                <DashboardKronaSection/>
                <ComoFunciona/>
                <BeneficiosKrona/>
                <FuncionalidadesKrona/>
                <ReseñasKrona/>
                <CTAKrona/>
            </div> 
    )
}
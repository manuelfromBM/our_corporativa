import DashboardKronaSection from "@/pages/Krona/components/DashboardPreview/DashboardKrona";
import DashboardPreviewSection from "@/pages/Krona/components/DashboardPreview/DashboardKrona";
import ComoFuncionaKrona from "@/pages/Krona/components/Funciones/ComoFuncionaKrona";
import SectionHero from "@/pages/Krona/components/Hero/Hero";
import NavKronaSection from "@/pages/Krona/components/NavBarKrona/NavKrona";
import NosotrosKronaSection from "@/pages/Krona/components/Nosotros/NosotrosKrona";
import ProblemasKonaSection from "@/pages/Krona/components/Problemas/ProblemasKrona";
import PublicoObjetivo from "@/pages/Krona/components/PublicoObjetivoKrona/PublicoObjetivo";

export default function Kronapage (){
    return( <>
            <NavKronaSection />
            <SectionHero />
            <PublicoObjetivo/>
            <NosotrosKronaSection />
            <ProblemasKonaSection/>
            <ComoFuncionaKrona/>
            <DashboardKronaSection/>
            
            </> 
    )
}
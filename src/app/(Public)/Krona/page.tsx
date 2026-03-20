// import BeneficiosKrona from "@/components/Krona-components/Beneficios/BeneficiosKrona";
// import ComoFunciona from "@/components/Krona-components/Como_Funciona/ComoFunciona";
// import CTAKrona from "@/components/Krona-components/CTA/CtaKrona";
// import DashboardKronaSection from "@/components/Krona-components/DashboardPreview/DashboardKrona";
// import FuncionalidadesKrona from "@/components/Krona-components/Funcionalidades/FuncionalidadesKrona";
// import SectionHero from "@/components/Krona-components/Hero/Hero";
import NavKronaSection from "@/components/Krona-components/NavBarKrona/NavKrona";
// import ProblemasKonaSection from "@/components/Krona-components/Problemas/ProblemasKrona";
// import PublicoObjetivo from "@/components/Krona-components/PublicoObjetivoKrona/PublicoObjetivo";
import ReseñasKrona from "@/components/Krona-components/Reseñas/ReseñasKrona";
import "@/Styles/Krona-theme.css";


export default function Kronapage (){
    return( <div className="Krona-theme">
                <NavKronaSection />
                {/*<SectionHero />
                <PublicoObjetivo/>
                <ProblemasKonaSection/>
                <DashboardKronaSection/>
                <ComoFunciona/>
                <BeneficiosKrona/>
                <FuncionalidadesKrona/> */}
                <ReseñasKrona/>
                {/* <CTAKrona/> */}
            </div> 
    )
}
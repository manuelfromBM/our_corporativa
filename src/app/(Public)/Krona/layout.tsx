import WhatsAppButton from "@/components/BtnWasap/BtnWasap"
import NavKronaSection from "@/components/Krona-components/NavBarKrona/NavKrona"

export default function publiclayout({ children }: { children: React.ReactNode }) {
    return (
            <>
            <NavKronaSection/>
            <main>{children}</main>
            <WhatsAppButton/>
            </>        
    )
}
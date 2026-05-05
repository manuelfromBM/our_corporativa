import { Briefcase, Store, BarChart2, MapPin } from 'lucide-react'
import WhatsAppButton from "@/components/BtnWasap/BtnWasap"
import NavKrona from "@/components/Krona-components/NavBarKrona/NavKrona"


export default function publiclayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="krona-theme">
           
            <main>{children}</main>
            <WhatsAppButton/>
        </div>            
    )
}
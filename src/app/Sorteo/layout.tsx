import WhatsAppButton from "@/components/BM-components/BtnWasap/BtnWasap";
// import Navbar from "@/components/Sorteo-components/layout/Navbar";
import "@/Styles/BM-theme.css";
import NavbarPrincipal from "@/components/BM-components/Navbar/Navbar";

export default function SorteoLayout({

    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bmcodelab-theme">
            <NavbarPrincipal/>
            
            <main>{children}</main>
            <WhatsAppButton />
        </div>
    )
}

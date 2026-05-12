import WhatsAppButton from "@/components/BtnWasap/BtnWasap";
import NavKronaSection from "@/components/Krona-components/NavBarKrona/NavKrona";
import NavbarPrincipal from "@/components/Navbar/Navbar";
import "@/Styles/Krona-theme.css";

export default function KronaLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="krona-theme">
            {/* <NavbarPrincipal /> */}
            <NavKronaSection />
            <main>{children}</main>
            <WhatsAppButton />
        </div>
    );
}

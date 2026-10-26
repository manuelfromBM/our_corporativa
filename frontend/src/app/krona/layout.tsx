import WhatsAppButton from "@/components/BM-components/BtnWasap/BtnWasap";
import NavKronaSection from "@/components/Krona-components/NavBarKrona/NavKrona";
import "@/Styles/Krona-theme.css";

export default function KronaLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="krona-theme">
            <NavKronaSection />
            <main>{children}</main>
            <WhatsAppButton />
        </div>
    );
}

import WhatsAppButton from "@/components/BtnWasap/BtnWasap";
import  Navbar  from "@/components/Sorteo-components/layout/Navbar";
import "@/Styles/Krona-theme.css";

export default function SorteoLayout({

    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="sorteo-theme">
            <Navbar />
            <main>{children}</main>
            <WhatsAppButton />
        </div>
    )
}

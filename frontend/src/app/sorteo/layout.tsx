import WhatsAppButton from "@/components/BM-components/BtnWasap/BtnWasap";
import Navbar from "@/components/BM-components/Navbar/Navbar";
import Burbuja_tiempo_restante from "@/components/Sorteo-components/layout/burbuja_tiempo/burbuja";
import "@/Styles/BM-theme.css";

export default function SorteoLayout({

    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bmcodelab-theme">
            <Navbar />
            <main>{children}</main>
            <Burbuja_tiempo_restante />
            <WhatsAppButton />
        </div>
    )
}

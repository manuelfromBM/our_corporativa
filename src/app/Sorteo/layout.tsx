import WhatsAppButton from "@/components/BM-components/BtnWasap/BtnWasap";
import Navbar from "@/components/BM-components/Navbar/Navbar";
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
            <WhatsAppButton />
        </div>
    )
}

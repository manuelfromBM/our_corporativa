import WhatsAppButton from "@/components/BtnWasap/BtnWasap";

export default function SorteoLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="sorteo-theme">
            <main>{children}</main>
            <WhatsAppButton />
        </div>
    )
}
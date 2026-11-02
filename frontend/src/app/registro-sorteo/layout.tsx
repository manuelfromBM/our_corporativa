import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Registro sorteo",
    robots: { index: false, follow: false },
};

// Layout aislado (sin navbar ni tema) mientras el formulario está en etapa de prototipo.
export default function RegistroSorteoLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <main>{children}</main>;
}

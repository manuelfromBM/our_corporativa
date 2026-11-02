import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Administración",
    robots: { index: false, follow: false },
};

// Layout aislado (sin navbar) para las herramientas internas.
export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <main>{children}</main>;
}

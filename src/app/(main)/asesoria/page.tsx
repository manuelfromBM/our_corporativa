// app/(main)/asesoria/page.tsx
import { Suspense } from "react";
import type { Metadata } from "next";
import AsesoriaDetalle from "@/components/BM-components/Asesoramiento/DetalleAsesoramiento/DetalleAsesoramiento";

export const metadata: Metadata = {
    title: "Asesoramiento",   // → resulta en "Asesoramiento | BM Code Lab"
    description: "Descubre si BM Code Lab es para ti, qué cambia cuando trabajas con nosotros y qué herramienta necesita tu negocio según el momento en que estás.",
    alternates: { canonical: "https://www.bmcodelab.cl/asesoria" },
    openGraph: {
        title: "Asesoramiento | BM Code Lab",
        description: "Descubre si BM Code Lab es para ti y qué herramienta necesita tu negocio.",
        url: "https://www.bmcodelab.cl/asesoria",
    },
};

export default function Page() {
    return (
        <Suspense>
            <AsesoriaDetalle />
        </Suspense>
    );
}
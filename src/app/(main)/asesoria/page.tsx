// app/(main)/asesoria/page.tsx
import { Suspense } from "react";
import AsesoriaDetalle from "@/components/Asesoramiento/DetalleAsesoramiento/DetalleAsesoramiento";

export const metadata = {
    title: "Asesoramiento | BM Code Lab",
    description:
        "Descubre si BM Code Lab es para ti, qué cambia cuando trabajas con nosotros y qué herramienta necesita tu negocio según el momento en que estás.",
};

export default function Page() {
    return (
        <Suspense>
            <AsesoriaDetalle />
        </Suspense>
    );
}
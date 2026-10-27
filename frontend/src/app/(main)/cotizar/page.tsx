import { Suspense } from "react";
import type { Metadata } from "next";
import FlujoRequerimientos from "@/components/Requerimientos-components/FlujoRequerimientos";

export const metadata: Metadata = {
    title: "Cotiza tu proyecto",
    description: "Cuéntanos qué necesitas y llegamos a la primera reunión con tu caso estudiado.",
    // Sin indexar mientras el flujo funciona con datos simulados.
    robots: { index: false, follow: false },
};

// Acepta ?servicio=<slug> para llegar con el servicio ya elegido (ej: desde el detalle de un servicio).
export default function CotizarPage() {
    return (
        <Suspense>
            <FlujoRequerimientos />
        </Suspense>
    );
}

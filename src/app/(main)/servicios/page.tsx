// app/(main)/servicios/page.tsx
import Detalle from "@/components/BM-components/servicios/Detalle/Detalle";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Servicios",
    description: "Desarrollo web, apps móviles, integración de IA, DevOps, seguridad y más. Soluciones digitales a medida para empresas en Chile.",
    alternates: { canonical: "https://www.bmcodelab.cl/servicios" },
    openGraph: {
        title: "Servicios | BM Code Lab",
        description: "Desarrollo web, apps móviles, integración de IA, DevOps, seguridad y más.",
        url: "https://www.bmcodelab.cl/servicios",
    },
};

export default function Page() {
    return <Detalle />;
}
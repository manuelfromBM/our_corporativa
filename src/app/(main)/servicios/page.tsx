import Detalle from "@/components/servicios/Detalle/Detalle";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Servicios",
    description: "Desarrollo web, apps móviles, integración de IA, DevOps, seguridad y más.",
};

export default function Page() {
    return <Detalle />;
}
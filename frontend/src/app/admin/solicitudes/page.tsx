import type { Metadata } from "next";
import PanelSolicitudes from "@/components/Admin-components/PanelSolicitudes";
import { getSolicitudes } from "@/lib/requerimientosAdminApi";
import { requerirEquipo } from "@/lib/sesionAdmin";

export const metadata: Metadata = {
    title: "Solicitudes de cotización",
};

export const dynamic = "force-dynamic";

export default async function SolicitudesPage() {
    await requerirEquipo();
    const solicitudes = await getSolicitudes();
    return <PanelSolicitudes solicitudes={solicitudes} />;
}

import type { Metadata } from "next";
import FormularioRecuperar from "@/components/Admin-components/FormularioRecuperar";

export const metadata: Metadata = {
    title: "Recupera tu contraseña",
    robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default function RecuperarPage() {
    return <FormularioRecuperar />;
}

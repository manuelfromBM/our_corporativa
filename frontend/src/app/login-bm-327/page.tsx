import type { Metadata } from "next";
import { redirect } from "next/navigation";
import FormularioLogin from "@/components/Admin-components/FormularioLogin";
import { getUsuarioSesion } from "@/lib/sesionAdmin";

export const metadata: Metadata = {
    title: "Acceso",
    robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function LoginPage() {
    const usuario = await getUsuarioSesion();
    if (usuario && usuario.role !== "cliente") redirect("/admin");
    return <FormularioLogin />;
}

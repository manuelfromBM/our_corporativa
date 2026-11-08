import type { Metadata } from "next";
import FormularioRestablecer from "@/components/Admin-components/FormularioRestablecer";

export const metadata: Metadata = {
    title: "Crea una contraseña nueva",
    robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function RestablecerPage({
    searchParams,
}: {
    searchParams: Promise<{ token?: string }>;
}) {
    const { token } = await searchParams;
    return <FormularioRestablecer token={token ?? ""} />;
}

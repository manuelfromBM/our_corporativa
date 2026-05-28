// app/(main)/servicios/[slug]/page.tsx
import DetalleServicio from "@/components/BM-components/servicios/Detalle/Detalle";
import SERVICIOS from "@/components/BM-components/servicios/Servicios.data";
import { notFound } from "next/navigation";

interface Props {
    params: { slug: string };
}

// Genera las rutas estáticas para cada servicio
export async function generateStaticParams() {
    return SERVICIOS.map((s) => ({ slug: s.slug }));
}

// Metadata dinámica por servicio
export async function generateMetadata({ params }: Props) {
    const servicio = SERVICIOS.find((s) => s.slug === params.slug);
    if (!servicio) return { title: "Servicio no encontrado | BM Code Lab" };

    return {
        title: `${servicio.tec.titulo} | BM Code Lab`,
        description: servicio.tec.desc,
    };
}

export default function Page({ params }: Props) {
    const existe = SERVICIOS.some((s) => s.slug === params.slug);
    if (!existe) notFound();

    return <DetalleServicio />;
}

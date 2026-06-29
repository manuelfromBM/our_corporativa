// app/(main)/servicios/[slug]/page.tsx
import SERVICIOS from "@/components/BM-components/servicios/Servicios.data";
import DetalleServicio from "@/components/BM-components/servicios/Detalle/Detalle";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return SERVICIOS.map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const servicio = SERVICIOS.find((s) => s.slug === slug);

    if (!servicio) return {
        title: "Servicio no encontrado",
        robots: { index: false, follow: false },
    };

    const url = `https://www.bmcodelab.cl/servicios/${servicio.slug}`;

    return {
        title: servicio.tec.titulo,
        description: servicio.tec.desc,
        alternates: { canonical: url },
        openGraph: {
            title: `${servicio.tec.titulo} | BM Code Lab`,
            description: servicio.tec.desc,
            url,
        },
    };
}

export default async function Page({ params }: Props) {
    const { slug } = await params;                        // ← await
    const existe = SERVICIOS.some((s) => s.slug === slug);
    if (!existe) notFound();

    return <DetalleServicio />;
}
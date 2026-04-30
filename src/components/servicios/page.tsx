// app/servicios/page.tsx
import Detalle from "./Detalle/Detalle";

export const metadata = {
    title: "Servicios | BM Code Lab",
    description:
        "Desarrollo web, apps móviles, integración de IA, DevOps, seguridad y más. Conoce en detalle todo lo que BM Code Lab puede construir para tu negocio.",
};

export default function Page() {
    return <Detalle />;
}

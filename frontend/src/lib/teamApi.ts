import { cache } from "react";
import type { TeamMember } from "@/components/BM-components/Nosotros/ProfileTeam/ProfileTeamData";

const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:8080";

// Se consulta al backend en cada visita (sin caché) para ver los cambios al instante.
// cache() evita repetir la petición entre generateMetadata y la página en un mismo request.
export const getTeam = cache(async (): Promise<TeamMember[]> => {
  const res = await fetch(`${BACKEND_URL}/api/team`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Error al obtener el equipo: ${res.status}`);
  }
  return res.json();
});

export async function getMemberBySlug(slug: string): Promise<TeamMember | undefined> {
  const team = await getTeam();
  return team.find((m) => m.slug === slug);
}

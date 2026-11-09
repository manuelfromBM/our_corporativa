import { getMemberBySlug, getTeam } from "@/lib/teamApi";
import { notFound } from "next/navigation";
import TeamProfileClient from "@/components/BM-components/Nosotros/ProfileTeam/ProfileTeam";
import { OG_BASE } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = await getMemberBySlug(slug);
  if (!member) {
    return {
      title: "Miembro no encontrado",
      robots: { index: false, follow: false },
    };
  }

  const url = `https://www.bmcodelab.cl/equipo/${member.slug}`;

  return {
    title: `${member.name} — BMCodeLab`,
    description: member.biz.bio,
    alternates: { canonical: url },
    openGraph: {
      ...OG_BASE,
      title: `${member.name} — BMCodeLab`,
      description: member.biz.bio,
      url,
    },
  };
}

export default async function TeamMemberPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = await getMemberBySlug(slug);
  if (!member) notFound();
  const team = (await getTeam()).map(({ slug, name }) => ({ slug, name }));
  return <TeamProfileClient member={member!} team={team} />;
}
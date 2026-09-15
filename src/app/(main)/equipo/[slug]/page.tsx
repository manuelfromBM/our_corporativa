import { getMemberBySlug, teamSlugs } from "@/components/BM-components/Nosotros/ProfileTeam/ProfileTeamData";
import { notFound } from "next/navigation";
import TeamProfileClient from "@/components/BM-components/Nosotros/ProfileTeam/ProfileTeam";

export async function generateStaticParams() {
  return teamSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = getMemberBySlug(slug);
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
  const member = getMemberBySlug(slug);
  if (!member) notFound();
  return <TeamProfileClient member={member!} />;
}
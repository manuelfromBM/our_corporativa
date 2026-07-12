"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TeamMember, teamData } from "./ProfileTeamData";
import styles from "./ProfileTeam.module.css";

const ICON_MAP: Record<string, string> = {
  rocket: "🚀",
  "shield-check": "🛡️",
  brain: "🧠",
  layers: "📐",
  users: "👥",
  plug: "🔌",
  server: "🖥️",
  database: "🗄️",
  clock: "⏱️",
  eye: "👁️",
  "device-mobile": "📱",
  palette: "🎨",
};

type View = "tech" | "biz";

export default function TeamProfileClient({ member }: { member: TeamMember }) {
  const [view, setView] = useState<View>("tech");
  const router = useRouter();

  return (
    <main className={styles.page}>
      {/* Navbar — reemplaza con tu Navbar real */}
      <nav className={styles.nav}>
        {/* <Link href="/" className={styles.navLink}>
          ← Volver al inicio
        </Link>
        <Link href="/#nosotros" className={styles.navLinkSecondary}>
          Ver equipo completo
        </Link> */}
      </nav>

      <div className={styles.container}>

        {/* Team switcher */}
        <div className={styles.teamSwitcher}>
          {teamData.map((m) => (
            <button
              key={m.slug}
              onClick={() => router.push(`/equipo/${m.slug}`)}
              className={`${styles.switcherBtn} ${m.slug === member.slug ? styles.switcherBtnActive : ""}`}
            >
              {m.name}
            </button>
          ))}
        </div>

        {/* Hero */}
        <div className={styles.hero}>
          {/* Avatar */}
          <div className={styles.avatarWrap}>
            <div className={styles.avatar}>
              {/* {member.initials} */}
              <Image
                src={member.img}
                alt={member.alt}
                fill
                className={styles.avatarImg}
                sizes="128px"
                priority
              />
            </div>
            <span className={styles.avatarBadge}>{member.badge}</span>
          </div>

          {/* Info */}
          <div className={styles.heroInfo}>
            <p className={styles.heroTag}>BMCodeLab · {member.badge}</p>
            <h1 className={styles.heroName}>{member.name}</h1>
            <p className={styles.heroRole}>{member.role}</p>

            {/* Toggle */}
            <div className={styles.toggle}>
              <button
                onClick={() => setView("tech")}
                className={`${styles.toggleBtn} ${view === "tech" ? styles.toggleBtnActive : ""}`}
              >
                💻 Técnico
              </button>
              <button
                onClick={() => setView("biz")}
                className={`${styles.toggleBtn} ${view === "biz" ? styles.toggleBtnActive : ""}`}
              >
                💼 Negocio
              </button>
            </div>
          </div>
        </div>

        <hr className={styles.divider} />

        {/* ── VISTA TÉCNICA ── */}
        {view === "tech" && (
          <>
            <div className={styles.section}>
              <p className={styles.sectionLabel}>Perfil técnico</p>
              <p className={styles.bioText}>{member.tech.bio}</p>
            </div>

            <div className={styles.statsGrid}>
              {member.tech.stats.map((s) => (
                <div key={s.label} className={styles.statCard}>
                  <p className={styles.statValue}>{s.value}</p>
                  <p className={styles.statLabel}>{s.label}</p>
                </div>
              ))}
            </div>

            <div className={styles.section}>
              <p className={styles.sectionLabel}>Lenguajes & Frameworks</p>
              <div className={styles.skillsWrap}>
                {member.tech.skills.map((s) => (
                  <span key={s} className={styles.skillPill}>
                    <span className={styles.skillDot} />
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.section}>
              <p className={styles.sectionLabel}>Herramientas & Plataformas</p>
              <div className={styles.toolsGrid}>
                {member.tech.tools.map((t) => (
                  <div key={t} className={styles.toolCard}>
                    <span className={styles.toolIcon}>⬡</span>
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ── VISTA NEGOCIO ── */}
        {view === "biz" && (
          <>
            <div className={styles.section}>
              <p className={styles.sectionLabel}>¿Por qué trabajar con nosotros?</p>
              <p className={styles.bioText}>{member.biz.bio}</p>
            </div>

            <div className={styles.bizCards}>
              {member.biz.cards.map((c) => (
                <div key={c.title} className={styles.bizCard}>
                  <div className={styles.bizCardTitle}>
                    <span className={styles.bizCardIcon}>{ICON_MAP[c.icon] ?? "✦"}</span>
                    <h3 className={styles.bizCardTitleText}>{c.title}</h3>
                  </div>
                  <p className={styles.bizCardDesc}>{c.desc}</p>
                </div>
              ))}
            </div>

            <div className={styles.cta}>
              <p className={styles.ctaText}>
                ¿Te gustaría trabajar con {member.name.split(" ")[0]}?
              </p>
              <Link href="/#contacto" className={styles.ctaBtn}>
                Contáctanos
              </Link>
            </div>
          </>
        )}

      </div>
    </main>
  );
}
import Image from "next/image";
import Link from "next/link";
import styles from "./Equipo.module.css";
import { team } from "../Nosotros/Nosotros.team";

export default function EquipoSection() {
  return (
    <section id="equipo" className={styles.section}>
      <div className={styles.container}>
        <span className={styles.badge}>Nuestro equipo</span>

        <h2 className={styles.title}>
          Las personas detrás de
          <span className={styles.highlight}> BMCodeLab</span>
        </h2>

        <div className={styles.row}>
          {team.map((member, i) => (
            <Link key={i} href={`/equipo/${member.slug}`} className={styles.member}>
              <div className={styles.avatarWrap}>
                <div className={styles.avatar}>
                  <Image
                    src={member.img}
                    alt={member.alt}
                    fill
                    className={styles.avatarImg}
                    sizes="(max-width: 768px) 96px, 140px"
                  />
                </div>
              </div>
              <span className={styles.memberName}>{member.name}</span>
              <span className={styles.memberRole}>{member.role}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

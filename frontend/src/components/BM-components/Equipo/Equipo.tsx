import Image from "next/image";
import Link from "next/link";
import styles from "./Equipo.module.css";
import { team } from "../Nosotros/Nosotros.team";

/*
 * El equipo como componentes de una placa: un bus de datos recorre la
 * sección y, al pasar por cada conexión, enciende el nodo de esa persona.
 */
export default function EquipoSection() {
  return (
    <section id="equipo" className={styles.section}>
      <div className={styles.container}>
        <span className={styles.badge}>Nuestro equipo</span>

        <h2 className={styles.title}>
          Las personas detrás de
          <span className={styles.highlight}> BMCodeLab</span>
        </h2>

        <div className={styles.board} style={{ "--count": team.length } as React.CSSProperties}>
          {/* Bus de datos con la corriente que lo recorre */}
          <div className={styles.bus} aria-hidden="true">
            <span className={styles.busPulse} />
          </div>

          <div className={styles.row}>
            {team.map((member, i) => (
              <Link
                key={member.slug}
                href={`/equipo/${member.slug}`}
                className={styles.member}
                style={{ "--i": i } as React.CSSProperties}
              >
                {/* Conexión vertical desde el bus hasta la tarjeta */}
                <span className={styles.drop} aria-hidden="true">
                  <span className={styles.joint} />
                </span>

                <div className={styles.chipTop}>
                  <span className={styles.nodeId}>node_{String(i + 1).padStart(2, "0")}</span>
                  <span className={styles.status}>
                    <i className={styles.statusDot} aria-hidden="true" />
                    en línea
                  </span>
                </div>

                <div className={styles.avatarWrap}>
                  <span className={styles.ring} aria-hidden="true" />
                  <div className={styles.avatar}>
                    <Image
                      src={member.img}
                      alt={member.alt}
                      fill
                      className={styles.avatarImg}
                      sizes="(max-width: 768px) 96px, 120px"
                    />
                  </div>
                </div>

                <span className={styles.memberName}>{member.name}</span>
                <span className={styles.memberRole}>{member.role}</span>

                <span className={styles.more}>
                  Ver perfil <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

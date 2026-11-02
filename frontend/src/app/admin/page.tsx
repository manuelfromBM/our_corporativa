import type { Metadata } from "next";
import Link from "next/link";
import styles from "@/components/Admin-components/Admin.module.css";
import { requerirEquipo } from "@/lib/sesionAdmin";
import { cerrarSesion } from "./acciones";

export const metadata: Metadata = {
    title: "Panel del equipo",
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
    const usuario = await requerirEquipo();

    return (
        <section className={styles.pantalla}>
            <div className={styles.tarjeta}>
                <span className={styles.etiqueta}>Panel interno</span>
                <h1 className={styles.titulo}>Hola, {usuario.name}</h1>
                <p className={styles.texto}>Elige qué quieres revisar.</p>

                <Link href="/admin/solicitudes" className={styles.boton}>
                    Ver solicitudes
                </Link>
                <form action={cerrarSesion}>
                    <button type="submit" className={styles.botonSecundario}>
                        Cerrar sesión
                    </button>
                </form>
            </div>
        </section>
    );
}

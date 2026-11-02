import { cache } from "react";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:8080";
const COOKIE_SESION = "bm_session";

export interface UsuarioSesion {
    id: number;
    email: string;
    name: string;
    role: "cliente" | "integrante" | "admin";
}

export async function cabeceraSesion(): Promise<{ Cookie: string } | null> {
    const token = (await cookies()).get(COOKIE_SESION)?.value;
    return token ? { Cookie: `${COOKIE_SESION}=${token}` } : null;
}

// El rol se valida en el backend en cada visita; la cookie sola no da acceso.
export const getUsuarioSesion = cache(async (): Promise<UsuarioSesion | null> => {
    const cabecera = await cabeceraSesion();
    if (!cabecera) return null;

    const res = await fetch(`${BACKEND_URL}/api/auth/me`, { headers: cabecera, cache: "no-store" });
    if (res.status === 401) return null;
    if (!res.ok) {
        throw new Error(`Error al validar la sesión: ${res.status}`);
    }
    return res.json();
});

// Sin sesión del equipo responde 404: /admin no debe delatar la dirección del login.
export async function requerirEquipo(): Promise<UsuarioSesion> {
    const usuario = await getUsuarioSesion();
    if (!usuario || usuario.role === "cliente") notFound();
    return usuario;
}

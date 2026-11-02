"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cabeceraSesion } from "@/lib/sesionAdmin";

const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:8080";

export async function cerrarSesion() {
    const cabecera = await cabeceraSesion();
    if (cabecera) {
        await fetch(`${BACKEND_URL}/api/auth/logout`, { method: "POST", headers: cabecera, cache: "no-store" });
    }
    (await cookies()).delete("bm_session");
    redirect("/login-bm-327");
}

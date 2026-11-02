import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:8080";
const DOMINIO_EQUIPO = "bmcodelab.cl";

// Reenvía el login al backend y devuelve al navegador la cookie de sesión.
export async function POST(request: Request) {
    const { usuario, password } = await request.json().catch(() => ({}));
    if (typeof usuario !== "string" || typeof password !== "string") {
        return NextResponse.json({ error: "Faltan el usuario o la contraseña." }, { status: 400 });
    }

    const limpio = usuario.trim();
    const email = limpio.includes("@") ? limpio : `${limpio}@${DOMINIO_EQUIPO}`;

    try {
        const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
            cache: "no-store",
        });
        const data = await res.json().catch(() => ({}));
        const respuesta = NextResponse.json(data, { status: res.status });
        res.headers.getSetCookie().forEach((cookie) => respuesta.headers.append("Set-Cookie", cookie));
        return respuesta;
    } catch (error) {
        console.error("[login] backend no disponible:", error);
        return NextResponse.json({ error: "El servicio no está disponible. Intenta de nuevo en unos minutos." }, { status: 503 });
    }
}

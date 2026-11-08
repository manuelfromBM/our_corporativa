import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:8080";
const DOMINIO_EQUIPO = "bmcodelab.cl";

// Reenvía la solicitud de recuperación al backend. El backend responde siempre lo mismo
// (haya o no cuenta con ese correo), así que aquí no se interpreta el resultado.
export async function POST(request: Request) {
    const { usuario } = await request.json().catch(() => ({}));
    if (typeof usuario !== "string" || usuario.trim() === "") {
        return NextResponse.json({ error: "Falta el usuario o correo." }, { status: 400 });
    }

    const limpio = usuario.trim();
    const email = limpio.includes("@") ? limpio : `${limpio}@${DOMINIO_EQUIPO}`;

    try {
        const res = await fetch(`${BACKEND_URL}/api/auth/password/forgot`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
            cache: "no-store",
        });
        const data = await res.json().catch(() => ({}));
        return NextResponse.json(data, { status: res.status });
    } catch (error) {
        console.error("[recuperar] backend no disponible:", error);
        return NextResponse.json({ error: "El servicio no está disponible. Intenta de nuevo en unos minutos." }, { status: 503 });
    }
}

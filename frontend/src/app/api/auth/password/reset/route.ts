import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:8080";

// Reenvía el cambio de contraseña al backend. El token de un solo uso se valida allí.
export async function POST(request: Request) {
    const { token, password } = await request.json().catch(() => ({}));
    if (typeof token !== "string" || typeof password !== "string") {
        return NextResponse.json({ error: "Faltan el enlace o la contraseña." }, { status: 400 });
    }

    try {
        const res = await fetch(`${BACKEND_URL}/api/auth/password/reset`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token, password }),
            cache: "no-store",
        });
        const data = await res.json().catch(() => ({}));
        return NextResponse.json(data, { status: res.status });
    } catch (error) {
        console.error("[restablecer] backend no disponible:", error);
        return NextResponse.json({ error: "El servicio no está disponible. Intenta de nuevo en unos minutos." }, { status: 503 });
    }
}

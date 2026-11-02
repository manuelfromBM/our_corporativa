import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:8080";

// Reenvía el formulario de /cotizar al backend en Go, que lo guarda en la base.
// Pasa por aquí para que el navegador no necesite conocer BACKEND_URL ni lidiar con CORS.
export async function POST(request: Request) {
    const body = await request.text();
    try {
        const res = await fetch(`${BACKEND_URL}/api/requerimientos`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body,
            cache: "no-store",
        });
        const data = await res.json().catch(() => ({}));
        return NextResponse.json(data, { status: res.status });
    } catch (error) {
        console.error("[requerimientos] backend no disponible:", error);
        return NextResponse.json({ error: "El servicio no está disponible. Intenta de nuevo en unos minutos." }, { status: 503 });
    }
}

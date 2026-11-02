import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:8080";

export async function POST(request : Request) {
    const body = await request.text();
    try {
        const res = await fetch(`${BACKEND_URL}/api/contactos`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body,
            cache: "no-store",
        });
        const data = await res.json().catch(() => ({}));
        return NextResponse.json(data, { status: res.status })
    } catch (error) {
        console.error("[contactos] backend no disponible: ", error);
        return NextResponse.json({ error: "El servicio no esta disponible. Intenta de nuevo en unos minutos."}, { status: 503 });
    }
}
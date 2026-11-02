import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:8080";

// Guarda en la base mediante el backend en Go. Devuelve la respuesta de error para
// entregársela al navegador, o null si se guardó bien.
export async function guardarEnBackend(ruta: string, datos: unknown): Promise<NextResponse | null> {
    try {
        const res = await fetch(`${BACKEND_URL}${ruta}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos),
            cache: "no-store",
        });
        if (res.ok) return null;
        const data = await res.json().catch(() => ({}));
        return NextResponse.json(
            { error: typeof data.error === "string" ? data.error : "No pudimos guardar los datos." },
            { status: res.status },
        );
    } catch (error) {
        console.error(`[${ruta}] backend no disponible:`, error);
        return NextResponse.json({ error: "El servicio no está disponible. Intenta de nuevo en unos minutos." }, { status: 503 });
    }
}

export interface NuevoContacto {
    nombre: string;
    correo: string;
}

export async function enviaContacto(contacto: NuevoContacto) {
    const res = await fetch("/api/contactos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contacto)
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        throw new Error(typeof data.error === "string" ? data.error : "No pudimos guardar los datos. Intenta de nuevo." )
    }
    return data;
}
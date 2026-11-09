import type { Metadata } from "next";

// Next reemplaza (no mezcla) el openGraph del layout cuando una página define el suyo,
// así que cada página debe expandir esta base para no perder la imagen ni el locale.
export const OG_BASE = {
    siteName: "BM Code Lab",
    images: [{ url: "/og-image.jpeg", width: 1254, height: 1254, alt: "BM Code Lab" }],
    locale: "es_CL",
    type: "website",
} satisfies Metadata["openGraph"];

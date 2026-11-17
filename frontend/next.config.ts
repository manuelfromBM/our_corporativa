import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    serverExternalPackages: [
    '@libsql/client',
    '@prisma/adapter-libsql',
    '@libsql/hrana-client',
    ],
    // OJO: no poner aquí el redirect /Sorteo -> /sorteo. Next compara redirects sin distinguir
    // mayúsculas, así que /sorteo también calza y queda en loop. Está en src/middleware.ts.
};

export default nextConfig;

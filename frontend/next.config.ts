import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    serverExternalPackages: [
    '@libsql/client',
    '@prisma/adapter-libsql',
    '@libsql/hrana-client',
    ],
    async redirects() {
        return [
            // URL antigua con mayúscula que quedó en el índice de Google.
            { source: '/Sorteo', destination: '/sorteo', permanent: true },
        ];
    },
};

export default nextConfig;

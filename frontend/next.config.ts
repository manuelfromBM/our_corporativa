import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    serverExternalPackages: [
    '@libsql/client',
    '@prisma/adapter-libsql',
    '@libsql/hrana-client',
    ],
};

export default nextConfig;

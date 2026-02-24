import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'standalone',
    reactCompiler: true,
    experimental: {
        turbopackFileSystemCacheForDev: true,
    },
    serverExternalPackages: ['@prisma/client', 'bcrypt']
};

export default nextConfig;

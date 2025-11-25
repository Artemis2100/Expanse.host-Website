import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['avatar.vercel.sh'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatar.vercel.sh',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  // Enable code splitting and optimize bundle size
  experimental: {
    optimizePackageImports: ['react-icons', 'lucide-react'],
  },
  // Compress output
  compress: true,
  // Optimize production builds
  productionBrowserSourceMaps: false,
  // Note: swcMinify is enabled by default in Next.js 15, no need to specify
};

export default nextConfig;

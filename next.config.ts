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
  },
  // Enable code splitting and optimize bundle size
  experimental: {
    optimizePackageImports: ['react-icons', 'lucide-react', '@react-three/fiber', '@react-three/drei'],
  },
  // Compress output
  compress: true,
  // Note: swcMinify is enabled by default in Next.js 15, no need to specify
};

export default nextConfig;

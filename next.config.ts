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
  // Optimize production builds
  swcMinify: true,
};

export default nextConfig;

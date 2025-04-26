import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ecom-mauve-eight.vercel.app',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost:3000',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;

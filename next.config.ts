import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["three"],
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "maps.googleapis.com" },
    ],
  },
  compress: true,
  poweredByHeader: false,
  allowedDevOrigins: ["192.168.1.5"],
};

export default nextConfig;

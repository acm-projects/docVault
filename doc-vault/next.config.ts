import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    domains: ["placehold.co"],
    unoptimized: true,
  }
};

export default nextConfig;

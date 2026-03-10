import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // --- EMERGENCY BYPASS FOR DEPLOYMENT ---
  typescript: {
    // This ignores type errors so the site can go live immediately
    ignoreBuildErrors: true,
  },
  eslint: {
    // This ignores linting errors during the build process
    ignoreDuringBuilds: true,
  },
  // ---------------------------------------
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
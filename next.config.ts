import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export for Firebase Hosting (`out/`). For SSR or App Hosting, remove this.
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

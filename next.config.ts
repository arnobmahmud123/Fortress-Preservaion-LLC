import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: "/blog.html",
        destination: "/blog",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

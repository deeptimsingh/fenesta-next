import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      // Wrong segment: aboutPage → about-us (only these; no /about-us/... redirects to avoid loops)
      { source: "/aboutPage", destination: "/about-us", permanent: true },
      { source: "/aboutPage/our-presence", destination: "/about-us/our-presence", permanent: true },
      { source: "/aboutPage/ourstory", destination: "/about-us/ourstory", permanent: true },
      { source: "/aboutPage/inthisnews", destination: "/about-us/inthisnews", permanent: true },
      { source: "/aboutPage/awards", destination: "/about-us/awards", permanent: true },
    ];
  },
};

export default nextConfig;

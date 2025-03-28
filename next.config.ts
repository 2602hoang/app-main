import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // async rewrites() {
  //   return [
  //     {
  //       source: "/blog/:path*",
  //       destination: "http://localhost:3331/blog/:path*", // Blog App
  //     },
  //     {
  //       source: "/shared-components/:path*",
  //       destination: "http://localhost:4000/shared-components/:path*", // Blog App
  //     },
  //   ];
  // },
};

export default nextConfig;

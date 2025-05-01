/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "/:path*",
      },
      {
        source: `/:path*`,
        destination: `https://app-1-test.vercel.app/app-1/:path*`,
      },
      {
        source: `/:path*`,
        destination: `https://app-2-test.vercel.app/app-2/:path*`,
      },
      {
        source: "/",
        destination: `https://app-main-test.vercel.app/`,
        has: [
          {
            type: "header",
            key: "referer",
            value: `https://app-1-test.vercel.app`,
          },
        ],
      },
      {
        source: "/",
        destination: `https://app-main-test.vercel.app/`,
        has: [
          {
            type: "header",
            key: "referer",
            value: `https://app-2-test.vercel.app`,
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

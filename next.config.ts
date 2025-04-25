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
        source: "/app-1/:path*",
        destination: `${process.env.NEXT_PUBLIC_APP_1}/app-1/:path*`,
      },
      {
        source: "/app-2/:path*",
        destination: `${process.env.NEXT_PUBLIC_APP_2}/app-2/:path*`,
      },
      {
        source: "/",
        destination: `${process.env.NEXT_PUBLIC_MAIN}`,
        has: [
          {
            type: "header",
            key: "referer",
            value: `${process.env.NEXT_PUBLIC_APP_1}`,
          },
        ],
      },
      {
        source: "/",
        destination: `${process.env.NEXT_PUBLIC_MAIN}`,
        has: [
          {
            type: "header",
            key: "referer",
            value: `${process.env.NEXT_PUBLIC_APP_2}`,
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

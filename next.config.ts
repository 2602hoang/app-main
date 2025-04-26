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
        source: `/${process.env.NEXT_NAME_APP1}/:path*`,
        destination: `${process.env.NEXT_PUBLIC_APP_1}/${process.env.NEXT_NAME_APP1}/:path*`,
      },
      {
        source: `/${process.env.NEXT_NAME_APP2}/:path*`,
        destination: `${process.env.NEXT_PUBLIC_APP_2}/${process.env.NEXT_NAME_APP2}/${process.env.NEXT_NAME_APP2}/:path*`,
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

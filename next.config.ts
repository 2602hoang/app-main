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
        destination: `${process.env.NEXT_PUBLIC_APP_1}/app-1/:path*`,
      },
      {
        source: `/${process.env.NEXT_NAME_APP2}/:path*`,
        destination: `${process.env.NEXT_PUBLIC_APP_2}/:path*`,
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

// NEXT_PUBLIC_APP1_INIT_KEY=user-storage-app1

// # NEXT_PUBLIC_APP_1=https://app-1-rho.vercel.app
// NEXT_NAME_APP1=app-1
// NEXT_NAME_APP2=app-2

// # NEXT_PUBLIC_APP_2=http://localhost:4001
// NEXT_PUBLIC_APP_2=https://app-2-inky.vercel.app
// NEXT_PUBLIC_MAIN=http://localhost:3000/

// NEXTAUTH_SECRET=some_super_secret_value

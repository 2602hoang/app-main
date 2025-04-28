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
        destination: `${process.env.NEXT_PUBLIC_APP_1}/:path*`,
      },
      {
        source: `/:path*`,
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

// X_API_KEY=c052ea66-3ada-4387-8b36-e0a5fd8a2a84
// KEYCLOAK_CLIENT_SECRET=fiScBxbdq652AmPbDlo1Fre7GdpJsT42

// NEXT_PUBLIC_APP1_INIT_KEY=user-storage-app1

// NEXT_PUBLIC_APP_1=https://app-1-rho.vercel.app/app-1
// NEXT_NAME_APP1=app-1
// NEXT_NAME_APP2=app-2

// NEXT_PUBLIC_APP_2=https://app-2-black.vercel.app/app-2
// NEXT_PUBLIC_MAIN=https://app-main-test.vercel.app/

// NEXTAUTH_SECRET=some_super_secret_value

// proxy-middleware.js
export default function (app) {
  app.use(
    "/app-1",
    createProxyMiddleware({
      target: `${process.env.NEXT_PUBLIC_APP_1}`,
      changeOrigin: true,
      pathRewrite: {
        "^/app-1": "/",
      },
    })
  );
  app.use(
    "/app-2",
    createProxyMiddleware({
      target: `${process.env.NEXT_PUBLIC_APP_2}`,
      changeOrigin: true,
      pathRewrite: {
        "^/app-2": "/",
      },
    })
  );
}

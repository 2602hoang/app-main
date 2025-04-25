// proxy-middleware.js
export default function (app) {
  app.use(
    "/app-1",
    createProxyMiddleware({
      target: "http://localhost:3001",
      changeOrigin: true,
      pathRewrite: {
        "^/app-1": "/",
      },
    })
  );
  app.use(
    "/app-2",
    createProxyMiddleware({
      target: "http://localhost:3002",
      changeOrigin: true,
      pathRewrite: {
        "^/app-2": "/",
      },
    })
  );
}

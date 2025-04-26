// pages/api/proxy-app2.js
import { createProxyMiddleware } from "http-proxy-middleware";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const proxy = createProxyMiddleware({
    target: `${process.env.NEXT_PUBLIC_APP_2}`,
    changeOrigin: true,
    pathRewrite: {
      "^/api/app-2": "/",
    },
  });

  return proxy(req, res);
}

import { createProxyMiddleware } from "http-proxy-middleware";

import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const proxy = createProxyMiddleware({
    target: `${process.env.NEXT_PUBLIC_APP_1}`, // Target app-1
    changeOrigin: true,
    pathRewrite: {
      "^/api/app-1": "/",
    },
  });

  return proxy(req, res);
}

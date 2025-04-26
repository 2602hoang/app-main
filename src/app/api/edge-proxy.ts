export const config = {
  runtime: "edge",
};

export default async function handler(req: Request) {
  const targetUrl = `${process.env.NEXT_PUBLIC_APP_1}`;
  const response = await fetch(targetUrl, {
    method: req.method,
    headers: req.headers,
    body: req.body,
  });

  return new Response(response.body, {
    status: response.status,
    headers: response.headers,
  });
}

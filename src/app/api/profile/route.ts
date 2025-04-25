import redis from "@/lib/redis";

export async function POST(req: Request) {
  const body = await req.json();
  const { user, value } = body;

  if (!user || !value) {
    return new Response(JSON.stringify({ error: "Missing key or value" }), {
      status: 400,
    });
  }

  try {
    await redis.set(user, JSON.stringify(value));
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error saving data to Redis:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("user");

  if (!key) {
    return new Response(JSON.stringify({ error: "Missing key param" }), {
      status: 400,
    });
  }

  try {
    const data = await redis.get(key);

    if (!data) {
      return new Response(JSON.stringify({ error: "Data not found" }), {
        status: 404,
      });
    }

    return new Response(data, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error retrieving data from Redis:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}

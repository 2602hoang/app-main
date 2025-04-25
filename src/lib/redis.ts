// lib/redis.ts
import Redis from "ioredis";

// Redis mặc định localhost:6379
const redis = new Redis({
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: Number(process.env.REDIS_PORT) || 6379,
  username: process.env.REDIS_USER,
  //   password: process.env.REDIS_PASSWORD,
});
export default redis;

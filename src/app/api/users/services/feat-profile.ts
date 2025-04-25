import { users } from "../data";

export default function GET() {
  return new Response(JSON.stringify(users));
}

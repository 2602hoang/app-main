import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const referer = request.headers.get("referer");
  console.log("Referer:", referer);

  if (referer?.includes("app-1-test.vercel.app/app-1")) {
    return NextResponse.redirect("https://app-main-test.vercel.app/");
  }

  if (referer?.includes("app-2-test.vercel.app/app-2")) {
    return NextResponse.redirect("https://app-main-test.vercel.app/");
  }

  return NextResponse.next();
}

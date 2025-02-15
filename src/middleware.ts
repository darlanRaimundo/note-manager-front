import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/manager")) {
    if (request.cookies.has("access_token")) {
      return NextResponse.next();
    } else {
      return NextResponse.rewrite(new URL("/", request.url));
    }
  }

  if (
    request.nextUrl.pathname.startsWith("/") ||
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/signup")
  ) {
    if (request.cookies.has("access_token")) {
      return NextResponse.rewrite(new URL("/manager", request.url));
    } else {
      return NextResponse.next();
    }
  }
}

export const config = {
  matcher: ["/", "/manager", "/login", "/signup"],
};

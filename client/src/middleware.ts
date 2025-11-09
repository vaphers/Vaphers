import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("admin-auth")?.value;

  if (request.nextUrl.pathname === "/asad-login") {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname.startsWith("/admin-dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/asad-login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin-dashboard", "/admin-dashboard/:path*"],
};

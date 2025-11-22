import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("admin-auth")?.value;
  const path = request.nextUrl.pathname;

  // Allow login route and its subpaths
  if (path.startsWith("/asad-login")) {
    return NextResponse.next();
  }

  // Protect admin dashboard routes
  if (path.startsWith("/admin-dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/asad-login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin-dashboard/:path*", "/asad-login/:path*"],
};

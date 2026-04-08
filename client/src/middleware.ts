import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("admin-auth")?.value;
  const path = request.nextUrl.pathname;

  // 1. If user is already logged in, don't let them see the login page
  if (path.startsWith("/asad-login") && token) {
    try {
      await jwtVerify(token, SECRET);
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    } catch (e) {
      // Token invalid, allow them to stay on login page
      return NextResponse.next();
    }
  }

  // 2. Protect Admin Dashboard Pages (Returns HTML Redirects)
  if (path.startsWith("/admin-dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/asad-login", request.url));
    }

    try {
      await jwtVerify(token, SECRET);
      return NextResponse.next();
    } catch (err) {
      const response = NextResponse.redirect(new URL("/asad-login", request.url));
      response.cookies.delete("admin-auth");
      return response;
    }
  }

  // 3. Protect Admin APIs (Returns JSON 401 Errors)
  if (path.startsWith("/api/admin")) {
    if (!token) {
      return NextResponse.json(
        { success: false, error: "The data cannot be accessed " },
        { status: 401 }
      );
    }

    try {
      await jwtVerify(token, SECRET);
      return NextResponse.next();
    } catch (err) {
      const response = NextResponse.json(
        { success: false, error: "Unauthorized: Invalid or expired token" },
        { status: 401 }
      );
      response.cookies.delete("admin-auth"); 
      return response;
    }
  }

  // Allow all other routes (like your public /api/blogs)
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin-dashboard/:path*", "/asad-login/:path*", "/api/admin/:path*"],
};
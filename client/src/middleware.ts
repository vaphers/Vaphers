import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret-jwt-key');

const isContributorProtectedRoute = createRouteMatcher([
  '/write-for-us/dashboard(.*)',
  '/write-for-us/editor(.*)',
]);

export default clerkMiddleware(async (auth, request) => {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('admin-auth')?.value;

  // 1. Admin login page redirect if already logged in with admin JWT
  if (path.startsWith('/asad-login') && token) {
    try {
      await jwtVerify(token, SECRET);
      return NextResponse.redirect(new URL('/admin-dashboard', request.url));
    } catch {
      return NextResponse.next();
    }
  }

  // 2. Protect Admin Dashboard Pages (JWT based auth for /asad-login)
  if (path.startsWith('/admin-dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/asad-login', request.url));
    }
    try {
      await jwtVerify(token, SECRET);
      return NextResponse.next();
    } catch {
      const response = NextResponse.redirect(new URL('/asad-login', request.url));
      response.cookies.delete('admin-auth');
      return response;
    }
  }

  // 3. Protect Internal Admin APIs (excluding public /api/admin-login)
  if (path.startsWith('/api/admin/') && !path.startsWith('/api/admin-login')) {
    if (!token) {
      return NextResponse.json(
        { success: false, error: 'The data cannot be accessed' },
        { status: 401 }
      );
    }
    try {
      await jwtVerify(token, SECRET);
      return NextResponse.next();
    } catch {
      const response = NextResponse.json(
        { success: false, error: 'Unauthorized: Invalid or expired token' },
        { status: 401 }
      );
      response.cookies.delete('admin-auth');
      return response;
    }
  }

  // 4. Protect Contributor Routes with Clerk
  if (isContributorProtectedRoute(request)) {
    await auth.protect();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
import { NextResponse } from "next/server";
import { SignJWT } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret-jwt-key');

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.error('ADMIN_EMAIL or ADMIN_PASSWORD environment variable is not set on the server.');
      return NextResponse.json(
        { error: 'Server configuration error: ADMIN_EMAIL or ADMIN_PASSWORD is not set in environment variables.' },
        { status: 500 }
      );
    }

    const cleanInputEmail = (email || '').trim().toLowerCase();
    const cleanAdminEmail = (adminEmail || '').trim().toLowerCase();
    const cleanInputPassword = (password || '').trim();
    const cleanAdminPassword = (adminPassword || '').trim();

    if (cleanInputEmail === cleanAdminEmail && cleanInputPassword === cleanAdminPassword) {
      const token = await new SignJWT({ email: cleanAdminEmail })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("4h") 
        .sign(SECRET);

      const response = NextResponse.json({ success: true });

      response.cookies.set("admin-auth", token, {
        httpOnly: true, 
        path: "/",
        maxAge: 4 * 60 * 60, 
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });

      return response;
    }

    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  } catch (error: any) {
    console.error('Error in admin-login:', error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
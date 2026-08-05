import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, ADMIN_COOKIE_VALUE } from "@/auth";

const ADMIN_EMAIL = "admin@fortresspreservation.com";
const ADMIN_PASSWORD = "admin123";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (
      email?.trim().toLowerCase() === ADMIN_EMAIL &&
      password?.trim() === ADMIN_PASSWORD
    ) {
      // Determine if the request is over HTTPS.
      // Cloudflare sets "x-forwarded-proto"; local dev (http://localhost) won't.
      const proto =
        request.headers.get("x-forwarded-proto") ||
        new URL(request.url).protocol.replace(":", "");
      const isSecure = proto === "https";

      const response = NextResponse.json({ success: true });
      response.cookies.set(ADMIN_COOKIE_NAME, ADMIN_COOKIE_VALUE, {
        httpOnly: true,
        // Only mark the cookie Secure over HTTPS. This keeps login working on
        // http://localhost for local dev while remaining secure in production.
        secure: isSecure,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: "/",
      });
      return response;
    }

    return NextResponse.json(
      { success: false, error: "Invalid email or password." },
      { status: 401 }
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, error: "Server error. Please try again." },
      { status: 500 }
    );
  }
}

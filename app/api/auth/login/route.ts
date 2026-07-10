import { NextRequest, NextResponse } from "next/server";
import { comparePassword, findUserByEmail, toAuthUser } from "@/lib/users-service";
import { COOKIE_NAME, getAuthCookieOptions, signAuthToken } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = String(body.email || "").toLowerCase().trim();
    const password = String(body.password || "");

    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required." }, { status: 400 });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
    }

    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
    }

    const authUser = toAuthUser(user);
    const token = signAuthToken(authUser);
    const response = NextResponse.json({ user: authUser, message: "Login successful." });
    response.cookies.set(COOKIE_NAME, token, getAuthCookieOptions());
    return response;
  } catch {
    return NextResponse.json({ message: "Unable to login right now." }, { status: 500 });
  }
}

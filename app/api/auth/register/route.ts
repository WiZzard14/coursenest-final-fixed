import { NextRequest, NextResponse } from "next/server";
import { createUser, toAuthUser } from "@/lib/users-service";
import { COOKIE_NAME, getAuthCookieOptions, signAuthToken } from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").toLowerCase().trim();
    const password = String(body.password || "");

    if (name.length < 2) return NextResponse.json({ message: "Name must be at least 2 characters." }, { status: 400 });
    if (!/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
    if (password.length < 8) return NextResponse.json({ message: "Password must be at least 8 characters." }, { status: 400 });

    const user = await createUser(name, email, password, "user");
    const authUser = toAuthUser(user);
    const token = signAuthToken(authUser);
    const response = NextResponse.json({ user: authUser, message: "Registration successful." }, { status: 201 });
    response.cookies.set(COOKIE_NAME, token, getAuthCookieOptions());
    return response;
  } catch (error) {
    return NextResponse.json({ message: error instanceof Error ? error.message : "Unable to register right now." }, { status: 400 });
  }
}

import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const email = String(body.email || "").trim();
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
  }
  return NextResponse.json({ message: "You are subscribed to CourseNest learning updates." });
}

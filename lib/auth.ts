import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import { AuthUser } from "@/types";

const JWT_SECRET = process.env.JWT_SECRET || "development_secret_change_before_deployment";
const COOKIE_NAME = "auth-token";

type SameSite = "lax" | "strict" | "none";

export function getCookieSameSite(): SameSite {
  const value = String(process.env.COOKIE_SAMESITE || "lax").toLowerCase();
  if (value === "strict" || value === "none") return value;
  return "lax";
}

export function getAuthCookieOptions() {
  const sameSite = getCookieSameSite();
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" || sameSite === "none",
    sameSite,
    maxAge: 60 * 60 * 24 * 7,
    path: "/"
  } as const;
}

export function signAuthToken(user: AuthUser) {
  return jwt.sign(user, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyAuthToken(token?: string): AuthUser | null {
  if (!token) return null;
  try {
    return jwt.verify(token, JWT_SECRET) as AuthUser;
  } catch {
    return null;
  }
}

export function getAuthFromRequest(request: NextRequest): AuthUser | null {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  return verifyAuthToken(token);
}

export { COOKIE_NAME };

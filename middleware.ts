import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/items/add", "/items/manage", "/dashboard"];

export function middleware(request: NextRequest) {
  const isProtected = protectedRoutes.some((path) => request.nextUrl.pathname.startsWith(path));
  const token = request.cookies.get("auth-token")?.value;

  if (isProtected && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/items/add/:path*", "/items/manage/:path*", "/dashboard/:path*"]
};

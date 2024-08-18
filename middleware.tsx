import { NextRequest,NextResponse } from "next/server";

export function middleware(request:NextRequest) {
  const Path = request.nextUrl.pathname;
  const PublicPath = Path === "/auth/login" || Path === "/auth/register";

  const token = request.cookies.get("authCookie");

  if (PublicPath && token) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }
}

export const config = {
  matcher: ["/","/auth/login", "/auth/register"],
};
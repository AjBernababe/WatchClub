import { auth } from "@/lib/authentication/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = ["/dashboard"];
const publicOnlyRoutes = ["/login", "/register"];

function isProtected(pathname: string) {
  return protectedRoutes.some((route) => pathname.startsWith(route));
}

function isPublicOnly(pathname: string) {
  return publicOnlyRoutes.includes(pathname);
}

function redirectTo(path: string, request: NextRequest) {
  return NextResponse.redirect(new URL(path, request.url));
}

export async function middleware(request: NextRequest) {
  const session = await auth();
  const pathname = request.nextUrl.pathname;

  if (isProtected(pathname) && !session) {
    return redirectTo("/login", request);
  }

  if (isPublicOnly(pathname) && session) {
    return redirectTo("/dashboard", request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};

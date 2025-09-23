import { NextResponse } from "next/server";

// PUBLIC_INTERFACE
// Middleware stub: place to enforce RBAC or auth redirects if session cookies are present.
// Currently a no-op pass-through to avoid blocking CI/demo environments.
export function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/blogs/new"],
};

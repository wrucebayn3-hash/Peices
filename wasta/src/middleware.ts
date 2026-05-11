import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    // Role-based redirect
    if (pathname.startsWith("/dashboard/seeker") && token?.role !== "SEEKER") {
      return NextResponse.redirect(new URL("/dashboard/referrer", req.url));
    }
    if (pathname.startsWith("/dashboard/referrer") && token?.role !== "REFERRER") {
      return NextResponse.redirect(new URL("/dashboard/seeker", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/dashboard/:path*"],
};

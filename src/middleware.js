import { NextResponse } from "next/server";
import { verifyJwt } from "./lib/jwt";

export async function middleware(req) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const user = verifyJwt(token);
   
    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}


export const config = {
  matcher: ["/dashboard/:path*"],
};

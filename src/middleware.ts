import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
	const isPublicPath =
		request.nextUrl.pathname === "/login" ||
		request.nextUrl.pathname === "/signup";
	const token = request.cookies.get("token");

	if (isPublicPath && token) {
		return NextResponse.redirect(new URL("/", request.nextUrl));
	}

	if (!isPublicPath && !token) {
		return NextResponse.redirect(new URL("/login", request.nextUrl));
	}

	return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ["/", "/profile", "/login", "/signup"],
};

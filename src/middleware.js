export function middleware(request) {
    if (request.nextUrl.pathname === "/") {
        return Response.redirect(new URL("/tamilparser", request.nextUrl));
    }
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}
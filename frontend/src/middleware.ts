import { NextResponse, type NextRequest } from "next/server";

// URL antigua con mayúscula que quedó en el índice de Google.
// Se hace aquí y no en next.config porque allá los redirects no distinguen mayúsculas
// y /sorteo terminaba redirigiéndose a sí mismo.
export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname === "/Sorteo") {
        const url = request.nextUrl.clone();
        url.pathname = "/sorteo";
        return NextResponse.redirect(url, 308);
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/Sorteo"],
};

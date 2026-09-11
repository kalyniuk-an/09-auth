import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { checkSession } from "./lib/api/serverApi";

const privateRouters = ['/profile', '/notes'];
const authRoutes = ['/sign-in', '/sign-up'];

export async function proxy(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const { pathname } = request.nextUrl;
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));
  const isPrivateRoute = privateRouters.some((route) => pathname.startsWith(route));

  if (isPrivateRoute && !accessToken && refreshToken) {
    try {
      const response = await checkSession();
      const nextResponse = NextResponse.next();
      const setCookieHeader = response.headers['set-cookie'];

      if (setCookieHeader) {
        const cookiesToSet = Array.isArray(setCookieHeader) ? setCookieHeader : [setCookieHeader];
        cookiesToSet.forEach((cookieString) => {
          nextResponse.headers.append('set-cookie', cookieString);
        });
      }
      return nextResponse;
    } catch {
      return NextResponse.redirect(new URL('/sign-in', request.url));
    }
  }

  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (isPrivateRoute && !accessToken) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};
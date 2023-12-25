import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';

export default withAuth(
  async function middleware (req) {
    const pathName = req.nextUrl.pathname;

    const isAuthenticated = await getToken({ req });
    const isLoginPage = pathName.startsWith('/signin');

    const sensitiveRoutes = ['/dashboard'];
    const isAccessingSensitiveRoute = sensitiveRoutes.some((route) => pathName.startsWith(route));

    if (isLoginPage) {
      if (isAuthenticated) {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }

      return NextResponse.next();
    }

    if (!isAuthenticated && isAccessingSensitiveRoute) {
      return NextResponse.redirect(new URL('/signin', req.url));
    }

    if (pathName === '/') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
  },
  {
    callbacks: {
      async authorized () {
        return true;
      }
    }
  }
);

export const config = {
  matcher: ['/', '/signin', '/dashboard/:path*']
};

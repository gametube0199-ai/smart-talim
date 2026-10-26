import { NextRequest, NextResponse } from 'next/server';

const publicPaths = ['/', '/signin', '/signup', '/forgot-password'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get('smart_talim_session')?.value;

  const isProtectedRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/profile');

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  if (!sessionCookie) {
    const signinUrl = new URL('/signin', request.url);
    return NextResponse.redirect(signinUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'],
};

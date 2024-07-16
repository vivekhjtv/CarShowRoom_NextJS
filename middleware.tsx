import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const userCookie = request.cookies.get('user')?.value;
  let user;

  if (userCookie) {
    try {
      user = JSON.parse(userCookie);
    } catch (error) {
      console.error('Error parsing user cookie:', error);
    }
  }

  const loggedInUserNotAccessPaths = [
    '/user/login',
    '/user/registration',
  ].includes(request.nextUrl.pathname);

  const adminPaths = request.nextUrl.pathname.startsWith('/admin');
  const userPaths = request.nextUrl.pathname.startsWith('/user');

  if (loggedInUserNotAccessPaths && user?.token) {
    // If the user is logged in, they shouldn't access login or registration pages
    return NextResponse.redirect(new URL('/user/products', request.url));
  } else if (!loggedInUserNotAccessPaths && !user?.token) {
    // If the user is not logged in, they shouldn't access protected paths
    return NextResponse.redirect(new URL('/user/login', request.url));
  } else if (adminPaths && user?.role !== 'admin') {
    // If a non-admin user tries to access admin paths
    return NextResponse.redirect(new URL('/user/products', request.url));
  } else if (userPaths && user?.role === 'admin') {
    // If an admin tries to access user-specific paths
    return NextResponse.redirect(new URL('/admin/products', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/user/:path*', '/admin/:path*'],
};

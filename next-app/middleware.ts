import { NextRequest, NextResponse } from 'next/server';
import {
  buildClearedMembershipCookie,
  MEMBERSHIP_COOKIE_NAME,
  verifyMembershipToken,
} from './lib/membershipAccess';

export const config = {
  matcher: ['/roleplay/:path*', '/store/:path*'],
};

export async function middleware(request: NextRequest) {
  const roleplayPublicValue = process.env.NEXT_PUBLIC_ROLEPLAY_PUBLIC || '';
  const roleplayPublic =
    roleplayPublicValue.toLowerCase() === 'true' || roleplayPublicValue === '1';

  if (roleplayPublic && request.nextUrl.pathname.startsWith('/roleplay')) {
    return NextResponse.next();
  }

  const token = request.cookies.get(MEMBERSHIP_COOKIE_NAME)?.value;
  const active = await verifyMembershipToken(token);

  if (active) {
    return NextResponse.next();
  }

  const redirectUrl = new URL('/checkout-preview', request.url);
  const response = NextResponse.redirect(redirectUrl);
  response.headers.set('Cache-Control', 'no-store, max-age=0');
  response.cookies.set({
    name: MEMBERSHIP_COOKIE_NAME,
    value: '',
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
  });
  response.headers.set('Set-Cookie', buildClearedMembershipCookie(process.env.NODE_ENV === 'production'));
  return response;
}

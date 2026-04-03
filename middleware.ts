import { NextRequest, NextResponse } from 'next/server';
import {
  buildClearedMembershipCookie,
  MEMBERSHIP_COOKIE_NAME,
  verifyMembershipToken,
} from './lib/membershipAccess';
import {
  buildClearedSessionCookie,
  SESSION_COOKIE_NAME,
  verifySessionToken,
} from './lib/sessionAuth';

/**
 * Broad matcher — catches all page/API routes except Next.js internals and
 * static file extensions so we can enforce the auth gate everywhere.
 */
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.ico|site\\.webmanifest|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|woff2?|ttf|otf|css|js|map)).*)',
  ],
};

// ─── Route classifications ────────────────────────────────────────────────────

/** Alias → canonical route redirects (301). */
const ALIAS_REDIRECTS: Record<string, string> = {
  '/lab': '/roleplay',
  '/shop': '/store',
  '/dashboard': '/welcome',
  '/join': '/checkout-preview',
};

/**
 * Routes accessible without any login.
 * Everything NOT in this list requires a valid session cookie.
 */
const PUBLIC_ROUTES = new Set([
  '/',
  '/checkout-preview',
  '/success',
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/legal',
  '/terms',
  '/privacy-policy',
  '/refund-policy',
  '/cancel',
  '/olive',
  '/fsa',
  '/fsa-elite',
  '/fsaelite',
]);

/**
 * Routes that require login AND an active paid membership.
 * All other non-public routes only require login.
 */
const MEMBERSHIP_ROUTES = ['/roleplay', '/store', '/welcome'];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function isPublicRoute(pathname: string): boolean {
  // Exact match
  if (PUBLIC_ROUTES.has(pathname)) return true;
  // API auth routes are always public (they handle their own auth)
  if (pathname.startsWith('/api/auth/')) return true;
  // All other /api/* routes are handled internally
  if (pathname.startsWith('/api/')) return true;
  return false;
}

function requiresMembership(pathname: string): boolean {
  return MEMBERSHIP_ROUTES.some((r) => pathname.startsWith(r));
}

// ─── Middleware ───────────────────────────────────────────────────────────────

/** Hostnames that should be treated as the store domain and redirect to /store. */
const STORE_DOMAIN_HOSTS = new Set([
  'fsaeliteperformance.store',
  'www.fsaeliteperformance.store',
]);

/** www → bare canonical redirect map (301 permanent). */
const WWW_REDIRECTS: Record<string, string> = {
  'www.fsaeliteperformance.com': 'https://fsaeliteperformance.com',
  'www.fsaeliteperformance.store': 'https://fsaeliteperformance.store',
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isProduction = process.env.NODE_ENV === 'production';
  const host = request.headers.get('host') ?? '';

  // 0a. www → bare canonical redirect (301 permanent)
  const wwwCanonical = WWW_REDIRECTS[host];
  if (wwwCanonical) {
    const canonical = new URL(pathname, wwwCanonical);
    canonical.search = request.nextUrl.search;
    return NextResponse.redirect(canonical, 301);
  }

  // 0b. Store-domain redirect — fsaeliteperformance.store → /store
  if (STORE_DOMAIN_HOSTS.has(host) && pathname === '/') {
    const storeUrl = new URL('/store', request.url);
    return NextResponse.redirect(storeUrl, 302);
  }

  // 1. Alias redirects
  const aliasTarget = ALIAS_REDIRECTS[pathname];
  if (aliasTarget) {
    const url = new URL(aliasTarget, request.url);
    url.search = request.nextUrl.search;
    return NextResponse.redirect(url, 301);
  }

  // 2. Public routes — no login required
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // 3. Verify session cookie (login gate)
  const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const session = await verifySessionToken(sessionToken);

  if (!session) {
    // Redirect to login, preserving the intended destination
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('next', pathname);
    const response = NextResponse.redirect(loginUrl);
    response.headers.set('Cache-Control', 'no-store, max-age=0');
    // Clear any stale session cookie
    if (sessionToken) {
      response.headers.set('Set-Cookie', buildClearedSessionCookie(isProduction));
    }
    return response;
  }

  // 4. Membership gate (login is confirmed, now check paid access)
  if (requiresMembership(pathname)) {
    const membershipToken = request.cookies.get(MEMBERSHIP_COOKIE_NAME)?.value;
    const hasMembership = await verifyMembershipToken(membershipToken);

    if (!hasMembership) {
      const checkoutUrl = new URL('/checkout-preview', request.url);
      const response = NextResponse.redirect(checkoutUrl);
      response.headers.set('Cache-Control', 'no-store, max-age=0');
      // Clear stale membership cookie if present
      if (membershipToken) {
        response.headers.set(
          'Set-Cookie',
          buildClearedMembershipCookie(isProduction)
        );
      }
      return response;
    }
  }

  return NextResponse.next();
}

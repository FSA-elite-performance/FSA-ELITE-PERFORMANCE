/**
 * Edge-compatible (crypto.subtle) session token management.
 * Issued by /api/auth/login after Firebase ID-token verification,
 * verified by middleware without any Node.js-only dependencies.
 */

const SESSION_TOKEN_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 days

export const SESSION_COOKIE_NAME = 'fsaelite_session';

type SessionTokenPayload = {
  type: 'session';
  uid: string;
  email: string;
  issuedAt: number;
  expiresAt: number;
};

function getSigningSecret(): string | null {
  return (
    process.env.SESSION_SIGNING_SECRET?.trim() ||
    process.env.MEMBERSHIP_SIGNING_SECRET?.trim() ||
    process.env.STRIPE_SECRET_KEY?.trim() ||
    null
  );
}

function encodeBase64Url(value: string): string {
  return btoa(value).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function decodeBase64Url(value: string): string {
  const padded = value
    .replace(/-/g, '+')
    .replace(/_/g, '/')
    .padEnd(Math.ceil(value.length / 4) * 4, '=');
  return atob(padded);
}

async function signValue(value: string, secret: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(value));
  const binary = Array.from(
    new Uint8Array(signature),
    (byte) => String.fromCharCode(byte)
  ).join('');
  return encodeBase64Url(binary);
}

export async function createSessionToken(uid: string, email: string): Promise<string | null> {
  const secret = getSigningSecret();
  if (!secret) return null;

  const now = Math.floor(Date.now() / 1000);
  const payload: SessionTokenPayload = {
    type: 'session',
    uid: uid.trim(),
    email: email.trim(),
    issuedAt: now,
    expiresAt: now + SESSION_TOKEN_TTL_SECONDS,
  };

  const encodedPayload = encodeBase64Url(JSON.stringify(payload));
  const signature = await signValue(encodedPayload, secret);
  return `${encodedPayload}.${signature}`;
}

export async function verifySessionToken(
  token: string | null | undefined
): Promise<{ uid: string; email: string } | null> {
  if (!token) return null;

  const secret = getSigningSecret();
  if (!secret) return null;

  const dotIndex = token.lastIndexOf('.');
  if (dotIndex === -1) return null;

  const encodedPayload = token.slice(0, dotIndex);
  const providedSignature = token.slice(dotIndex + 1);
  if (!encodedPayload || !providedSignature) return null;

  const expectedSignature = await signValue(encodedPayload, secret);
  if (providedSignature !== expectedSignature) return null;

  try {
    const payload = JSON.parse(decodeBase64Url(encodedPayload)) as SessionTokenPayload;
    if (payload.type !== 'session') return null;
    if (typeof payload.uid !== 'string' || !payload.uid.trim()) return null;
    if (typeof payload.email !== 'string') return null;
    if (Math.floor(Date.now() / 1000) > payload.expiresAt) return null;
    return { uid: payload.uid, email: payload.email.trim() };
  } catch {
    return null;
  }
}

export function buildSessionCookieHeader(token: string, secure: boolean): string {
  const parts = [
    `${SESSION_COOKIE_NAME}=${token}`,
    'Path=/',
    `Max-Age=${SESSION_TOKEN_TTL_SECONDS}`,
    'HttpOnly',
    'SameSite=Lax',
  ];
  if (secure) parts.push('Secure');
  return parts.join('; ');
}

export function buildClearedSessionCookie(secure: boolean): string {
  const parts = [
    `${SESSION_COOKIE_NAME}=`,
    'Path=/',
    'Max-Age=0',
    'HttpOnly',
    'SameSite=Lax',
  ];
  if (secure) parts.push('Secure');
  return parts.join('; ');
}

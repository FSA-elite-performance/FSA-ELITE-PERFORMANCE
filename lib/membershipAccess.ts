const MEMBERSHIP_TOKEN_TTL_SECONDS = 60 * 60 * 24 * 180;

export const MEMBERSHIP_COOKIE_NAME = 'fsaelite_membership';

type MembershipTokenPayload = {
  type: 'membership';
  sessionId: string;
  issuedAt: number;
  expiresAt: number;
};

function getSigningSecret(): string | null {
  const configuredSecret = process.env.MEMBERSHIP_SIGNING_SECRET?.trim();
  if (configuredSecret) {
    return configuredSecret;
  }

  const fallbackSecret = process.env.STRIPE_SECRET_KEY?.trim();
  return fallbackSecret || null;
}

function encodeBase64Url(value: string): string {
  return btoa(value).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '');
}

function decodeBase64Url(value: string): string {
  const padded = value.replace(/-/g, '+').replace(/_/g, '/').padEnd(Math.ceil(value.length / 4) * 4, '=');
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
  const binary = Array.from(new Uint8Array(signature), (signatureByte) => String.fromCharCode(signatureByte)).join('');
  return encodeBase64Url(binary);
}

export function parseCookie(cookieHeader: string | undefined, name: string): string | null {
  if (!cookieHeader) {
    return null;
  }

  const match = cookieHeader
    .split(';')
    .map((cookieSegment) => cookieSegment.trim())
    .find((cookieSegment) => cookieSegment.startsWith(`${name}=`));

  return match ? match.slice(name.length + 1) : null;
}

export async function createMembershipToken(sessionId: string): Promise<string | null> {
  const secret = getSigningSecret();
  if (!secret) {
    return null;
  }

  const now = Math.floor(Date.now() / 1000);
  const payload: MembershipTokenPayload = {
    type: 'membership',
    sessionId,
    issuedAt: now,
    expiresAt: now + MEMBERSHIP_TOKEN_TTL_SECONDS,
  };

  const encodedPayload = encodeBase64Url(JSON.stringify(payload));
  const signature = await signValue(encodedPayload, secret);
  return `${encodedPayload}.${signature}`;
}

export async function verifyMembershipToken(token: string | null | undefined): Promise<boolean> {
  if (!token) {
    return false;
  }

  const secret = getSigningSecret();
  if (!secret) {
    return false;
  }

  const [encodedPayload, providedSignature] = token.split('.');
  if (!encodedPayload || !providedSignature) {
    return false;
  }

  const expectedSignature = await signValue(encodedPayload, secret);
  if (providedSignature !== expectedSignature) {
    return false;
  }

  try {
    const payload = JSON.parse(decodeBase64Url(encodedPayload)) as MembershipTokenPayload;
    if (payload.type !== 'membership') {
      return false;
    }

    if (!payload.sessionId || typeof payload.sessionId !== 'string') {
      return false;
    }

    return payload.expiresAt > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export function buildMembershipCookie(token: string, secure: boolean): string {
  const attributes = [
    `${MEMBERSHIP_COOKIE_NAME}=${token}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    `Max-Age=${MEMBERSHIP_TOKEN_TTL_SECONDS}`,
    'Priority=High',
  ];

  if (secure) {
    attributes.push('Secure');
  }

  return attributes.join('; ');
}

export function buildClearedMembershipCookie(secure: boolean): string {
  const attributes = [
    `${MEMBERSHIP_COOKIE_NAME}=`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    'Max-Age=0',
    'Expires=Thu, 01 Jan 1970 00:00:00 GMT',
    'Priority=High',
  ];

  if (secure) {
    attributes.push('Secure');
  }

  return attributes.join('; ');
}
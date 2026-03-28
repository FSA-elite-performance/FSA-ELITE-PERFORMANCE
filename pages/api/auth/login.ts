/**
 * POST /api/auth/login
 * Receives a Firebase ID token from the client, verifies it with Firebase Admin,
 * and issues an HMAC-signed session cookie (30 days, httpOnly).
 */
import type { NextApiRequest, NextApiResponse } from 'next';
import { getAdminAuth } from '../../../lib/firebaseAdmin';
import { createLogger, getRequestId } from '../../../lib/logger';
import { getClientIp, rateLimit } from '../../../lib/rateLimit';
import {
  buildSessionCookieHeader,
  createSessionToken,
} from '../../../lib/sessionAuth';

// ─── Rate limit: 10 login attempts per 60 s per IP ───────────────────────────
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_MS = 60_000;

type RequestBody = { idToken?: unknown };
type ResponseBody = { ok: boolean; error?: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseBody>
) {
  const log = createLogger(getRequestId(req));

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed.' });
  }

  // ── Rate limiting ──
  const ip = getClientIp(req);
  const limit = rateLimit(`${ip}:/api/auth/login`, {
    maxRequests: RATE_LIMIT_MAX,
    windowMs: RATE_LIMIT_WINDOW_MS,
  });
  if (!limit.allowed) {
    res.setHeader('Retry-After', String(limit.retryAfter));
    return res.status(429).json({ ok: false, error: 'Too many requests. Please wait before trying again.' });
  }

  const { idToken } = req.body as RequestBody;

  if (typeof idToken !== 'string' || !idToken.trim()) {
    return res.status(400).json({ ok: false, error: 'idToken is required.' });
  }

  let uid: string;
  let email: string;

  try {
    const decoded = await getAdminAuth().verifyIdToken(idToken.trim(), true);
    uid = decoded.uid;
    email = decoded.email ?? '';
  } catch {
    return res.status(401).json({ ok: false, error: 'Invalid or expired ID token.' });
  }

  const sessionToken = await createSessionToken(uid, email);
  if (!sessionToken) {
    log.error('Session signing key is not configured');
    return res.status(500).json({ ok: false, error: 'Session signing key is not configured.' });
  }

  const secure = process.env.NODE_ENV === 'production';
  res.setHeader('Set-Cookie', buildSessionCookieHeader(sessionToken, secure));
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  return res.status(200).json({ ok: true });
}

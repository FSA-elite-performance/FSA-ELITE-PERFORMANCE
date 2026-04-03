/**
 * POST /api/auth/login
 * Receives a Firebase ID token from the client, verifies it with Firebase Admin,
 * and issues an HMAC-signed session cookie (30 days, httpOnly).
 */
import type { NextApiRequest, NextApiResponse } from 'next';
import { getAdminAuth } from '../../../lib/firebaseAdmin';
import {
  buildSessionCookieHeader,
  createSessionToken,
} from '../../../lib/sessionAuth';

type RequestBody = { idToken?: unknown };
type ResponseBody = { ok: boolean; error?: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseBody>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed.' });
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

  if (!uid.trim() || !email.trim()) {
    return res.status(401).json({ ok: false, error: 'Invalid account information.' });
  }

  const sessionToken = await createSessionToken(uid, email);
  if (!sessionToken) {
    return res.status(500).json({ ok: false, error: 'Session signing key is not configured.' });
  }

  const secure = process.env.NODE_ENV === 'production';
  res.setHeader('Set-Cookie', buildSessionCookieHeader(sessionToken, secure));
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  return res.status(200).json({ ok: true });
}

/**
 * POST /api/auth/logout
 * Clears the session cookie and returns 200.
 */
import type { NextApiRequest, NextApiResponse } from 'next';
import { buildClearedSessionCookie } from '../../../lib/sessionAuth';

type ResponseBody = { ok: boolean };

export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseBody>) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false });
  }

  const secure = process.env.NODE_ENV === 'production';
  res.setHeader('Set-Cookie', buildClearedSessionCookie(secure));
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  return res.status(200).json({ ok: true });
}

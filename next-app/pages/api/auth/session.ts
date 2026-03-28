/**
 * GET /api/auth/session
 * Returns the current session state (active, email).
 */
import type { NextApiRequest, NextApiResponse } from 'next';
import { SESSION_COOKIE_NAME, verifySessionToken } from '../../../lib/sessionAuth';

type ResponseBody = { active: boolean; email?: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseBody>
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ active: false });
  }

  res.setHeader('Cache-Control', 'no-store, max-age=0');

  const token = req.cookies[SESSION_COOKIE_NAME];
  const session = await verifySessionToken(token);

  if (!session) {
    return res.status(200).json({ active: false });
  }

  return res.status(200).json({ active: true, email: session.email });
}

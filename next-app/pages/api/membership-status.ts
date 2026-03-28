import type { NextApiRequest, NextApiResponse } from 'next';
import { MEMBERSHIP_COOKIE_NAME, parseCookie, verifyMembershipToken } from '../../lib/membershipAccess';

type MembershipStatusResponse = {
  active: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MembershipStatusResponse>
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ active: false });
  }

  const token = parseCookie(req.headers.cookie, MEMBERSHIP_COOKIE_NAME);
  const active = await verifyMembershipToken(token);

  res.setHeader('Cache-Control', 'no-store, max-age=0');
  return res.status(200).json({ active });
}
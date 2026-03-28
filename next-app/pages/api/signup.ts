import type { NextApiRequest, NextApiResponse } from 'next';
import { start } from 'workflow/api';
import { handleUserSignup } from '@/workflows/user-signup';

type SuccessResponse = {
  message: string;
};

type ErrorResponse = {
  error: string;
};

type SignupBody = {
  email?: unknown;
};

const MAX_EMAIL_LENGTH = 254;

function sanitizeEmail(value: unknown): string {
  if (typeof value !== 'string') {
    return '';
  }

  const normalized = value.trim().toLowerCase();
  if (!normalized || normalized.length > MAX_EMAIL_LENGTH) {
    return '';
  }

  return normalized;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body as SignupBody;
  const sanitizedEmail = sanitizeEmail(email);

  if (!sanitizedEmail || !isValidEmail(sanitizedEmail)) {
    return res.status(400).json({ error: 'A valid email is required' });
  }

  try {
    await start(handleUserSignup, [sanitizedEmail]);
    return res.status(200).json({ message: 'User signup workflow started' });
  } catch (error: unknown) {
    console.error('Failed to start user signup workflow:', error);
    return res.status(500).json({ error: 'Unable to start signup workflow right now.' });
  }
}

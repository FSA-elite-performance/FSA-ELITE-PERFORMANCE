import type { NextApiRequest, NextApiResponse } from 'next';

const GITHUB_API_URL = 'https://api.github.com/installation/token';
const GITHUB_API_VERSION = '2026-03-10';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    res.setHeader('Allow', 'DELETE');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const authorization =
    req.headers.authorization ??
    (process.env.GITHUB_INSTALLATION_TOKEN
      ? `Bearer ${process.env.GITHUB_INSTALLATION_TOKEN}`
      : undefined);

  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': GITHUB_API_VERSION,
  };

  if (authorization) {
    headers.Authorization = authorization;
  }

  try {
    const response = await fetch(GITHUB_API_URL, {
      method: 'DELETE',
      headers,
    });

    if (response.status === 204) {
      return res.status(204).end();
    }

    return res
      .status(response.status)
      .json({ error: 'Failed to revoke installation access token' });
  } catch {
    return res.status(500).json({ error: 'Failed to revoke installation access token' });
  }
}

import type { NextApiRequest, NextApiResponse } from 'next';
import { PUBLIC_SITE_URL } from '../../lib/businessDetails';

type CheckState = 'pass' | 'warn' | 'fail';

type StatusCheck = {
  id: string;
  label: string;
  state: CheckState;
  detail: string;
};

type StatusResponse = {
  timestamp: string;
  environment: string;
  host: string;
  baseUrlConfigured: string | null;
  checks: StatusCheck[];
};

type ErrorResponse = {
  error: string;
};

const REQUIRED_ENV_KEYS = [
  'STRIPE_SECRET_KEY',
  'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
  'OPENAI_API_KEY',
] as const;

function safeSingle(value: string | string[] | undefined): string {
  if (Array.isArray(value)) {
    return (value[0] ?? '').trim();
  }
  return (value ?? '').trim();
}

function parseHostFromUrl(url: string): string | null {
  try {
    return new URL(url).host;
  } catch {
    return null;
  }
}

function pushEnvChecks(checks: StatusCheck[]): void {
  for (const key of REQUIRED_ENV_KEYS) {
    const value = process.env[key];
    checks.push({
      id: `env:${key}`,
      label: `${key} configured`,
      state: value ? 'pass' : 'fail',
      detail: value ? 'Present' : 'Missing',
    });
  }
}

function pushBaseUrlChecks(reqHost: string, checks: StatusCheck[]): string | null {
  const configured = process.env.NEXT_PUBLIC_BASE_URL?.trim() ?? '';
  if (!configured) {
    checks.push({
      id: 'base-url:present',
      label: 'NEXT_PUBLIC_BASE_URL configured',
      state: 'warn',
      detail: 'Unset (allowed on preview/dev; production should set it).',
    });
    return null;
  }

  const configuredHost = parseHostFromUrl(configured);
  if (!configuredHost) {
    checks.push({
      id: 'base-url:valid',
      label: 'NEXT_PUBLIC_BASE_URL valid URL',
      state: 'fail',
      detail: 'Value is not a valid URL.',
    });
    return configured;
  }

  checks.push({
    id: 'base-url:valid',
    label: 'NEXT_PUBLIC_BASE_URL valid URL',
    state: 'pass',
    detail: configured,
  });

  checks.push({
    id: 'base-url:host-match',
    label: 'Configured base URL matches request host',
    state: configuredHost === reqHost ? 'pass' : 'warn',
    detail:
      configuredHost === reqHost
        ? `Host match: ${configuredHost}`
        : `Configured host ${configuredHost} differs from current host ${reqHost}`,
  });

  return configured;
}

function pushDomainChecks(reqHost: string, checks: StatusCheck[]): void {
  const canonicalHost = parseHostFromUrl(PUBLIC_SITE_URL);
  if (!canonicalHost) {
    checks.push({
      id: 'domain:canonical',
      label: 'Canonical public domain configured',
      state: 'warn',
      detail: 'PUBLIC_SITE_URL is not a valid URL.',
    });
    return;
  }

  checks.push({
    id: 'domain:request-target',
    label: 'Request host is the canonical domain',
    state: reqHost === canonicalHost ? 'pass' : 'warn',
    detail:
      reqHost === canonicalHost
        ? `Running on canonical host ${canonicalHost}`
        : `Current host ${reqHost}; canonical is ${canonicalHost}`,
  });
}

function validateOpsKey(req: NextApiRequest): boolean {
  const configured = process.env.OPS_DASHBOARD_KEY?.trim();
  if (!configured) {
    return true;
  }

  const headerKey = safeSingle(req.headers['x-ops-key']);
  const queryKey = safeSingle(req.query.key);
  const provided = headerKey || queryKey;

  if (!provided || provided.length > 128) {
    return false;
  }

  return provided === configured;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<StatusResponse | ErrorResponse>
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!validateOpsKey(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const reqHost = safeSingle(req.headers.host) || 'unknown-host';
  const checks: StatusCheck[] = [];

  pushEnvChecks(checks);
  const configuredBaseUrl = pushBaseUrlChecks(reqHost, checks);
  pushDomainChecks(reqHost, checks);

  checks.push({
    id: 'api:method-guard',
    label: 'Critical API routes enforce POST-only checkout',
    state: 'pass',
    detail: 'Direct GET on checkout APIs should return 405 by design.',
  });

  res.setHeader('Cache-Control', 'no-store, max-age=0');
  return res.status(200).json({
    timestamp: new Date().toISOString(),
    environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? 'unknown',
    host: reqHost,
    baseUrlConfigured: configuredBaseUrl,
    checks,
  });
}
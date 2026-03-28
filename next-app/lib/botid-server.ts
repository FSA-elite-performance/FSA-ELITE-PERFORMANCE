import type { IncomingHttpHeaders } from 'node:http';
import type { BotIdProtectedRoute } from './botid-config';

function normalizeAllowedHost(host: string): string | null {
  const trimmedHost = host.trim();

  if (!trimmedHost) {
    return null;
  }

  try {
    const normalizedUrl = trimmedHost.includes('://') ? trimmedHost : `https://${trimmedHost}`;
    return new URL(normalizedUrl).hostname;
  } catch {
    console.warn(`Ignoring invalid BOTID_EXTRA_ALLOWED_HOSTS entry: ${trimmedHost}`);
    return null;
  }
}

function getExtraAllowedHosts(): string[] {
  const configuredHosts = process.env.BOTID_EXTRA_ALLOWED_HOSTS;

  if (!configuredHosts) {
    return [];
  }

  return configuredHosts
    .split(',')
    .map(normalizeAllowedHost)
    .filter((host): host is string => host !== null);
}

export function getBotIdServerOptions(
  route: BotIdProtectedRoute,
  headers: IncomingHttpHeaders
) {
  const extraAllowedHosts = getExtraAllowedHosts();

  return {
    advancedOptions: {
      checkLevel: route.advancedOptions.checkLevel,
      headers,
      ...(extraAllowedHosts.length > 0 ? { extraAllowedHosts } : {}),
    },
  };
}

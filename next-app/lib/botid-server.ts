import type { IncomingHttpHeaders } from 'node:http';
import { checkBotId } from 'botid/server';
import type { BotIdProtectedRoute } from './botid-config';

type BotVerification = Awaited<ReturnType<typeof checkBotId>>;

const DEFAULT_ALLOWED_VERIFIED_BOT_NAMES = ['chatgpt-operator'];

function parseAllowList(value: string | undefined, fallback: string[] = []): string[] {
  const parsed = value
    ?.split(',')
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

  return parsed && parsed.length > 0 ? parsed : fallback;
}

const ALLOWED_VERIFIED_BOT_NAMES = parseAllowList(
  process.env.BOTID_ALLOWED_VERIFIED_BOT_NAMES,
  DEFAULT_ALLOWED_VERIFIED_BOT_NAMES
);
const ALLOWED_VERIFIED_BOT_CATEGORIES = parseAllowList(
  process.env.BOTID_ALLOWED_VERIFIED_BOT_CATEGORIES
);

function normalizeAllowedHost(host: string): string | null {
  const trimmed = host.trim();
  if (!trimmed) return null;

  try {
    const normalizedUrl = trimmed.includes('://') ? trimmed : `https://${trimmed}`;
    return new URL(normalizedUrl).hostname;
  } catch {
    console.warn(`Ignoring invalid BOTID_EXTRA_ALLOWED_HOSTS entry: ${trimmed}`);
    return null;
  }
}

function getExtraAllowedHosts(): string[] {
  const configured = process.env.BOTID_EXTRA_ALLOWED_HOSTS;
  if (!configured) return [];

  return configured
    .split(',')
    .map(normalizeAllowedHost)
    .filter((host): host is string => host !== null);
}

export function getBotIdServerOptions(route: BotIdProtectedRoute, headers: IncomingHttpHeaders) {
  const extraAllowedHosts = getExtraAllowedHosts();

  return {
    advancedOptions: {
      checkLevel: route.advancedOptions.checkLevel,
      headers,
      ...(extraAllowedHosts.length > 0 ? { extraAllowedHosts } : {}),
    },
  };
}

export function isAllowedVerifiedBot(verification: BotVerification): boolean {
  if (!verification.isVerifiedBot) {
    return false;
  }

  const verificationRecord = verification as Record<string, unknown>;
  const verifiedBotNameRaw = verificationRecord.verifiedBotName;
  const verifiedBotCategoryRaw = verificationRecord.verifiedBotCategory;

  const verifiedBotName =
    typeof verifiedBotNameRaw === 'string' ? verifiedBotNameRaw.trim().toLowerCase() : undefined;
  const verifiedBotCategory =
    typeof verifiedBotCategoryRaw === 'string'
      ? verifiedBotCategoryRaw.trim().toLowerCase()
      : undefined;

  return Boolean(
    (verifiedBotName && ALLOWED_VERIFIED_BOT_NAMES.includes(verifiedBotName)) ||
      (verifiedBotCategory && ALLOWED_VERIFIED_BOT_CATEGORIES.includes(verifiedBotCategory))
  );
}

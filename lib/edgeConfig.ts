import { createClient, type EdgeConfigClient } from '@vercel/edge-config';

/**
 * Thin wrapper around @vercel/edge-config that fails gracefully when the
 * EDGE_CONFIG connection string is not set (local dev, static export, etc.).
 *
 * Usage:
 *   const maintenance = await getEdgeFlag('maintenance');
 */

let client: EdgeConfigClient | null = null;

function getClient(): EdgeConfigClient | null {
  if (client) return client;
  // EDGE_CONFIG is auto-injected by Vercel when an Edge Config store is linked.
  const connectionString = process.env.EDGE_CONFIG;
  if (!connectionString) return null;
  client = createClient(connectionString);
  return client;
}

/**
 * Read a boolean feature flag from Vercel Edge Config.
 * Returns `fallback` when the store is unavailable or the key is unset.
 */
export async function getEdgeFlag(
  key: string,
  fallback: boolean = false,
): Promise<boolean> {
  try {
    const c = getClient();
    if (!c) return fallback;
    const val = await c.get<boolean>(key);
    return val ?? fallback;
  } catch {
    return fallback;
  }
}

/**
 * Read an arbitrary typed value from Vercel Edge Config.
 * Returns `fallback` when the store is unavailable or the key is unset.
 */
export async function getEdgeValue<T>(
  key: string,
  fallback: T,
): Promise<T> {
  try {
    const c = getClient();
    if (!c) return fallback;
    const val = await c.get<T>(key);
    return val ?? fallback;
  } catch {
    return fallback;
  }
}

/**
 * Returns true when an Edge Config store is connected (EDGE_CONFIG env is set).
 */
export function isEdgeConfigAvailable(): boolean {
  return Boolean(process.env.EDGE_CONFIG);
}

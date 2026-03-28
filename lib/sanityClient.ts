import { createClient, type SanityClient } from '@sanity/client';

/**
 * Server-side Sanity client for authenticated API queries.
 * Import this from API routes or server-only library code — NEVER from
 * page components (static-export safety).
 *
 * Required env vars (set in .env.local / Vercel):
 *   SANITY_PROJECT_ID
 *   SANITY_DATASET
 *   SANITY_API_READ_TOKEN   (for read-only queries)
 *   SANITY_API_WRITE_TOKEN  (for mutations — use sparingly)
 */

const projectId = process.env.SANITY_PROJECT_ID ?? '';
const dataset = process.env.SANITY_DATASET ?? 'production';
const readToken = process.env.SANITY_API_READ_TOKEN ?? '';
const writeToken = process.env.SANITY_API_WRITE_TOKEN ?? '';

const API_VERSION = '2024-01-01';

let _readClient: SanityClient | null = null;
let _writeClient: SanityClient | null = null;

/** Read-only Sanity client (uses SANITY_API_READ_TOKEN). */
export function getReadClient(): SanityClient {
  if (!_readClient) {
    _readClient = createClient({
      projectId,
      dataset,
      apiVersion: API_VERSION,
      token: readToken,
      useCdn: true,
    });
  }
  return _readClient;
}

/** Read-write Sanity client (uses SANITY_API_WRITE_TOKEN). */
export function getWriteClient(): SanityClient {
  if (!_writeClient) {
    _writeClient = createClient({
      projectId,
      dataset,
      apiVersion: API_VERSION,
      token: writeToken,
      useCdn: false,
    });
  }
  return _writeClient;
}

/**
 * Public project config for client-side use (no tokens).
 * Safe to import from page components.
 */
export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: API_VERSION,
} as const;

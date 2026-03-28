/**
 * Structured JSON logger for API routes.
 *
 * Each log entry is serialized as a single JSON line, making it easy for
 * Vercel Log Drains and other ingestion pipelines to parse. Use `createLogger`
 * within a handler to bind a request-scoped correlation ID to every message.
 */

import type { NextApiRequest } from 'next';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';
export type LogData = Record<string, unknown>;

export interface Logger {
  debug(msg: string, data?: LogData): void;
  info(msg: string, data?: LogData): void;
  warn(msg: string, data?: LogData): void;
  error(msg: string, data?: LogData): void;
}

function emit(level: LogLevel, requestId: string, msg: string, data?: LogData): void {
  const entry = {
    level,
    msg,
    ts: new Date().toISOString(),
    requestId,
    ...data,
  };
  const line = JSON.stringify(entry);
  if (level === 'error') {
    console.error(line);
  } else if (level === 'warn') {
    console.warn(line);
  } else {
    console.log(line);
  }
}

/**
 * Creates a structured JSON logger bound to a `requestId` for log correlation.
 *
 * @param requestId  Short identifier shared across all log lines for this request.
 */
export function createLogger(requestId: string): Logger {
  return {
    debug: (msg, data) => emit('debug', requestId, msg, data),
    info:  (msg, data) => emit('info',  requestId, msg, data),
    warn:  (msg, data) => emit('warn',  requestId, msg, data),
    error: (msg, data) => emit('error', requestId, msg, data),
  };
}

/**
 * Extracts or generates a request ID from the incoming request headers.
 *
 * Uses the `x-request-id` header when present (forwarded by Vercel or upstreams);
 * otherwise generates a short random hex ID.
 */
export function getRequestId(req: NextApiRequest): string {
  const header = req.headers['x-request-id'];
  const value = Array.isArray(header) ? header[0] : header;
  if (value?.trim()) {
    // Allow only safe ASCII characters; cap at 64 chars to prevent log injection.
    return value.trim().replace(/[^\w\-]/g, '').slice(0, 64);
  }
  // 8 hex chars ≈ 32 bits of entropy — adequate for log correlation.
  return Math.random().toString(16).slice(2, 10);
}

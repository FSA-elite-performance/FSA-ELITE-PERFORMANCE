import type { NextApiRequest, NextApiResponse } from 'next';
import { checkBotId } from 'botid/server';
import { BOTID_ROUTE_CONFIG } from '../../lib/botid-config';
import { getBotIdServerOptions, isAllowedVerifiedBot } from '../../lib/botid-server';

// ─── Types ────────────────────────────────────────────────────────────────────
type ErrorResponse = { error: string };
type SuccessResponse = { clientSecret: string; expiresAt: number };
type SessionBody = { personaInstructions?: unknown };

// ─── OpenAI Realtime session endpoint ─────────────────────────────────────────
const REALTIME_SESSION_URL = 'https://api.openai.com/v1/realtime/sessions';
const REALTIME_MODEL = 'gpt-4o-realtime-preview-2025-06-03';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // ── BotID check (same level as ai-chat) ──
  try {
    const verification = await checkBotId(
      getBotIdServerOptions(BOTID_ROUTE_CONFIG.aiChat, req.headers)
    );
    if (verification.isBot && !isAllowedVerifiedBot(verification)) {
      return res.status(403).json({ error: 'Access denied.' });
    }
  } catch (error: unknown) {
    console.error('BotID verification failed for /api/realtime-session:', error);
    return res.status(500).json({ error: 'Service temporarily unavailable.' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error('OPENAI_API_KEY is not set');
    return res.status(500).json({ error: 'AI service is not configured.' });
  }

  // ── Parse optional persona instructions ──
  const body = req.body as SessionBody;
  const personaInstructions =
    typeof body.personaInstructions === 'string' && body.personaInstructions.length <= 4000
      ? body.personaInstructions.trim()
      : '';

  const instructions = personaInstructions
    ? personaInstructions
    : 'You are OLIVE, an elite AI sales coach. Help the user practice objection handling. Stay in character as a tough but fair buyer.';

  try {
    const response = await fetch(REALTIME_SESSION_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: REALTIME_MODEL,
        voice: 'ash',
        instructions,
        input_audio_transcription: {
          model: 'gpt-4o-mini-transcribe',
        },
        turn_detection: {
          type: 'server_vad',
          threshold: 0.5,
          prefix_padding_ms: 300,
          silence_duration_ms: 500,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI Realtime session creation failed:', response.status, errorText);
      return res.status(502).json({ error: 'Failed to create voice session.' });
    }

    const data = (await response.json()) as {
      client_secret?: { value?: string; expires_at?: number };
    };

    const clientSecret = data.client_secret?.value;
    const expiresAt = data.client_secret?.expires_at ?? 0;

    if (!clientSecret) {
      console.error('OpenAI Realtime session missing client_secret');
      return res.status(502).json({ error: 'Voice session response was incomplete.' });
    }

    return res.status(200).json({ clientSecret, expiresAt });
  } catch (error: unknown) {
    console.error('OpenAI Realtime session error:', error);
    return res.status(500).json({ error: 'Failed to initialize voice session.' });
  }
}

import type { NextApiRequest, NextApiResponse } from 'next';
import { checkBotId } from 'botid/server';
import OpenAI from 'openai';
import { AI_CHAT_MAX_MSG_CHARS } from '../../lib/aiChatConstants';
import { BOTID_ROUTE_CONFIG } from '../../lib/botid-config';
import { getBotIdServerOptions, isAllowedVerifiedBot } from '../../lib/botid-server';
import {
  OLIVE_GENERAL_SYSTEM_PROMPT,
  OLIVE_PAGE_CONTEXTS,
} from '../../lib/olivePersona';

// ─── Limits ───────────────────────────────────────────────────────────────────
const MAX_MESSAGES = 20;
const MAX_MSG_CHARS = AI_CHAT_MAX_MSG_CHARS;

function getAiApiBaseUrl(): string {
  const configured = process.env.AI_API_BASE_URL?.trim();
  const fallback = 'https://api.dedaluslabs.ai/v1';
  if (!configured) {
    return fallback;
  }

  try {
    const parsed = new URL(configured);
    return parsed.toString().replace(/\/$/, '');
  } catch (error: unknown) {
    console.error('Invalid AI_API_BASE_URL, falling back to default:', error);
    return fallback;
  }
}

// ─── Mode-specific system prompts ─────────────────────────────────────────────
const OLIVE_COACH_SYSTEM_PROMPT = `You are OLIVE — a sharp, no-BS sales coach. The user will give you a real objection exactly as a prospect said it.

Your job:
1. **Rebuttal** — Give the exact words the rep should say back. Make it field-ready, conversational, and sharp. No softening.
2. **Why it works** — In 1–2 sentences, explain the psychological or tactical reason that reframe or response is effective.
3. **Variation (optional)** — If timing or context matters, offer one tight alternative.

Keep the whole response under 150 words. Avoid corporate speak. This is for closers.`;

const OLIVE_BATTLE_SYSTEM_PROMPT = `You are OLIVE — playing the role of a tough, realistic prospect in a live sales battle.

HOW THIS WORKS:
- You throw a realistic sales objection at the user.
- The user responds with what they would actually say.
- You score their response in 1–2 sharp sentences (what landed, what missed, what to fix).
- Then you immediately throw the next objection — no break, no fluff.

Ground rules:
- Be a real prospect: skeptical, busy, price-sensitive, or already talking to competitors.
- Rotate objection types: price, timing, competition, need, authority.
- If they nail it, say so briefly and escalate with a harder one.
- If they fumble, tell them exactly why and throw it back.

Tone: direct, competitive, fast-paced. No hand-holding. Keep each turn under 80 words.`;

// ─── Singleton client ─────────────────────────────────────────────────────────
let openaiClient: OpenAI | null = null;
let openaiClientKey = '';
function getOpenAIClient(apiKey: string, projectId?: string): OpenAI {
  const aiApiBaseUrl = getAiApiBaseUrl();
  const clientKey = `${apiKey}:${projectId ?? ''}:${aiApiBaseUrl}`;
  if (!openaiClient || openaiClientKey !== clientKey) {
    openaiClient = new OpenAI({
      apiKey,
      baseURL: aiApiBaseUrl,
      ...(projectId ? { project: projectId } : {}),
    });
    openaiClientKey = clientKey;
  }
  return openaiClient;
}

// ─── Types ────────────────────────────────────────────────────────────────────
type IncomingMessage = { role?: unknown; content?: unknown };
type RequestBody = { messages?: unknown; pageContext?: unknown; mode?: unknown };
type ErrorResponse = { error: string };
type SuccessResponse = { reply: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Re-use the ai-chat BotID config (same check level).
  try {
    const verification = await checkBotId(
      getBotIdServerOptions(BOTID_ROUTE_CONFIG.aiChat, req.headers)
    );
    if (verification.isBot && !isAllowedVerifiedBot(verification)) {
      console.warn('BotID blocked request to /api/olive-chat');
      return res.status(403).json({ error: 'Access denied.' });
    }
  } catch (error: unknown) {
    console.error('BotID verification failed for /api/olive-chat:', error);
    return res.status(500).json({ error: 'Service temporarily unavailable. Please try again later.' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  const projectId = process.env.OPENAI_PROJECT_ID?.trim();
  if (!apiKey) {
    console.error('OPENAI_API_KEY is not set');
    return res.status(500).json({ error: 'AI service is not configured. Contact support.' });
  }

  const { messages, pageContext, mode } = req.body as RequestBody;

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages must be a non-empty array.' });
  }

  if (messages.length > MAX_MESSAGES) {
    return res.status(400).json({ error: `Too many messages. Maximum is ${MAX_MESSAGES} per request.` });
  }

  // Validate mode — default to 'general' for unknown values.
  const resolvedMode = mode === 'coach' ? 'coach' : mode === 'battle' ? 'battle' : 'general';

  const sanitizedMessages: Array<{ role: 'user' | 'assistant'; content: string }> = [];

  for (const msg of messages) {
    const candidate = msg as IncomingMessage;
    if (!candidate || typeof candidate.role !== 'string' || typeof candidate.content !== 'string') {
      return res.status(400).json({ error: 'Each message must have a role and content string.' });
    }
    if (!['user', 'assistant'].includes(candidate.role)) {
      return res.status(400).json({ error: 'Message role must be "user" or "assistant".' });
    }
    if (candidate.content.length > MAX_MSG_CHARS) {
      return res.status(400).json({ error: `Message content exceeds ${MAX_MSG_CHARS} character limit.` });
    }
    const normalized = candidate.content.replace(/\s+/g, ' ').trim();
    if (!normalized) {
      return res.status(400).json({ error: 'Message content cannot be empty.' });
    }
    sanitizedMessages.push({
      role: candidate.role as 'user' | 'assistant',
      content: normalized,
    });
  }

  // Build the system prompt based on mode.
  let systemPrompt: string;
  if (resolvedMode === 'coach') {
    systemPrompt = OLIVE_COACH_SYSTEM_PROMPT;
  } else if (resolvedMode === 'battle') {
    systemPrompt = OLIVE_BATTLE_SYSTEM_PROMPT;
  } else {
    systemPrompt = OLIVE_GENERAL_SYSTEM_PROMPT;
    // Inject page context only for general mode.
    if (typeof pageContext === 'string' && pageContext in OLIVE_PAGE_CONTEXTS) {
      systemPrompt += `\n\nPage context: ${OLIVE_PAGE_CONTEXTS[pageContext]}`;
    }
  }

  const client = getOpenAIClient(apiKey, projectId);

  try {
    const completion = await client.chat.completions.create({
      model: 'openai/gpt-5',
      messages: [
        { role: 'system', content: systemPrompt },
        ...sanitizedMessages,
      ],
      max_tokens: resolvedMode === 'general' ? 250 : 300,
      temperature: resolvedMode === 'battle' ? 0.9 : 0.8,
    });

    const reply = completion.choices[0]?.message?.content?.trim();
    if (!reply) {
      return res.status(500).json({ error: 'No response from OLIVE. Please try again.' });
    }

    return res.status(200).json({ reply });
  } catch (err: unknown) {
    console.error('OpenAI error (olive-chat):', err);
    return res.status(500).json({ error: 'OLIVE is temporarily unavailable. Please try again later.' });
  }
}

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

// ─── Singleton client ─────────────────────────────────────────────────────────
const AI_API_BASE_URL =
  process.env.AI_API_BASE_URL?.trim() || 'https://api.dedaluslabs.ai/v1';

let openaiClient: OpenAI | null = null;
let openaiClientKey = '';
function getOpenAIClient(apiKey: string, projectId?: string): OpenAI {
  const clientKey = `${apiKey}:${projectId ?? ''}:${AI_API_BASE_URL}`;
  if (!openaiClient || openaiClientKey !== clientKey) {
    openaiClient = new OpenAI({
      apiKey,
      baseURL: AI_API_BASE_URL,
      ...(projectId ? { project: projectId } : {}),
    });
    openaiClientKey = clientKey;
  }
  return openaiClient;
}

// ─── Types ────────────────────────────────────────────────────────────────────
type IncomingMessage = { role?: unknown; content?: unknown };
type RequestBody = { messages?: unknown; pageContext?: unknown };
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

  const { messages, pageContext } = req.body as RequestBody;

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages must be a non-empty array.' });
  }

  if (messages.length > MAX_MESSAGES) {
    return res.status(400).json({ error: `Too many messages. Maximum is ${MAX_MESSAGES} per request.` });
  }

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

  // Build the OLIVE system prompt with optional page-context awareness.
  let systemPrompt = OLIVE_GENERAL_SYSTEM_PROMPT;

  if (typeof pageContext === 'string' && pageContext in OLIVE_PAGE_CONTEXTS) {
    systemPrompt += `\n\nPage context: ${OLIVE_PAGE_CONTEXTS[pageContext]}`;
  }

  const client = getOpenAIClient(apiKey, projectId);

  try {
    const completion = await client.chat.completions.create({
      model: 'openai/gpt-5',
      messages: [
        { role: 'system', content: systemPrompt },
        ...sanitizedMessages,
      ],
      max_tokens: 250,
      temperature: 0.8,
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

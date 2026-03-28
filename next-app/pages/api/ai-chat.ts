import type { NextApiRequest, NextApiResponse } from 'next';
import { checkBotId } from 'botid/server';
import OpenAI from 'openai';
import { AI_CHAT_MAX_MESSAGES, AI_CHAT_MAX_MSG_CHARS } from '../../lib/aiChatConstants';
import { BOTID_ROUTE_CONFIG } from '../../lib/botid-config';
import { getBotIdServerOptions, isAllowedVerifiedBot } from '../../lib/botid-server';
import { OLIVE_ROLEPLAY_SYSTEM_PROMPT } from '../../lib/olivePersona';

// ─── Limits ───────────────────────────────────────────────────────────────────
const MAX_MESSAGES = AI_CHAT_MAX_MESSAGES;
const MAX_MSG_CHARS = AI_CHAT_MAX_MSG_CHARS;
const OLIVE_NAME = process.env.OLIVE_ASSISTANT_NAME?.trim() || 'OLIVE';

// ─── Singleton client (reused across warm serverless invocations) ─────────────
let openaiClient: OpenAI | null = null;
let openaiClientKey = '';
function getOpenAIClient(apiKey: string, projectId?: string): OpenAI {
  const clientKey = `${apiKey}:${projectId ?? ''}`;

  if (!openaiClient || openaiClientKey !== clientKey) {
    openaiClient = new OpenAI({
      apiKey,
      ...(projectId ? { project: projectId } : {}),
    });
    openaiClientKey = clientKey;
  }
  return openaiClient;
}

const SYSTEM_PROMPT = OLIVE_ROLEPLAY_SYSTEM_PROMPT;

type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

type RequestBody = {
  messages?: unknown;
  scenarioContext?: unknown;
};

type IncomingMessage = {
  role?: unknown;
  content?: unknown;
};

type ScenarioContext = {
  personaName: string;
  goal: string;
  fear: string;
  constraint: string;
  triggerPhrases: string[];
  decisionStyle: string;
  proofNeeded: string;
  hiddenVariables: {
    budgetRange: string;
    tradeStatus: string;
    creditConfidence: string;
    spouseVeto: string;
    patienceStart: number;
  };
  patienceMeter: number;
  bossLevel: boolean;
};

type ErrorResponse = { error: string };
type SuccessResponse = { reply: string };

function clamp(value: number, min: number, max: number): number {
  if (value < min) return min;
  if (value > max) return max;
  return value;
}

function parseScenarioContext(value: unknown): ScenarioContext | null {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const candidate = value as Record<string, unknown>;
  const hiddenVariables = candidate.hiddenVariables as Record<string, unknown> | undefined;

  const triggerPhrases = Array.isArray(candidate.triggerPhrases)
    ? candidate.triggerPhrases.filter((entry): entry is string => typeof entry === 'string' && entry.trim().length > 0)
    : [];

  if (
    typeof candidate.personaName !== 'string' ||
    typeof candidate.goal !== 'string' ||
    typeof candidate.fear !== 'string' ||
    typeof candidate.constraint !== 'string' ||
    typeof candidate.decisionStyle !== 'string' ||
    typeof candidate.proofNeeded !== 'string' ||
    typeof candidate.patienceMeter !== 'number' ||
    typeof candidate.bossLevel !== 'boolean' ||
    !hiddenVariables ||
    typeof hiddenVariables.budgetRange !== 'string' ||
    typeof hiddenVariables.tradeStatus !== 'string' ||
    typeof hiddenVariables.creditConfidence !== 'string' ||
    typeof hiddenVariables.spouseVeto !== 'string' ||
    typeof hiddenVariables.patienceStart !== 'number'
  ) {
    return null;
  }

  return {
    personaName: candidate.personaName.trim(),
    goal: candidate.goal.trim(),
    fear: candidate.fear.trim(),
    constraint: candidate.constraint.trim(),
    triggerPhrases,
    decisionStyle: candidate.decisionStyle.trim(),
    proofNeeded: candidate.proofNeeded.trim(),
    hiddenVariables: {
      budgetRange: hiddenVariables.budgetRange.trim(),
      tradeStatus: hiddenVariables.tradeStatus.trim(),
      creditConfidence: hiddenVariables.creditConfidence.trim(),
      spouseVeto: hiddenVariables.spouseVeto.trim(),
      patienceStart: clamp(hiddenVariables.patienceStart, 1, 100),
    },
    patienceMeter: clamp(candidate.patienceMeter, 1, 100),
    bossLevel: candidate.bossLevel,
  };
}

function scenarioPrompt(context: ScenarioContext | null): string {
  if (!context) {
    return '';
  }

  const pressure =
    context.patienceMeter < 30
      ? 'very impatient and highly resistant'
      : context.patienceMeter < 60
        ? 'guarded and skeptical'
        : 'cautious but still engaged';

  return `\n\nPersona Engine Context:\n- Persona: ${context.personaName}${context.bossLevel ? ' (Boss Level)' : ''}\n- Goal: ${context.goal}\n- Fear: ${context.fear}\n- Constraint: ${context.constraint}\n- Decision style: ${context.decisionStyle}\n- Proof needed: ${context.proofNeeded}\n- Trigger phrases: ${context.triggerPhrases.join(', ') || 'None'}\n- Hidden variables:\n  - Budget range: ${context.hiddenVariables.budgetRange}\n  - Trade status: ${context.hiddenVariables.tradeStatus}\n  - Credit confidence: ${context.hiddenVariables.creditConfidence}\n  - Spouse veto: ${context.hiddenVariables.spouseVeto}\n- Current patience meter: ${context.patienceMeter}/100 (${pressure})\n\nBehavior rules:\n- Every customer reply must include emotion + an objection/concern.\n- Reveal new information only if the salesperson asks quality discovery questions.\n- Resist generic pitches and weak close attempts.\n- If patience is low, challenge vague claims and push for proof.\n- Do not expose hidden variables unless the salesperson earns them through relevant questions.`;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const verification = await checkBotId(
      getBotIdServerOptions(BOTID_ROUTE_CONFIG.aiChat, req.headers)
    );

    if (verification.isBot && !isAllowedVerifiedBot(verification)) {
      console.warn('BotID blocked request to /api/ai-chat');
      return res.status(403).json({ error: 'Access denied.' });
    }
  } catch (error: unknown) {
    console.error('BotID verification failed for /api/ai-chat:', error);
    return res.status(500).json({ error: 'Service temporarily unavailable. Please try again later.' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  const projectId = process.env.OPENAI_PROJECT_ID?.trim();
  if (!apiKey) {
    console.error('OPENAI_API_KEY is not set');
    return res.status(500).json({ error: 'AI service is not configured. Contact support.' });
  }

  const { messages, scenarioContext } = req.body as RequestBody;
  const parsedScenarioContext = parseScenarioContext(scenarioContext);

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages must be a non-empty array.' });
  }

  if (messages.length > MAX_MESSAGES) {
    return res
      .status(400)
      .json({ error: `Too many messages. Maximum is ${MAX_MESSAGES} per request.` });
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
      return res
        .status(400)
        .json({ error: `Message content exceeds ${MAX_MSG_CHARS} character limit.` });
    }

    // Basic sanitization: normalize whitespace and reject empty content after trim.
    const normalized = candidate.content.replace(/\s+/g, ' ').trim();
    if (!normalized) {
      return res.status(400).json({ error: 'Message content cannot be empty.' });
    }

    sanitizedMessages.push({
      role: candidate.role as 'user' | 'assistant',
      content: normalized,
    });
  }

  const client = getOpenAIClient(apiKey, projectId);

  try {
    // Prefer a configured Prompt ID (server-managed prompt) if provided.
    const promptId = process.env.OPENAI_PROMPT_ID;

    if (promptId) {
      // Use the Responses API with a prompt reference. Fall back to chat completions if structure differs.
      const inputs = [
        { role: 'system', content: `${SYSTEM_PROMPT}${scenarioPrompt(parsedScenarioContext)}` },
        ...sanitizedMessages,
      ].map((m) => `${m.role.toUpperCase()}: ${m.content}`);

      const responseAny: any = await client.responses.create({
        model: 'gpt-4o-mini',
        prompt: { id: promptId, version: '1' },
        input: inputs.join('\n\n'),
        max_output_tokens: 300,
        temperature: 0.85,
      });

      // The Responses API can return different shapes; try common locations for text output.
      const replyText =
        responseAny.output_text ??
        (Array.isArray(responseAny.output) && responseAny.output[0]?.content?.find((c: { type: string }) => c.type === 'output_text')?.text) ??
        responseAny.output?.[0]?.content?.[0]?.text ??
        null;

      if (!replyText) {
        return res.status(500).json({ error: 'No response from AI. Please try again.' });
      }

      return res.status(200).json({ reply: String(replyText).trim() });
    }

    // Fallback: use chat completions when no Prompt ID is configured.
    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: `${SYSTEM_PROMPT}${scenarioPrompt(parsedScenarioContext)}` },
        ...sanitizedMessages,
      ],
      max_tokens: 300,
      temperature: 0.85,
    });

    const reply = completion.choices[0]?.message?.content?.trim();
    if (!reply) {
      return res.status(500).json({ error: 'No response from AI. Please try again.' });
    }

    return res.status(200).json({ reply });
  } catch (err: unknown) {
    console.error('OpenAI error:', err);
    return res.status(500).json({ error: 'AI service unavailable. Please try again later.' });
  }
}

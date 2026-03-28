import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { AI_CHAT_MAX_MESSAGES, AI_CHAT_MAX_MSG_CHARS } from '../../lib/aiChatConstants';

// ─── Limits ───────────────────────────────────────────────────────────────────
const MAX_MESSAGES = AI_CHAT_MAX_MESSAGES;
const MAX_MSG_CHARS = AI_CHAT_MAX_MSG_CHARS;

// ─── Singleton client (reused across warm serverless invocations) ─────────────
let openaiClient: OpenAI | null = null;
function getOpenAIClient(apiKey: string): OpenAI {
  if (!openaiClient) {
    openaiClient = new OpenAI({ apiKey });
  }
  return openaiClient;
}

const SYSTEM_PROMPT = `You are an AI sales training assistant for FSA Elite — a premium sales training program for automotive salespeople.

Your role is to simulate a realistic, challenging car-buying customer during roleplay sessions. You play a tough but fair prospect who:
- Has done some research online but still has questions
- Is price-sensitive and will push back on numbers
- Has common objections: "I need to think about it", "I'm just looking", "The payment is too high", "I can get it cheaper elsewhere"
- Responds authentically to good rapport-building, empathy, and skilled objection handling
- Will gradually open up and move toward a decision when the salesperson demonstrates value and builds trust
- Reacts negatively to high-pressure tactics, dishonesty, or being rushed

Keep responses concise and realistic — 2 to 4 sentences as a real customer would speak. Stay in character throughout the roleplay.

When the user types "/help" or asks for coaching feedback (out of character), break character and provide brief, actionable coaching tips on what they did well or could improve, then invite them to continue the roleplay.`;

type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

type RequestBody = {
  messages: Message[];
};

type ErrorResponse = { error: string };
type SuccessResponse = { reply: string };

export default async function aiChatHandler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error('OPENAI_API_KEY is not set');
    return res.status(500).json({ error: 'AI service is not configured. Contact support.' });
  }

  const { messages } = req.body as RequestBody;

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages must be a non-empty array.' });
  }

  if (messages.length > MAX_MESSAGES) {
    return res
      .status(400)
      .json({ error: `Too many messages. Maximum is ${MAX_MESSAGES} per request.` });
  }

  for (const message of messages) {
    if (!message || typeof message.role !== 'string' || typeof message.content !== 'string') {
      return res.status(400).json({ error: 'Each message must have a role and content string.' });
    }
    if (!['user', 'assistant'].includes(message.role)) {
      return res.status(400).json({ error: 'Message role must be "user" or "assistant".' });
    }
    if (message.content.length > MAX_MSG_CHARS) {
      return res
        .status(400)
        .json({ error: `Message content exceeds ${MAX_MSG_CHARS} character limit.` });
    }
  }

  const openAIClient = getOpenAIClient(apiKey);

  try {
    const chatCompletion = await openAIClient.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
      max_tokens: 300,
      temperature: 0.85,
    });

    const reply = chatCompletion.choices[0]?.message?.content?.trim();
    if (!reply) {
      return res.status(500).json({ error: 'No response from AI. Please try again.' });
    }

    return res.status(200).json({ reply });
  } catch (error: unknown) {
    console.error('OpenAI error:', error);
    const errorMessage =
      error instanceof OpenAI.APIError
        ? error.message
        : 'AI service unavailable. Please try again later.';
    return res.status(500).json({ error: errorMessage });
  }
}

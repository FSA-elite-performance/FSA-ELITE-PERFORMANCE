import type { NextApiRequest, NextApiResponse } from 'next';
import { OLIVE_ROLEPLAY_SYSTEM_PROMPT } from '../../lib/olivePersona';
import { getPersonaById, PERSONA_ORDER, type PersonaId } from '../../lib/roleplayIntelligence';

type SuccessResponse = { instructions: string };
type ErrorResponse = { error: string };

/**
 * GET /api/voice-instructions?personaId=<id>
 *
 * Returns the compiled real-time voice instructions for the requested persona.
 * Keeping the system prompt server-side removes it from the client bundle and
 * prevents the AI instructions from being exposed in the browser source.
 */
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { personaId } = req.query;

  if (
    typeof personaId !== 'string' ||
    !(PERSONA_ORDER as readonly string[]).includes(personaId)
  ) {
    return res.status(400).json({ error: 'Invalid or missing personaId' });
  }

  const persona = getPersonaById(personaId as PersonaId);

  const instructions = `${OLIVE_ROLEPLAY_SYSTEM_PROMPT}

You are now playing the role of "${persona.label}".
Goal: ${persona.goal}
Fear: ${persona.fear}
Constraint: ${persona.constraint}
Decision style: ${persona.decisionStyle}
Proof needed: ${persona.proofNeeded}
Hidden budget range: ${persona.hiddenVariables.budgetRange}
Trade status: ${persona.hiddenVariables.tradeStatus}
Credit confidence: ${persona.hiddenVariables.creditConfidence}

Stay fully in character. Respond as this buyer would in a real conversation. Keep responses to 2-4 sentences.`;

  // Instructions are static per persona — safe to cache privately for 1 hour.
  res.setHeader('Cache-Control', 'private, max-age=3600');
  return res.status(200).json({ instructions });
}

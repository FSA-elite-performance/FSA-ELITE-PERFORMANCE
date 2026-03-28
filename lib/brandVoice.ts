// ─── FSA ELITE Brand Voice Constants ──────────────────────────────────────────
// Canonical brand copy and tone references used across pages, components, and
// AI prompts.  Everything in this file must match docs/BRAND_VOICE.md.

// ─── Core Identity ───────────────────────────────────────────────────────────

export const BRAND_TAGLINE = 'Sharper reps. Stronger presence.';

export const BRAND_ONE_LINER =
  'AI-powered sales training and self-branding tools for closers who refuse to blend in.';

export const BRAND_MISSION =
  'Give every sales professional the training, tools, and identity to walk into any room and command it.';

// ─── Voice Principles ────────────────────────────────────────────────────────

/** The five adjectives that define every piece of FSA ELITE copy. */
export const VOICE_TRAITS = [
  'Sharp',
  'Confident',
  'Direct',
  'Real',
  'Supportive',
] as const;

export type VoiceTrait = (typeof VOICE_TRAITS)[number];

/** Words we use and the weaker alternatives they replace. */
export const PREFERRED_WORDS: ReadonlyArray<{ use: string; insteadOf: string }> = [
  { use: 'sharper', insteadOf: 'better' },
  { use: 'presence', insteadOf: 'brand awareness' },
  { use: 'drill', insteadOf: 'practice' },
  { use: 'close', insteadOf: 'convert' },
  { use: 'walk in', insteadOf: 'show up' },
  { use: 'leave-behind', insteadOf: 'marketing material' },
  { use: 'the floor', insteadOf: 'the workspace' },
  { use: 'your name', insteadOf: 'your brand' },
];

/** Words and phrases that must never appear in FSA ELITE copy. */
export const BANNED_WORDS = [
  'guru',
  'hack',
  'secret',
  'crush it',
  'grindset',
  'game-changer',
  'unlock your potential',
  'limited time offer',
  'synergy',
  'leverage',
  'circle back',
  'hustle harder',
] as const;

// ─── Objection Model ─────────────────────────────────────────────────────────

/** The three-step objection framework taught across the platform. */
export const OBJECTION_STEPS = [
  {
    step: 1,
    label: 'Acknowledge',
    description:
      'Repeat the concern back so the prospect feels heard. No rushing, no dismissing.',
  },
  {
    step: 2,
    label: 'Isolate',
    description:
      'Confirm this is the real objection, not a smokescreen. "Besides [concern], is there anything else holding you back?"',
  },
  {
    step: 3,
    label: 'Resolve',
    description:
      'Address the root concern with proof, structure, or a reframe.',
  },
] as const;

// ─── 25 FSA-Style Discovery Questions ────────────────────────────────────────

export type DiscoveryCategory =
  | 'Situation & Context'
  | 'Pain & Impact'
  | 'Priorities & Criteria'
  | 'Budget & Authority'
  | 'Trust & Close Readiness';

export interface DiscoveryQuestion {
  id: number;
  category: DiscoveryCategory;
  question: string;
}

export const DISCOVERY_QUESTIONS: readonly DiscoveryQuestion[] = [
  // Situation & Context
  { id: 1, category: 'Situation & Context', question: 'What brought you in today — what are you hoping to figure out?' },
  { id: 2, category: 'Situation & Context', question: 'Walk me through what you are working with right now.' },
  { id: 3, category: 'Situation & Context', question: 'How long have you been thinking about making a change?' },
  { id: 4, category: 'Situation & Context', question: 'What does a typical day look like for you when this problem shows up?' },
  { id: 5, category: 'Situation & Context', question: 'Who else is involved in making this decision?' },
  // Pain & Impact
  { id: 6, category: 'Pain & Impact', question: 'What is the biggest frustration you are dealing with right now?' },
  { id: 7, category: 'Pain & Impact', question: 'How is that affecting your day-to-day — personally, financially, or both?' },
  { id: 8, category: 'Pain & Impact', question: 'What has it cost you so far to not have this solved?' },
  { id: 9, category: 'Pain & Impact', question: 'If nothing changes in the next 90 days, what does that look like?' },
  { id: 10, category: 'Pain & Impact', question: 'What have you already tried that did not work?' },
  // Priorities & Criteria
  { id: 11, category: 'Priorities & Criteria', question: 'When you picture the right solution, what does it look like?' },
  { id: 12, category: 'Priorities & Criteria', question: 'What matters more to you right now — the monthly number or the total cost?' },
  { id: 13, category: 'Priorities & Criteria', question: 'Is there a timeline you are working against?' },
  { id: 14, category: 'Priorities & Criteria', question: 'What would make you walk away from a deal today — what is the line?' },
  { id: 15, category: 'Priorities & Criteria', question: 'If everything checks out, what does your decision process look like from here?' },
  // Budget & Authority
  { id: 16, category: 'Budget & Authority', question: 'Do you have a number in mind that you need to stay under?' },
  { id: 17, category: 'Budget & Authority', question: 'How did you land on that number — is it based on a payment or a total?' },
  { id: 18, category: 'Budget & Authority', question: 'Is there anyone else who would need to see this before you move forward?' },
  { id: 19, category: 'Budget & Authority', question: 'What information would that person need to feel comfortable with this?' },
  { id: 20, category: 'Budget & Authority', question: 'If I put together something that checks every box, are we in a position to move forward today?' },
  // Trust & Close Readiness
  { id: 21, category: 'Trust & Close Readiness', question: 'What is your biggest concern about working with us specifically?' },
  { id: 22, category: 'Trust & Close Readiness', question: 'What would need to be true for you to feel 100% confident in this decision?' },
  { id: 23, category: 'Trust & Close Readiness', question: 'Besides the price, is there anything else holding you back?' },
  { id: 24, category: 'Trust & Close Readiness', question: 'If we can solve [their stated concern], are we good to take the next step?' },
  { id: 25, category: 'Trust & Close Readiness', question: 'What is the next step that makes sense for you — and when does it need to happen?' },
] as const;

/** All unique discovery categories, in presentation order. */
export const DISCOVERY_CATEGORIES: readonly DiscoveryCategory[] = [
  'Situation & Context',
  'Pain & Impact',
  'Priorities & Criteria',
  'Budget & Authority',
  'Trust & Close Readiness',
];

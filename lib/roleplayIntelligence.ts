export type SkillTag =
  | 'frame_control'
  | 'discovery_depth'
  | 'objection_isolation'
  | 'value_building'
  | 'next_step_close'
  | 'composure';

export type PersonaId =
  | 'budget-brian'
  | 'trade-trap-tina'
  | 'payment-patty'
  | 'authority-alex'
  | 'skeptic-sam';

export type TurnScore = {
  control: number;
  depth: number;
  conversion: number;
};

export type PersonaProfile = {
  id: PersonaId;
  label: string;
  opener: string;
  bossLevel: boolean;
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
};

export const BOSS_UNLOCK_THRESHOLD = 75;
export const DAILY_DRILL_LIMIT = 3;

export const PERSONAS: Record<PersonaId, PersonaProfile> = {
  'budget-brian': {
    id: 'budget-brian',
    label: 'Budget Brian',
    opener:
      "Look, I’m not trying to get taken for a ride here. I’ve been to three dealerships this week and the numbers always jump once I sit down. So what’s different about you?",
    bossLevel: false,
    goal: 'Keep total cost down without surprises.',
    fear: 'Getting trapped in a payment he cannot justify.',
    constraint: 'Very tight monthly budget and poor trust in dealers.',
    triggerPhrases: ['what can you afford', 'best i can do', 'today only'],
    decisionStyle: 'Slow and defensive. Needs logic and transparent math.',
    proofNeeded: 'Clear cost breakdown and side-by-side value comparison.',
    hiddenVariables: {
      budgetRange: '$350-$425/month',
      tradeStatus: 'No trade-in',
      creditConfidence: 'Uncertain',
      spouseVeto: 'Low',
      patienceStart: 62,
    },
  },
  'trade-trap-tina': {
    id: 'trade-trap-tina',
    label: 'Trade Trap Tina',
    opener:
      "So here’s the thing — I owe way more than my car is worth right now. I know that’s not great. I just don’t want someone making me feel stupid about it.",
    bossLevel: false,
    goal: 'Exit negative equity with dignity and a workable plan.',
    fear: 'Being judged and pushed into a bad rollover deal.',
    constraint: 'Upside-down trade with emotional pressure.',
    triggerPhrases: ['everyone does it', 'sign right here', 'dont worry about equity'],
    decisionStyle: 'Emotional first, logical second.',
    proofNeeded: 'Structured options with trade math explained simply.',
    hiddenVariables: {
      budgetRange: '$420-$520/month',
      tradeStatus: 'Upside down by about $6,000',
      creditConfidence: 'Medium',
      spouseVeto: 'Medium',
      patienceStart: 66,
    },
  },
  'payment-patty': {
    id: 'payment-patty',
    label: 'Payment Patty',
    opener:
      "I have a number in my head. If you can hit it, let’s talk. If you can’t, I’m walking. Simple as that.",
    bossLevel: false,
    goal: 'Stay under a hard monthly number.',
    fear: 'Payment creep through hidden fees and terms.',
    constraint: 'Locked payment target and short decision window.',
    triggerPhrases: ['you can afford it', 'monthly is all that matters', 'focus on today'],
    decisionStyle: 'Fast if payment is clear, hard stop if not.',
    proofNeeded: 'Payment structure with term, down payment, and rate clarity.',
    hiddenVariables: {
      budgetRange: 'Under $400/month',
      tradeStatus: 'Small positive equity',
      creditConfidence: 'Good',
      spouseVeto: 'Low',
      patienceStart: 64,
    },
  },
  'authority-alex': {
    id: 'authority-alex',
    label: 'Authority Alex',
    opener:
      "I can get all the information today, but honestly — my partner makes the final call on anything over five hundred a month. And they’re skeptical about this whole thing.",
    bossLevel: true,
    goal: 'Protect credibility with the real decision-maker.',
    fear: 'Bringing back weak information and losing influence.',
    constraint: 'Cannot decide alone and needs a transferable case.',
    triggerPhrases: ['just bring them later', 'trust me', 'we can figure it out after'],
    decisionStyle: 'Methodical, authority-aware, process-driven.',
    proofNeeded: 'Decision packet with value case and next-step structure.',
    hiddenVariables: {
      budgetRange: '$450-$600/month',
      tradeStatus: 'No trade-in',
      creditConfidence: 'Unknown',
      spouseVeto: 'High',
      patienceStart: 55,
    },
  },
  'skeptic-sam': {
    id: 'skeptic-sam',
    label: 'Skeptic Sam',
    opener:
      "I’ve read every review on this car and your dealership. I know the invoice price, the holdback, and what the forums say you should sell it for. So let’s skip the games.",
    bossLevel: true,
    goal: 'Validate every claim and avoid making a poor decision.',
    fear: 'Marketing talk hiding weak value.',
    constraint: 'High skepticism and high comparison behavior.',
    triggerPhrases: ['everyone says that', 'limited time deal', 'trust the process'],
    decisionStyle: 'Analytical and evidence-heavy.',
    proofNeeded: 'Specific proof, transparent comparisons, and clear next step.',
    hiddenVariables: {
      budgetRange: '$500-$700/month',
      tradeStatus: 'Considering trade but undecided',
      creditConfidence: 'High',
      spouseVeto: 'Medium',
      patienceStart: 52,
    },
  },
};

export const PERSONA_ORDER: PersonaId[] = [
  'budget-brian',
  'trade-trap-tina',
  'payment-patty',
  'authority-alex',
  'skeptic-sam',
];

const CONTROL_SIGNALS = [
  'agenda',
  'process',
  'next step',
  'first',
  'before we',
  'walk through',
  'plan',
];

const DEPTH_SIGNALS = [
  'why',
  'impact',
  'timeline',
  'decision',
  'what happens if',
  'pain',
  'biggest concern',
];

const CONVERSION_SIGNALS = [
  'appointment',
  'application',
  'deposit',
  'trade evaluation',
  'manager',
  'commit',
  'next',
  'move forward',
];

const CALM_SIGNALS = ['understand', 'fair point', 'totally get', 'let us', 'we can'];
const OBJECTION_SIGNALS = ['besides', 'specifically', 'main concern', 'is it the'];
const VALUE_SIGNALS = ['because', 'so that', 'compared to', 'value', 'proof'];

function clampScore(value: number): number {
  if (value < 1) return 1;
  if (value > 99) return 99;
  return Math.round(value);
}

function countMatches(text: string, needles: string[]): number {
  return needles.reduce((matchCount, searchTerm) => (text.includes(searchTerm) ? matchCount + 1 : matchCount), 0);
}

export function evaluateSalesTurn(input: string): {
  scores: TurnScore;
  skillTags: SkillTag[];
} {
  const text = input.toLowerCase();

  const controlHits = countMatches(text, CONTROL_SIGNALS);
  const depthHits = countMatches(text, DEPTH_SIGNALS);
  const conversionHits = countMatches(text, CONVERSION_SIGNALS);
  const calmHits = countMatches(text, CALM_SIGNALS);
  const objectionHits = countMatches(text, OBJECTION_SIGNALS);
  const valueHits = countMatches(text, VALUE_SIGNALS);

  const basePenalty = text.length < 60 ? 8 : 0;

  const control = clampScore(45 + controlHits * 14 + calmHits * 5 - basePenalty);
  const depth = clampScore(42 + depthHits * 16 + objectionHits * 6 - basePenalty);
  const conversion = clampScore(40 + conversionHits * 18 + valueHits * 6 - basePenalty);

  const skillTags: SkillTag[] = [];

  if (controlHits > 0) skillTags.push('frame_control');
  if (depthHits > 0) skillTags.push('discovery_depth');
  if (objectionHits > 0) skillTags.push('objection_isolation');
  if (valueHits > 0) skillTags.push('value_building');
  if (conversionHits > 0) skillTags.push('next_step_close');
  if (calmHits > 0) skillTags.push('composure');

  if (skillTags.length === 0) {
    skillTags.push('frame_control');
  }

  return {
    scores: { control, depth, conversion },
    skillTags,
  };
}

export function nextPatienceValue(current: number, scores: TurnScore): number {
  const average = (scores.control + scores.depth + scores.conversion) / 3;

  let delta = -4;
  if (average >= 85) {
    delta = 8;
  } else if (average >= 72) {
    delta = 3;
  } else if (average < 50) {
    delta = -10;
  }

  const next = current + delta;
  if (next < 5) return 5;
  if (next > 100) return 100;
  return Math.round(next);
}

export function getDailyDrills(weakSkills: SkillTag[], dayKey: string): Array<{
  id: string;
  skill: SkillTag;
  title: string;
  prompt: string;
}> {
  const pool: SkillTag[] =
    weakSkills.length > 0
      ? weakSkills
      : ['frame_control', 'discovery_depth', 'next_step_close'];

  return pool.slice(0, DAILY_DRILL_LIMIT).map((skill, index) => ({
    id: `${dayKey}:${skill}:${index}`,
    skill,
    title: `${formatSkillTag(skill)} Drill`,
    prompt: drillPromptBySkill(skill),
  }));
}

function drillPromptBySkill(skill: SkillTag): string {
  switch (skill) {
    case 'frame_control':
      return 'Open with agenda + outcome + permission in one clean statement.';
    case 'discovery_depth':
      return 'Ask a pain-impact-timeline sequence before discussing price.';
    case 'objection_isolation':
      return 'Isolate one root objection before solving anything else.';
    case 'value_building':
      return 'Tie one feature directly to the buyer fear and desired outcome.';
    case 'next_step_close':
      return 'Advance to one concrete commitment: appointment, app, deposit, or trade eval.';
    case 'composure':
      return 'Handle resistance with calm acknowledgement before redirecting to process.';
    default:
      return 'Run one clean repetition with clear structure and composure.';
  }
}

export function formatSkillTag(skill: SkillTag): string {
  switch (skill) {
    case 'frame_control':
      return 'Frame Control';
    case 'discovery_depth':
      return 'Discovery Depth';
    case 'objection_isolation':
      return 'Objection Isolation';
    case 'value_building':
      return 'Value Building';
    case 'next_step_close':
      return 'Next-Step Close';
    case 'composure':
      return 'Composure';
    default:
      return skill;
  }
}

export function getPersonaById(id: PersonaId): PersonaProfile {
  return PERSONAS[id];
}

export function isBossPersona(id: PersonaId): boolean {
  return PERSONAS[id].bossLevel;
}

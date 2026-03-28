import Head from 'next/head';
import Link from 'next/link';
import { useState, useRef, useEffect, useCallback, FormEvent } from 'react';
import { AI_CHAT_MAX_MESSAGES, AI_CHAT_MAX_MSG_CHARS } from '../lib/aiChatConstants';
import { PUBLIC_SEO_KEYWORDS, PUBLIC_SITE_URL } from '../lib/businessDetails';
import { fetchMembershipStatus } from '../lib/membershipClient';
import { formatUsd, SUBSCRIPTION_PRICE_CENTS } from '../lib/subscriptionPlan';
import { useRealtimeVoice, type VoiceTranscript } from '../lib/useRealtimeVoice';
import { OLIVE_ROLEPLAY_SYSTEM_PROMPT } from '../lib/olivePersona';
import {
  BOSS_UNLOCK_THRESHOLD,
  formatSkillTag,
  getDailyDrills,
  getPersonaById,
  isBossPersona,
  nextPatienceValue,
  PERSONA_ORDER,
  type PersonaId,
  type SkillTag,
  type TurnScore,
  evaluateSalesTurn,
} from '../lib/roleplayIntelligence';

type Role = 'user' | 'assistant';

interface Message {
  role: Role;
  content: string;
}

type SkillAggregate = Record<SkillTag, { sum: number; count: number }>;

type RoleplayProgress = {
  sessionsCompleted: number;
  totalTurns: number;
  totalControl: number;
  totalDepth: number;
  totalConversion: number;
  skillAggregate: SkillAggregate;
  drillsCompletedByDay: Record<string, number>;
};

const ROLEPLAY_PROGRESS_KEY = 'fsaelite:roleplay-progress:v1';

const EMPTY_SKILL_AGGREGATE: SkillAggregate = {
  frame_control: { sum: 0, count: 0 },
  discovery_depth: { sum: 0, count: 0 },
  objection_isolation: { sum: 0, count: 0 },
  value_building: { sum: 0, count: 0 },
  next_step_close: { sum: 0, count: 0 },
  composure: { sum: 0, count: 0 },
};

const DEFAULT_PROGRESS: RoleplayProgress = {
  sessionsCompleted: 0,
  totalTurns: 0,
  totalControl: 0,
  totalDepth: 0,
  totalConversion: 0,
  skillAggregate: EMPTY_SKILL_AGGREGATE,
  drillsCompletedByDay: {},
};

const SITE_URL = PUBLIC_SITE_URL.replace(/\/$/, '');

function cloneSkillAggregate(source: SkillAggregate): SkillAggregate {
  return {
    frame_control: { ...source.frame_control },
    discovery_depth: { ...source.discovery_depth },
    objection_isolation: { ...source.objection_isolation },
    value_building: { ...source.value_building },
    next_step_close: { ...source.next_step_close },
    composure: { ...source.composure },
  };
}

function safeProgressFromStorage(raw: string | null): RoleplayProgress {
  if (!raw) {
    return {
      ...DEFAULT_PROGRESS,
      skillAggregate: cloneSkillAggregate(EMPTY_SKILL_AGGREGATE),
    };
  }

  try {
    const parsed = JSON.parse(raw) as Partial<RoleplayProgress>;
    const aggregate = cloneSkillAggregate(EMPTY_SKILL_AGGREGATE);

    for (const key of Object.keys(aggregate) as SkillTag[]) {
      const incoming = parsed.skillAggregate?.[key];
      if (incoming && Number.isFinite(incoming.sum) && Number.isFinite(incoming.count)) {
        aggregate[key] = {
          sum: incoming.sum,
          count: incoming.count,
        };
      }
    }

    return {
      sessionsCompleted: Number.isFinite(parsed.sessionsCompleted) ? parsed.sessionsCompleted ?? 0 : 0,
      totalTurns: Number.isFinite(parsed.totalTurns) ? parsed.totalTurns ?? 0 : 0,
      totalControl: Number.isFinite(parsed.totalControl) ? parsed.totalControl ?? 0 : 0,
      totalDepth: Number.isFinite(parsed.totalDepth) ? parsed.totalDepth ?? 0 : 0,
      totalConversion: Number.isFinite(parsed.totalConversion) ? parsed.totalConversion ?? 0 : 0,
      skillAggregate: aggregate,
      drillsCompletedByDay: parsed.drillsCompletedByDay ?? {},
    };
  } catch {
    return {
      ...DEFAULT_PROGRESS,
      skillAggregate: cloneSkillAggregate(EMPTY_SKILL_AGGREGATE),
    };
  }
}

function dayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

function averageScore(progress: RoleplayProgress): number {
  if (progress.totalTurns === 0) return 0;
  const total = progress.totalControl + progress.totalDepth + progress.totalConversion;
  return Math.round(total / (progress.totalTurns * 3));
}

function weakSkills(progress: RoleplayProgress): SkillTag[] {
  const averages = (Object.keys(progress.skillAggregate) as SkillTag[]).map((skill) => {
    const item = progress.skillAggregate[skill];
    const avg = item.count === 0 ? 0 : item.sum / item.count;
    return { skill, avg };
  });

  return averages
    .sort((a, b) => a.avg - b.avg)
    .filter((entry) => entry.avg < 72 || entry.avg === 0)
    .map((entry) => entry.skill);
}

function personaInitialMessage(personaId: PersonaId): Message {
  const persona = getPersonaById(personaId);
  return {
    role: 'assistant',
    content: persona.opener,
  };
}

export default function Roleplay() {
  // Roleplay public toggle: when NEXT_PUBLIC_ROLEPLAY_PUBLIC is set to true
  // the UI opens the Roleplay Lab to everyone and skips the membership check.
  const roleplayPublic =
    (process.env.NEXT_PUBLIC_ROLEPLAY_PUBLIC || '').toLowerCase() === 'true' ||
    (process.env.NEXT_PUBLIC_ROLEPLAY_PUBLIC || '') === '1';

  const [hasMembership, setHasMembership] = useState<boolean | null>(
    roleplayPublic ? true : null
  );
  const [activePersonaId, setActivePersonaId] = useState<PersonaId>('budget-brian');
  const [messages, setMessages] = useState<Message[]>([personaInitialMessage('budget-brian')]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sessionTurns, setSessionTurns] = useState(0);
  const [patienceMeter, setPatienceMeter] = useState(getPersonaById('budget-brian').hiddenVariables.patienceStart);
  const [lastTurnScore, setLastTurnScore] = useState<TurnScore | null>(null);
  const [lastTurnTags, setLastTurnTags] = useState<SkillTag[]>([]);
  const [progress, setProgress] = useState<RoleplayProgress>({
    ...DEFAULT_PROGRESS,
    skillAggregate: cloneSkillAggregate(EMPTY_SKILL_AGGREGATE),
  });
  const bottomRef = useRef<HTMLDivElement>(null);

  // ── Voice Mode ──
  const [voiceMode, setVoiceMode] = useState(false);

  const activePersona = getPersonaById(activePersonaId);

  const voiceInstructions = `${OLIVE_ROLEPLAY_SYSTEM_PROMPT}

You are now playing the role of "${activePersona.label}".
Goal: ${activePersona.goal}
Fear: ${activePersona.fear}
Constraint: ${activePersona.constraint}
Decision style: ${activePersona.decisionStyle}
Proof needed: ${activePersona.proofNeeded}
Hidden budget range: ${activePersona.hiddenVariables.budgetRange}
Trade status: ${activePersona.hiddenVariables.tradeStatus}
Credit confidence: ${activePersona.hiddenVariables.creditConfidence}

Stay fully in character. Respond as this buyer would in a real conversation. Keep responses to 2-4 sentences.`;

  const handleVoiceTranscript = useCallback((transcript: VoiceTranscript) => {
    setMessages((prev) => [
      ...prev,
      {
        role: transcript.role,
        content: transcript.text,
      },
    ]);
  }, []);

  const voice = useRealtimeVoice({
    personaInstructions: voiceInstructions,
    onTranscript: handleVoiceTranscript,
  });

  function toggleVoiceMode() {
    if (voiceMode) {
      voice.stop();
      setVoiceMode(false);
    } else {
      setVoiceMode(true);
    }
  }

  async function startVoiceSession() {
    await voice.start();
  }

  // If Roleplay is not publicly enabled, check membership status from the server.
  useEffect(() => {
    if (roleplayPublic) return;

    let active = true;
    void fetchMembershipStatus().then((status) => {
      if (active) setHasMembership(status);
    });

    return () => {
      active = false;
    };
  }, [roleplayPublic]);

  useEffect(() => {
    const stored = window.localStorage.getItem(ROLEPLAY_PROGRESS_KEY);
    setProgress(safeProgressFromStorage(stored));
  }, []);

  useEffect(() => {
    window.localStorage.setItem(ROLEPLAY_PROGRESS_KEY, JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;

    const trimmedInput = text.trim();
    const userMsg: Message = { role: 'user', content: trimmedInput };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setLoading(true);
    setError('');

    const evalResult = evaluateSalesTurn(trimmedInput);
    const nextPatience = nextPatienceValue(patienceMeter, evalResult.scores);
    setLastTurnScore(evalResult.scores);
    setLastTurnTags(evalResult.skillTags);
    setPatienceMeter(nextPatience);
    setSessionTurns((prev) => prev + 1);

    setProgress((prev) => {
      const next = {
        ...prev,
        totalTurns: prev.totalTurns + 1,
        totalControl: prev.totalControl + evalResult.scores.control,
        totalDepth: prev.totalDepth + evalResult.scores.depth,
        totalConversion: prev.totalConversion + evalResult.scores.conversion,
        skillAggregate: cloneSkillAggregate(prev.skillAggregate),
        drillsCompletedByDay: { ...prev.drillsCompletedByDay },
      };

      for (const tag of evalResult.skillTags) {
        // Map each skill tag to its representative score dimension so averages
        // fall on the 0-100 scale and the weak-skill threshold of 72 is meaningful.
        const tagScore: number =
          tag === 'frame_control' || tag === 'composure'
            ? evalResult.scores.control
            : tag === 'discovery_depth' || tag === 'objection_isolation'
              ? evalResult.scores.depth
              : evalResult.scores.conversion; // value_building, next_step_close
        next.skillAggregate[tag].sum += tagScore;
        next.skillAggregate[tag].count += 1;
      }

      const dailyKey = dayKey();
      const dailyWeakSkills = weakSkills(prev);
      const dailyDrills = getDailyDrills(dailyWeakSkills, dailyKey);

      if (dailyDrills.some((drill) => evalResult.skillTags.includes(drill.skill))) {
        next.drillsCompletedByDay[dailyKey] = (next.drillsCompletedByDay[dailyKey] ?? 0) + 1;
      }

      return next;
    });

    // Trim to the most recent MAX_MESSAGES to stay within the API limit
    // and keep the request payload small as conversations grow long.
    const trimmed =
      updated.length > AI_CHAT_MAX_MESSAGES
        ? updated.slice(updated.length - AI_CHAT_MAX_MESSAGES)
        : updated;
    const activePersona = getPersonaById(activePersonaId);

    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: trimmed,
          scenarioContext: {
            personaName: activePersona.label,
            goal: activePersona.goal,
            fear: activePersona.fear,
            constraint: activePersona.constraint,
            triggerPhrases: activePersona.triggerPhrases,
            decisionStyle: activePersona.decisionStyle,
            proofNeeded: activePersona.proofNeeded,
            hiddenVariables: activePersona.hiddenVariables,
            patienceMeter: nextPatience,
            bossLevel: activePersona.bossLevel,
          },
        }),
      });

      const data = (await res.json()) as { reply?: string; error?: string };

      if (!res.ok) {
        setError(data.error ?? `Server error ${res.status}`);
        return;
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply ?? 'No response.' }]);
    } catch {
      setError('Network error — please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  function loadScenario(personaId: PersonaId) {
    const persona = getPersonaById(personaId);

    const unlocked =
      !isBossPersona(personaId) ||
      (averageScore(progress) >= BOSS_UNLOCK_THRESHOLD && progress.sessionsCompleted >= 3);

    if (!unlocked) {
      setError(
        `Boss persona locked. Reach ${BOSS_UNLOCK_THRESHOLD}+ average and complete 3 sessions to unlock ${persona.label}.`
      );
      return;
    }

    setActivePersonaId(personaId);
    setMessages([personaInitialMessage(personaId)]);
    setPatienceMeter(persona.hiddenVariables.patienceStart);
    setSessionTurns(0);
    setLastTurnScore(null);
    setLastTurnTags([]);
    setInput('');
    setError('');
  }

  function resetChat() {
    if (sessionTurns >= 4) {
      setProgress((prev) => ({
        ...prev,
        sessionsCompleted: prev.sessionsCompleted + 1,
      }));
    }

    const persona = getPersonaById(activePersonaId);
    setMessages([personaInitialMessage(activePersonaId)]);
    setPatienceMeter(persona.hiddenVariables.patienceStart);
    setSessionTurns(0);
    setLastTurnScore(null);
    setLastTurnTags([]);
    setInput('');
    setError('');
  }

  const progressAverage = averageScore(progress);
  const progressWeakSkills = weakSkills(progress);
  const todayKey = dayKey();
  const todayDrills = getDailyDrills(progressWeakSkills, todayKey);
  const todayCompleted = progress.drillsCompletedByDay[todayKey] ?? 0;
  const bossUnlocked = progressAverage >= BOSS_UNLOCK_THRESHOLD && progress.sessionsCompleted >= 3;

  return (
    <>
      <Head>
        <title>OLIVE Roleplay Lab | FSA ELITE AI Sales Training</title>
        <meta
          name="description"
          content="Practice live objection handling with OLIVE, the FSA ELITE AI Sales Intelligence engine for closers in any industry."
        />
        <meta name="keywords" content={PUBLIC_SEO_KEYWORDS} />
        <link rel="canonical" href={`${SITE_URL}/roleplay`} />
      </Head>

      {hasMembership === null ? (
        <main className="member-gate-page">
          <section className="member-gate-shell">
            <div className="container">
              <div className="member-gate-card">
                <p className="eyebrow">Checking Access</p>
                <h1>Verifying your membership…</h1>
                <p className="member-gate-copy">Please wait while FSA ELITE confirms your active training access.</p>
              </div>
            </div>
          </section>
        </main>
      ) : hasMembership === false ? (
        <main className="member-gate-page">
          <section className="member-gate-shell">
            <div className="container">
              <div className="member-gate-card">
                <p className="eyebrow">Members Only</p>
                <h1>Training access unlocks after the {formatUsd(SUBSCRIPTION_PRICE_CENTS)} membership payment.</h1>
                <p className="member-gate-copy">
                  The AI Roleplay Lab is part of the FSA ELITE membership. Complete the one-time purchase first, then
                  return here to practice objection handling.
                </p>
                <div className="member-gate-actions">
                  <Link href="/checkout-preview" className="btn-primary">
                    Unlock Membership Access
                  </Link>
                  <Link href="/" className="btn-secondary">
                    Back to Home
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
      ) : (
      <main className="roleplay-page">
        <header className="roleplay-header">
          <Link href="/" className="roleplay-back-link">
            ← Back
          </Link>
          <img className="home-brand-badge" src="/logo-badge.jpg" alt="FSA ELITE badge" style={{ width: '2rem', height: '2rem', borderRadius: '50%' }} />
          <div className="roleplay-header-center">
            <span className="roleplay-title">OLIVE Roleplay Lab</span>
            <span className="roleplay-subtitle">FSA ELITE AI Sales Intelligence</span>
          </div>
          <button onClick={resetChat} className="roleplay-reset-btn">
            Reset
          </button>
          <button
            onClick={toggleVoiceMode}
            className={`roleplay-voice-toggle ${voiceMode ? 'roleplay-voice-toggle-active' : ''}`}
            title={voiceMode ? 'Switch to text mode' : 'Switch to voice mode'}
          >
            {voiceMode ? '⌨️' : '🎙️'}
          </button>
        </header>

        <div className="roleplay-scenarios-wrap">
          <div className="roleplay-scenarios">
            <span className="roleplay-scenarios-label">
              Personas:
            </span>
            {PERSONA_ORDER.map((personaId) => {
              const persona = getPersonaById(personaId);
              const locked = persona.bossLevel && !bossUnlocked;

              return (
              <button
                key={persona.id}
                onClick={() => loadScenario(persona.id)}
                className={`roleplay-scenario-btn ${activePersonaId === persona.id ? 'roleplay-scenario-btn-active' : ''}`}
                disabled={locked}
                title={locked ? 'Locked until boss progression gate is met.' : ''}
              >
                {persona.label}
                {persona.bossLevel ? ' (Boss)' : ''}
              </button>
              );
            })}
          </div>
        </div>

        <section className="roleplay-core">
          <div className="roleplay-chat-window">
            <p className="roleplay-helper-text">
              OLIVE is running your session. Train objection handling in real time. Type <code>/help</code> and OLIVE will coach you.
            </p>
            <p className="roleplay-helper-text">
              Active persona: <strong>{activePersona.label}</strong> · Patience meter: <strong>{patienceMeter}</strong>
            </p>
            <p className="roleplay-helper-text">
              Daily loop: <strong>{todayCompleted}/{todayDrills.length}</strong> drills completed today · <strong>{sessionTurns}</strong> turns this session
            </p>

            {messages.map((msg, i) => (
              <div key={i} className={`roleplay-message-row ${msg.role === 'user' ? 'roleplay-message-user' : 'roleplay-message-assistant'}`}>
                <div className={`roleplay-message-bubble ${msg.role === 'user' ? 'roleplay-bubble-user' : 'roleplay-bubble-assistant'}`}>
                  {msg.role === 'assistant' && (
                    <span className="roleplay-speaker-tag">
                      {activePersona.label}
                    </span>
                  )}
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="roleplay-message-row roleplay-message-assistant">
                <div className="roleplay-message-bubble roleplay-bubble-assistant roleplay-loading-bubble">
                  OLIVE is thinking…
                </div>
              </div>
            )}

            {error && (
              <p className="roleplay-error">
                {error}
              </p>
            )}

            <div ref={bottomRef} />
          </div>

          <aside className="roleplay-intel-panel">
            <h2>OLIVE Intelligence</h2>
            <p className="roleplay-intel-meta">OLIVE tracks your performance. Progression unlocks boss personas.</p>

            <div className="roleplay-score-grid">
              <article>
                <span>Control</span>
                <strong>{lastTurnScore?.control ?? '--'}</strong>
              </article>
              <article>
                <span>Depth</span>
                <strong>{lastTurnScore?.depth ?? '--'}</strong>
              </article>
              <article>
                <span>Conversion</span>
                <strong>{lastTurnScore?.conversion ?? '--'}</strong>
              </article>
            </div>

            <div className="roleplay-intel-block">
              <h3>Training Loop</h3>
              <div className="roleplay-score-grid roleplay-score-grid-2">
                <article>
                  <span>Session turns</span>
                  <strong>{sessionTurns}</strong>
                </article>
                <article>
                  <span>Drills today</span>
                  <strong>{todayCompleted}/{todayDrills.length}</strong>
                </article>
              </div>
              <p className="roleplay-intel-meta">App-style repetition, feedback, and unlocks keep the training loop sticky.</p>
            </div>

            <div className="roleplay-intel-block">
              <h3>Skill Tags (last turn)</h3>
              <p>
                {lastTurnTags.length > 0
                  ? lastTurnTags.map((tag) => formatSkillTag(tag)).join(' · ')
                  : 'No tags yet.'}
              </p>
            </div>

            <div className="roleplay-intel-block">
              <h3>Weak Spots</h3>
              <p>
                {progressWeakSkills.length > 0
                  ? progressWeakSkills.slice(0, 3).map((skill) => formatSkillTag(skill)).join(' · ')
                  : 'No weak spots currently flagged.'}
              </p>
            </div>

            <div className="roleplay-intel-block">
              <h3>Daily Drills</h3>
              <p className="roleplay-intel-meta">Completed today: {todayCompleted}</p>
              <ul className="roleplay-drill-list">
                {todayDrills.map((drill) => (
                  <li key={drill.id}>
                    <strong>{drill.title}</strong>
                    <span>{drill.prompt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="roleplay-intel-block">
              <h3>Progression</h3>
              <p>Average score: <strong>{progressAverage}</strong></p>
              <p>Sessions completed: <strong>{progress.sessionsCompleted}</strong></p>
              <p>
                Boss gate: <strong>{bossUnlocked ? 'Unlocked' : `Locked (${BOSS_UNLOCK_THRESHOLD}+ avg and 3 sessions required)`}</strong>
              </p>
            </div>
          </aside>
        </section>

        <div className="roleplay-input-wrap">
          {voiceMode ? (
            <div className="roleplay-voice-panel">
              <div className="roleplay-voice-status">
                <span className={`roleplay-voice-indicator roleplay-voice-indicator-${voice.status}`} />
                <span>
                  {voice.status === 'idle' && 'Voice mode ready'}
                  {voice.status === 'connecting' && 'Connecting…'}
                  {voice.status === 'connected' && 'Connected — starting mic…'}
                  {voice.status === 'listening' && 'Listening — speak now'}
                  {voice.status === 'speaking' && 'OLIVE is speaking…'}
                  {voice.status === 'error' && 'Connection error'}
                </span>
              </div>
              {voice.error && <p className="roleplay-error">{voice.error}</p>}
              <div className="roleplay-voice-actions">
                {voice.status === 'idle' || voice.status === 'error' ? (
                  <button
                    type="button"
                    className="btn-primary roleplay-voice-btn"
                    onClick={startVoiceSession}
                  >
                    🎙️ Start Voice Session
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn-secondary roleplay-voice-btn roleplay-voice-btn-stop"
                    onClick={() => voice.stop()}
                  >
                    ⏹ End Voice Session
                  </button>
                )}
              </div>
              <p className="roleplay-voice-hint">
                Speak naturally. OLIVE hears you, responds in real time, and transcripts appear above.
              </p>
            </div>
          ) : (
          <form onSubmit={handleSubmit} className="roleplay-input-form">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Your response to the customer..."
              disabled={loading}
              maxLength={AI_CHAT_MAX_MSG_CHARS}
              className="roleplay-input"
            />
            <button type="submit" disabled={loading || !input.trim()} className="btn-primary roleplay-send-btn">
              Send
            </button>
          </form>
          )}
        </div>
      </main>
      )}
    </>
  );
}

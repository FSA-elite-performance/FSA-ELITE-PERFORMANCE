import { useState, useRef, useEffect, FormEvent } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { OLIVE_NAME, OLIVE_TAGLINE, OLIVE_GREETING } from '../lib/olivePersona';
import { AI_CHAT_MAX_MSG_CHARS } from '../lib/aiChatConstants';

type Role = 'user' | 'assistant';
type OliveMode = 'general' | 'coach' | 'battle';

interface ChatMessage {
  role: Role;
  content: string;
}

const MAX_PAGE_MESSAGES = 40;

const MODES: { id: OliveMode; label: string; icon: string; description: string }[] = [
  {
    id: 'general',
    label: 'General',
    icon: '💬',
    description: 'Ask OLIVE anything about sales, the platform, or your game.',
  },
  {
    id: 'coach',
    label: 'Coach',
    icon: '🎯',
    description: 'Paste an objection — OLIVE breaks down what to say and why it works.',
  },
  {
    id: 'battle',
    label: 'Battle',
    icon: '⚔️',
    description: 'OLIVE throws objections at you, you respond, OLIVE scores you.',
  },
];

const MODE_GREETINGS: Record<OliveMode, string> = {
  general: OLIVE_GREETING,
  coach: "Drop the exact objection you're stuck on — word for word, how the prospect said it. I'll give you the rebuttal and break down why it works.",
  battle: "Let's get into it. Here's your first one: \"I appreciate the call but honestly I'm not in the market right now.\" — What do you say?",
};

const MODE_PLACEHOLDERS: Record<OliveMode, string> = {
  general: 'Ask OLIVE anything\u2026',
  coach: 'Paste the objection exactly how they said it\u2026',
  battle: 'Type your response to OLIVE\u2019s objection\u2026',
};

function getHistoryKey(m: OliveMode): string {
  return `fsaelite:olive-page-history:${m}:v1`;
}

function loadHistory(m: OliveMode): ChatMessage[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(getHistoryKey(m));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ChatMessage[];
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (msg) =>
          (msg.role === 'user' || msg.role === 'assistant') &&
          typeof msg.content === 'string' &&
          msg.content.trim().length > 0
      )
      .slice(-MAX_PAGE_MESSAGES);
  } catch {
    return [];
  }
}

export default function OlivePage() {
  const [mode, setMode] = useState<OliveMode>('general');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setMessages(loadHistory('general'));
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      window.localStorage.setItem(
        getHistoryKey(mode),
        JSON.stringify(messages.slice(-MAX_PAGE_MESSAGES))
      );
    }
  }, [messages, mode]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [mode]);

  function switchMode(next: OliveMode) {
    if (next === mode) return;
    setMode(next);
    setMessages(loadHistory(next));
    setInput('');
    setError('');
  }

  function clearHistory() {
    setMessages([]);
    window.localStorage.removeItem(getHistoryKey(mode));
  }

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: ChatMessage = { role: 'user', content: trimmed };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setLoading(true);
    setError('');

    const trimmedHistory =
      updated.length > MAX_PAGE_MESSAGES
        ? updated.slice(updated.length - MAX_PAGE_MESSAGES)
        : updated;

    try {
      const res = await fetch('/api/olive-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: trimmedHistory,
          pageContext: 'olive',
          mode,
        }),
      });

      const data = (await res.json()) as { reply?: string; error?: string };

      if (!res.ok) {
        setError(data.error ?? `Server error ${res.status}`);
        return;
      }

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply ?? 'No response.' },
      ]);
    } catch {
      setError('Network error — check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  const displayMessages =
    messages.length === 0
      ? [{ role: 'assistant' as const, content: MODE_GREETINGS[mode] }]
      : messages;

  const currentMode = MODES.find((m) => m.id === mode);

  return (
    <>
      <Head>
        <title>{`${OLIVE_NAME} — ${OLIVE_TAGLINE}`}</title>
        <meta
          name="description"
          content="Meet OLIVE, FSA ELITE's AI sales coach. Get real-time coaching, objection rebuttals, and live battle drills to sharpen your sales game."
        />
      </Head>

      <div className="olive-page">
        {/* Header */}
        <header className="olive-page-header">
          <div className="olive-page-header-inner">
            <div className="olive-page-brand">
              <div className="olive-page-avatar">O</div>
              <div>
                <h1 className="olive-page-title">{OLIVE_NAME}</h1>
                <p className="olive-page-subtitle">{OLIVE_TAGLINE}</p>
              </div>
            </div>
            <nav className="olive-page-nav">
              <Link href="/" className="olive-page-nav-link">Home</Link>
              <Link href="/roleplay" className="olive-page-nav-link">Roleplay Lab</Link>
              <Link href="/store" className="olive-page-nav-link">Store</Link>
            </nav>
          </div>
        </header>

        {/* Mode Selector */}
        <div className="olive-page-modes">
          {MODES.map((m) => (
            <button
              key={m.id}
              className={`olive-page-mode-card${mode === m.id ? ' olive-page-mode-card-active' : ''}`}
              onClick={() => switchMode(m.id)}
            >
              <span className="olive-page-mode-icon">{m.icon}</span>
              <strong>{m.label}</strong>
              <span className="olive-page-mode-desc">{m.description}</span>
            </button>
          ))}
        </div>

        {/* Chat Area */}
        <div className="olive-page-chat">
          <div className="olive-page-chat-header">
            <div className="olive-page-chat-header-info">
              <span className="olive-page-chat-mode-icon">{currentMode?.icon}</span>
              <strong>{currentMode?.label} Mode</strong>
            </div>
            <button
              className="olive-page-clear-btn"
              onClick={clearHistory}
              title="Clear chat history"
              aria-label="Clear chat history"
            >
              ↻ Clear
            </button>
          </div>

          <div className="olive-page-messages">
            {displayMessages.map((msg, i) => (
              <div
                key={i}
                className={`olive-page-msg ${msg.role === 'user' ? 'olive-page-msg-user' : 'olive-page-msg-assistant'}`}
              >
                {msg.role === 'assistant' && (
                  <span className="olive-page-msg-speaker">{OLIVE_NAME}</span>
                )}
                <div className="olive-page-msg-bubble">
                  <p>{msg.content}</p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="olive-page-msg olive-page-msg-assistant">
                <span className="olive-page-msg-speaker">{OLIVE_NAME}</span>
                <div className="olive-page-msg-bubble">
                  <p className="olive-page-typing">Thinking…</p>
                </div>
              </div>
            )}

            {error && <p className="olive-page-error">{error}</p>}

            <div ref={bottomRef} />
          </div>

          <form onSubmit={handleSubmit} className="olive-page-input-bar">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={MODE_PLACEHOLDERS[mode]}
              disabled={loading}
              maxLength={AI_CHAT_MAX_MSG_CHARS}
              className="olive-page-input"
              rows={1}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="olive-page-send"
            >
              Send →
            </button>
          </form>
        </div>

        {/* Info Section */}
        <section className="olive-page-info">
          <div className="olive-page-info-inner">
            <h2>What can OLIVE do?</h2>
            <div className="olive-page-capabilities">
              <div className="olive-page-capability">
                <span className="olive-page-capability-icon">💬</span>
                <h3>Sales Q&amp;A</h3>
                <p>
                  Ask about sales strategy, objection handling, closing techniques,
                  or anything about the FSA ELITE platform.
                </p>
              </div>
              <div className="olive-page-capability">
                <span className="olive-page-capability-icon">🎯</span>
                <h3>Objection Coaching</h3>
                <p>
                  Paste a real objection word-for-word. OLIVE gives you the exact rebuttal
                  plus the psychology behind why it works.
                </p>
              </div>
              <div className="olive-page-capability">
                <span className="olive-page-capability-icon">⚔️</span>
                <h3>Battle Drills</h3>
                <p>
                  OLIVE throws realistic objections at you. Respond, get scored, and
                  face the next one. No breaks, no fluff — just reps.
                </p>
              </div>
              <div className="olive-page-capability">
                <span className="olive-page-capability-icon">🧠</span>
                <h3>Context-Aware</h3>
                <p>
                  OLIVE adapts to the page you are on and understands the full FSA ELITE
                  product suite, pricing, and training methodology.
                </p>
              </div>
            </div>
            <div className="olive-page-info-cta">
              <Link href="/roleplay" className="btn-primary btn-lg">
                Open Roleplay Lab
              </Link>
              <Link href="/checkout-preview" className="btn-secondary btn-lg">
                Join FSA ELITE
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

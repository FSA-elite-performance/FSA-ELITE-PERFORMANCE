import { useState, useRef, useEffect, FormEvent, KeyboardEvent as ReactKeyboardEvent } from 'react';
import { OLIVE_GREETING, OLIVE_NAME, OLIVE_TAGLINE } from '../lib/olivePersona';
import { AI_CHAT_MAX_MSG_CHARS } from '../lib/aiChatConstants';

type Role = 'user' | 'assistant';
type OliveMode = 'general' | 'coach' | 'battle';

interface WidgetMessage {
  role: Role;
  content: string;
}

interface OliveWidgetProps {
  /** Current page identifier for contextual responses. */
  pageContext?: string;
}

const OLIVE_ENABLED_KEY = 'fsaelite:olive-enabled:v1';
const OLIVE_MODE_KEY = 'fsaelite:olive-mode:v1';
const MAX_WIDGET_MESSAGES = 20;

const MODES: { id: OliveMode; label: string; title: string }[] = [
  { id: 'general', label: 'General', title: 'Ask OLIVE anything about sales, the platform, or your game' },
  { id: 'coach',   label: 'Coach',   title: 'Paste an objection — OLIVE breaks down what to say and why it works' },
  { id: 'battle',  label: 'Battle',  title: 'OLIVE throws objections at you, you respond, OLIVE scores you' },
];

const MODE_GREETINGS: Record<OliveMode, string> = {
  general: OLIVE_GREETING,
  coach:   "Drop the exact objection you're stuck on — word for word, how the prospect said it. I'll give you the rebuttal and break down why it works.",
  battle:  "Let's get into it. Here's your first one: \"I appreciate the call but honestly I'm not in the market right now.\" — What do you say?",
};

const MODE_PLACEHOLDERS: Record<OliveMode, string> = {
  general: 'Ask OLIVE anything\u2026',
  coach:   'Paste the objection exactly how they said it\u2026',
  battle:  'Type your response to OLIVE\u2019s objection\u2026',
};

function getHistoryKey(m: OliveMode): string {
  return `fsaelite:olive-history:${m}:v1`;
}

function loadMode(): OliveMode {
  if (typeof window === 'undefined') return 'general';
  const s = window.localStorage.getItem(OLIVE_MODE_KEY);
  if (s === 'coach' || s === 'battle' || s === 'general') return s;
  return 'general';
}

function loadEnabled(): boolean {
  if (typeof window === 'undefined') return true;
  const stored = window.localStorage.getItem(OLIVE_ENABLED_KEY);
  return stored !== 'false';
}

function loadHistory(m: OliveMode): WidgetMessage[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(getHistoryKey(m));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as WidgetMessage[];
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (msg) =>
          (msg.role === 'user' || msg.role === 'assistant') &&
          typeof msg.content === 'string' &&
          msg.content.trim().length > 0
      )
      .slice(-MAX_WIDGET_MESSAGES);
  } catch {
    return [];
  }
}

export default function OliveWidget({ pageContext }: OliveWidgetProps) {
  const [enabled, setEnabled] = useState(true);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<OliveMode>('general');
  const [messages, setMessages] = useState<WidgetMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const modeTabRefs = useRef<Record<OliveMode, HTMLButtonElement | null>>({
    general: null,
    coach: null,
    battle: null,
  });

  // Load persisted state on mount.
  useEffect(() => {
    setEnabled(loadEnabled());
    const savedMode = loadMode();
    setMode(savedMode);
    setMessages(loadHistory(savedMode));
  }, []);

  // Persist enabled preference.
  useEffect(() => {
    window.localStorage.setItem(OLIVE_ENABLED_KEY, String(enabled));
  }, [enabled]);

  // Persist chat history per mode.
  useEffect(() => {
    if (messages.length > 0) {
      window.localStorage.setItem(getHistoryKey(mode), JSON.stringify(messages.slice(-MAX_WIDGET_MESSAGES)));
    }
  }, [messages, mode]);

  // Persist mode preference.
  useEffect(() => {
    window.localStorage.setItem(OLIVE_MODE_KEY, mode);
  }, [mode]);

  // Auto-scroll on new messages.
  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  // Focus input when panel opens.
  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: WidgetMessage = { role: 'user', content: trimmed };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setLoading(true);
    setError('');

    const trimmedHistory =
      updated.length > MAX_WIDGET_MESSAGES
        ? updated.slice(updated.length - MAX_WIDGET_MESSAGES)
        : updated;

    try {
      const res = await fetch('/api/olive-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: trimmedHistory,
          pageContext: pageContext ?? 'home',
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

  function toggleEnabled() {
    setEnabled((prev) => {
      const next = !prev;
      if (!next) {
        setOpen(false);
      }
      return next;
    });
  }

  function switchMode(next: OliveMode) {
    if (next === mode) return;
    setMode(next);
    setMessages(loadHistory(next));
    setInput('');
    setError('');
  }

  function focusModeTab(next: OliveMode) {
    window.requestAnimationFrame(() => {
      modeTabRefs.current[next]?.focus();
    });
  }

  function switchModeByOffset(offset: number) {
    const currentIndex = MODES.findIndex((entry) => entry.id === mode);
    const nextIndex = (currentIndex + offset + MODES.length) % MODES.length;
    const nextMode = MODES[nextIndex]?.id;
    if (!nextMode) return;
    switchMode(nextMode);
    focusModeTab(nextMode);
  }

  function handleModeKeyDown(event: ReactKeyboardEvent<HTMLButtonElement>, currentMode: OliveMode) {
    const currentIndex = MODES.findIndex((entry) => entry.id === currentMode);
    if (currentIndex === -1) return;

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      switchModeByOffset(1);
      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      switchModeByOffset(-1);
      return;
    }

    if (event.key === 'Home') {
      event.preventDefault();
      const nextMode = MODES[0]?.id;
      if (!nextMode) return;
      switchMode(nextMode);
      focusModeTab(nextMode);
      return;
    }

    if (event.key === 'End') {
      event.preventDefault();
      const nextMode = MODES[MODES.length - 1]?.id;
      if (!nextMode) return;
      switchMode(nextMode);
      focusModeTab(nextMode);
    }
  }

  useEffect(() => {
    function handleWindowKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.ctrlKey || event.metaKey) return;

      if (event.altKey && event.key.toLowerCase() === 'o') {
        event.preventDefault();

        if (!enabled) {
          setEnabled(true);
          setOpen(true);
          return;
        }

        if (!open) {
          setOpen(true);
          return;
        }

        inputRef.current?.focus();
        return;
      }

      if (!enabled || !open || !event.altKey || event.key !== 'Tab') return;

      event.preventDefault();
      switchModeByOffset(event.shiftKey ? -1 : 1);
    }

    window.addEventListener('keydown', handleWindowKeyDown);
    return () => {
      window.removeEventListener('keydown', handleWindowKeyDown);
    };
  }, [enabled, open, mode]);

  function clearHistory() {
    setMessages([]);
    window.localStorage.removeItem(getHistoryKey(mode));
  }

  // When disabled, render nothing.
  if (!enabled) {
    return (
      <button
        className="olive-fab olive-fab-disabled"
        onClick={toggleEnabled}
        aria-label="Enable OLIVE assistant"
        aria-keyshortcuts="Alt+O"
        title="Turn OLIVE back on (Option+O)"
      >
        <span className="olive-fab-icon">O</span>
      </button>
    );
  }

  const displayMessages =
    messages.length === 0
      ? [{ role: 'assistant' as const, content: MODE_GREETINGS[mode] }]
      : messages;

  return (
    <>
      {/* Floating action button */}
      {!open && (
        <button
          className="olive-fab"
          onClick={() => setOpen(true)}
          aria-label="Open OLIVE assistant"
          aria-keyshortcuts="Alt+O"
          title="Open OLIVE assistant (Option+O)"
        >
          <span className="olive-fab-icon">O</span>
          <span className="olive-fab-pulse" />
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div className="olive-panel" role="dialog" aria-label="OLIVE assistant">
          <header className="olive-panel-header">
            <div className="olive-panel-brand">
              <span className="olive-panel-avatar">O</span>
              <div>
                <strong>{OLIVE_NAME}</strong>
                <span className="olive-panel-tagline">{OLIVE_TAGLINE}</span>
              </div>
            </div>
            <div className="olive-panel-controls">
              <button
                className="olive-panel-btn"
                onClick={clearHistory}
                title="Clear chat"
                aria-label="Clear OLIVE chat history"
              >
                ↻
              </button>
              <button
                className="olive-panel-btn"
                onClick={toggleEnabled}
                title="Turn OLIVE off"
                aria-label="Disable OLIVE"
              >
                ✕
              </button>
              <button
                className="olive-panel-btn"
                onClick={() => setOpen(false)}
                title="Minimize"
                aria-label="Minimize OLIVE"
              >
                ▾
              </button>
            </div>
          </header>

          <div className="olive-mode-tabs" role="tablist" aria-label="OLIVE mode">
            {MODES.map((m) => (
              <button
                key={m.id}
                ref={(element) => { modeTabRefs.current[m.id] = element; }}
                role="tab"
                aria-selected={mode === m.id}
                aria-keyshortcuts="Alt+Tab"
                tabIndex={mode === m.id ? 0 : -1}
                className={`olive-mode-tab${mode === m.id ? ' olive-mode-tab-active' : ''}`}
                onClick={() => switchMode(m.id)}
                onKeyDown={(event) => handleModeKeyDown(event, m.id)}
                title={m.title}
              >
                {m.label}
              </button>
            ))}
          </div>

          <div className="olive-panel-messages">
            {displayMessages.map((msg, i) => (
              <div
                key={i}
                className={`olive-msg ${msg.role === 'user' ? 'olive-msg-user' : 'olive-msg-assistant'}`}
              >
                {msg.role === 'assistant' && (
                  <span className="olive-msg-speaker">{OLIVE_NAME}</span>
                )}
                <p>{msg.content}</p>
              </div>
            ))}

            {loading && (
              <div className="olive-msg olive-msg-assistant">
                <span className="olive-msg-speaker">{OLIVE_NAME}</span>
                <p className="olive-typing">Thinking…</p>
              </div>
            )}

            {error && <p className="olive-error">{error}</p>}

            <div ref={bottomRef} />
          </div>

          <form onSubmit={handleSubmit} className="olive-panel-input">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={MODE_PLACEHOLDERS[mode]}
              disabled={loading}
              maxLength={AI_CHAT_MAX_MSG_CHARS}
              className="olive-input"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="olive-send"
            >
              →
            </button>
          </form>
        </div>
      )}
    </>
  );
}

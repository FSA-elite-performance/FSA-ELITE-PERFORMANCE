import { useState, useRef, useEffect, FormEvent } from 'react';
import { OLIVE_GREETING, OLIVE_NAME, OLIVE_TAGLINE } from '../lib/olivePersona';
import { AI_CHAT_MAX_MSG_CHARS } from '../lib/aiChatConstants';

type Role = 'user' | 'assistant';

interface WidgetMessage {
  role: Role;
  content: string;
}

interface OliveWidgetProps {
  /** Current page identifier for contextual responses. */
  pageContext?: string;
}

const OLIVE_ENABLED_KEY = 'fsaelite:olive-enabled:v1';
const OLIVE_HISTORY_KEY = 'fsaelite:olive-history:v1';
const MAX_WIDGET_MESSAGES = 20;

function loadEnabled(): boolean {
  if (typeof window === 'undefined') return true;
  const stored = window.localStorage.getItem(OLIVE_ENABLED_KEY);
  return stored !== 'false';
}

function loadHistory(): WidgetMessage[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(OLIVE_HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as WidgetMessage[];
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (m) =>
          (m.role === 'user' || m.role === 'assistant') &&
          typeof m.content === 'string' &&
          m.content.trim().length > 0
      )
      .slice(-MAX_WIDGET_MESSAGES);
  } catch {
    return [];
  }
}

export default function OliveWidget({ pageContext }: OliveWidgetProps) {
  const [enabled, setEnabled] = useState(true);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<WidgetMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load persisted state on mount.
  useEffect(() => {
    setEnabled(loadEnabled());
    setMessages(loadHistory());
  }, []);

  // Persist enabled preference.
  useEffect(() => {
    window.localStorage.setItem(OLIVE_ENABLED_KEY, String(enabled));
  }, [enabled]);

  // Persist chat history.
  useEffect(() => {
    if (messages.length > 0) {
      window.localStorage.setItem(OLIVE_HISTORY_KEY, JSON.stringify(messages.slice(-MAX_WIDGET_MESSAGES)));
    }
  }, [messages]);

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

  function clearHistory() {
    setMessages([]);
    window.localStorage.removeItem(OLIVE_HISTORY_KEY);
  }

  // When disabled, render nothing.
  if (!enabled) {
    return (
      <button
        className="olive-fab olive-fab-disabled"
        onClick={toggleEnabled}
        aria-label="Enable OLIVE assistant"
        title="Turn OLIVE back on"
      >
        <span className="olive-fab-icon">O</span>
      </button>
    );
  }

  const displayMessages =
    messages.length === 0
      ? [{ role: 'assistant' as const, content: OLIVE_GREETING }]
      : messages;

  return (
    <>
      {/* Floating action button */}
      {!open && (
        <button
          className="olive-fab"
          onClick={() => setOpen(true)}
          aria-label="Open OLIVE assistant"
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
              placeholder="Ask OLIVE anything…"
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

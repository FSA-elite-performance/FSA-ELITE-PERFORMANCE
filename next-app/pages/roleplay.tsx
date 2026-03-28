import Head from 'next/head';
import Link from 'next/link';
import { useState, useRef, useEffect, FormEvent } from 'react';
import { AI_CHAT_MAX_MESSAGES, AI_CHAT_MAX_MSG_CHARS } from '../lib/aiChatConstants';

type Role = 'user' | 'assistant';

interface Message {
  role: Role;
  content: string;
}

const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content:
    "Hey, I'm just looking around. I saw something online about this model but I'm not sure yet. What can you tell me?",
};

const SCENARIOS = [
  {
    label: '🚗 First-Time Buyer',
    opener:
      "Hi, I've never bought a car before and I'm not really sure where to start. I don't want to get ripped off.",
  },
  {
    label: '💰 Price Shopper',
    opener:
      "I've already been to three dealerships today. Your competitor down the street is offering me $2,000 less. Why should I buy from you?",
  },
  {
    label: '🤔 The Thinker',
    opener:
      "I like the car but I'm just not ready to make a decision today. I need to go home and think about it.",
  },
  {
    label: '📱 The Researcher',
    opener:
      "I did my homework on this. I know what invoice is, I know the holdback, and I know your dealer fee is marked up. Let's just talk numbers.",
  },
  {
    label: '⏰ Payment Shopper',
    opener:
      "I need to keep my payment under $400 a month. That's my hard limit. Can you make that work?",
  },
];

export default function Roleplay() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;

    const userMsg: Message = { role: 'user', content: text.trim() };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setLoading(true);
    setError('');

    // Trim to the most recent MAX_MESSAGES to stay within the API limit
    // and keep the request payload small as conversations grow long.
    const trimmed =
      updated.length > AI_CHAT_MAX_MESSAGES
        ? updated.slice(updated.length - AI_CHAT_MAX_MESSAGES)
        : updated;

    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: trimmed }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? `Server error ${res.status}`);
        return;
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
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

  function loadScenario(opener: string) {
    setMessages([{ role: 'assistant', content: opener }]);
    setInput('');
    setError('');
  }

  function resetChat() {
    setMessages([INITIAL_MESSAGE]);
    setInput('');
    setError('');
  }

  return (
    <>
      <Head>
        <title>Interactive Demo — Kubiks Next.js Starter</title>
        <meta
          name="description"
          content="Sample interactive page for the Kubiks Next.js Starter, showing how an API-backed experience can fit into the starter."
        />
      </Head>

      <main style={{ minHeight: '100vh', background: 'var(--color-bg)', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <header
          style={{
            background: '#0d0d0d',
            borderBottom: '1px solid var(--color-border)',
            padding: '1rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <Link href="/" style={{ color: 'var(--color-muted)', fontSize: '0.9rem' }}>
            ← Back
          </Link>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <span style={{ color: 'var(--color-primary)', fontWeight: 700, fontSize: '1.05rem' }}>
              🤖 Interactive Demo
            </span>
            <span style={{ color: 'var(--color-muted)', fontSize: '0.8rem', marginLeft: '0.5rem' }}>
              Kubiks Starter
            </span>
          </div>
          <button
            onClick={resetChat}
            style={{
              background: 'transparent',
              border: '1px solid var(--color-border)',
              color: 'var(--color-muted)',
              borderRadius: 'var(--radius)',
              padding: '0.35rem 0.85rem',
              fontSize: '0.8rem',
              cursor: 'pointer',
            }}
          >
            Reset
          </button>
        </header>

        {/* Scenario Picker */}
        <div
          style={{
            background: '#0d0d0d',
            borderBottom: '1px solid var(--color-border)',
            padding: '0.75rem 1.5rem',
            overflowX: 'auto',
          }}
        >
          <div style={{ display: 'flex', gap: '0.5rem', minWidth: 'max-content' }}>
            <span style={{ color: 'var(--color-muted)', fontSize: '0.8rem', alignSelf: 'center', marginRight: '0.25rem' }}>
              Scenario:
            </span>
            {SCENARIOS.map((s) => (
              <button
                key={s.label}
                onClick={() => loadScenario(s.opener)}
                style={{
                  background: '#141414',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text)',
                  borderRadius: 'var(--radius)',
                  padding: '0.4rem 0.9rem',
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'border-color 0.15s',
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-primary)')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-border)')
                }
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            maxWidth: '760px',
            width: '100%',
            margin: '0 auto',
          }}
        >
          <p style={{ color: 'var(--color-muted)', fontSize: '0.8rem', textAlign: 'center' }}>
            This sample page demonstrates an API-backed conversation flow inside the starter. Type{' '}
            <code style={{ color: 'var(--color-primary)' }}>/help</code> for coaching feedback.
          </p>

          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              <div
                style={{
                  maxWidth: '75%',
                  background: msg.role === 'user' ? 'var(--color-primary)' : '#1a1a1a',
                  color: msg.role === 'user' ? '#000' : 'var(--color-text)',
                  border: msg.role === 'user' ? 'none' : '1px solid var(--color-border)',
                  borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  padding: '0.75rem 1rem',
                  fontSize: '0.92rem',
                  lineHeight: 1.6,
                }}
              >
                {msg.role === 'assistant' && (
                  <span style={{ fontSize: '0.7rem', color: '#666', display: 'block', marginBottom: '0.25rem' }}>
                    Customer
                  </span>
                )}
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div
                style={{
                  background: '#1a1a1a',
                  border: '1px solid var(--color-border)',
                  borderRadius: '16px 16px 16px 4px',
                  padding: '0.75rem 1rem',
                  color: 'var(--color-muted)',
                  fontSize: '0.85rem',
                }}
              >
                Customer is thinking…
              </div>
            </div>
          )}

          {error && (
            <p
              style={{
                color: '#ff6b6b',
                background: '#1a0000',
                border: '1px solid #550000',
                borderRadius: 'var(--radius)',
                padding: '0.65rem 1rem',
                fontSize: '0.88rem',
                textAlign: 'center',
              }}
            >
              {error}
            </p>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input Bar */}
        <div
          style={{
            background: '#0d0d0d',
            borderTop: '1px solid var(--color-border)',
            padding: '1rem 1.5rem',
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              display: 'flex',
              gap: '0.75rem',
              maxWidth: '760px',
              margin: '0 auto',
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Your response to the customer…"
              disabled={loading}
              maxLength={AI_CHAT_MAX_MSG_CHARS}
              style={{
                flex: 1,
                background: '#141414',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius)',
                color: 'var(--color-text)',
                padding: '0.75rem 1rem',
                fontSize: '0.95rem',
                outline: 'none',
                fontFamily: 'var(--font-sans)',
              }}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="btn-primary"
              style={{ padding: '0.75rem 1.5rem', fontSize: '0.95rem', flexShrink: 0 }}
            >
              Send
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

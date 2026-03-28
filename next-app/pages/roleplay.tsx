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
        <title>FSA ELITE Roleplay Lab | AI Objection Trainer</title>
        <meta
          name="description"
          content="Practice live objection handling with the FSA ELITE AI roleplay trainer for automotive sales pros."
        />
      </Head>

      <main className="roleplay-page">
        <header className="roleplay-header">
          <Link href="/" className="roleplay-back-link">
            ← Back
          </Link>
          <div className="roleplay-header-center">
            <span className="roleplay-title">Roleplay Lab</span>
            <span className="roleplay-subtitle">FSA ELITE AI Trainer</span>
          </div>
          <button onClick={resetChat} className="roleplay-reset-btn">
            Reset
          </button>
        </header>

        <div className="roleplay-scenarios-wrap">
          <div className="roleplay-scenarios">
            <span className="roleplay-scenarios-label">
              Scenario:
            </span>
            {SCENARIOS.map((s) => (
              <button key={s.label} onClick={() => loadScenario(s.opener)} className="roleplay-scenario-btn">
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="roleplay-chat-window">
          <p className="roleplay-helper-text">
            Train objection handling in real time. Type <code>/help</code> for coaching feedback after your response.
          </p>

          {messages.map((msg, i) => (
            <div key={i} className={`roleplay-message-row ${msg.role === 'user' ? 'roleplay-message-user' : 'roleplay-message-assistant'}`}>
              <div className={`roleplay-message-bubble ${msg.role === 'user' ? 'roleplay-bubble-user' : 'roleplay-bubble-assistant'}`}>
                {msg.role === 'assistant' && (
                  <span className="roleplay-speaker-tag">
                    Customer
                  </span>
                )}
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="roleplay-message-row roleplay-message-assistant">
              <div className="roleplay-message-bubble roleplay-bubble-assistant roleplay-loading-bubble">
                Customer is thinking…
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

        <div className="roleplay-input-wrap">
          <form onSubmit={handleSubmit} className="roleplay-input-form">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Your response to the customer…"
              disabled={loading}
              maxLength={AI_CHAT_MAX_MSG_CHARS}
              className="roleplay-input"
            />
            <button type="submit" disabled={loading || !input.trim()} className="btn-primary roleplay-send-btn">
              Send
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

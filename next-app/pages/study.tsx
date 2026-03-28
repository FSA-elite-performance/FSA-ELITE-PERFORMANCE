import Head from 'next/head';
import Link from 'next/link';
import { useState, useCallback } from 'react';

/* ─── Flashcard Data ─────────────────────────────────────── */

interface Flashcard {
  id: number;
  category: string;
  question: string;
  answer: string;
}

const CARDS: Flashcard[] = [
  /* ── Daily Mindset ── */
  {
    id: 1,
    category: 'Daily Mindset',
    question: 'What should you ask yourself every morning?',
    answer:
      'Who can I move today? Who\'s sitting on a decision? What deal is rotting? What money is waiting on a conversation? Where am I bullshitting myself?',
  },
  {
    id: 2,
    category: 'Daily Mindset',
    question: 'What midday check-in keeps your pipeline honest?',
    answer: "What's moving? What's dead? Who's lying to me? Who am I lying to? What needs pressure?",
  },
  {
    id: 3,
    category: 'Daily Mindset',
    question: 'What night review questions separate producers from talkers?',
    answer: 'Who advanced? Who stalled? Who disappeared? Who committed? What made money?',
  },
  {
    id: 4,
    category: 'Daily Mindset',
    question: "What is the core principle of FSA Elite?",
    answer:
      "You don't build income. You build systems that produce income.",
  },

  /* ── Identity ── */
  {
    id: 5,
    category: 'Identity',
    question: 'Recite the FSA Elite Identity Code.',
    answer:
      "I don't chase. I don't beg. I don't convince.\nI qualify. I pressure. I lead. I close.\nI move decisions. I don't stall. I don't drift.",
  },
  {
    id: 6,
    category: 'Identity',
    question: "Do you move deals or babysit them?",
    answer: "I move deals. Every stalled deal is a choice I made to let it sit. Pressure it or cut it.",
  },
  {
    id: 7,
    category: 'Identity',
    question: 'What do people follow?',
    answer: 'Certainty. Clarity. Authority. Outcomes. NOT hype, charm, energy, or motivation.',
  },

  /* ── Pipeline Rules ── */
  {
    id: 8,
    category: 'Pipeline',
    question: 'If a deal is not moving, what is it?',
    answer: 'Dead. If it\'s not moving → it\'s dead. If it\'s delayed → it\'s weak. If it\'s vague → it\'s fake.',
  },
  {
    id: 9,
    category: 'Pipeline',
    question: 'What are the key pipeline questions to audit your deals?',
    answer:
      "Who's undecided but pretending? Who's shopping me? Who's scared to commit? Who's wasting time? Who needs pressure? Who needs clarity? Who needs to be cut?",
  },
  {
    id: 10,
    category: 'Pipeline',
    question: 'Pipelines don\'t fail — what does?',
    answer: 'Behavior fails. Leads don\'t die — they\'re neglected. Deals don\'t stall — they\'re avoided.',
  },
  {
    id: 11,
    category: 'Pipeline',
    question: 'What is the money conversion chain?',
    answer: 'Conversations → Decisions → Commitments → Revenue → Repeat Business',
  },

  /* ── Objection Handling ── */
  {
    id: 12,
    category: 'Objection Handling',
    question: "Customer says: \"I need to think about it.\" What does that signal?",
    answer:
      'They haven\'t decided yet — which means you haven\'t created enough clarity or urgency. Ask: "What specifically do you need to think through? Let\'s work through it together right now."',
  },
  {
    id: 13,
    category: 'Objection Handling',
    question: "Customer says: \"The price is too high.\" What is the real objection?",
    answer:
      "They don't see enough value yet. Reframe: \"Compared to what? The cost of staying where you are, or the value of where this takes you?\"",
  },
  {
    id: 14,
    category: 'Objection Handling',
    question: "Customer says: \"I need to talk to my spouse/partner.\" How do you handle this?",
    answer:
      "Qualify earlier next time. In the moment: \"Totally respect that — if they were here right now and everything lined up, is this the direction you'd go?\" If yes, schedule a joint call.",
  },
  {
    id: 15,
    category: 'Objection Handling',
    question: "Customer says: \"I'm not ready yet.\" What AI coach trigger applies?",
    answer:
      'SLOW CLOSES → "You\'re waiting for permission." Apply pressure: "Ready for what exactly? Most people who wait miss the window. What would make you ready today?"',
  },
  {
    id: 16,
    category: 'Objection Handling',
    question: "You're getting HIGH OBJECTIONS. What does the AI coach say you did wrong?",
    answer: '"You pitched. You didn\'t frame." High objections = poor discovery and framing, not bad closing.',
  },

  /* ── Closing ── */
  {
    id: 17,
    category: 'Closing',
    question: 'What does sales equal?',
    answer: 'Sales = pressure + clarity. Money moves when decisions move.',
  },
  {
    id: 18,
    category: 'Closing',
    question: 'What separates closers from everyone else?',
    answer: 'Closers confront. Earners execute. Producers don\'t cope.',
  },
  {
    id: 19,
    category: 'Closing',
    question: 'What does confidence follow?',
    answer: 'Confidence follows volume. No volume = no confidence. Get more reps.',
  },
  {
    id: 20,
    category: 'Closing',
    question: 'No follow-up = what?',
    answer:
      'No money. "That deal didn\'t die — you ghosted it." Response speed and follow-up gaps are killer metrics.',
  },

  /* ── Pressure Metrics ── */
  {
    id: 21,
    category: 'Metrics',
    question: 'Name the killer metrics every top salesperson tracks.',
    answer:
      'Response speed · Follow-up gaps · Decision delays · Deal stagnation time · Ghost rate · Re-engagement success · Lead decay time',
  },
  {
    id: 22,
    category: 'Metrics',
    question: 'What are pressure metrics?',
    answer:
      'Avoidance index · Comfort index · Discomfort reps · Hard conversations · Direct asks · Close attempts',
  },
  {
    id: 23,
    category: 'Metrics',
    question: "LOW ACTIVITY alert — what does the AI coach say?",
    answer: '"You\'re not tired — you\'re inactive."',
  },
  {
    id: 24,
    category: 'Metrics',
    question: 'NO PIPELINE alert — what does the AI coach say?',
    answer: '"You\'re broke in 30 days at this pace."',
  },

  /* ── Motivation ── */
  {
    id: 25,
    category: 'Motivation',
    question: 'Complete: "Your income matches your ___."',
    answer: 'Standards. Your income matches your standards. Raise the standard.',
  },
  {
    id: 26,
    category: 'Motivation',
    question: "What does BUSY with NO MONEY mean?",
    answer: '"Movement isn\'t progress. Pressure is." Being busy ≠ being productive.',
  },
  {
    id: 27,
    category: 'Motivation',
    question: 'No structure = ?',
    answer: 'No scale. No movement = no income. No conversations = no closings. No closings = no respect.',
  },

  /* ── Hiring / Leadership ── */
  {
    id: 28,
    category: 'Leadership',
    question: 'What is the FSA Elite Hiring Code?',
    answer:
      'Revenue > personality · Certainty > charm · Output > experience · Pressure > polish · Results > reputation',
  },
  {
    id: 29,
    category: 'Leadership',
    question: 'What are the four App Modes in the FSA Elite system?',
    answer:
      'Killer Mode (aggressive, pressure) · Operator Mode (cold, strategic) · Mentor Mode (corrective, calm) · War Room Mode (tactical, urgent)',
  },
];

const ALL_CATEGORIES = ['All', ...Array.from(new Set(CARDS.map((c) => c.category)))];

/* ─── Helpers ─────────────────────────────────────────────── */

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ─── Component ───────────────────────────────────────────── */

export default function Study() {
  const [category, setCategory] = useState('All');
  const [deck, setDeck] = useState<Flashcard[]>(CARDS);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<Set<number>>(new Set());

  const currentDeck = deck.filter((c) => (category === 'All' ? true : c.category === category));

  const card = currentDeck[index] ?? null;
  const total = currentDeck.length;
  const progress = total > 0 ? Math.round(((index + 1) / total) * 100) : 0;

  const handleCategory = (cat: string) => {
    setCategory(cat);
    setIndex(0);
    setFlipped(false);
    const base = cat === 'All' ? CARDS : CARDS.filter((c) => c.category === cat);
    setDeck(base);
  };

  const handleShuffle = useCallback(() => {
    const base = category === 'All' ? CARDS : CARDS.filter((c) => c.category === category);
    setDeck(shuffle(base));
    setIndex(0);
    setFlipped(false);
  }, [category]);

  const handleFlip = () => setFlipped((f) => !f);

  const handleNext = () => {
    if (index < total - 1) {
      setIndex((i) => i + 1);
      setFlipped(false);
    }
  };

  const handlePrev = () => {
    if (index > 0) {
      setIndex((i) => i - 1);
      setFlipped(false);
    }
  };

  const handleMarkKnown = () => {
    if (!card) return;
    setKnown((prev) => {
      const next = new Set(prev);
      if (next.has(card.id)) {
        next.delete(card.id);
      } else {
        next.add(card.id);
      }
      return next;
    });
  };

  const handleReset = () => {
    setIndex(0);
    setFlipped(false);
    setKnown(new Set());
    const base = category === 'All' ? CARDS : CARDS.filter((c) => c.category === category);
    setDeck(base);
  };

  const isKnown = card ? known.has(card.id) : false;
  const knownCount = currentDeck.filter((c) => known.has(c.id)).length;

  return (
    <>
      <Head>
        <title>Study Flashcards — FSA Elite Sales Training</title>
        <meta
          name="description"
          content="Study FSA Elite sales concepts with interactive flashcards. Master objection handling, closing techniques, pipeline management, and the closer mindset."
        />
      </Head>

      <main style={{ minHeight: '100vh', background: '#0a0a0a', fontFamily: 'var(--font-sans)' }}>
        {/* ── Header ── */}
        <header
          style={{
            background: 'linear-gradient(135deg, #0a0a0a 60%, #1a1000 100%)',
            borderBottom: '1px solid #2a2a2a',
            padding: '2rem 1.5rem',
            textAlign: 'center',
          }}
        >
          <div className="container">
            <Link
              href="/"
              style={{ color: '#666', fontSize: '0.82rem', marginBottom: '1.25rem', display: 'inline-block' }}
            >
              ← Back to Home
            </Link>
            <h1
              style={{
                fontSize: 'clamp(1.8rem, 5vw, 3rem)',
                fontWeight: 900,
                color: '#f0f0f0',
                lineHeight: 1.1,
                marginBottom: '0.5rem',
              }}
            >
              Study <span style={{ color: '#f5a623' }}>Flashcards</span>
            </h1>
            <p style={{ color: '#888', fontSize: '1rem' }}>
              Tap a card to flip it · Master every concept before you hit the floor.
            </p>
          </div>
        </header>

        <div className="container" style={{ padding: '2.5rem 1.5rem' }}>
          {/* ── Category Filters ── */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              marginBottom: '2rem',
              justifyContent: 'center',
            }}
          >
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategory(cat)}
                style={{
                  background: category === cat ? '#f5a623' : '#141414',
                  color: category === cat ? '#000' : '#ccc',
                  border: `1px solid ${category === cat ? '#f5a623' : '#2a2a2a'}`,
                  borderRadius: '20px',
                  padding: '0.4rem 1rem',
                  fontSize: '0.85rem',
                  fontWeight: category === cat ? 700 : 400,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontFamily: 'inherit',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* ── Progress Bar ── */}
          {total > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.82rem',
                  color: '#888',
                  marginBottom: '0.4rem',
                }}
              >
                <span>
                  Card {index + 1} of {total}
                </span>
                <span style={{ color: '#4caf50' }}>
                  ✓ {knownCount} known
                </span>
              </div>
              <div
                style={{
                  background: '#1e1e1e',
                  borderRadius: '4px',
                  height: '6px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: `${progress}%`,
                    height: '100%',
                    background: 'linear-gradient(90deg, #f5a623, #e09210)',
                    transition: 'width 0.3s ease',
                    borderRadius: '4px',
                  }}
                />
              </div>
            </div>
          )}

          {/* ── Flashcard ── */}
          {card ? (
            <div style={{ perspective: '1000px', marginBottom: '2rem' }}>
              {/* Card wrapper with 3-D flip */}
              <div
                onClick={handleFlip}
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '680px',
                  margin: '0 auto',
                  height: '280px',
                  cursor: 'pointer',
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.5s ease',
                  transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
                role="button"
                aria-label={flipped ? 'Card answer — click to see question' : 'Card question — click to flip'}
              >
                {/* Front */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    background: '#141414',
                    border: `2px solid ${isKnown ? '#4caf50' : '#2a2a2a'}`,
                    borderRadius: '14px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem',
                    textAlign: 'center',
                    gap: '1rem',
                  }}
                >
                  <span
                    style={{
                      background: '#1e1e1e',
                      color: '#f5a623',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '20px',
                    }}
                  >
                    {card.category}
                  </span>
                  <p
                    style={{
                      fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                      fontWeight: 700,
                      color: '#f0f0f0',
                      lineHeight: 1.5,
                    }}
                  >
                    {card.question}
                  </p>
                  <p style={{ color: '#555', fontSize: '0.8rem' }}>tap to reveal →</p>
                </div>

                {/* Back */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    background: '#1a1000',
                    border: '2px solid #f5a623',
                    borderRadius: '14px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem',
                    textAlign: 'center',
                    gap: '0.75rem',
                    overflow: 'auto',
                  }}
                >
                  <span
                    style={{
                      background: '#f5a62322',
                      color: '#f5a623',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '20px',
                    }}
                  >
                    Answer
                  </span>
                  <p
                    style={{
                      fontSize: 'clamp(0.88rem, 2vw, 1.05rem)',
                      color: '#f0f0f0',
                      lineHeight: 1.7,
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {card.answer}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div
              style={{
                textAlign: 'center',
                color: '#888',
                padding: '4rem 1.5rem',
                background: '#141414',
                borderRadius: '14px',
                marginBottom: '2rem',
              }}
            >
              No cards in this category.
            </div>
          )}

          {/* ── Controls ── */}
          <div
            style={{
              display: 'flex',
              gap: '0.75rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '2.5rem',
            }}
          >
            <button
              onClick={handlePrev}
              disabled={index === 0}
              style={navBtnStyle(index === 0)}
            >
              ← Prev
            </button>

            <button
              onClick={handleMarkKnown}
              disabled={!card}
              style={{
                ...navBtnStyle(!card),
                background: isKnown ? '#1a3a1a' : '#141414',
                border: `1px solid ${isKnown ? '#4caf50' : '#2a2a2a'}`,
                color: isKnown ? '#4caf50' : '#ccc',
              }}
            >
              {isKnown ? '✓ Known' : 'Mark Known'}
            </button>

            <button
              onClick={handleNext}
              disabled={index === total - 1}
              style={navBtnStyle(index === total - 1)}
            >
              Next →
            </button>
          </div>

          {/* ── Secondary Actions ── */}
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={handleShuffle} style={actionBtnStyle()}>
              🔀 Shuffle
            </button>
            <button onClick={handleReset} style={actionBtnStyle()}>
              ↺ Restart
            </button>
          </div>

          {/* ── Completion Banner ── */}
          {index === total - 1 && total > 0 && (
            <div
              style={{
                marginTop: '2.5rem',
                background: 'linear-gradient(135deg, #1a1000, #0d0800)',
                border: '1px solid #f5a623',
                borderRadius: '12px',
                padding: '2rem',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>🏆</div>
              <h2 style={{ color: '#f5a623', fontWeight: 800, marginBottom: '0.5rem' }}>
                Deck Complete!
              </h2>
              <p style={{ color: '#aaa', marginBottom: '1.5rem' }}>
                You reviewed all {total} cards. {knownCount} marked as known.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button onClick={handleShuffle} className="btn-primary" style={{ fontSize: '0.95rem' }}>
                  🔀 Shuffle & Go Again
                </button>
                <button onClick={handleReset} style={actionBtnStyle()}>
                  ↺ Reset Progress
                </button>
              </div>
            </div>
          )}

          {/* ── Card List (Study Reference) ── */}
          <details style={{ marginTop: '3rem' }}>
            <summary
              style={{
                color: '#666',
                cursor: 'pointer',
                fontSize: '0.88rem',
                padding: '0.5rem 0',
                listStyle: 'none',
                userSelect: 'none',
              }}
            >
              📋 View all cards in this deck ({total})
            </summary>
            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {currentDeck.map((c, i) => (
                <div
                  key={c.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => { setIndex(i); setFlipped(false); }}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setIndex(i); setFlipped(false); } }}
                  style={{
                    background: index === i ? '#1a1000' : '#141414',
                    border: `1px solid ${index === i ? '#f5a623' : '#2a2a2a'}`,
                    borderRadius: '8px',
                    padding: '0.9rem 1.25rem',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                    <p style={{ color: '#ccc', fontSize: '0.9rem', margin: 0 }}>
                      <span style={{ color: '#555', marginRight: '0.5rem' }}>{i + 1}.</span>
                      {c.question}
                    </p>
                    {known.has(c.id) && (
                      <span style={{ color: '#4caf50', fontSize: '0.8rem', flexShrink: 0 }}>✓ Known</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </details>
        </div>

        {/* ── Footer ── */}
        <footer
          style={{
            borderTop: '1px solid #2a2a2a',
            padding: '2rem 1.5rem',
            textAlign: 'center',
            color: '#444',
            fontSize: '0.82rem',
          }}
        >
          <p>
            © {new Date().getFullYear()} FSA Elite Performance LLC · All rights reserved ·{' '}
            <a href="mailto:support@fsaeliteperformance.org" style={{ color: '#666' }}>
              support@fsaeliteperformance.org
            </a>
          </p>
        </footer>
      </main>
    </>
  );
}

/* ─── Style Helpers ───────────────────────────────────────── */

function navBtnStyle(disabled: boolean): React.CSSProperties {
  return {
    background: disabled ? '#0e0e0e' : '#141414',
    color: disabled ? '#333' : '#ccc',
    border: `1px solid ${disabled ? '#1a1a1a' : '#2a2a2a'}`,
    borderRadius: '8px',
    padding: '0.6rem 1.4rem',
    fontSize: '0.92rem',
    fontWeight: 600,
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontFamily: 'inherit',
    transition: 'all 0.2s',
    opacity: disabled ? 0.4 : 1,
  };
}

function actionBtnStyle(): React.CSSProperties {
  return {
    background: '#141414',
    color: '#888',
    border: '1px solid #2a2a2a',
    borderRadius: '8px',
    padding: '0.5rem 1.2rem',
    fontSize: '0.85rem',
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'all 0.2s',
  };
}

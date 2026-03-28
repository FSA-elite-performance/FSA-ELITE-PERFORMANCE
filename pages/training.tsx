import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import { PUBLIC_SEO_KEYWORDS, PUBLIC_SITE_URL } from '../lib/businessDetails';
import {
  TRAINING_TOPICS,
  getTodayLesson,
  getAllLessons,
  type Lesson,
  type Topic,
} from '../lib/trainingPath';

const SITE_URL = PUBLIC_SITE_URL.replace(/\/$/, '');
const PROGRESS_KEY = 'fsaelite:training-progress:v1';

type ProgressMap = Record<string, boolean>;

function loadProgress(): ProgressMap {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(PROGRESS_KEY);
    return raw ? (JSON.parse(raw) as ProgressMap) : {};
  } catch {
    return {};
  }
}

function saveProgress(map: ProgressMap): void {
  try {
    window.localStorage.setItem(PROGRESS_KEY, JSON.stringify(map));
  } catch {
    /* storage unavailable */
  }
}

export default function TrainingPath() {
  const [progress, setProgress] = useState<ProgressMap>({});
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({});
  const [todayLesson, setTodayLesson] = useState<Lesson | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setProgress(loadProgress());
    setTodayLesson(getTodayLesson());
    // Expand the first topic by default
    setExpandedTopics({ [TRAINING_TOPICS[0].id]: true });
    setMounted(true);
  }, []);

  const toggleLesson = useCallback((lessonId: string) => {
    setExpandedLesson((prev) => (prev === lessonId ? null : lessonId));
  }, []);

  const toggleTopic = useCallback((topicId: string) => {
    setExpandedTopics((prev) => ({ ...prev, [topicId]: !prev[topicId] }));
  }, []);

  const markComplete = useCallback(
    (lessonId: string) => {
      const next = { ...progress, [lessonId]: true };
      setProgress(next);
      saveProgress(next);
    },
    [progress],
  );

  const markIncomplete = useCallback(
    (lessonId: string) => {
      const next = { ...progress };
      delete next[lessonId];
      setProgress(next);
      saveProgress(next);
    },
    [progress],
  );

  const allLessons = getAllLessons();
  const completedCount = allLessons.filter((l) => progress[l.id]).length;
  const totalCount = allLessons.length;
  const pctComplete = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const todayTopic = todayLesson
    ? TRAINING_TOPICS.find((t) => t.id === todayLesson.topicId)
    : null;

  return (
    <>
      <Head>
        <title>Training Path | FSA ELITE</title>
        <meta
          name="description"
          content="Your structured sales training curriculum — 19 practical lessons across 6 core topics. Sales psychology, body language, objections, communication, closing, and mindset."
        />
        <meta name="keywords" content={PUBLIC_SEO_KEYWORDS} />
        <link rel="canonical" href={`${SITE_URL}/training`} />
      </Head>

      <main className="training-page">
        {/* Hero */}
        <div className="training-hero">
          <div className="training-hero-text">
            <h1>Your Training Path</h1>
            <p>
              19 short, high-impact lessons across 6 core topics. 15 minutes a day is all it takes
              to sharpen every skill that closes deals.
            </p>
          </div>
          {mounted && (
            <div className="training-hero-progress">
              <div className="training-progress-track">
                <div
                  className="training-progress-fill"
                  style={{ width: `${pctComplete}%` }}
                />
              </div>
              <span className="training-progress-label">
                {completedCount} / {totalCount} lessons complete — {pctComplete}%
              </span>
            </div>
          )}
        </div>

        {/* Today's Lesson Banner */}
        {todayLesson && todayTopic && (
          <div className="training-today-banner">
            <div className="training-today-inner">
              <div className="training-today-meta">
                <span className="training-today-eyebrow">
                  {todayTopic.icon} Today&apos;s Lesson · {todayTopic.title}
                </span>
                <h2 className="training-today-title">{todayLesson.title}</h2>
                <p className="training-today-concept">
                  {todayLesson.concept.split('.')[0]}.
                </p>
              </div>
              <div className="training-today-actions">
                <span className="training-today-duration">⏱ {todayLesson.duration}</span>
                <button
                  type="button"
                  className="btn-primary btn-sm"
                  onClick={() => {
                    setExpandedTopics((prev) => ({
                      ...prev,
                      [todayLesson.topicId]: true,
                    }));
                    setExpandedLesson(todayLesson.id);
                    setTimeout(() => {
                      const el = document.getElementById(`lesson-${todayLesson.id}`);
                      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 100);
                  }}
                >
                  Open Lesson →
                </button>
                <Link href="/roleplay" className="btn-secondary btn-sm">
                  Practice in AI Arena →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Topic Sections */}
        <div className="training-topics">
          {TRAINING_TOPICS.map((topic) => (
            <TopicSection
              key={topic.id}
              topic={topic}
              progress={progress}
              expandedLesson={expandedLesson}
              isTopicOpen={!!expandedTopics[topic.id]}
              onToggleTopic={toggleTopic}
              onToggleLesson={toggleLesson}
              onMarkComplete={markComplete}
              onMarkIncomplete={markIncomplete}
              mounted={mounted}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="training-cta">
          <p>Ready to put these skills to the test?</p>
          <Link href="/roleplay" className="btn-primary btn-lg">
            🎯 Open AI Practice Arena
          </Link>
        </div>
      </main>
    </>
  );
}

/* ─── Sub-components ──────────────────────────────────────────────────────── */

interface TopicSectionProps {
  topic: Topic;
  progress: ProgressMap;
  expandedLesson: string | null;
  isTopicOpen: boolean;
  mounted: boolean;
  onToggleTopic: (id: string) => void;
  onToggleLesson: (id: string) => void;
  onMarkComplete: (id: string) => void;
  onMarkIncomplete: (id: string) => void;
}

function TopicSection({
  topic,
  progress,
  expandedLesson,
  isTopicOpen,
  mounted,
  onToggleTopic,
  onToggleLesson,
  onMarkComplete,
  onMarkIncomplete,
}: TopicSectionProps) {
  const completedInTopic = topic.lessons.filter((l) => progress[l.id]).length;

  return (
    <div className="training-topic">
      <button
        type="button"
        className="training-topic-header"
        onClick={() => onToggleTopic(topic.id)}
        aria-expanded={isTopicOpen}
      >
        <div className="training-topic-header-left">
          <span className="training-topic-icon" aria-hidden="true">{topic.icon}</span>
          <div>
            <span className="training-topic-order">Topic {topic.order}</span>
            <h2 className="training-topic-title">{topic.title}</h2>
            <p className="training-topic-desc">{topic.description}</p>
          </div>
        </div>
        <div className="training-topic-header-right">
          {mounted && (
            <span className="training-topic-count">
              {completedInTopic}/{topic.lessons.length}
            </span>
          )}
          <span className="training-topic-chevron" aria-hidden="true">
            {isTopicOpen ? '▲' : '▼'}
          </span>
        </div>
      </button>

      {isTopicOpen && (
        <div className="training-lesson-list">
          {topic.lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              isComplete={mounted ? !!progress[lesson.id] : false}
              isExpanded={expandedLesson === lesson.id}
              onToggle={onToggleLesson}
              onMarkComplete={onMarkComplete}
              onMarkIncomplete={onMarkIncomplete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface LessonCardProps {
  lesson: Lesson;
  isComplete: boolean;
  isExpanded: boolean;
  onToggle: (id: string) => void;
  onMarkComplete: (id: string) => void;
  onMarkIncomplete: (id: string) => void;
}

function LessonCard({
  lesson,
  isComplete,
  isExpanded,
  onToggle,
  onMarkComplete,
  onMarkIncomplete,
}: LessonCardProps) {
  return (
    <div
      id={`lesson-${lesson.id}`}
      className={`training-lesson-card ${isComplete ? 'training-lesson-complete' : ''} ${isExpanded ? 'training-lesson-open' : ''}`}
    >
      <button
        type="button"
        className="training-lesson-summary"
        onClick={() => onToggle(lesson.id)}
        aria-expanded={isExpanded}
      >
        <div className="training-lesson-summary-left">
          <span className="training-lesson-day">Day {lesson.day}</span>
          <span className="training-lesson-title">{lesson.title}</span>
        </div>
        <div className="training-lesson-summary-right">
          <span className="training-lesson-duration">⏱ {lesson.duration}</span>
          <span
            className={`training-lesson-badge ${isComplete ? 'badge-complete' : 'badge-available'}`}
          >
            {isComplete ? '✓ Done' : 'Available'}
          </span>
          <span className="training-lesson-chevron" aria-hidden="true">
            {isExpanded ? '▲' : '▼'}
          </span>
        </div>
      </button>

      {isExpanded && (
        <div className="training-lesson-expanded">
          <div className="training-lesson-section">
            <h4 className="training-lesson-section-label">📖 Concept</h4>
            <p>{lesson.concept}</p>
          </div>

          <div className="training-lesson-section">
            <h4 className="training-lesson-section-label">💡 Real Example</h4>
            <p className="training-lesson-example">{lesson.example}</p>
          </div>

          <div className="training-lesson-section">
            <h4 className="training-lesson-section-label">⚡ Apply Today</h4>
            <p>{lesson.applyToday}</p>
          </div>

          <div className="training-lesson-drill">
            <h4 className="training-lesson-section-label">🎯 AI Drill</h4>
            <p className="training-lesson-drill-prompt">{lesson.drillPrompt}</p>
            <Link href="/roleplay" className="btn-primary btn-sm">
              Practice in AI Arena →
            </Link>
          </div>

          <div className="training-lesson-actions">
            {isComplete ? (
              <button
                type="button"
                className="btn-ghost btn-sm"
                onClick={() => onMarkIncomplete(lesson.id)}
              >
                ✓ Mark as Not Done
              </button>
            ) : (
              <button
                type="button"
                className="btn-success btn-sm"
                onClick={() => onMarkComplete(lesson.id)}
              >
                ✓ Mark as Complete
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

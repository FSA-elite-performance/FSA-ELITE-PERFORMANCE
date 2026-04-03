import Head from 'next/head';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { PUBLIC_SEO_KEYWORDS, PUBLIC_SITE_URL } from '../lib/businessDetails';
import { formatSkillTag, type SkillTag } from '../lib/roleplayIntelligence';

const SITE_URL = PUBLIC_SITE_URL.replace(/\/$/, '');

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

type StatusCheck = {
  id: string;
  label: string;
  state: 'pass' | 'warn' | 'fail';
  detail: string;
};

type SystemStatus = {
  timestamp: string;
  environment: string;
  checks: StatusCheck[];
};

const SKILL_KEYS: SkillTag[] = [
  'frame_control',
  'discovery_depth',
  'objection_isolation',
  'value_building',
  'next_step_close',
  'composure',
];

const SKILL_COLORS: Record<SkillTag, string> = {
  frame_control: 'var(--color-accent)',
  discovery_depth: 'var(--color-success)',
  objection_isolation: 'var(--color-warning)',
  value_building: 'var(--color-purple)',
  next_step_close: 'var(--color-pink)',
  composure: 'var(--color-cyan)',
};

function loadProgress(): RoleplayProgress | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(ROLEPLAY_PROGRESS_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as RoleplayProgress;
  } catch {
    return null;
  }
}

function scoreClass(value: number): string {
  if (value >= 7) return 'score-high';
  if (value >= 4) return 'score-mid';
  return 'score-low';
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function Welcome() {
  const [progress, setProgress] = useState<RoleplayProgress | null>(null);
  const [systemStatus, setSystemStatus] = useState<SystemStatus | null>(null);
  const [statusError, setStatusError] = useState(false);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  const fetchSystemStatus = useCallback(async () => {
    try {
      const res = await fetch('/api/system-status', { credentials: 'same-origin' });
      if (!res.ok) { setStatusError(true); return; }
      const data: SystemStatus = await res.json();
      setSystemStatus(data);
      setStatusError(false);
    } catch {
      setStatusError(true);
    }
  }, []);

  useEffect(() => {
    fetchSystemStatus();
  }, [fetchSystemStatus]);

  const sessions = progress?.sessionsCompleted ?? 0;
  const turns = progress?.totalTurns ?? 0;
  const avgControl = turns > 0 ? (progress?.totalControl ?? 0) / turns : 0;
  const avgDepth = turns > 0 ? (progress?.totalDepth ?? 0) / turns : 0;
  const avgConversion = turns > 0 ? (progress?.totalConversion ?? 0) / turns : 0;
  const avgOverall = turns > 0 ? (avgControl + avgDepth + avgConversion) / 3 : 0;
  const drillsToday = progress?.drillsCompletedByDay?.[todayKey()] ?? 0;
  const weakestSkill = turns === 0
    ? null
    : SKILL_KEYS.reduce<SkillTag | null>((weakestSoFar, key) => {
        const current = progress?.skillAggregate?.[key];
        if (!current || current.count === 0) return weakestSoFar;

        if (!weakestSoFar) return key;

        const weakestAggregate = progress?.skillAggregate?.[weakestSoFar];
        if (!weakestAggregate || weakestAggregate.count === 0) return key;

        const currentSkillAvg = current.sum / current.count;
        const weakestSkillAvg = weakestAggregate.sum / weakestAggregate.count;
        return currentSkillAvg < weakestSkillAvg ? key : weakestSoFar;
      }, null);
  const focusLabel = weakestSkill ? formatSkillTag(weakestSkill) : null;

  return (
    <>
      <Head>
        <title>Dashboard | FSA ELITE</title>
        <meta
          name="description"
          content="Your FSA ELITE training dashboard at fsaeliteperformance.com. Track roleplay performance, skill progress, and daily drills."
        />
        <meta name="keywords" content={PUBLIC_SEO_KEYWORDS} />
        <link rel="canonical" href={`${SITE_URL}/welcome`} />
      </Head>

      <main className="dash-page">
        <div className="dash-welcome">
          <h1>Your Closer Dashboard</h1>
          <p>
            {turns === 0
              ? 'Every top closer tracks their numbers. Start your first drill and this board shows you exactly where your pitch breaks.'
              : `${avgOverall >= 7 ? 'You are cooking.' : 'Room to grow.'} Averaging ${avgOverall.toFixed(1)}/10 across ${sessions} session${sessions === 1 ? '' : 's'}. ${focusLabel ? `Focus area: ${focusLabel}.` : ''}`}
          </p>
        </div>

        {/* Metric Cards */}
        <div className="dash-metrics">
          <div className="dash-metric-card">
            <span className="dash-metric-label">Sessions Run</span>
            <span className="dash-metric-value">{sessions}</span>
            <span className="dash-metric-sub">completed</span>
          </div>
          <div className="dash-metric-card">
            <span className="dash-metric-label">Turns Logged</span>
            <span className="dash-metric-value">{turns}</span>
            <span className="dash-metric-sub">across all sessions</span>
          </div>
          <div className="dash-metric-card">
            <span className="dash-metric-label">Average Score</span>
            <span className={`dash-metric-value ${scoreClass(avgOverall)}`}>
              {avgOverall > 0 ? avgOverall.toFixed(1) : '—'}
            </span>
            <span className="dash-metric-sub">out of 10</span>
          </div>
          <div className="dash-metric-card">
            <span className="dash-metric-label">Drills Today</span>
            <span className="dash-metric-value">{drillsToday}</span>
            <span className="dash-metric-sub">{todayKey()}</span>
          </div>
        </div>

        {/* Two-column grid */}
        <div className="dash-grid">
          {/* Skill Breakdown */}
          <div className="dash-panel">
            <h2>🎯 Skill Breakdown</h2>
            {turns === 0 ? (
              <p className="dash-panel-muted">Complete your first roleplay session to see skill data.</p>
            ) : (
              <div className="dash-skill-list">
                {SKILL_KEYS.map((key) => {
                  const agg = progress?.skillAggregate?.[key];
                  const avg = agg && agg.count > 0 ? agg.sum / agg.count : 0;
                  const pct = Math.min(avg * 10, 100);
                  return (
                    <div className="dash-skill-item" key={key}>
                      <span className="dash-skill-name">{formatSkillTag(key)}</span>
                      <div className="dash-skill-bar-track">
                        <div
                          className="dash-skill-bar-fill"
                          style={{ width: `${pct}%`, background: SKILL_COLORS[key] }}
                        />
                      </div>
                      <span className={`dash-skill-value ${scoreClass(avg)}`}>
                        {avg > 0 ? avg.toFixed(1) : '—'}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Score Breakdown */}
          <div className="dash-panel">
            <h2>📊 Score Breakdown</h2>
            {turns === 0 ? (
              <p className="dash-panel-muted">No data yet. Start a roleplay session to track scores.</p>
            ) : (
              <>
                <div className="dash-skill-list">
                  <div className="dash-skill-item">
                    <span className="dash-skill-name">Control</span>
                    <div className="dash-skill-bar-track">
                      <div className="dash-skill-bar-fill" style={{ width: `${Math.min(avgControl * 10, 100)}%`, background: 'var(--color-accent)' }} />
                    </div>
                    <span className={`dash-skill-value ${scoreClass(avgControl)}`}>{avgControl.toFixed(1)}</span>
                  </div>
                  <div className="dash-skill-item">
                    <span className="dash-skill-name">Depth</span>
                    <div className="dash-skill-bar-track">
                      <div className="dash-skill-bar-fill" style={{ width: `${Math.min(avgDepth * 10, 100)}%`, background: 'var(--color-success)' }} />
                    </div>
                    <span className={`dash-skill-value ${scoreClass(avgDepth)}`}>{avgDepth.toFixed(1)}</span>
                  </div>
                  <div className="dash-skill-item">
                    <span className="dash-skill-name">Conversion</span>
                    <div className="dash-skill-bar-track">
                      <div className="dash-skill-bar-fill" style={{ width: `${Math.min(avgConversion * 10, 100)}%`, background: 'var(--color-warning)' }} />
                    </div>
                    <span className={`dash-skill-value ${scoreClass(avgConversion)}`}>{avgConversion.toFixed(1)}</span>
                  </div>
                </div>
                <div className="dash-quick-start" style={{ marginTop: '1rem' }}>
                  <Link href="/roleplay" className="btn-secondary btn-sm">
                    View Full Session Intel →
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Quick Start */}
        <div className="dash-quick-start">
          <Link href="/roleplay" className="btn-primary btn-lg">
            🎯 {turns === 0 ? 'Start Your First Drill' : 'Run Another Session'}
          </Link>
          <Link href="/store" className="btn-secondary btn-lg" style={{ marginTop: '0.5rem' }}>
            🛍️ Browse Member Store
          </Link>
          <p style={{ color: 'var(--color-muted)', fontSize: '0.78rem', marginTop: '0.5rem' }}>
            {turns === 0
              ? 'One session turns this dashboard into a real coaching tool. Takes 3 minutes.'
              : `${drillsToday} drill${drillsToday === 1 ? '' : 's'} today. Top reps run at least 3.`}
          </p>
        </div>

        {/* System Health */}
        <div className="dash-panel dash-system-health">
          <h2>⚙️ System Health</h2>
          {statusError ? (
            <p className="dash-panel-muted">Unable to reach system status.</p>
          ) : !systemStatus ? (
            <p className="dash-panel-muted">Loading…</p>
          ) : (
            <>
              <div className="dash-health-summary">
                <span className="dash-health-env">{systemStatus.environment}</span>
                <span className="dash-health-ts">
                  {new Date(systemStatus.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <div className="dash-health-checks">
                {systemStatus.checks.map((c) => (
                  <div className="dash-health-row" key={c.id}>
                    <span
                      className="dash-health-dot"
                      data-state={c.state}
                      title={c.detail}
                    />
                    <span className="dash-health-label">{c.label}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}

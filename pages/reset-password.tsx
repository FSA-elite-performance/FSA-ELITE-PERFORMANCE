/**
 * /reset-password
 *
 * Handles Firebase password-reset action codes. Firebase emails a link to this page
 * when the Firebase Console → Authentication → Email Templates → "Action URL" is
 * configured to https://fsaeliteperformance.com/reset-password
 *
 * Query params: mode=resetPassword&oobCode=<code>&apiKey=<key>
 */
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  confirmPasswordReset,
  verifyPasswordResetCode,
} from 'firebase/auth';
import { getClientAuth } from '../lib/firebaseClient';
import { PUBLIC_BUSINESS_NAME } from '../lib/businessDetails';

const PASSWORD_MIN_LENGTH = 8;

type Stage = 'verifying' | 'form' | 'success' | 'error';

export default function ResetPassword() {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>('verifying');
  const [resetEmail, setResetEmail] = useState('');
  const [oobCode, setOobCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!router.isReady) return;

    const code = typeof router.query.oobCode === 'string' ? router.query.oobCode : '';
    const mode = typeof router.query.mode === 'string' ? router.query.mode : '';

    if (!code || mode !== 'resetPassword') {
      setStage('error');
      return;
    }

    setOobCode(code);

    verifyPasswordResetCode(getClientAuth(), code)
      .then((email) => {
        setResetEmail(email);
        setStage('form');
      })
      .catch(() => setStage('error'));
  }, [router.isReady, router.query]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;

    setError('');

    if (password.length < PASSWORD_MIN_LENGTH) {
      setError(`Password must be at least ${PASSWORD_MIN_LENGTH} characters.`);
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      await confirmPasswordReset(getClientAuth(), oobCode, password);
      setStage('success');
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? '';
      if (code === 'auth/expired-action-code' || code === 'auth/invalid-action-code') {
        setError('This reset link has expired or already been used. Request a new one.');
      } else if (code === 'auth/weak-password') {
        setError('Password is too weak. Use at least 8 characters.');
      } else {
        setError('Could not reset password. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Reset Password | FSA Elite Performance</title>
        <meta name="robots" content="noindex" />
      </Head>

      <main className="auth-page">
        <div className="auth-card">
          <div className="auth-brand">
            <img src="/logo.png" alt="FSA Elite Performance" className="auth-logo" />
            <div>
              <strong className="auth-brand-name">{PUBLIC_BUSINESS_NAME}</strong>
              <span className="auth-brand-sub">fsaeliteperformance.com</span>
            </div>
          </div>

          {stage === 'verifying' && (
            <p className="auth-subtitle">Verifying your reset link…</p>
          )}

          {stage === 'error' && (
            <div className="auth-success-block">
              <span className="auth-error-icon" aria-hidden="true">✕</span>
              <h1 className="auth-title">Link invalid or expired</h1>
              <p className="auth-subtitle">
                This password reset link is no longer valid. Request a fresh one.
              </p>
              <Link href="/forgot-password" className="auth-submit btn-primary auth-submit-link">
                Request New Link
              </Link>
            </div>
          )}

          {stage === 'form' && (
            <>
              <h1 className="auth-title">Set a new password</h1>
              {resetEmail && (
                <p className="auth-subtitle">
                  Resetting password for <strong>{resetEmail}</strong>
                </p>
              )}

              <form className="auth-form" onSubmit={handleSubmit} noValidate>
                <div className="auth-field">
                  <label htmlFor="auth-password" className="auth-label">
                    New password <span className="auth-optional">(min. 8 characters)</span>
                  </label>
                  <input
                    id="auth-password"
                    type="password"
                    className="auth-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    placeholder="••••••••"
                    required
                    disabled={loading}
                  />
                </div>

                <div className="auth-field">
                  <label htmlFor="auth-confirm" className="auth-label">Confirm new password</label>
                  <input
                    id="auth-confirm"
                    type="password"
                    className="auth-input"
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    autoComplete="new-password"
                    placeholder="••••••••"
                    required
                    disabled={loading}
                  />
                </div>

                {error && <p className="auth-error" role="alert">{error}</p>}

                <button
                  type="submit"
                  className="auth-submit btn-primary"
                  disabled={loading || !password || !confirm}
                >
                  {loading ? 'Saving…' : 'Set New Password'}
                </button>
              </form>
            </>
          )}

          {stage === 'success' && (
            <div className="auth-success-block">
              <span className="auth-success-icon" aria-hidden="true">✓</span>
              <h1 className="auth-title">Password updated</h1>
              <p className="auth-subtitle">
                Your password has been changed. Sign in with your new password.
              </p>
              <Link href="/login" className="auth-submit btn-primary auth-submit-link">
                Sign In
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

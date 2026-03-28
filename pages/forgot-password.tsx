import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { getClientAuth } from '../lib/firebaseClient';
import { PUBLIC_BUSINESS_NAME, SUPPORT_EMAIL } from '../lib/businessDetails';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading || !email.trim()) return;

    setError('');
    setLoading(true);

    try {
      const auth = getClientAuth();
      await sendPasswordResetEmail(auth, email.trim());
      setSent(true);
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? '';
      if (code === 'auth/user-not-found' || code === 'auth/invalid-email') {
        // Don't reveal whether the email exists — still show success.
        setSent(true);
      } else if (code === 'auth/too-many-requests') {
        setError('Too many reset attempts. Please wait before trying again.');
      } else {
        setError('Could not send reset email. Check your connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Reset Password | FSA ELITE Performance</title>
        <meta name="robots" content="noindex" />
      </Head>

      <main className="auth-page">
        <div className="auth-card">
          <div className="auth-brand">
            <img src="/logo.png" alt="FSA ELITE" className="auth-logo" />
            <div>
              <strong className="auth-brand-name">FSA ELITE</strong>
              <span className="auth-brand-sub">{PUBLIC_BUSINESS_NAME}</span>
            </div>
          </div>

          {sent ? (
            <div className="auth-success-block">
              <span className="auth-success-icon" aria-hidden="true">✓</span>
              <h1 className="auth-title">Check your email</h1>
              <p className="auth-subtitle">
                If an account exists for <strong>{email}</strong>, a password reset link
                has been sent. Check your inbox and spam folder.
              </p>
              <p className="auth-subtitle auth-subtitle-sm">
                Didn&apos;t get it? Contact{' '}
                <a href={`mailto:${SUPPORT_EMAIL}`} className="auth-link">
                  {SUPPORT_EMAIL}
                </a>
              </p>
              <Link href="/login" className="auth-submit btn-primary auth-submit-link">
                Back to Sign In
              </Link>
            </div>
          ) : (
            <>
              <h1 className="auth-title">Forgot your password?</h1>
              <p className="auth-subtitle">
                Enter your account email and we&apos;ll send a reset link right away.
              </p>

              <form className="auth-form" onSubmit={handleSubmit} noValidate>
                <div className="auth-field">
                  <label htmlFor="auth-email" className="auth-label">Email address</label>
                  <input
                    id="auth-email"
                    type="email"
                    className="auth-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    placeholder="you@example.com"
                    required
                    disabled={loading}
                  />
                </div>

                {error && <p className="auth-error" role="alert">{error}</p>}

                <button
                  type="submit"
                  className="auth-submit btn-primary"
                  disabled={loading || !email}
                >
                  {loading ? 'Sending…' : 'Send Reset Link'}
                </button>
              </form>

              <p className="auth-footer-text">
                Remember it?{' '}
                <Link href="/login" className="auth-link">Sign in</Link>
              </p>
            </>
          )}
        </div>
      </main>
    </>
  );
}

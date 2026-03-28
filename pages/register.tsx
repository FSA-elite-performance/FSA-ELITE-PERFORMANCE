import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from 'firebase/auth';
import { getClientAuth } from '../lib/firebaseClient';

const PASSWORD_MIN_LENGTH = 8;

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      const auth = getClientAuth();
      const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);

      // Set display name and send email verification simultaneously.
      await Promise.all([
        updateProfile(credential.user, { displayName: name.trim() || email.trim() }),
        sendEmailVerification(credential.user),
      ]);

      const idToken = await credential.user.getIdToken();

      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });

      const data = (await res.json()) as { ok: boolean; error?: string };

      if (!res.ok || !data.ok) {
        setError(data.error ?? 'Account created but sign-in failed. Try logging in.');
        return;
      }

      // New users go to checkout to activate membership.
      await router.replace('/checkout-preview');
    } catch (err: unknown) {
      const code = (err as { code?: string }).code ?? '';
      if (code === 'auth/email-already-in-use') {
        setError('That email already has an account. Sign in instead.');
      } else if (code === 'auth/invalid-email') {
        setError('Please enter a valid email address.');
      } else if (code === 'auth/weak-password') {
        setError('Password is too weak. Use at least 8 characters.');
      } else {
        setError('Could not create account. Check your connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head>
        <title>Create Account | FSA ELITE Performance</title>
        <meta name="robots" content="noindex" />
      </Head>

      <main className="auth-page">
        <div className="auth-card">
          <div className="auth-brand">
            <img src="/logo.png" alt="FSA Elite Performance" className="auth-logo" />
            <div>
              <strong className="auth-brand-name">FSA Elite Performance</strong>
              <span className="auth-brand-sub">fsaeliteperformance.com</span>
            </div>
          </div>

          <h1 className="auth-title">Create your account</h1>
          <p className="auth-subtitle">
            Free to join. One-time $12.99 unlocks the full training platform.
          </p>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="auth-field">
              <label htmlFor="auth-name" className="auth-label">
                Full name <span className="auth-optional">(optional)</span>
              </label>
              <input
                id="auth-name"
                type="text"
                className="auth-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                placeholder="Your name"
                disabled={loading}
              />
            </div>

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

            <div className="auth-field">
              <label htmlFor="auth-password" className="auth-label">
                Password <span className="auth-optional">(min. 8 characters)</span>
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
              <label htmlFor="auth-confirm" className="auth-label">Confirm password</label>
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
              disabled={loading || !email || !password || !confirm}
            >
              {loading ? 'Creating account…' : 'Create Account'}
            </button>
          </form>

          <p className="auth-legal-note">
            By creating an account you agree to FSA ELITE&apos;s{' '}
            <Link href="/terms" className="auth-link">Terms</Link>
            {' '}and{' '}
            <Link href="/privacy-policy" className="auth-link">Privacy Policy</Link>.
          </p>

          <p className="auth-footer-text">
            Already have an account?{' '}
            <Link href="/login" className="auth-link">Sign in</Link>
          </p>
        </div>
      </main>
    </>
  );
}

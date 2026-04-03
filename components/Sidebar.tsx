 import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const NAV_ITEMS = [
  { href: '/welcome', label: 'Dashboard', icon: '🏁' },
  { href: '/roleplay', label: 'Roleplay Lab', icon: '🎯' },
  { href: '/olive', label: 'OLIVE', icon: '🤖' },
  { href: '/store', label: 'Member Store', icon: '🛍️' },
];

export default function Sidebar({ open, onClose }: SidebarProps) {
  const router = useRouter();
  const pathname = router.pathname;
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    fetch('/api/auth/session', { credentials: 'same-origin' })
      .then((response) => response.json())
      .then((sessionData: { active?: boolean; email?: string }) => {
        setSessionEmail(sessionData.active && sessionData.email ? sessionData.email : null);
      })
      .catch(() => setSessionEmail(null));
  }, []);

  const handleLogout = useCallback(async () => {
    if (loggingOut) return;
    setLoggingOut(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'same-origin' });
    } finally {
      setLoggingOut(false);
      onClose();
      await router.push('/login');
    }
  }, [loggingOut, router, onClose]);

  return (
    <>
      <div
        className={`app-sidebar-overlay ${open ? 'app-sidebar-overlay-visible' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside className={`app-sidebar ${open ? 'app-sidebar-open' : ''}`}>
        <Link href="/" className="app-sidebar-brand" onClick={onClose}>
          <img src="/logo.jpg" alt="FSA ELITE" className="app-sidebar-logo" />
          <span className="app-sidebar-title">
            FSA ELITE
            <span className="app-sidebar-subtitle">Training + Identity</span>
          </span>
        </Link>

        <nav className="app-sidebar-nav">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`app-sidebar-link ${active ? 'app-sidebar-link-active' : ''}`}
                aria-current={active ? 'page' : undefined}
                onClick={onClose}
              >
                <span className="app-sidebar-icon" aria-hidden="true">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}

          <div className="app-sidebar-divider" />

          <Link
            href="/legal"
            className={`app-sidebar-link ${pathname === '/legal' ? 'app-sidebar-link-active' : ''}`}
            onClick={onClose}
          >
            <span className="app-sidebar-icon" aria-hidden="true">📄</span>
            Legal
          </Link>
        </nav>

        <div className="app-sidebar-footer">
          {sessionEmail && (
            <div className="app-sidebar-account">
              <span className="app-sidebar-account-email" title={sessionEmail}>
                {sessionEmail}
              </span>
              <button
                type="button"
                className="app-sidebar-logout"
                onClick={handleLogout}
                disabled={loggingOut}
              >
                {loggingOut ? 'Signing out…' : 'Sign Out'}
              </button>
            </div>
          )}
          <ThemeToggle />
        </div>
      </aside>
    </>
  );
}

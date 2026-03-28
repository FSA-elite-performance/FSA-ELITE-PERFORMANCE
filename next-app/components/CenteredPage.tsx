import { ReactNode } from 'react';

interface CenteredPageProps {
  children: ReactNode;
}

/**
 * Full-viewport centered layout used by simple status pages (e.g. success, cancel).
 */
export default function CenteredPage({ children }: CenteredPageProps) {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2rem 1.5rem',
        background: 'var(--color-bg)',
      }}
    >
      {children}
    </main>
  );
}

import Link from 'next/link';
import { useRouter } from 'next/router';

export default function TopNav() {
  const { pathname } = useRouter();

  return (
    <nav className="top-nav">
      <div className="top-nav__inner container">
        <span className="top-nav__brand">FSA Elite Performance</span>
        <ul className="top-nav__links">
          <li>
            <Link
              href="/"
              className={`top-nav__link${pathname === '/' ? ' top-nav__link--active' : ''}`}
            >
              Training
            </Link>
          </li>
          <li>
            <Link
              href="/store"
              className={`top-nav__link${pathname === '/store' ? ' top-nav__link--active' : ''}`}
            >
              Store{' '}
              <span className="top-nav__badge">Coming Soon</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

import { useState, useCallback, type ReactNode } from 'react';
import Sidebar from './Sidebar';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((prev) => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  return (
    <div className="app-layout">
      <button
        type="button"
        className="app-sidebar-toggle"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        ☰
      </button>
      <Sidebar open={sidebarOpen} onClose={closeSidebar} />
      <div className="app-content">
        {children}
      </div>
    </div>
  );
}

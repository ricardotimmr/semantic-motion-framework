import type { ReactNode } from 'react';
import type { PageId, PageProps } from '../pages/pageTypes';

type NavItem = {
  id: PageId;
  label: string;
};

type AppNavigationProps = PageProps & {
  children: ReactNode;
};

const navItems: NavItem[] = [
  { id: 'startseite', label: 'Startseite' },
  { id: 'editor', label: 'Editor' },
  { id: 'frameworkKarte', label: 'Framework-Karte' },
  { id: 'ueberDasProjekt', label: 'Über das Projekt' },
];

function AppNavigation({
  children,
  currentPage,
  onNavigate,
}: AppNavigationProps) {
  return (
    <div className="app-page">
      <header className="top-tabs" aria-label="Hauptnavigation">
        {navItems.map((item) => (
          <button
            className={currentPage === item.id ? 'tab-item active' : 'tab-item'}
            key={item.id}
            onClick={() => onNavigate(item.id)}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </header>

      <div className="app-shell">
        <aside className="sidebar" aria-label="Projektbereich">
          <div className="wordmark">
            <div className="wordmark-title">
              S<span>M</span>F
            </div>
            <div className="wordmark-subtitle">
              Semantic Motion
              <br />
              Framework
            </div>
          </div>

          <nav className="side-nav" aria-label="Seiten">
            <div className="side-nav-label">Seiten</div>
            {navItems.map((item) => (
              <button
                className={
                  currentPage === item.id ? 'side-link active' : 'side-link'
                }
                key={item.id}
                onClick={() => onNavigate(item.id)}
                type="button"
              >
                {currentPage === item.id ? (
                  <span className="active-dot" />
                ) : null}
                {item.label}
              </button>
            ))}
          </nav>

          <div className="sidebar-meta">
            <div className="side-nav-label">Abschlussarbeit</div>
            <span>TH Köln · 2026</span>
            <span>Ricardo Timmr</span>
          </div>
        </aside>

        {children}
      </div>
    </div>
  );
}

export default AppNavigation;

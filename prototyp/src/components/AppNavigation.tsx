import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
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
  const topRefs = useRef<Partial<Record<PageId, HTMLButtonElement | null>>>({});
  const sideRefs = useRef<Partial<Record<PageId, HTMLButtonElement | null>>>(
    {},
  );
  const [topIndicator, setTopIndicator] = useState({ left: 0, width: 0 });
  const [sideIndicatorTop, setSideIndicatorTop] = useState(0);

  useLayoutEffect(() => {
    const updateIndicators = () => {
      const topButton = topRefs.current[currentPage];
      const sideButton = sideRefs.current[currentPage];

      if (topButton) {
        setTopIndicator({
          left: topButton.offsetLeft,
          width: topButton.offsetWidth,
        });
      }

      if (sideButton) {
        setSideIndicatorTop(
          sideButton.offsetTop + sideButton.offsetHeight / 2 - 2.5,
        );
      }
    };

    updateIndicators();
    window.addEventListener('resize', updateIndicators);

    return () => window.removeEventListener('resize', updateIndicators);
  }, [currentPage]);

  return (
    <div className="app-page">
      <header className="top-tabs" aria-label="Hauptnavigation">
        {navItems.map((item) => (
          <button
            className={currentPage === item.id ? 'tab-item active' : 'tab-item'}
            key={item.id}
            onClick={() => onNavigate(item.id)}
            ref={(node) => {
              topRefs.current[item.id] = node;
            }}
            type="button"
          >
            {item.label}
          </button>
        ))}
        <span
          aria-hidden="true"
          className="top-tab-indicator"
          style={{
            transform: `translateX(${topIndicator.left}px)`,
            width: topIndicator.width,
          }}
        />
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
            <span
              aria-hidden="true"
              className="side-active-indicator"
              style={{ transform: `translateY(${sideIndicatorTop}px)` }}
            />
            {navItems.map((item) => (
              <button
                className={
                  currentPage === item.id ? 'side-link active' : 'side-link'
                }
                key={item.id}
                onClick={() => onNavigate(item.id)}
                ref={(node) => {
                  sideRefs.current[item.id] = node;
                }}
                type="button"
              >
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

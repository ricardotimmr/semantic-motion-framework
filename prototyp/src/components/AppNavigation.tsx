import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
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

const navigationTransitionMs = 320;

function AppNavigation({
  children,
  currentPage,
  onNavigate,
}: AppNavigationProps) {
  const topRefs = useRef<Partial<Record<PageId, HTMLButtonElement | null>>>({});
  const sideRefs = useRef<Partial<Record<PageId, HTMLButtonElement | null>>>(
    {},
  );
  const previousPageRef = useRef<PageId>(currentPage);
  const [topIndicator, setTopIndicator] = useState({ left: 0, width: 0 });
  const [sideIndicatorTop, setSideIndicatorTop] = useState(0);
  const [passingPageIds, setPassingPageIds] = useState<PageId[]>([]);

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

  useEffect(() => {
    const previousPage = previousPageRef.current;
    const previousIndex = navItems.findIndex(
      (item) => item.id === previousPage,
    );
    const currentIndex = navItems.findIndex((item) => item.id === currentPage);

    previousPageRef.current = currentPage;

    if (
      previousIndex === -1 ||
      currentIndex === -1 ||
      previousIndex === currentIndex
    ) {
      setPassingPageIds([]);
      return undefined;
    }

    const start = Math.min(previousIndex, currentIndex);
    const end = Math.max(previousIndex, currentIndex);
    const pathIds = navItems.slice(start, end + 1).map((item) => item.id);

    setPassingPageIds(pathIds);

    const distance = Math.abs(currentIndex - previousIndex);
    const timeouts = pathIds.map((id) => {
      const pageIndex = navItems.findIndex((item) => item.id === id);
      const step = Math.abs(pageIndex - previousIndex);
      const releaseProgress = Math.min(1, (step + 0.45) / distance);
      const releaseDelay =
        step === 0
          ? 70
          : Math.round(releaseProgress * navigationTransitionMs);

      return window.setTimeout(() => {
        setPassingPageIds((activeIds) =>
          activeIds.filter((activeId) => activeId !== id),
        );
      }, releaseDelay);
    });

    return () => {
      timeouts.forEach((timeout) => window.clearTimeout(timeout));
    };
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
              <span>S</span>emantic
              <br />
              <span>M</span>otion
              <br />
              <span>F</span>ramework
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
                className={[
                  'side-link',
                  currentPage === item.id ? 'active' : '',
                  passingPageIds.includes(item.id) ? 'passing' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
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

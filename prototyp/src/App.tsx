import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import './App.css';
import AppNavigation from './components/AppNavigation';
import PageTransition from './components/PageTransition';
import type { PageTransitionDirection } from './components/PageTransition';
import Editor, {
  defaultEditorSelection,
  type EditorSelection,
} from './pages/Editor';
import FrameworkKarte from './pages/FrameworkKarte';
import Startseite from './pages/Startseite';
import UeberDasProjekt from './pages/UeberDasProjekt';
import { getPageFromPath, getPagePath, pageOrder } from './pages/pageTypes';
import type { PageId } from './pages/pageTypes';

function getTransitionDirection(
  currentPage: PageId,
  nextPage: PageId,
): PageTransitionDirection {
  const currentIndex = pageOrder.indexOf(currentPage);
  const nextIndex = pageOrder.indexOf(nextPage);

  if (nextIndex === currentIndex) {
    return 0;
  }

  return nextIndex > currentIndex ? 1 : -1;
}

function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(() =>
    getPageFromPath(window.location.pathname),
  );
  const [editorSelection, setEditorSelection] = useState<EditorSelection>(
    defaultEditorSelection,
  );
  const [showSemanticContext, setShowSemanticContext] = useState(false);
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);
  const [frozenTransitionPage, setFrozenTransitionPage] =
    useState<PageId | null>(null);
  const [pageTransitionPlaceholderHeight, setPageTransitionPlaceholderHeight] =
    useState(0);
  const [pageTransitionScrollOffset, setPageTransitionScrollOffset] =
    useState(0);
  const [transitionDirection, setTransitionDirection] =
    useState<PageTransitionDirection>(0);

  useEffect(() => {
    if (!('scrollRestoration' in window.history)) {
      return undefined;
    }

    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useEffect(() => {
    const currentPath = getPagePath(currentPage);

    if (window.location.pathname !== currentPath) {
      window.history.replaceState({}, '', currentPath);
    }
  }, []);

  const startPageTransition = (
    nextPage: PageId,
    updateHistory?: () => void,
  ) => {
    if (nextPage === currentPage || isPageTransitioning) {
      return;
    }

    const nextDirection = getTransitionDirection(currentPage, nextPage);
    const scrollOffset = window.scrollY;
    const placeholderHeight = document.documentElement.scrollHeight;

    flushSync(() => {
      setIsPageTransitioning(true);
      setFrozenTransitionPage(currentPage);
      setPageTransitionScrollOffset(scrollOffset);
      setPageTransitionPlaceholderHeight(placeholderHeight);
    });

    updateHistory?.();

    window.requestAnimationFrame(() => {
      setTransitionDirection(nextDirection);
      setCurrentPage(nextPage);
    });
  };

  useEffect(() => {
    const handlePopState = () => {
      const nextPage = getPageFromPath(window.location.pathname);

      startPageTransition(nextPage);
    };

    window.addEventListener('popstate', handlePopState);

    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentPage, isPageTransitioning]);

  const navigateToPage = (nextPage: PageId) => {
    startPageTransition(nextPage, () => {
      window.history.pushState({}, '', getPagePath(nextPage));
    });
  };

  const completePageTransition = () => {
    if (!isPageTransitioning) {
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    flushSync(() => {
      setIsPageTransitioning(false);
      setFrozenTransitionPage(null);
      setPageTransitionPlaceholderHeight(0);
      setPageTransitionScrollOffset(0);
    });
  };

  const openMappingInEditor = (selection: EditorSelection) => {
    setEditorSelection(selection);
    navigateToPage('editor');
  };

  let pageContent = <Startseite onNavigate={navigateToPage} />;

  if (currentPage === 'editor') {
    pageContent = (
      <Editor
        onSelectionChange={setEditorSelection}
        selection={editorSelection}
        showSemanticContext={showSemanticContext}
      />
    );
  }

  if (currentPage === 'frameworkKarte') {
    pageContent = <FrameworkKarte onOpenInEditor={openMappingInEditor} />;
  }

  if (currentPage === 'ueberDasProjekt') {
    pageContent = <UeberDasProjekt />;
  }

  return (
    <AppNavigation
      currentPage={currentPage}
      onNavigate={navigateToPage}
      onSemanticContextToggle={setShowSemanticContext}
      showSemanticContext={showSemanticContext}
    >
      <PageTransition
        direction={transitionDirection}
        frozenPage={frozenTransitionPage}
        isFixedTransitioning={isPageTransitioning}
        onTransitionComplete={completePageTransition}
        pageKey={currentPage}
        placeholderHeight={pageTransitionPlaceholderHeight}
        scrollOffset={pageTransitionScrollOffset}
      >
        {pageContent}
      </PageTransition>
    </AppNavigation>
  );
}

export default App;

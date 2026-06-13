import { useEffect, useState } from 'react';
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
  const [transitionDirection, setTransitionDirection] =
    useState<PageTransitionDirection>(0);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [currentPage]);

  useEffect(() => {
    const currentPath = getPagePath(currentPage);

    if (window.location.pathname !== currentPath) {
      window.history.replaceState({}, '', currentPath);
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const nextPage = getPageFromPath(window.location.pathname);

      if (nextPage === currentPage) {
        return;
      }

      setTransitionDirection(getTransitionDirection(currentPage, nextPage));
      setCurrentPage(nextPage);
    };

    window.addEventListener('popstate', handlePopState);

    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentPage]);

  const navigateToPage = (nextPage: PageId) => {
    if (nextPage === currentPage) {
      return;
    }

    window.history.pushState({}, '', getPagePath(nextPage));
    setTransitionDirection(getTransitionDirection(currentPage, nextPage));
    setCurrentPage(nextPage);
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
      <PageTransition direction={transitionDirection} pageKey={currentPage}>
        {pageContent}
      </PageTransition>
    </AppNavigation>
  );
}

export default App;

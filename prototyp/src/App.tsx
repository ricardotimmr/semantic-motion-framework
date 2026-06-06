import { useState } from 'react';
import './App.css';
import AppNavigation from './components/AppNavigation';
import PageTransition from './components/PageTransition';
import type { PageTransitionDirection } from './components/PageTransition';
import Editor from './pages/Editor';
import FrameworkKarte from './pages/FrameworkKarte';
import Startseite from './pages/Startseite';
import UeberDasProjekt from './pages/UeberDasProjekt';
import { pageOrder } from './pages/pageTypes';
import type { PageId } from './pages/pageTypes';

function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('startseite');
  const [transitionDirection, setTransitionDirection] =
    useState<PageTransitionDirection>(0);

  const navigateToPage = (nextPage: PageId) => {
    if (nextPage === currentPage) {
      return;
    }

    const currentIndex = pageOrder.indexOf(currentPage);
    const nextIndex = pageOrder.indexOf(nextPage);

    setTransitionDirection(nextIndex > currentIndex ? 1 : -1);
    setCurrentPage(nextPage);
  };

  let pageContent = <Startseite onNavigate={navigateToPage} />;

  if (currentPage === 'editor') {
    pageContent = <Editor />;
  }

  if (currentPage === 'frameworkKarte') {
    pageContent = <FrameworkKarte />;
  }

  if (currentPage === 'ueberDasProjekt') {
    pageContent = <UeberDasProjekt />;
  }

  return (
    <AppNavigation currentPage={currentPage} onNavigate={navigateToPage}>
      <PageTransition direction={transitionDirection} pageKey={currentPage}>
        {pageContent}
      </PageTransition>
    </AppNavigation>
  );
}

export default App;

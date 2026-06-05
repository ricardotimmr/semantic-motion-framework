import { useState } from 'react';
import './App.css';
import AppNavigation from './components/AppNavigation';
import Editor from './pages/Editor';
import FrameworkKarte from './pages/FrameworkKarte';
import Startseite from './pages/Startseite';
import UeberDasProjekt from './pages/UeberDasProjekt';
import type { PageId } from './pages/pageTypes';

function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('startseite');

  let pageContent = <Startseite onNavigate={setCurrentPage} />;

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
    <AppNavigation currentPage={currentPage} onNavigate={setCurrentPage}>
      {pageContent}
    </AppNavigation>
  );
}

export default App;

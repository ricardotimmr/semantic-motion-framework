import { useState } from 'react';
import './App.css';
import Editor from './pages/Editor';
import FrameworkKarte from './pages/FrameworkKarte';
import Startseite from './pages/Startseite';
import UeberDasProjekt from './pages/UeberDasProjekt';
import type { PageId } from './pages/pageTypes';

function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('startseite');
  const pageProps = {
    currentPage,
    onNavigate: setCurrentPage,
  };

  if (currentPage === 'editor') {
    return <Editor {...pageProps} />;
  }

  if (currentPage === 'frameworkKarte') {
    return <FrameworkKarte {...pageProps} />;
  }

  if (currentPage === 'ueberDasProjekt') {
    return <UeberDasProjekt {...pageProps} />;
  }

  return <Startseite {...pageProps} />;
}

export default App;

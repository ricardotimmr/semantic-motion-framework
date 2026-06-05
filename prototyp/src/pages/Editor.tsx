import AppNavigation from '../components/AppNavigation';
import type { PageProps } from './pageTypes';

function Editor({ currentPage, onNavigate }: PageProps) {
  return (
    <AppNavigation currentPage={currentPage} onNavigate={onNavigate}>
      <main className="main-content empty-page" />
    </AppNavigation>
  );
}

export default Editor;

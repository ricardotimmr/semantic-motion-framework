export const pageOrder = [
  'startseite',
  'editor',
  'frameworkKarte',
  'ueberDasProjekt',
] as const;

export type PageId = (typeof pageOrder)[number];

export const pagePaths: Record<PageId, string> = {
  startseite: '/',
  editor: '/editor',
  frameworkKarte: '/framework-karte',
  ueberDasProjekt: '/ueber-das-projekt',
};

export function getPagePath(page: PageId) {
  return pagePaths[page];
}

export function getPageFromPath(pathname: string): PageId {
  const normalizedPath = pathname.replace(/\/+$/, '') || '/';
  const matchingPage = pageOrder.find(
    (page) => pagePaths[page] === normalizedPath,
  );

  return matchingPage ?? 'startseite';
}

export type PageProps = {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
};

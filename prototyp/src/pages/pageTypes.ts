export const pageOrder = [
  'startseite',
  'editor',
  'frameworkKarte',
  'ueberDasProjekt',
] as const;

export type PageId = (typeof pageOrder)[number];

export type PageProps = {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
};

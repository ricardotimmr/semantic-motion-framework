export type PageId =
  | 'startseite'
  | 'editor'
  | 'frameworkKarte'
  | 'ueberDasProjekt';

export type PageProps = {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
};

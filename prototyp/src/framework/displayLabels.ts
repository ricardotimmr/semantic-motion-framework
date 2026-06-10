import type {
  ComponentId,
  Dimension,
  SignType,
  Subcategory,
} from './types';

export const componentLabels: Record<ComponentId, string> = {
  button: 'Button',
  toggle: 'Toggle',
  toast: 'Toast',
  modal: 'Modal',
  input: 'Input',
  skeleton: 'Skeleton',
};

export const dimensionLabels: Record<Dimension, string> = {
  feedback: 'Feedback',
  stateChange: 'Zustandswechsel',
  direction: 'Richtung',
  hierarchy: 'Hierarchie',
  attention: 'Aufmerksamkeit',
};

export const dimensionDescriptions: Record<Dimension, string> = {
  feedback: 'Reaktion auf eine abgeschlossene Nutzeraktion',
  stateChange: 'Übergang zwischen gleichwertigen Zuständen',
  direction: 'Navigation mit räumlicher Vorwärts- oder Rückwärtslogik',
  hierarchy: 'Elemente treten in den Vordergrund oder verlieren Priorität',
  attention: 'Systeminitiiertes Signal ohne direkte Nutzeraktion',
};

export const subcategoryLabels: Record<Subcategory, string> = {
  success: 'Erfolg',
  error: 'Fehler',
  warning: 'Warnung',
  toggleOn: 'An',
  toggleOff: 'Aus',
  focus: 'Fokus',
  blur: 'Blur',
  enter: 'Enter',
  exit: 'Exit',
  backEnter: 'Back Enter',
  backExit: 'Back Exit',
  toForeground: 'Vordergrund',
  toBackground: 'Hintergrund',
  oneShot: 'Einmalig',
  persistent: 'Persistent',
  requiredField: 'Pflichtfeld',
  loading: 'Loading',
  resolved: 'Resolved',
};

export const signTypeLabels: Record<SignType, string> = {
  icon: 'Ikon',
  index: 'Index',
  symbol: 'Symbol',
  'icon/index': 'Ikon/Index',
};

export function getSignClass(signType: SignType) {
  if (signType === 'symbol') {
    return 'symbol';
  }

  if (signType === 'icon') {
    return 'icon';
  }

  return 'index';
}

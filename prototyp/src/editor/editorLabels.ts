import type {
  ComponentId,
  Dimension,
  MappingEntry,
  SignType,
  Subcategory,
} from '../framework/types';

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

function formatEasing(entry: MappingEntry) {
  const { easing } = entry.params;

  if ('preset' in easing) {
    return easing.preset;
  }

  return 'cubic-bezier';
}

function formatMovement(entry: MappingEntry) {
  const { params } = entry;

  if (entry.id === 'input-feedback-warning') {
    return 'Helper-Text y + Opacity-Pulse';
  }

  if (params.motionPhases) {
    return `${params.motionPhases.length} Phasen`;
  }

  if (params.scaleMode) {
    return params.scaleMode;
  }

  if (params.translatePx !== undefined) {
    return `${params.direction ?? 'x'} ${params.translatePx}px`;
  }

  if (params.translateDistance) {
    return `${params.direction ?? 'x'} ${params.translateFrom ?? params.translateTo ?? params.translateDistance}`;
  }

  if (params.trackFactor !== undefined) {
    return `Track ${params.trackFactor}`;
  }

  if (params.opacity || params.opacityKeyframes) {
    return 'Opacity';
  }

  return 'Renderer-Regel';
}

function formatIterations(entry: MappingEntry) {
  const { iterations } = entry.params;

  if (!iterations || iterations === 1) {
    return '1';
  }

  if (iterations === Infinity) {
    return 'Endlos';
  }

  return String(iterations);
}

export function getEditorParameterRows(entry: MappingEntry) {
  return [
    ['Easing', formatEasing(entry)],
    ['Dauer', `${entry.params.duration}ms`],
    ['Bewegung', formatMovement(entry)],
    ['Wiederholungen', formatIterations(entry)],
  ];
}

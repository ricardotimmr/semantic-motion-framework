import type { MappingEntry } from '../framework/types';

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

  if (
    entry.id === 'input-stateChange-focus' ||
    entry.id === 'input-stateChange-blur'
  ) {
    return 'Container + Border + Label';
  }

  if (params.motionPhases) {
    return params.motionPhases.map((phase) => phase.id).join(' + ');
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

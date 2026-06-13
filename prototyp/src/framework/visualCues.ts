import { VISUAL_CUE_IDS } from './types';
import type { VisualCueId } from './types';

export interface VisualCuePlaceholder {
  lucideIcon: string;
  note: string;
}

/**
 * Vorläufige Icon-Zuordnung für die semantischen Visual Cues.
 * Diese Datei koppelt die Mapping-Daten nicht an Lucide. Die Strings sind nur
 * Platzhalter, bis eigene Glyphs oder konkrete Icon-Komponenten eingeführt
 * werden.
 */
export const lucidePlaceholderByVisualCueId = {
  refusalGesture: {
    lucideIcon: 'Ban',
    note: 'Platzhalter für Ablehnung. Später wahrscheinlich durch eigenes Gesture-Glyph ersetzen.',
  },
  pulseSignal: {
    lucideIcon: 'Activity',
    note: 'Platzhalter für kurzen Bedeutungsimpuls oder wiederholtes Sich-Bemerkbar-Machen.',
  },
  toggleTravel: {
    lucideIcon: 'ToggleRight',
    note: 'Platzhalter für den physisch lesbaren Wechsel zwischen Toggle-Zuständen.',
  },
  arrival: {
    lucideIcon: 'LogIn',
    note: 'Platzhalter für gerichtetes Eintreten oder Ankommen eines UI-Elements.',
  },
  departure: {
    lucideIcon: 'LogOut',
    note: 'Platzhalter für gerichtetes Verlassen oder Ausfahren eines UI-Elements.',
  },
  nudgeSignal: {
    lucideIcon: 'BellRing',
    note: 'Platzhalter für moderates Hinweis- oder Warnsignal ohne Fehlergeste.',
  },
  returnLayer: {
    lucideIcon: 'Undo2',
    note: 'Platzhalter für Rückkehrbewegung im horizontalen Navigationsraum.',
  },
  foreground: {
    lucideIcon: 'BringToFront',
    note: 'Platzhalter für Vordergrundpriorität und visuelles Herantreten.',
  },
  backgroundRecede: {
    lucideIcon: 'SendToBack',
    note: 'Platzhalter für Zurücktreten oder Verlust der Vordergrundpriorität.',
  },
  focusSignal: {
    lucideIcon: 'Focus',
    note: 'Platzhalter für aktiven oder zurücktretenden Fokuszustand.',
  },
  helperMessage: {
    lucideIcon: 'MessageSquareWarning',
    note: 'Platzhalter für lokalen Hinweis- oder Warntext am Eingabefeld.',
  },
  shimmerSignal: {
    lucideIcon: 'ScanLine',
    note: 'Platzhalter für wandernden Shimmer oder zeilenartigen Ladeindikator.',
  },
  fadeResolve: {
    lucideIcon: 'EyeOff',
    note: 'Platzhalter für visuelles Verschwinden oder Auflösen eines Platzhalters.',
  },
} satisfies Record<VisualCueId, VisualCuePlaceholder>;

export const visualCueIds = [...VISUAL_CUE_IDS];

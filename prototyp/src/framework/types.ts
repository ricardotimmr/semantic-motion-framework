/**
 * Semantic Motion Framework – Type Definitions (v2)
 *
 * Diese Datei definiert das vollständige Typsystem für die Animations-Bedeutungs-
 * Mapping-Datenbank. Jeder Eintrag in der Datenbank muss diesen Typen entsprechen.
 *
 * Theoretische Grundlage:
 * - Semiotische Klassifikation: Peirce (1931–1958), Chandler (2007)
 * - Wahrnehmungspsychologische Grundlage: Treisman & Gelade (1980), Zacks & Tversky (2001)
 * - Motion-Design-Prinzipien: Thomas & Johnston (1981), Chang & Ungar (1993)
 * - Direction Bias: Ware (2012), Halpern & Kelly (1993)
 */

// ---------------------------------------------------------------------------
// Komponenten-Bezeichner
// ---------------------------------------------------------------------------

/**
 * Die sechs UI-Komponenten, die das Framework abdeckt.
 * Jede Komponente hat ihre eigene Menge gültiger Dimensions-/Subkategorie-Kombinationen.
 *
 * skeleton – Ergänzt als konkretes Beispiel für den Symbol-Zeichentyp
 *            nach Peirce. Die Shimmer-Animation ist rein konventionell,
 *            ohne ikonische oder indexikalische Grundlage (Chandler 2007, S. 36).
 */
export const COMPONENT_IDS = [
  'button',
  'toggle',
  'toast',
  'modal',
  'input',
  'skeleton',
] as const;

export type ComponentId = (typeof COMPONENT_IDS)[number];

// ---------------------------------------------------------------------------
// Bedeutungsdimensionen
// ---------------------------------------------------------------------------

/**
 * Die fünf Bedeutungsdimensionen, in die alle UI-Animationen klassifiziert werden.
 *
 * feedback    – Reaktion auf eine abgeschlossene Nutzeraktion (Erfolg, Fehler, Warnung)
 * stateChange – Element wechselt zwischen zwei gleichwertigen Zuständen (keine Richtung impliziert)
 * direction   – Navigation impliziert räumliche Vorwärts- oder Rückwärtsbewegung
 * hierarchy   – Element tritt in den visuellen Vordergrund oder tritt zurück
 * attention   – Element lenkt Aufmerksamkeit ohne vorherige Nutzeraktion
 */
export const DIMENSIONS = [
  'feedback',
  'stateChange',
  'direction',
  'hierarchy',
  'attention',
] as const;

export type Dimension = (typeof DIMENSIONS)[number];

// ---------------------------------------------------------------------------
// Subkategorien je Dimension
// ---------------------------------------------------------------------------

export const FEEDBACK_SUBCATEGORIES = ['success', 'error', 'warning'] as const;
export type FeedbackSubcategory = (typeof FEEDBACK_SUBCATEGORIES)[number];

export const STATE_CHANGE_SUBCATEGORIES = [
  'toggleOn',
  'toggleOff',
  'focus',
  'blur',
] as const;
export type StateChangeSubcategory =
  (typeof STATE_CHANGE_SUBCATEGORIES)[number];

export const DIRECTION_SUBCATEGORIES = [
  'enter', // Element erscheint als neue/vorwärts gerichtete Ebene
  'exit', // Aktuelle Ebene wird in Vorwärtsnavigation verlassen
  'backEnter', // Vorherige Ebene erscheint bei Rückwärtsnavigation
  'backExit', // Aktuelle Ebene wird in Rückwärtsnavigation verlassen
] as const;
export type DirectionSubcategory = (typeof DIRECTION_SUBCATEGORIES)[number];

export const HIERARCHY_SUBCATEGORIES = [
  'toForeground', // Element wird zum primären Inhalt
  'toBackground', // Element verliert Vordergrundpriorität und tritt aus dem Fokus zurück
] as const;
export type HierarchySubcategory = (typeof HIERARCHY_SUBCATEGORIES)[number];

export const ATTENTION_SUBCATEGORIES = [
  'oneShot', // Einmaliges Aufmerksamkeitssignal, endet automatisch
  'persistent', // Wiederholendes Signal bis zur Nutzeraktion (unendliche Iterationen)
  'warning', // Systeminitiiertes Warnsignal, endet nach N Iterationen
  'requiredField', // Pflichtfeld fordert Aufmerksamkeit nach fehlgeschlagenem Absenden
  'loading', // Skeleton-Shimmer: kontinuierliches Prozesssignal (Symbol)
  'resolved', // Skeleton-Ausblenden: Inhalt ist angekommen (Ikon)
] as const;
export type AttentionSubcategory = (typeof ATTENTION_SUBCATEGORIES)[number];

/**
 * Vereinigung aller Subkategorie-Typen.
 * Wird verwendet wenn die Dimension bereits bekannt ist und die Subkategorie sie präzisiert.
 */
export type Subcategory =
  | FeedbackSubcategory
  | StateChangeSubcategory
  | DirectionSubcategory
  | HierarchySubcategory
  | AttentionSubcategory;

/**
 * Runtime-Abbildung aller theoretisch benennbaren Subkategorien je Dimension.
 * Der Editor kann diese Liste verwenden, um alle Optionen anzuzeigen und
 * nicht im Mapping vorhandene Kombinationen als Out-of-Scope zu markieren.
 */
export const SUBCATEGORIES_BY_DIMENSION = {
  feedback: FEEDBACK_SUBCATEGORIES,
  stateChange: STATE_CHANGE_SUBCATEGORIES,
  direction: DIRECTION_SUBCATEGORIES,
  hierarchy: HIERARCHY_SUBCATEGORIES,
  attention: ATTENTION_SUBCATEGORIES,
} satisfies Record<Dimension, readonly Subcategory[]>;

// ---------------------------------------------------------------------------
// Easing
// ---------------------------------------------------------------------------

/**
 * Benannte Easing-Presets, die im Framework verwendet werden.
 * Alle Presets außer "spring" entsprechen direkt einer cubicBezier-Kurve.
 * "spring" beschreibt eine physikalische Framer-Motion-Transition und muss
 * über springConfig gerendert oder exportiert werden.
 *
 * easeOut      [0.0, 0.0, 0.2, 1.0]  – Ankommen, Abschluss, positives Feedback
 * easeIn       [0.4, 0.0, 1.0, 1.0]  – Verlassen, Aufbau, Ausfahrt
 * easeInOut    [0.4, 0.0, 0.2, 1.0]  – neutraler Zustandswechsel, symmetrische Übergänge
 * sharp        [0.4, 0.0, 0.6, 1.0]  – abrupt, unmittelbar, Fehler-Feedback
 * linear       [0.0, 0.0, 1.0, 1.0]  – phasenlos, nur für Skeleton-Shimmer verwenden
 * spring       (Framer Motion spring) – physikalisches Gewicht, Follow-Through
 */
export type EasingPreset =
  | 'easeOut'
  | 'easeIn'
  | 'easeInOut'
  | 'sharp'
  | 'linear'
  | 'spring';

/**
 * Die Easing-Definition, die in Animationsparametern verwendet wird.
 * Entweder ein benanntes Preset oder ein explizites cubicBezier-Array [x1, y1, x2, y2].
 *
 * Das Preset wird aus Konsistenz- und Lesbarkeitsgrüden bevorzugt.
 * Die Rohdaten-Kurve steht für Fälle bereit, in denen kein passendes Preset existiert.
 */
export type EasingValue =
  | { preset: EasingPreset }
  | { cubicBezier: [number, number, number, number] };

/**
 * Nachschlagetabelle von Preset-Namen zu cubicBezier-Werten.
 * Wird vom Code-Export-Generator verwendet, um konkrete Werte zu erzeugen.
 * Für "spring" ist der Wert nur ein CSS-/Fallback-Platzhalter.
 * Framer Motion muss stattdessen springConfig verwenden.
 */
export const EASING_CURVES: Record<
  EasingPreset,
  [number, number, number, number]
> = {
  easeOut: [0.0, 0.0, 0.2, 1.0],
  easeIn: [0.4, 0.0, 1.0, 1.0],
  easeInOut: [0.4, 0.0, 0.2, 1.0],
  sharp: [0.4, 0.0, 0.6, 1.0],
  linear: [0.0, 0.0, 1.0, 1.0],
  spring: [0.0, 0.0, 0.2, 1.0], // Platzhalter; spring verwendet die Framer-Motion-Spring-Konfiguration
};

// ---------------------------------------------------------------------------
// Spring-Konfiguration (wird verwendet wenn easing preset "spring" ist)
// ---------------------------------------------------------------------------

/**
 * Framer-Motion-Federmechanik-Parameter.
 * Wird nur verwendet wenn EasingValue { preset: "spring" } ist.
 */
export interface SpringConfig {
  stiffness: number; // Standard 100 – höher = reaktionsschneller
  damping: number; // Standard 10  – niedriger = mehr Schwingung
  mass: number; // Standard 1   – höher = schwereres Gefühl
}

// ---------------------------------------------------------------------------
// Keyframe-Sequenzen
// ---------------------------------------------------------------------------

/**
 * Eine Keyframe-Sequenz für mehrstufige Animationen (z. B. Shake).
 * values: die animierten Eigenschaftswerte an jedem Keyframe
 * times:  normalisierte Zeitpositionen [0..1] für jeden Wert, muss der Länge von values entsprechen
 */
export interface KeyframeSequence {
  values: number[];
  times: number[];
}

/**
 * Eine explizite Phase innerhalb einer mehrphasigen Animation.
 * Jede Phase beschreibt genau einen sequenziellen Bewegungsschritt
 * auf demselben animierten Hauptelement, z. B. erst Einfahrt, danach Shake.
 *
 * Phasen verwenden standardmäßig easing aus AnimationParams. Ein eigenes
 * easing kann gesetzt werden, wenn eine Phase bewusst eine andere Kurve braucht.
 * duration beschreibt die semantische Bewegungsdauer dieser Phase in Millisekunden.
 * delay ist ein technischer Startabstand vor der Phase und zählt nicht zur
 * semantischen Top-Level-duration.
 *
 * Wenn mehrere Keyframe-Sequenzen in derselben Phase kombiniert werden, z. B.
 * translate + scale + opacity, müssen sie dasselbe times-Raster verwenden.
 */
export interface MotionPhase {
  /** Maschinenlesbarer Phasenname, z. B. "enter", "shake", "nudge" */
  id: string;

  /** Semantische Bewegungsdauer dieser Phase in Millisekunden */
  duration: number;

  /** Optionale Playback-Verzögerung vor dieser Phase in Millisekunden */
  delay?: number;

  /** Optionale eigene Beschleunigungskurve; sonst gilt AnimationParams.easing */
  easing?: EasingValue;

  /**
   * Semantisch relevante Achse der translatorischen Bewegung dieser Phase.
   * Erforderlich wenn translatePx, translateDistance, translateFrom,
   * translateTo oder keyframes gesetzt ist.
   */
  direction?: 'x' | 'y';

  /** Pixel-Versatz für translatorische Phasen */
  translatePx?: number;

  /** Größenabhängige Translationsdistanz dieser Phase */
  translateDistance?: TranslationDistance;

  /** Startkante einer größenabhängigen Enter-Phase */
  translateFrom?: TranslationEdge;

  /** Zielkante einer größenabhängigen Exit-Phase */
  translateTo?: TranslationEdge;

  /** Explizite translatorische Keyframes dieser Phase */
  keyframes?: KeyframeSequence;

  /** Explizite Scale-Keyframes dieser Phase */
  scaleKeyframes?: KeyframeSequence;

  /** Deckkraft-Bereich [von, bis] dieser Phase */
  opacity?: [number, number];

  /** Explizite Deckkraft-Keyframes dieser Phase */
  opacityKeyframes?: KeyframeSequence;

  /** Federmechanik-Konfiguration, falls diese Phase spring verwendet */
  springConfig?: SpringConfig;
}

/**
 * Kante, von der eine größenabhängige Translation startet oder zu der sie führt.
 * Wird nur für Enter-/Exit-Bewegungen verwendet, bei denen der konkrete Pixelwert
 * erst im Komponenten-Rendering bekannt ist.
 */
export type TranslationEdge = 'left' | 'right' | 'top' | 'bottom';

/**
 * Distanz einer größenabhängigen Translation.
 * "self" bedeutet: volle Breite oder Höhe des animierten Elements, abhängig von direction.
 */
export type TranslationDistance = 'self';

/**
 * Explizite Interpretation von scaleFactor.
 * scaleFactor bleibt dabei ein positives Intensitätsdelta; scaleMode legt fest,
 * ob daraus ein Pulse, Scale-In oder Scale-Out entsteht.
 */
export type ScaleMode = 'pulse' | 'scaleIn' | 'scaleOut';

// ---------------------------------------------------------------------------
// Animationsparameter
// ---------------------------------------------------------------------------

/**
 * Die vollständige Menge der Animationsparameter für einen einzelnen Mapping-Eintrag.
 * Dies sind die technischen Variablen, die Bedeutung kodieren.
 *
 * Alle Parameter sind optional, außer easing und duration, die immer
 * erforderlich sind. Parameter, die auf eine bestimmte Animation nicht zutreffen,
 * werden weggelassen statt auf null gesetzt.
 *
 * BEWEGUNGSAUSMASS – genau eine der drei räumlichen Bewegungsgruppen unten verwenden:
 *
 *   Translation   Pixel-Versatz oder größenabhängige Translation.
 *                 translatePx beschreibt feste Pixelwerte, z. B. Shake ±8 px.
 *                 translateDistance beschreibt größenabhängige Bewegungen, z. B.
 *                 "self" für volle Elementhöhe/-breite bei Enter-/Exit-Animationen.
 *                 Wird zusammen mit direction und optional translateFrom/translateTo verwendet.
 *
 *   scaleFactor   Positives Bruchteilsdelta, das auf die Basisskala des Elements angewendet wird.
 *                 Die semantische Interpretation wird durch scaleMode festgelegt.
 *                 Beispiel: scaleFactor 0.05 + scaleMode "pulse" = 1.0 → 1.05 → 1.0.
 *                 Niemals zusammen mit direction verwenden.
 *
 *   trackFactor   Normalisierter Anteil einer komponenteneigenen Bewegungsstrecke.
 *                 Beispiel: Toggle-Track-Breite oder Skeleton-Shimmer-Fläche.
 *                 Der Pixelabstand wird zur Renderzeit von der jeweiligen Komponente aufgelöst.
 *                 Vorzeichen kodiert Richtung: +1.0 = vorwärts, -1.0 = rückwärts.
 *
 * Mehr als eine dieser Bewegungsgruppen in einem einzelnen Eintrag zu verwenden ist fachlich ungültig.
 *
 * opacity ist davon ausgenommen: Deckkraft ist kein räumlicher Bewegungsparameter,
 * sondern ein ergänzender Sichtbarkeitsparameter. Sie darf ergänzend oder alleine
 * verwendet werden, muss dann aber semantisch als Erscheinen, Verschwinden,
 * Abschluss, Fokusverlust oder Verfügbarkeit begründet sein.
 *
 * Mehrphasige Animationen werden über motionPhases modelliert. In diesem Fall
 * bleiben die flachen Bewegungsfelder auf AnimationParams frei; die konkrete
 * Bewegung liegt in den einzelnen Phasen. easing und duration bleiben auf
 * oberster Ebene als Default-Kurve und semantische Gesamtdauer lesbar.
 *
 * Bei motionPhases gilt:
 * - duration auf Top-Level entspricht der Summe der Phasendauern ohne delay.
 * - delay innerhalb einer Phase ist ein zusätzlicher Playback-Abstand.
 * - iterations auf Top-Level wiederholt die gesamte Phasensequenz.
 */
export interface AnimationParams {
  /** Beschleunigungskurve – der semantisch bedeutsamste Parameter */
  easing: EasingValue;

  /**
   * Semantische Gesamtdauer der Animation in Millisekunden.
   * Bei motionPhases entspricht sie der Summe der Phasendauern ohne delay.
   */
  duration: number;

  /**
   * Semantisch relevante Achse der translatorischen Bewegung.
   * Erforderlich wenn translatePx, translateDistance oder trackFactor gesetzt ist.
   * Bei Skalierungs- und Deckkraft-Animationen weglassen.
   * Die konkrete Herkunft/Zielrichtung wird bei größenabhängigen Bewegungen
   * über translateFrom und translateTo angegeben.
   */
  direction?: 'x' | 'y';

  /**
   * Pixel-Versatz für translatorische Animationen (Shake, Slide).
   * Schließt sich gegenseitig mit scaleFactor und trackFactor aus.
   * Nicht gemeinsam mit translateDistance verwenden.
   */
  translatePx?: number;

  /**
   * Größenabhängige Translationsdistanz.
   * "self" bedeutet volle Breite oder Höhe des animierten Elements.
   * Wird für Enter-/Exit-Bewegungen verwendet, bei denen der Pixelwert
   * erst im Komponenten-Rendering aufgelöst werden kann.
   */
  translateDistance?: TranslationDistance;

  /**
   * Startkante einer größenabhängigen Enter-Translation.
   * Beispiel: translateFrom "bottom" + direction "y" = Element kommt von unten.
   */
  translateFrom?: TranslationEdge;

  /**
   * Zielkante einer größenabhängigen Exit-Translation.
   * Beispiel: translateTo "bottom" + direction "y" = Element verlässt nach unten.
   */
  translateTo?: TranslationEdge;

  /**
   * Positives relatives Skalierungsdelta.
   * Die konkrete Interpretation muss über scaleMode gesetzt werden:
   * - pulse:    1.0 → 1.0 + scaleFactor → 1.0
   * - scaleIn:  1.0 - scaleFactor → 1.0
   * - scaleOut: 1.0 → 1.0 - scaleFactor
   * Schließt sich gegenseitig mit Translation-Feldern und trackFactor aus.
   */
  scaleFactor?: number;

  /**
   * Semantische Interpretation von scaleFactor.
   * Erforderlich wenn scaleFactor gesetzt ist.
   */
  scaleMode?: ScaleMode;

  /**
   * Normalisierter Anteil einer komponenteneigenen Bewegungsstrecke [0..1].
   * Wird z. B. für Toggle-Thumb-Bewegung oder Skeleton-Shimmer verwendet.
   * Vorzeichen kodiert Richtung: +1.0 vorwärts, -1.0 rückwärts.
   * Schließt sich gegenseitig mit Translation-Feldern und scaleFactor aus.
   */
  trackFactor?: number;

  /**
   * Verzögerung vor Animationsstart in Millisekunden.
   * Wird für gestaffelte Sequenzen oder bewusste Pausen verwendet.
   */
  delay?: number;

  /**
   * Anzahl der Wiederholungen der Animation.
   * Wenn weggelassen oder 1, wird die Animation einmal abgespielt.
   * Werte größer als 1 wiederholen die Animation entsprechend oft.
   * Bei motionPhases wiederholt sich die komplette Phasensequenz.
   * Infinity = läuft in einer Schleife bis zum programmatischen Stopp.
   */
  iterations?: number | typeof Infinity;

  /**
   * Explizite Keyframe-Sequenz für mehrstufige Animationen (z. B. Shake).
   * Wenn vorhanden, überschreibt sie die einfache Von-Bis-Interpolation auf der gegebenen Achse.
   * Werte haben dieselbe Einheit wie translatePx.
   */
  keyframes?: KeyframeSequence;

  /**
   * Federmechanik-Konfiguration.
   * Nur relevant wenn easing.preset === "spring".
   */
  springConfig?: SpringConfig;

  /**
   * Deckkraft-Bereich [von, bis] für Sichtbarkeitsübergänge.
   * Kein räumlicher Bewegungsparameter, sondern semantischer
   * Sichtbarkeitsparameter für Erscheinen, Verschwinden, Abschluss,
   * Fokusverlust oder Verfügbarkeit.
   * Bei Animationen ohne Deckkraft-Einfluss weglassen.
   */
  opacity?: [number, number];

  /**
   * Explizite Deckkraft-Keyframes für mehrstufige Opacity-Signale.
   * Werte sind absolute Deckkraftwerte [0..1].
   * Wenn vorhanden, präzisiert dieses Feld den einfachen opacity-Bereich.
   */
  opacityKeyframes?: KeyframeSequence;

  /**
   * Sequenz expliziter Bewegungsphasen für mehrphasige Animationen.
   * Wird verwendet, wenn eine einzelne flache Parametergruppe die semantische
   * Bewegung nicht sauber abbilden kann, z. B. Toast-Einfahrt plus Shake.
   *
   * Wenn motionPhases vorhanden ist, behandeln Preview und Export diese Phasen
   * als primäre Bewegungsbeschreibung. Flache Bewegungsfelder bleiben dann frei.
   */
  motionPhases?: MotionPhase[];
}

// ---------------------------------------------------------------------------
// Accessibility
// ---------------------------------------------------------------------------

/**
 * Strategie für prefers-reduced-motion.
 *
 * Diese Strategie ist keine alternative ästhetische Variante des Mappings.
 * Sie beschreibt nur, wie dieselbe semantische Aussage mit weniger oder ohne
 * problematische Bewegung dargestellt werden soll.
 *
 * none     – keine besondere Reduktion nötig
 * shorten  – Bewegung bleibt erhalten, aber Dauer, Wiederholung oder Amplitude werden reduziert
 * replace  – problematische Bewegung wird durch weniger bewegungsintensive Darstellung ersetzt
 * static   – Bewegung entfällt; ein statischer Zustand trägt die Information
 */
export type ReducedMotionStrategy = 'none' | 'shorten' | 'replace' | 'static';

/**
 * Accessibility-Metadaten für einen Mapping-Eintrag.
 * Der spätere Editor kann diese Felder automatisch auswerten, ohne dem Nutzer
 * mehrere gleichwertige Mapping-Varianten anzubieten.
 */
export interface MappingAccessibility {
  reducedMotion: ReducedMotionStrategy;
}

// ---------------------------------------------------------------------------
// Begründung
// ---------------------------------------------------------------------------

/**
 * Der Peirce'sche Zeichentyp, der die semiotische Beziehung
 * zwischen der Animation und ihrer Bedeutung beschreibt.
 *
 * icon       – Animation ähnelt dem, was sie bedeutet (physikalische Analogie)
 * index      – Animation hat eine assoziative/kausale Verbindung zu ihrer Bedeutung
 * symbol     – Bedeutung der Animation ist rein konventionell (erlernt)
 * icon/index – dominanter Aspekt ist ikonisch mit einem indexikalischen Anteil
 */
export type SignType = 'icon' | 'index' | 'symbol' | 'icon/index';

/**
 * Maschinenlesbare Referenzschlüssel für wissenschaftliche und technische Quellen.
 * Der lesbare Begründungstext bleibt in rationale.source; diese Keys ermöglichen
 * zusätzlich eine konsistente Nachvollziehbarkeit über alle Mapping-Einträge.
 */
export type ReferenceKey =
  | 'Peirce1931'
  | 'Chandler2007'
  | 'Norman2013'
  | 'Ware2012'
  | 'ZacksTversky2001'
  | 'BartramWareCalvert2003'
  | 'ThomasJohnston1981'
  | 'ChangUngar1993'
  | 'HeerRobertson2007'
  | 'Head2016'
  | 'MaterialDesign3'
  | 'AppleHIG'
  | 'WCAG21';

/**
 * Kleine semantische Hinweiszeichen für die bildhafte Lesart eines Mappings.
 * Diese IDs beschreiben keine konkreten Icon-Komponenten und keine Animation.
 * Sie werden später im Editor auf Glyphs oder Icon-Platzhalter abgebildet.
 */
export const VISUAL_CUE_IDS = [
  'refusalGesture',
  'pulseSignal',
  'toggleTravel',
  'arrival',
  'departure',
  'nudgeSignal',
  'returnLayer',
  'foreground',
  'backgroundRecede',
  'focusSignal',
  'helperMessage',
  'shimmerSignal',
  'fadeResolve',
] as const;

export type VisualCueId = (typeof VISUAL_CUE_IDS)[number];

/**
 * Bildhafte Lesart einer Bewegung.
 * Das Label erklärt die Wahrnehmungs- oder Gestenmetapher sprachlich.
 * visualCue verweist auf ein kleines erklärendes Glyph, nicht auf die
 * technische Animation selbst.
 */
export interface SemanticMetaphor {
  label: string;
  visualCue: VisualCueId | VisualCueId[];
}

/**
 * Reflexionsebene für Graustufen und Möglichkeitsräume.
 * primaryReading hält die dominante semantische Lesart fest.
 * adjacentReadings beschreibt nahe Bedeutungen, die mitgelesen werden können.
 * boundaries grenzt die primäre Zuordnung gegen ähnliche Lesarten ab.
 */
export interface SemanticContext {
  metaphor: SemanticMetaphor;
  primaryReading: string;
  adjacentReadings: string[];
  boundaries: string[];
}

/**
 * Die zweischichtige Begründung für jeden Mapping-Eintrag.
 *
 * short:    Nutzergerichtete Erklärung, die in der Editor-Oberfläche angezeigt wird.
 *           Auf Normans Signifier-Ebene formuliert – keine Peirce-Terminologie.
 *           Muss ohne semiotisches Vorwissen verständlich sein.
 *
 * source:   Wissenschaftliche Detailbegründung.
 *           Gibt die theoretische Quelle für jede Parameterentscheidung an.
 *           Wird nicht als Standardtext angezeigt, kann aber in Details-/Tooltip-
 *           Ansichten sichtbar gemacht werden. Dient der akademischen Nachvollziehbarkeit (NFA-07).
 *
 * references:
 *           Maschinenlesbare Quellenliste für Konsistenzprüfungen, Dokumentation
 *           und spätere Export-/Details-Ansichten.
 *
 * signType: Der dominante Peirce'sche Zeichentyp für dieses Mapping.
 *
 * semanticContext:
 *           Ergänzende Reflexionsebene aus bildhafter Lesart, visuellem Cue,
 *           primärer Lesart, angrenzenden Lesarten und Abgrenzungen. Dieses
 *           Feld steuert weder Preview noch Export, sondern unterstützt die
 *           begründete Auswahl im Editor und die wissenschaftliche Einordnung.
 */
export interface Rationale {
  short: string;
  source: string;
  references: ReferenceKey[];
  signType: SignType;
  semanticContext: SemanticContext;
}

// ---------------------------------------------------------------------------
// Mapping-Eintrag
// ---------------------------------------------------------------------------

/**
 * Ein einzelner Eintrag in der Mapping-Datenbank des Semantic Motion Frameworks.
 * Repräsentiert eine bestimmte Kombination aus Komponente, Dimension und Subkategorie.
 */
export interface MappingEntry {
  /** Eindeutiger Bezeichner: "{component}-{dimension}-{subcategory}" */
  id: string;

  /** Die UI-Komponente, auf die dieses Mapping angewendet wird */
  component: ComponentId;

  /** Die Bedeutungsdimension, die diese Animation kommuniziert */
  dimension: Dimension;

  /** Die spezifische Ausprägung innerhalb der Dimension */
  subcategory: Subcategory;

  /** Die Animationsparameter, die diese Bedeutung kodieren */
  params: AnimationParams;

  /** Die zweischichtige Begründung für dieses Mapping */
  rationale: Rationale;

  /** Accessibility-Metadaten, z. B. Reduced-Motion-Verhalten */
  accessibility?: MappingAccessibility;
}

// ---------------------------------------------------------------------------
// Datenbanktyp
// ---------------------------------------------------------------------------

/**
 * Die vollständige Mapping-Datenbank.
 * Ein flaches Array von MappingEntry-Objekten.
 * Wird über die Classifier-Funktionen in classifier.ts abgefragt.
 */
export type MappingDatabase = MappingEntry[];

// ---------------------------------------------------------------------------
// Abfrage-Ein- und Ausgabe
// ---------------------------------------------------------------------------

/**
 * Eingabeform für die getMapping-Classifier-Funktion.
 */
export interface MappingQuery {
  component: ComponentId;
  dimension: Dimension;
  subcategory: Subcategory;
}

/**
 * Ergebnis einer Mapping-Abfrage.
 * Gibt den Eintrag zurück, wenn gefunden, oder null wenn die Kombination nicht in der Datenbank ist.
 */
export type MappingResult = MappingEntry | null;

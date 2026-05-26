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
export type ComponentId =
  | "button"
  | "toggle"
  | "toast"
  | "modal"
  | "input"
  | "skeleton";

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
export type Dimension =
  | "feedback"
  | "stateChange"
  | "direction"
  | "hierarchy"
  | "attention";

// ---------------------------------------------------------------------------
// Subkategorien je Dimension
// ---------------------------------------------------------------------------

export type FeedbackSubcategory = "success" | "error" | "warning";

export type StateChangeSubcategory =
  | "toggleOn"
  | "toggleOff"
  | "focus"
  | "blur";

export type DirectionSubcategory =
  | "enter"       // Element kommt von rechts, impliziert Vorwärtsnavigation
  | "exit"        // Element verlässt nach links, impliziert Vorwärtsnavigation
  | "backEnter"   // Element kommt von links, impliziert Rückwärtsnavigation
  | "backExit";   // Element verlässt nach rechts, impliziert Rückwärtsnavigation

export type HierarchySubcategory =
  | "toForeground"   // Element wird zum primären Inhalt
  | "toBackground";  // Element tritt zurück, bleibt aber sichtbar

export type AttentionSubcategory =
  | "oneShot"        // Einmaliges Aufmerksamkeitssignal, endet automatisch
  | "persistent"     // Wiederholendes Signal bis zur Nutzeraktion (unendliche Iterationen)
  | "warning"        // Systeminitiiertes Warnsignal, endet nach N Iterationen
  | "requiredField"  // Pflichtfeld fordert Aufmerksamkeit nach fehlgeschlagenem Absenden
  | "loading"        // Skeleton-Shimmer: kontinuierliches Prozesssignal (Symbol)
  | "resolved";      // Skeleton-Ausblenden: Inhalt ist angekommen (Ikon)

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

// ---------------------------------------------------------------------------
// Easing
// ---------------------------------------------------------------------------

/**
 * Benannte Easing-Presets, die im Framework verwendet werden.
 * Jedes Preset entspricht einer cubicBezier-Kurve und trägt semantische Bedeutung.
 *
 * easeOut      [0.0, 0.0, 0.2, 1.0]  – Ankommen, Abschluss, positives Feedback
 * easeIn       [0.4, 0.0, 1.0, 1.0]  – Verlassen, Aufbau, Ausfahrt
 * easeInOut    [0.4, 0.0, 0.2, 1.0]  – neutraler Zustandswechsel, symmetrische Übergänge
 * sharp        [0.4, 0.0, 0.6, 1.0]  – abrupt, unmittelbar, Fehler-Feedback
 * linear       [0.0, 0.0, 1.0, 1.0]  – phasenlos, nur für Skeleton-Shimmer verwenden
 * spring       (Framer Motion spring) – physikalisches Gewicht, Follow-Through
 */
export type EasingPreset =
  | "easeOut"
  | "easeIn"
  | "easeInOut"
  | "sharp"
  | "linear"
  | "spring";

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
 */
export const EASING_CURVES: Record<EasingPreset, [number, number, number, number]> = {
  easeOut:   [0.0, 0.0, 0.2, 1.0],
  easeIn:    [0.4, 0.0, 1.0, 1.0],
  easeInOut: [0.4, 0.0, 0.2, 1.0],
  sharp:     [0.4, 0.0, 0.6, 1.0],
  linear:    [0.0, 0.0, 1.0, 1.0],
  spring:    [0.0, 0.0, 0.2, 1.0], // Platzhalter; spring verwendet die Framer-Motion-Spring-Konfiguration
};

// ---------------------------------------------------------------------------
// Spring-Konfiguration (wird verwendet wenn easing preset "spring" ist)
// ---------------------------------------------------------------------------

/**
 * Framer-Motion-Federmechanik-Parameter.
 * Wird nur verwendet wenn EasingValue { preset: "spring" } ist.
 */
export interface SpringConfig {
  stiffness: number;  // Standard 100 – höher = reaktionsschneller
  damping: number;    // Standard 10  – niedriger = mehr Schwingung
  mass: number;       // Standard 1   – höher = schwereres Gefühl
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
 * BEWEGUNGSAUSMASS – genau eines der drei typisierten Felder unten verwenden:
 *
 *   translatePx   Pixel-Versatz für translatorische Bewegungen (Shake, Slide).
 *                 Beispiel: 8 bedeutet, die Animation bewegt sich ±8 px auf der gegebenen Achse.
 *                 Wird zusammen mit direction und (optional) keyframes verwendet.
 *
 *   scaleFactor   Bruchteilsdelta, das auf die Basisskala des Elements angewendet wird.
 *                 Beispiel: 0.05 bedeutet, das Element skaliert zwischen 0.95 und 1.05.
 *                 Niemals zusammen mit direction verwenden.
 *
 *   trackFactor   Normalisierter Anteil der komponenteneigenen Track-Breite [0..1].
 *                 Ausschließlich für die Toggle-Komponente verwendet, bei der der
 *                 Pixelabstand zur Renderzeit von der Komponente aufgelöst wird.
 *                 Vorzeichen kodiert Richtung: +1.0 = vorwärts, -1.0 = rückwärts.
 *
 * Mehr als eines dieser drei Felder in einem einzelnen Eintrag zu verwenden ist ein Typfehler.
 */
export interface AnimationParams {
  /** Beschleunigungskurve – der semantisch bedeutsamste Parameter */
  easing: EasingValue;

  /** Gesamtdauer der Animation in Millisekunden */
  duration: number;

  /**
   * Achse der translatorischen Bewegung.
   * Erforderlich wenn translatePx oder trackFactor gesetzt ist.
   * Bei Skalierungs- und Deckkraft-Animationen weglassen.
   */
  direction?: "x" | "y";

  /**
   * Pixel-Versatz für translatorische Animationen (Shake, Slide).
   * Schließt sich gegenseitig mit scaleFactor und trackFactor aus.
   */
  translatePx?: number;

  /**
   * Bruchteilsdelta der Skalierung (z. B. 0.05 → Element skaliert auf 1.05).
   * Schließt sich gegenseitig mit translatePx und trackFactor aus.
   */
  scaleFactor?: number;

  /**
   * Normalisierter Toggle-Track-Anteil [0..1].
   * Vorzeichen kodiert Richtung: +1.0 vorwärts, -1.0 rückwärts.
   * Schließt sich gegenseitig mit translatePx und scaleFactor aus.
   */
  trackFactor?: number;

  /**
   * Verzögerung vor Animationsstart in Millisekunden.
   * Wird für gestaffelte Sequenzen oder bewusste Pausen verwendet.
   */
  delay?: number;

  /**
   * Anzahl der Wiederholungen der Animation.
   * 0 oder 1 = wird einmal abgespielt.
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
   * Deckkraft-Bereich [von, bis] für Einblend-Animationen.
   * Bei Animationen ohne Deckkraft-Einfluss weglassen.
   */
  opacity?: [number, number];
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
export type SignType = "icon" | "index" | "symbol" | "icon/index";

/**
 * Die zweischichtige Begründung für jeden Mapping-Eintrag.
 *
 * short:    Nutzergerichtete Erklärung, die in der Editor-Oberfläche angezeigt wird.
 *           Auf Normans Signifier-Ebene formuliert – keine Peirce-Terminologie.
 *           Muss ohne semiotisches Vorwissen verständlich sein.
 *
 * source:   Interne wissenschaftliche Dokumentation.
 *           Gibt die theoretische Quelle für jede Parameterentscheidung an.
 *           Wird im Editor nicht angezeigt. Dient der akademischen Nachvollziehbarkeit (NFA-07).
 *
 * signType: Der dominante Peirce'sche Zeichentyp für dieses Mapping.
 */
export interface Rationale {
  short: string;
  source: string;
  signType: SignType;
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

// ---------------------------------------------------------------------------
// Beispieleinträge
// ---------------------------------------------------------------------------

export const EXAMPLE_ENTRIES: MappingEntry[] = [
  // --- Button / Feedback / Fehler ------------------------------------------
  {
    id: "button-feedback-error",
    component: "button",
    dimension: "feedback",
    subcategory: "error",
    params: {
      easing: { preset: "sharp" },
      duration: 350,
      direction: "x",
      translatePx: 8,
      iterations: 1,
      keyframes: {
        values: [0, -8, 8, -8, 8, -4, 0],
        times:  [0, 0.15, 0.30, 0.45, 0.60, 0.80, 1.0],
      },
    },
    rationale: {
      short:
        "Die horizontale Schüttelbewegung greift auf die universelle " +
        "Ablehnungsgeste des Kopfschüttelns zurück und kommuniziert, " +
        "dass eine Eingabe nicht akzeptiert wurde.",
      source:
        "Index (Peirce): assoziative Verbindung zu Kopfschütteln als " +
        "Ablehnungsgeste. Direction Bias (Ware 2012): horizontale Bewegung " +
        "kodiert Ablehnung. Sharp easing: Abruptheit verstärkt Fehlercharakter.",
      signType: "index",
    },
  },

  // --- Button / Feedback / Erfolg ------------------------------------------
  {
    id: "button-feedback-success",
    component: "button",
    dimension: "feedback",
    subcategory: "success",
    params: {
      easing: { preset: "easeOut" },
      duration: 250,
      scaleFactor: 0.05, // Element skaliert 1.0 → 1.05 → 1.0
      iterations: 1,
      opacity: [1, 1],
    },
    rationale: {
      short:
        "Die sanfte Ausdehnung und das schnelle Abklingen signalisieren, " +
        "dass eine Aktion erfolgreich abgeschlossen wurde.",
      source:
        "Ikon/Index (Peirce): leichte Expansion ähnelt physikalischem " +
        "Öffnen; Aufwärtsbewegung als kultureller Index für Positives " +
        "(Ware 2012). Ease-Out: Abklingen als Signal für Abschluss " +
        "(Zacks & Tversky 2001).",
      signType: "icon/index",
    },
  },

  // --- Input / Zustandswechsel / Fokus -------------------------------------
  {
    id: "input-stateChange-focus",
    component: "input",
    dimension: "stateChange",
    subcategory: "focus",
    params: {
      easing: { preset: "easeOut" },
      duration: 175,
      iterations: 1,
      // Kein Bewegungsfeld: Transition wird über Border/Shadow im Komponenten-Styling ausgedrückt.
    },
    rationale: {
      short:
        "Die schnelle, abklingende Transition des Fokusrahmens kommuniziert " +
        "sofortige Bereitschaft. Der Nutzer sieht, dass das Feld aktiv ist, " +
        "ohne auf eine Reaktion warten zu müssen.",
      source:
        "Ikon (Peirce): Expansion des Fokusindikators ähnelt physikalischem " +
        "Herantreten. Ease-Out: Ankommen als Abklingsignal " +
        "(Zacks & Tversky 2001). Duration reduziert auf 175ms, " +
        "da Nutzer sofort tippen möchte (Head 2016).",
      signType: "icon",
    },
  },
];

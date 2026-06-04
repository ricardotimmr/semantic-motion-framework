/**
 * Semantic Motion Framework – Mapping-Datenbank (v2)
 *
 * Komponenten: button, toggle, toast, modal, input, skeleton
 * Dimensionen: feedback, stateChange, direction, hierarchy, attention
 */

import type { MappingDatabase } from "../framework/types";

export const mappings: MappingDatabase = [

  // -------------------------------------------------------------------------
  // BUTTON
  // -------------------------------------------------------------------------

  {
    id: "button-feedback-success",
    component: "button",
    dimension: "feedback",
    subcategory: "success",
    params: {
      easing: { preset: "easeOut" },
      duration: 250,
      scaleFactor: 0.05, // 1.0 → 1.05 → 1.0
      scaleMode: "pulse",
      iterations: 1,
    },
    rationale: {
      short:
        "Die sanfte Ausdehnung und das schnelle Abklingen signalisieren, " +
        "dass eine Aktion erfolgreich abgeschlossen wurde.",
      source:
        "Ikon/Index (Peirce): leichte Expansion ähnelt einer physischen " +
        "Reaktion auf die erfolgreiche Aktion und verweist damit auf deren Abschluss. " +
        "Ease-Out: Abklingen als Signal für Abschluss (Zacks & Tversky 2001). " +
        "Duration 250ms: Standard für primäres Feedback (Head 2016).",
      references: ["Peirce1931", "ZacksTversky2001", "Head2016"],
      signType: "icon/index",
    },
  },

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
    accessibility: {
      reducedMotion: "replace",
    },
    rationale: {
      short:
        "Die horizontale Schüttelbewegung greift auf die vertraute " +
        "Ablehnungsgeste des Kopfschüttelns zurück und kommuniziert, " +
        "dass eine Eingabe nicht akzeptiert wurde.",
      source:
        "Index (Peirce): assoziative Verbindung zu Kopfschütteln als " +
        "Ablehnungsgeste. Direction Bias (Ware 2012): horizontale Bewegung " +
        "kodiert Ablehnung. Sharp easing: Abruptheit verstärkt Fehlercharakter " +
        "(Chang & Ungar 1993). translatePx ±8px: mittelgroß, klar wahrnehmbar " +
        "ohne visuell aggressiv zu wirken (Bartram et al. 2003).",
      references: ["Peirce1931", "Ware2012", "ChangUngar1993", "BartramWareCalvert2003"],
      signType: "index",
    },
  },

  {
    id: "button-attention-warning",
    component: "button",
    dimension: "attention",
    subcategory: "warning",
    params: {
      easing: { preset: "easeInOut" },
      duration: 600,
      scaleFactor: 0.03, // 1.0 → 1.03 → 1.0
      scaleMode: "pulse",
      iterations: 3,
      // Bewusst Attention statt Feedback: Die Animation wird systeminitiiert
      // ausgelöst und ist keine unmittelbare Reaktion auf einen Button-Klick.
    },
    accessibility: {
      reducedMotion: "shorten",
    },
    rationale: {
      short:
        "Das wiederholte, gleichmäßige Pulsieren fordert Aufmerksamkeit ein, " +
        "ohne Dringlichkeit zu signalisieren. Es endet nach drei Zyklen " +
        "und unterscheidet sich damit von persistenten Aufmerksamkeitssignalen.",
      source:
        "Attention-Dimension (nicht Feedback): Das Signal ist systeminitiiert, " +
        "nicht Reaktion auf eine abgeschlossene Nutzeraktion. " +
        "Index (Peirce): wiederholte Bewegung als kultureller Index für " +
        "Persistenz (Bartram et al. 2003). Ease-In-Out: symmetrische Kurve, " +
        "keine Abruptheit. Iterations 3: endet von selbst, abgegrenzt von " +
        "button-attention-persistent (Infinity).",
      references: ["Peirce1931", "BartramWareCalvert2003"],
      signType: "index",
    },
  },

  {
    id: "button-attention-persistent",
    component: "button",
    dimension: "attention",
    subcategory: "persistent",
    params: {
      easing: { preset: "easeInOut" },
      duration: 1000,
      scaleFactor: 0.04, // 1.0 → 1.04 → 1.0
      scaleMode: "pulse",
      iterations: Infinity,
    },
    accessibility: {
      reducedMotion: "static",
    },
    rationale: {
      short:
        "Das langsame, gleichmäßige Pulsieren signalisiert, dass eine Aktion " +
        "aussteht, ohne aggressiv zu wirken. Die endlose Wiederholung endet, " +
        "sobald der Nutzer reagiert.",
      source:
        "Index (Peirce): wiederholte Bewegung als Verweis auf ausstehende " +
        "Aktion. Ease-In-Out: gleichmäßig, nicht dringend. Duration 1000ms: " +
        "langsam genug, um periphere Wahrnehmung zu aktivieren ohne " +
        "Hauptaufgabe zu stören (Bartram et al. 2003). Iterations Infinity: " +
        "Persistenz als semantisches Ziel. Accessibility: endlose Bewegung " +
        "muss im Editor über prefers-reduced-motion reduziert oder ersetzt " +
        "werden können (WCAG 2.1 SC 2.3.3).",
      references: ["Peirce1931", "BartramWareCalvert2003", "WCAG21"],
      signType: "index",
    },
  },

  // -------------------------------------------------------------------------
  // TOGGLE
  // -------------------------------------------------------------------------

  {
    id: "toggle-stateChange-toggleOn",
    component: "toggle",
    dimension: "stateChange",
    subcategory: "toggleOn",
    params: {
      easing: { preset: "easeInOut" },
      duration: 220,
      direction: "x",
      trackFactor: 1.0, // volle komponenteneigene Track-Breite vorwärts
      iterations: 1,
    },
    rationale: {
      short:
        "Die horizontale Bewegung des Thumb-Elements ähnelt dem physischen " +
        "Umlegen eines Schalters und kommuniziert, dass das Element aktiviert wurde.",
      source:
        "Ikon (Peirce): ähnelt dem physischen Umlegen eines Schalters " +
        "(Thomas & Johnston 1981, physical analogy). Ease-In-Out: symmetrische " +
        "Kurve für symmetrischen Zustandswechsel (Zacks & Tversky 2001). " +
        "Duration 220ms: schnell genug für direkte Reaktion (Head 2016).",
      references: ["Peirce1931", "ThomasJohnston1981", "ZacksTversky2001", "Head2016"],
      signType: "icon",
    },
  },

  {
    id: "toggle-stateChange-toggleOff",
    component: "toggle",
    dimension: "stateChange",
    subcategory: "toggleOff",
    params: {
      easing: { preset: "easeInOut" },
      duration: 220,
      direction: "x",
      trackFactor: -1.0, // volle komponenteneigene Track-Breite rückwärts
      iterations: 1,
    },
    rationale: {
      short:
        "Die umgekehrte Bewegung des Thumb-Elements kommuniziert, dass das " +
        "Element deaktiviert wurde. Identische Duration und Easing wie Toggle On " +
        "verhindern eine irreführende Hierarchie zwischen den Zuständen.",
      source:
        "Ikon (Peirce): Umkehrung der Toggle-On-Bewegung. Ease-In-Out und " +
        "Duration identisch zu toggleOn: Konsistenzprinzip – asymmetrische " +
        "Parameter würden eine semantisch falsche Gewichtung der Zustände " +
        "erzeugen (Norman 2013, signifier consistency).",
      references: ["Peirce1931", "Norman2013"],
      signType: "icon",
    },
  },

  // -------------------------------------------------------------------------
  // TOAST
  // -------------------------------------------------------------------------

  {
    id: "toast-feedback-success",
    component: "toast",
    dimension: "feedback",
    subcategory: "success",
    params: {
      easing: { preset: "spring" },
      duration: 300,
      direction: "y",
      translateDistance: "self",
      translateFrom: "bottom",
      iterations: 1,
      opacity: [0, 1],
      springConfig: {
        stiffness: 360,
        damping: 20,
        mass: 0.9,
      },
    },
    accessibility: {
      reducedMotion: "replace",
    },
    rationale: {
      short:
        "Der Toast fährt von unten ein und federt leicht nach. Der " +
        "Überschwinger signalisiert, dass eine Aktion erfolgreich abgeschlossen wurde.",
      source:
        "Index (Peirce): Erscheinen aus dem Bildschirmrand als kausaler " +
        "Verweis auf Aktionsergebnis. Spring-Easing: Follow-Through-Prinzip " +
        "(Thomas & Johnston 1981) kommuniziert physikalische Substanz und " +
        "positive Energie. Duration 300ms, stiffness 360 und damping 20: schnelle, " +
        "klar wahrnehmbare, aber kontrollierte federnde " +
        "Einfahrt als Positivsignal (Head 2016).",
      references: ["Peirce1931", "ThomasJohnston1981", "Head2016"],
      signType: "index",
    },
  },

  {
    id: "toast-feedback-error",
    component: "toast",
    dimension: "feedback",
    subcategory: "error",
    params: {
      easing: { preset: "sharp" },
      duration: 320,
      iterations: 1,
      motionPhases: [
        {
          id: "enter",
          duration: 160,
          direction: "y",
          translateDistance: "self",
          translateFrom: "bottom",
          opacity: [0, 1],
        },
        {
          id: "shake",
          duration: 160,
          direction: "x",
          keyframes: {
            values: [0, -6, 6, -6, 6, 0],
            times:  [0, 0.2, 0.4, 0.6, 0.8, 1.0],
          },
        },
      ],
    },
    accessibility: {
      reducedMotion: "replace",
    },
    rationale: {
      short:
        "Der Toast erscheint abrupt und schüttelt sich kurz horizontal. " +
        "Die Kombination aus scharfer Einfahrt und Shake macht den " +
        "Fehlercharakter unmittelbar erkennbar.",
      source:
        "Index (Peirce): horizontaler Shake als Ablehnungsindex " +
        "(Ware 2012, Direction Bias). Sharp easing: Abruptheit verstärkt " +
        "Fehlercharakter – kein Follow-Through, keine Freudigkeit. " +
        "Zweiphasige Animation: Staging-Prinzip (Heer & Robertson 2007). " +
        "Duration 320ms: kürzer als warning, betont Unmittelbarkeit.",
      references: ["Peirce1931", "Ware2012", "HeerRobertson2007"],
      signType: "index",
    },
  },

  {
    id: "toast-feedback-warning",
    component: "toast",
    dimension: "feedback",
    subcategory: "warning",
    params: {
      easing: { preset: "easeInOut" },
      duration: 420,
      iterations: 1,
      motionPhases: [
        {
          id: "enter",
          delay: 80,
          duration: 260,
          direction: "y",
          translateDistance: "self",
          translateFrom: "bottom",
          opacity: [0, 1],
        },
        {
          id: "nudge",
          duration: 160,
          direction: "y",
          keyframes: {
            values: [0, -5, 0],
            times: [0, 0.5, 1],
          },
        },
      ],
    },
    accessibility: {
      reducedMotion: "replace",
    },
    rationale: {
      short:
        "Der Toast gleitet langsam von unten herein und setzt nach der Ankunft " +
        "einen moderaten vertikalen Nudge. Die Bewegung signalisiert, dass " +
        "Aufmerksamkeit erwünscht ist, aber keine sofortige Aktion erforderlich.",
      source:
        "Index (Peirce): Erscheinen aus dem Bildschirmrand. Ease-In-Out: " +
        "keine Abruptheit, kein Follow-Through – ruhige Mitteilung ohne " +
        "emotionale Valenz. Duration 420ms + delay 80ms: langsamer als " +
        "success (300ms) und error (320ms). Der anschließende y-Nudge " +
        "setzt ein moderates Warnsignal ohne Fehler-Shake oder positiven Spring " +
        "(Head 2016; Bartram et al. 2003).",
      references: ["Peirce1931", "Head2016", "BartramWareCalvert2003"],
      signType: "index",
    },
  },

  {
    id: "toast-attention-oneShot",
    component: "toast",
    dimension: "attention",
    subcategory: "oneShot",
    params: {
      easing: { preset: "easeOut" },
      duration: 760,
      iterations: 1,
      motionPhases: [
        {
          id: "enter",
          duration: 320,
          direction: "y",
          translateDistance: "self",
          translateFrom: "bottom",
          opacity: [0, 1],
        },
        {
          id: "pulse",
          duration: 440,
          scaleKeyframes: {
            values: [1, 1.025, 1, 1.025, 1],
            times: [0, 0.25, 0.5, 0.75, 1],
          },
        },
      ],
    },
    accessibility: {
      reducedMotion: "replace",
    },
    rationale: {
      short:
        "Der Toast fährt ruhig von unten ein und gibt zwei subtile Scale-Impulse. " +
        "Das Signal zeigt, dass neue Information angekommen ist, ohne " +
        "das Ergebnis einer Nutzeraktion zu kommunizieren.",
      source:
        "Attention-Dimension: systeminitiiertes Signal ohne vorherige " +
        "Nutzeraktion – strukturell verschieden von toast-feedback-success. " +
        "Ease-Out statt Spring: kein Follow-Through, ruhigere Ankunft " +
        "ohne positive Energie. Duration 760ms: genug Zeit für Einfahrt und " +
        "zwei subtile Scale-Impulse, ohne Dringlichkeit zu erzeugen. " +
        "Der Scale-Pulse wirkt als Aufmerksamkeitssignal, ohne den warnenden " +
        "y-Nudge oder den positiven Spring der Feedback-Mappings zu übernehmen. " +
        "Bartram et al. (2003) stützen die Annahme, dass einfache " +
        "Bewegungsattribute periphere Aufmerksamkeit lenken können.",
      references: ["Peirce1931", "BartramWareCalvert2003"],
      signType: "index",
    },
  },

  // -------------------------------------------------------------------------
  // MODAL
  // -------------------------------------------------------------------------

  {
    id: "modal-hierarchy-toForeground",
    component: "modal",
    dimension: "hierarchy",
    subcategory: "toForeground",
    params: {
      easing: { preset: "easeOut" },
      duration: 300,
      scaleFactor: 0.05, // 0.95 → 1.0
      scaleMode: "scaleIn",
      iterations: 1,
      opacity: [0, 1],
    },
    accessibility: {
      reducedMotion: "replace",
    },
    rationale: {
      short:
        "Das Modal wächst leicht auf seine finale Größe und wird dabei " +
        "eingeblendet. Die Skalierung ähnelt dem physikalischen Herantreten " +
        "eines Objekts und kommuniziert, dass dieses Element nun primäre " +
        "Aufmerksamkeit beansprucht.",
      source:
        "Ikon (Peirce): Skalierung ähnelt physikalischer Annäherung. " +
        "Ease-Out: Ankommen als Abklingsignal (Zacks & Tversky 2001). " +
        "scaleFactor 0.05 + Opacity 0→1: kombinierter Übergang für " +
        "wahrgenommene Tiefe (Material Design 3).",
      references: ["Peirce1931", "ZacksTversky2001", "MaterialDesign3"],
      signType: "icon",
    },
  },

  {
    id: "modal-hierarchy-toBackground",
    component: "modal",
    dimension: "hierarchy",
    subcategory: "toBackground",
    params: {
      easing: { preset: "easeIn" },
      duration: 250,
      scaleFactor: 0.04, // 1.0 → 0.96
      scaleMode: "scaleOut",
      iterations: 1,
      // Für Modal bedeutet "toBackground" hier: verliert Vordergrundpriorität
      // und wird aus dem aktiven Fokus entfernt. Ein halbtransparent sichtbares
      // Hintergrund-Modal wäre UX-seitig missverständlich; dafür wäre ein
      // eigenes Layer-/Panel-Mapping geeigneter.
      opacity: [1, 0],
    },
    accessibility: {
      reducedMotion: "replace",
    },
    rationale: {
      short:
        "Das Modal schrumpft leicht und wird ausgeblendet. Die Verkleinerung " +
        "kommuniziert, dass die Ebene ihre Vordergrundpriorität verliert " +
        "und aus dem aktiven Fokus zurücktritt.",
      source:
        "Ikon (Peirce): Verkleinerung ähnelt physikalischem Entfernen. " +
        "Ease-In: Zurücktreten als Aufbaukurve (Zacks & Tversky 2001). " +
        "Beim Modal wird der Hierarchieverlust als Entfernen aus dem aktiven " +
        "Fokus operationalisiert, nicht als dauerhaft sichtbare Halbtransparenz. " +
        "Duration 250ms: kürzer als toForeground, Hintergrundprozess " +
        "ist weniger bedeutsam.",
      references: ["Peirce1931", "ZacksTversky2001", "Head2016"],
      signType: "icon",
    },
  },

  {
    id: "modal-direction-enter",
    component: "modal",
    dimension: "direction",
    subcategory: "enter",
    params: {
      easing: { preset: "easeOut" },
      duration: 350,
      direction: "y",
      translateDistance: "self",
      translateFrom: "bottom",
      iterations: 1,
      opacity: [0, 1],
    },
    accessibility: {
      reducedMotion: "replace",
    },
    rationale: {
      short:
        "Das Modal fährt wie ein Sheet von unten ein und signalisiert damit, " +
        "dass eine neue Oberfläche geöffnet wird. Die vertikale Bewegung " +
        "folgt der Konvention mobiler Sheet- und Dialogschichten.",
      source:
        "Index (Peirce): Die Richtung verweist hier nicht auf horizontale " +
        "Vorwärtsnavigation, sondern auf das Erscheinen einer neuen " +
        "Oberfläche aus dem unteren Bildschirmrand. Direction y von unten: " +
        "Sheet-Konvention (Apple HIG, Material Design 3). Ease-Out: Ankommen " +
        "(Zacks & Tversky 2001). " +
        "Duration 350ms: komplex genug für bewusste Richtungswahrnehmung.",
      references: ["Peirce1931", "Ware2012", "ZacksTversky2001", "AppleHIG", "MaterialDesign3"],
      signType: "index",
    },
  },

  {
    id: "modal-direction-exit",
    component: "modal",
    dimension: "direction",
    subcategory: "exit",
    params: {
      easing: { preset: "easeIn" },
      duration: 280,
      direction: "y",
      translateDistance: "self",
      translateTo: "bottom",
      iterations: 1,
      opacity: [1, 0],
    },
    accessibility: {
      reducedMotion: "replace",
    },
    rationale: {
      short:
        "Das Modal fährt wie ein Sheet nach unten aus. Die komplementäre " +
        "Richtung zur Einfahrt kommuniziert, dass diese Oberfläche geschlossen wird.",
      source:
        "Index (Peirce): komplementäre Sheet-Richtung zu modal-direction-enter. " +
        "Die Bewegung beschreibt kein horizontales Vorwärts-/Rückwärtsnavigieren, " +
        "sondern das Schließen einer vertikal eingeführten Oberfläche. " +
        "Ease-In: Verlassen als Aufbaukurve (Zacks & Tversky 2001). " +
        "Duration 280ms: kürzer als Enter – das Verlassende ist nicht " +
        "mehr der Fokus (Head 2016).",
      references: ["Peirce1931", "ZacksTversky2001", "Head2016", "AppleHIG", "MaterialDesign3"],
      signType: "index",
    },
  },

  {
    id: "modal-direction-backEnter",
    component: "modal",
    dimension: "direction",
    subcategory: "backEnter",
    params: {
      easing: { preset: "easeOut" },
      duration: 350,
      direction: "x",
      translateDistance: "self",
      translateFrom: "left",
      iterations: 1,
      opacity: [0, 1],
    },
    accessibility: {
      reducedMotion: "replace",
    },
    rationale: {
      short:
        "Das Modal fährt von links ein und signalisiert horizontale " +
        "Rückwärtsnavigation. Es unterscheidet sich damit von der vertikalen " +
        "Sheet-Öffnung des normalen Enter-Mappings.",
      source:
        "Index (Peirce): Direction Bias – Bewegung von links kodiert " +
        "Rückwärtsbewegung in Schriftkulturen mit Links-rechts-Leserichtung " +
        "(Ware 2012). Ease-Out: Ankommen (Zacks & Tversky 2001). " +
        "Komplementäres horizontales Navigationspaar zu modal-direction-backExit. " +
        "Duration 350ms: identisch zu enter, Richtung trägt die Bedeutung.",
      references: ["Peirce1931", "Ware2012", "ZacksTversky2001"],
      signType: "index",
    },
  },

  {
    id: "modal-direction-backExit",
    component: "modal",
    dimension: "direction",
    subcategory: "backExit",
    params: {
      easing: { preset: "easeIn" },
      duration: 280,
      direction: "x",
      translateDistance: "self",
      translateTo: "right",
      iterations: 1,
      opacity: [1, 0],
    },
    accessibility: {
      reducedMotion: "replace",
    },
    rationale: {
      short:
        "Das Modal fährt nach rechts aus. Die horizontale Bewegung kommuniziert, " +
        "dass die aktuelle Ebene im Rahmen einer Rückwärtsnavigation verlassen wird.",
      source:
        "Index (Peirce): Die Bewegung nach rechts ist nicht isoliert als " +
        "allgemeines Rückwärtszeichen zu verstehen, sondern als komplementäre " +
        "Ausfahrt zu backEnter von links innerhalb einer horizontalen " +
        "Rückwärtsnavigation. " +
        "Anders als modal-direction-exit beschreibt dieses Mapping keine " +
        "vertikale Sheet-Schließung, sondern eine horizontale Navigationsrichtung. " +
        "Ware (2012). Ease-In: Verlassen als Aufbaukurve " +
        "(Zacks & Tversky 2001). Duration 280ms: identisch zu exit.",
      references: ["Peirce1931", "Ware2012", "ZacksTversky2001"],
      signType: "index",
    },
  },

  // -------------------------------------------------------------------------
  // INPUT FIELD
  // -------------------------------------------------------------------------

  {
    id: "input-feedback-success",
    component: "input",
    dimension: "feedback",
    subcategory: "success",
    params: {
      easing: { preset: "easeOut" },
      duration: 175,
      scaleFactor: 0.02, // 1.0 → 1.02 → 1.0
      scaleMode: "pulse",
      iterations: 1,
    },
    rationale: {
      short:
        "Die minimale Ausdehnung und die unterstützende Success-Markierung " +
        "an Feld und Label signalisieren, dass die Eingabe valide ist, " +
        "ohne den Tippfluss zu unterbrechen.",
      source:
        "Ikon/Index (Peirce): leichte Expansion als Positivsignal. " +
        "Die komponentenspezifische Success-Markierung an Border und Label " +
        "wirkt als visueller Zustands-Signifier (Norman 2013) und unterstützt " +
        "das Motion-Signal, ohne selbst primärer Bewegungsparameter zu sein. " +
        "Ease-Out: Abklingen (Zacks & Tversky 2001). Duration 175ms: " +
        "kürzer als button-feedback-success (250ms), weil Eingabe aktiv " +
        "sein kann (Head 2016). scaleFactor 0.02: minimal, subtiler als Button.",
      references: ["Peirce1931", "Norman2013", "ZacksTversky2001", "Head2016"],
      signType: "icon/index",
    },
  },

  {
    id: "input-feedback-error",
    component: "input",
    dimension: "feedback",
    subcategory: "error",
    params: {
      easing: { preset: "sharp" },
      duration: 275,
      direction: "x",
      translatePx: 5,
      iterations: 1,
      keyframes: {
        values: [0, -5, 5, -5, 5, 0],
        times:  [0, 0.2, 0.4, 0.6, 0.8, 1.0],
      },
    },
    accessibility: {
      reducedMotion: "replace",
    },
    rationale: {
      short:
        "Der reduzierte Shake kommuniziert Ablehnung ohne den Eingabeinhalt " +
        "visuell zu destabilisieren. Die kürzere Duration respektiert, dass " +
        "der Nutzer möglicherweise sofort weitertippen möchte.",
      source:
        "Index (Peirce): horizontaler Shake als Ablehnungsindex (Ware 2012). " +
        "translatePx ±5px statt ±8px (Button): Eingabefeld ist breiter, " +
        "reagiert empfindlicher. Duration 275ms statt 350ms: aktive Eingabe " +
        "darf nicht blockiert wirken (Head 2016).",
      references: ["Peirce1931", "Ware2012", "Head2016"],
      signType: "index",
    },
  },

  {
    id: "input-feedback-warning",
    component: "input",
    dimension: "feedback",
    subcategory: "warning",
    params: {
      easing: { preset: "easeInOut" },
      duration: 300,
      opacity: [0, 1],
      iterations: 1,
      // Der kleine y-Offset des Helper-Texts wird komponentenspezifisch
      // im Input-Renderer umgesetzt, nicht als Bewegung des gesamten Felds.
    },
    rationale: {
      short:
        "Der Warnhinweis erscheint sanft unterhalb des Felds und kommt mit " +
        "einem kleinen vertikalen Offset zur Ruhe. So bleibt die Eingabe " +
        "unterbrechungsarm, aber die Warnung wird wahrnehmbar.",
      source:
        "Ikon (Peirce): Opacity-Transition ähnelt physikalischem Erscheinen " +
        "eines Objekts - ikonische Beziehung. Der kleine y-Offset des " +
        "Helper-Texts verstärkt dieses Erscheinen als lokales Ankommen, " +
        "ohne das Eingabefeld selbst zu verschieben. Die Farbkonvention " +
        "(Orange/Gelb) des Warnhinweises ist symbolisch, klassifiziert aber " +
        "die Farbe, nicht die Animation. Ease-In-Out: sanfte, nicht dringende " +
        "Einblendung. Duration 300ms: Eingabefluss nicht unterbrechen " +
        "(Head 2016).",
      references: ["Peirce1931", "Head2016"],
      signType: "icon",
    },
  },

  {
    id: "input-stateChange-focus",
    component: "input",
    dimension: "stateChange",
    subcategory: "focus",
    params: {
      easing: { preset: "easeOut" },
      duration: 175,
      iterations: 1,
      // Keine Bewegungsfelder: Transition über Border/Shadow im Komponenten-Styling.
    },
    rationale: {
      short:
        "Die schnelle, abklingende Transition von Fokusrahmen, Feldzustand " +
        "und Label kommuniziert sofortige Bereitschaft. Der Nutzer sieht, " +
        "dass das Feld aktiv ist, " +
        "ohne auf eine Reaktion warten zu müssen.",
      source:
        "Ikon (Peirce): Die komponentenspezifische Expansion des Fokusindikators " +
        "und die Änderung von Border/Label ähnelt einem Herantreten des aktiven " +
        "Elements. Ease-Out: Ankommen (Zacks & Tversky 2001). " +
        "Duration 175ms: Nutzer möchte sofort tippen (Head 2016). " +
        "Accessibility: Fokuszustand muss auch ohne Animation erkennbar " +
        "sein (WCAG 2.1, 2.4.7).",
      references: ["Peirce1931", "ZacksTversky2001", "Head2016", "WCAG21"],
      signType: "icon",
    },
  },

  {
    id: "input-stateChange-blur",
    component: "input",
    dimension: "stateChange",
    subcategory: "blur",
    params: {
      easing: { preset: "easeIn" },
      duration: 210,
      iterations: 1,
      // Border-Rücktransition zum Ruhezustand; im Komponenten-Styling aufgelöst.
    },
    rationale: {
      short:
        "Das Feld kehrt ruhig in seinen Ausgangszustand zurück. " +
        "Die leicht verlängerte Rücktransition macht sichtbar, dass " +
        "der Fokus passiv aus dem Feld zurücktritt.",
      source:
        "Ikon (Peirce): Rücktransition des Fokusindikators. Ease-In: " +
        "Zurücktreten als Aufbaukurve (Zacks & Tversky 2001). " +
        "Duration 210ms: langsam genug, damit die Rückbewegung in der Preview " +
        "als Zustandswechsel lesbar bleibt. Trotz längerer Dauer wirkt Blur " +
        "durch Ease-In und Rücknahme von Ring/Label passiver als Focus. " +
        "Bewusste Asymmetrie zu input-stateChange-focus (Ease-Out): " +
        "Focus ist aktives Ankommen, Blur ist passives Zurücktreten – " +
        "keine gleichwertigen Zustände (Norman 2013).",
      references: ["Peirce1931", "ZacksTversky2001", "Norman2013"],
      signType: "icon",
    },
  },

  {
    id: "input-attention-requiredField",
    component: "input",
    dimension: "attention",
    subcategory: "requiredField",
    params: {
      easing: { preset: "easeInOut" },
      duration: 450,
      scaleFactor: 0.015, // 1.0 → 1.015 → 1.0
      scaleMode: "pulse",
      iterations: 3,
    },
    accessibility: {
      reducedMotion: "shorten",
    },
    rationale: {
      short:
        "Das Feld pulsiert dreimal subtil und lenkt die Aufmerksamkeit auf " +
        "eine ausstehende Pflichtangabe. Die Wiederholung macht den Zustand " +
        "wahrnehmbar, ohne die laufende Orientierung im Formular zu unterbrechen.",
      source:
        "Index (Peirce): wiederholte Bewegung verweist auf einen ausstehenden " +
        "Zustand, der Aufmerksamkeit benötigt. Attention-Dimension: Das Signal " +
        "markiert ein konkretes Pflichtfeld als handlungsrelevant, statt eine " +
        "Eingabe inhaltlich zu bewerten. Bartram et al. (2003) zeigen, dass " +
        "einfache Bewegungsattribute Aufmerksamkeit zuverlässig lenken können. " +
        "Ease-In-Out erzeugt ein gleichmäßiges, nicht abruptes Signal; drei " +
        "Iterationen machen die Aufmerksamkeitspflicht erkennbar, ohne eine " +
        "dauerhafte Ablenkung zu erzeugen. Duration 450ms pro Zyklus bleibt " +
        "im Rahmen einer wahrnehmbaren, aber zurückhaltenden Microinteraction " +
        "(Head 2016).",
      references: ["Peirce1931", "BartramWareCalvert2003", "Head2016"],
      signType: "index",
    },
  },

  // -------------------------------------------------------------------------
  // SKELETON LOADER
  // -------------------------------------------------------------------------

  {
    id: "skeleton-attention-loading",
    component: "skeleton",
    dimension: "attention",
    subcategory: "loading",
    params: {
      easing: { preset: "linear" },
      duration: 1500,
      direction: "x",
      trackFactor: 1.0, // volle komponenteneigene Shimmer-Strecke
      iterations: Infinity,
    },
    accessibility: {
      reducedMotion: "static",
    },
    rationale: {
      short:
        "Der Shimmer bewegt sich mit konstanter Geschwindigkeit von links " +
        "nach rechts über den Platzhalter. Es besteht kein natürlicher " +
        "Zusammenhang zwischen dieser Bewegung und dem Ladevorgang. Die " +
        "Bedeutung entsteht ausschließlich durch Konvention, die sich " +
        "durch den verbreiteten Einsatz in digitalen Interfaces etabliert hat.",
      source:
        "Symbol (Peirce): Die Shimmer-Animation hat keine ikonische Ähnlichkeit " +
        "mit einem Ladeprozess und keine indexikalische Assoziation damit. " +
        "Die Bedeutung ist rein konventionell (Chandler 2007, S. 36). " +
        "Lineares Easing: konstante Geschwindigkeit repräsentiert einen " +
        "kontinuierlichen Prozess ohne identifizierbare Phasenstruktur " +
        "(Zacks & Tversky 2001). Linear ist der einzige semantisch " +
        "begründete Einsatz dieses Presets im Framework. Accessibility: " +
        "Der endlose Shimmer muss bei prefers-reduced-motion reduzierbar oder " +
        "durch einen statischen Ladezustand ersetzbar sein (WCAG 2.1 SC 2.3.3).",
      references: ["Peirce1931", "Chandler2007", "ZacksTversky2001", "WCAG21"],
      signType: "symbol",
    },
  },

  {
    id: "skeleton-attention-resolved",
    component: "skeleton",
    dimension: "attention",
    subcategory: "resolved",
    params: {
      easing: { preset: "easeOut" },
      duration: 350,
      iterations: 1,
      opacity: [1, 0],
    },
    rationale: {
      short:
        "Der Skeleton blendet aus, sobald der Inhalt eintrifft. Das Ausblenden " +
        "ähnelt dem physikalischen Verschwinden eines Platzhalters und " +
        "signalisiert, dass der Ladeprozess abgeschlossen ist.",
      source:
        "Ikon (Peirce): Opazitätsreduktion ähnelt physikalischem Verblassen " +
        "und Verschwinden (Chandler 2007). Ease-Out: abklingende Kurve als " +
        "Signal für Abschluss (Zacks & Tversky 2001). Duration 350ms: " +
        "wahrnehmbar, nicht abrupt. Als Ikon klassifiziert, nicht als Symbol: " +
        "Das Ausblenden hat eine natürliche, nicht-konventionelle Grundlage.",
      references: ["Peirce1931", "Chandler2007", "ZacksTversky2001"],
      signType: "icon",
    },
  },
];

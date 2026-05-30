/**
 * Semantic Motion Framework – Rationale-Review-Kopie
 *
 * Diese Datei enthält nur Mapping-Einträge, bei denen rationale.short,
 * rationale.source, rationale.references oder signType im Review angepasst
 * wurden. Die produktive Mapping-Datenbank bleibt
 * prototyp/src/data/mappings.ts.
 */

import type { MappingDatabase } from "../framework/types";

export const mappings: MappingDatabase = [
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
      // REVIEW: "universell" war theoretisch zu stark. Die Begründung ist
      // indexikalisch und kulturell/assoziativ tragfähig, aber nicht wirklich
      // universal. Deshalb wird die Nutzerformulierung vorsichtiger gefasst.
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
    id: "button-attention-persistent",
    component: "button",
    dimension: "attention",
    subcategory: "persistent",
    params: {
      easing: { preset: "easeInOut" },
      duration: 1000,
      scaleFactor: 0.04, // 1.0 -> 1.04 -> 1.0
      iterations: Infinity,
    },
    rationale: {
      // REVIEW: Unendliche Animationen brauchen in der wissenschaftlichen
      // Begründung einen Accessibility-Hinweis. Der Mapping-Wert bleibt
      // unverändert, aber WCAG21 wird als Referenz ergänzt.
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

  {
    id: "toast-feedback-warning",
    component: "toast",
    dimension: "feedback",
    subcategory: "warning",
    params: {
      easing: { preset: "easeInOut" },
      duration: 420,
      delay: 80,
      direction: "y",
      translateDistance: "self",
      translateFrom: "bottom",
      iterations: 1,
      opacity: [0, 1],
      // Mehrphasige Animation: y-Einfahrt plus sekundärer y-Nudge.
      // Aktuell als gezielter Renderer-Sonderfall umgesetzt;
      // späterer Kandidat für ein generisches motionPhases-Modell.
    },
    rationale: {
      // REVIEW: Durch den ergänzten y-Nudge trägt nicht mehr nur die ruhige
      // Einfahrt die Warnsemantik. Bartram wird ergänzt, weil der Nudge als
      // moderates Bewegungsattribut Aufmerksamkeit erzeugt, ohne Error-Shake
      // oder Success-Spring zu kopieren.
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
      direction: "y",
      translateDistance: "self",
      translateFrom: "bottom",
      iterations: 1,
      opacity: [0, 1],
      // Mehrphasige Animation: y-Einfahrt plus sekundäre Scale-Impulse.
      // Aktuell als gezielter Renderer-Sonderfall umgesetzt;
      // späterer Kandidat für ein generisches motionPhases-Modell.
    },
    rationale: {
      // REVIEW: Die neue Scale-Pulse-Sequenz ist ein explizites
      // Bewegungsattribut. Die Begründung wird stärker an präattentive
      // Aufmerksamkeitslenkung und Abgrenzung zu Feedback gekoppelt.
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
    rationale: {
      short:
        "Das Modal fährt wie ein Sheet nach unten aus. Die komplementäre " +
        "Richtung zur Einfahrt kommuniziert, dass diese Oberfläche geschlossen wird.",
      source:
        // REVIEW: Sheet-Exit ist die komplementäre Surface-Bewegung zum
        // Sheet-Enter. Deshalb werden Apple HIG und Material Design 3 analog
        // zum Enter-Mapping als technische Designsystem-Referenzen ergänzt.
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
    rationale: {
      short:
        "Das Modal fährt nach rechts aus. Die horizontale Bewegung kommuniziert, " +
        "dass die aktuelle Ebene im Rahmen einer Rückwärtsnavigation verlassen wird.",
      source:
        // REVIEW: "rechts = rückwärts" wäre isoliert missverständlich. Die
        // Richtung wird hier nur innerhalb des horizontalen Back-Paares als
        // Rückwärtsnavigation lesbar, komplementär zu backEnter von links.
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
      // REVIEW: Focus/Blur werden aktuell komponentenspezifisch visualisiert.
      // Die Rationale muss deshalb klar sagen, dass der Fokusindikator und
      // nicht ein generisches Bewegungsfeld im Mapping animiert wird.
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
      // REVIEW: Nach der Parameteränderung auf 210ms war "kürzer gegenüber
      // Focus" nicht mehr korrekt. Die Rationale wird auf ruhige, bewusst
      // wahrnehmbare Rücktransition umgestellt.
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
      easing: { preset: "sharp" },
      duration: 325,
      direction: "x",
      translatePx: 6,
      iterations: 1,
      keyframes: {
        values: [0, -6, 6, -6, 6, 0],
        times:  [0, 0.2, 0.4, 0.6, 0.8, 1.0],
      },
    },
    rationale: {
      // REVIEW: RequiredField kann oberflächlich wie Feedback wirken, weil es
      // nach Submit ausgelöst wird. Die Rationale grenzt es stärker als
      // feldbezogene Aufmerksamkeit ab und ergänzt Head für den Submit-/Flow-Kontext.
      short:
        "Der Shake signalisiert, dass dieses Feld ausgefüllt werden muss, " +
        "bevor das Formular abgesendet werden kann. Die Bewegung zieht " +
        "die Aufmerksamkeit auf das Feld, ohne eine Fehlermeldung zu überlagern.",
      source:
        "Index (Peirce): horizontaler Shake als Ablehnungsindex (Ware 2012). " +
        "Attention statt allgemeines Feedback: Nach einer fehlgeschlagenen " +
        "Formularabgabe fordert nicht die gesamte Aktion Bewertung ein, sondern " +
        "ein konkretes Feld Aufmerksamkeit und Korrektur. " +
        "translatePx ±6px: etwas mehr als input-feedback-error (±5px), " +
        "weil dieser Shake von einer Submit-Aktion ausgelöst wird. " +
        "Duration 325ms: zwischen input-feedback-error (275ms) und " +
        "button-feedback-error (350ms), damit das Feld auffällt, ohne den " +
        "Formularfluss übermäßig zu blockieren (Head 2016).",
      references: ["Peirce1931", "Ware2012", "Head2016"],
      signType: "index",
    },
  },

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
    rationale: {
      // REVIEW: Der Shimmer läuft unendlich. Wie beim persistenten Button
      // braucht die wissenschaftliche Begründung einen Accessibility-Hinweis
      // und WCAG21 als Referenz.
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
];

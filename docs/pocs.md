# Proof of Concepts

---

## Zweck der POCs

Die POCs validieren die technischen und konzeptuellen Grundlagen des Frameworks und Editors, bevor die vollständige Implementierung beginnt. Jeder POC hat ein klar abgegrenztes Ziel und definierte Erfolgskriterien. Ein POC gilt als abgeschlossen, wenn alle Erfolgskriterien erfüllt sind, nicht wenn der Code "irgendwie läuft".

Die POCs bauen aufeinander auf. POC 2 setzt POC 1 voraus, POC 3 setzt POC 2 voraus, und so weiter. Jeder POC landet in einem eigenen Ordner unter `/pocs/` im Repository und wird nicht in die spätere Editor-Implementierung kopiert, sondern als Referenz behalten.

---

## POC 1: Basis-Animationssystem

**Ordner:** `/pocs/poc-01-animation-system/`  
**Geplant:** Woche 4 

### Ziel

Validieren, dass Framer Motion sich als Animationssystem für semantisch differenzierte UI-Animationen eignet und dass Easing-Kurven als semantische Träger wahrnehmbar unterschiedlich wirken.

### Aufgaben

- React-Komponente für einen Button bauen
- Mindestens zwei semantisch unterschiedliche Animationen implementieren: Success-Feedback (Scale Up + Ease Out) und Error-Feedback (Horizontal Shake)
- Easing-Kurven manuell definieren, keine Bibliotheks-Defaults verwenden
- Neben der Animationsvorschau eine einfache semantische Begründung als Text anzeigen
- Beide Animationen per Klick auslösbar machen

### Technische Entscheidungen die hier getroffen werden

- Framer Motion Varianten-System vs. direkte `animate`-Props: Welches Modell ist für das spätere Mapping-System besser geeignet?
- Easing als `cubicBezier`-Funktion oder als benannte Kurve (z.B. `easeOut`): Wie granular müssen die Werte kodiert werden?
- Wie wird die Animation wiederholbar ausgelöst, ohne die Komponente neu zu mounten?

### Erfolgskriterien

- Success- und Error-Animation sind visuell klar unterscheidbar
- Die Easing-Kurve ist ein expliziter Parameter im Code, kein Default
- Ein Betrachter ohne Kontext versteht anhand der Begründungstexte, warum die Animationen unterschiedlich sind
- Kein Build-Fehler, keine Konsolen-Warnings

### Abgrenzung

Kein Mapping-System, keine Datenbankanbindung, keine dynamische Auswahl. Nur hardcodierte Animationswerte und hardcodierte Begründungstexte.

---

## POC 2: Mapping-Datenbank

**Ordner:** `/pocs/poc-02-mapping-db/`  
**Geplant:** Woche 5

### Ziel

Validieren, dass die theoretisch hergeleitete Taxonomie in eine typsichere TypeScript-Datenstruktur überführt werden kann und dass die Klassifikationslogik (Eingabe: Komponente + Bedeutungsdimension, Ausgabe: Animationsparameter) korrekt funktioniert.

### Aufgaben

- TypeScript-Interfaces für alle Datenebenen definieren: Komponente, Bedeutungsdimension, Subkategorie, Animationsparameter, Begründungstext
- Erste vollständige Mapping-Einträge für den späteren Framework-Scope befüllen
- Lookup-Funktion implementieren: `getMapping(component, dimension, subcategory)` gibt einen Mapping-Eintrag zurück
- Unit-Tests für die Lookup-Funktion schreiben: alle gültigen Kombinationen testen, ungültige Kombinationen abfangen

### Datenstruktur (Entwurf)

```typescript
type ComponentId = 'button' | 'toggle' | 'toast' | 'modal' | 'input' | 'skeleton'

type Dimension = 'feedback' | 'stateChange' | 'direction' | 'hierarchy' | 'attention'

type FeedbackSubcategory = 'success' | 'error' | 'warning'
type DirectionSubcategory = 'enter' | 'exit' | 'backEnter' | 'backExit'

interface AnimationParams {
  easing: number[]       // cubicBezier [x1, y1, x2, y2]
  duration: number       // in Millisekunden
  direction?: 'x' | 'y'
  amplitude?: number     // Verschiebung in px oder Skalierungsfaktor
  iterations?: number
}

interface MappingEntry {
  id: string
  component: ComponentId
  dimension: Dimension
  subcategory?: string
  params: AnimationParams
  rationale: {
    short: string        // Nutzergerichteter Begründungstext (Editor-Sprache)
    source: string       // Wissenschaftliche Detailbegründung
    references: string[] // Maschinenlesbare Quellenreferenzen
    signType: 'icon' | 'index' | 'symbol'  // Peirce-Zeichentyp
  }
}
```

### Technische Entscheidungen die hier getroffen werden

- Wird die Datenbank als statisches JSON, als TypeScript-Objekt oder als separate Datei pro Komponente strukturiert?
- Wie werden fehlende Kombinationen behandelt: Fallback-Animation, Fehler oder leere Rückgabe?
- Wie wird sichergestellt, dass jeder Eintrag eine Quellenangabe hat (NFA-07)?

### Erfolgskriterien

- Alle TypeScript-Interfaces sind vollständig und fehlerfrei typisiert
- Die Mapping-Datenbank enthält konsistente Einträge für den definierten Framework-Scope
- Alle Unit-Tests laufen durch
- Eine ungültige Kombination (z.B. nicht existierende Dimension) wird sauber abgefangen
- Jeder Mapping-Eintrag enthält `rationale.source` und `rationale.references` zur wissenschaftlichen Nachvollziehbarkeit

### Abgrenzung

Keine UI, keine Preview. Nur die Datenstruktur und Lookup-Logik. Nicht alle Komponenten müssen in diesem POC bereits final ausgearbeitet sein.

---

## POC 3: Echtzeit-Preview-Komponente

**Ordner:** `/pocs/poc-03-preview/`  
**Geplant:** Woche 5

### Ziel

Validieren, dass die Mapping-Datenbank aus POC 2 direkt als Animationsquelle für eine Preview-Komponente genutzt werden kann und dass die Animation bei jeder Auswahländerung korrekt und wiederholbar ausgelöst wird.

### Aufgaben

- Preview-Komponenten für Button, Modal und Toast bauen
- Jede Komponente nimmt einen `MappingEntry` als Prop entgegen und spielt die dort definierten `AnimationParams` ab
- Auswahl-UI bauen: Dropdown oder Button-Gruppe für Komponente und Bedeutungsdimension, direkt aus der Mapping-Datenbank generiert (keine hardcodierten Labels)
- Animation wird bei jeder Änderung der Auswahl automatisch neu ausgelöst
- Wiederholungs-Button, der die Animation nochmals abspielt ohne Seitenreload

### Technische Entscheidungen die hier getroffen werden

- Wie wird der Animation-State zurückgesetzt, damit sie erneut abgespielt werden kann? (`key`-Trick in React vs. imperative Framer Motion Controls)
- Wie wird sichergestellt, dass bei sehr schnellen Auswahländerungen keine Animationen übereinander laufen?
- Müssen die Preview-Komponenten für die sechs Framework-Komponenten identisch strukturiert sein, oder gibt es komponentenspezifische Besonderheiten?

### Erfolgskriterien

- Auswahl einer neuen Kombination löst die Animation sofort aus
- Wiederholungs-Button funktioniert zuverlässig
- Alle drei Komponenten (Button, Modal, Toast) spielen ihre Animation korrekt ab
- Die Animationsparameter kommen ausschließlich aus der Mapping-Datenbank, keine hardcodierten Werte in den Preview-Komponenten

### Abgrenzung

Kein Code-Export, kein vollständiges Editor-UI, keine Begründungstexte im UI (nur die Animation und die Auswahl). Das ist bewusst: Die Preview-Logik wird isoliert validiert, bevor sie in einen größeren Kontext eingebettet wird.

---

## POC 4: Code-Export

**Ordner:** `/pocs/poc-04-export/`  
**Geplant:** Woche 6

### Ziel

Validieren, dass aus den Mapping-Parametern syntaktisch korrekter, direkt nutzbarer Animations-Code generiert werden kann und dass der generierte Code die semantische Begründung als Kommentar enthält.

### Aufgaben

- Generator-Funktion für Framer-Motion-Output bauen: `generateFramerMotionCode(entry: MappingEntry): string`
- Generator-Funktion für CSS-Animations-Output bauen: `generateCSSCode(entry: MappingEntry): string`
- Inline-Kommentare im generierten Code: Parameter werden mit ihrer semantischen Bedeutung kommentiert
- Syntax-Highlighting im UI (einfaches `<pre>`-Tag mit Styling reicht)
- Copy-to-Clipboard-Button mit visuellem Feedback (kurze Bestätigungsanimation oder Textänderung)
- Framer-Motion-Output wird bei einem existierenden React-Projekt-Setup getestet (manuell, kein automatisierter Test)

### Beispiel-Output (Framer Motion)

```typescript
// Semantic Motion Framework - Error Feedback / Button
// Zeichentyp: Index (assoziativ: Ablehnung durch horizontale Bewegung)
// Quelle: Ware (2012), Direction Bias

const errorFeedback = {
  animate: {
    x: [0, -8, 8, -8, 8, 0],   // Amplitude: 8px - wahrnehmbar, nicht störend
  },
  transition: {
    duration: 0.4,               // 400ms - ausreichend für Fehlerwahrnehmung
    ease: [0.36, 0.07, 0.19, 0.97], // cubicBezier - scharfe, abrupte Bewegung
    times: [0, 0.2, 0.4, 0.6, 0.8, 1],
  },
}
```

### Beispiel-Output (CSS)

```css
/* Semantic Motion Framework - Error Feedback / Button */
/* Zeichentyp: Index | Quelle: Ware (2012), Direction Bias */

@keyframes smf-button-error {
  0%   { transform: translateX(0); }
  20%  { transform: translateX(-8px); }
  40%  { transform: translateX(8px); }
  60%  { transform: translateX(-8px); }
  80%  { transform: translateX(8px); }
  100% { transform: translateX(0); }
}

.smf-button-error {
  animation: smf-button-error 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}
```

### Technische Entscheidungen die hier getroffen werden

- Werden Framer-Motion- und CSS-Output aus denselben `AnimationParams` generiert oder haben sie separate Parametersets?
- Wie werden komplexe Animationen (z.B. Keyframe-Sequenzen beim Shake) in der `AnimationParams`-Struktur aus POC 2 repräsentiert? Gegebenenfalls muss das Datenmodell angepasst werden.
- Wie wird die Korrektheit des generierten Codes sichergestellt? (Manueller Test oder einfacher Syntax-Check)

### Erfolgskriterien

- Generierter Framer-Motion-Code lässt sich ohne Änderungen in ein React-Projekt einfügen und funktioniert
- Generierter CSS-Code ist syntaktisch valide
- Jeder Parameter im generierten Code hat einen Kommentar
- Copy-to-Clipboard funktioniert in Chrome und Firefox
- Framer-Motion- und CSS-Output sind aus denselben Mapping-Parametern generiert

### Abgrenzung

Kein vollständiges Editor-UI. Der Export wird als isolierte Funktion validiert, die später in den Editor integriert wird.

---

## POC 5: Minimale End-to-End-Integration

**Ordner:** `/pocs/poc-05-integration/`  
**Geplant:** Woche 6

### Ziel

Validieren, dass Mapping-Datenbank, Preview-Komponente und Code-Export als zusammenhängendes System funktionieren. Das ist der erste Moment, in dem die vollständige Nutzungskette (Auswahl → Begründung → Preview → Export) durchläuft, auch wenn nur für eine einzige Komponente und zwei semantische Mappings.

Dieser POC beantwortet die Frage, die keiner der anderen POCs beantwortet: Funktioniert das Konzept als Ganzes?

### Aufgaben

- Einfaches Single-Page-Layout bauen mit: Komponentenauswahl (nur Button), semantische Mapping-Auswahl (nur Feedback/Success und Feedback/Error), Echtzeit-Preview aus POC 3, Semantische Begründung aus `rationale.short`, Code-Export (Framer Motion) aus POC 4 mit Copy-to-Clipboard
- Alle Teile kommen aus den bestehenden POC-Implementierungen, kein neuer Code außer dem Layout-Wrapper
- Das Layout muss nicht schön sein, aber es muss die Nutzungskette vollständig abbilden

### Technische Entscheidungen die hier getroffen werden

- Wie wird der State zwischen Auswahl, Preview und Export synchronisiert? (Lifted State, Context oder einfache Props)
- Gibt es Performance-Probleme bei schnellen Auswahländerungen, die Preview und Export gleichzeitig aktualisieren?
- Welche Architekturprobleme werden sichtbar, die in den isolierten POCs nicht aufgefallen sind?

### Erfolgskriterien

- Die vollständige Kette läuft durch: Auswahl ändern → Preview spielt Animation ab → Begründungstext aktualisiert sich → Code-Export zeigt korrekten Code
- Kein State-Synchronisierungsproblem zwischen den drei Bereichen
- Copy-to-Clipboard kopiert den Code, der zur aktuellen Auswahl passt
- Der POC identifiziert mindestens eine Architekturanpassung, die für den vollständigen Editor notwendig ist (dokumentiert im POC-README)

### Abgrenzung

Nur Button, nur zwei semantische Mappings (Success und Error). Keine Toggle, kein Modal, kein Toast in diesem POC. Keine CSS-Export-Option. Kein responsives Layout. Ziel ist Funktionsnachweis, nicht Vollständigkeit.

---

## Zeitplan

| POC | Woche | Abhängigkeit |
|---|---|---|
| POC 1: Basis-Animationssystem | Woche 4 | keine |
| POC 2: Mapping-Datenbank | Woche 5 | POC 1 (Animationsparameter-Verständnis) |
| POC 3: Echtzeit-Preview | Woche 5 | POC 2 (Mapping-Datenbank) |
| POC 4: Code-Export | Woche 6 | POC 2 (Mapping-Datenbank) |
| POC 5: End-to-End-Integration | Woche 6 | POC 2, POC 3, POC 4 |

---

## Übergabe in die Editor-Entwicklung

Nach Abschluss aller fünf POCs beginnt die vollständige Editor-Implementierung in Woche 6 (Kern-UI) und Woche 7 (Fertigstellung). Die POCs werden dabei nicht weggeworfen, sondern als Referenzimplementierung behalten. Der Editor übernimmt die validierten Strukturen direkt:

- Mapping-Datenbank aus POC 2 wird in `/src/data/` übernommen
- Preview-Komponenten aus POC 3 werden in `/src/components/preview/` übernommen
- Export-Generator aus POC 4 wird in `/src/utils/export/` übernommen
- POC 5 ist die direkte Vorläuferversion des Editor-Layouts

Architekturprobleme, die in POC 5 identifiziert werden, fließen als Entscheidungen in die Editor-Implementierung ein und werden im `/pocs/poc-05-integration/README.md` dokumentiert.

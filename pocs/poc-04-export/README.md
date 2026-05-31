# POC 04 - Code-Export

Setup für den vierten Proof of Concept aus `docs/pocs.md`.

## Ziel

Dieses Verzeichnis validiert Framer-Motion- und CSS-Code-Export aus Mapping-Parametern.

## Scope

Aktueller Stand: implementierter Export-POC mit Generator-Funktionen, Tests und kleiner Export-UI.

Enthalten:

- Generator-Funktionen
- Syntax- oder Snapshot-Tests
- Syntax-Highlighting
- Copy-to-Clipboard-UI
- direkte Anbindung an `prototyp/src/data/mappings.ts`
- Framer-Motion-Export aus `AnimationParams`
- CSS-Export aus denselben `AnimationParams`
- semantische Kommentare mit Bedeutung, Zeichentyp und Quelle
- Sonderbehandlung für Spring-Easing im Framer-Motion-Export
- CSS-Hinweis bei Spring-Mappings, weil CSS keine native Spring-Physik unterstützt
- generischer Export von `motionPhases` für mehrphasige Animationen

Bewusst nicht enthalten:

- vollständiges Editor-UI
- produktionsreife Syntax-Highlighting-Bibliothek
- automatische Ausführung des generierten Framer-Motion-Codes

## Befehle

```bash
npm install
npm run dev
npm run build
npm run lint
npm run test:run
```

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

### Ergebnis

- `generateFramerMotionCode(entry)` erzeugt Framer-Motion-Code pro Mapping-Eintrag.
- `generateCSSCode(entry)` erzeugt CSS-Keyframes und eine passende CSS-Klasse.
- `generateExportBundle(entry)` gibt beide Exportvarianten gemeinsam zurück.
- Framer Motion nutzt bei Spring-Mappings `transition.type = "spring"` und `springConfig`.
- CSS nutzt bei Spring-Mappings eine kommentierte Approximation.
- Mehrphasige Mappings werden nicht als flache `direction`/`keyframes`-Fälle exportiert, sondern über `motionPhases`.
- Tests validieren generellen Export, Button-Error-Keyframes, Spring-Export und mehrphasige Toast-Sequenzen.

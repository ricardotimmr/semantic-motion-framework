# POC 03 - Echtzeit-Preview-Komponente

Setup für den dritten Proof of Concept aus `docs/pocs.md`.

## Ziel

Dieses Verzeichnis validiert eine Preview-Komponente, die Mapping-Einträge als Animationsquelle nutzt.

## Scope

Aktueller Stand: implementierter Preview-POC für alle sieben Framework-Komponenten.

Enthalten:

- Preview-Komponenten
- Auswahl-UI
- Wiederholungslogik
- direkte Anbindung an die aktuelle Mapping-Datenbank aus `prototyp/src/data/mappings.ts`
- Motion-Adapter zur Übersetzung von `AnimationParams` in Framer-Motion-Controls
- generische Verarbeitung von `motionPhases` für mehrphasige Animationen

Bewusst nicht enthalten:

- Code-Export
- vollständiges Editor-UI
- Begründungstexte als eigener UI-Bereich

## Befehle

```bash
npm install
npm run dev
npm run build
npm run lint
```

### Ziel

Validieren, dass die Mapping-Datenbank aus POC 2 direkt als Animationsquelle für eine Preview-Komponente genutzt werden kann und dass die Animation bei jeder Auswahländerung korrekt und wiederholbar ausgelöst wird.

### Aufgaben

- Preview-Komponenten für alle Framework-Komponenten bauen
- Jede Komponente nimmt einen `MappingEntry` als Prop entgegen und spielt die dort definierten `AnimationParams` ab
- Auswahl-UI bauen: Dropdown oder Button-Gruppe für Komponente und Bedeutungsdimension, direkt aus der Mapping-Datenbank generiert (keine hardcodierten Labels)
- Animation wird bei jeder Änderung der Auswahl automatisch neu ausgelöst
- Wiederholungs-Button, der die Animation nochmals abspielt ohne Seitenreload

### Technische Entscheidungen die hier getroffen werden

- Wie wird der Animation-State zurückgesetzt, damit sie erneut abgespielt werden kann? (`key`-Trick in React vs. imperative Framer Motion Controls)
- Wie wird sichergestellt, dass bei sehr schnellen Auswahländerungen keine Animationen übereinander laufen?
- Müssen die Preview-Komponenten für die sieben Framework-Komponenten identisch strukturiert sein, oder gibt es komponentenspezifische Besonderheiten?

### Erfolgskriterien

- Auswahl einer neuen Kombination löst die Animation sofort aus
- Wiederholungs-Button funktioniert zuverlässig
- Alle sieben Framework-Komponenten spielen ihre Animation korrekt ab
- Die Animationsparameter kommen ausschließlich aus der Mapping-Datenbank, keine hardcodierten Werte in den Preview-Komponenten

### Abgrenzung

Kein Code-Export, kein vollständiges Editor-UI, keine Begründungstexte im UI (nur die Animation und die Auswahl). Das ist bewusst: Die Preview-Logik wird isoliert validiert, bevor sie in einen größeren Kontext eingebettet wird.

### Ergebnis

- Auswahloptionen werden aus der Mapping-Datenbank generiert.
- Button, Toggle, Toast, Modal, Card, Input und Skeleton erhalten jeweils einen `MappingEntry` als Animationsquelle.
- Bei jeder Auswahländerung wird die laufende Animation gestoppt, zurückgesetzt und neu abgespielt.
- Der Replay-Button spielt dieselbe Mapping-Animation erneut ab, ohne Seitenreload.
- Die Preview nutzt imperative Framer-Motion-Controls statt React-Remount per `key`.
- Spring-Easing wird über `springConfig` behandelt.
- Mehrphasige Toast-Mappings werden über `motionPhases` generisch gerendert.
- Card-Hierarchie wird als relationaler Stack dargestellt: Die betroffene Card
  nutzt die Mapping-Parameter, eine zweite Card zeigt nur die
  Renderer-Choreografie des Prioritätswechsels.

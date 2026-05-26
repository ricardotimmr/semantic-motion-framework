# POC 01 - Basis-Animationssystem

Setup fuer den ersten Proof of Concept aus `docs/pocs.md`.

## Ziel

Dieses Verzeichnis ist vorbereitet fuer die Validierung eines einfachen semantischen Animationssystems mit React, Vite, TypeScript und Framer Motion.

## Scope

Aktueller Stand: nur Projekt-Setup.

Noch nicht enthalten:

- React-Komponenten
- Animationslogik
- semantische Begruendungstexte
- Preview-UI

## Befehle

```bash
npm install
npm run dev
npm run build
npm run lint
```
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
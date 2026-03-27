# semantic-motion-ui

> **Bachelor Arbeit · HfG / FH · 2026**  
> heoriegestütztes Framework und interaktiver Editor zur semantischen Klassifikation von UI-Animationen, umgesetzt mit React, TypeScript & Framer Motion.

---

## Über das Projekt

Animationen in modernen User Interfaces werden überwiegend intuitiv oder rein ästhetisch eingesetzt. Große Design-Systeme wie Material Design 3, Apple HIG oder IBM Carbon beschreiben *welche* Animationen verwendet werden sollen — liefern aber keine theoretisch begründete Antwort darauf, *warum* eine bestimmte Bewegung eine bestimmte Bedeutung transportiert.

Diese Arbeit entwickelt ein theorie-gestütztes Framework, das UI-Animationen nach ihrer **semantischen Bedeutung** klassifiziert — und demonstriert dieses Framework in einem interaktiven Prototyp: dem **Semantic Motion Editor**.

---

## Theoretische Grundlagen

Das Framework stützt sich auf drei Theoriebereiche:

| Bereich | Konzepte | Schlüsselquellen |
|---|---|---|
| **Semiotik** | Ikon, Index, Symbol (Peirce); Signifikant / Signifikat (Saussure) | Peirce, C. S. (1931). *Collected Papers*. Harvard University Press. |
| **Wahrnehmungspsychologie** | Präattentive Verarbeitung, Direction Bias, Object Continuity | Treisman & Gelade (1980). *A feature-integration theory of attention.* Cognitive Psychology. |
| **Motion Design** | Disney-Prinzipien (Easing, Anticipation, Followthrough), Timing als semantischer Träger | Johnston & Thomas (1981). *The Illusion of Life.* Abbeville Press. |

---

## Prototyp: Semantic Motion Editor

Ein browserbasiertes Tool, das das Framework direkt implementiert:

- **Komponente wählen** — Button, Toggle, Toast, Modal
- **Motion-Pattern auswählen** — aus der Mapping-Datenbank des Frameworks
- **Animation in Echtzeit erleben** — mit semantischer Begründung
- **Code exportieren** — als Framer Motion oder CSS

Kern des Tools ist eine strukturierte **Mapping-Datenbank**, die Animationsparameter auf semantische Bedeutungsdimensionen abbildet (Feedback, State Change, Direction, Hierarchie, Aufmerksamkeit).

---

## Tech Stack

| | |
|---|---|
| **Framework** | React + Vite |
| **Sprache** | TypeScript |
| **Animation** | Framer Motion |
| **Styling** | TBD |

---

## Projektstruktur

```
semantic-motion-ui/
├── src/
│   ├── framework/          # Mapping-Datenbank & Klassifikationslogik
│   ├── components/         # UI-Komponenten (Button, Modal, Toast, …)
│   ├── editor/             # Semantic Motion Editor (Hauptprototyp)
│   └── theory/             # Theoretische Dokumentation als TS-Typen
├── docs/                   # Begleitende Dokumentation
└── README.md
```

> ⚠️ Struktur vorläufig — wird im Verlauf der Arbeit angepasst.

---

## Abgrenzung

Diese Arbeit führt **keine empirische Nutzerstudie** durch. Der wissenschaftliche Beitrag liegt in der theoretischen Herleitung und Systematisierung des Frameworks. Der Prototyp ist **Demonstration**, nicht Evaluation.

---

## Status

🚧 **In Entwicklung** — Bachelor Thesis, voraussichtlicher Abschluss: 2025

---

## Autor

**Ricardo Timm**  
Bachelor Thesis · TH Köln · Betreuer: Prof. Christian Noss

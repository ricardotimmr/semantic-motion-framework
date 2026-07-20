# Semantic Motion Framework

> Bachelorarbeit 2026  
> **Semantic Motion in Web UIs: Konzeption und prototypische Umsetzung eines regelbasierten Frameworks für Microinteractions und UI-Verhalten in Web-Interfaces**

Theoriegestütztes Framework zur semantischen Klassifikation von UI-Animationen und prototypischer Editor zur Operationalisierung des Frameworks.

## Kurzbeschreibung

UI-Animationen werden in der Praxis häufig intuitiv, ästhetisch oder anhand bestehender Design-Systeme eingesetzt. Systeme wie Material Design, Apple HIG oder IBM Carbon beschreiben sehr gut, wie Animationen gestaltet werden können. Sie erklären aber nur begrenzt, warum eine bestimmte Bewegung eine bestimmte Bedeutung transportiert.

Das Semantic Motion Framework setzt genau an dieser Stelle an. Es klassifiziert UI-Animationen nicht nur nach technischen Parametern, sondern nach ihrer semantischen Funktion. Animationen werden als Bedeutungsträger verstanden, die Feedback, Zustandswechsel, Richtung, Hierarchie oder Aufmerksamkeit kommunizieren können.

Der Prototyp demonstriert das Framework in einem browserbasierten Editor. Ziel ist nicht ein produktionsreifes Tool, sondern ein nachvollziehbares Demonstrationsartefakt für die Bachelorarbeit.

## Forschungsrahmen

Die Arbeit verbindet drei theoretische Ebenen:

| Bereich | Konzepte | Schlüsselquellen |
|---|---|---|
| Semiotik | Ikon, Index, Symbol nach Peirce; kulturelle Konvention von Zeichen | Peirce, C. S. (1931). *Collected Papers*. Harvard University Press. |
| Wahrnehmungspsychologie | Präattentive Verarbeitung, Aufmerksamkeit, Direction Bias, Ereignisstruktur | Treisman & Gelade (1980). *A feature-integration theory of attention.* Cognitive Psychology. |
| Motion Design | Easing, Timing, Anticipation, Slow In, Slow Out als semantische Gestaltungsparameter | Thomas & Johnston (1981). *The Illusion of Life.* Abbeville Press. |

Die zentrale Idee ist, dass Animationsparameter nicht nur ästhetische Entscheidungen sind. Sie sollen semantisch kongruent zur Bedeutung gewählt werden, die eine UI-Komponente kommunizieren soll.

## Aktueller Framework-Scope

Der aktuelle Framework-Kern umfasst:

- 6 UI-Komponenten: Button, Toggle, Toast, Modal, Input und Skeleton
- 5 Bedeutungsdimensionen: Feedback, State Change, Direction, Hierarchy und Attention
- 24 Mapping-Einträge
- Peirce-Klassifikation pro Mapping
- nutzergerichtete Kurzbegründung und wissenschaftliche Detailbegründung
- semantischer Möglichkeitsraum mit bildhaften Lesarten, angrenzenden Bedeutungen und Abgrenzungen
- Visual-Cue-Glyphs für die bildhafte Lesart im Editor
- maschinenlesbare Animationsparameter
- Reduced-Motion-Metadaten für relevante Mappings
- zentrale Validierung der Mapping-Datenbank

Die Mapping-Datenbank liegt in:

```text
prototyp/src/data/mappings.ts
```

Die Typen und Framework-Regeln liegen in:

```text
prototyp/src/framework/types.ts
prototyp/src/framework/classifier.ts
prototyp/src/framework/validation.ts
```

Die Visual-Cue-Glyphs für den semantischen Möglichkeitsraum liegen in:

```text
prototyp/src/editor/visual-cues/
```

## Datenmodell

Ein Mapping verbindet eine UI-Komponente, eine Bedeutungsdimension und eine Subkategorie mit konkreten Animationsparametern.

Beispielhaft modelliert das Framework:

- Easing-Presets und Spring-Konfigurationen
- Duration und Delay
- Translation über Pixelwerte oder größenabhängige Distanzen
- Scale über `scaleFactor` und `scaleMode`
- Opacity als unterstützenden Sichtbarkeitsparameter
- wiederholte Animationen über `iterations`
- mehrphasige Animationen über `motionPhases`
- Reduced-Motion-Strategien über Accessibility-Metadaten
- semantische Kontextdaten über `semanticContext`

Mehrphasige Animationen werden explizit über `motionPhases` modelliert. Das betrifft zum Beispiel Toast-Animationen, die zuerst einfahren und danach ein sekundäres Signal wie Shake, Nudge oder Pulse zeigen.

Der semantische Möglichkeitsraum ergänzt die primären Mappings um eine Reflexionsebene. Er beschreibt pro Mapping die dominante bildhafte Lesart, mögliche angrenzende Bedeutungen und Grenzen der Interpretation. Diese Ebene steuert nicht die Animation selbst, sondern macht die semantische Herleitung im Editor nachvollziehbarer.

## Prototyp

Der Hauptprototyp befindet sich in:

```text
prototyp/
```

Deployment:

```text
https://semantic-motion-framework.vercel.app/
```

Er wird mit React, TypeScript, Vite und Framer Motion umgesetzt.

Der aktuelle Prototyp ist als Vier-Seiten-Struktur angelegt:

- Startseite
- Editor
- Framework-Karte
- Über das Projekt

Die Startseite dient als Informations- und Einstiegsebene. Der Editor bildet die zentrale Nutzungskette des Frameworks ab: Mapping auswählen, semantische Begründung lesen, Animation in der Preview prüfen und Framer-Motion- oder CSS-Code exportieren. Optional kann der semantische Möglichkeitsraum eingeblendet werden; er zeigt die bildhafte Lesart, Visual-Cue-Glyphs, angrenzende Bedeutungen und Abgrenzungen. Die Framework-Karte zeigt alle semantischen Mappings als Überblick, die Projektseite bündelt Forschungsrahmen, Kontext und Ressourcen.

## POCs

Die POCs im Ordner `pocs/` wurden genutzt, um zentrale technische und konzeptuelle Fragen vor der Hauptimplementierung zu prüfen.

| POC | Zweck |
|---|---|
| POC 01 | Basis-Animationssystem mit Framer Motion |
| POC 02 | Mapping-Datenbank und Validierung |
| POC 03 | Echtzeit-Preview aller Mapping-Einträge |
| POC 04 | Framer-Motion- und CSS-Code-Export |
| POC 05 | Integration von Auswahl, Preview, Begründung und Export |

Die POCs sind Entwicklungsartefakte. Der aktuelle Framework-Stand wird durch die Dateien im `prototyp/src/framework` und `prototyp/src/data` definiert.

## Projektstruktur

```text
semantic-motion-framework/
├── docs/                    # Konzept, Theorie, Anforderungen und Arbeitsdokumentation
├── pocs/                    # isolierte Proofs of Concept
├── prototyp/                # Hauptprototyp des Semantic Motion Editors
│   ├── src/
│   │   ├── components/      # übergreifende UI-Komponenten des Prototyps
│   │   ├── data/            # Mapping-Datenbank
│   │   ├── editor/          # Preview-, Export-, Visual-Cue- und Editor-Hilfslogik
│   │   ├── framework/       # Typen, Classifier und Validierung
│   │   └── pages/           # Startseite, Editor, Framework-Karte, Über das Projekt
│   └── package.json
├── thesis/                  # Materialien zur schriftlichen Ausarbeitung
└── README.md
```

## Lokale Entwicklung

```bash
cd prototyp
npm install
npm run dev
```

Build prüfen:

```bash
cd prototyp
npm run build
```

Hinweis: Die verwendete Vite-Version erwartet Node.js 20.19 oder neuer beziehungsweise Node.js 22.12 oder neuer. Mit älteren Node-Versionen kann der Build trotz Warnung funktionieren, die Umgebung sollte für die Abgabe aber aktualisiert werden.

## Abgrenzung

Die Arbeit enthält keine empirische Nutzerstudie. Die Mappings sind theoretisch hergeleitet und im Prototyp demonstriert, aber nicht empirisch validiert.

Der Prototyp ist kein produktionsreifes Design-Tool. Er dient dazu, das Framework praktisch erfahrbar zu machen und die Forschungsfrage zur Operationalisierung zu beantworten.

## Autor

Ricardo Timm  
Bachelorarbeit, TH Köln, 2026  
**Semantic Motion in Web UIs: Konzeption und prototypische Umsetzung eines regelbasierten Frameworks für Microinteractions und UI-Verhalten in Web-Interfaces**

Erstprüfer: Prof. Christian Noss  
Zweitprüfer: Prof. Dr. Hoai Viet Nguyen

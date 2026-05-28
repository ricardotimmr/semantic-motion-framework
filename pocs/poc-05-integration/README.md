# POC 05 - Minimale End-to-End-Integration

Setup für den fünften Proof of Concept aus `docs/pocs.md`.

## Ziel

Dieses Verzeichnis enthält einen Light-Prototyp, der Mapping-Datenbank, Preview-Komponente und Code-Export als zusammenhängende Nutzungskette validiert.

Die Kette:

```text
Auswahl -> Begründung -> Preview -> Export
```

## Scope

Enthalten:

- Single-Page-Layout für die Nutzungskette
- Auswahl für Button Feedback Success/Error
- Preview-Anbindung aus POC 03
- Begründungstext aus `rationale.short`
- Framer-Motion- und CSS-Code-Export aus POC 04
- Copy-to-Clipboard

## Architektur-Learnings

- Für diesen reduzierten Flow reicht ein zentraler State im Layout-Wrapper aus. Context oder globaler Store wären für den späteren Editor erst sinnvoll, wenn mehrere Komponenten, Filter und Exportoptionen parallel aktiv werden.
- Preview und Export müssen dieselbe `MappingEntry`-Instanz verwenden. Dadurch bleibt sichergestellt, dass Begründung, Animation und generierter Code nicht auseinanderlaufen.
- Preview-Choreografie und Exportlogik sollten getrennt bleiben. Der Preview darf Darstellungs-Hilfen nutzen, der Export muss aber die eigentlichen Mapping-Parameter ausgeben.
- Die POC-übergreifende Wiederverwendung funktioniert, zeigt aber auch: Für den Hauptprototyp sollten Preview-Adapter und Export-Generator als gemeinsame Module im Prototyp-Code liegen, nicht in einzelnen POC-Ordnern.

## Befehle

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Validierungsziel

Validieren, dass Mapping-Datenbank, Preview-Komponente und Code-Export als zusammenhängendes System funktionieren. Das ist der erste Moment, in dem die vollständige Nutzungskette (Auswahl → Begründung → Preview → Export) durchläuft, auch wenn nur für eine einzige Komponente und zwei semantische Mappings.

Dieser POC beantwortet die Frage, die keiner der anderen POCs beantwortet: Funktioniert das Konzept als Ganzes?

## Aufgaben

- Einfaches Single-Page-Layout mit Komponentenauswahl, semantischer Mapping-Auswahl, Echtzeit-Preview, Begründung und Code-Export
- Wiederverwendung der bestehenden POC-Implementierungen für Preview und Export
- Vollständige Abbildung der Nutzungskette ohne Ausbau zum finalen Editor

## Technische Entscheidungen

- Wie wird der State zwischen Auswahl, Preview und Export synchronisiert? (Lifted State, Context oder einfache Props)
- Gibt es Performance-Probleme bei schnellen Auswahländerungen, die Preview und Export gleichzeitig aktualisieren?
- Welche Architekturprobleme werden sichtbar, die in den isolierten POCs nicht aufgefallen sind?

## Erfolgskriterien

- Die vollständige Kette läuft durch: Auswahl ändern → Preview spielt Animation ab → Begründungstext aktualisiert sich → Code-Export zeigt korrekten Code
- Kein State-Synchronisierungsproblem zwischen den drei Bereichen
- Copy-to-Clipboard kopiert den Code, der zur aktuellen Auswahl passt
- Der POC identifiziert mindestens eine Architekturanpassung, die für den vollständigen Editor notwendig ist (dokumentiert im POC-README)

## Abgrenzung

Nur Button, nur zwei semantische Mappings (Success und Error). Keine Toggle, kein Modal, kein Toast in diesem POC. Keine vollständige responsive Ausarbeitung. Ziel ist Funktionsnachweis, nicht Vollständigkeit.

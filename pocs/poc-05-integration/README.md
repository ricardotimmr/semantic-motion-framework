# POC 05 - Minimale End-to-End-Integration

Setup fuer den fuenften Proof of Concept aus `docs/pocs.md`.

## Ziel

Dieses Verzeichnis ist vorbereitet fuer einen Light-Prototyp, der Mapping-Datenbank, Preview-Komponente und Code-Export als zusammenhaengende Nutzungskette validiert.

Die spaetere Kette:

```text
Auswahl -> Begruendung -> Preview -> Export
```

## Scope

Aktueller Stand: nur Projekt-Setup.

Noch nicht enthalten:

- Single-Page-Layout
- Auswahl fuer Button Success/Error
- Preview-Anbindung aus POC 03
- Begruendungstext aus `rationale.short`
- Framer-Motion-Code-Export aus POC 04
- Copy-to-Clipboard

## Architektur-Learnings

Noch offen. Dieser Abschnitt wird waehrend oder nach der Implementierung genutzt, um notwendige Anpassungen fuer den vollstaendigen Editor festzuhalten.

## Befehle

```bash
npm install
npm run dev
npm run build
npm run lint
```

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
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

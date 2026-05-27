# POC 02 - Mapping-Datenbank

Setup für den zweiten Proof of Concept aus `docs/pocs.md`.

## Ziel

Dieses Verzeichnis validiert eine typsichere Mapping-Datenstruktur und Lookup-Logik.

## Scope

Aktueller Stand: implementierter POC mit Validierungsschicht, Unit-Tests und kleinem Read-only-Dashboard gegen den aktuellen Framework-Kern aus `prototyp`.

Enthalten:

- Import der aktuellen Framework-Typen aus `prototyp/src/framework/types.ts`
- Import der aktuellen Mapping-Datenbank aus `prototyp/src/data/mappings.ts`
- Import der aktuellen Lookup-Funktionen aus `prototyp/src/framework/classifier.ts`
- Validierungsfunktion für Datenbankkonsistenz
- Unit-Tests für Lookup, Quellenangaben, ID-Schema und Out-of-Scope-Kombinationen
- Read-only-Dashboard zur visuellen Kontrolle der Mapping-Datenbank

Bewusst nicht enthalten:

- Preview
- eigene zweite Mapping-Datenbank
- Editor-Flow oder interaktive Mapping-Auswahl

## Befehle

```bash
npm install
npm run build
npm run lint
npm run test:run
```

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

Die ergänzte UI ist bewusst kein Editor, sondern nur ein Validierungsdashboard. Sie macht die Testergebnisse und Mapping-Struktur sichtbar, verändert aber keine Daten.

### Ergebnis

- Die aktuelle Mapping-Datenbank enthält 24 Einträge mit 24 eindeutigen IDs.
- Jeder Eintrag ist über `getMapping(...)` und `getMappingById(...)` erreichbar.
- Jeder Eintrag enthält `rationale.source` und `rationale.references`.
- Kombinationen außerhalb des definierten Scopes geben `null` zurück.
- `getOutOfScopeCombinations()` macht bewusst nicht ausgearbeitete Kombinationen analysierbar.
- Validierung erfolgt ohne UI über `npm run test:run`.
- Visuelle Kontrolle erfolgt über das Dashboard mit `npm run dev`.

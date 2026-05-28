# TODOs für Preview und Code-Export

Diese Datei sammelt offene technische Punkte, die beim späteren Einbinden des Frameworks in den Editor relevant werden.

## 1. Spring-Easing gesondert behandeln

Status: In POC 04 prototypisch gelöst, später in den Hauptprototyp übernehmen.

Ursprünglicher Zustand:

- In `types.ts` existiert `EASING_CURVES.spring` nur als Platzhalter.
- Spring darf später nicht wie eine normale `cubic-bezier`-Kurve exportiert oder gerendert werden.

Umsetzung in den POCs:

- POC 04 exportiert Spring für Framer Motion als `transition.type = "spring"`.
- `springConfig` aus dem Mapping wird verwendet.
- CSS-Export erzeugt einen Hinweis, dass CSS keine echte Spring-Physik unterstützt.
- CSS nutzt aktuell eine bewusste Approximation über `cubic-bezier`.

Framer-Motion-Preview und Framer-Motion-Export:

- Wenn `easing.preset === "spring"`:
  - nicht `EASING_CURVES.spring` verwenden
  - stattdessen `transition.type = "spring"` setzen
  - `springConfig` aus dem Mapping verwenden

Beispiel:

```ts
transition: {
  type: "spring",
  stiffness: entry.params.springConfig.stiffness,
  damping: entry.params.springConfig.damping,
  mass: entry.params.springConfig.mass,
}
```

CSS-Export:

- CSS unterstützt keine echte Spring-Physik nativ.
- Mögliche Lösungen:
  - Spring-Mappings im CSS-Export als eingeschränkt markieren.
  - Spring näherungsweise mit `cubic-bezier` approximieren.
  - Keyframes erzeugen, die den Overshoot grob nachbilden.

Entscheidung für den Hauptprototyp:

- Framer Motion korrekt mit `springConfig` exportieren.
- CSS-Export bei Spring mit Hinweis versehen und bewusst approximieren.
- Kein neues Datenmodell nötig.

## 2. Mehrphasige Toast-Error-Animation behandeln

Status: In POC 03 und POC 04 prototypisch als Sonderfall gelöst, später in den Hauptprototyp übernehmen.

Ursprünglicher Zustand:

- `toast-feedback-error` ist zweiphasig:
  - y-Einfahrt von unten
  - x-Shake nach Ankunft
- Ein naiver `direction`/`keyframes`-Renderer reicht dafür nicht aus, weil `direction: "y"` die Einfahrt beschreibt, die Keyframes aber den anschließenden x-Shake.

Umsetzung in den POCs:

- POC 03 rendert `toast-feedback-error` als zweiphasige Preview-Sequenz.
- POC 04 exportiert `toast-feedback-error` als zweiphasige Framer-Motion-Sequenz.
- POC 04 erzeugt für CSS kombinierte Keyframes mit y-Einfahrt und anschließendem x-Shake.

Mögliche Lösungen:

- Sonderfall im Toast-Renderer für `toast-feedback-error`.
- Oder später ein `stages`-Modell einführen, zum Beispiel:

```ts
stages: [
  { direction: "y", translateFrom: "bottom", translateDistance: "self", duration: 160 },
  { direction: "x", keyframes: { values: [0, -6, 6, -6, 6, 0], times: [...] }, duration: 160 },
]
```

Entscheidung für den Hauptprototyp:

- Für die erste Editor-Implementierung reicht ein gezielter Sonderfall im Toast-Renderer und Export.
- Kein `stages`-Modell vor dem Hauptprototyp einführen.
- `stages` erst prüfen, wenn mehrere mehrphasige Mappings entstehen.

## 3. Toast-Attention-OneShot mit modellierten Parametern abgleichen

toast-attention-oneShot beschreibt im Kommentar und in source einen sekundären Opacity-Pulse nach der Einfahrt. In den Parametern ist aber nur opacity: [0, 1] modelliert. Für den späteren Renderer heißt das: entweder Sonderfall wie bei toast-feedback-error dokumentieren oder den Pulse aus Kommentar/Begründung streichen.

Aktueller Zustand:

- `toast-attention-oneShot` beschreibt im Kommentar und in `rationale.source` einen sekundären Opacity-Pulse nach der Einfahrt.
- In den Parametern ist aber nur `opacity: [0, 1]` modelliert.

TODO:

- Entweder den sekundären Pulse als bewussten Sonderfall für den Toast-Renderer dokumentieren.
- Oder den Pulse aus Kommentar und Begründung entfernen, wenn er im Prototyp nicht umgesetzt wird.

## 4. Button-Feedback-Success-Begründung schärfen

button-feedback-success erwähnt in source eine „Aufwärtsbewegung“, aber das Mapping nutzt nur scaleFactor, keine y-Bewegung. Für wissenschaftliche Sauberkeit würde ich die Aufwärtsbewegung aus der Begründung entfernen oder bewusst eine y-Komponente modellieren. Ich würde eher die Begründung schärfen.

Aktueller Zustand:

- `button-feedback-success` nutzt nur `scaleFactor`.
- In `rationale.source` wird aber eine Aufwärtsbewegung erwähnt.

TODO:

- Die Aufwärtsbewegung aus der Begründung entfernen oder präzisieren.
- Keine y-Bewegung ergänzen, solange das Mapping bewusst als Scale-Feedback gedacht ist.

## 5. Hierarchy-toBackground-Kommentar präzisieren

toBackground ist im Typkommentar als „tritt zurück, bleibt aber sichtbar“ beschrieben, das Modal-Mapping blendet aber vollständig aus (opacity: [1, 0]). Kein Codefehler, aber konzeptionell unsauber. Kleine Kommentar-/Begründungsanpassung reicht.

Aktueller Zustand:

- `HierarchySubcategory.toBackground` ist in `types.ts` sinngemäß als „tritt zurück, bleibt aber sichtbar“ beschrieben.
- `modal-hierarchy-toBackground` blendet das Modal mit `opacity: [1, 0]` vollständig aus.

TODO:

- Kommentar oder Mapping-Begründung so anpassen, dass `toBackground` auch ein Zurücktreten bis zum Ausblenden abdecken kann.
- Kein neues Modell nötig.

## 6. ScaleFactor-Interpretation im Renderer bewusst behandeln

scaleFactor ist für Pulse, Scale-In und Scale-Out verwendbar, aber die konkrete Interpretation ist implizit. Für den POC reicht das, solange der Renderer nach Komponente/Dimension entscheidet. Kein neues Modell nötig, aber als Renderer-Regel bewusst einplanen.

Aktueller Zustand:

- `scaleFactor` wird für Pulse, Scale-In und Scale-Out verwendet.
- Die konkrete Interpretation hängt vom jeweiligen Mapping-Kontext ab.

TODO:

- Im Preview-/Export-Renderer bewusst festlegen, wie `scaleFactor` je Kontext interpretiert wird.
- Beispiele: Pulse `1.0 → 1.05 → 1.0`, Eintritt `0.95 → 1.0`, Austritt `1.0 → 0.96`.
- Kein neues Datenmodell nötig, solange diese Regel im Renderer sauber umgesetzt wird.

## 7. Easing-Kommentar zu Spring präzisieren

Der Kommentar sagt, jedes Easing-Preset entspreche einer cubicBezier-Kurve. spring ist aber ausdrücklich ein Platzhalter. Das ist durch docs/todos.md fachlich abgefangen, aber der Kommentar könnte später noch präziser werden.

Aktueller Zustand:

- In `types.ts` steht, dass jedes Easing-Preset einer `cubicBezier`-Kurve entspricht.
- `spring` ist aber ein Framer-Motion-Spring und nur als Platzhalter in `EASING_CURVES` enthalten.

TODO:

- Kommentar in `types.ts` später präzisieren: Alle Presets außer `spring` entsprechen direkt einer `cubicBezier`-Kurve.
- `spring` muss über `springConfig` behandelt werden.

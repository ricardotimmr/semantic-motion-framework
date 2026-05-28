# TODOs für Preview und Code-Export

Diese Datei sammelt offene technische Punkte, die beim späteren Einbinden des Frameworks in den Editor relevant werden.

## Empfohlene Bearbeitungsreihenfolge

<!-- 1. Kleine Modell- und Text-Unsauberkeiten bereinigen (TODO 4, TODO 5, TODO 7):
   - TODO 4: `button-feedback-success` Begründung ohne Aufwärtsbewegung (erledigt)
   - TODO 5: `hierarchy-toBackground` Kommentar präzisieren (erledigt)
   - TODO 7: Spring-Kommentar in `types.ts` präzisieren (erledigt) -->

<!-- 2. `toast-attention-oneShot` klären (TODO 3, erledigt):
   - Pulse ist über `opacityKeyframes` modelliert
   - Preview und Export werten das Feld aus -->

3. Renderer-Regeln sauber festlegen (TODO 6, erledigt):
   - `scaleFactor` wird je Kontext bewusst behandelt
   - Pulse, Scale-In, Scale-Out und Hierarchie werden getrennt interpretiert

4. POC 03 auf alle 24 Mapping-Einträge erweitern (neuer TODO 8):
   - Erstes Ziel: Jeder Mapping-Eintrag ist auswählbar und crasht nicht
   - Zusätzliche Preview-Darstellungen für `toggle`, `input` und `skeleton`

5. Systematischer Mapping-Review in POC 03 durchführen (neuer TODO 9):
   - Button
   - Toggle
   - Input
   - Toast
   - Modal
   - Skeleton
   - Prüfen, ob jede Animation die intendierte Bedeutung wirklich vermittelt
   - Auffälligkeiten in `docs/mapping-review-notizen.md` dokumentieren

6. Parameter-Tuning und Begründungen synchronisieren (neuer TODO 10):
   - Änderungen an Duration, Easing, Amplitude oder Direction immer mit `rationale.short/source` abgleichen

7. Export nachziehen (abhängig von TODO 8 bis TODO 10):
   - POC 04 und POC 05 prüfen, wenn POC 03 neue Sonderfälle oder Interpretationen braucht

8. Bereits gelöste POC-Sonderfälle später in den Hauptprototyp übertragen (TODO 1, TODO 2):
   - Spring-Handling
   - `toast-feedback-error` als zweiphasige Animation

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

<!-- ## 3. Toast-Attention-OneShot mit modellierten Parametern abgleichen

Status: Erledigt.

`toast-attention-oneShot` beschreibt einen sekundären Opacity-Pulse nach der Einfahrt. Dieser Pulse ist jetzt explizit über `opacityKeyframes` modelliert und wird in Preview und Export ausgewertet.

Aktueller Zustand:

- `toast-attention-oneShot` nutzt weiterhin `opacity: [0, 1]` als einfachen Deckkraftbereich.
- Zusätzlich modelliert `opacityKeyframes` die Sequenz `0 → 1 → 0.86 → 1 → 0.86 → 1`.

TODO:

- Erledigt: `AnimationParams` besitzt ein `opacityKeyframes`-Feld.
- Erledigt: POC 03 Preview rendert den Pulse.
- Erledigt: POC 04/05 Export erzeugt Framer-Motion- und CSS-Code mit Opacity-Pulse. -->

<!-- ## 4. Button-Feedback-Success-Begründung schärfen

Status: Erledigt.

`button-feedback-success` erwähnte in `rationale.source` eine „Aufwärtsbewegung“, obwohl das Mapping nur `scaleFactor` und keine y-Bewegung nutzt. Die Begründung wurde geschärft, die Parameter bleiben unverändert.

Aktueller Zustand:

- `button-feedback-success` nutzt nur `scaleFactor`.
- In `rationale.source` wird keine Aufwärtsbewegung mehr erwähnt.

TODO:

- Erledigt: Die Begründung beschreibt jetzt die leichte Expansion als physische Reaktion auf die erfolgreiche Aktion.
- Keine y-Bewegung ergänzt, weil das Mapping bewusst als fokussiertes Scale-Feedback gedacht ist. -->

<!-- ## 5. Hierarchy-toBackground-Kommentar präzisieren

Status: Erledigt.

`toBackground` war im Typkommentar als „tritt zurück, bleibt aber sichtbar“ beschrieben, das Modal-Mapping blendet aber vollständig aus (`opacity: [1, 0]`). Das war kein Codefehler, aber konzeptionell zu eng formuliert.

Aktueller Zustand:

- `HierarchySubcategory.toBackground` ist in `types.ts` jetzt als Verlust der Vordergrundpriorität und Rücktritt aus dem Fokus beschrieben.
- `modal-hierarchy-toBackground` blendet das Modal mit `opacity: [1, 0]` vollständig aus.

TODO:

- Erledigt: Kommentar und Mapping-Begründung decken jetzt ein Zurücktreten bis zum Ausblenden ab.
- Kein neues Modell nötig. -->

## 6. ScaleFactor-Interpretation im Renderer bewusst behandeln

Status: Erledigt.

`scaleFactor` ist für Pulse, Scale-In und Scale-Out verwendbar. Die konkrete Interpretation ist jetzt als Renderer-Regel in Preview und Export explizit umgesetzt.

Aktueller Zustand:

- `scaleFactor` wird für Pulse, Scale-In und Scale-Out verwendet.
- Die konkrete Interpretation hängt vom jeweiligen Mapping-Kontext ab.
- POC 03 nutzt dafür einen expliziten Scale-Helper im Motion-Adapter.
- POC 04/05 nutzen dieselbe Regel im Export-Generator.

TODO:

- Erledigt: Pulse werden als `1.0 → 1.05 → 1.0` interpretiert.
- Erledigt: `hierarchy/toForeground` wird als Scale-In `0.95 → 1.0` interpretiert.
- Erledigt: `hierarchy/toBackground` wird als Scale-Out `1.0 → 0.96` interpretiert.
- Kein neues Datenmodell nötig.

<!-- ## 7. Easing-Kommentar zu Spring präzisieren

Status: Erledigt.

Der Kommentar sagte ursprünglich, jedes Easing-Preset entspreche einer cubicBezier-Kurve. `spring` ist aber ausdrücklich ein Platzhalter für CSS-/Fallback-Fälle und muss in Framer Motion über `springConfig` behandelt werden.

Aktueller Zustand:

- In `types.ts` steht jetzt, dass alle Presets außer `spring` direkt einer `cubicBezier`-Kurve entsprechen.
- `spring` ist aber ein Framer-Motion-Spring und nur als Platzhalter in `EASING_CURVES` enthalten.

TODO:

- Erledigt: Kommentar in `types.ts` präzisiert.
- `spring` muss über `springConfig` behandelt werden; die Code-Logik bleibt unverändert. -->

# TODOs vor Editor- und UI-Implementierung

Diese Datei sammelt die noch offenen Punkte, die das Framework vor dem eigentlichen Editor möglichst stabil machen sollen. Ziel ist, spätere UI-Umbauten zu vermeiden, indem Datenmodell, Validierung, Exportlogik und semantische Sonderfälle vorher geklärt werden.

## Offene Reihenfolge

1. Sichtbar zurückgestuftes Card-/Panel-Layer-Mapping prüfen oder umsetzen.
2. Kleine fachliche Mapping-Checks erledigen.
3. Framework-Dokumentation mit dem finalen Datenmodell synchronisieren.
4. Spring, `motionPhases`, Validierung und Exportlogik in den Hauptprototyp übernehmen.

## 1. Sichtbar zurückgestuftes Card-/Panel-Layer-Mapping prüfen oder umsetzen

Status: Optional, aber fachlich sinnvoll.

Aktueller Befund:

- `modal-hierarchy-toBackground` blendet das Modal bewusst aus.
- Ein halbtransparent sichtbares Modal nach dem Schließen wäre UX-seitig missverständlich.
- Ein echtes sichtbares Zurücktreten eignet sich eher für Card, Panel, Sidebar oder gestapelte Ebenen.

Mögliche Umsetzung:

- Neue Komponente oder neues Beispiel:
  - `card`
  - `panel`
  - `layer`
- Mappings:
  - `card-hierarchy-toForeground`
  - `card-hierarchy-toBackground`
- ToBackground könnte z. B. Deckkraft, Schatten und Scale reduzieren, ohne das Element vollständig zu entfernen.

Vorher klären:

- Passt `card` oder `panel` besser zum Scope der Bachelorarbeit?
- Soll dafür `COMPONENT_IDS` erweitert werden?
- Muss die Gliederung angepasst werden, weil bisher sechs Komponenten argumentiert werden?
- Ist der Mehrwert groß genug, um den Scope zu erweitern?

Empfehlung:

- Nur umsetzen, wenn du die Hierarchie-Dimension im Editor stärker zeigen willst.
- Wenn ja, zuerst O2/Scale-Modell entscheiden.

Akzeptanzkriterium:

- `hierarchy-toBackground` ist an mindestens einer Komponente sichtbar als Zurückstufung und nicht als Exit interpretierbar.

## 2. Kleine fachliche Mapping-Checks erledigen

Status: Offen.

### K1. `input-attention-requiredField` final einordnen

Aktueller Befund:

- Das Mapping nutzt einen Shake und wird nach fehlgeschlagenem Submit ausgelöst.
- Es kann oberflächlich als Feedback gelesen werden.
- Die aktuelle Attention-Einordnung ist plausibel, weil ein konkretes Feld Aufmerksamkeit einfordert.

TODO:

- Rationale final prüfen.
- Falls nötig noch klarer formulieren: feldbezogener Aufmerksamkeitsmarker nach Submit, nicht allgemeines Error-Feedback.

### K2. `input-feedback-success` visuell prüfen

Aktueller Befund:

- `scaleFactor: 0.02` ist bewusst subtil.
- Es könnte in der Preview aber zu schwach sein.

TODO:

- Visuell prüfen, ob der Success-Zustand wahrnehmbar genug ist.
- Falls zu schwach, eher kleinen Success-Indikator oder Border-Feedback ergänzen statt das gesamte Input-Feld stärker zu skalieren.

## 3. Framework-Dokumentation synchronisieren

Status: Offen.

Aktueller Befund:

- Das Datenmodell wurde mehrfach geschärft:
  - `translateFrom` / `translateTo`
  - `motionPhases`
  - Opacity als Sichtbarkeitsparameter
  - Input-spezifische Renderer-Regeln
  - explizites `scaleMode`
- Einige Dokumente können dadurch ältere Formulierungen enthalten.

TODO:

- `docs/framework-konzept.md` gegen `types.ts` und `mappings.ts` prüfen.
- Mapping-Tabellen und Beispiele auf `motionPhases` aktualisieren.
- Falls Card/Panel ergänzt wird, Gliederung und Scope-Argumentation aktualisieren.
- `docs/pocs.md` nur anpassen, wenn es als aktuelle Planung gelesen werden soll.

Akzeptanzkriterium:

- Dokumentation, Mapping-Datenbank und Typsystem widersprechen sich nicht.

## 4. Spring, `motionPhases`, Validierung und Exportlogik in den Hauptprototyp übernehmen

Status: Offen, sobald der eigentliche Editor/Hauptprototyp gebaut wird.

Aktueller Befund:

- POC 03/04 haben die relevanten Logiken bereits prototypisch gelöst.
- Der Hauptprototyp muss diese Entscheidungen übernehmen, statt erneut Sonderfälle einzubauen.

TODO:

- Spring in Framer Motion mit `springConfig` rendern/exportieren.
- CSS-Spring nur mit Hinweis oder bewusster Approximation exportieren.
- `motionPhases` generisch rendern/exportieren.
- Zentrale Validierung vor oder während Editor-Initialisierung nutzbar machen.
- Export-Kommentare weiterhin aus `rationale.short`, `rationale.source` und `signType` ziehen.

Akzeptanzkriterium:

- Der Editor nutzt dieselben Framework-Regeln wie POC 03/04 und führt keine neuen parallelen Sonderlogiken ein.

## Erledigt

- Review-Artefakt `mappings.rationale-review.ts` aus dem produktiven `src/data`-Kontext entfernt.
- Mapping-Validierung aus POC 02 in den Framework-Kern verschoben und um numerische Parameterregeln erweitert.
- `motionPhases` semantisch finalisiert: Top-Level-Dauer, Phasen-Delay, Sequenz-Iterations, gemeinsames Keyframe-Raster und CSS-Approximation geregelt.
- Reduced-Motion-Strategie als Accessibility-Metadatum modelliert, relevante Mappings markiert und in POC 03 testbar gemacht.
- Komponentenspezifische Renderer-Regeln für interne Teilziele als ADR dokumentiert.
- Explizites Scale-Modell eingeführt: `scaleFactor` wird über `scaleMode` als `pulse`, `scaleIn` oder `scaleOut` interpretiert.
- `button-feedback-success` Begründung ohne Aufwärtsbewegung geschärft.
- `hierarchy-toBackground` Kommentar und Begründung präzisiert.
- Spring-Kommentar in `types.ts` präzisiert.
- `toast-attention-oneShot` von Opacity-Pulse auf echte Scale-Impulse umgestellt.
- `scaleFactor`-Interpretation in Preview und Export über `scaleMode` umgesetzt.
- Preview-Replay-Hold für Modal-Enter/-Exit, Hierarchie, Skeleton-Resolved und Input-Blur vereinheitlicht.
- Opacity als ergänzenden Sichtbarkeitsparameter theoretisch legitimiert.
- POC 03 als vollständiges Mapping-Review-Werkzeug genutzt.
- Systematischen Mapping-Review der priorisierten Schwächen durchgeführt.
- Export nach Mapping-Review geprüft: POC 04 Tests und POC 05 Build erfolgreich.
- Input-Focus/Blur in POC 03 auf Framer-Motion-Controls umgestellt.
- Generisches Phasenmodell `motionPhases` eingeführt und in POC 03/04 umgesetzt.

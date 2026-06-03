# TODOs vor Editor- und UI-Implementierung

Diese Datei sammelt die noch offenen Punkte, die das Framework vor dem eigentlichen Editor möglichst stabil machen sollen. Ziel ist, spätere UI-Umbauten zu vermeiden, indem Datenmodell, Validierung, Exportlogik und semantische Sonderfälle vorher geklärt werden.

## Offene Reihenfolge

1. `motionPhases` semantisch und technisch finalisieren.
2. Reduced-Motion-Strategie im Framework festlegen.
3. Komponentenspezifische Renderer-Regeln dokumentieren oder modellieren.
4. Explizites Scale-Modell prüfen und entscheiden.
5. Sichtbar zurückgestuftes Card-/Panel-Layer-Mapping prüfen oder umsetzen.
6. Kleine fachliche Mapping-Checks erledigen.
7. Framework-Dokumentation mit dem finalen Datenmodell synchronisieren.
8. Spring, `motionPhases`, Validierung und Exportlogik in den Hauptprototyp übernehmen.

## 1. `motionPhases` semantisch und technisch finalisieren

Status: Offen.

Aktueller Befund:

- `motionPhases` ist eingeführt und löst die früheren Toast-Sonderfälle sauberer.
- Die drei mehrphasigen Toast-Mappings nutzen das Modell.
- POC 03 und POC 04 können `motionPhases` bereits rendern bzw. exportieren.
- Ein paar Regeln sind aber noch nicht ausdrücklich finalisiert.

Offene Entscheidungen:

- Bedeutet Top-Level-`duration` bei `motionPhases` die Summe der Phasendauern ohne Delay?
- Werden `delay`-Werte in Phasen zur Gesamtzeit gezählt oder nur als Playback-Verzögerung verstanden?
- Gilt `iterations` auf Top-Level für die komplette Phasensequenz?
- Dürfen Phasen eigene `easing`-Werte haben, obwohl CSS-Export nur eingeschränkt phasenspezifische Easing-Kurven abbilden kann?
- Darf eine Phase gleichzeitig `keyframes`, `scaleKeyframes` und `opacityKeyframes` verwenden, oder braucht es dafür ein gemeinsames Zeitraster?

Empfehlung:

- Top-Level-`duration` = Summe der Phasendauern ohne Delay.
- Phasen-`delay` = zusätzlicher Startabstand, nicht Teil der semantischen Bewegungsdauer.
- `iterations` wiederholt die komplette Sequenz, nicht einzelne Phasen.
- Mehrere Keyframe-Typen in einer Phase nur erlauben, wenn sie dasselbe `times`-Raster verwenden oder später ein gemeinsames Keyframe-Modell eingeführt wird.
- CSS-Export soll bei phasenspezifischem Easing entweder warnen oder bewusst approximieren.

Akzeptanzkriterium:

- Die Regeln stehen in `types.ts`, Validierung und ADR-Dokumentation konsistent.

## 2. Reduced-Motion-Strategie im Framework festlegen

Status: Offen.

Aktueller Befund:

- Accessibility ist in mehreren Rationales und Dokumenten erwähnt.
- Besonders relevant sind endlose oder wiederholte Animationen:
  - `button-attention-persistent`
  - `skeleton-attention-loading`
  - weitere Mappings mit `iterations > 1` oder `Infinity`
- Aktuell gibt es aber kein maschinenlesbares Feld, das dem Editor sagt, wie Reduced Motion behandelt werden soll.

TODO:

- Entscheiden, ob Reduced Motion nur Renderer-Regel bleibt oder im Mapping modelliert wird.
- Mögliche Datenmodell-Ergänzung:
  - `accessibility.reducedMotion: "none" | "static" | "shorten" | "replace"`
  - oder ein kleineres Feld wie `reducedMotionStrategy`
- Für wiederholte und endlose Animationen eine konkrete reduzierte Alternative definieren.
- Editor soll später anzeigen können, wenn ein Mapping besondere Reduced-Motion-Behandlung braucht.

Akzeptanzkriterium:

- Für alle wiederholten/endlosen Mappings ist klar, was bei `prefers-reduced-motion` passiert.

## 3. Komponentenspezifische Renderer-Regeln dokumentieren oder modellieren

Status: Offen.

Aktueller Befund:

- Einige Mappings beschreiben nicht nur das Hauptelement, sondern komponentenspezifische Teilziele:
  - Input Focus: Container, Border, Label, Shadow
  - Input Blur: Rücktransition dieser Teilziele
  - Input Warning: Helper-Text erscheint mit lokalem y-Offset
  - Modal `toBackground`: verliert Fokus und wird entfernt, nicht sichtbar zurückgestuft
- Diese Logik ist aktuell bewusst im Renderer gelöst, nicht vollständig im Mapping modelliert.

TODO:

- Entscheiden, ob das als dokumentierte Renderer-Konvention reicht.
- Falls ja: ADR ergänzen, dass komponentenspezifische Teilziele nicht Teil des generischen Mapping-Modells sind.
- Falls nein: kleines Target-Modell prüfen, z. B. `target: "container" | "label" | "message"`.

Empfehlung:

- Vor dem Editor kein allgemeines Target-Modell einführen.
- Stattdessen die bestehenden komponentenspezifischen Renderer-Regeln dokumentieren.
- Ein Target-Modell erst einführen, wenn Card/Panel, Modal-Backdrop oder weitere Komponenten regelmäßig mehrere animierte Teilziele brauchen.

Akzeptanzkriterium:

- Der Editor kann Input- und Modal-Sonderlogik implementieren, ohne dass unklar ist, ob diese Logik Datenmodell oder Renderer-Verantwortung ist.

## 4. Explizites Scale-Modell prüfen und entscheiden

Status: Offen.

Aktueller Befund:

- `scaleFactor` wird aktuell bewusst kontextabhängig interpretiert:
  - Hierarchie mit positivem Wert: Scale-In
  - Hierarchie mit negativem Wert: Scale-Out
  - andere Dimensionen: Pulse
- Diese Regel ist dokumentiert und in POC 03/04 umgesetzt.
- Durch `motionPhases` existiert zusätzlich `scaleKeyframes`, aber bisher nur innerhalb von Phasen.

Mögliche Richtungen:

- Status quo behalten und `scaleFactor` weiter über Kontext interpretieren.
- `scaleMode: "pulse" | "scaleIn" | "scaleOut"` ergänzen.
- `scaleKeyframes` auch auf Top-Level erlauben.
- Für komplexere Fälle direkt `motionPhases` verwenden.

Empfehlung:

- Vor O1 entscheiden.
- Wenn Card/Panel-Hierarchie dazukommt, ist `scaleMode` wahrscheinlich sauberer als weitere implizite Kontextregeln.
- Falls keine neue Scale-Bedeutung entsteht, kann der Status quo bleiben.

Akzeptanzkriterium:

- Vor neuen Card-/Panel-Mappings ist klar, wie Scale semantisch modelliert wird.

## 5. Sichtbar zurückgestuftes Card-/Panel-Layer-Mapping prüfen oder umsetzen

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

## 6. Kleine fachliche Mapping-Checks erledigen

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

## 7. Framework-Dokumentation synchronisieren

Status: Offen.

Aktueller Befund:

- Das Datenmodell wurde mehrfach geschärft:
  - `translateFrom` / `translateTo`
  - `motionPhases`
  - Opacity als Sichtbarkeitsparameter
  - Input-spezifische Renderer-Regeln
  - Scale-Kontextregel
- Einige Dokumente können dadurch ältere Formulierungen enthalten.

TODO:

- `docs/framework-konzept.md` gegen `types.ts` und `mappings.ts` prüfen.
- Mapping-Tabellen und Beispiele auf `motionPhases` aktualisieren.
- Falls Card/Panel ergänzt wird, Gliederung und Scope-Argumentation aktualisieren.
- `docs/pocs.md` nur anpassen, wenn es als aktuelle Planung gelesen werden soll.

Akzeptanzkriterium:

- Dokumentation, Mapping-Datenbank und Typsystem widersprechen sich nicht.

## 8. Spring, `motionPhases`, Validierung und Exportlogik in den Hauptprototyp übernehmen

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
- `button-feedback-success` Begründung ohne Aufwärtsbewegung geschärft.
- `hierarchy-toBackground` Kommentar und Begründung präzisiert.
- Spring-Kommentar in `types.ts` präzisiert.
- `toast-attention-oneShot` von Opacity-Pulse auf echte Scale-Impulse umgestellt.
- `scaleFactor`-Interpretation in Preview und Export bewusst umgesetzt.
- Preview-Replay-Hold für Modal-Enter/-Exit, Hierarchie, Skeleton-Resolved und Input-Blur vereinheitlicht.
- Opacity als ergänzenden Sichtbarkeitsparameter theoretisch legitimiert.
- Kontextabhängige `scaleFactor`-Interpretation dokumentiert.
- POC 03 als vollständiges Mapping-Review-Werkzeug genutzt.
- Systematischen Mapping-Review der priorisierten Schwächen durchgeführt.
- Export nach Mapping-Review geprüft: POC 04 Tests und POC 05 Build erfolgreich.
- Input-Focus/Blur in POC 03 auf Framer-Motion-Controls umgestellt.
- Generisches Phasenmodell `motionPhases` eingeführt und in POC 03/04 umgesetzt.

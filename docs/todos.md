# TODOs für Preview und Code-Export

Diese Datei sammelt die noch relevanten technischen Punkte für POC 03, Export und den späteren Hauptprototyp.

## Offene Reihenfolge

1. Spring-Handling in den Hauptprototyp übernehmen.
2. Mehrphasige Toast-Error-Animation in den Hauptprototyp übernehmen.
3. POC 03 als vollständiges Mapping-Review-Werkzeug nutzen.
4. Systematischen Mapping-Review durchführen.
5. Parameter-Tuning und Begründungen synchronisieren.
6. Export nachziehen, wenn POC 03 neue Sonderfälle oder Interpretationen braucht.
7. Generisches Phasenmodell vor dem Hauptprototyp prüfen.
8. Input-Focus/Blur später vollständig über Framer-Motion-Controls steuern.

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

TODO für den Hauptprototyp:

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

TODO für den Hauptprototyp:

- Für die erste Editor-Implementierung reicht ein gezielter Sonderfall im Toast-Renderer und Export.
- Kein `stages`-Modell vor dem Hauptprototyp einführen.
- `stages` oder ein allgemeines Phasenmodell erst prüfen, wenn mehrere mehrphasige Mappings entstehen.

## 3. POC 03 als vollständiges Mapping-Review-Werkzeug nutzen

Status: In Arbeit.

POC 03 soll alle vorhandenen Mapping-Einträge darstellen, damit die Preview nicht nur mit einzelnen Testfällen arbeitet, sondern das vollständige Mapping abbildet.

Ziel:

- POC 03 soll alle Mapping-Einträge darstellen können.
- Jede Animation soll einzeln aufrufbar und sichtbar sein.
- POC 03 soll als Grundlage dienen, um die semantische Qualität der einzelnen Animationen gezielt zu überprüfen und zu verbessern.

Umsetzung:

- Alle vorhandenen Mapping-Einträge in POC 03 einbinden.
- Zusätzliche Preview-Darstellungen für `toggle`, `input` und `skeleton` ergänzen.
- Sicherstellen, dass `trackFactor`, `iterations`, `delay`, Translationen und Scale-Animationen sichtbar abspielbar sind.
- Danach jeden Eintrag einzeln durchgehen.
- Prüfen, ob Animation, Bedeutung und Begründung zusammenpassen.
- Auffällige Animationen markieren, die nicht stark genug oder missverständlich wirken.
- Bei Bedarf Anpassungen an Dauer, Richtung, Skalierung, Intensität, Easing oder Wiederholung vornehmen.

Akzeptanzkriterien:

- Alle 24 Mapping-Einträge sind in POC 03 integriert.
- Jede Animation kann einzeln getestet werden.
- Unklare oder schwache Animationen können dokumentiert werden.
- POC 03 eignet sich danach als Review-Werkzeug für das gesamte semantische Mapping.

## 4. Systematischen Mapping-Review durchführen

Status: Offen.

Alle Mapping-Einträge sollen einzeln geprüft werden:

- Button
- Toggle
- Input
- Toast
- Modal
- Skeleton

Prüffragen:

- Vermittelt die Animation die intendierte Bedeutung?
- Passen Animation, Mapping-Parameter und Begründung zusammen?
- Sind Dauer, Richtung, Skalierung, Intensität und Easing stark genug, aber nicht übertrieben?
- Gibt es Mappings, die technisch funktionieren, semantisch aber noch zu schwach oder missverständlich sind?

Dokumentation:

- Auffälligkeiten in der lokalen Review-Datei festhalten.
- Änderungen entweder direkt im Mapping umsetzen oder als Folge-TODO dokumentieren.

## 5. Parameter-Tuning und Begründungen synchronisieren

Status: Offen.

Wenn Mapping-Parameter geändert werden, müssen die Begründungstexte mitgezogen werden.

TODO:

- Änderungen an `duration`, `easing`, `scaleFactor`, `translateDistance`, `translateFrom`, `keyframes`, `iterations` oder ähnlichen Feldern immer mit `rationale.short` und `rationale.source` abgleichen.
- Sicherstellen, dass die wissenschaftliche Begründung nicht mehr beschreibt, als im Mapping tatsächlich modelliert ist.
- Sicherstellen, dass neue visuelle Signale auch semantisch begründet sind.
- Opacity-only-Mappings besonders prüfen:
  - Trägt Sichtbarkeit wirklich die Bedeutung?
  - Oder fehlt eigentlich ein räumlicher Bewegungsanteil?
  - Wenn Opacity alleine bleibt, muss die Begründung Erscheinen, Verschwinden, Abschluss, Fokusverlust oder Verfügbarkeit explizit benennen.

## 6. Export nachziehen

Status: Offen, abhängig vom Mapping-Review.

Wenn POC 03 neue Sonderfälle oder Interpretationsregeln braucht, müssen POC 04 und POC 05 entsprechend nachgezogen werden.

TODO:

- Framer-Motion-Export prüfen.
- CSS-Export prüfen.
- Tests für neue Sonderfälle ergänzen.
- POC 05 prüfen, damit Integration, Preview und Export konsistent bleiben.

## 7. Generisches Phasenmodell vor dem Hauptprototyp prüfen

Status: Offen, vor dem Hauptprototyp entscheiden.

Aktuell werden bereits mehrere Toast-Mappings als gezielte Renderer-Sonderfälle behandelt:

- `toast-feedback-error`: y-Einfahrt plus x-Shake
- `toast-feedback-warning`: y-Einfahrt plus y-Nudge
- `toast-attention-oneShot`: y-Einfahrt plus Scale-Pulse

Das ist für POC 03 vertretbar, weil die Fälle klar begrenzt sind und Preview sowie Export diese Sequenzen korrekt abbilden. Für den Hauptprototyp sollte aber bewusst entschieden werden, ob diese Sonderfälle im Renderer bleiben oder in ein generisches Datenmodell überführt werden.

Warum nicht isoliert umbauen:

- `toast-feedback-error` allein auf ein Phasenmodell umzustellen wäre inkonsistent, weil `toast-feedback-warning` und `toast-attention-oneShot` ebenfalls mehrphasig sind.
- Ein echtes Phasenmodell würde `types.ts`, `mappings.ts`, Preview, Export, Integration und Validierung betreffen.
- Deshalb bleibt der POC-Zustand bewusst bei gezielten Renderer-Sonderfällen.

Mögliche Modellrichtungen:

- `motionPhases`: explizite Sequenz aus mehreren Bewegungsphasen
- `secondaryMotion`: zusätzliches sekundäres Signal nach der Hauptbewegung

Entscheidung:

- Für den aktuellen POC bleiben gezielte Sonderfälle zulässig.
- Vor dem Hauptprototyp aktiv entscheiden, ob `motionPhases` oder `secondaryMotion` eingeführt wird.
- Falls weitere mehrphasige Mappings entstehen, sollte ein generisches Modell bevorzugt werden.

## 8. Input-Focus/Blur auf Framer-Motion-Controls umstellen

Status: Offen.

Aktuell werden `input-stateChange-focus` und `input-stateChange-blur` in POC 03 über CSS-Keyframes auf der Preview-Komponente visualisiert. Das ist für den POC ausreichend, aber für den späteren Editor nicht ideal, weil das Framework insgesamt mit Framer Motion arbeitet.

TODO:

- Focus- und Blur-Zustände später ebenfalls über Framer-Motion-Controls steuern.
- Container, Input-Feld, Label und optional Helper-Text als getrennte Animationsziele modellieren.
- Preview-Replay, Code-Export und tatsächliche Editor-Preview dadurch konsistenter machen.
- Prüfen, ob dafür ein kleines komponentenspezifisches Renderer-Modell reicht oder ob ein allgemeineres Target-Modell nötig wird.

## Optionale Erweiterungen

Diese Punkte sind nicht notwendig für den aktuellen POC-Scope, wären aber sinnvolle Erweiterungen für ein größeres Framework oder einen produktiveren Editor.

### Sichtbar zurückgestuftes Layer-Mapping

Status: Optional.

`modal-hierarchy-toBackground` blendet das Modal bewusst vollständig aus, weil ein halbtransparent sichtbares Modal nach dem Schließen UX-seitig missverständlich wäre. Ein echtes Mapping für „bleibt sichtbar, tritt aber visuell zurück“ wäre eher für Cards, Panels, Sidebars oder gestapelte Ebenen geeignet.

Mögliche Umsetzung:

- Neue Komponente oder neues Beispiel: `panel`, `card`, `sidebar` oder gestapeltes `layer`.
- Hierarchie-Mapping mit `opacity: [1, 0.55]` oder `opacity: [1, 0.7]`.
- Zusätzlich leichte Skalierung oder z-Offset, damit der Rücktritt als Hierarchiewechsel lesbar wird.
- Semantische Abgrenzung zu `direction-exit`: Das Element verlässt nicht die UI, sondern bleibt als niedrig priorisierte Ebene sichtbar.

Präzisierte Richtung:

- Für den späteren Editor prüfen, ob `modal-hierarchy-toBackground` aus der auswählbaren Modal-UI entfernt wird.
- `modal-hierarchy-toForeground` kann bleiben, weil ein Modal sinnvoll als Vordergrund-/Fokus-Ebene erscheint.
- Ein echtes `toBackground`-Mapping sollte stattdessen an einer Komponente demonstriert werden, die sichtbar im Layout verbleiben darf.
- Am plausibelsten wären `card` oder `panel`, zum Beispiel für Galerie-, Dashboard- oder Layer-Kontexte.
- Beispiel: Eine aktive Card liegt vergrößert im Vordergrund; beim Zurücktreten skaliert sie leicht herunter, verliert Deckkraft oder Schattenintensität und ordnet sich wieder hinter/zwischen benachbarten Cards ein.
- Dadurch wäre `hierarchy-toBackground` semantisch sauber von `direction-exit` getrennt: Die Card verschwindet nicht, sondern verliert nur visuelle Priorität.

Offene Entscheidung:

- Prüfen, ob `card` oder `panel` besser zum Editor-Scope passt.
- Wenn eine dieser Komponenten aufgenommen wird, dazu ein eigenes Hierarchie-Paar modellieren:
  - `card-hierarchy-toForeground`
  - `card-hierarchy-toBackground`
  - oder entsprechendes `panel-*`-Mapping.

### Explizites Scale-Modell prüfen

Status: Optional.

`scaleFactor` wird aktuell bewusst kontextabhängig interpretiert:

- Hierarchie mit positivem Wert: Scale-In
- Hierarchie mit negativem Wert: Scale-Out
- andere Dimensionen: Pulse

Diese Regel reicht für den aktuellen Scope. Falls später weitere Scale-Bedeutungen entstehen, sollte das Datenmodell präzisiert werden.

Mögliche Umsetzung:

- `scaleMode: "pulse" | "scaleIn" | "scaleOut"`
- oder explizite `scaleKeyframes`
- oder ein generisches Phasen-/Target-Modell, falls Scale nur ein Teil komplexerer Sequenzen ist

Prüfen, wenn:

- Scale nicht mehr nur Pulse oder Hierarchie ausdrückt.
- ein Mapping Squash, Pressed-State, Overshoot oder gestaffelte Skalierung braucht.
- Preview und Export anfangen, unterschiedliche Scale-Regeln zu benötigen.

## Erledigt

- `button-feedback-success` Begründung ohne Aufwärtsbewegung geschärft.
- `hierarchy-toBackground` Kommentar und Begründung präzisiert.
- Spring-Kommentar in `types.ts` präzisiert.
- `toast-attention-oneShot` von Opacity-Pulse auf echte Scale-Impulse umgestellt.
- `scaleFactor`-Interpretation in Preview und Export bewusst umgesetzt.
- Preview-Replay-Hold für Modal-Enter/-Exit, Hierarchie, Skeleton-Resolved und Input-Blur vereinheitlicht.
- Opacity als ergänzenden Sichtbarkeitsparameter theoretisch legitimiert.
- Kontextabhängige `scaleFactor`-Interpretation dokumentiert.

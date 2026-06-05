# TODOs vor Editor- und UI-Implementierung

Diese Datei sammelt die noch offenen Punkte, die das Framework vor dem eigentlichen Editor möglichst stabil machen sollen. Ziel ist, spätere UI-Umbauten zu vermeiden, indem Datenmodell, Validierung, Exportlogik und semantische Sonderfälle vorher geklärt werden.

## Offene Reihenfolge

1. Spring, `motionPhases`, Validierung und Exportlogik in den Hauptprototyp übernehmen.

## 1. Spring, `motionPhases`, Validierung und Exportlogik in den Hauptprototyp übernehmen

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

## Laufende Pflege: README synchronisieren

Status: Laufend.

Aktueller Befund:

- Die README ist die erste Orientierung für das Repository.
- Framework, POCs und Prototyp ändern sich während der Umsetzung weiter.
- Die README sollte deshalb nicht erst am Ende einmalig korrigiert werden.

TODO:

- Nach größeren Änderungen an Framework, Prototyp, POCs oder Projektstruktur prüfen, ob die README noch stimmt.
- Komponentenliste, Mapping-Anzahl, Tech Stack und Projektstruktur aktuell halten.
- Prototypstatus ehrlich beschreiben: Demonstrationsartefakt, kein produktionsreifes Tool.
- Vor Abgabe final prüfen, ob README, `docs/`, Code und Wiki denselben Stand kommunizieren.

Akzeptanzkriterium:

- Die README gibt jederzeit grob korrekt wieder, was das Projekt aktuell enthält und was bewusst nicht geleistet wird.

## Optional: Weitere UI-Komponenten als Framework-Erweiterung prüfen

Status: Optional, nach dem Hauptprototyp oder im Ausblick.

Aktueller Befund:

- Das Card-Experiment wurde als Branch geprüft und nicht für den Framework-Kern empfohlen.
- Die bestehende Komponentenmenge deckt alle fünf Bedeutungsdimensionen und die Peirce-Trichotomie bereits ab.
- Weitere Komponenten könnten trotzdem als spätere Erweiterung interessant sein, falls sie eine echte semantische Lücke schließen.

Mögliche Kandidaten:

- Badge oder Notification-Dot für Aufmerksamkeit.
- Page/View Transition für Direction.
- Drawer oder Sidebar für Direction/Hierarchy.
- Panel oder Layer für sichtbare Zurückstufung.

TODO:

- Nur prüfen, wenn der Hauptprototyp stabil ist.
- Für jede mögliche Ergänzung klären:
  - Welche bisher nicht abgedeckte semantische Qualität wird ergänzt?
  - Entsteht eine neue Mapping-Logik oder nur eine Dopplung?
  - Muss dafür das Datenmodell erweitert werden?
  - Ist der Mehrwert groß genug, um den Scope zu erweitern?

Akzeptanzkriterium:

- Eine neue Komponente wird nur aufgenommen, wenn sie eine klar begründete theoretische Lücke schließt und nicht nur ein weiteres Beispiel für eine bereits abgedeckte Dimension ist.

## Erledigt

- Framework-Dokumentation mit dem finalen Datenmodell synchronisiert.
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
- `input-attention-requiredField` von Error-Shake auf dreifachen Attention-Pulse umgestellt und Rationale geschärft.
- `input-feedback-success` mit unterstützender Success-Markierung in der Preview geschärft und Rationale synchronisiert.

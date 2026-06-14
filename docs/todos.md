# TODOs Framework und Prototyp

Diese Datei sammelt die noch offenen Punkte am Semantic Motion Framework und am Prototyp. Ziel ist, fachliche Modellentscheidungen, Editor-Verhalten, Exportlogik und Dokumentation nachvollziehbar zu halten.

## Offene Reihenfolge

1. Finale Visual-Cue-Glyphs für den semantischen Möglichkeitsraum zeichnen oder modellieren.
2. Deaktivierte Editor-Kombinationen erklärbar machen.
3. Shareable Links für spezifische Editor-Mappings ergänzen.
4. Reduced-Motion-Strategie im Editor verständlich und simulierbar machen.
5. CSS-Export-Grenzen mapping-spezifisch klarer kommunizieren.

## 1. Finale Visual-Cue-Glyphs für den semantischen Möglichkeitsraum zeichnen oder modellieren

Status: Offen.

Aktueller Befund:

- `rationale.semanticContext.metaphor.visualCue` ist im Framework modelliert.
- Für die UI existiert aktuell nur eine vorläufige Zuordnung zu Lucide-Platzhaltern in `prototyp/src/framework/visualCues.ts`.
- Der Editor kann den semantischen Möglichkeitsraum bereits optional anzeigen.
- Die Platzhalter sind aber noch keine konsistente eigene Glyph-Sprache.

TODO:

- Für alle `VISUAL_CUE_IDS` eigene kleine Line-Glyphs entwerfen oder die Platzhalter bewusst final kuratieren.
- Glyphs konsistent halten:
  - gleiche Strichstärke
  - keine dekorativen Illustrationen
  - klein lesbar im Editor
  - maximal erklärend, nicht dominanter als Preview oder Rationale
- Prüfen, ob kombinierte Cues wie `arrival + refusalGesture` im Editor lesbar bleiben.
- Finale Umsetzung als austauschbare `VisualCueGlyph`-Komponente planen.

Akzeptanzkriterium:

- Der semantische Möglichkeitsraum nutzt eine visuell konsistente Cue-Sprache und ist nicht mehr auf rohe Platzhalter angewiesen.

## 2. Deaktivierte Editor-Kombinationen erklärbar machen

Status: Offen.

Aktueller Befund:

- Der Editor zeigt theoretisch definierte Dimensionen und Subkategorien an.
- Nicht unterstützte Kombinationen werden ausgegraut, z. B. `Toggle + Hierarchie`.
- Aktuell erklärt die UI aber nicht, warum eine Option deaktiviert ist.
- `getOutOfScopeCombinations()` ist im Classifier bereits vorhanden, wird aber nicht für UI-Feedback genutzt.
- Ohne Erklärung kann eine deaktivierte Option wie ein Bug wirken, obwohl es sich um eine bewusste Scope- und Framework-Entscheidung handelt.

TODO:

- Für deaktivierte Dimensionen und Subkategorien einen knappen Hinweis ergänzen.
- Möglichst keinen großen Textblock einbauen, sondern ein dezentes Pattern nutzen:
  - Tooltip
  - Inline-Hinweis im Auswahlbereich
  - oder kurzer Disabled-Reason unter der aktuell fokussierten Option
- Prüfen, ob generische Gründe reichen:
  - Kombination liegt außerhalb des aktuellen Framework-Scopes.
  - Für diese Komponente wurde keine fachlich tragfähige Zuordnung modelliert.
  - Die Dimension wird über andere Komponenten abgedeckt.
- Optional später spezifischere Gründe für einzelne Kombinationen ergänzen.

Akzeptanzkriterium:

- Deaktivierte Editor-Optionen sind als konzeptuelle Entscheidung erkennbar und wirken nicht wie kaputte UI.

## 3. Shareable Links für spezifische Editor-Mappings ergänzen

Status: Offen.

Aktueller Befund:

- Die App besitzt bereits Clean URLs für die vier Seiten.
- Der Editor hält die Auswahl aber nur im React-State von `App.tsx`.
- Die URL bleibt bei jeder Editor-Auswahl `/editor`.
- Eine konkrete Mapping-Auswahl kann dadurch nicht direkt verlinkt oder in einer Präsentation geöffnet werden.

TODO:

- URL-Parameter für Mapping-Auswahl ergänzen, z. B.:
  - `/editor?mapping=button-feedback-error`
- Beim Öffnen des Editors:
  - Query-Parameter lesen
  - Mapping per `getMappingById()` validieren
  - daraus `component`, `dimension` und `subcategory` setzen
  - bei ungültiger ID auf Default-Auswahl zurückfallen
- Bei Auswahlwechsel im Editor:
  - URL per `history.replaceState()` oder `pushState()` aktualisieren
  - dabei keine unnötigen History-Einträge erzeugen, wenn nur die Auswahl gewechselt wird
- Framework-Karte kann beim Öffnen im Editor direkt den Mapping-Parameter setzen.

Akzeptanzkriterium:

- Ein spezifisches Mapping kann direkt über eine URL geöffnet werden und ist damit präsentations- und reviewfähig verlinkbar.

## 4. Reduced-Motion-Strategie im Editor verständlich und simulierbar machen

Status: Offen.

Aktueller Befund:

- Reduced-Motion-Strategien sind im Datenmodell und in der Preview-Logik umgesetzt.
- Der Editor nutzt `useReducedMotion()` und respektiert `prefers-reduced-motion`.
- Für Nutzer ist aber nicht klar, was Strategien wie `replace`, `shorten` oder `static` konkret bedeuten.
- Es gibt kein UI-Element, um Reduced Motion im Editor bewusst zu simulieren.

TODO:

- Reduced-Motion-Information im Editor verständlicher anzeigen:
  - nicht nur Strategie-Name
  - sondern kurze Erklärung, was im konkreten Mapping reduziert wird
- Optional einen Preview-Schalter ergänzen:
  - Systempräferenz
  - Reduced Motion simulieren
  - normale Motion erzwingen
- Prüfen, ob dieser Schalter nur im Editor-Preview-Bereich liegen sollte, damit er nicht wie eine globale App-Einstellung wirkt.
- Besonders prüfen:
  - `button-attention-persistent`
  - `skeleton-attention-loading`
  - Toast-Mappings mit Phasen
  - wiederholte Attention-Mappings

Akzeptanzkriterium:

- Nutzer können im Editor nachvollziehen und testen, wie ein Mapping bei Reduced Motion dargestellt wird.

## 5. CSS-Export-Grenzen mapping-spezifisch klarer kommunizieren

Status: Offen.

Aktueller Befund:

- Der CSS-Export weist bereits auf Grenzen bei Spring und phasenspezifischem Easing hin.
- Der Hinweis ist aber eher generisch.
- Es wird nicht deutlich genug, welches konkrete Mapping gerade approximiert wird und welcher semantische Parameter dadurch verloren gehen kann.
- Besonders Spring-Mappings verlieren im CSS-Export den physikalischen Charakter.

TODO:

- CSS-Hinweise im Export-Panel mapping-spezifischer formulieren.
- Bei Spring:
  - klar sagen, dass CSS keine echte Framer-Motion-Spring-Physik abbildet
  - benennen, dass `springConfig` nur im Framer-Motion-Export erhalten bleibt
  - auf die konkrete Mapping-ID verweisen
- Bei `motionPhases` mit phasenspezifischem Easing:
  - erklären, ob und wie stark der CSS-Export approximiert
  - deutlich machen, dass Framer Motion die präzisere Ausgabe ist
- Visuell prüfen, ob der Hinweis stärker hervorgehoben werden muss, ohne den Codebereich zu überladen.

Akzeptanzkriterium:

- Beim CSS-Export ist pro betroffenem Mapping klar, ob eine Approximation vorliegt und welche semantische Qualität dadurch eingeschränkt wird.

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

- Editor-Integration mit allen 24 Mappings im Haupteditor geprüft und Mapping-Review-Punkte abgearbeitet.
- Export-Logik aus POC 04 lokal in den Hauptprototyp nach `prototyp/src/editor/export/` überführt.
- Export-UI im Editor mit Framer-Motion-/CSS-Tabs, Live-Code, Copy-to-Clipboard und CSS-Hinweisen fertiggestellt.
- Preview-Komponenten im Editor mit echten Framer-Motion-Animationen angebunden.
- Reduced Motion in der Editor-Preview über `useReducedMotion` und Mapping-Strategien berücksichtigt.
- Preview-Logik aus POC 03 in den Hauptprototyp nach `prototyp/src/editor/preview/` überführt.
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

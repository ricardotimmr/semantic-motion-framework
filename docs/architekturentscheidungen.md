# Architekturentscheidungen

## Zweck

Dieses Dokument hält bewusste Modellierungs- und Architekturentscheidungen fest, die aus der Evaluation des Framework-Kerns hervorgegangen sind. Es dient als Ergänzung zu `framework-konzept.md` und erklärt, warum bestimmte technische Vereinfachungen im Prototyp beibehalten werden.

---

## ADR-01: Eindeutiges Mapping statt austauschbarer Pattern-Varianten

### Entscheidung

Das Semantic Motion Framework modelliert keine austauschbaren Motion-Pattern-Varianten. Für eine Kombination aus Komponente, Bedeutungsdimension und Subkategorie gibt es genau ein theoretisch hergeleitetes Mapping.

Die ID-Struktur `{component}-{dimension}-{subcategory}` bleibt deshalb bewusst erhalten. Sie ist nicht nur ein technisches Ordnungsschema, sondern Ausdruck der konzeptuellen Eindeutigkeit des Frameworks.

### Begründung

Das Framework ist als Klassifikationssystem konzipiert, nicht als Stilguide mit mehreren gleichwertigen Optionen. Die zentrale These der Arbeit ist, dass Animationsparameter aus semiotischen und wahrnehmungspsychologischen Prinzipien abgeleitet werden.

Wenn eine Kombination wie `button + feedback + error` semiotisch als Index verstanden wird, der auf die Ablehnungsgeste verweist, dann ist der horizontale Shake keine beliebige Variante. Er ist die Konsequenz der theoretischen Herleitung.

Ein Pattern-Modell mit Feldern wie `variant`, `recommended` oder `patternId` würde implizieren, dass mehrere ästhetische Alternativen zur Auswahl stehen. Das würde die Kernaussage des Frameworks abschwächen: Die Parameterentscheidungen sollen nicht als Geschmackssache, sondern als semantisch begründete Zuordnung verstanden werden.

### Abgrenzung

Accessibility-Alternativen wie `prefers-reduced-motion` wären keine stilistischen Varianten, sondern reduzierte Repräsentationen derselben semantischen Aussage. Sie können in einer späteren Ausbaustufe ergänzt werden, ohne die Eindeutigkeit des semantischen Mappings zu brechen.

---

## ADR-02: Dokumentierte Mutex-Regel statt TypeScript-Union für Bewegungsfelder

### Entscheidung

`AnimationParams` bleibt vorerst als einfaches Interface modelliert. Die Regel, dass innerhalb eines Mapping-Eintrags nur eines der drei Bewegungsfelder `translatePx`, `scaleFactor` oder `trackFactor` verwendet werden soll, wird dokumentiert, aber nicht durch ein TypeScript-Union-Modell erzwungen.

### Begründung

Ein echtes TypeScript-Union-Modell könnte die Mutex-Regel technisch erzwingen. Es würde jedoch die Datenstruktur und alle späteren Preview- und Export-Funktionen deutlich komplexer machen, weil jedes Bewegungsfeld nur noch nach Typ-Guards zugänglich wäre.

Für den aktuellen Prototyp ist dieser Mehraufwand nicht gerechtfertigt. Der Editor ist ein Demonstrationsartefakt für die Bachelorarbeit, kein produktiver Code-Generator mit CI-abgesicherter Datenvalidierung.

Die Mutex-Regel ist dokumentiert und wird bei der Erstellung der Mapping-Einträge bewusst eingehalten. Eine maschinelle Erzwingung durch TypeScript oder einen Validierungstest wäre eine sinnvolle Weiterentwicklung, ist aber für den Demonstrationscharakter des Prototyps nicht erforderlich.

### Abgrenzung

Die Entscheidung bedeutet nicht, dass die Regel fachlich optional ist. Konzeptuell bleibt sie gültig: Ein Mapping-Eintrag soll nicht gleichzeitig translatorische Bewegung, Skalierung und komponentenbezogene Track-Bewegung als primäres Bewegungsausmaß kodieren.

Eine produktive Weiterentwicklung des Frameworks könnte entweder ein discriminated union in TypeScript oder einen separaten Validierungstest einführen, der die Mapping-Datenbank auf Regelverletzungen prüft.

---

## ADR-03: Semantische Achse und Render-Richtung getrennt modellieren

### Entscheidung

`direction` bleibt im Datenmodell als semantisch relevante Bewegungsachse erhalten (`"x"` oder `"y"`). Für größenabhängige Enter-/Exit-Bewegungen werden zusätzlich explizite Felder ergänzt:

- `translateDistance: "self"` für eine Translation um die volle Breite oder Höhe des Elements
- `translateFrom` für die Startkante einer Enter-Bewegung
- `translateTo` für die Zielkante einer Exit-Bewegung

Damit werden Platzhalterwerte wie `translatePx: -1` für "volle Höhe von unten" vermieden.

### Begründung

Im ursprünglichen Modell hatte `direction` zwei Rollen gleichzeitig: Einerseits beschreibt es die semantische Achse, die für Direction Bias relevant ist. Andererseits musste der Editor daraus konkrete Render-Informationen ableiten, etwa ob ein Element von links, rechts, oben oder unten kommt.

Für die semantische Klassifikation reicht die Achse aus. Für Preview und Code-Export ist sie jedoch zu grob. Ein Modal mit `direction: "y"` kann von oben oder unten kommen; ein Export-Generator muss diese Information explizit kennen.

Die neue Modellierung trennt deshalb die Ebenen, ohne ein großes Render-Modell einzuführen. `direction` bleibt die semantische Achse, während `translateFrom`, `translateTo` und `translateDistance` nur die fehlenden Render-Hinweise für größenabhängige Translationen ergänzen.

### Abgrenzung

Feste Pixelbewegungen wie Shake bleiben weiterhin über `translatePx` modelliert. Komponentenbezogene Track-Bewegungen wie Toggle oder Skeleton bleiben vorerst über `trackFactor` modelliert. Mehrphasige Animationen werden durch diese Entscheidung noch nicht vollständig gelöst; sie bleiben ein separater Modellierungspunkt.

---

## ADR-04: `trackFactor` als komponenteneigene Bewegungsstrecke

### Entscheidung

`trackFactor` bleibt als Feldname erhalten, wird aber nicht mehr ausschließlich als Toggle-spezifischer Track verstanden. Das Feld beschreibt allgemein einen normalisierten Anteil einer komponenteneigenen Bewegungsstrecke.

### Begründung

Sowohl Toggle als auch Skeleton benötigen eine Bewegung, deren konkrete Pixelstrecke erst im Komponenten-Rendering bekannt ist:

- Beim Toggle ist es die Breite des Toggle-Tracks.
- Beim Skeleton Loader ist es die Strecke des Shimmer-Effekts über die Skeleton-Fläche.

Beide Fälle folgen derselben Logik: Das Mapping definiert einen normalisierten Faktor, die Komponente löst ihn zur Renderzeit in konkrete Pixelwerte oder CSS-Transformationen auf.

### Abgrenzung

`trackFactor` wird nicht für freie Enter-/Exit-Translationen verwendet. Diese werden über `translateDistance`, `translateFrom` und `translateTo` modelliert. Feste Pixelbewegungen wie Shake bleiben `translatePx`.

---

## ADR-05: Zentrale Runtime-Optionen und Out-of-Scope-Kombinationen

### Entscheidung

Die theoretisch benennbaren Komponenten, Bedeutungsdimensionen und Subkategorien werden als Runtime-Konstanten in `types.ts` definiert. Der Classifier verwendet diese Konstanten, statt eigene Listen zu pflegen.

Die frühere Analysefunktion `getUnsupportedCombinations` wird konzeptuell als `getOutOfScopeCombinations` verstanden: Sie beschreibt Kombinationen, die zwar durch das allgemeine Framework-Vokabular benennbar sind, aber bewusst nicht Teil der Mapping-Datenbank sind.

### Begründung

Der Editor soll nicht nur verfügbare Mappings anzeigen, sondern bei Bedarf auch Scope-Grenzen sichtbar machen können. Dafür braucht er zwei Informationsquellen:

- alle theoretisch definierten Optionen aus dem Framework-Vokabular
- die tatsächlich vorhandenen Mappings aus der Mapping-Datenbank

Diese Trennung erlaubt eine UI, in der nicht abgedeckte Dimensionen oder Subkategorien ausgegraut werden. Eine ausgegraute Option ist dabei kein Fehler, sondern ein Hinweis darauf, dass diese Kombination außerhalb des definierten Prototyp-Scopes liegt.

### Abgrenzung

Die Editor-Auswahl bleibt datenbankgetrieben. `getOutOfScopeCombinations` ist ein Analyse- und Dokumentationswerkzeug, nicht die primäre Grundlage der normalen Nutzerführung. Für die UI sind vor allem die definierten Runtime-Optionen und die datenbankbasierten Funktionen wie `getDimensionsForComponent`, `getSubcategoriesForDimension` und `isSupportedCombination` relevant.

---

## ADR-06: Lesbare Quellenbegründung plus strukturierte Referenzkeys

### Entscheidung

Jeder Mapping-Eintrag enthält weiterhin einen lesbaren wissenschaftlichen Begründungstext in `rationale.source`. Zusätzlich enthält jeder Eintrag eine maschinenlesbare Quellenliste in `rationale.references`.

### Begründung

`source` erklärt, wie die jeweilige Parameterentscheidung theoretisch hergeleitet ist. Diese Ebene ist für akademische Nachvollziehbarkeit und spätere Dokumentation wichtig, lässt sich aber nur schwer konsistent prüfen.

`references` ergänzt deshalb strukturierte Referenzkeys wie `Ware2012`, `ZacksTversky2001` oder `Peirce1931`. Dadurch lässt sich nachvollziehen, welche theoretischen Quellen ein Mapping stützen, ohne die lesbare Begründung zu ersetzen.

Diese Trennung stärkt NFA-07: Die Mapping-Datenbank bleibt verständlich, wird aber zugleich besser prüfbar und konsistenter dokumentierbar.

### Abgrenzung

Die Referenzkeys modellieren keine vollständige Bibliografie und keine parameterweise Quellenmatrix. Sie markieren die für den Mapping-Eintrag relevanten Quellen. Die detaillierte Argumentation bleibt im `source`-Text und im Theoriekapitel.

---

## ADR-07: Zweistufige Begründungsanzeige im Editor

### Entscheidung

Der Editor zeigt `rationale.short` als standardmäßige Begründung an. `rationale.source` bleibt im Datenmodell erhalten und kann optional über eine Detail- oder Tooltip-Ansicht zugänglich gemacht werden, etwa über ein kleines Info-Icon neben der Kurzbegründung.

### Begründung

Die Standardansicht soll ohne Semiotik-Vorwissen verständlich bleiben. Deshalb ist `short` auf der Ebene von Normans Signifier-Begriff formuliert und vermeidet unnötige Fachterminologie.

Gleichzeitig soll die wissenschaftliche Nachvollziehbarkeit nicht nur im Code verborgen bleiben. Eine optionale Detailansicht erlaubt es, Peirce-Zeichentyp, Wahrnehmungsgrundlage und Quellenbezug sichtbar zu machen, ohne die Hauptoberfläche zu überladen.

### Abgrenzung

`source` ist nicht die primäre Erklärung für normale Nutzer. Es ist eine vertiefende Ebene für wissenschaftliche Nachvollziehbarkeit, Design-Reviews, Export-Kommentare oder interessierte Nutzer.

---

## ADR-08: Opacity als ergänzender Sichtbarkeitsparameter

### Entscheidung

`opacity` wird im Semantic Motion Framework als gültiger, aber ergänzender Animationsparameter behandelt. Opacity ist kein räumlicher Bewegungsparameter wie Translation, Scale oder Track-Bewegung. Sie beschreibt einen zeitbasierten Sichtbarkeitsübergang.

Die Mutex-Regel für Bewegungsfelder bezieht sich deshalb nur auf die räumlichen Bewegungsgruppen `translatePx`/`translateDistance`, `scaleFactor` und `trackFactor`. `opacity` darf zusätzlich oder in begründeten Fällen alleine verwendet werden.

### Begründung

Das Framework ist ein Motion-Framework und soll nicht jede animierbare Eigenschaft beliebig als Motion deklarieren. Opacity verändert keine Position, Größe oder Bewegungsrichtung eines Elements. Trotzdem kann ein Deckkraftübergang in UI-Animationen semantisch tragfähig sein, wenn Sichtbarkeit selbst die Bedeutung trägt.

Einblenden kann Erscheinen, Aktivwerden oder Verfügbarkeit kommunizieren. Ausblenden kann Verschwinden, Abschluss, Fokusverlust oder das Ende eines Ladezustands kommunizieren. Semiotisch lässt sich das als ikonische Beziehung begründen: Verblassen ähnelt physikalischem Verschwinden, Einblenden ähnelt dem Sichtbarwerden eines Objekts.

Deshalb wird Opacity nicht als primärer Bewegungsparameter, sondern als ergänzender Sichtbarkeitsparameter modelliert. Opacity-only-Mappings sind zulässig, müssen aber besonders sorgfältig begründet werden.

### Abgrenzung

Opacity darf nicht als Ersatz für fehlende Bewegung verwendet werden, wenn die Bedeutung eigentlich durch Richtung, Amplitude, Rhythmus oder Skalierung getragen werden müsste. Bei jedem Opacity-only-Mapping muss geprüft werden, ob Sichtbarkeit tatsächlich der Bedeutungsträger ist.

Beispiele für legitime Opacity-only-Fälle sind das Ausblenden eines Skeleton Loaders nach abgeschlossenem Ladevorgang oder das Erscheinen eines Warnhinweises, wenn der Sichtbarkeitswechsel selbst die semantische Information trägt.

---

## ADR-09: Explizite Interpretation von `scaleFactor` über `scaleMode`

### Entscheidung

`scaleFactor` bleibt im Datenmodell als relatives Skalierungsdelta erhalten. Die semantische Interpretation wird aber nicht mehr aus Dimension und Vorzeichen abgeleitet, sondern explizit über `scaleMode` beschrieben.

Zulässige Werte:

- `pulse`: `1.0 -> 1.0 + scaleFactor -> 1.0`
- `scaleIn`: `1.0 - scaleFactor -> 1.0`
- `scaleOut`: `1.0 -> 1.0 - scaleFactor`

`scaleFactor` ist dadurch immer ein positiver Intensitätswert. Negative Werte werden nicht mehr verwendet, um Scale-Out zu kodieren.

### Begründung

Die frühere Kontextregel war technisch funktionsfähig, aber semantisch zu implizit: Derselbe Wert `scaleFactor: 0.05` konnte je nach Dimension Pulse oder Scale-In bedeuten, während ein negativer Wert Scale-Out kodierte. Das war für Preview und Export umsetzbar, aber im Mapping selbst nicht eindeutig genug.

Mit `scaleMode` steht die beabsichtigte Scale-Bewegung direkt im Mapping. Dadurch müssen Preview, Export und späterer Editor die Bedeutung nicht mehr aus Dimension und Vorzeichen rekonstruieren.

Diese Entscheidung stärkt die Nachvollziehbarkeit:

- Pulse bleibt als Feedback- oder Aufmerksamkeitssignal lesbar.
- Scale-In bleibt als Eintritt in den Vordergrund lesbar.
- Scale-Out bleibt als Zurücktreten oder Fokusverlust lesbar.

### Abgrenzung

`scaleMode` ist kein allgemeines Keyframe-Modell. Es deckt nur einfache Scale-Fälle ab, die durch ein einzelnes Delta beschrieben werden können.

Komplexere Scale-Sequenzen, etwa mehrere Impulse, Overshoot oder gestaffelte Skalierung, werden weiterhin über `motionPhases` mit `scaleKeyframes` modelliert. Top-Level-`scaleKeyframes` werden im aktuellen Scope nicht eingeführt.

### Konsequenz

Die Mapping-Validierung verlangt, dass `scaleFactor` und `scaleMode` gemeinsam auftreten. `scaleFactor` muss positiv und endlich sein. POC 03 und POC 04 interpretieren Scale-Bewegungen nicht mehr über Dimension und Vorzeichen, sondern über `scaleMode`.

---

## ADR-10: Mehrphasige Animationen über `motionPhases`

### Entscheidung

Mehrphasige Animationen werden im Framework über das optionale Feld `motionPhases` in `AnimationParams` modelliert. Eine Motion-Phase beschreibt einen sequenziellen Bewegungsschritt auf demselben animierten Hauptelement, zum Beispiel:

- Einfahrt von unten
- anschließender Shake
- anschließender Nudge
- anschließende Scale-Impulse

Wenn `motionPhases` vorhanden ist, gilt diese Sequenz als primäre Bewegungsbeschreibung. Die flachen Bewegungsfelder wie `direction`, `translateFrom`, `keyframes`, `opacity`, `scaleFactor` oder `scaleMode` werden dann nicht zusätzlich auf oberster Parameterebene verwendet.

### Finale Modellregeln

Für `motionPhases` gelten folgende Regeln:

- `duration` auf Top-Level beschreibt die semantische Gesamtdauer der Bewegung.
- Diese Top-Level-`duration` entspricht der Summe der Phasendauern ohne `delay`.
- `delay` innerhalb einer Phase ist ein zusätzlicher Playback-Abstand vor dieser Phase und zählt nicht zur semantischen Bewegungsdauer.
- `iterations` auf Top-Level wiederholt die komplette Phasensequenz, nicht einzelne Phasen.
- Phasen dürfen eigene `easing`-Werte haben, wenn eine Phase bewusst eine andere Bewegungsqualität braucht.
- Mehrere Keyframe-Sequenzen innerhalb derselben Phase, etwa `keyframes`, `scaleKeyframes` und `opacityKeyframes`, sind nur sauber, wenn sie dasselbe `times`-Raster verwenden.

Diese Regeln werden durch die zentrale Mapping-Validierung geprüft, soweit sie strukturell prüfbar sind. Dadurch bleibt das Phasenmodell klein, aber für Preview und Export eindeutig interpretierbar.

### Begründung

Die Toast-Mappings haben gezeigt, dass einige semantische Bewegungen nicht sauber durch ein einzelnes flaches Parameterobjekt beschrieben werden können:

- `toast-feedback-error`: y-Einfahrt plus x-Shake
- `toast-feedback-warning`: y-Einfahrt plus y-Nudge
- `toast-attention-oneShot`: y-Einfahrt plus Scale-Impulse

Diese Fälle waren in den POCs zunächst als gezielte Renderer-Sonderfälle umgesetzt. Das war für die frühe Prüfung vertretbar, hätte aber vor dem Hauptprototyp zu inkonsistenter Logik geführt: Die Mapping-Datenbank hätte nur einen Teil der tatsächlichen Bewegung beschrieben, während Preview und Export die fehlende Sequenzlogik hart codiert hätten.

`motionPhases` verschiebt diese Sequenz wieder in das Framework-Modell. Dadurch beschreiben Mapping-Daten, Preview und Export dieselbe Struktur. Der Renderer muss nicht mehr wissen, dass bestimmte Toast-IDs besondere Fälle sind, sondern verarbeitet eine generische Phasenliste.

### Abgrenzung

`motionPhases` ist bewusst kein allgemeines Szenen- oder Target-Modell. Eine Phase beschreibt nur die Bewegung desselben Hauptelements. Komponenten mit mehreren Teilzielen, etwa Input mit Container, Label und Helper-Text, bleiben weiterhin komponentenspezifische Renderer-Fälle.

Ein allgemeines Target-Modell wäre erst sinnvoll, wenn mehrere Komponenten regelmäßig interne Teilziele wie Backdrop, Panel, Icon, Label oder Content unabhängig voneinander animieren müssen.

### Konsequenz

POC 03 rendert mehrphasige Mappings nun generisch über `motionPhases`. POC 04 exportiert dieselbe Phasenstruktur generisch für Framer Motion und CSS. Die Mapping-Validierung prüft zusätzlich die Struktur der Phasen, unter anderem Keyframe-Längen, Monotonie der Zeiten und die Trennung von flachen Bewegungsfeldern und Phasenmodell.

Framer Motion kann phase-spezifische `easing`-Werte direkt abbilden. CSS kann kombinierte Keyframes dagegen nur eingeschränkt mit unterschiedlichen Easing-Kurven pro Phase beschreiben. Der CSS-Export darf solche Fälle deshalb als Approximation kennzeichnen und eine globale Timing-Funktion verwenden.

---

## ADR-11: Reduced Motion als Accessibility-Metadatum

### Entscheidung

Reduced Motion wird im Framework als optionales Accessibility-Metadatum am Mapping-Eintrag modelliert:

```ts
accessibility: {
  reducedMotion: "none" | "shorten" | "replace" | "static"
}
```

Diese Angabe ist keine zusätzliche ästhetische Variante und keine alternative Pattern-Auswahl. Das semantische Mapping bleibt eindeutig. `reducedMotion` beschreibt nur, wie dieselbe Bedeutung bei aktivierter Systemeinstellung `prefers-reduced-motion` mit weniger oder ohne problematische Bewegung dargestellt werden soll.

### Strategien

- `none`: Keine besondere Reduktion erforderlich.
- `shorten`: Bewegung bleibt erhalten, wird aber in Dauer, Wiederholung oder Amplitude reduziert.
- `replace`: Problematische Bewegung wird durch eine weniger bewegungsintensive Darstellung ersetzt, etwa durch Opacity, Farbzustand, Border oder statischen Status.
- `static`: Bewegung entfällt vollständig; ein statischer Zustand trägt die Information.

### Begründung

Das Framework ist ein Motion-Framework und keine umfassende Accessibility-Systematik. Trotzdem betreffen einige Mappings potenziell Nutzerinnen und Nutzer, die Bewegung reduzieren müssen oder von wiederholter Bewegung abgelenkt werden können. Besonders relevant sind:

- endlose oder wiederholte Bewegung, z. B. `button-attention-persistent` und `skeleton-attention-loading`
- Shake-Animationen
- Spring/Overshoot
- großflächige Translationen, z. B. Toast- oder Modal-Einfahrten
- systeminitiierte Bewegung ohne direkte Nutzeraktion

WCAG 2.2 SC 2.3.3 behandelt Animationen aus Interaktionen, WCAG 2.2 SC 2.2.2 behandelt automatisch startende, länger laufende oder wiederholte Bewegung. Für Fokuszustände bleibt WCAG 2.2 SC 2.4.7 relevant: Fokus muss auch ohne Animation sichtbar bleiben.

### Konsequenz

Der spätere Editor soll die Strategie automatisch auswerten, nicht als frei wählbare Variante anbieten. Wenn `prefers-reduced-motion` aktiv ist, entscheidet der Renderer anhand von `accessibility.reducedMotion`, ob die Animation normal läuft, verkürzt, ersetzt oder statisch dargestellt wird.

POC 03 bildet diese Entscheidung als Testmodus ab: Der Reduced-Motion-Schalter simuliert die Systemeinstellung und zeigt, wie Mappings mit hinterlegter Strategie reduziert dargestellt werden.

---

## ADR-12: Komponentenspezifische Renderer-Regeln für interne Teilziele

### Entscheidung

Das generische Mapping-Modell beschreibt die semantisch begründete Motion-Entscheidung für eine UI-Komponente. Es modelliert nicht jedes interne Teilziel einer Komponente.

Interne Teilziele wie Border, Label, Helper-Text, Shadow, Backdrop oder Container-Zustand bleiben im aktuellen Scope Verantwortung des komponentenspezifischen Renderers. Es wird vor dem Hauptprototyp kein allgemeines Feld wie `target: "container" | "label" | "message"` eingeführt.

### Beispiele

- `input-stateChange-focus`: Das Mapping beschreibt den semantischen Übergang in den Fokuszustand. Der Renderer darf diesen Zustand über Border, Label, Shadow und Container-Zustand darstellen.
- `input-stateChange-blur`: Das Mapping beschreibt den Verlust des Fokus. Der Renderer setzt die entsprechenden Teilziele zurück.
- `input-feedback-success`: Das Mapping beschreibt ein sehr subtiles Success-Feedback. Der Renderer darf den minimalen Pulse durch Border- und Label-Markierung stützen, damit die Bestätigung wahrnehmbar bleibt, ohne das Feld stärker zu bewegen.
- `input-feedback-warning`: Das Mapping beschreibt eine Warnung während der Eingabe. Der Renderer darf dafür einen Helper-Text mit lokalem y-Offset und Opacity einblenden.
- `modal-hierarchy-toBackground`: Das Mapping beschreibt den Fokusverlust und das Zurücktreten des Modals. Beim Modal wird diese Bedeutung als Entfernen/Ausblenden gerendert, weil ein halbtransparent sichtbares geschlossenes Modal UX-seitig missverständlich wäre.

### Begründung

Ein allgemeines Target-Modell würde das Framework stärker in Richtung eines komponentenspezifischen Render-Schemas verschieben. Für den aktuellen Scope ist das nicht notwendig, weil die semantische Zuordnung weiterhin eindeutig im Mapping liegt und nur die konkrete visuelle Umsetzung auf Teilziele komponentenabhängig ist.

Diese Trennung hält das Framework klein:

- Das Mapping erklärt, welche Bedeutung durch Motion kommuniziert werden soll.
- Der Renderer entscheidet, welche Teilflächen einer konkreten Komponente diese Bedeutung visuell tragen.

Dadurch kann der spätere Editor Input-, Toast-, Modal- oder Skeleton-spezifische Visualisierungen implementieren, ohne das generische Datenmodell mit komponentenspezifischen Zielstrukturen zu überladen.

### Abgrenzung

Diese Entscheidung gilt nur, solange interne Teilziele komponentenspezifische Einzelentscheidungen bleiben. Ein allgemeines Target-Modell sollte erneut geprüft werden, wenn mehrere Komponenten regelmäßig dieselben Teilzieltypen benötigen, zum Beispiel:

- `container`
- `label`
- `message`
- `backdrop`
- `icon`
- `content`

Besonders bei möglichen Erweiterungen wie Card-, Panel-, Sidebar- oder gestapelten Layer-Mappings kann ein explizites Target-Modell sinnvoll werden. Vorher reicht die dokumentierte Renderer-Konvention.

---

## ADR-13: Semantischer Möglichkeitsraum als optionale Erklärungsebene

### Entscheidung

Das Framework ergänzt die bestehende Rationale um eine zusätzliche Erklärungsebene `semanticContext`. Diese Ebene beschreibt bildhafte Lesarten, visuelle Cues, primäre Lesart, angrenzende Lesarten und Abgrenzungen eines Mappings.

`semanticContext` ist Teil von `rationale`, nicht Teil der Animationsparameter. Die Ebene steuert weder Preview noch Export und verändert keine Mapping-Logik.

Die Editor-UI zeigt diese Ebene nur optional über den Toggle **Semantischer Möglichkeitsraum**. Der Toggle ist standardmäßig deaktiviert und nur auf der Editor-Seite sichtbar.

### Begründung

Das Feedback aus Research Diary 02 hat darauf hingewiesen, dass die theoretische Begründung zwar vorhanden ist, die bildhafte oder anschauliche Lesart einer Bewegung aber noch stärker sichtbar werden kann. Außerdem wurde angeregt, Graustufen zwischen Bedeutungen und einen semantischen Möglichkeitsraum zu reflektieren.

Das Framework bleibt trotzdem bei eindeutigen Mappings. Eine Kombination aus Komponente, Dimension und Subkategorie erhält weiterhin genau eine primäre Zuordnung. Der Möglichkeitsraum macht diese Zuordnung nicht beliebig, sondern erklärt:

- welche bildhafte Lesart die Bewegung stützt
- welche angrenzenden Bedeutungen mitgelesen werden können
- warum das Mapping dennoch bei seiner primären Dimension bleibt

Damit wird die wissenschaftliche Argumentation stärker, ohne das Framework in einen Variantenkatalog umzubauen.

### Modellierung

Die Ebene wird in `rationale.semanticContext` modelliert:

- `metaphor.label`
- `metaphor.visualCue`
- `primaryReading`
- `adjacentReadings`
- `boundaries`

Die Visual Cues werden über kontrollierte IDs in `VISUAL_CUE_IDS` beschrieben. Aktuell existiert eine vorläufige Zuordnung zu Icon-Platzhaltern. Finale Glyphs bleiben ein offener Gestaltungspunkt.

### Abgrenzung

Der semantische Möglichkeitsraum ist keine neue Framework-Dimension und kein neuer Animationsparameter. Er beschreibt keine alternativen Bewegungen und keine Gewichtung wie „70 Prozent Feedback, 30 Prozent Attention“.

Er ist eine Reflexionsebene innerhalb der Begründung:

- `rationale.short` erklärt die Bedeutung kompakt.
- `rationale.source` erklärt die theoretische Herleitung.
- `rationale.signType` benennt die semiotische Beziehung.
- `rationale.semanticContext` macht bildhafte Lesart, angrenzende Lesarten und Abgrenzung sichtbar.

### Konsequenz

Alle Mapping-Einträge müssen einen vollständigen `semanticContext` besitzen. Die zentrale Validierung prüft die Struktur und die erlaubten Visual-Cue-IDs.

Im Editor kann die Ebene zugeschaltet werden, ohne die Kernansicht zu überladen. Dadurch bleibt der Prototyp zuerst ein Werkzeug für Auswahl, Preview, Begründung und Export. Die zusätzliche Ebene dient der konzeptionellen Vertiefung und kann in Präsentation oder Bachelorarbeit gezielt erklärt werden.

Die ausführliche konzeptionelle Grundlage liegt in `docs/gesamtkonzept-bildhafte-lesarten-und-moeglichkeitsraum.md`.

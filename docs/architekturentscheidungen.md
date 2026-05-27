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

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

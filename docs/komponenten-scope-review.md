# Komponenten-Scope-Review nach Card-Experiment

Stand: 04. Juni 2026  
Kontext: Review des Branches `todo-1-card-panel-layer-mapping`

---

## Kurzfazit

Das Card-Experiment sollte nicht in den Framework-Kern übernommen werden.
Die bestehende Komponentenmenge ohne Card ist für den Bachelorarbeits-Scope
theoretisch tragfähiger und argumentativ sauberer.

Der aktuelle Befund lautet nicht: "Card ist als UI-Komponente ungeeignet."
Der Befund lautet: Card schließt im konkreten Semantic Motion Framework keine
ausreichend eigenständige semantische Lücke, die den zusätzlichen Scope
rechtfertigt.

---

## Ausgangsfrage

Nach der Schärfung von `modal-hierarchy-toBackground` blieb eine offene Frage:

Kann ein sichtbares `hierarchy-toBackground` besser durch Card, Panel oder eine
ähnliche Layout-Komponente demonstriert werden, weil ein Modal nach dem
Schließen nicht halbtransparent sichtbar bleiben sollte?

Das Card-Experiment wurde eingeführt, um diese Frage praktisch zu prüfen.

---

## Umgesetztes Card-Experiment

Im Branch wurde `card` als siebte Komponente ergänzt:

- `card-hierarchy-toForeground`
- `card-hierarchy-toBackground`

Die Idee war:

- `toForeground`: Eine Card wächst leicht und gewinnt Deckkraft.
- `toBackground`: Eine Card wird leicht kleiner, verliert Deckkraft, bleibt aber sichtbar.

In POC 03 wurde zusätzlich eine relationale Preview gebaut, in der eine zweite
Card als Kontext mitanimiert wird. Dadurch sollte sichtbar werden, dass eine
Card in den Vordergrund tritt und eine andere zurücktritt.

---

## Beobachteter Befund

Die Preview zeigt zwar technisch eine Stack-/Card-Bewegung, aber die beiden
Mappings sind semantisch nicht klar genug voneinander getrennt.

Das konkrete Problem:

- `toForeground` und `toBackground` bilden praktisch dieselbe relationale
  Umsortierung ab.
- Einmal wird die Bewegung aus Sicht der Card beschrieben, die nach vorne kommt.
- Einmal wird dieselbe Bewegung aus Sicht der Card beschrieben, die zurücktritt.
- Die Bedeutung entsteht dadurch nicht mehr sauber aus dem einzelnen
  Mapping-Eintrag, sondern aus der gesamten Stack-Szene.
- Die zweite Card ist notwendig, damit die Animation überhaupt verständlich
  wird. Damit liegt die eigentliche Bedeutung stark im Renderer-Kontext, nicht
  im generischen Mapping.

Das widerspricht der Grundlogik des Frameworks: Ein Mapping soll eine
semantisch begründete Zuordnung für eine Komponente, Dimension und Subkategorie
sein, nicht erst durch eine zusätzliche Szene erklärbar werden.

---

## Theoretische Einordnung

### Warum Card zunächst plausibel war

Card wirkt theoretisch attraktiv, weil Hierarchie über Größe, Deckkraft und
visuelles Gewicht kommuniziert werden kann. Das passt zu:

- Peirce: ikonische Beziehung durch Annäherung/Zurücktreten
- Treisman & Gelade: Größe und Kontrast als früh wahrnehmbare Merkmale
- Ware: visuelle Gewichtung und Nähe als Relevanzsignale

Damit war die Hypothese fachlich vertretbar.

### Warum Card im Framework trotzdem problematisch ist

Im konkreten Mapping entsteht die Bedeutung nicht nur durch die animierte Card,
sondern durch die Relation zu anderen Cards. Genau diese Relation ist aber kein
Teil des generischen Mapping-Modells.

Ein Card-Stack ist eher ein Layout- oder Komponentenverbund als eine einzelne
UI-Komponente. Würde man ihn sauber modellieren, bräuchte man eher:

- mehrere animierte Ziele
- z-index / Layer-Zustände
- Schatten und visuelle Gewichtung
- gegebenenfalls ein Target- oder Scene-Modell

Das wäre für den aktuellen Bachelorarbeits-Scope zu groß und würde das
Framework in Richtung konkreter Layout-Patterns verschieben.

---

## Prüfung alternativer Komponenten

### Badge oder Notification-Dot

Ein Badge oder Notification-Dot wäre für die Aufmerksamkeitsdimension plausibel,
besonders für `attention-persistent`.

Bewertung:

- Theoretisch passend, weil präattentive Bewegung und periphere Aufmerksamkeit
  gut zu Badge/Notification passen.
- Der Mehrwert gegenüber `button-attention-persistent`,
  `toast-attention-oneShot` und `skeleton-attention-loading` ist aber begrenzt.
- Es würde vor allem eine weitere Attention-Variante hinzufügen, ohne eine neue
  Bedeutungsdimension oder einen neuen Peirce-Zeichentyp abzudecken.

Empfehlung: Nicht vor dem Hauptprototyp ergänzen. Als Ausblick möglich.

### Page, Screen oder View Transition

Eine Page- oder Screen-Komponente könnte die Direction-Dimension sehr klar
abbilden, weil horizontale Navigation dort natürlicher ist als beim Modal.

Bewertung:

- Theoretisch stark für Direction Bias.
- Würde aber den Scope von UI-Komponenten zu ganzen Seiten- oder
  Navigationskontexten verschieben.
- Der Editor müsste dann nicht nur einzelne Komponenten, sondern ganze Views
  darstellen.
- `modal-direction-enter`, `modal-direction-exit`, `backEnter` und `backExit`
  decken Direction bereits ausreichend ab, wenn die Rationale klar zwischen
  Sheet-Öffnung und horizontaler Navigation unterscheidet.

Empfehlung: Nicht ergänzen. Falls Direction später stärker demonstriert werden
soll, wäre eine Page/View-Transition der beste Ausblickskandidat, aber nicht
Teil des aktuellen Framework-Kerns.

### Drawer oder Sidebar

Drawer/Sidebar könnten Direction und Hierarchie verbinden.

Bewertung:

- Passt gut zu seitlichem Ein- und Ausfahren.
- Überschneidet sich stark mit Modal/Sheet.
- Bringt dieselbe Gefahr wie Card: Die Bedeutung hängt schnell vom konkreten
  Layout-Kontext ab.

Empfehlung: Nicht ergänzen. Als Design-System-Erweiterung denkbar, aber nicht
für den aktuellen Prototyp nötig.

### Spinner oder Progress Indicator

Spinner oder Progress Indicator wären naheliegend für Loading.

Bewertung:

- Symbolische Bedeutung wäre gut argumentierbar.
- Der Skeleton Loader deckt den Symbol-Zeichentyp bereits stärker ab, weil der
  Shimmer keine ikonische oder indexikalische Grundlage hat und zusätzlich ein
  `resolved`-Mapping besitzt.
- Ein Spinner würde den Symbol-Fall eher verdoppeln als stärken.

Empfehlung: Nicht ergänzen. Skeleton bleibt die bessere Symbol-Komponente.

### Tooltip oder Popover

Tooltip/Popover könnten Aufmerksamkeit oder Hierarchie zeigen.

Bewertung:

- Überschneidet sich stark mit Toast und Modal.
- Die Abgrenzung wäre schwieriger als der Mehrwert.
- Für die Forschungsfrage entsteht keine neue theoretische Qualität.

Empfehlung: Nicht ergänzen.

---

## Bewertung des bestehenden Framework-Scopes ohne Card

Ohne Card deckt das Framework weiterhin alle zentralen Anforderungen ab:

| Dimension | Abdeckung ohne Card | Einschätzung |
|---|---|---|
| Feedback | Button, Toast, Input | Stark |
| State Change | Toggle, Input Focus/Blur | Stark |
| Direction | Modal/Sheet und horizontale Back-Mappings | Ausreichend |
| Hierarchie | Modal toForeground/toBackground als Fokusgewinn/-verlust | Ausreichend |
| Aufmerksamkeit | Button, Toast, Input Required, Skeleton Loading | Stark |

Auch die Peirce-Trichotomie bleibt vollständig:

| Zeichentyp | Abdeckung |
|---|---|
| Ikon | Toggle, Modal-Hierarchie, Input-Focus/Blur, Skeleton-Resolved |
| Index | Shake, Direction, Toast, Attention |
| Symbol | Skeleton-Loading |

Damit entsteht durch Card keine zwingende theoretische Notwendigkeit.

---

## Empfehlung für die Bachelorarbeit

Card sollte als geprüftes, aber verworfenes Erweiterungsexperiment behandelt
werden.

Empfohlene Formulierung für die Arbeit:

> Eine zusätzliche Card-Komponente wurde als mögliche Erweiterung der
> Hierarchie-Dimension geprüft, weil sie ein sichtbares Zurücktreten innerhalb
> eines Layouts besser abbilden könnte als ein Modal. In der prototypischen
> Umsetzung zeigte sich jedoch, dass die Bedeutung weniger aus dem einzelnen
> Mapping entsteht als aus einer mehrteiligen Stack-Szene. Dadurch würde ein
> zusätzliches Layout- oder Target-Modell nötig. Die Erweiterung wurde deshalb
> aus Scope-Gründen nicht in den Framework-Kern übernommen und als Ausblick
> eingeordnet.

Diese Entscheidung ist argumentativ stärker als eine erzwungene siebte
Komponente.

---

## Konsequenz für den weiteren Prototyp

Empfohlener Zielzustand vor dem Hauptprototyp:

- Framework wieder auf sechs Komponenten zurückführen:
  - Button
  - Toggle
  - Toast
  - Modal
  - Input
  - Skeleton
- Card-Mappings nicht in den Editor übernehmen.
- `modal-hierarchy-toBackground` als Fokusverlust/Entfernung aus der aktiven
  Ebene beibehalten.
- Sichtbar zurückgestufte Card-/Panel-Layer als Ausblick dokumentieren.
- Keine neue Komponente vor dem Editor ergänzen.

Der Mehrwert des Frameworks liegt nicht in möglichst vielen Komponenten,
sondern in der theoretisch sauberen Zuordnung von Bedeutungsdimensionen zu
Animationsparametern.

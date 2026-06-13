# Gesamtkonzept: Bildhafte Lesarten und semantischer Möglichkeitsraum

## Ausgangspunkt

Das Feedback aus Research Diary 02 zielt nicht auf eine einzelne technische Funktion, sondern auf eine Schwelle im Projekt:

Das Framework ist theoretisch begründet, aber diese Begründung muss für Nutzer des Editors auch schnell erfassbar werden. Der Editor soll nicht nur zeigen, welche Animation technisch gewählt wurde, sondern warum diese Bewegung semantisch naheliegt und wo ihre Bedeutung endet.

Die drei Feedbackpunkte lassen sich deshalb als ein gemeinsames Konzept verstehen:

1. Animationen brauchen eine bildhafte oder anschauliche Lesart.
2. Bedeutungen sind nicht immer hart getrennt, sondern besitzen Graustufen.
3. Diese Graustufen können als semantischer Möglichkeitsraum beschrieben werden.

Die zentrale Frage lautet damit:

> Wie kann der Editor eine Animation so erklären, dass Nutzer die primäre Bedeutung verstehen, ohne dabei zu behaupten, dass diese Animation ausschließlich in genau einem Kontext gelesen werden kann?

## Kernentscheidung

Das Framework bleibt bei eindeutigen semantischen Mappings.

Ein Mapping bleibt also weiterhin:

- eine konkrete Komponente
- eine konkrete Dimension
- eine konkrete Subkategorie
- eine konkrete Parametrisierung
- eine primäre theoretische Begründung

Der Professorenhinweis führt nicht zu einem Variantenkatalog und nicht zu mehreren gleichwertigen Animationen pro Fall.

Stattdessen wird eine zusätzliche Erklärungsebene vorgeschlagen:

- **Bildhafte Lesart:** Welche anschauliche Geste, physische Analogie oder konventionelle Vorstellung hilft beim Verstehen?
- **Visueller Cue:** Welches kleine Icon oder Glyph kann diese Lesart schnell sichtbar machen?
- **Semantischer Kern:** Welche Bedeutung trägt das Mapping primär?
- **Angrenzende Lesarten:** Welche Bedeutungen liegen in der Nähe und können mitgelesen werden?
- **Abgrenzung:** Warum bleibt das Mapping trotzdem dieser Dimension zugeordnet?

Damit wird das Framework nicht unschärfer, sondern argumentativ stärker. Es zeigt, dass die Zuordnungen bewusst gesetzt sind und dass mögliche Nebenlesarten reflektiert wurden.

## Begriffssystem

### Semantischer Kern

Der semantische Kern ist die Hauptaussage eines Mappings. Er entspricht der bestehenden Einordnung über `component`, `dimension` und `subcategory`.

Beispiel:

`button-feedback-error` bedeutet primär: Eine Nutzeraktion wurde nicht akzeptiert oder ist fehlgeschlagen.

Der semantische Kern ist nicht optional. Ohne ihn würde das Framework zu einer losen Sammlung von Animationsvorschlägen werden.

### Bildhafte Lesart

Die bildhafte Lesart übersetzt die abstrakte Begründung in eine anschauliche Wahrnehmungs- oder Gestenmetapher.

Beispiele:

- Shake als Kopfschütteln.
- Pulse als kurzes Sich-Bemerkbar-Machen.
- Scale-In als Herantreten in den Vordergrund.
- Fade-Out als Verschwinden eines Platzhalters.
- Shimmer als erlerntes Ladezeichen.

Wichtig: Bildhaft bedeutet nicht zwingend groß illustriert.

Es geht nicht darum, neben jede Animation eine große Zeichnung eines Kopfes, einer Hand oder eines Körpers zu setzen. Das könnte schnell dekorativ wirken und den Fokus vom eigentlichen Motion-System wegziehen.

Sinnvoller ist eine knappe Bedeutungsmetapher plus ein kleines, zurückhaltendes Icon oder Glyph:

> Bildhafte Lesart: Kopfschütteln oder Abwinken als Ablehnung.

Das Icon ersetzt die Textbegründung nicht. Es macht die Lesart schneller erfassbar. Gerade hier trifft der Professorenhinweis „symbolisieren oder zeigen“ wahrscheinlich den Kern: Die Metapher soll nicht nur beschrieben, sondern visuell angedeutet werden.

Diese Ebene beantwortet die Frage:

> Woran erinnert mich diese Bewegung und warum hilft mir das beim Verstehen?

### Visueller Cue

Der visuelle Cue ist ein kleines Zeichen für die bildhafte Lesart.

Er ist nicht die Animation selbst und auch kein neuer Mapping-Parameter. Er ist ein Erklärungselement im Editor.

Beispiele:

- `refusalGesture`: stilisierte Ablehnungsgeste, z. B. Kopfschütteln oder Abwinken.
- `pulseSignal`: konzentrischer Pulse oder kurzer Bedeutungsimpuls.
- `toggleTravel`: Bewegung eines Schalters zwischen zwei Zuständen.
- `arrival`: eintretendes Element oder Ankunftsmarkierung.
- `departure`: ausfahrendes oder verschwindendes Element.
- `nudgeSignal`: moderater Hinweisstoß ohne Fehler-Shake.
- `returnLayer`: zurückkehrende Ebene.
- `foreground`: Element tritt nach vorne.
- `backgroundRecede`: Element tritt aus dem aktiven Fokus zurück.
- `focusSignal`: aktiver oder zurücktretender Fokuszustand.
- `helperMessage`: lokaler Hinweis- oder Warntext.
- `shimmerSignal`: wandernder Lichtstreifen als Ladezeichen.
- `fadeResolve`: Platzhalter löst sich auf.

Diese Cues sollten als kleine Line-Glyphs gestaltet werden: dünne Linien, gleiche Strichstärke, keine Farbflächen, keine Illustration mit eigenem Stil. Sie sollen die Bedeutung signalisieren, nicht eine zweite visuelle Welt neben dem Motion-Preview eröffnen.

Ein Cue trägt seine Bedeutung nicht allein. `pulseSignal` kann zum Beispiel in einem Success-Kontext als Bestätigungsimpuls und in einem Required-Field-Kontext als lokales Aufmerksamkeitssignal gelesen werden. Erst die Kombination aus Glyph, Metapher-Label, Komponente und Mapping-Kontext stabilisiert die Lesart. Das ist wichtig, damit das Glyph-System nicht selbst zu einem zweiten, missverständlichen Mapping-System wird.

Für den aktuellen Experimentstand können Lucide-Icons als Platzhalter dienen. Diese Platzhalter prüfen nur, ob ein kleiner visueller Cue in der UI überhaupt funktioniert. Sie sind nicht als finale Glyph-Sprache zu verstehen. Die spätere finale Version sollte entweder eigene SVG-Glyphs verwenden oder Lucide-Formen so stark kuratieren, dass sie als zusammenhängendes semantisches Cue-System wirken.

### Angrenzende Lesarten

Angrenzende Lesarten beschreiben Bedeutungen, die eine Animation ebenfalls berühren kann, ohne die primäre Zuordnung zu ersetzen.

Beispiel:

Ein Shake kann nicht nur Fehlerfeedback ausdrücken. Er kann auch Aufmerksamkeit erzeugen, Ablehnung zeigen oder eine ungültige Aktion markieren.

Für das Framework ist aber entscheidend:

Der Shake wird nicht deshalb beliebig. Er erhält im konkreten Mapping seine Bedeutung durch Kontext, Komponente, Auslöser und Parameter.

### Abgrenzung

Die Abgrenzung beschreibt, warum eine naheliegende Nebenlesart nicht zur primären Klassifikation wird.

Beispiel:

`input-attention-requiredField` kann oberflächlich wie Fehlerfeedback wirken, weil es nach einer fehlgeschlagenen Formularsituation auftauchen kann. Die primäre Bedeutung liegt aber nicht in der Bewertung der gesamten Eingabe, sondern in der lokalen Aufmerksamkeitslenkung auf ein konkretes Pflichtfeld.

Diese Abgrenzung ist wichtig, weil sie die wissenschaftliche Begründung stabilisiert. Sie zeigt, dass Graustufen nicht ignoriert werden, aber auch nicht die Systematik auflösen.

## Verhältnis zu bestehenden Feldern

Die bestehenden Felder bleiben sinnvoll:

- `rationale.short`: schnelle nutzergerichtete Begründung
- `rationale.source`: wissenschaftliche Detailbegründung
- `rationale.signType`: semiotische Einordnung nach Peirce
- `params`: technische Bewegungsparameter

Das neue Konzept beantwortet eine andere Frage:

- `rationale.short` erklärt, was die Bewegung bedeutet.
- `rationale.source` erklärt, warum die Bewegung theoretisch begründet ist.
- `signType` erklärt, welche Art Zeichenbeziehung dominiert.
- Der semantische Möglichkeitsraum erklärt, wie die Bewegung anschaulich gelesen werden kann und welche Nebenlesarten bewusst abgegrenzt werden.

Damit ist die Modellergänzung nicht technisch steuernd, sondern erklärend.

## Datenmodell-Erweiterung

Das Konzept ist als erklärender Teil der Rationale in das Framework aufgenommen worden, nicht als Animationsparameter.

Aktuelle Modellrichtung:

```ts
export type VisualCueId =
  | "refusalGesture"
  | "pulseSignal"
  | "toggleTravel"
  | "arrival"
  | "departure"
  | "nudgeSignal"
  | "returnLayer"
  | "foreground"
  | "backgroundRecede"
  | "focusSignal"
  | "helperMessage"
  | "shimmerSignal"
  | "fadeResolve";

export interface SemanticMetaphor {
  label: string;
  visualCue: VisualCueId | VisualCueId[];
}

export interface SemanticContext {
  metaphor: SemanticMetaphor;
  primaryReading: string;
  adjacentReadings: string[];
  boundaries: string[];
}

export interface Rationale {
  short: string;
  source: string;
  references: ReferenceKey[];
  signType: SignType;
  semanticContext: SemanticContext;
}
```

Warum innerhalb von `Rationale`?

- Es verändert nicht die Animation.
- Es verändert nicht Preview oder Export.
- Es beschreibt die semantische Lesart.
- Es ergänzt die bestehende Begründungsebene.
- Der visuelle Cue bleibt erklärend und wird nicht mit dem Motion-Parameter verwechselt.

Warum nicht als Top-Level-Feld?

Ein Top-Level-Feld würde den Eindruck erzeugen, dass `semanticContext` eine eigenständige Framework-Dimension ist. Inhaltlich ist es aber Teil der Begründungsebene.

## Worked Examples

Die folgenden Beispiele zeigen, wie die drei Feedbackpunkte zusammengeführt werden können.

### 1. `button-feedback-error`

**Semantischer Kern**

Eine Nutzeraktion wurde nicht akzeptiert oder ist fehlgeschlagen.

**Bildhafte Lesart**

Kopfschütteln oder Abwinken als Ablehnungsgeste.

**Visueller Cue**

`refusalGesture`

**Angrenzende Lesarten**

- Verneinung
- Zurückweisung
- ungültige Aktion
- kurzfristige Aufmerksamkeitslenkung

**Abgrenzung**

Das Mapping bleibt Feedback, weil die Animation als Reaktion auf eine konkrete Nutzeraktion verstanden wird. Derselbe Shake wäre in einem systeminitiierten Kontext eher Attention, wenn kein direkter Handlungsauslöser vorausgeht.

**Warum es ein gutes Beispiel ist**

Dieses Mapping trifft den Professorenhinweis sehr direkt. Das Kopfschütteln ist bereits in der bestehenden Rationale angelegt und kann als bildhafte Lesart sehr einfach sichtbar gemacht werden.

### 2. `button-feedback-success`

**Semantischer Kern**

Eine Aktion wurde erfolgreich abgeschlossen.

**Bildhafte Lesart**

Ein kurzer positiver Impuls, als würde das Element die Aktion bestätigen.

**Visueller Cue**

`pulseSignal`

**Angrenzende Lesarten**

- Aktivierung
- Bestätigung
- kurze Aufmerksamkeitsmarkierung
- haptisches Feedback im übertragenen Sinn

**Abgrenzung**

Das Mapping bleibt Feedback, weil der Pulse nicht systeminitiiert Aufmerksamkeit fordert, sondern unmittelbar nach einer abgeschlossenen Aktion erscheint. Es ist kein persistentes Signal und keine Aufforderung zu weiterem Handeln.

**Warum es ein gutes Beispiel ist**

Hier zeigt sich, dass bildhafte Lesart nicht nur bei negativen Gesten funktioniert. Der Pulse wird nicht als Körpergeste verstanden, sondern als positive Reaktion des Elements.

### 3. `toast-feedback-error`

**Semantischer Kern**

Eine Fehlermeldung erscheint und markiert das Ergebnis einer fehlgeschlagenen Aktion.

**Bildhafte Lesart**

Die Meldung tritt in den sichtbaren Bereich ein und wird durch einen kurzen Shake als gestört oder problematisch markiert.

**Visueller Cue**

`arrival` kombiniert mit `refusalGesture`

**Angrenzende Lesarten**

- dringliche Information
- Aufmerksamkeitssignal
- Ablehnung
- Unterbrechung

**Abgrenzung**

Das Mapping bleibt Feedback, weil der Toast ein Ergebnis kommuniziert. Die Aufmerksamkeit entsteht sekundär durch die Sichtbarkeit und den Shake, ist aber nicht der primäre Zweck. Im Unterschied zu `toast-attention-oneShot` ist das Signal an ein Ergebnis gekoppelt.

**Warum es ein gutes Beispiel ist**

Das Mapping zeigt, dass mehrphasige Animationen mehrere Bedeutungsteile kombinieren können: Einfahrt als Erscheinen der Meldung, Shake als Fehlerakzent.

### 4. `input-attention-requiredField`

**Semantischer Kern**

Ein konkretes Feld benötigt Aufmerksamkeit, weil eine Pflichtangabe aussteht.

**Bildhafte Lesart**

Das Feld macht sich durch wiederholtes, zurückhaltendes Pulsieren bemerkbar.

**Visueller Cue**

`pulseSignal`

**Angrenzende Lesarten**

- Validierungsproblem
- indirektes Fehlerfeedback
- Handlungsaufforderung
- lokaler Hinweis

**Abgrenzung**

Das Mapping bleibt Attention, weil es nicht die gesamte Formularaktion bewertet. Es markiert ein bestimmtes Feld als handlungsrelevant. Die Bewegung sagt nicht primär „deine Eingabe ist falsch“, sondern „hier fehlt noch etwas“.

**Warum es ein gutes Beispiel ist**

Dieses Mapping ist besonders wichtig, weil es eine Grauzone sichtbar macht. Es kann im Nutzungskontext nach einem fehlgeschlagenen Submit auftreten und trotzdem fachlich als Attention begründet werden.

### 5. `modal-direction-backEnter` und `modal-direction-backExit`

**Semantischer Kern**

Eine vorherige Ebene wird im Rahmen einer Rückwärtsnavigation wieder sichtbar.

**Bildhafte Lesart**

Die Oberfläche bewegt sich wie eine Ebene in einem horizontalen Navigationsraum zurück.

**Visueller Cue**

`returnLayer`

**Angrenzende Lesarten**

- räumliche Tiefe
- Rückkehr
- Kontextwechsel
- Hierarchieverschiebung

**Abgrenzung**

Die Mappings bleiben Direction, weil die Richtung aus dem Navigationspaar entsteht. Sie beschreiben nicht primär, dass ein Element wichtiger oder unwichtiger wird, sondern dass sich der Nutzer im Navigationsverlauf zurückbewegt.

**Warum es ein gutes Beispiel ist**

Hier wird deutlich, dass Bedeutung nicht allein aus der Richtung kommt. Links oder rechts sind nicht universell semantisch. Erst die Kombination aus Kontext, Komplementärbewegung und Leserichtung macht daraus Rückwärtsnavigation.

### 6. `modal-hierarchy-toForeground`

**Semantischer Kern**

Ein Element tritt in den Vordergrund und beansprucht primäre Aufmerksamkeit.

**Bildhafte Lesart**

Das Modal tritt durch leichte Vergrößerung und Einblendung näher an den Nutzer heran.

**Visueller Cue**

`foreground`

**Angrenzende Lesarten**

- Erscheinen
- Fokuswechsel
- räumliche Annäherung
- neue Aufgabe

**Abgrenzung**

Das Mapping bleibt Hierarchy, weil die Bewegung nicht eine Navigationsrichtung beschreibt. Entscheidend ist die Änderung der visuellen Priorität.

**Warum es ein gutes Beispiel ist**

Es zeigt den Unterschied zwischen Richtung und Hierarchie. Beide können räumlich wirken, tragen aber unterschiedliche Bedeutungen.

### 7. `skeleton-attention-loading`

**Semantischer Kern**

Ein Ladezustand ist aktiv und Inhalt ist noch nicht verfügbar.

**Bildhafte Lesart**

Ein gleichmäßiger Lichtstreifen wandert über einen Platzhalter und signalisiert Aktivität.

**Visueller Cue**

`shimmerSignal`

**Angrenzende Lesarten**

- Systemaktivität
- temporärer Platzhalter
- Wartezustand
- technisches Fortschrittssignal

**Abgrenzung**

Das Mapping bleibt Attention, weil es Aufmerksamkeit auf einen laufenden Zustand lenkt, ohne ein Ergebnis zu kommunizieren. Gleichzeitig ist es als Peirce-Symbol klassifiziert, weil die Bedeutung des Shimmers nicht natürlich aus dem Ladeprozess folgt, sondern durch UI-Konvention gelernt ist.

**Warum es ein gutes Beispiel ist**

Dieses Mapping zeigt, dass bildhafte Lesart nicht immer ikonisch sein muss. Der Shimmer ist visuell anschaulich, aber seine Bedeutung ist konventionell.

### 8. `skeleton-attention-resolved`

**Semantischer Kern**

Der Platzhalter verschwindet, weil Inhalt angekommen ist.

**Bildhafte Lesart**

Der Platzhalter löst sich visuell auf und macht dem eigentlichen Inhalt Platz.

**Visueller Cue**

`fadeResolve`

**Angrenzende Lesarten**

- Abschluss
- Verfügbarkeit
- Übergang von Systemzustand zu Inhalt
- Ende eines Wartezustands

**Abgrenzung**

Das Mapping bleibt im Skeleton-Kontext Attention, weil es den Abschluss eines zuvor aufmerksamkeitsrelevanten Ladezustands markiert. Es ist kein allgemeines Success-Feedback auf eine Nutzeraktion.

**Warum es ein gutes Beispiel ist**

Es zeigt, dass auch Opacity als Sichtbarkeitsparameter eine semantische Lesart tragen kann, ohne eine räumliche Bewegung zu sein.

## Konsequenz für die Editor-UI

Die UI darf durch das Konzept nicht zu einem permanent sichtbaren Theoriepanel werden.

Der Editor hat bereits eine klare Struktur:

1. Auswahl
2. Preview
3. Rationale
4. Export

Die neue Erklärungsebene sollte diese Struktur ergänzen, nicht ersetzen.

### Empfohlene Darstellung

Im Editor wird die Ebene als optional aktivierbarer Bereich **Semantischer Möglichkeitsraum** umgesetzt.

Die Ebene ist standardmäßig deaktiviert und kann über einen Toggle in der oberen Navigation der Editor-Seite eingeschaltet werden. Dadurch bleibt der Editor im Normalzustand auf den Framework-Kern fokussiert:

- Auswahl
- Preview
- Rationale
- Export

Bei aktivierter Ebene erscheint zwischen Rationale und Export ein kompakter Block:

- Visual-Cue-Glyphs
- bildhafte Lesart
- primäre Lesart
- angrenzende Lesarten
- Abgrenzung im Disclosure

### Warum ein Glyph-System statt großer Illustration

Eine große bildliche Darstellung hätte mehrere Risiken:

- Sie könnte vom eigentlichen Motion-Preview ablenken.
- Sie könnte wie eine zusätzliche Designentscheidung wirken, die selbst erklärt werden muss.
- Sie könnte den Eindruck erzeugen, dass das Framework Gesten oder Icons klassifiziert, nicht Motion.
- Sie müsste für alle Mappings konsistent gestaltet werden, was den Scope erhöht.

Ein kleines Icon-/Glyph-System ist deshalb die bessere Antwort auf „symbolisieren oder zeigen“:

- kleines Label plus visuelles Zeichen
- dezentes Glyph nur als Hinweis auf „Lesart“
- keine eigenständige Illustration pro Mapping
- keine zweite Animation neben der Preview
- keine zusätzliche Interaktion, solange der Cue nur erklärt

Damit wird der Professorenhinweis aufgenommen, ohne den Prototyp unnötig aufzublasen.

### Gestaltungsvorgaben für Glyphs

Die Glyphs sollten sich an der bestehenden visuellen Sprache des Prototyps orientieren:

- Line-Glyphs statt gefüllter Illustrationen.
- Gleiche Strichstärke über alle Cues.
- Akzentfarbe nur sparsam, zum Beispiel für aktive oder hervorgehobene Zustände.
- Keine realistischen Körperdarstellungen.
- Keine cartoonhafte Geste.
- Keine Animation im Glyph selbst, damit es nicht mit der Preview konkurriert.
- Lucide-Icons dürfen zunächst als Platzhalter genutzt werden, ersetzen aber nicht die gestalterische Prüfung eigener semantischer Glyphs.

Das Ziel ist eine schnelle semantische Stütze, nicht ein zweites visuelles Erklärsystem.

## Konsequenz für die wissenschaftliche Ausarbeitung

In der Bachelorarbeit sollte dieser Punkt nicht als technische Zusatzfunktion verkauft werden, sondern als Reflexion der Semantik.

Mögliche Argumentation:

> Die Mappings des Frameworks werden als primäre semantische Lesarten verstanden. Eine Animation ist damit nicht absolut auf eine einzige Bedeutung festgelegt, sondern wird durch Komponente, Auslöser, Richtung, Timing und Kontext stabilisiert. Angrenzende Bedeutungen werden als semantischer Möglichkeitsraum reflektiert, aber nicht als gleichwertige Alternativen modelliert.

Das ist wissenschaftlich sauberer als zu behaupten:

> Diese Animation bedeutet immer genau X.

Stärker ist:

> Diese Animation wird im gegebenen UI-Kontext als X modelliert, weil ihre Parameter, ihr Auslöser und ihre kulturelle oder wahrnehmungspsychologische Lesart diese Bedeutung stützen. Angrenzende Lesarten existieren, werden aber abgegrenzt.

## Warum das zur ursprünglichen Zielsetzung passt

Die Arbeit will Nutzer davon wegführen, Animationen rein aus dem Bauch heraus auszuwählen.

Der Möglichkeitsraum unterstützt genau das:

- Er macht sichtbar, warum eine Animation naheliegt.
- Er zeigt, welche ähnlichen Bedeutungen mitgedacht werden können.
- Er verhindert, dass eine Animation als beliebige Stilentscheidung gelesen wird.
- Er stärkt die Reflexion, ohne die Auswahl wieder beliebig zu machen.

Damit wird der Editor nicht nur ein Generator, sondern ein Werkzeug zur begründeten Designentscheidung.

## Was bewusst nicht gemacht werden sollte

### Keine Prozentwerte

Ein Mapping sollte nicht als „70 Prozent Feedback, 30 Prozent Attention“ modelliert werden.

Das wirkt zwar analytisch, wäre aber im aktuellen Projekt nicht empirisch abgesichert und würde eine Genauigkeit suggerieren, die das Framework nicht leisten kann.

### Keine alternativen Animationen pro Mapping

Der Professorenhinweis bedeutet nicht, dass für jedes Ziel mehrere Varianten angeboten werden sollten.

Mehrere gleichwertige Varianten würden die Hauptthese schwächen, weil der Editor dann wieder zum ästhetischen Auswahlkatalog wird.

### Keine vollständige Taxonomie aller Nebenbedeutungen

Der Möglichkeitsraum soll exemplarisch und argumentativ helfen. Er muss nicht jede denkbare Lesart vollständig erfassen.

### Keine visuelle Überinszenierung

Die Preview bleibt die primäre bildliche Darstellung der Animation. Zusätzliche Symbole dürfen nur erklären, nicht konkurrieren.

## Umsetzungsstand

### Phase 1: Konzeption festhalten

Diese Datei hält die konzeptionelle Grundlage fest.

Ziel:

- gemeinsames Konzept für alle drei Feedbackpunkte formulieren
- Begriffe klären
- Beispiele aus bestehenden Mappings ableiten
- Scope begrenzen

### Phase 2: Repräsentative Mappings ausarbeiten

Die acht Beispiele oben markieren die wichtigsten Argumentationsfälle. Für die technische Konzeptprüfung wurde die experimentelle Datenform auf alle 24 Mappings ausgeweitet, damit sichtbar wird, ob `semanticContext` über den gesamten Framework-Scope trägt.

Pro Mapping:

- `metaphor.label`
- `metaphor.visualCue`
- `primaryReading`
- `adjacentReadings`
- `boundaries`

Die Prüfung war ausreichend tragfähig, um die Felder in die echte Mapping-Datenbank zu übernehmen.

### Phase 3: Entscheidung über Datenmodell

Das Datenmodell wurde erweitert:

- `SemanticContext`
- `SemanticMetaphor`
- `VisualCueId`
- `VISUAL_CUE_IDS`

`semanticContext` ist Teil von `rationale`, weil es die Begründungsebene erweitert und keine technische Animation steuert.

### Phase 4: Minimaler UI-Prototyp

Die UI-Integration erfolgt bewusst nur im Editor und optional:

- Toggle **Semantischer Möglichkeitsraum** nur auf der Editor-Seite.
- Default aus.
- Kompakter Block zwischen Rationale und Export.
- Kein Einfluss auf Export und Preview.
- Subtile Framer-Motion-Animation beim Ein- und Ausblenden.

### Phase 5: Evaluation

Weiter zu prüfen:

- Wird die semantische Entscheidung verständlicher?
- Wird die UI zu textlastig?
- Bleibt die primäre Klassifikation eindeutig?
- Wirkt der Möglichkeitsraum wie Reflexion statt wie Beliebigkeit?
- Sind die Visual-Cue-Glyphs als eigene konsistente Zeichensprache tragfähig?

## Offener Gestaltungspunkt

Die aktuelle UI nutzt noch Platzhalter für visuelle Cues. Diese Platzhalter zeigen, dass die Struktur funktioniert, sind aber noch keine finale Glyph-Sprache.

Offen bleibt:

- eigene kleine Line-Glyphs gestalten
- gleiche Strichstärke und gleiche visuelle Grammatik sicherstellen
- kombinierte Cues auf Lesbarkeit prüfen
- finale `VisualCueGlyph`-Komponente vorbereiten

## Kurzfazit

Das Professorenfeedback lässt sich sehr gut in das Projekt integrieren, wenn es nicht als neues Variantenmodell verstanden wird.

Die stärkste Lösung ist ein semantischer Möglichkeitsraum:

- Jedes Mapping behält eine klare primäre Bedeutung.
- Eine bildhafte Lesart macht die Bewegung anschaulicher.
- Angrenzende Lesarten werden sichtbar, aber nicht gleichwertig.
- Abgrenzungen schützen die Systematik.

Damit wird das Framework theoretisch präziser und im Editor verständlicher, ohne den Scope der Bachelorarbeit unnötig zu öffnen.

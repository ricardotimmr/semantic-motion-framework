# Wissenschaftliche Ausarbeitung - Notizen

Dieses Dokument sammelt Argumentationsnotizen für die spätere Bachelorarbeit.
Es ist kein finaler Fließtext, sondern ein Ort für Punkte, die in der
Ausarbeitung sauber begründet werden müssen.

---

## Motion und unterstützende visuelle Zustandsmarker

### Problem

Das Semantic Motion Framework ist ein Motion Framework. Einige Preview- und
Renderer-Entscheidungen nutzen aber zusätzlich visuelle Zustandsmarker wie:

- Border-Farbe
- Label-Farbe
- Fokusrahmen
- Shadow
- Helper-Text
- Opacity von Zusatzinformationen

Das kann in der Prüfung erklärungsbedürftig sein, weil diese Elemente nicht
immer selbst Motion im räumlichen Sinn sind.

### Argumentationslinie

Die semantische Hauptentscheidung bleibt im Framework an Motion-Parametern
verankert:

- Easing
- Duration
- Direction
- Amplitude
- Iterations
- Motion-Phasen

Visuelle Zustandsmarker ersetzen diese Motion-Parameter nicht. Sie unterstützen
die Lesbarkeit der Bewegung in komponentenspezifischen Kontexten.

Besonders bei Input-Feldern ist das wichtig: Ein Input ist während der
Interaktion empfindlicher als ein Button. Zu starke Bewegung würde den
Tippfluss stören oder den eingegebenen Inhalt destabilisieren. Deshalb wird die
Motion bewusst subtil gehalten und durch visuelle Zustandsmarker gestützt.

### Beispiel: `input-feedback-success`

Das Mapping nutzt weiterhin einen minimalen Pulse:

- `scaleFactor: 0.02`
- `scaleMode: "pulse"`
- `duration: 175`
- `easing: easeOut`

Dieser Pulse ist das eigentliche Motion-Signal. Die grüne Border- und
Label-Markierung im Renderer unterstützt die Wahrnehmung des Success-Zustands,
ist aber nicht die theoretische Hauptbegründung der Animation.

Formulierung für die Arbeit:

> Bei einigen Komponenten, insbesondere beim Input Field, wird die semantische
> Bewegung durch visuelle Zustandsmarker wie Border, Label oder Helper-Text
> unterstützt. Diese Marker sind nicht als eigenständige Motion-Parameter des
> Frameworks zu verstehen, sondern als komponentenspezifische Signifier im Sinne
> Normans. Sie erhöhen die Lesbarkeit der subtilen Bewegung, ohne die
> Motion-basierte Mapping-Logik zu ersetzen.

### Theoretische Verankerung

Normans Signifier-Begriff hilft bei der Einordnung: Ein Signifier kommuniziert
dem Nutzer, wie ein Zustand oder eine Handlung zu verstehen ist. Motion kann
ein dynamischer Signifier sein. Border, Label oder Fokusrahmen können statische
oder teilanimierte Signifier sein, die denselben Zustand unterstützen.

Peirce bleibt für die Klassifikation der Motion-Bedeutung zentral. Die
zusätzlichen visuellen Marker werden nicht als eigener Zeichentyp des
Animationsmappings klassifiziert, sondern als unterstützende
Komponenten-Signifier behandelt.

### Abgrenzung

Das Framework wird dadurch nicht zu einem allgemeinen Stilguide. Es definiert
keine vollständigen visuellen Zustände für alle Komponenten. Es erlaubt nur,
dass der Renderer die Motion-Semantik komponentenspezifisch lesbar macht, wenn
ein reines Bewegungssignal zu subtil oder zu störend wäre.

Für die Arbeit ist wichtig:

- Motion bleibt die zentrale Kodierungsebene.
- Visuelle Marker sind unterstützend, nicht primär.
- Die Trennung wird in der Mapping-Rationale und in den Architekturentscheidungen
  kenntlich gemacht.
- Besonders Input-Felder rechtfertigen diese Unterstützung, weil starke Motion
  während laufender Eingabe ergonomisch problematisch wäre.

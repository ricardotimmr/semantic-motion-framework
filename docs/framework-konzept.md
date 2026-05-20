# Framework-Konzept: Semantic Motion Framework

---

## 1. Grundidee

Das Semantic Motion Framework ist ein Klassifikationssystem, das UI-Animationen anhand ihrer Bedeutungsbeziehung systematisch beschreibt und Animationsparametern Bedeutungsdimensionen zuordnet. Es beantwortet nicht die Frage, wie eine Animation aussieht, sondern warum sie so gestaltet sein sollte.

Das Framework besteht aus drei Ebenen:

**Bedeutungsdimensionen:** Die fünf semantischen Kategorien, in die UI-Animationen eingeteilt werden. Jede Dimension beschreibt, was eine Animation kommuniziert.

**Animationsparameter:** Die technischen Variablen, über die eine Animation gestaltet wird. Easing, Duration, Direction, Amplitude und Iterations sind die Parameter, die im Framework als bedeutungstragende Einheiten behandelt werden.

**Mapping:** Die Zuordnung von Animationsparametern zu Bedeutungsdimensionen. Jeder Eintrag in der Mapping-Datenbank ist eine begründete Zuordnung, die auf semiotischen und wahrnehmungspsychologischen Prinzipien basiert.

---

## 2. Theoretische Grundlage der Klassifikationslogik

### 2.1 Zeichentyp nach Peirce

Jedes Mapping wird nach dem dominanten Peirce'schen Zeichentyp klassifiziert. Der Zeichentyp beschreibt, welche Art von Bedeutungsbeziehung zwischen Animation und Bedeutung besteht.

**Ikon:** Die Animation ähnelt dem, was sie bedeutet. Die Beziehung ist motiviert durch visuelle oder physikalische Analogie. Fade-out ähnelt dem physischen Verschwinden eines Objekts. Ikonische Zuordnungen sind kulturübergreifend stabiler als symbolische.

**Index:** Die Animation steht in einer assoziativen oder kausalen Beziehung zu ihrer Bedeutung. Die Beziehung ist nicht arbiträr, aber auch nicht durch direkte Ähnlichkeit begründet. Horizontale Shake-Bewegung ist mit Kopfschütteln (Ablehnung) assoziiert. Indexikalische Zuordnungen sind kulturell verankert und deshalb stabiler als symbolische, aber weniger universell als ikonische.

**Symbol:** Die Animation steht in einer konventionellen Beziehung zu ihrer Bedeutung. Die Verbindung ist reine Konvention, die erlernt werden muss. Symbolische Zuordnungen sind am stärksten kulturabhängig.

### 2.2 Wahrnehmungspsychologische Grundlage

Animationsparameter werden nicht nur als semiotische Zeichen, sondern auch als wahrnehmungspsychologische Signale verstanden. Relevante Prinzipien:

**Präattentive Verarbeitung (Treisman & Gelade 1980):** Bewegung wird vor bewusster Aufmerksamkeit registriert. Das erklärt, warum Animationsparameter überhaupt als Bedeutungsträger wirksam sein können.

**Ereignisstruktur (Zacks & Tversky 2001):** Animationen werden als strukturierte Sequenzen mit Anfang, Mitte und Ende wahrgenommen. Easing-Kurven definieren diese Phasenstruktur und sind deshalb bedeutungstragend.

**Direction Bias (Ware 2012; Halpern & Kelly 1993):** Bewegungsrichtung trägt eigenständige Bedeutung, die durch neurobiologische Asymmetrien und kulturelle Konventionen begründet ist.

**Bewegungsattribute und Ablenkungswirkung (Bartram, Ware & Calvert 2003):** Verschiedene Bewegungsattribute erzeugen unterschiedliche Wirkungen auf Aufmerksamkeit. Hochfrequente Bewegung signalisiert Dringlichkeit. Langsame Bewegung signalisiert Hintergrundprozesse.

### 2.3 Die Animationsparameter als Kodierungsebene

Das Framework behandelt folgende Parameter als bedeutungstragende Einheiten:

**Easing** (cubicBezier-Kurve): Definiert die Beschleunigungsstruktur der Animation. Ist der bedeutungsreichste einzelne Parameter, weil er die Phasenstruktur (Zacks & Tversky) direkt abbildet.

- Ease-Out `[0.0, 0.0, 0.2, 1.0]`: Schnell starten, langsam enden. Kommuniziert Abklingen, Abschluss, natürliches Ankommen. Geeignet für Enter-Animationen und positive Feedbacks.
- Ease-In `[0.4, 0.0, 1.0, 1.0]`: Langsam starten, schnell enden. Kommuniziert Aufbau, Dringlichkeit, Verlassen. Geeignet für Exit-Animationen.
- Ease-In-Out `[0.4, 0.0, 0.2, 1.0]`: Symmetrische Kurve. Kommuniziert natürliche, physikalisch plausible Bewegung. Geeignet für State Changes ohne Richtungskonnotation.
- Sharp `[0.4, 0.0, 0.6, 1.0]`: Abrupte Kurve. Kommuniziert Unmittelbarkeit, Reaktion, mechanische Präzision.
- Linear `[0.0, 0.0, 1.0, 1.0]`: Keine Beschleunigung. Wirkt mechanisch und unnatürlich. Im Framework nur für spezifische Ausnahmefälle vorgesehen.
- Spring: Federnder Überschwinger. Kommuniziert physikalische Substanz, Gewicht, Lebendigkeit.

**Duration** (in Millisekunden): Bestimmt, wie viel Aufmerksamkeit eine Animation beansprucht.

- 100–200ms: Unmittelbar. Für Microinteractions und direkte Feedbacks.
- 200–300ms: Standard. Für die meisten UI-Feedbacks.
- 300–400ms: Betont. Für wichtige Zustandswechsel.
- 400–500ms: Gewichtig. Für komplexe Übergänge.
- Über 500ms: Sparsam einsetzen. Wirkt bei häufig ausgelösten Animationen störend.

**Direction** (x / y / none): Definiert die Achse der Bewegung.

- x-Achse (horizontal): Kommuniziert Vorwärts/Rückwärts, Zustimmung/Ablehnung.
- y-Achse (vertikal): Kommuniziert Hierarchie, Erscheinen von oben/unten, Schwerkraft.
- none: Keine Richtungskomponente. Für Skalierungs- und Opazitätsanimationen.

**Amplitude** (px oder Skalierungsfaktor): Bestimmt das Ausmaß der Bewegung.

- Klein (2–4px / 0.95–1.05): Subtil, nicht störend. Für sekundäre Feedbacks.
- Mittel (6–10px / 0.9–1.1): Wahrnehmbar, ohne zu dominieren. Für primäre Feedbacks.
- Groß (12px+ / 0.8–1.2): Dringend, nicht zu übersehen. Für kritische Fehler und Warnungen. Sparsam einsetzen.

**Iterations**: Wie oft eine Animation wiederholt wird.

- 1: Einmalig. Standard für die meisten Animationen.
- 2–3: Wiederholend. Für persistente Aufmerksamkeit.
- Endlos: Für laufende Prozesse (Loading-States). Muss manuell gestoppt werden.

---

## 3. Die fünf Bedeutungsdimensionen

---

### Dimension 1: Feedback

**Was wird kommuniziert:** Das Ergebnis einer Nutzeraktion. Die Animation antwortet auf etwas, das der Nutzer getan hat, und zeigt, ob die Aktion erfolgreich war, fehlgeschlagen ist oder eine Warnung ausgelöst hat.

**Semiotischer Typ:** Überwiegend Index. Die Animation steht in einer kausalen Beziehung zur Nutzeraktion (Aktion → Reaktion).

**Wahrnehmungspsychologische Grundlage:** Feedback-Animationen nutzen präattentive Verarbeitung, um das Ergebnis ohne explizite Lektüre zu kommunizieren. Bartram et al. (2003) zeigen, dass Bewegungsattribute zuverlässig zwischen Zustandskategorien unterscheiden können.

**Gilt für Komponenten:** Button, Toast, Toggle, Modal (Validierung)

---

#### 1a. Feedback / Success

**Bedeutung:** Die Aktion war erfolgreich. Das System hat die Eingabe akzeptiert.

**Leitprinzip:** Aufwärtsbewegung und Expansion. Physikalisch und kulturell mit Wachstum und Bestätigung assoziiert. Ease-Out als Abklingkurve kommuniziert, dass die Aktion abgeschlossen ist.

| Parameter | Wert | Begründung |
|---|---|---|
| Easing | Ease-Out `[0.0, 0.0, 0.2, 1.0]` | Abklingen als Signal für Abschluss (Zacks & Tversky 2001) |
| Duration | 200–300ms | Unmittelbar, aber wahrnehmbar |
| Direction | y (kurz aufwärts) oder none | Aufwärtsbewegung als Positivassoziation (Ware 2012) |
| Amplitude | Klein bis mittel (Scale 1.0 → 1.05 → 1.0) | Subtile Bestätigung, kein Jubel |
| Iterations | 1 | Einmaliges Signal |
| Zeichentyp | Ikon / Index | Scale-Up ähnelt Öffnen; Aufwärtsbewegung als kultureller Index für Positives |

**Für Editor-Begründungstext:** Die sanfte Ausdehnung und das schnelle Abklingen signalisieren, dass eine Aktion erfolgreich abgeschlossen wurde. Die aufwärtsgerichtete Bewegung greift auf eine kulturell verankerte Assoziation zwischen Aufwärts und Positiv zurück.

---

#### 1b. Feedback / Error

**Bedeutung:** Die Aktion ist fehlgeschlagen. Die Eingabe ist ungültig oder eine Aktion war nicht möglich.

**Leitprinzip:** Horizontale Shake-Bewegung als Index für Ablehnung. Kulturell durch die Kopfschüttelgeste verankert (Ware 2012, Direction Bias). Scharfes Easing kommuniziert Abruptheit und Direktheit.

| Parameter | Wert | Begründung |
|---|---|---|
| Easing | Sharp `[0.36, 0.07, 0.19, 0.97]` | Abrupt, keine weiche Kurve, weil Fehler kein angenehmes Abklingen haben |
| Duration | 300–400ms | Ausreichend lang für Wahrnehmung, nicht so lang wie Warnung |
| Direction | x (horizontal, alternierend) | Direction Bias: Horizontales Schütteln = Ablehnung (Ware 2012) |
| Amplitude | Mittel (±8px) | Klar wahrnehmbar ohne visuelle Aggression |
| Iterations | 1 (intern 4–6 Richtungswechsel) | Shake-Bewegung: mehrere Richtungswechsel in einer Animation |
| Zeichentyp | Index | Assoziativ mit Kopfschütteln (kultureller Index für Ablehnung) |

**Keyframe-Sequenz:** `x: [0, -8, 8, -8, 8, -4, 0]` mit `times: [0, 0.15, 0.30, 0.45, 0.60, 0.80, 1.0]`

**Für Editor-Begründungstext:** Die horizontale Schüttelbewegung greift auf die universelle Ablehnungsgeste des Kopfschüttelns zurück. Das scharfe Easing verstärkt die Unmittelbarkeit des Signals. Die Animation kommuniziert, dass eine Eingabe nicht akzeptiert wurde.

---

#### 1c. Feedback / Warning

**Bedeutung:** Eine Aktion ist möglich, aber der Nutzer sollte aufmerksam sein. Kein Fehler, aber ein Hinweis auf einen kritischen Zustand.

**Leitprinzip:** Wiederholte Aufmerksamkeitsbewegung mit moderater Intensität. Unterscheidet sich von Error durch Wiederholung (persistent) und von Success durch fehlende Auflösung.

| Parameter | Wert | Begründung |
|---|---|---|
| Easing | Ease-In-Out `[0.4, 0.0, 0.2, 1.0]` | Keine Abruptheit, aber auch kein Abklingen |
| Duration | 400–500ms pro Zyklus | Langsam genug, um als Warnung und nicht als Fehler wahrgenommen zu werden |
| Direction | y (vertikal, kurzes Auf und Ab) oder Puls (Scale) | Aufmerksamkeitssignal ohne Richtungskonnotation |
| Amplitude | Mittel (Scale 1.0 → 1.03 → 1.0 oder ±4px vertikal) | Sichtbar aber nicht aggressiv |
| Iterations | 2–3 | Persistente Aufmerksamkeit; endet von selbst |
| Zeichentyp | Index | Wiederholte Bewegung als kultureller Index für Persistenz und Dringlichkeit |

**Für Editor-Begründungstext:** Die wiederholte, gleichmäßige Bewegung signalisiert, dass der Nutzer Aufmerksamkeit schenken sollte, ohne einen Fehler zu kommunizieren. Die Wiederholung unterscheidet Warnung von einmaligem Feedback.

---

### Dimension 2: State Change

**Was wird kommuniziert:** Ein UI-Element wechselt seinen Zustand, ohne dass eine Navigation oder Richtungsänderung impliziert wird. Der Zustand vorher und nachher sind gleichwertig, es gibt keine Hierarchiebeziehung zwischen ihnen.

**Semiotischer Typ:** Ikon. Die Animation ähnelt einem physikalischen Umschaltwechsel oder Transformationsprozess.

**Wahrnehmungspsychologische Grundlage:** Ease-In-Out kommuniziert physikalische Plausibilität (Zacks & Tversky 2001: symmetrische Ereignisstruktur). Object Continuity: Das Element bleibt als dasselbe Objekt erkennbar, auch wenn es seinen Zustand wechselt.

**Gilt für Komponenten:** Toggle, Button (toggled state), Modal (Tab-Wechsel)

**Abgrenzung zu Direction:** State Change hat keine Richtungskonnotation. Wenn eine Zustandsänderung gleichzeitig eine Vorwärts- oder Rückwärtsbewegung impliziert, gehört sie zu Direction, nicht zu State Change.

---

#### 2a. State Change / Toggle On

**Bedeutung:** Ein Element wird aktiviert. Der Zustand wechselt von inaktiv zu aktiv.

| Parameter | Wert | Begründung |
|---|---|---|
| Easing | Ease-In-Out `[0.4, 0.0, 0.2, 1.0]` | Symmetrische Kurve für symmetrischen Zustandswechsel |
| Duration | 200–250ms | Schnell genug für eine direkte Reaktion |
| Direction | x (horizontale Translation des Thumb-Elements) | Toggle-Bewegung folgt der physikalischen Metapher des Schalters |
| Amplitude | Volle Breite des Toggle-Tracks | Vollständige Zustandsänderung, kein Zwischenzustand |
| Iterations | 1 | |
| Zeichentyp | Ikon | Ähnelt dem physischen Umlegen eines Schalters |

---

#### 2b. State Change / Toggle Off

**Bedeutung:** Ein Element wird deaktiviert. Spiegelbildlich zu Toggle On.

| Parameter | Wert | Begründung |
|---|---|---|
| Easing | Ease-In-Out `[0.4, 0.0, 0.2, 1.0]` | Identische Kurve für symmetrischen Rückwechsel |
| Duration | 200–250ms | Identische Duration für Konsistenz |
| Direction | x (umgekehrte Richtung) | Umkehrung der Toggle-On-Bewegung |
| Amplitude | Volle Breite des Toggle-Tracks | |
| Iterations | 1 | |
| Zeichentyp | Ikon | |

**Konsistenzprinzip:** Toggle On und Toggle Off müssen identische Duration und Easing verwenden. Asymmetrie zwischen den Richtungen würde eine semantisch irreführende Hierarchie zwischen den Zuständen erzeugen.

---

### Dimension 3: Direction

**Was wird kommuniziert:** Eine Navigation oder ein Übergang impliziert eine räumliche Richtung. Das Element erscheint von einer Seite und kommuniziert damit, ob man sich vorwärts oder rückwärts im Interface bewegt.

**Semiotischer Typ:** Index. Bewegungsrichtung als kausaler Verweis auf Navigationsrichtung (Direction Bias, Ware 2012; Halpern & Kelly 1993).

**Wahrnehmungspsychologische Grundlage:** In Schriftkulturen mit Links-rechts-Leserichtung ist Rechts mit Vorwärts und Links mit Rückwärts assoziiert. Diese Konvention ist in iOS, Android und den meisten Webanwendungen etabliert. Vertikal gilt: Von oben erscheinend als hereinkommend, nach unten verschwindend als weggehend.

**Gilt für Komponenten:** Modal (Enter/Exit), Navigation, Drawer, Sheet

---

#### 3a. Direction / Enter (Vorwärts)

**Bedeutung:** Ein neues Element erscheint und repräsentiert eine tiefere Navigationsstufe oder einen neuen Kontext.

| Parameter | Wert | Begründung |
|---|---|---|
| Easing | Ease-Out `[0.0, 0.0, 0.2, 1.0]` | Ankommen: schnell einfahren, sanft zum Stillstand kommen |
| Duration | 300–350ms | Komplex genug für bewusste Wahrnehmung der Richtung |
| Direction | x (von rechts kommend) oder y (von unten kommend) | Rechts = vorwärts (Direction Bias); Unten = erscheinen aus dem Bildschirmrand |
| Amplitude | Volle Breite oder Höhe des Elements | Vollständige Einfahrt, kein Teileinblenden |
| Iterations | 1 | |
| Zeichentyp | Index | Richtung als kausaler Verweis auf Navigationstiefe |

---

#### 3b. Direction / Exit (Vorwärts verlassen)

**Bedeutung:** Das aktuelle Element verlässt den Sichtbereich, weil der Nutzer vorwärts navigiert hat.

| Parameter | Wert | Begründung |
|---|---|---|
| Easing | Ease-In `[0.4, 0.0, 1.0, 1.0]` | Verlassen: langsam starten, schnell ausfahren |
| Duration | 250–300ms | Kürzer als Enter: das Verlassende ist nicht mehr der Fokus |
| Direction | x (nach links ausfahren) | Umgekehrte Richtung zum Enter, kommuniziert Bewegungsrichtung |
| Amplitude | Volle Breite | |
| Iterations | 1 | |
| Zeichentyp | Index | |

---

#### 3c. Direction / Backward Enter

**Bedeutung:** Ein Element erscheint von links, weil der Nutzer rückwärts navigiert hat (z.B. Back-Button).

| Parameter | Wert | Begründung |
|---|---|---|
| Easing | Ease-Out `[0.0, 0.0, 0.2, 1.0]` | |
| Duration | 300–350ms | |
| Direction | x (von links kommend) | Links = rückwärts (Direction Bias) |
| Amplitude | Volle Breite | |
| Iterations | 1 | |
| Zeichentyp | Index | |

---

#### 3d. Direction / Backward Exit

**Bedeutung:** Das aktuelle Element verlässt nach rechts, weil der Nutzer rückwärts navigiert hat.

| Parameter | Wert | Begründung |
|---|---|---|
| Easing | Ease-In `[0.4, 0.0, 1.0, 1.0]` | |
| Duration | 250–300ms | |
| Direction | x (nach rechts ausfahren) | |
| Amplitude | Volle Breite | |
| Iterations | 1 | |
| Zeichentyp | Index | |

**Konsistenzprinzip:** Enter und Exit einer Navigationsrichtung müssen komplementär sein. Forward Enter (von rechts) und Forward Exit (nach links) bilden ein semantisch kohärentes Paar. Werden sie mit unterschiedlichen Easing-Kurven oder Richtungen gestaltet, bricht die räumliche Metapher.

---

### Dimension 4: Hierarchie und Priorität

**Was wird kommuniziert:** Ein Element tritt visuell in den Vordergrund oder tritt zurück. Die Animation kommuniziert, welches Element gerade primäre Aufmerksamkeit verdient und welches sekundär ist.

**Semiotischer Typ:** Ikon. Skalierung ähnelt physikalischer Nähe und Ferne. Größere Elemente werden als näher und wichtiger wahrgenommen.

**Wahrnehmungspsychologische Grundlage:** Größe ist ein präattentives Merkmal (Treisman & Gelade 1980). Skalierung kommuniziert deshalb Hierarchie ohne bewusste Verarbeitung. Ware (2012) beschreibt, wie räumliche Nähe mit Relevanz assoziiert wird.

**Gilt für Komponenten:** Modal (Erscheinen als primärer Layer), Toast (sekundäre Benachrichtigung), Button (primary vs. secondary)

---

#### 4a. Hierarchie / In den Vordergrund

**Bedeutung:** Ein Element tritt als primärer Inhalt in den Vordergrund. Der Hintergrund wird sekundär.

| Parameter | Wert | Begründung |
|---|---|---|
| Easing | Ease-Out `[0.0, 0.0, 0.2, 1.0]` | Ankommen als primäres Element |
| Duration | 250–350ms | Wahrnehmbar als Zustandswechsel |
| Direction | none (Skalierung zentriert) | Keine Richtung; das Element erscheint an seiner Position |
| Amplitude | Scale 0.95 → 1.0 + Opacity 0 → 1 | Leichte Vergrößerung kommuniziert Herantreten |
| Iterations | 1 | |
| Zeichentyp | Ikon | Skalierung ähnelt physikalischer Annäherung (etwas kommt näher) |

**Für Editor-Begründungstext:** Das Element wächst leicht auf seine finale Größe und wird dabei eingeblendet. Die Skalierung ähnelt dem physikalischen Herantreten eines Objekts und kommuniziert, dass dieses Element nun primäre Aufmerksamkeit beansprucht.

---

#### 4b. Hierarchie / In den Hintergrund

**Bedeutung:** Ein Element tritt zurück, bleibt aber im Hintergrund sichtbar. Der Vordergrund übernimmt.

| Parameter | Wert | Begründung |
|---|---|---|
| Easing | Ease-In `[0.4, 0.0, 1.0, 1.0]` | Zurücktreten |
| Duration | 200–300ms | |
| Direction | none | |
| Amplitude | Scale 1.0 → 0.96 + Opacity leicht reduzieren | Minimale Verkleinerung signalisiert Rückzug ohne Verschwinden |
| Iterations | 1 | |
| Zeichentyp | Ikon | |

---

### Dimension 5: Aufmerksamkeit

**Was wird kommuniziert:** Ein Element möchte die Aufmerksamkeit des Nutzers auf sich lenken, ohne dass eine Nutzeraktion stattgefunden hat. Die Animation ist intrinsisch initiiert, nicht als Reaktion auf eine Aktion.

**Semiotischer Typ:** Index. Die Bewegung steht in einer kausalen Beziehung zur Nachricht, die kommuniziert werden soll: "Hier gibt es etwas zu sehen."

**Wahrnehmungspsychologische Grundlage:** Bewegung ist das stärkste präattentive Merkmal (Treisman & Gelade 1980). Bartram et al. (2003) zeigen, dass Aufmerksamkeitsbewegungen wirksam sind, wenn sie wahrnehmbar, aber nicht ablenkend gestaltet sind. Die Grenze zwischen nützlicher Aufmerksamkeitslenkung und störender Ablenkung ist ein kritischer Designparameter.

**Gilt für Komponenten:** Toast (eingehende Benachrichtigung), Badge, Notification-Dot, Button (Pulsen bei ungesehener Aktion)

**Kritischer Hinweis:** Aufmerksamkeitsanimationen sollten sparsam eingesetzt werden. Mehr als eine gleichzeitig aktive Aufmerksamkeitsanimation überlädt das präattentive System und macht die Priorisierung unmöglich.

---

#### 5a. Aufmerksamkeit / Einmalig

**Bedeutung:** Das Element erscheint und kommuniziert einmalig, dass neue Information vorliegt. Kein persistentes Signal.

| Parameter | Wert | Begründung |
|---|---|---|
| Easing | Ease-Out `[0.0, 0.0, 0.2, 1.0]` | Ankommen und Abklingen |
| Duration | 250–350ms (Einfahrt) + 150ms (leichter Bounce) | |
| Direction | y (von oben oder unten, je nach Toast-Position) | Erscheinen aus dem Bildschirmrand |
| Amplitude | Volle Höhe des Elements + leichter Überschwinger (Spring) | Spring kommuniziert "neu angekommen" |
| Iterations | 1 | |
| Zeichentyp | Index | Erscheinen als kausaler Verweis auf neue Information |

**Für Editor-Begründungstext:** Das Element fährt aus dem Bildschirmrand ein und federt leicht nach. Der Überschwinger signalisiert, dass etwas Neues angekommen ist, und ist wirksamer als ein einfaches Einblenden.

---

#### 5b. Aufmerksamkeit / Persistierend

**Bedeutung:** Das Element muss dauerhaft Aufmerksamkeit einfordern, weil eine Aktion des Nutzers aussteht. Das Signal endet nicht von selbst.

| Parameter | Wert | Begründung |
|---|---|---|
| Easing | Ease-In-Out `[0.4, 0.0, 0.2, 1.0]` | Gleichmäßige, nicht aggressive Bewegung |
| Duration | 800–1200ms pro Zyklus | Langsam genug, um nicht störend zu wirken |
| Direction | none (Puls: Scale oder Opacity) | Keine Richtungskonnotation; nur Präsenz signalisieren |
| Amplitude | Scale 1.0 → 1.04 → 1.0 oder Opacity 1.0 → 0.7 → 1.0 | Minimal wahrnehmbar |
| Iterations | Endlos (bis Aktion ausgeführt) | Persistenz ist das semantische Ziel |
| Zeichentyp | Index | Wiederholte Bewegung als Verweis auf ausstehende Aktion |

**Für Editor-Begründungstext:** Das langsame, gleichmäßige Pulsieren signalisiert, dass eine Aktion aussteht, ohne aggressiv zu wirken. Die endlose Wiederholung endet, sobald der Nutzer reagiert.

**Implementierungshinweis:** Persistierende Aufmerksamkeitsanimationen müssen `prefers-reduced-motion` respektieren und bei aktivierter Media Query deaktiviert werden (WCAG 2.1, Kriterium 2.3.3).

---

---

### Komponente: Input Field

Das Input Field ist die einzige Komponente im Framework, bei der der Nutzer aktiv im Element ist, während Animationen ausgelöst werden können. Das unterscheidet sie fundamental von den anderen vier Komponenten: Beim Button, Toggle oder Modal ist die Nutzeraktion abgeschlossen, bevor die Animation beginnt. Beim Input Field kann die Animation während der laufenden Interaktion stattfinden, etwa wenn eine Validierung in Echtzeit ausgelöst wird.

Diese Besonderheit hat eine direkte Konsequenz für die Animationsparameter: Animationen am Input Field müssen kürzer und subtiler sein als an anderen Komponenten, weil sie den laufenden Eingabefluss nicht unterbrechen dürfen. Hochamplitudige oder langandauernde Animationen (wie der volle Button-Error-Shake) wären während aktiver Eingabe störend. Der Error-Shake wird deshalb für das Input Field in Duration und Amplitude reduziert.

**Gilt für Dimensionen:** Feedback (Success, Error, Warning), State Change (Focus, Blur), Aufmerksamkeit (Pflichtfeld-Hinweis)

---

#### Input Field / Feedback / Success

**Bedeutung:** Die Eingabe ist valide. Das Feld signalisiert, dass der Inhalt akzeptiert wird.

**Leitprinzip:** Subtile, nach außen gerichtete Bewegung. Kein dominantes Signal, weil der Nutzer möglicherweise noch weiter tippt. Ease-Out als Abklingkurve.

| Parameter | Wert | Begründung |
|---|---|---|
| Easing | Ease-Out `[0.0, 0.0, 0.2, 1.0]` | Abklingen als Signal für Abschluss |
| Duration | 150–200ms | Kürzer als Button-Success, weil Eingabe aktiv sein kann |
| Direction | none | Keine Richtungskomponente; nur Zustandsänderung |
| Amplitude | Scale 1.0→1.02→1.0 oder Border-Transition | Minimal; visuell wahrnehmbar ohne ablenkend zu sein |
| Iterations | 1 | |
| Zeichentyp | Ikon/Index | Leichte Expansion als Ikon für Öffnen; grüne Border als Index für Akzeptanz |

**Für Editor-Begründungstext:** Die minimale Ausdehnung und die sofortige Rückkehr zur Ursprungsgröße signalisiert, dass die Eingabe valide ist, ohne den Tippfluss zu unterbrechen.

---

#### Input Field / Feedback / Error

**Bedeutung:** Die Eingabe ist ungültig. Das Feld weist die Eingabe zurück.

**Leitprinzip:** Horizontaler Shake, analog zum Button-Error, aber mit reduzierter Amplitude und Duration. Der Shake muss klar genug sein, um wahrgenommen zu werden, darf aber die Texteingabe nicht visuell destabilisieren.

| Parameter | Wert | Begründung |
|---|---|---|
| Easing | Sharp `[0.36, 0.07, 0.19, 0.97]` | Abruptheit als Fehlersignal |
| Duration | 250–300ms | Kürzer als Button-Error (350ms); Eingabe soll nicht blockiert wirken |
| Direction | x (horizontal, alternierend) | Direction Bias: Ablehnung durch horizontales Schütteln |
| Amplitude | ±5px | Reduziert gegenüber Button (±8px); Eingabefeld ist breiter und reagiert empfindlicher |
| Iterations | 1 (intern 3–4 Richtungswechsel) | |
| Zeichentyp | Index | Assoziativ mit Kopfschütteln |

**Keyframe-Sequenz:** `x: [0, -5, 5, -5, 5, 0]` mit `times: [0, 0.2, 0.4, 0.6, 0.8, 1.0]`

**Für Editor-Begründungstext:** Der reduzierte Shake kommuniziert Ablehnung ohne den Eingabeinhalt visuell zu destabilisieren. Die kürzere Duration respektiert, dass der Nutzer möglicherweise sofort weitertippen möchte.

---

#### Input Field / Feedback / Warning

**Bedeutung:** Die Eingabe ist noch nicht vollständig valide, aber nicht eindeutig falsch. Beispiel: Passwort-Stärke-Indikator, der auf eine schwache Eingabe hinweist.

| Parameter | Wert | Begründung |
|---|---|---|
| Easing | Ease-In-Out `[0.4, 0.0, 0.2, 1.0]` | Gleichmäßig, nicht dringend |
| Duration | 300ms | |
| Direction | none | |
| Amplitude | Opacity-Transition des Hinweistexts 0→1 oder Border-Farbtransition | Kein Bewegungselement; nur Zustandsübergang |
| Iterations | 1 | |
| Zeichentyp | Symbol | Farbkonvention (Orange/Gelb als Warnung) ist kulturell erlernt |

**Für Editor-Begründungstext:** Die sanfte Einblendung des Warnhinweises vermeidet Unterbrechung, macht aber deutlich, dass die Eingabe überarbeitet werden sollte.

---

#### Input Field / State Change / Focus

**Bedeutung:** Das Feld wird aktiv. Der Nutzer hat es angeklickt oder per Tab navigiert und ist nun bereit zur Eingabe.

**Leitprinzip:** Focus ist der semantisch wichtigste State Change beim Input Field. Er kommuniziert Bereitschaft und lädt zur Eingabe ein. Ease-Out als Ankommen-Kurve.

| Parameter | Wert | Begründung |
|---|---|---|
| Easing | Ease-Out `[0.0, 0.0, 0.2, 1.0]` | Ankommen im aktiven Zustand |
| Duration | 150–200ms | Schnell; der Nutzer will sofort tippen |
| Direction | none | |
| Amplitude | Border-Übergang von Ruhezustand zu aktivem Zustand + leichte Scale-Transition des Labels (0.9→1.0 bei Floating Label) | Visueller Fokusindikator |
| Iterations | 1 | |
| Zeichentyp | Ikon | Expansion des Fokusindikators ähnelt physikalischem Herantreten |

**Für Editor-Begründungstext:** Die schnelle, abklingende Transition des Fokusrahmens kommuniziert sofortige Bereitschaft. Der Nutzer sieht, dass das Feld aktiv ist, ohne auf eine Reaktion warten zu müssen.

**Accessibility-Hinweis:** Der Fokuszustand muss auch ohne Animation erkennbar sein (WCAG 2.1, Kriterium 2.4.7). Die Animation ergänzt den Fokusindikator, ersetzt ihn nicht.

---

#### Input Field / State Change / Blur

**Bedeutung:** Das Feld verliert den Fokus. Der Nutzer hat die Eingabe verlassen.

**Leitprinzip:** Spiegelbildlich zum Focus, aber mit Ease-In. Der Ruhezustand wird ruhig und ohne Drama eingenommen.

| Parameter | Wert | Begründung |
|---|---|---|
| Easing | Ease-In `[0.4, 0.0, 1.0, 1.0]` | Zurücktreten in den Ruhezustand |
| Duration | 150ms | Kürzer als Focus; Blur ist weniger bedeutsam |
| Direction | none | |
| Amplitude | Border-Rücktransition zum Ruhezustand | |
| Iterations | 1 | |
| Zeichentyp | Ikon | |

**Konsistenzprinzip:** Focus und Blur müssen als semantisch komplementäres Paar gestaltet sein. Unterschiedliche Easing-Kurven (Ease-Out für Focus, Ease-In für Blur) sind hier bewusst asymmetrisch, weil Focus und Blur keine gleichwertigen Zustände sind: Focus ist ein aktives Ankommen, Blur ist ein passives Zurücktreten.

---

#### Input Field / Aufmerksamkeit / Pflichtfeld-Hinweis

**Bedeutung:** Ein Pflichtfeld wurde bei der Formularabgabe leer gelassen. Das Feld macht auf sich aufmerksam, ohne dass der Nutzer das Feld explizit berührt hat.

**Leitprinzip:** Identisch zum Button-Error-Shake, weil die Semantik dieselbe ist: Ablehnung einer Formularabgabe. Amplitude etwas höher als beim Echtzeit-Feedback-Error, weil dieser Shake von einer Formular-Submit-Aktion ausgelöst wird, nicht von laufender Eingabe.

| Parameter | Wert | Begründung |
|---|---|---|
| Easing | Sharp `[0.36, 0.07, 0.19, 0.97]` | |
| Duration | 300–350ms | |
| Direction | x (horizontal, alternierend) | |
| Amplitude | ±6px | Etwas mehr als Echtzeit-Error, weil der Kontext eine abgeschlossene Aktion ist |
| Iterations | 1 | |
| Zeichentyp | Index | |

**Für Editor-Begründungstext:** Der Shake signalisiert, dass dieses Feld ausgefüllt werden muss, bevor das Formular abgesendet werden kann. Die Bewegung zieht die Aufmerksamkeit auf das Feld, ohne eine Fehlermeldung zu überlagern.

---

### Komponente: Skeleton Loader

Der Skeleton Loader nimmt im Framework eine Sonderstellung ein: Er ist die einzige Komponente, deren primäre Animation als symbolisches Zeichen nach Peirce klassifiziert wird. Alle anderen Komponenten erzeugen überwiegend ikonische oder indexikalische Zeichen. Der Skeleton Loader schließt damit die Peirce-Trichotomie im Framework vollständig ab.

**Semiotische Begründung der Sonderstellung:** Die Shimmer-Animation hat keine ikonische Ähnlichkeit mit einem Ladeprozess und keine indexikalische (kausale oder assoziative) Beziehung zu ihm. Die Verbindung zwischen Bewegung und Bedeutung ist rein konventionell, entstanden durch jahrelangen Einsatz in digitalen Interfaces (Facebook, LinkedIn, iOS). Chandler (2007, S. 36): „A symbol is a sign which refers to the object that it denotes by virtue of a law, usually an association of general ideas." Der Skeleton-Shimmer ist ein Symbol im Peirce'schen Sinne.

**Konsequenz für den Easing-Parameter:** Lineares Easing ist im Framework sonst ein Ausnahmefall, der aus Mangel an wahrnehmungspsychologischer Plausibilität vermieden wird. Beim Skeleton Loader ist Linear die semantisch korrekte Wahl: Konstante Geschwindigkeit ohne erkennbare Anfangs- oder Endphase signalisiert einen kontinuierlichen, phasenlosen Prozess ohne definierten Abschluss. Das entspricht genau dem Ladezustand. Linear ist der einzige Eintrag im Framework, bei dem dieser Preset positiv begründet wird.

**Gilt für Dimensionen:** Aufmerksamkeit (Laden, Aufgelöst)

---

#### Skeleton Loader / Aufmerksamkeit / Laden

**Bedeutung:** Der Platzhalter ist aktiv und signalisiert, dass Inhalte geladen werden. Das Signal ist dauerhaft aktiv, bis die Daten eingetroffen sind.

**Leitprinzip:** Gleichmäßige, endlose Bewegung ohne Anfang und Ende. Die Konstanz der Bewegung kommuniziert einen laufenden Prozess. Keine Beschleunigung, keine Pause, kein Abklingen.

| Parameter | Wert | Begründung |
|---|---|---|
| Easing | Linear `[0.0, 0.0, 1.0, 1.0]` | Konstante Geschwindigkeit signalisiert phasenlosen Dauerprozess (Zacks & Tversky 2001) |
| Duration | 1400–1600ms pro Zyklus | Langsam genug, um nicht störend zu wirken; schnell genug, um Aktivität zu signalisieren |
| Direction | x (von links nach rechts) | Leserichtungskonvention; nicht bedeutungstragend, sondern konventionell |
| Amplitude | Volle Breite des Elements | Vollständige Überstreifung des Platzhalters |
| Iterations | Endlos (bis Daten eingetroffen) | Persistenz ist das semantische Ziel |
| Zeichentyp | Symbol | Rein konventionelle Bedeutungsbeziehung ohne ikonische oder indexikalische Grundlage |

**Implementierungshinweis:** Die Shimmer-Animation wird als Gradient-Translation implementiert: Ein heller Lichtstreifen bewegt sich mit konstanter Geschwindigkeit horizontal über den Platzhalter. In Framer Motion über `backgroundPosition` oder ein absolut positioniertes Pseudo-Element mit `translateX`. In CSS über `@keyframes` mit `background-position` auf einem `linear-gradient`. Die Iteration muss programmatisch gestoppt werden, wenn die Daten eingetroffen sind.

**Für Editor-Begründungstext:** Der gleichmäßige Shimmer bewegt sich mit konstanter Geschwindigkeit über den Platzhalter. Es besteht keine natürliche Verbindung zwischen dieser Bewegung und dem Ladevorgang. Die Bedeutung entsteht ausschließlich durch Konvention, die sich durch den verbreiteten Einsatz in digitalen Interfaces etabliert hat.

**Accessibility-Hinweis:** Der Skeleton Loader muss bei aktivierter `prefers-reduced-motion` Media Query die Shimmer-Animation deaktivieren. Der statische Platzhalter allein ist ausreichend, um den Ladezustand zu kommunizieren, da seine Form bereits einen Hinweis auf den erwarteten Inhalt gibt.

---

#### Skeleton Loader / Aufmerksamkeit / Aufgelöst

**Bedeutung:** Die Inhalte sind eingetroffen. Der Platzhalter verschwindet und macht dem tatsächlichen Inhalt Platz.

**Leitprinzip:** Das Ausblenden des Skeletons und das Einblenden des Inhalts laufen gleichzeitig mit leichter Überlappung. Das Ausblenden ähnelt dem physischen Verblassen eines Objekts und ist deshalb als ikonisches Zeichen klassifiziert, nicht als Symbol wie der Shimmer.

| Parameter | Wert | Begründung |
|---|---|---|
| Easing | Ease-Out `[0.0, 0.0, 0.2, 1.0]` | Abklingen als Signal für Abschluss des Ladeprozesses (Zacks & Tversky 2001) |
| Duration | 300–400ms | Wahrnehmbar als Zustandswechsel, nicht abrupt |
| Direction | none | Keine translatorische Bewegung; nur Opazitätsänderung |
| Amplitude | Opacity 1 → 0 | Vollständiges Ausblenden |
| Iterations | 1 | |
| Zeichentyp | Ikon | Opazitätsreduktion ähnelt physikalischem Verblassen und Verschwinden |

**Konsistenzprinzip:** Der Resolved-Eintrag wird bewusst als Ikon klassifiziert, obwohl der Loading-Eintrag ein Symbol ist. Der Shimmer hat keine natürliche Grundlage, das Ausblenden hat sie. Diese Asymmetrie ist theoretisch korrekt und muss im Theoriekapitel explizit benannt werden, um nicht als Inkonsistenz des Frameworks zu wirken.

**Für Editor-Begründungstext:** Der Skeleton blendet aus, sobald der Inhalt eingetroffen ist. Das Ausblenden ähnelt dem physischen Verschwinden eines Platzhalters und signalisiert, dass der Ladeprozess abgeschlossen ist.

---

## 4. Klassifikationslogik: Entscheidungsbaum

Für jeden Animationsfall wird die Bedeutungsdimension nach folgendem Schema bestimmt:

```
Ist die Animation eine Reaktion auf eine Nutzeraktion?
  JA → Handelt es sich um eine Navigation?
    JA → Dimension 3: Direction
    NEIN → Dimension 1: Feedback (Success / Error / Warning)
  NEIN → Initiiert das Element die Animation selbst (ohne Nutzeraktion)?
    JA → Dimension 5: Aufmerksamkeit
    NEIN → Wechselt ein Element seinen Zustand?
      JA → Impliziert der Zustandswechsel eine Richtung?
        JA → Dimension 3: Direction
        NEIN → Dimension 2: State Change
      NEIN → Tritt ein Element visuell in den Vordergrund oder Hintergrund?
        JA → Dimension 4: Hierarchie
```

---

## 5. Vollständige Mapping-Tabelle

Die folgende Tabelle gibt einen Überblick aller geplanten Mappings. Die vollständige Implementierung erfolgt in POC 2 und wird in der Mapping-Datenbank unter `/src/data/mappings/` hinterlegt.

| Komponente | Dimension | Subkategorie | Easing | Duration | Direction | Amplitude | Zeichentyp |
|---|---|---|---|---|---|---|---|
| Button | Feedback | Success | Ease-Out | 250ms | y (kurz) | Scale 1.0→1.05→1.0 | Ikon/Index |
| Button | Feedback | Error | Sharp | 350ms | x (Shake) | ±8px | Index |
| Button | Feedback | Warning | Ease-In-Out | 450ms | y (Pulse) | Scale 1.0→1.03 | Index |
| Button | Aufmerksamkeit | Persistierend | Ease-In-Out | 1000ms | none | Scale 1.0→1.04 | Index |
| Toggle | State Change | On | Ease-In-Out | 220ms | x | Volle Breite | Ikon |
| Toggle | State Change | Off | Ease-In-Out | 220ms | x (umgekehrt) | Volle Breite | Ikon |
| Toast | Feedback | Success | Ease-Out | 300ms | y (von unten) | Volle Höhe + Spring | Index |
| Toast | Feedback | Error | Sharp | 350ms | y + x (Shake) | Volle Höhe + ±6px | Index |
| Toast | Feedback | Warning | Ease-In-Out | 400ms | y (von unten) | Volle Höhe | Index |
| Toast | Aufmerksamkeit | Einmalig | Ease-Out | 300ms | y (von unten) | Volle Höhe + Spring | Index |
| Modal | Hierarchie | In den Vordergrund | Ease-Out | 300ms | none | Scale 0.95→1.0 + Opacity | Ikon |
| Modal | Hierarchie | In den Hintergrund | Ease-In | 250ms | none | Scale 1.0→0.96 | Ikon |
| Modal | Direction | Enter | Ease-Out | 350ms | y (von unten) | Volle Höhe | Index |
| Modal | Direction | Exit | Ease-In | 280ms | y (nach unten) | Volle Höhe | Index |
| Input Field | Feedback | Success | Ease-Out | 175ms | none | Scale 1.0→1.02→1.0 | Ikon/Index |
| Input Field | Feedback | Error | Sharp | 275ms | x (Shake) | ±5px | Index |
| Input Field | Feedback | Warning | Ease-In-Out | 300ms | none | Opacity-Transition | Ikon |
| Input Field | State Change | Focus | Ease-Out | 175ms | none | Border-Transition + Label | Ikon |
| Input Field | State Change | Blur | Ease-In | 150ms | none | Border-Rücktransition | Ikon |
| Input Field | Aufmerksamkeit | Pflichtfeld-Hinweis | Sharp | 325ms | x (Shake) | ±6px | Index |
| Skeleton Loader | Aufmerksamkeit | Laden | Linear | 1500ms | x (Shimmer) | Volle Breite | **Symbol** |
| Skeleton Loader | Aufmerksamkeit | Aufgelöst | Ease-Out | 350ms | none | Opacity 1→0 | Ikon |

---

## 6. Abgrenzung und Einschränkungen

**Keine empirische Validierung:** Die Bedeutungszuordnungen sind theoretisch hergeleitet, nicht durch Nutzerstudien validiert. Die Herleitung folgt semiotischen und wahrnehmungspsychologischen Prinzipien, ist aber nicht als empirischer Befund zu verstehen.

**Kulturelle Grenzen:** Direction-Mappings (Links/Rechts als Vorwärts/Rückwärts) gelten für westliche Schriftkulturen mit Links-rechts-Leserichtung. In arabischen oder hebräischen Kontexten wäre die Richtungskonvention umzukehren.

**Accessibility:** Alle Animationen müssen `prefers-reduced-motion` respektieren. Das Framework definiert keine statischen Alternativzustände; diese sind in der Editor-Implementierung zu ergänzen.

**Scope:** Das Framework deckt sechs Komponenten und fünf Bedeutungsdimensionen ab. Es erhebt keinen Anspruch auf Vollständigkeit für alle UI-Komponenten oder alle denkbaren Bedeutungsdimensionen. Mit dem Skeleton Loader sind alle drei Peirce-Zeichentypen (Ikon, Index, Symbol) im Framework vertreten.

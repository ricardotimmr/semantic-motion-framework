# Theorie-Notizen und Exzerpte

---

## Hinweis zur Nutzung

Dieses Dokument enthält Exzerpte, Paraphrasen und eigene Notizen zu den Kernquellen des theoretischen Rahmens. Es ist kein zitierfähiges Dokument, sondern ein Arbeitsinstrument. Direkte Zitate sind als solche gekennzeichnet und mit Seitenangaben zu versehen, sobald die gedruckte Quelle vorliegt.

---

## 1. Semiotik

### 1.1 Ferdinand de Saussure - Das dyadische Zeichenmodell

**Quelle:** Saussure, F. de (1916). Cours de linguistique générale. (Sekundär: Chandler 2007, Chandler/Semiotics: The Basics)

#### Kerngedanke

Saussure definiert das Zeichen als zweiteilige psychologische Einheit, bestehend aus:

- **Signifikant** (signifiant): die Ausdrucksseite, die wahrnehmbare Form des Zeichens (z.B. das Lautbild eines Wortes oder eine visuelle Form)
- **Signifikat** (signifié): die Inhaltsseite, das mentale Konzept, das mit dem Signifikanten verbunden ist

Das Verhältnis zwischen Signifikant und Signifikat ist nach Saussure **arbiträr**, also willkürlich und konventionell. Es gibt keinen natürlichen oder notwendigen Zusammenhang zwischen der Lautform "Baum" und dem Konzept eines Baumes. Bedeutung entsteht nicht aus dem Zeichen selbst, sondern aus dem Unterschied zu anderen Zeichen im System.

#### Relevanz für das Framework

Das dyadische Modell erklärt, warum viele Animationen als arbiträre Symbole funktionieren: Ein Ladekreis (Spinner) bedeutet "Warten" nicht aus sich heraus, sondern weil diese Konvention kulturell etabliert ist. Das ist ein Saussure'sches Symbol in Peirce'scher Terminologie. Das Framework muss für solche Zuordnungen die kulturelle Konvention explizit benennen, nicht eine vermeintlich natürliche Bedeutung.

#### Offene Frage

Saussures Modell ist sprachbezogen. Die Übertragung auf visuelle und dynamische Zeichen (Animationen) ist nicht selbstverständlich. Chandler (2007) und Eco (1976) leisten diese Erweiterung. Das Theoriekapitel muss diese Übertragung begründen.

---

### 1.2 Charles Sanders Peirce - Das triadische Zeichenmodell

**Quelle:** Peirce, C. S. (1931-1958). Collected Papers. (Sekundär: Chandler 2007, Stanford Encyclopedia of Philosophy)

#### Kerngedanke

Peirces Zeichenmodell ist triadisch und besteht aus drei Elementen:

- **Repräsentamen**: die wahrnehmbare Form des Zeichens (entspricht grob Saussures Signifikant)
- **Objekt**: das, worauf das Zeichen verweist
- **Interpretant**: die Bedeutung, die im Geist des Rezipienten entsteht

Der Interpretant ist kein fester Bedeutungsinhalt, sondern ein weiteres Zeichen, das den Interpretationsprozess fortsetzt (unendliche Semiose). Bedeutung ist damit immer prozessual und kontextgebunden.

#### Die Trichotomie: Ikon, Index, Symbol

Peirce klassifiziert Zeichen nach der Art der Beziehung zwischen Repräsentamen und Objekt:

**Ikon:** Das Zeichen ähnelt seinem Objekt. Die Beziehung ist motiviert durch Ähnlichkeit. Beispiel klassisch: ein Porträtfoto als Ikon der abgebildeten Person. Im UI-Kontext: eine Fade-Animation als Ikon des Verschwindens, weil sie das visuelle Erlebnis des Verblassens nachahmt.

**Index:** Das Zeichen steht in einer realen, kausalen oder assoziativen Beziehung zu seinem Objekt. Die Beziehung ist nicht arbiträr, aber auch nicht durch Ähnlichkeit begründet. Beispiel klassisch: Rauch als Index für Feuer. Im UI-Kontext: eine horizontale Shake-Animation als Index für Ablehnung oder Fehler. Die Assoziation ist kulturell und physisch verankert (Kopfschütteln als Ablehnungsgeste).

**Symbol:** Das Zeichen steht in einer arbiträren, konventionellen Beziehung zu seinem Objekt. Die Verbindung ist reine Konvention, sie muss erlernt werden. Beispiel klassisch: das Wort "Baum". Im UI-Kontext: ein Spinner als Symbol für Laden, weil diese Konvention kulturell etabliert ist, aber keine natürliche Grundlage hat.

#### Wichtige Einschränkung

Peirce selbst betont, dass die drei Typen keine streng getrennten Kategorien sind, sondern Aspekte eines Zeichens, die in unterschiedlichem Maße vorliegen können. Ein Zeichen kann gleichzeitig ikonische, indexikalische und symbolische Eigenschaften haben. Das Framework muss den jeweils dominanten Aspekt identifizieren, ohne zu behaupten, eine Animation sei ausschließlich ein Index.

#### Relevanz für das Framework

Die Peirce'sche Trichotomie ist der zentrale Klassifikationsrahmen des Mapping-Systems. Die Frage, ob eine Animation als Ikon, Index oder Symbol funktioniert, bestimmt die Art der Bedeutungsbeziehung und damit, ob die Zuordnung natürlich, kulturell oder konventionell begründet ist. Das ist die wissenschaftliche Herleitung hinter jedem Eintrag in der Mapping-Datenbank.

Konkrete Anwendungsbeispiele für das Framework:

| Animation                 | Zeichentyp | Begründung                                              |
| ------------------------- | ---------- | ------------------------------------------------------- |
| Fade in                   | Ikon       | Ähnlichkeit mit physischem Erscheinen/Entstehen         |
| Fade out                  | Ikon       | Ähnlichkeit mit physischem Verschwinden                 |
| Horizontal Shake          | Index      | Assoziativ mit Kopfschütteln (Ablehnung)                |
| Vertical Bounce           | Index      | Assoziativ mit Nicken (Bestätigung) oder Aufmerksamkeit |
| Scale Up (Erscheinen)     | Ikon       | Ähnlichkeit mit physischem Herantreten/Auftauchen       |
| Scale Down (Verschwinden) | Ikon       | Ähnlichkeit mit physischem Entfernen                    |
| Spinner (Rotation)        | Symbol     | Konventionell für Laden, keine natürliche Grundlage     |
| Slide Right (vorwärts)    | Index      | Assoziativ mit Vorwärtsbewegung (Direction Bias)        |
| Slide Left (zurück)       | Index      | Assoziativ mit Rückwärtsbewegung (Direction Bias)       |

---

### 1.3 Klaus Krippendorff - Design als Bedeutungssystem

**Quelle:** Krippendorff, K. (2006). The Semantic Turn: A New Foundation for Design. CRC Press.

#### Kerngedanke

Krippendorff argumentiert, dass Design nicht die Gestaltung von Formen, sondern die Gestaltung von Bedeutungen ist. Artefakte haben keine immanente Bedeutung. Bedeutung entsteht immer im Interpretationsprozess des Nutzers in einem spezifischen Kontext. Designer gestalten Bedeutungsangebote, keine Bedeutungen selbst.

Der "Semantic Turn" bezeichnet die Verschiebung des Designfokus von physikalischen Eigenschaften (wie funktioniert es?) zu semantischen Eigenschaften (was bedeutet es für den Nutzer?).

#### Für das Theoriekapitel

Krippendorff liefert den konzeptuellen Überbau: Das Semantic Motion Framework ist eine Anwendung des Semantic Turn auf das spezifische Designproblem UI-Animation. Wenn Design grundsätzlich Bedeutungsgestaltung ist, dann ist die explizite Bedeutungsherleitung von Animationen kein optionales Feature, sondern eine Grundanforderung an gutes Motion Design.

---

### 1.4 Don Norman - Signifier und Affordance

**Quelle:** Norman, D. A. (2013). The Design of Everyday Things (revised edition). Basic Books.

#### Kernbegriffe

**Affordance:** Die tatsächlichen Möglichkeiten der Interaktion zwischen einem Nutzer und einem Objekt. Affordances existieren unabhängig davon, ob sie wahrgenommen werden. Ein Button afforded Klicken, auch wenn der Nutzer das nicht bemerkt.

**Signifier:** Ein wahrnehmbares Signal (visuell, akustisch, haptisch), das dem Nutzer kommuniziert, welche Aktion möglich oder erwünscht ist. Signifiers machen Affordances wahrnehmbar. Ohne Signifier bleiben Affordances verborgen.

Normans Kernsatz: "Affordances determine what actions are possible. Signifiers communicate where the action should take place. We need both."

#### Animationen als dynamische Signifier

Animationen sind keine statischen Signifier, sondern dynamische. Sie kommunizieren nicht nur, welche Aktion möglich ist, sondern auch:

- was gerade passiert (Feedback-Signifier: Shake = Fehler)
- was als nächstes passieren wird (Anticipation-Signifier: Scale-up vor Erscheinen)
- wie weit ein Prozess fortgeschritten ist (Progress-Signifier: Ladebalken)
- in welche Richtung die Navigation geht (Direction-Signifier: Slide-Richtung)

#### Verbindung zu Peirce

Normans Signifier-Begriff und Peirces Zeichentypologie ergänzen sich produktiv:

- Ein Signifier, der durch Ähnlichkeit funktioniert = Ikon (Fade als Signifier für Verschwinden)
- Ein Signifier, der durch Assoziation funktioniert = Index (Shake als Signifier für Fehler)
- Ein Signifier, der durch Konvention funktioniert = Symbol (Spinner als Signifier für Laden)

Das Framework verbindet damit Norman (praktische Designtheorie) mit Peirce (semiotische Grundlage) und Krippendorff (designtheoretischer Überbau).

#### Übersetzung in die Editor-Sprache (Bezug zu FF2)

Forschungsfrage 2 fragt, wie das Framework für Nutzer ohne Semiotik-Kenntnisse zugänglich gemacht werden kann. Die Antwort liegt im Signifier-Begriff als Übersetzungsschicht.

Im Editor wird Peirce'sche Terminologie nicht als primäre Erklärungsebene sichtbar. Die Standard-Begründungstexte operieren auf dem Abstraktionsniveau von Normans Signifier-Begriff, weil dieser dem Designvokabular der Zielgruppe entspricht. Die semiotische Herleitung bleibt als wissenschaftliche Detailbegründung erhalten und kann optional über eine Detail- oder Tooltip-Ansicht zugänglich gemacht werden.

Die Übersetzungslogik funktioniert wie folgt:

| Peirce (Theorie)                                           | Norman (Vermittlungsebene)                                       | Editor-Sprache (Zielgruppe)                                                                                                             |
| ---------------------------------------------------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Index: Shake als assoziativer Verweis auf Ablehnung        | Dynamischer Signifier kommuniziert "Aktion nicht möglich"        | "Die horizontale Schüttelbewegung greift auf eine universelle Ablehnungsgeste zurück und kommuniziert, dass eine Eingabe ungültig ist." |
| Ikon: Fade-out als Ähnlichkeit mit physischem Verschwinden | Dynamischer Signifier kommuniziert "Element verlässt das System" | "Das Ausblenden ahmt das physische Verblassen nach und signalisiert, dass ein Element dauerhaft entfernt wurde."                        |
| Symbol: Spinner als konventionelles Zeichen für Warten     | Dynamischer Signifier kommuniziert "Prozess läuft"               | "Die Rotation ist eine etablierte Konvention für laufende Prozesse. Ihre Bedeutung ist erlernt, nicht intuitiv."                        |
| Index: Slide-right als Verweis auf Vorwärtsbewegung        | Dynamischer Signifier kommuniziert Navigationstrichtung          | "Die Bewegung nach rechts folgt der westlichen Leserichtung und signalisiert, dass eine neue Ebene geöffnet wird."                      |

Diese Übersetzungstabelle ist das operative Bindeglied zwischen FF1 (theoretische Fundierung des Frameworks) und FF2 (Operationalisierung im Editor). Sie zeigt, dass die semantische Begründung im Editor nicht beliebig formuliert ist, sondern aus der Peirce'schen Klassifikation abgeleitet wird, dabei aber auf das Vorwissen der Zielgruppe (Signifier als bekanntes UX-Konzept) zurückgreift.

**Konsequenz für die Implementierung:** Jeder Eintrag in der Mapping-Datenbank enthält neben den Animationsparametern zwei Textebenen: eine wissenschaftliche Detailbegründung (Peirce-Zeichentyp + Wahrnehmungsgrundlage) und einen nutzergerichteten Begründungstext (Norman-Sprache). Die nutzergerichtete Ebene wird standardmäßig angezeigt; die wissenschaftliche Ebene kann optional als Detailinformation zugänglich gemacht werden.

---

## 2. Wahrnehmungspsychologie

### 2.1 Treisman & Gelade - Feature Integration Theory

**Quelle:** Treisman, A. & Gelade, G. (1980). A feature-integration theory of attention. Cognitive Psychology, 12(1), 97-136. DOI: 10.1016/0010-0285(80)90005-5

#### Kerngedanke

Die Feature Integration Theory beschreibt visuelle Verarbeitung als zweistufigen Prozess:

**Stufe 1 - Präattentive Verarbeitung:** Grundlegende visuelle Merkmale (Farbe, Orientierung, Bewegung, Helligkeit) werden automatisch, parallel und ohne bewusste Aufmerksamkeit verarbeitet. Diese Verarbeitung geschieht in spezialisierten neuronalen Karten ("feature maps"), die simultan aktiv sind. Wenn ein Stimulus sich durch ein einziges Merkmal von seiner Umgebung unterscheidet, wird er präattentiv erkannt: er "pops out".

**Stufe 2 - Fokussierte Aufmerksamkeit:** Wenn ein Stimulus durch eine Kombination von Merkmalen identifiziert werden muss (conjunction search), ist serielle, bewusste Aufmerksamkeit erforderlich. Die Reaktionszeit steigt linear mit der Anzahl der Distraktoren.

#### Bewegung als präattentives Merkmal

Bewegung ist eines der stärksten präattentiven Merkmale. Ein sich bewegendes Element in einer statischen Umgebung wird unabhängig von der Position im Sichtfeld sofort erkannt, ohne dass der Nutzer aktiv danach sucht. Treisman (1977) belegt dies für Motion als Feature-Search-Kategorie.

Praktische Implikation: Animationen steuern Aufmerksamkeit, bevor Nutzer bewusst entscheiden, wohin sie schauen. Das ist die neuropsychologische Grundlage für die Aufmerksamkeits-Dimension im Framework.

#### Relevanz für das Framework

Die Feature Integration Theory begründet, warum Animationen überhaupt als Bedeutungsträger wirksam sein können: Sie umgehen die bewusste Aufmerksamkeit und kommunizieren direkt auf der präattentiven Ebene. Gleichzeitig erklärt das die Verantwortung im Design: Zu viele simultane Animationen überlasten das präattentive System und erzeugen Ablenkung statt Information.

**Wichtige Einschränkung:** Präattentive Merkmalsverarbeitung registriert das Vorhandensein von Bewegung, nicht ihre semantische Qualität. Die Bedeutung der Bewegung (Shake = Fehler) wird auf einer höheren Verarbeitungsebene konstruiert. Das Framework adressiert diese höhere Ebene.

---

### 2.2 Direction Bias

**Quelle:** Ware, C. (2012). Information Visualization: Perception for Design. (Kapitel zu motion perception); Halpern & Kelly (1993); Zacks & Tversky (2001)

#### Kerngedanke

Direction Bias bezeichnet die Tendenz, Bewegungsrichtungen mit spezifischen Bedeutungen zu assoziieren. Diese Tendenzen sind teilweise durch neurobiologische Asymmetrien im Wahrnehmungssystem, teilweise durch kulturelle Konventionen und teilweise durch physikalische Erfahrung begründet.

**Horizontale Richtung:**

- In Schriftkulturen mit Links-rechts-Leserichtung (lateinisch, kyrillisch) wird Bewegung nach rechts als Vorwärtsbewegung interpretiert, Bewegung nach links als Rückwärtsbewegung. Dieser Effekt ist in User-Interface-Systemen wie iOS und Android konventionalisiert (Slide right = go back; Slide left = forward auf Navigationspfaden variieren je nach System, aber die Richtungskonvention ist kulturell stabil).
- Halpern & Kelly (1993) belegen ein Gedächtnis-Bias: Objekte, die nach rechts bewegen, werden als weiter in ihrer Bewegungsrichtung fortgeschritten erinnert (Representational Momentum).

**Vertikale Richtung:**

- Aufwärtsbewegung ist mit positiven Bedeutungen assoziiert (Aufsteigen, Wachsen), Abwärtsbewegung mit negativen oder finalisierenden Bedeutungen (Fallen, Abschließen). Das hat physikalische Grundlagen (Gravitation) und kulturelle Verstärkung.

**Für das Framework:** Die Slide-Richtung eines Modals oder einer Navigation ist kein ästhetischer Parameter, sondern ein semantischer. Slide-in von rechts signalisiert "vorwärts" (neue Ebene), Slide-in von links signalisiert "rückwärts" (zurücknavigieren). Das Framework muss diese Konvention explizit kodieren.

---

### 2.3 Object Continuity und Ereignisstruktur

**Quelle:** Zacks, J. M. & Tversky, B. (2001). Event Structure in Perception and Conception. Psychological Bulletin, 127(1), 3-21. DOI: 10.1037/0033-2909.127.1.3

#### Kerngedanke

Zacks und Tversky zeigen, dass Menschen kontinuierliche Bewegungen und Handlungen nicht als lückenlose Kurven wahrnehmen, sondern in diskrete Ereigniseinheiten segmentieren. Diese Segmentierung ist hierarchisch: Große Einheiten (z.B. "Türöffnen") enthalten kleinere Einheiten (z.B. "Griff drücken", "Tür ziehen").

Das Erkennen von Ereignisgrenzen ist ein aktiver Wahrnehmungsprozess: Das visuelle System sucht nach Momenten, in denen sich die Bewegungsqualität ändert, und interpretiert diese als Ereignisgrenzen.

**Object Continuity:** Ein Objekt wird als über Zeit und Raum hinweg identisch wahrgenommen, solange seine Bewegung kontinuierlich ist. Diskontinuitäten (abrupte Richtungswechsel, Unterbrechungen) signalisieren entweder ein neues Ereignis oder ein anderes Objekt.

#### Relevanz für das Framework

Nutzer nehmen eine Animation nicht als parametrische Kurve wahr, sondern als strukturierte Sequenz mit Anfang, Mitte und Ende. Das erklärt:

1. Warum **Easing** semantisch bedeutsam ist: Slow-in (langsamer Start) kommuniziert, dass die Bewegung noch aufbaut. Slow-out (langsames Ende) kommuniziert, dass die Bewegung sich beruhigt und abschließt. Diese Phasenstruktur ist keine ästhetische Präferenz, sondern folgt der natürlichen Ereigniswahrnehmung.

2. Warum **Anticipation** (aus den Disney-Prinzipien) wahrnehmungspsychologisch wirksam ist: Sie setzt ein Signal, das dem Wahrnehmungssystem anzeigt, dass ein Ereignis beginnt.

3. Warum abrupte, lineare Animationen (linear easing) unnatürlich wirken: Sie entsprechen keiner natürlichen Ereignisstruktur.

---

### 2.4 Bartram, Ware & Calvert - Bewegung als Kodierungskanal

**Quelle:** Bartram, L., Ware, C. & Calvert, T. (2003). Moticons: Detection, Distraction and Task. International Journal of Human-Computer Studies, 58(5), 515-545. DOI: 10.1016/S1071-5819(03)00021-1

#### Kerngedanke

Bartram et al. untersuchen, ob einfache Bewegungsmuster (Moticons) als Notifikationskanal in peripheren Bereichen des Sichtfeldes wirksam eingesetzt werden können, ohne primäre Aufgaben zu unterbrechen. Ihre Befunde:

- **Bewegung ist hocheffektiv für Detektion:** Moticons werden im peripheren Sehen sicher erkannt, auch wenn die Aufmerksamkeit auf eine Hauptaufgabe gerichtet ist.
- **Nicht alle Bewegungen sind gleich:** Verschiedene Bewegungsattribute (Frequenz, Richtung, Typ) erzeugen unterschiedliche Wirkungen auf Detektion, Identifikation und Ablenkung. Manche Bewegungen werden zuverlässig erkannt, ohne die Hauptaufgabe zu stören. Andere erzeugen starke Ablenkung.
- **Informationsdichte ist begrenzt:** Einfache Bewegungsmuster können maximal 3-4 Zustände kodieren, bevor Verwechslung auftritt.

#### Relevanz für das Framework

Die Studie liefert empirische Evidenz dafür, dass Bewegungsattribute unterschiedliche semantische Kapazitäten haben. Nicht jeder Animationsparameter ist gleich gut geeignet, eine bestimmte Bedeutungsdimension zu kodieren. Für das Framework bedeutet das: Die Wahl zwischen Frequenz, Richtung und Typ einer Animation sollte sich nach der Bedeutungsdimension richten, nicht nach ästhetischen Präferenzen.

Konkret: Eine hochfrequente, vibrierende Animation (hohe Frequenz) signalisiert dringliche Aufmerksamkeit und erzeugt höhere Ablenkung. Eine langsame, sanfte Bewegung (niedrige Frequenz) signalisiert sekundäre Information und stört die Hauptaufgabe weniger. Das Framework muss diesen Zusammenhang für die Aufmerksamkeits-Dimension kodieren.

---

## 3. Motion Design Prinzipien

### 3.1 Thomas & Johnston - Die Disney-Prinzipien

**Quelle:** Thomas, F. & Johnston, O. (1981). The Illusion of Life: Disney Animation. Abbeville Press.

#### Überblick

Johnston und Thomas dokumentieren 12 Animationsprinzipien, die Disney-Animatoren seit den 1930ern entwickelt hatten. Das Ziel war die Illusion physischer Realität in gezeichneten Figuren. Die Prinzipien sind keine Theorie, sondern praktisches Erfahrungswissen. Dennoch haben sie eine wahrnehmungspsychologische Grundlage, die Chang & Ungar (1993) und spätere Autoren explizit machen.

#### Für das Framework relevante Prinzipien

**Slow In / Slow Out (entspricht Easing)**

Das Prinzip beschreibt, dass natürliche Bewegungen nicht mit konstanter Geschwindigkeit beginnen und enden, sondern langsam starten, beschleunigen und wieder abbremsen. Im Animationskontext: mehr Keyframes am Anfang und Ende einer Bewegung, weniger in der Mitte.

Im Framework: Slow In / Slow Out ist der wahrnehmungspsychologische Ursprung von Ease-in-Out. Lineare Bewegung (keine Beschleunigung) wirkt mechanisch und unnatürlich, weil sie der natürlichen Ereignisstruktur widerspricht (vgl. Zacks & Tversky 2001).

Semantische Tragfähigkeit: Ease-Out (schnell starten, langsam enden) signalisiert Abklingen und Abschluss. Ease-In (langsam starten, schnell enden) signalisiert Aufbau und Dringlichkeit. Ease-in-Out ist neutral und natürlich wirkend.

**Anticipation (Anticipation)**

Eine Bewegung wird durch eine kurze Gegenbewegung angekündigt: Bevor eine Figur springt, knickt sie kurz in die Knie. Diese Gegenbewegung bereitet das Wahrnehmungssystem des Zuschauers auf die folgende Hauptbewegung vor.

Im Framework: Anticipation ist als semantischer Träger für "etwas wird erscheinen" oder "eine Aktion wird ausgeführt" einsetzbar. Ein Button, der beim Hover minimal skaliert, kommuniziert Interaktivität durch Anticipation.

Wahrnehmungspsychologische Grundlage: Das Wahrnehmungssystem interpretiert Anticipation als Ereignisgrenze (Zacks & Tversky) und als präattentives Signal (Treisman). Die kurze Gegenbewegung erzeugt einen Kontrast, der die Aufmerksamkeit auf das folgende Hauptereignis lenkt.

**Follow Through und Overlapping Action**

Bewegte Objekte setzen ihre Bewegung kurz fort, auch nachdem die Hauptkraft aufgehört hat. Ein Haarzopf schwingt nach, wenn eine Figur den Kopf dreht. Verschiedene Teile eines Objekts bewegen sich mit leichtem zeitlichem Versatz.

Im Framework: Follow Through kommuniziert Gewicht und Abklingen. Ein Modal, das beim Erscheinen kurz über seine Endposition hinausgeht und zurückfedert (Spring-Easing), kommuniziert physikalische Substanz. Das unterscheidet eine bedeutungsvolle Animation von einer mechanischen.

**Timing**

Die Anzahl der Frames (im digitalen Kontext: die Duration) bestimmt, wie schwer, schnell oder leicht eine Aktion wahrgenommen wird. Wenige Frames (kurze Duration) wirken schnell und leicht. Viele Frames (lange Duration) wirken langsam und schwer.

Im Framework: Duration ist ein direkter semantischer Parameter. Kurze Animationen (unter 200ms) kommunizieren Unmittelbarkeit und Direktheit. Lange Animationen (über 400ms) kommunizieren Gewicht und Wichtigkeit. Sehr lange Animationen (über 600ms) werden als störend wahrgenommen und brechen den Interaktionsfluss.

Richtwerte aus der Praxis (Head 2016, Material Design 3):

- Mikrointeraktionen (Feedback): 100-300ms
- Navigationstransitionen: 200-400ms
- Komplexe Übergänge: 300-500ms

---

### 3.2 Chang & Ungar - Übertragung auf das User Interface

**Quelle:** Chang, B.-W. & Ungar, D. (1993). Animation: From Cartoons to the User Interface. Proceedings of UIST '93, 45-55. DOI: 10.1145/168642.168647

#### Kerngedanke

Chang und Ungar sind einer der ersten, die die Disney-Prinzipien systematisch auf UI-Design übertragen. Ihre zentrale Argumentation: Animationen in Interfaces kommunizieren Kausalität, Kontinuität und Zustandswechsel. Die Disney-Prinzipien sind wirksam, weil sie auf menschliche Wahrnehmungserwartungen abgestimmt sind, nicht weil sie "realistisch" aussehen.

Das Paper gewann 2004 den UIST Lasting Impact Award, was seine Bedeutung für das Feld belegt.

#### Relevanz für das Framework

Chang & Ungar begründen die Übertragung historisch und konzeptuell. Das Framework baut auf dieser Übertragung auf und geht einen Schritt weiter: Es ergänzt die wahrnehmungsbasierte Begründung (Disney-Prinzipien) durch eine semiotische Bedeutungsebene (Peirce).

---

### 3.3 Heer & Robertson - Easing in Datentransitionen

**Quelle:** Heer, J. & Robertson, G. (2007). Animated Transitions in Statistical Data Graphics. IEEE TVCG, 13(6), 1240-1247. DOI: 10.1109/TVCG.2007.70539

#### Kerngedanke

Heer und Robertson analysieren systematisch, welche Animationsstrategien bei der Darstellung von Datentransformationen (Änderung von Balkendiagrammen, Scatterplots etc.) die Wahrnehmung verbessern. Zwei zentrale Befunde:

1. **Staging verbessert das Verstehen:** Wenn komplexe Übergänge in sequenzielle Teilschritte aufgeteilt werden, können Nutzer die Transformation besser nachvollziehen.

2. **Easing beeinflusst die Qualität der Wahrnehmung:** Animationen mit natürlicher Easing-Kurve werden als flüssiger und verständlicher bewertet als lineare Animationen. Die Wahl der Easing-Kurve ist keine ästhetische, sondern eine kognitive Entscheidung.

#### Relevanz für das Framework

Heer & Robertson liefern empirische Belege dafür, dass Easing als Gestaltungsvariable messbare Unterschiede in der Wahrnehmungsqualität erzeugt. Das stärkt die Argumentation, dass Easing im Framework als semantischer Parameter behandelt werden kann: Verschiedene Easing-Kurven erzeugen nachweislich verschiedene Wahrnehmungsqualitäten, und das Framework ordnet diese Qualitäten Bedeutungsdimensionen zu.

**Einschränkung:** Der Kontext von Heer & Robertson ist Datenvisualisierung, nicht UI-Feedback-Animation. Die Übertragung muss im Theoriekapitel explizit begründet werden.

---

### 3.4 Willenskomer - Kritik der Disney-Analogie

**Quelle:** Willenskomer, I. (2015). Disney is Dead. Medium / UX in Motion.  
URL: https://medium.com/ux-in-motion/ui-animation-principles-disney-is-dead-8bf6c66207f9

#### Kernargument

Willenskomer argumentiert, dass die Disney-Prinzipien für UI-Animation ungeeignet sind, weil:

- Sie für die kinetische Physik organischer Figuren entwickelt wurden, nicht für die Bedeutungslogik von Interface-Elementen
- Sie ästhetische Ziele verfolgen (natürlich aussehen), nicht kommunikative (Bedeutung vermitteln)
- Interface-Elemente keine physikalischen Objekte sind und deshalb nicht nach physikalischen Prinzipien animiert werden sollten

Willenskomer schlägt eigene "UX in Motion Principles" vor (12 Prinzipien wie Easing, Offset & Delay, Parenting etc.), die spezifisch für UI-Kontext entwickelt wurden.

#### Kritische Einordnung für das Framework

Willenskomers Kritik ist teilweise berechtigt und muss im Theoriekapitel adressiert werden. Das Semantic Motion Framework übernimmt die Disney-Prinzipien nicht unkritisch:

- **Übernommen werden:** Easing (als Basis für semantische Duration-Parameter), Timing (als Duration-Parameter), Anticipation (als semantischer Träger für "etwas wird passieren"), Follow Through (als semantischer Träger für Gewicht und Abklingen)
- **Modifiziert werden:** Squash & Stretch (kaum relevant für geometrische UI-Elemente), Arc (begrenzt relevant)
- **Nicht übernommen werden:** Solid Drawing, Pose-to-Pose (irrelevant für UI-Animation)

Das Framework stimmt Willenskomer zu, dass Disney-Prinzipien nicht einfach übertragen werden können. Es unterscheidet sich von Willenskomers Ansatz, indem es nicht neue empirische Prinzipien aufstellt, sondern die übertragbaren Disney-Prinzipien semiotisch fundiert.

---

## 4. Synthesenotizen: Verbindungen zwischen den Theoriesträngen

### 4.1 Das Dreieck: Semiotik - Wahrnehmung - Motion-Prinzipien

Die drei Theoriestränge sind nicht unabhängig, sondern ergänzen sich auf drei Ebenen:

**Was kommuniziert wird** (Semiotik): Peirces Trichotomie beschreibt, welche Art von Bedeutungsbeziehung eine Animation aufbaut. Ist es eine Ähnlichkeitsbeziehung (Ikon), eine assoziative Beziehung (Index) oder eine konventionelle Beziehung (Symbol)?

**Wie es wahrgenommen wird** (Wahrnehmungspsychologie): Treisman erklärt, warum Bewegung überhaupt Aufmerksamkeit erzeugt. Zacks & Tversky erklären, wie Animationsphasen (Easing) wahrgenommen werden. Bartram et al. zeigen, welche Bewegungsattribute welche Aufmerksamkeitswirkungen erzeugen.

**Wie es gestaltet wird** (Motion-Prinzipien): Thomas & Johnston, Chang & Ungar und Heer & Robertson liefern die konkreten Gestaltungsparameter (Easing, Timing, Anticipation, Follow Through), die das Framework in seiner Mapping-Datenbank kodiert.

### 4.2 Das Congruence-Prinzip als Verbindungsstück

Tversky et al. (2002) formulieren das Congruence Principle: Animationen sind nur dann kognitionserleichternd, wenn Inhalt und Form der Animation dem dargestellten Konzept entsprechen. Dieses Prinzip verbindet alle drei Stränge: Das Framework stellt Kongruenz her, indem es semiotisch begründete Animationsparameter (Semiotik) so wählt, dass sie der natürlichen Wahrnehmungsstruktur entsprechen (Wahrnehmungspsychologie) und mit erprobten Gestaltungsparametern umgesetzt werden (Motion-Prinzipien).

### 4.3 Offene Fragen für das Theoriekapitel

- Wie genau wird die Übertragung von Saussures sprachlichem Zeichenmodell auf visuelle und dynamische Zeichen begründet? (Chandler 2007, Eco 1976 helfen hier)
- Ist Direction Bias kulturuniversell oder kulturspezifisch? (Halpern & Kelly 1993 geben Hinweise; Eco 1976 für kulturelle Kodierung)
- Wo liegt die Grenze zwischen Index und Symbol bei Animationen? Der Spinner (Rotation) könnte auch als ikonisch interpretiert werden (Kreiselbewegung als physischer Prozess). Die Abgrenzung muss begründet werden.
- Wie wird die fehlende empirische Validierung des Frameworks im Theoriekapitel positioniert? (Tversky et al. 2002 als Bezugspunkt für den Anspruch; bewusste Einschränkung im Diskussionskapitel)

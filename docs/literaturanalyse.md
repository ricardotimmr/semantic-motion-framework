# Literaturübersicht und Quellenanalyse

---

## Vorbemerkung

Dieses Dokument wertet alle bisher identifizierten Quellen systematisch aus. Jede Quelle wird nach Relevanz eingestuft, kurz inhaltlich beschrieben und in Bezug auf das Projekt verortet. Am Ende jedes Abschnitts werden Lücken im theoretischen Rahmen benannt.

Die Quellen sind in vier Kategorien eingeteilt:

- **Kernquellen:** Bilden das theoretische Rückgrat des Frameworks. Müssen vollständig gelesen und in der Arbeit explizit verarbeitet werden.
- **Stützquellen:** Fundieren einzelne Argumentationsschritte. Werden selektiv eingesetzt.
- **Erweiterte Quellen:** Für Diskussion, Related Work und kritische Auseinandersetzung. Selektiv verwendbar.
- **Technische Quellen:** Referenzwerke für die Implementierung. Keine wissenschaftlichen Zitationsquellen, aber notwendig für Prototyp-Entscheidungen.

---

## 1. Kernquellen

### 1.1 Semiotik und Bedeutung

---

**Peirce, C. S. (1931–1958). Collected Papers. Harvard University Press.**  
URL: https://plato.stanford.edu/entries/peirce-semiotics/

Relevanz: hoch  
Status: Pflichtlekture

Peirce entwickelt das triadische Zeichenmodell mit den drei Zeichentypen Ikon, Index und Symbol. Dieser Klassifikationsrahmen ist die unmittelbare theoretische Grundlage des Mapping-Systems im Framework. Die Zuordnung von Animationsparametern zu Bedeutungsdimensionen folgt der Peirce'schen Logik: Eine Shake-Animation ist ein Index, weil sie eine kausale oder assoziative Verbindung zur Ablehnungsbedeutung herstellt. Die Collected Papers sind als Primärquelle zu behandeln. Für den Einstieg eignet sich die Stanford Encyclopedia of Philosophy als kommentierter Zugang.

Einsatz in der Arbeit: Theoriekapitel Semiotik, direkte Herleitung der Klassifikationslogik des Frameworks.

---

**Krippendorff, K. (2006). The Semantic Turn: A New Foundation for Design. CRC Press.**  
URL: https://www.taylorfrancis.com/books/mono/10.1201/9780203299951/semantic-turn-klaus-krippendorff

Relevanz: hoch  
Status: Pflichtlekture

Krippendorff argumentiert, dass Design grundsätzlich als Bedeutungssystem zu verstehen ist. Designers gestalten nicht Formen, sondern die Bedeutungen, die Nutzer in Artefakten konstruieren. Das ist der konzeptuelle Kern des Projekts: Animationen sind nicht dekorativ, sondern bedeutungstragend. Krippendorffs Semantic Turn liefert die designtheoretische Rahmung, innerhalb derer das Framework überhaupt sinnvoll ist.

Einsatz in der Arbeit: Einleitung (Problemstellung), Theoriekapitel als konzeptueller Überbau, Begründung des Forschungsinteresses.

---

**Norman, D. A. (2013). The Design of Everyday Things (revised edition). Basic Books.**  
URL: https://www.jnd.org/books/the-design-of-everyday-things-revised-and-expanded-edition.html

Relevanz: hoch  
Status: Pflichtlekture

Norman etabliert die Konzepte Affordance und Signifier als zentrale Werkzeuge der Interaction-Design-Theorie. Signifiers sind wahrnehmbare Signale, die dem Nutzer kommunizieren, wie ein Objekt zu bedienen ist. Animationen funktionieren als dynamische Signifier: Sie zeigen nicht nur, dass etwas passiert ist, sondern kommunizieren, was es bedeutet. Die Verbindung von Norman zu Peirce ist für das Framework produktiv: Ein Signifier im Norman'schen Sinne kann als Index im Peirce'schen Sinne kodiert werden.

Einsatz in der Arbeit: Theoriekapitel, Brücke zwischen Semiotik und Interaction Design.

---

### 1.2 Motion Design und UI-Animation

---

**Head, V. (2016). Designing Interface Animation. Rosenfeld Media.**  
URL: https://rosenfeldmedia.com/books/designing-interface-animation/

Relevanz: hoch  
Status: Pflichtlekture

Das wichtigste praxisnahe Referenzwerk zu Animationen in Benutzeroberflächen. Head behandelt Themen wie Feedback, Orientierung, Zustandswechsel und die Funktion von Bewegung als Kommunikationsmittel. Das Buch ist keine theoretische Abhandlung, sondern ein anwendungsorientiertes Framework-Kompendium. Für das Projekt ist es die Hauptquelle, die belegt, dass eine praxisnahe Klassifikation von UI-Animationen nach Bedeutung ein anerkanntes Ziel in der Community ist.

Einsatz in der Arbeit: Theoriekapitel Motion Design, Related Work, direkte Vergleichsbasis für das eigene Framework.

---

**Saffer, D. (2014). Microinteractions: Designing with Details. O'Reilly.**  
URL: https://www.oreilly.com/library/view/microinteractions/9781491945912/

Relevanz: hoch  
Status: Pflichtlekture

Saffer beschreibt das Trigger-Rules-Feedback-Loops-Modell für kleinteilige Interaktionen. Mikrointeraktionen sind der unmittelbare Anwendungskontext des Frameworks: Button-Klicks, Toast-Benachrichtigungen, Toggle-Zustandswechsel. Das Modell liefert die strukturelle Beschreibungsebene, auf der Animationen als Feedback-Mechanismus eingeordnet werden.

Einsatz in der Arbeit: Theoriekapitel Microinteractions, Grundlage für die Komponentenauswahl (Button, Toggle, Toast, Modal).

---

**Material Design 3 – Motion. Google.**  
URL: https://m3.material.io/styles/motion/overview

Relevanz: hoch  
Status: Referenz (keine wissenschaftliche Zitationsquelle)

Das Material Design Motion System ist das am weitesten verbreitete real existierende Motion-Framework. Es beschreibt Easing-Kurven, Duration-Token und Transition-Patterns in industrieller Skalierung. Für das Projekt ist es die wichtigste Vergleichsbasis: Das eigene Framework unterscheidet sich von Material Design durch die explizite Bedeutungsebene. Material Design beschreibt "wie", das Semantic Motion Framework beschreibt "warum".

Einsatz in der Arbeit: Related Work, kritische Abgrenzung des eigenen Ansatzes.

---

### 1.3 Wahrnehmung und Aufmerksamkeit

---

**Treisman, A. & Gelade, G. (1980). A feature-integration theory of attention. Cognitive Psychology, 12(1), 97–136.**  
URL: https://www.sciencedirect.com/science/article/pii/0010028580900055

Relevanz: hoch  
Status: Pflichtlekture

Feature Integration Theory beschreibt, wie das menschliche Wahrnehmungssystem visuelle Merkmale präattentiv verarbeitet. Bewegung ist eines der stärksten präattentiven Merkmale: Sie wird vor bewusster Aufmerksamkeit registriert. Das erklärt, warum Animationen im Interface so wirksam für Aufmerksamkeitssteuerung sind, und liefert die neuropsychologische Grundlage für das Framework. Der Artikel ist ein Klassiker der Kognitionspsychologie und hochgradig zitierfähig.

Einsatz in der Arbeit: Theoriekapitel Wahrnehmungspsychologie, Begründung der Aufmerksamkeits-Dimension im Framework.

---

**Ware, C. (2012). Information Visualization: Perception for Design (3rd ed.). Morgan Kaufmann.**  
URL: https://www.elsevier.com/books/information-visualization/ware/978-0-12-381464-7

Relevanz: hoch  
Status: Pflichtlekture

Ware verbindet Wahrnehmungspsychologie mit Designprinzipien auf systematische Weise. Das Buch behandelt unter anderem, wie Bewegung Aufmerksamkeit steuert, was präattentiv verarbeitet wird und welche Rolle Bewegungsrichtung in der Bedeutungsverarbeitung spielt. Direction Bias als Phänomen ist bei Ware fundiert. Das Buch ist zudem die Primärquelle für die Relevanz von Bartram, Ware & Calvert (2003), die direkt auf Wares Theorierahmen aufbauen.

Einsatz in der Arbeit: Theoriekapitel Wahrnehmungspsychologie, Fundierung von Direction Bias und präattentiver Verarbeitung.

---

## 2. Stützquellen

### 2.1 Semiotik und visuelle Bedeutung

---

**Chandler, D. (2007). Semiotics: The Basics (2nd ed.). Routledge.**  
URL: https://www.routledge.com/Semiotics-The-Basics/Chandler/p/book/9780415363761

Relevanz: mittel  
Status: Ergänzende Lekture

Zugängliche Einführung in semiotische Grundbegriffe. Für die Bachelorarbeit nützlich als didaktische Brücke, wenn Peirce direkt zu komplex einzuführen ist. Chandler erklärt Signifikant, Signifikat und Zeichentypen verständlich. Kann als einführende Sekundärquelle zitiert werden.

---

**Eco, U. (1976). A Theory of Semiotics. Indiana University Press.**  
URL: https://iupress.org/9780253202178/a-theory-of-semiotics/

Relevanz: mittel  
Status: Selektiv verwenden

Eco erweitert die Semiotik um den Begriff des Codes und der kulturellen Kodierung von Bedeutung. Relevant für das Framework, weil Animationsbedeutungen nicht universell, sondern kulturell kodiert sind. Die Frage, ob eine horizontale Shake-Animation weltweit als Ablehnung verstanden wird, ist eine Eco'sche Frage. Selektiv für das Diskussionskapitel verwenden.

---

**Ardjomandi, A. (2025). Visual Semiotics and User Perception in Digital Interface Design. IRE Journals, 8(10).**  
URL: https://www.irejournals.com/formatedpaper/1707847.pdf

Relevanz: niedrig bis mittel  
Status: Mit Vorsicht verwenden

Der Artikel untersucht semiotische Prinzipien in digitalen Interfaces, mit Schwerpunkt auf architektonischen Anwendungen. Die empirische Basis (Mixed-Methods mit Nutzerstudien) ist für das Projekt nützlich als Beleg, dass semiotische Prinzipien messbar auf Nutzerwahrnehmung wirken. Jedoch ist der thematische Fokus auf Architektur-Interfaces nicht deckungsgleich mit UI-Animation. Die Quelle ist zitierfähig, aber nicht zentral. Hinweis: Das Journal (IRE Journals) ist ein Open-Access-Journal mit breitem Scope. Die wissenschaftliche Qualitätssicherung sollte vor der Verwendung geprüft werden.

---

### 2.2 HCI und Interaction Design

---

**Rogers, Y., Sharp, H. & Preece, J. (2019). Interaction Design: Beyond Human-Computer Interaction (5th ed.). Wiley.**  
URL: https://www.wiley.com/en-us/Interaction+Design

Relevanz: mittel  
Status: Nachschlagewerk

Standardwerk der Interaction-Design-Ausbildung. Liefert konzeptuelle Grundlagen zu Feedback, Affordances, mentalen Modellen und Designprinzipien. Nützlich als Referenz, wenn grundlegende Konzepte eingeführt werden, ohne eigene Herleitung.

---

**Shneiderman, B., Plaisant, C., Cohen, M. & Jacobs, S. (2016). Designing the User Interface (6th ed.). Pearson.**

Relevanz: niedrig  
Status: Optional

Breites Standardwerk zu UI-Design. Für das spezifische Thema Animation und Semantik weniger ergiebig als die anderen Quellen. Kann für allgemeine UI-Designprinzipien zitiert werden, ist aber kein Schwerpunkt.

---

**Cooper, A., Reimann, R., Cronin, D. & Noessel, C. (2014). About Face: The Essentials of Interaction Design (4th ed.). Wiley.**

Relevanz: mittel  
Status: Selektiv verwenden

About Face behandelt ausführlich Verhaltensmuster von UI-Elementen und liefert konzeptuelle Werkzeuge für Zustandswechsel, Navigation und Feedback. Nützlich für die Verortung der vier Framework-Komponenten (Button, Toggle, Toast, Modal) in der IxD-Literatur.

---

### 2.3 Motion und Animationsforschung

---

**Bartram, L., Ware, C. & Calvert, T. (2003). Moticons: Detection, Distraction and Task. International Journal of Human-Computer Studies, 58(5), 515–545.**  
DOI: 10.1016/S1071-5819(03)00021-1

Relevanz: hoch  
Status: Pflichtlekture

Empirische Studie über den Einsatz von Bewegung als Kodierungskanal in informationsdichten Interfaces. Die Autoren zeigen, dass einfache Bewegungen (Moticons) als Notifikationsmechanismus wirksamer sind als Farb- und Formkodes, insbesondere im peripheren Sehen. Die Studie liefert empirische Evidenz dafür, dass Bewegungsattribute (Frequenz, Richtung, Typ) unterschiedliche Wirkungen auf Detektion und Ablenkung haben. Direkt relevant für die Aufmerksamkeits-Dimension im Framework.

Einsatz in der Arbeit: Wahrnehmungspsychologie, empirische Fundierung der Aufmerksamkeitswirkung von Bewegung.

---

**Chevalier, F., Henry Riche, N., Plaisant, C., Chalbi, A. & Hurter, C. (2016). Animations 25 Years Later: New Roles and Opportunities. AVI '16, 280–287.**  
URL: https://dl.acm.org/doi/10.1145/2909132.2909255

Relevanz: mittel  
Status: Stützquelle

Chevalier et al. revidieren Baecker & Smalls Klassifikation von Animationsrollen aus den 1990ern auf Basis aktueller Forschung und Interviews mit 20 Praktikern. Das Ergebnis ist ein erweitertes Rollenset für Animationen: Orientierung, Lehren, UX-Verbesserung, Datenkodierung, visueller Diskurs. Relevant für das Related-Work-Kapitel, da die Arbeit zeigt, dass Animationen multiple kommunikative Funktionen erfüllen können und die Forschungsgemeinschaft dies 2016 noch als offenes Feld betrachtet.

---

**Tversky, B., Morrison, J. B. & Betrancourt, M. (2002). Animation: Can it Facilitate? International Journal of Human-Computer Studies, 57(4), 247–262.**  
DOI: 10.1006/ijhc.2002.1017

Relevanz: mittel  
Status: Stützquelle für Diskussion

Kritische Überprüfung der Annahme, Animationen seien grundsätzlich lernförderlich. Tversky et al. zeigen, dass Animationen nur dann besser als statische Darstellungen sind, wenn sie dem Congruence Principle folgen: Inhalt und Format der Animation müssen dem dargestellten Konzept entsprechen. Relevant für das Framework als implizite Begründung: Das Semantic Motion Framework stellt genau diese Kongruenz her, indem es Animationsparameter semantisch begründet auswählt.

Einsatz in der Arbeit: Diskussionskapitel, Begründung des Congruence-Ansatzes des Frameworks.

---

### 2.4 Microinteractions und UX

---

**Kolte, A. & Rao, P. (2024). Microinteractions in HCI. Springer.**  
URL: https://link.springer.com

Relevanz: mittel  
Status: Stützquelle

Aktuellere wissenschaftliche Behandlung von Mikrointeraktionen im HCI-Kontext. Ergänzt Saffer (2014) mit neueren Perspektiven. Nützlich, um die Aktualität des Themas zu belegen.

---

**Manchinella, S. (2024). Impact of Microinteractions on User Experience. ResearchGate.**  
URL: https://www.researchgate.net

Relevanz: niedrig bis mittel  
Status: Optional

Abhängig von der tatsächlichen Publikationsqualität. Vor Verwendung prüfen, ob peer-reviewed. Kann für empirische Belege zur UX-Wirkung von Mikrointeraktionen nützlich sein.

---

**Nielsen Norman Group. Microinteractions in UX.**  
URL: https://www.nngroup.com/articles/microinteractions/

Relevanz: niedrig  
Status: Nicht als wissenschaftliche Quelle zitierbar

Praxisorientierter Artikel aus der UX-Community. Nicht zitierfähig im wissenschaftlichen Sinne, aber nützlich als Nachweis, dass das Thema in der professionellen Community präsent ist. Nur im technischen oder einleitenden Kontext verwenden.

---

### 2.5 Cognitive Load und Verarbeitung

---

**Sweller, J. (1988). Cognitive load during problem solving: Effects on learning. Cognitive Science, 12(2), 257–285.**

Relevanz: mittel  
Status: Stützquelle

Grundlagentext zur Cognitive Load Theory. Relevant für das Framework, weil gut gestaltete, bedeutungskongruente Animationen den kognitiven Aufwand der Bedeutungsverarbeitung reduzieren. Schlechte, semantisch inkonsistente Animationen erhöhen ihn. Selektiv für das Diskussionskapitel verwenden.

---

**Sweller, J., van Merrienboer, J. & Paas, F. (1998). Cognitive Architecture and Instructional Design. Educational Psychology Review, 10(3), 251–296.**

Relevanz: niedrig bis mittel  
Status: Optional

Erweiterung der CLT auf Instruktionsdesign. Für das Projekt weniger direkt relevant als Sweller (1988).

---

**Mayer, R. E. (2009). Multimedia Learning (2nd ed.). Cambridge University Press.**

Relevanz: mittel  
Status: Stützquelle

Mayers Cognitive Theory of Multimedia Learning beschreibt, wie Text, Bild und Bewegung in der Verarbeitung interagieren. Das Redundanz- und das Kongruenzprinzip aus Mayers Forschung sind für die Begründung relevant, warum Animationen bedeutungskongruent gestaltet sein sollten. Selektiv verwendbar.

---

### 2.6 Wahrnehmung und Aufmerksamkeit (vertiefend)

---

**Healey, C. G. & Enns, J. T. (2012). Attention and Visual Memory in Visualization and Computer Graphics. IEEE Transactions on Visualization and Computer Graphics, 18(7), 1170–1188.**

Relevanz: mittel  
Status: Stützquelle

Systematische Übersicht über präattentive Merkmale und visuelle Aufmerksamkeit im Kontext von Informationsvisualisierung. Ergänzt Treisman & Gelade mit aktuelleren Befunden. Nützlich für eine breitere Fundierung der Aufmerksamkeits-Dimension.

---

**Itti, L. & Koch, C. (2001). Computational Modelling of Visual Attention. Nature Reviews Neuroscience, 2(3), 194–203.**

Relevanz: niedrig  
Status: Optional

Computational Model of Visual Attention. Für das Projekt zu tief in der Neurowissenschaft angesiedelt. Kann am Rande zitiert werden, wenn die biologische Grundlage präattentiver Verarbeitung kurz belegt werden soll.

---

## 3. Erweiterte Quellen

### 3.1 Motion-Theorie und Kritik

---

**Willenskomer, I. (2015). Disney is Dead. Medium / UX in Motion.**  
URL: https://medium.com/ux-in-motion/ui-animation-principles-disney-is-dead-8bf6c66207f9

Relevanz: mittel  
Status: Mit Einschränkungen verwenden

Willenskomer argumentiert, dass die direkte Übertragung der Disney-Animationsprinzipien auf UI-Animation problematisch ist, weil deren Ursprung (kinetische Physik von Zeichentrickfiguren) nicht auf die Bedeutungslogik von Interfaces passt. Das ist eine wichtige kritische Position für das Diskussionskapitel: Das Framework muss begründen, welche Disney-Prinzipien es übernimmt, welche es modifiziert und warum. Als Medium-Artikel ist die Quelle nicht wissenschaftlich zitierfähig, aber relevant für die Problemstellung.

---

**Thomas, F. & Johnston, O. (1981). The Illusion of Life: Disney Animation. Abbeville Press.**

Relevanz: mittel  
Status: Historische Primärquelle

Die Originalquelle der 12 Disney-Animationsprinzipien (Squash and Stretch, Anticipation, Timing, Follow Through, etc.). Relevant als historische Grundlage und als Ausgangspunkt der Kritik (Willenskomer). Für das Framework direkt nützlich für Prinzipien wie Easing (Slow In / Slow Out), Anticipation und Follow Through als semantische Träger.

---

### 3.2 Animationswirkung

---

**Robertson, G., Fernandez, R., Fisher, D., Lee, B. & Stasko, J. (2008). Effectiveness of Animation in Trend Visualization. IEEE Transactions on Visualization and Computer Graphics, 14(6), 1325–1332.**

Relevanz: niedrig bis mittel  
Status: Selektiv verwenden

Empirische Untersuchung der Wirksamkeit von Animation gegenüber statischen Darstellungen in Datenvisualisierungen. Ergebnis: Animation ist langsamer und weniger genau als alternative Darstellungsformen. Nützlich als kritische Gegenperspektive im Diskussionskapitel. Der Kontext (Datenvisualisierung statt UI-Feedback) ist zu beachten.

---

**Bederson, B. B. & Boltman, A. (1999). Does animation help users navigate the web? Proceedings of IEEE Symposium on Information Visualization.**  
URL: https://dl.acm.org

Relevanz: niedrig  
Status: Optional, historisches Interesse

Ältere empirische Studie zu Navigation und Animation. Historisch interessant, aber durch neuere Studien weitgehend ersetzt.

---

### 3.3 Design Systems (Vergleich)

---

**Apple Human Interface Guidelines – Motion.**  
URL: https://developer.apple.com/design/human-interface-guidelines/motion

Relevanz: mittel  
Status: Referenz (keine wissenschaftliche Zitationsquelle)

Apples Motion-Guidelines beschreiben Prinzipien wie Responsiveness, Fluidity und kontinuierliche Bewegung als Feedbacksignal. Gute Vergleichsbasis neben Material Design. Zeigt, wie ein großes Designsystem Motion ohne explizite Bedeutungsebene behandelt.

---

**IBM Carbon Design System – Motion.**  
URL: https://carbondesignsystem.com/guidelines/motion/overview/

Relevanz: mittel  
Status: Referenz (keine wissenschaftliche Zitationsquelle)

Carbon nutzt explizit produktive vs. expressive Motion als Unterscheidungskategorie. Das kommt dem Semantic-Motion-Ansatz näher als Material Design oder Apple HIG. Gutes Related-Work-Beispiel.

---

**Microsoft Fluent Design System – Motion.**  
URL: https://learn.microsoft.com/en-us/windows/apps/design/motion/

Relevanz: niedrig bis mittel  
Status: Referenz (keine wissenschaftliche Zitationsquelle)

Dritte große Motion-Referenz. Weniger konzeptuell ausgearbeitet als Carbon. Für vollständige Related-Work-Übersicht nützlich.

---

### 3.4 Accessibility

---

**W3C. WCAG 2.1 – Success Criterion 2.3.3: Animation from Interactions.**  
URL: https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html

Relevanz: mittel  
Status: Normative Referenz

WCAG 2.1 schreibt vor, dass Bewegungsanimationen aus Interaktionen abgeschaltet werden können müssen, sofern sie nicht funktional essenziell sind. Das ist eine direkte Anforderung an das Framework: Alle semantischen Animationen müssen so gestaltet sein, dass sie bei aktivierter prefers-reduced-motion Media Query entweder entfallen oder durch statische Alternativen ersetzt werden.

Einsatz in der Arbeit: Anforderungsanalyse (als implizite NFA), Diskussionskapitel.

---

**Smashing Magazine (2023). Creating Accessible UI Animations.**  
URL: https://www.smashingmagazine.com/2023/11/creating-accessible-ui-animations/

Relevanz: niedrig  
Status: Nicht als wissenschaftliche Quelle zitierbar

Praxisorientierter Artikel. Nützlich für technische Umsetzungshinweise, aber keine zitierfähige Quelle.

---

### 3.5 UX und Experience

---

**Hassenzahl, M. (2010). Experience Design: Technology for All the Right Reasons. Morgan & Claypool.**

Relevanz: niedrig bis mittel  
Status: Optional

Hassenzahl unterscheidet pragmatische und hedonische Qualität in User Experience. Animationen können zu hedonischer Qualität beitragen. Für das Projekt am Rande relevant; kann für die Einordnung des emotionalen Ausdrucks von Bewegung nützlich sein.

---

## 4. Technische Quellen

Diese Quellen werden für die Implementierung des Prototyps benötigt, sind aber keine zitierfähigen wissenschaftlichen Quellen für die Bachelorarbeit.

---

**Framer Motion Documentation.**  
URL: https://www.framer.com/motion/

Primäre technische Referenz für die Implementierung aller Animationen im Editor. Wird im Implementierungskapitel für Architekturentscheidungen referenziert.

---

**Web Animations API (W3C).**  
URL: https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API

Technische Spezifikation. Relevant für die CSS-Export-Funktion und als Grundlage für das Verständnis, wie Browser Animationen rendern.

---

**React Documentation.**  
URL: https://react.dev

Referenz für die Komponentenarchitektur des Editors.

---

## 5. Identifizierte Lücken

### Lücke 1: Direction Bias als Primärquelle

Direction Bias (die Tendenz, horizontale Bewegung nach links als Rückwärtsbewegung und nach rechts als Vorwärtsbewegung zu lesen) ist in der Concept Map als wichtige theoretische Grundlage aufgeführt. Die bisherige Quellensammlung hat keine dedizierte Primärquelle dafür. Ware (2012) behandelt Direction Bias, aber eine stärker kognitionspsychologische Quelle wäre wünschenswert.

Empfehlung: Suche nach Zacks & Tversky (2001) "Event Structure in Perception and Conception" und Freyd (1983) zur Wahrnehmung implizierter Bewegungsrichtung.

---

### Lücke 2: Object Continuity und Gestaltpsychologie

Object Continuity ist ebenfalls in der Concept Map als theoretisches Konzept verankert. Die bisherige Quellensammlung hat keine direkte Quelle dafür. Object Continuity im Animationskontext geht auf Gestaltprinzipien zurück.

Empfehlung: Prüfe Michotte, A. (1963) "The Perception of Causality" und die Gestaltgesetze als historische Primärquellen. Alternativ ist Ware (2012) als Sekundärquelle ausreichend.

---

### Lücke 3: Easing als semantischer Träger

Die Idee, dass Easing-Kurven Bedeutung transportieren (Ease-Out als zielorientiert, Ease-In als abklingend), ist für das Framework zentral. Es gibt noch keine dedizierte wissenschaftliche Quelle, die diesen Zusammenhang empirisch belegt. Thomas & Johnston (1981) beschreiben Slow In / Slow Out als physikalisches Prinzip, aber ohne Bedeutungszuschreibung.

Empfehlung: Suche nach Heer & Robertson (2007) "Animated Transitions in Statistical Data Graphics" oder Chang & Ungar (1993) "Animation: From Cartoons to the User Interface" für frühere Behandlungen von Easing im UI-Kontext.

---

### Lücke 4: Empirische Validierung semiotischer Bedeutungszuordnungen

Das Framework ordnet Animationsparametern Bedeutungen zu. Es gibt keine Quelle, die diese spezifischen Zuordnungen empirisch validiert. Das ist eine bewusste Einschränkung der Arbeit, muss aber im Diskussionskapitel explizit als Forschungslücke und Ausblick benannt werden.

---

## 6. Empfohlene neue Kernquellen (5 bis 8 Ergänzungen)

Die folgenden Quellen werden als Ergänzung zur bestehenden Sammlung empfohlen. Sie schließen die identifizierten Lücken und stärken die theoretische Fundierung.

---

**Zacks, J. M. & Tversky, B. (2001). Event Structure in Perception and Conception. Psychological Bulletin, 127(1), 3–21.**

Schließt Lücke 1. Zacks und Tversky beschreiben, wie Menschen kontinuierliche Ereignisse in diskrete Einheiten segmentieren. Direkt relevant für die Wahrnehmung von Animationsphasen und die semantische Bedeutung von Bewegungsrichtung.

---

**Heer, J. & Robertson, G. (2007). Animated Transitions in Statistical Data Graphics. IEEE Transactions on Visualization and Computer Graphics, 13(6), 1240–1247.**

Schließt Lücke 3. Heer und Robertson analysieren systematisch, welche Animationstransitionen bei Datentransformationen die Wahrnehmung verbessern. Die Arbeit führt Staging und Easing als Gestaltungsvariablen ein und gibt empirische Hinweise darauf, warum bestimmte Easing-Kurven bei bestimmten Transformationen besser funktionieren.

---

**Chang, B.-W. & Ungar, D. (1993). Animation: From Cartoons to the User Interface. Proceedings of UIST '93, 45–55.**

Schließt Lücke 3. Einer der frühesten Texte, der Animationsprinzipien aus der Filmproduktion auf UI-Design überträgt. Historisch wichtig als Grundlagentext, der zeigt, dass die Übertragung der Disney-Prinzipien in die Interaktionsgestaltung ein erkanntes Designproblem ist.

---

**Hartmann, B., Abdulla, L., Mittal, M. & Klemmer, S. R. (2008). Authoring Sensor-Based Interactions by Demonstration with Direct Manipulation and Pattern Recognition. Proceedings of CHI '08.**

Optional. Thematisch am Rande relevant, aber nützlich wenn das Prototyp-Kapitel die Authoring-Perspektive (ein Tool, das Animationsmuster bereitstellt) wissenschaftlich verankern soll.

---

**Laban, R. & Lawrence, F. C. (1974). Effort: Economy in Body Movement. Plays Inc.**

Fortgeschrittene Ergänzung. Labans Bewegungsnotation (Effort/Shape) beschreibt Qualitäten von Bewegung wie Gewicht, Raum, Zeit und Fluss. Diese Kategorien lassen sich auf UI-Animationen übertragen und bieten eine alternative, nicht-semiotische Beschreibungsebene für die Bedeutungsdimension von Bewegung. Selektiv für die Diskussion einsetzen.

---

**Baecker, R. & Small, I. (1990). Animation at the Interface. In B. Laurel (Ed.), The Art of Human-Computer Interface Design. Addison-Wesley.**

Historische Primärquelle. Erste systematische Klassifikation von Animationsrollen im Interface. Baecker & Small ist der Ausgangspunkt, auf den Chevalier et al. (2016) explizit Bezug nehmen. Das Lesen beider Texte zusammen zeigt die Entwicklung des Forschungsfelds über 25 Jahre.

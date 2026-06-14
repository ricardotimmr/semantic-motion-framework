# Literaturübersicht und Quellenanalyse

---

## Vorbemerkung

Dieses Dokument wertet alle für das Projekt relevanten Quellen systematisch aus. Jede Quelle wird nach Relevanz eingestuft, inhaltlich beschrieben und in Bezug auf das Framework und den Editor verortet. Die Quellensammlung umfasst sowohl die initiale Recherche als auch ergänzte Quellen, die Lücken im theoretischen Rahmen schließen.

Die Quellen sind in vier Kategorien eingeteilt:

**Kernquellen** bilden das theoretische Rückgrat des Frameworks. Sie müssen vollständig gelesen und in der Arbeit explizit verarbeitet werden.

**Stützquellen** fundieren einzelne Argumentationsschritte. Sie werden selektiv eingesetzt, wo ein spezifisches Konzept belegt oder vertieft werden muss.

**Erweiterte Quellen** dienen der kritischen Diskussion, dem Related Work und dem historischen Kontext. Sie werden selektiv und nach Bedarf eingesetzt.

**Technische Quellen** sind Referenzwerke für die Implementierung des Prototyps. Sie sind keine zitierfähigen wissenschaftlichen Quellen für die Bachelorarbeit, aber notwendig für Architekturentscheidungen.

---

## 1. Kernquellen

### 1.1 Semiotik und Bedeutung

---

**Peirce, C. S. (1931–1958). Collected Papers. Harvard University Press.**  
Zugang: [https://plato.stanford.edu/entries/peirce-semiotics/](https://plato.stanford.edu/entries/peirce-semiotics/)

Relevanz: hoch

Peirce entwickelt das triadische Zeichenmodell mit den drei Zeichentypen Ikon, Index und Symbol. Dieser Klassifikationsrahmen ist die unmittelbare theoretische Grundlage des Mapping-Systems im Framework. Die Zuordnung von Animationsparametern zu Bedeutungsdimensionen folgt der Peirce'schen Logik: Eine horizontale Shake-Animation ist ein Index, weil sie eine assoziative Verbindung zur Ablehnungsbedeutung herstellt, keine willkürliche Konvention. Die Collected Papers sind als Primärquelle zu behandeln. Die Stanford Encyclopedia of Philosophy bietet einen kommentierten, zitierfähigen Zugang für den Einstieg.

Einsatz in der Arbeit: Theoriekapitel Semiotik; direkte Herleitung der Klassifikationslogik des Frameworks.

---

**Krippendorff, K. (2006). The Semantic Turn: A New Foundation for Design. CRC Press.**  
Zugang: [https://www.taylorfrancis.com/books/mono/10.1201/9780203299951/semantic-turn-klaus-krippendorff](https://www.taylorfrancis.com/books/mono/10.1201/9780203299951/semantic-turn-klaus-krippendorff)

Relevanz: hoch

Krippendorff argumentiert, dass Design grundsätzlich als Bedeutungssystem zu verstehen ist. Designer gestalten nicht Formen, sondern die Bedeutungen, die Nutzer in Artefakten konstruieren. Das ist der konzeptuelle Kern des Projekts: Animationen sind nicht dekorativ, sondern bedeutungstragend. Der Semantic Turn liefert die designtheoretische Rahmung, innerhalb derer das Framework überhaupt sinnvoll ist.

Einsatz in der Arbeit: Einleitung (Problemstellung und Forschungsinteresse); Theoriekapitel als konzeptueller Überbau.

---

**Norman, D. A. (2013). The Design of Everyday Things (revised edition). Basic Books.**  
Zugang: [https://www.jnd.org/books/the-design-of-everyday-things-revised-and-expanded-edition.html](https://www.jnd.org/books/the-design-of-everyday-things-revised-and-expanded-edition.html)

Relevanz: hoch

Norman etabliert die Konzepte Affordance und Signifier als zentrale Werkzeuge der Interaction-Design-Theorie. Signifiers sind wahrnehmbare Signale, die dem Nutzer kommunizieren, wie ein Objekt zu bedienen ist. Animationen funktionieren als dynamische Signifier: Sie zeigen nicht nur, dass etwas passiert ist, sondern kommunizieren, was es bedeutet. Die Verbindung von Normans Signifier-Begriff zu Peirces Zeichentypen ist für das Framework produktiv: Ein Signifier kann als Index im Peirce'schen Sinne kodiert werden.

Einsatz in der Arbeit: Theoriekapitel; Brücke zwischen Semiotik und Interaction Design.

---

### 1.2 Motion Design und UI-Animation

---

**Head, V. (2016). Designing Interface Animation. Rosenfeld Media.**  
Zugang: [https://rosenfeldmedia.com/books/designing-interface-animation/](https://rosenfeldmedia.com/books/designing-interface-animation/)

Relevanz: hoch

Das wichtigste praxisnahe Referenzwerk zu Animationen in Benutzeroberflächen. Head behandelt Feedback, Orientierung, Zustandswechsel und die Funktion von Bewegung als Kommunikationsmittel. Das Buch ist anwendungsorientiert und belegt, dass eine praxisnahe Klassifikation von UI-Animationen nach Bedeutung ein anerkanntes Ziel in der Community ist. Es ist die Hauptreferenz im Motion-Design-Bereich.

Einsatz in der Arbeit: Theoriekapitel Motion Design; Related Work; direkte Vergleichsbasis für das eigene Framework.

---

**Saffer, D. (2014). Microinteractions: Designing with Details. O'Reilly.**  
Zugang: [https://www.oreilly.com/library/view/microinteractions/9781491945912/](https://www.oreilly.com/library/view/microinteractions/9781491945912/)

Relevanz: hoch

Saffer beschreibt das Trigger-Rules-Feedback-Loops-Modell für kleinteilige Interaktionen. Mikrointeraktionen sind der unmittelbare Anwendungskontext des Frameworks: Button-Klicks, Toast-Benachrichtigungen, Toggle-Zustandswechsel. Das Modell liefert die strukturelle Beschreibungsebene, auf der Animationen als Feedback-Mechanismus eingeordnet werden.

Einsatz in der Arbeit: Theoriekapitel Microinteractions; Grundlage für die Komponentenauswahl (Button, Toggle, Toast, Modal).

---

**Material Design 3. Motion. Google.**  
Zugang: [https://m3.material.io/styles/motion/overview](https://m3.material.io/styles/motion/overview)

Relevanz: hoch

Das am weitesten verbreitete real existierende Motion-Framework. Material Design beschreibt Easing-Kurven, Duration-Token und Transition-Patterns in industrieller Skalierung. Es ist die wichtigste Vergleichsbasis für das Projekt: Das Semantic Motion Framework unterscheidet sich von Material Design durch die explizite Bedeutungsebene. Material Design beschreibt, wie etwas animiert wird; das Semantic Motion Framework begründet, warum. Keine wissenschaftliche Zitationsquelle, aber unverzichtbare Referenz für Related Work.

Einsatz in der Arbeit: Related Work; kritische Abgrenzung des eigenen Ansatzes.

---

### 1.3 Wahrnehmung und Aufmerksamkeit

---

**Treisman, A. & Gelade, G. (1980). A feature-integration theory of attention. Cognitive Psychology, 12(1), 97–136.**  
Zugang: [https://www.sciencedirect.com/science/article/pii/0010028580900055](https://www.sciencedirect.com/science/article/pii/0010028580900055)

Relevanz: hoch

Feature Integration Theory beschreibt, wie das menschliche Wahrnehmungssystem visuelle Merkmale präattentiv verarbeitet. Bewegung ist eines der stärksten präattentiven Merkmale: Sie wird vor bewusster Aufmerksamkeit registriert. Das erklärt, warum Animationen im Interface so wirksam für Aufmerksamkeitssteuerung sind, und liefert die kognitionspsychologische Grundlage für die Aufmerksamkeits-Dimension im Framework. Der Artikel ist ein Klassiker der Kognitionspsychologie mit hoher Zitierfähigkeit.

Einsatz in der Arbeit: Theoriekapitel Wahrnehmungspsychologie; Begründung der Aufmerksamkeits-Dimension im Framework.

---

**Ware, C. (2012). Information Visualization: Perception for Design (3rd ed.). Morgan Kaufmann.**  
Zugang: [https://www.elsevier.com/books/information-visualization/ware/978-0-12-381464-7](https://www.elsevier.com/books/information-visualization/ware/978-0-12-381464-7)

Relevanz: hoch

Ware verbindet Wahrnehmungspsychologie mit Designprinzipien systematisch. Das Buch behandelt präattentive Verarbeitung, die aufmerksamkeitssteuernde Wirkung von Bewegung und Direction Bias. Letzteres ist bei Ware direkt fundiert und für das Framework zentral: Die Richtung einer Animation trägt eigenständige Bedeutung. Das Buch ist zugleich die Primärquelle, die Bartram, Ware & Calvert (2003) theoretisch rahmt.

Einsatz in der Arbeit: Theoriekapitel Wahrnehmungspsychologie; Fundierung von Direction Bias und präattentiver Verarbeitung.

---

## 2. Stützquellen

### 2.1 Semiotik und visuelle Bedeutung

---

**Chandler, D. (2007). Semiotics: The Basics (2nd ed.). Routledge.**  
Zugang: [https://www.routledge.com/Semiotics-The-Basics/Chandler/p/book/9780415363761](https://www.routledge.com/Semiotics-The-Basics/Chandler/p/book/9780415363761)

Relevanz: mittel

Zugängliche Einführung in semiotische Grundbegriffe. Nützlich als didaktische Brücke, wenn Peirce direkt zu komplex einzuführen ist. Chandler erklärt Signifikant, Signifikat und Zeichentypen verständlich und kann als einführende Sekundärquelle zitiert werden.

---

**Eco, U. (1976). A Theory of Semiotics. Indiana University Press.**  
Zugang: [https://iupress.org/9780253202178/a-theory-of-semiotics/](https://iupress.org/9780253202178/a-theory-of-semiotics/)

Relevanz: mittel

Eco erweitert die Semiotik um den Begriff des Codes und der kulturellen Kodierung von Bedeutung. Relevant für das Framework, weil Animationsbedeutungen nicht universell, sondern kulturell kodiert sind. Selektiv für das Diskussionskapitel verwenden, wenn die Frage aufkommt, ob semantische Zuordnungen kulturübergreifend gelten.

---

**Ardjomandi, A. (2025). Visual Semiotics and User Perception in Digital Interface Design. IRE Journals, 8(10).**  
Zugang: [https://www.irejournals.com/formatedpaper/1707847.pdf](https://www.irejournals.com/formatedpaper/1707847.pdf)

Relevanz: niedrig bis mittel

Der Artikel untersucht semiotische Prinzipien in digitalen Interfaces empirisch mit einem Mixed-Methods-Ansatz und belegt, dass semiotische Gestaltungsprinzipien messbar auf Nutzerwahrnehmung wirken. Der thematische Fokus liegt auf Architektur-Interfaces, nicht auf UI-Animation. Zitierfähig, aber nicht zentral. Vor der Verwendung: Journalqualität von IRE Journals prüfen.

---

### 2.2 HCI und Interaction Design

---

**Rogers, Y., Sharp, H. & Preece, J. (2019). Interaction Design: Beyond Human-Computer Interaction (5th ed.). Wiley.**  
Zugang: [https://www.wiley.com/en-us/Interaction+Design%3A+Beyond+Human+Computer+Interaction-p-9781119547259](https://www.wiley.com/en-us/Interaction+Design%3A+Beyond+Human+Computer+Interaction-p-9781119547259)

Relevanz: mittel

Standardwerk der Interaction-Design-Ausbildung. Liefert konzeptuelle Grundlagen zu Feedback, Affordances, mentalen Modellen und Designprinzipien. Nützlich als Referenz, wenn grundlegende Konzepte eingeführt werden müssen.

---

**Shneiderman, B., Plaisant, C., Cohen, M. & Jacobs, S. (2016). Designing the User Interface (6th ed.). Pearson.**  
Zugang: [https://www.pearson.com/en-us/subject-catalog/p/designing-the-user-interface-strategies-for-effective-human-computer-interaction/P200000003091](https://www.pearson.com/en-us/subject-catalog/p/designing-the-user-interface-strategies-for-effective-human-computer-interaction/P200000003091)

Relevanz: niedrig

Breites Standardwerk zu UI-Design. Für das spezifische Thema Animation und Semantik weniger ergiebig als die anderen Quellen. Als Hintergrundreferenz für allgemeine UI-Designprinzipien verwendbar.

---

**Cooper, A., Reimann, R., Cronin, D. & Noessel, C. (2014). About Face: The Essentials of Interaction Design (4th ed.). Wiley.**  
Zugang: [https://www.wiley.com/en-us/About+Face%3A+The+Essentials+of+Interaction+Design%2C+4th+Edition-p-9781118766576](https://www.wiley.com/en-us/About+Face%3A+The+Essentials+of+Interaction+Design%2C+4th+Edition-p-9781118766576)

Relevanz: mittel

About Face behandelt ausführlich Verhaltensmuster von UI-Elementen und liefert konzeptuelle Werkzeuge für Zustandswechsel, Navigation und Feedback. Nützlich für die Verortung der vier Framework-Komponenten (Button, Toggle, Toast, Modal) in der IxD-Literatur.

---

### 2.3 Motion und Animationsforschung

---

**Bartram, L., Ware, C. & Calvert, T. (2003). Moticons: Detection, Distraction and Task. International Journal of Human-Computer Studies, 58(5), 515–545.**  
Zugang: [https://dl.acm.org/doi/10.1016/S1071-5819(03)00021-1](https://dl.acm.org/doi/10.1016/S1071-5819(03)00021-1)

Relevanz: hoch

Empirische Studie über den Einsatz von Bewegung als Kodierungskanal in informationsdichten Interfaces. Die Autoren zeigen, dass einfache Bewegungen als Notifikationsmechanismus wirksamer sind als Farb- und Formkodes, insbesondere im peripheren Sehen. Verschiedene Bewegungsattribute (Frequenz, Richtung, Typ) erzeugen unterschiedliche Wirkungen auf Detektion, Identifikation und Ablenkung. Direkt relevant für die Aufmerksamkeits-Dimension im Framework.

Einsatz in der Arbeit: Wahrnehmungspsychologie; empirische Fundierung der Aufmerksamkeitswirkung von Bewegung.

---

**Chevalier, F., Henry Riche, N., Plaisant, C., Chalbi, A. & Hurter, C. (2016). Animations 25 Years Later: New Roles and Opportunities. AVI '16, 280–287.**  
Zugang: [https://dl.acm.org/doi/10.1145/2909132.2909255](https://dl.acm.org/doi/10.1145/2909132.2909255)

Relevanz: mittel

Chevalier et al. revidieren Baecker & Smalls (1990) Klassifikation von Animationsrollen auf Basis aktueller Forschung und Interviews mit 20 Praktikern. Das erweiterte Rollenset (Orientierung, Lehren, UX-Verbesserung, Datenkodierung, visueller Diskurs) zeigt, dass Animationen multiple kommunikative Funktionen erfüllen können. Relevant für Related Work als Nachweis, dass die Forschungsgemeinschaft dieses Feld als offen bewertet.

---

**Tversky, B., Morrison, J. B. & Betrancourt, M. (2002). Animation: Can it Facilitate? International Journal of Human-Computer Studies, 57(4), 247–262.**  
Zugang: [https://www.sciencedirect.com/science/article/abs/pii/S1071581902910177](https://www.sciencedirect.com/science/article/abs/pii/S1071581902910177)

Relevanz: mittel

Kritische Überprüfung der Annahme, Animationen seien grundsätzlich lernförderlich. Tversky et al. zeigen, dass Animationen nur dann besser als statische Darstellungen sind, wenn sie dem Congruence Principle folgen: Inhalt und Format der Animation müssen dem dargestellten Konzept entsprechen. Das Semantic Motion Framework stellt genau diese Kongruenz her, indem es Animationsparameter semantisch begründet auswählt.

Einsatz in der Arbeit: Diskussionskapitel; theoretische Begründung des Congruence-Ansatzes.

---

**Heer, J. & Robertson, G. (2007). Animated Transitions in Statistical Data Graphics. IEEE Transactions on Visualization and Computer Graphics, 13(6), 1240–1247.**  
Zugang: [https://idl.uw.edu/papers/animated-transitions](https://idl.uw.edu/papers/animated-transitions)  
DOI: [10.1109/TVCG.2007.70539](https://doi.org/10.1109/TVCG.2007.70539)

Relevanz: mittel

Heer und Robertson analysieren systematisch, welche Animationstransitionen die Wahrnehmung verbessern, und entwickeln eine Taxonomie von Übergangstypen. Die Arbeit führt Staging und Easing als Gestaltungsvariablen ein und liefert empirische Hinweise darauf, warum bestimmte Easing-Kurven bei bestimmten Transformationen besser funktionieren. Direkt relevant für die Frage, ob Easing als semantischer Träger empirisch belegt werden kann.

Einsatz in der Arbeit: Theoriekapitel Easing und semantische Träger; Stützquelle für die Mapping-Logik.

---

**Chang, B.-W. & Ungar, D. (1993). Animation: From Cartoons to the User Interface. Proceedings of UIST '93, 45–55.**  
Zugang: [https://dl.acm.org/doi/10.1145/168642.168647](https://dl.acm.org/doi/10.1145/168642.168647)

Relevanz: mittel

Einer der frühesten Texte, der Animationsprinzipien aus der Filmproduktion auf UI-Design überträgt. Chang und Ungar argumentieren, dass Disney-Prinzipien (Slow In / Slow Out, Follow Through) UI-Interfaces verständlicher und nachvollziehbarer machen. Historisch wichtig als Grundlagentext, der zeigt, dass die Übertragung von Animationsprinzipien in die Interaktionsgestaltung ein erkanntes Designproblem ist. Das Paper gewann 2004 den UIST Lasting Impact Award.

Einsatz in der Arbeit: Historische Grundlage Motion Design; Ausgangspunkt für die Diskussion, welche Prinzipien auf UI-Animation übertragbar sind.

---

**Baecker, R. & Small, I. (1990). Animation at the Interface. In B. Laurel (Ed.), The Art of Human-Computer Interface Design (pp. 251–267). Addison-Wesley.**  
Zugang: Buchkapitel; Kontext über [https://ronbaecker.com/research/human-computer-interaction/](https://ronbaecker.com/research/human-computer-interaction/)

Relevanz: mittel

Erste systematische Klassifikation von Animationsrollen im Interface und historischer Ausgangspunkt, auf den Chevalier et al. (2016) 25 Jahre später explizit Bezug nehmen. Das Lesen beider Texte zusammen zeigt die Entwicklung des Forschungsfelds. Nicht direkt online verfügbar; über Bibliothek oder das Herausgeberband zugänglich.

---

### 2.4 Wahrnehmung und Aufmerksamkeit (vertiefend)

---

**Zacks, J. M. & Tversky, B. (2001). Event Structure in Perception and Conception. Psychological Bulletin, 127(1), 3–21.**  
Zugang: [https://pubmed.ncbi.nlm.nih.gov/11271755/](https://pubmed.ncbi.nlm.nih.gov/11271755/)  
DOI: [10.1037/0033-2909.127.1.3](https://doi.org/10.1037/0033-2909.127.1.3)

Relevanz: mittel

Zacks und Tversky beschreiben, wie Menschen kontinuierliche Ereignisse in diskrete Einheiten segmentieren. Ereignisse werden als geordnete Partonomien wahrgenommen, die Anfang, Mitte und Ende haben. Direkt relevant für die Wahrnehmung von Animationsphasen: Nutzer nehmen eine Animation nicht als kontinuierliche Kurve wahr, sondern als strukturierte Sequenz mit wahrnehmbaren Phasengrenzen. Relevant für die Begründung, warum Easing-Kurven semantisch unterschiedlich wahrgenommen werden.

Einsatz in der Arbeit: Theoriekapitel Wahrnehmungspsychologie; kognitive Grundlage für die Phasenstruktur von Animationen.

---

**Healey, C. G. & Enns, J. T. (2012). Attention and Visual Memory in Visualization and Computer Graphics. IEEE Transactions on Visualization and Computer Graphics, 18(7), 1170–1188.**  
Zugang: [https://ieeexplore.ieee.org/document/6183422](https://ieeexplore.ieee.org/document/6183422)

Relevanz: mittel

Systematische Übersicht über präattentive Merkmale und visuelle Aufmerksamkeit im Kontext von Informationsvisualisierung. Ergänzt Treisman & Gelade (1980) mit neueren Befunden und ist aktueller zitierfähig. Nützlich für eine breitere Fundierung der Aufmerksamkeits-Dimension.

---

**Itti, L. & Koch, C. (2001). Computational Modelling of Visual Attention. Nature Reviews Neuroscience, 2(3), 194–203.**  
Zugang: [https://www.nature.com/articles/35058500](https://www.nature.com/articles/35058500)

Relevanz: niedrig

Computational Model of Visual Attention auf neurowissenschaftlicher Basis. Für das Projekt zu tief in der Neurobiologie angesiedelt. Kann am Rande zitiert werden, wenn die biologische Grundlage präattentiver Verarbeitung kurz belegt werden soll.

---

### 2.5 Microinteractions und UX

---

**Kolte, A. & Rao, P. (2024). Microinteractions in HCI. Springer.**  
Zugang: [https://link.springer.com](https://link.springer.com)

Relevanz: mittel

Aktuellere wissenschaftliche Behandlung von Mikrointeraktionen im HCI-Kontext. Ergänzt Saffer (2014) mit neueren Perspektiven und belegt die anhaltende Relevanz des Themas in der Forschung.

---

**Manchinella, S. (2024). Impact of Microinteractions on User Experience. ResearchGate.**  
Zugang: [https://www.researchgate.net](https://www.researchgate.net)

Relevanz: niedrig bis mittel

Peer-Review-Status vor Verwendung prüfen. Kann für empirische Belege zur UX-Wirkung von Mikrointeraktionen nützlich sein, sofern die Publikationsqualität bestätigt wird.

---

**Nielsen Norman Group. Microinteractions in UX.**  
Zugang: [https://www.nngroup.com/articles/microinteractions/](https://www.nngroup.com/articles/microinteractions/)

Relevanz: niedrig

Praxisorientierter Artikel, nicht als wissenschaftliche Quelle zitierfähig. Nützlich als Nachweis, dass das Thema in der professionellen Community präsent ist. Nur im einleitenden Kontext verwenden.

---

### 2.6 Cognitive Load und Verarbeitung

---

**Sweller, J. (1988). Cognitive load during problem solving: Effects on learning. Cognitive Science, 12(2), 257–285.**  
Zugang: [https://onlinelibrary.wiley.com/doi/abs/10.1207/s15516709cog1202_4](https://onlinelibrary.wiley.com/doi/abs/10.1207/s15516709cog1202_4)

Relevanz: mittel

Grundlagentext zur Cognitive Load Theory. Relevant für das Framework, weil bedeutungskongruente Animationen den kognitiven Aufwand der Bedeutungsverarbeitung reduzieren. Semantisch inkonsistente Animationen erhöhen ihn. Selektiv für das Diskussionskapitel verwenden.

---

**Sweller, J., van Merrienboer, J. & Paas, F. (1998). Cognitive Architecture and Instructional Design. Educational Psychology Review, 10(3), 251–296.**  
Zugang: [https://link.springer.com/article/10.1023/A:1022193728205](https://link.springer.com/article/10.1023/A:1022193728205)

Relevanz: niedrig bis mittel

Erweiterung der Cognitive Load Theory auf Instruktionsdesign. Weniger direkt relevant als Sweller (1988). Optional.

---

**Mayer, R. E. (2009). Multimedia Learning (2nd ed.). Cambridge University Press.**  
Zugang: [https://www.cambridge.org/core/books/multimedia-learning/1826616CC451F3C44352200B9CE2F20A](https://www.cambridge.org/core/books/multimedia-learning/1826616CC451F3C44352200B9CE2F20A)

Relevanz: mittel

Mayers Cognitive Theory of Multimedia Learning beschreibt, wie Text, Bild und Bewegung in der Verarbeitung interagieren. Das Kongruenzprinzip aus Mayers Forschung ist für die Begründung relevant, warum Animationen bedeutungskongruent gestaltet sein sollten. Selektiv verwendbar.

---

## 3. Erweiterte Quellen

### 3.1 Motion-Theorie und Kritik

---

**Willenskomer, I. (2015). Disney is Dead. Medium / UX in Motion.**  
Zugang: [https://medium.com/ux-in-motion/ui-animation-principles-disney-is-dead-8bf6c66207f9](https://medium.com/ux-in-motion/ui-animation-principles-disney-is-dead-8bf6c66207f9)

Relevanz: mittel

Willenskomer argumentiert, dass die direkte Übertragung der Disney-Animationsprinzipien auf UI-Animation problematisch ist, weil deren Ursprung in der kinetischen Physik von Zeichentrickfiguren liegt, nicht in der Bedeutungslogik von Interfaces. Diese kritische Position ist für das Diskussionskapitel wichtig: Das Framework muss begründen, welche Disney-Prinzipien es übernimmt, welche es modifiziert und warum. Als Medium-Artikel nicht als wissenschaftliche Quelle zitierfähig, aber für die Problemstellung relevant.

---

**Thomas, F. & Johnston, O. (1981). The Illusion of Life: Disney Animation. Abbeville Press.**  
Zugang: [https://www.abbeville.com/products/the-illusion-of-life](https://www.abbeville.com/products/the-illusion-of-life)

Relevanz: mittel

Die Originalquelle der 12 Disney-Animationsprinzipien (Squash and Stretch, Anticipation, Timing, Follow Through u.a.). Historische Primärquelle und Ausgangspunkt der Willenskomer-Kritik. Für das Framework relevant für Prinzipien wie Ease In / Ease Out, Anticipation und Follow Through als semantische Träger.

---

### 3.2 Animationswirkung

---

**Robertson, G., Fernandez, R., Fisher, D., Lee, B. & Stasko, J. (2008). Effectiveness of Animation in Trend Visualization. IEEE Transactions on Visualization and Computer Graphics, 14(6), 1325–1332.**  
Zugang: [https://ieeexplore.ieee.org/document/4658170](https://ieeexplore.ieee.org/document/4658170)

Relevanz: niedrig bis mittel

Empirische Untersuchung der Wirksamkeit von Animation gegenüber statischen Darstellungen. Ergebnis: Animation ist langsamer und weniger genau als alternative Darstellungsformen. Nützlich als kritische Gegenperspektive im Diskussionskapitel. Der Kontext (Datenvisualisierung statt UI-Feedback) ist bei der Verwendung zu beachten.

---

**Bederson, B. B. & Boltman, A. (1999). Does animation help users navigate the web? Proceedings of IEEE Symposium on Information Visualization, 174–181.**  
Zugang: [https://dl.acm.org/doi/10.5555/857280.858011](https://dl.acm.org/doi/10.5555/857280.858011)

Relevanz: niedrig

Ältere empirische Studie zu Navigation und Animation. Historisch interessant, durch neuere Studien weitgehend ersetzt. Optional.

---

### 3.3 Design Systems als Vergleich

---

**Apple Human Interface Guidelines. Motion.**  
Zugang: [https://developer.apple.com/design/human-interface-guidelines/motion](https://developer.apple.com/design/human-interface-guidelines/motion)

Relevanz: mittel

Apples Motion-Guidelines beschreiben Prinzipien wie Responsiveness, Fluidity und kontinuierliche Bewegung als Feedbacksignal. Gute Vergleichsbasis neben Material Design. Keine wissenschaftliche Zitationsquelle.

---

**IBM Carbon Design System. Motion.**  
Zugang: [https://carbondesignsystem.com/guidelines/motion/overview/](https://carbondesignsystem.com/guidelines/motion/overview/)

Relevanz: mittel

Carbon unterscheidet explizit zwischen produktiver und expressiver Motion. Das kommt dem Semantic-Motion-Ansatz konzeptuell näher als Material Design oder Apple HIG und ist das stärkste Related-Work-Beispiel aus bestehenden Designsystemen. Keine wissenschaftliche Zitationsquelle.

---

**Microsoft Fluent Design System. Motion.**  
Zugang: [https://learn.microsoft.com/en-us/windows/apps/design/motion/](https://learn.microsoft.com/en-us/windows/apps/design/motion/)

Relevanz: niedrig bis mittel

Dritte große Motion-Referenz aus der Industrie. Weniger konzeptuell ausgearbeitet als Carbon. Für eine vollständige Related-Work-Übersicht nützlich. Keine wissenschaftliche Zitationsquelle.

---

### 3.4 Accessibility

---

**W3C. WCAG 2.1. Success Criterion 2.3.3: Animation from Interactions.**  
Zugang: [https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html)

Relevanz: mittel

WCAG 2.1 schreibt vor, dass Bewegungsanimationen aus Interaktionen abgeschaltet werden können müssen, sofern sie nicht funktional essenziell sind. Das ist eine direkte Anforderung an das Framework: Alle semantischen Animationen müssen so gestaltet sein, dass sie bei aktivierter `prefers-reduced-motion` Media Query entweder entfallen oder durch statische Alternativen ersetzt werden.

Einsatz in der Arbeit: Anforderungsanalyse; Diskussionskapitel Einschränkungen.

---

**Smashing Magazine (2023). Creating Accessible UI Animations.**  
Zugang: [https://www.smashingmagazine.com/2023/11/creating-accessible-ui-animations/](https://www.smashingmagazine.com/2023/11/creating-accessible-ui-animations/)

Relevanz: niedrig

Praxisorientierter Artikel. Nützlich für technische Umsetzungshinweise, aber nicht als wissenschaftliche Quelle zitierfähig.

---

### 3.5 UX und Experience

---

**Hassenzahl, M. (2010). Experience Design: Technology for All the Right Reasons. Morgan & Claypool.**  
Zugang: [https://doi.org/10.2200/S00261ED1V01Y201003HCI008](https://doi.org/10.2200/S00261ED1V01Y201003HCI008)

Relevanz: niedrig bis mittel

Hassenzahl unterscheidet pragmatische und hedonische Qualität in User Experience. Animationen können zur hedonischen Qualität beitragen. Selektiv verwendbar für die Einordnung des emotionalen Ausdrucks von Bewegung.

---

## 4. Technische Quellen

Diese Quellen werden für die Implementierung des Prototyps benötigt. Sie sind keine zitierfähigen wissenschaftlichen Quellen für die Bachelorarbeit, werden aber im Implementierungskapitel für Architekturentscheidungen referenziert.

---

**Framer Motion. Dokumentation.**  
Zugang: [https://www.framer.com/motion/](https://www.framer.com/motion/)

Primäre technische Referenz für die Implementierung aller Animationen im Editor.

---

**W3C. Web Animations API.**  
Zugang: [https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API)

Technische Spezifikation. Relevant für die CSS-Export-Funktion und als Grundlage für das Verständnis, wie Browser Animationen rendern.

---

**React. Dokumentation.**  
Zugang: [https://react.dev](https://react.dev)

Referenz für die Komponentenarchitektur des Editors.

# Gliederung-v1

---

## 1 Einleitung

### 1.1 Problemstellung
Animationen in digitalen Benutzeroberflächen werden in der Praxis überwiegend intuitiv oder nach ästhetischen Gesichtspunkten eingesetzt. Ein theoretisch fundiertes System, das Animationsparameter systematisch auf Bedeutungsdimensionen abbildet, fehlt in der bestehenden Designpraxis weitgehend.

### 1.2 Forschungsfrage
Wie lässt sich ein framework-basiertes Klassifikationssystem entwickeln, das UI-Animationen semantisch begründet und für Designer und Entwickler operationalisierbar macht?

### 1.3 Zielsetzung und Beitrag der Arbeit
Entwicklung des Semantic Motion Frameworks und eines prototypischen Editors als Demonstration des Frameworks.

### 1.4 Abgrenzung
Keine empirische Validierung durch Nutzerstudien. Der Prototyp ist ein Demonstrationsartefakt, kein produktionsreifes Tool.

### 1.5 Aufbau der Arbeit

---

## 2 Theoretische Grundlagen

### 2.1 Semiotik als Grundlage des Frameworks

#### 2.1.1 Grundbegriffe der Semiotik
Saussure: Signifikant und Signifikat. Peirce: triadisches Zeichenmodell.

#### 2.1.2 Die Peirce'schen Zeichentypen im UI-Kontext
Ikon, Index und Symbol als Klassifikationsrahmen für Animationen. Konkrete Beispiele: Fade als Ikon (Verschwinden), Shake als Index (Ablehnung), Spinner als Symbol (Konvention für Laden).

#### 2.1.3 Design als Bedeutungssystem
Krippendorffs Semantic Turn als konzeptueller Rahmen. Normans Signifier-Begriff als Verbindung zur Interaktionsgestaltung.

### 2.2 Wahrnehmungspsychologie

#### 2.2.1 Präattentive Verarbeitung
Treisman & Gelade: Feature Integration Theory. Bewegung als präattentives Merkmal.

#### 2.2.2 Direction Bias
Richtungswahrnehmung als bedeutungstragender Parameter. Horizontale und vertikale Richtungskonventionen.

#### 2.2.3 Object Continuity und Ereignisstruktur
Wahrnehmung von Animationsphasen als strukturierte Ereignisse. Zacks & Tversky: Ereignissegmentierung.

#### 2.2.4 Aufmerksamkeit und Ablenkung
Bartram, Ware & Calvert: Bewegung als Kodierungskanal. Unterschiede zwischen Bewegungstypen in Detektion und Ablenkungswirkung.

### 2.3 Motion Design Prinzipien

#### 2.3.1 Die Disney-Prinzipien als Ausgangspunkt
Thomas & Johnston: Slow In / Slow Out, Anticipation, Follow Through, Timing. Historische Übertragung auf UI-Design (Chang & Ungar 1993).

#### 2.3.2 Easing als semantischer Träger
Ease-Out, Ease-In und Ease-In-Out als bedeutungstragende Parameter. Heer & Robertson: empirische Grundlagen zu Easing-Wirkung.

#### 2.3.3 Grenzen der direkten Übertragung
Willenskomer: Kritik an der Disney-Analogie im UI-Kontext. Welche Prinzipien sind übertragbar, welche nicht.

### 2.4 Microinteractions und UI-Animation

#### 2.4.1 Microinteractions als Anwendungskontext
Saffer: Trigger-Rules-Feedback-Loops. Animationen als Feedback-Mechanismus.

#### 2.4.2 Kommunikative Funktionen von UI-Animationen
Baecker & Small (1990) und Chevalier et al. (2016): Klassifikation von Animationsrollen über 25 Jahre. Feedback, Orientierung, Zustandswechsel, Aufmerksamkeit.

#### 2.4.3 Bestehende Motion-Systeme
Material Design, IBM Carbon, Apple HIG als Vergleichsbasis. Gemeinsamkeit: Sie beschreiben Wie, nicht Warum.

---

## 3 Das Semantic Motion Framework

### 3.1 Konzeptionelle Grundlagen

#### 3.1.1 Herleitung aus dem theoretischen Rahmen
Wie Semiotik, Wahrnehmungspsychologie und Motion-Design-Prinzipien zusammen das Framework begründen.

#### 3.1.2 Das Congruence-Prinzip als Designprinzip
Tversky et al.: Animationen sind nur dann sinnvoll, wenn Inhalt und Format dem dargestellten Konzept entsprechen. Das Framework stellt diese Kongruenz systematisch her.

### 3.2 Die Bedeutungsdimensionen

#### 3.2.1 Feedback
Subkategorien: Success, Error, Warning. Mapping-Logik je Subkategorie.

#### 3.2.2 State Change
Zustandswechsel ohne Richtungskonnotation. Differenzierung zu Direction.

#### 3.2.3 Direction
Forward und Backward als Bedeutungsträger. Kulturelle und kognitive Grundlage.

#### 3.2.4 Hierarchie und Priorität
Visuelle Gewichtung durch Animationsparameter.

#### 3.2.5 Aufmerksamkeit
Gezielte Lenkung der Nutzeraufmerksamkeit. Abgrenzung zu ungewollter Ablenkung.

### 3.3 Die Mapping-Datenbank

#### 3.3.1 Animationsparameter als Kodierungsebene
Easing, Duration, Direction, Amplitude als Parameter. Herleitung aus dem theoretischen Rahmen.

#### 3.3.2 Datenstruktur
TypeScript-Typen und Schema. Aufbau eines Mapping-Eintrags.

#### 3.3.3 Wissenschaftliche Nachvollziehbarkeit der Zuordnungen
Jeder Eintrag ist auf eine Quelle aus dem theoretischen Rahmen zurückführbar. Keine willkürlichen Zuordnungen.

### 3.4 Die vier UI-Komponenten

#### 3.4.1 Button
Bedeutungsdimensionen und zugehörige Patterns.

#### 3.4.2 Toggle
Bedeutungsdimensionen und zugehörige Patterns.

#### 3.4.3 Toast
Bedeutungsdimensionen und zugehörige Patterns.

#### 3.4.4 Modal
Bedeutungsdimensionen und zugehörige Patterns.

### 3.5 Abgrenzung des Frameworks
Scope-Begrenzung: Was das Framework explizit nicht leistet. Keine Nutzerstudie, keine kulturelle Universalität, keine Vollständigkeit.

---

## 4 Prototyp: Semantic Motion Editor

### 4.1 Zielsetzung des Prototyps
Der Editor als Demonstration, nicht als Produkt. Verhältnis von Framework und Prototyp.

### 4.2 Anforderungen
Zusammenfassung der funktionalen und nicht-funktionalen Anforderungen aus der Anforderungsanalyse. Verweis auf /docs/anforderungen.md.

### 4.3 Technische Architektur

#### 4.3.1 Tech-Stack und Begründung
React, TypeScript, Framer Motion. Warum diese Entscheidungen.

#### 4.3.2 Komponentenarchitektur
Struktur des Editors: Auswahl, Preview, Begründung, Export.

#### 4.3.3 Integration der Mapping-Datenbank
Wie das Framework als Datenstruktur im Editor operiert.

### 4.4 Implementierung der Kernfunktionen

#### 4.4.1 Komponentenauswahl und Pattern-Auswahl (FA-01, FA-02)

#### 4.4.2 Echtzeit-Animationsvorschau (FA-03)

#### 4.4.3 Semantische Begründung (FA-04)

#### 4.4.4 Code-Export (FA-05, FA-06)

### 4.5 Deployment
Live-Demo URL. Technische Voraussetzungen.

---

## 5 Diskussion

### 5.1 Beitrag des Frameworks
Was das Semantic Motion Framework gegenüber bestehenden Systemen leistet. Worin der wissenschaftliche Beitrag besteht.

### 5.2 Einschränkungen

#### 5.2.1 Fehlende empirische Validierung
Warum keine Nutzerstudie durchgeführt wurde. Was das für die Aussagekraft bedeutet.

#### 5.2.2 Kulturelle Kodierung
Animationsbedeutungen sind nicht universell. Eco: kulturelle Konventionalität von Bedeutung.

#### 5.2.3 Accessibility
WCAG 2.1 und prefers-reduced-motion als offene Anforderung.

#### 5.2.4 Scope-Begrenzung des Prototyps
Vier Komponenten, fünf Bedeutungsdimensionen. Was bewusst ausgelassen wurde.

### 5.3 Ausblick

#### 5.3.1 Empirische Validierung
Welche Nutzerstudie sinnvoll wäre. Methoden und Fragestellungen.

#### 5.3.2 Erweiterung des Frameworks
Weitere Komponenten und Bedeutungsdimensionen. Erweiterbarkeit der Mapping-Datenbank.

#### 5.3.3 Integration in Design-Systeme
Wie das Framework als Grundlage für Motion-Token in einem bestehenden Design-System dienen könnte.

---

## 6 Fazit

Zusammenfassung der Ergebnisse. Beantwortung der Forschungsfrage. Einordnung des Beitrags.

---

## Literaturverzeichnis

---

## Anhang

### A Vollständige Mapping-Tabelle
Alle Einträge der Mapping-Datenbank mit Quellenangaben.

### B Anforderungsanalyse
Verweis auf /docs/anforderungen.md.

### C Stakeholder-Analyse
Verweis auf /docs/stakeholder-analyse.md.

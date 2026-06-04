# Gliederung-v2

---

## 1 Einleitung

### 1.1 Problemstellung
Animationen in digitalen Benutzeroberflächen werden in der Praxis überwiegend intuitiv oder nach ästhetischen Gesichtspunkten eingesetzt. Ein theoretisch fundiertes System, das Animationsparameter systematisch auf Bedeutungsdimensionen abbildet, fehlt in der bestehenden Designpraxis weitgehend.

### 1.2 Forschungsfrage
**FF1:** Wie lässt sich ein framework-basiertes Klassifikationssystem entwickeln, das UI-Animationen anhand semiotischer und wahrnehmungspsychologischer Prinzipien systematisch auf Bedeutungsdimensionen abbildet?

**FF2:** Inwiefern lässt sich ein solches Framework in einem browserbasierten Editor operationalisieren, der Designern und Entwicklern semantisch begründete Animationsentscheidungen ohne Fachkenntnis in Semiotik zugänglich macht?

### 1.3 Zielsetzung und Beitrag der Arbeit
Entwicklung des Semantic Motion Frameworks und eines prototypischen Editors als Demonstration des Frameworks.

### 1.4 Abgrenzung
Keine empirische Validierung durch Nutzerstudien. Der Prototyp ist ein Demonstrationsartefakt, kein produktionsreifes Tool.

### 1.5 Aufbau der Arbeit

---

## 2 Theoretische Grundlagen

### 2.1 Semiotik als Grundlage des Frameworks

#### 2.1.1 Peirce'sche Zeichentypen im UI-Kontext
Saussures dyadisches Modell als kurze Kontrastfolie. Peirces triadisches Zeichenmodell (Repräsentamen, Objekt, Interpretant) als Hauptrahmen. Die Trichotomie Ikon, Index, Symbol mit konkreten Animationsbeispielen: Fade als Ikon (Verschwinden), Shake als Index (Ablehnung), Spinner als Symbol (Konvention für Laden). Einschränkung: Zeichentypen als Spektrum, nicht als strenge Kategorien.

#### 2.1.2 Design als Bedeutungssystem
Krippendorffs Semantic Turn: Designer gestalten Bedeutungsangebote, nicht Formen. Normans Signifier-Begriff als Verbindung zur Interaktionsgestaltung: Animationen als dynamische Signifier. Übersetzungslogik Peirce → Norman als operative Verbindung zwischen Theorie und Framework.

### 2.2 Wahrnehmungspsychologie

#### 2.2.1 Präattentive Verarbeitung und Aufmerksamkeit
Treisman & Gelade: Feature Integration Theory. Bewegung als präattentives Merkmal. Bartram, Ware & Calvert: Verschiedene Bewegungsattribute erzeugen unterschiedliche Wirkungen auf Detektion und Ablenkung. Konsequenz: Animationsparameter steuern Aufmerksamkeit vor bewusster Wahrnehmung.

#### 2.2.2 Direction Bias und Ereignisstruktur
Direction Bias: Horizontale und vertikale Richtungskonventionen als bedeutungstragende Parameter. Kulturelle und physikalische Grundlage. Zacks & Tversky: Ereignissegmentierung erklärt, warum Easing-Phasen (Anfang, Mitte, Ende) semantisch unterschiedlich wahrgenommen werden.

### 2.3 Motion Design Prinzipien

#### 2.3.1 Disney-Prinzipien und die Grenzen ihrer Übertragung
Thomas & Johnston: Slow In / Slow Out, Anticipation, Follow Through, Timing als wahrnehmungspsychologisch fundierte Prinzipien. Chang & Ungar (1993): historische Übertragung auf UI-Design. Willenskomers Kritik: Disney-Prinzipien sind für kinetische Physik entwickelt, nicht für Bedeutungslogik von Interfaces. Konsequenz für das Framework: selektive Übernahme mit semiotischer Fundierung statt direkter Analogie.

#### 2.3.2 Easing als semantischer Träger
Ease-Out, Ease-In und Ease-In-Out als bedeutungstragende Parameter. Heer & Robertson: empirische Grundlage dafür, dass Easing-Kurven messbar unterschiedliche Wahrnehmungsqualitäten erzeugen. Verbindung zu Zacks & Tversky: Easing entspricht der natürlichen Ereignisstruktur (Aufbau, Höhepunkt, Abklingen).

### 2.4 Microinteractions und bestehende Motion-Systeme

#### 2.4.1 Microinteractions als Anwendungskontext
Saffer: Trigger-Rules-Feedback-Loops. Animationen als Feedback-Mechanismus. Chevalier et al. (2016) und Baecker & Small (1990): Entwicklung der Klassifikation von Animationsrollen über 25 Jahre als Nachweis, dass das Forschungsfeld offen ist.

#### 2.4.2 Bestehende Motion-Systeme als Vergleichsbasis
Material Design 3, IBM Carbon (produktive vs. expressive Motion), Apple HIG: Sie beschreiben das *Wie* von Animationen, nicht das *Warum*. Das ist die zentrale Lücke, die das Semantic Motion Framework schließt.

---

## 3 Das Semantic Motion Framework

### 3.1 Konzeptionelle Grundlagen
Herleitung aus dem theoretischen Rahmen: Semiotik (Bedeutungsbeziehung), Wahrnehmungspsychologie (Wahrnehmungswirkung) und Motion-Prinzipien (Gestaltungsparameter) als drei komplementäre Ebenen. Tversky et al.: Congruence-Prinzip als Designprinzip des Frameworks — Animationsparameter werden semantisch kongruent gewählt, nicht ästhetisch.

### 3.2 Die fünf Bedeutungsdimensionen
Feedback (Success, Error, Warning), State Change, Direction (Forward, Backward), Hierarchie und Priorität, Aufmerksamkeit. Für jede Dimension: Kurzdefinition, zugehörige Peirce-Klassifikation, Differenzierung zu benachbarten Dimensionen. Abgrenzung zwischen Direction und State Change als exemplarische Trennschärfe-Diskussion.

### 3.3 Die Mapping-Datenbank
Animationsparameter als Kodierungsebene: Easing, Duration, Direction, Amplitude. Herleitung jedes Parameters aus dem theoretischen Rahmen. Datenstruktur: TypeScript-Typen und Schema. Zwei Textebenen je Eintrag: nutzergerichteter Begründungstext (Norman-Sprache) als Standardanzeige und wissenschaftliche Detailbegründung (Peirce-Zeichentyp, Wahrnehmungsgrundlage, Quellen) als optionale Detailansicht. Wissenschaftliche Nachvollziehbarkeit: Keine Zuordnung ohne Quellenverankerung.

### 3.4 Die sieben UI-Komponenten
Auswahlprinzip: Button, Toggle, Toast und Modal decken zentrale Interaktionskategorien ab (Aktion, Zustand, Benachrichtigung, Fokusunterbrechung). Card ergänzt die Hierarchie-Dimension um ein sichtbares Zurücktreten innerhalb eines Layouts, das beim Modal aus UX-Gründen nicht sauber darstellbar ist. Input ergänzt Validierungs- und Fokuszustände während laufender Eingabe. Der Skeleton Loader ergänzt den Symbol-Typ der Peirce-Trichotomie, der in den anderen Komponenten nicht dominant vertreten ist — seine Shimmer-Animation hat keine ikonische oder indexikalische Grundlage, sondern ist reine Konvention. Damit wird die vollständige Trichotomie (Ikon, Index, Symbol) in der praktischen Demonstration des Frameworks abgedeckt. Tabellarische Darstellung: je Komponente relevante Bedeutungsdimensionen und ein exemplarisches Mapping mit Parameterwerten.

### 3.5 Scope-Abgrenzung
Was das Framework explizit nicht leistet: keine empirische Validierung, keine kulturelle Universalität, keine Vollständigkeit der Komponentenabdeckung.

---

## 4 Prototyp: Semantic Motion Editor

### 4.1 Zielsetzung des Prototyps
Der Editor als Demonstration des Frameworks, nicht als Produkt. Verhältnis von Framework (Theorie) und Prototyp (Operationalisierung). Zugänglichkeit als Designziel: Die Übersetzungslogik Peirce → Norman → Editor-Sprache macht semantisch begründete Entscheidungen ohne Semiotik-Kenntnisse nutzbar (Bezug zu FF2).

### 4.2 Anforderungen
Zusammenfassung der funktionalen und nicht-funktionalen Anforderungen. Verweis auf Anhang B.

### 4.3 Technische Architektur
React, TypeScript, Framer Motion als Tech-Stack mit Begründung. Komponentenarchitektur: Auswahl, Preview, Begründung, Export. Integration der Mapping-Datenbank als operative Umsetzung des Frameworks.

### 4.4 Implementierung der Kernfunktionen
Komponentenauswahl und semantische Mapping-Auswahl (FA-01, FA-02). Echtzeit-Animationsvorschau (FA-03). Semantische Begründung im Editor: Wie die Norman-Sprache als Übersetzungsschicht funktioniert (FA-04). Code-Export als Framer Motion oder CSS (FA-05, FA-06).

### 4.5 Deployment
Live-Demo URL. Technische Voraussetzungen.

---

## 5 Diskussion

### 5.1 Beitrag des Frameworks
Was das Semantic Motion Framework gegenüber bestehenden Systemen (Material Design, Carbon, Apple HIG) leistet. Worin der wissenschaftliche Beitrag besteht: theoretische Herleitung des *Warum* hinter Animationsentscheidungen.

### 5.2 Einschränkungen

#### 5.2.1 Fehlende empirische Validierung
Warum keine Nutzerstudie durchgeführt wurde. Was das für die Aussagekraft bedeutet. Congruence-Prinzip (Tversky et al.) als theoretischer Anker für den Gültigkeitsanspruch ohne Empirie.

#### 5.2.2 Kulturelle Kodierung
Animationsbedeutungen sind nicht universell. Eco: kulturelle Konventionalität von Bedeutung. Direction Bias als kulturspezifisches Beispiel.

#### 5.2.3 Accessibility
WCAG 2.1 SC 2.3.3 und `prefers-reduced-motion` als offene Anforderung an das Framework.

#### 5.2.4 Scope-Begrenzung des Prototyps
Sieben Komponenten, fünf Bedeutungsdimensionen. Was bewusst ausgelassen wurde und warum.

### 5.3 Ausblick

#### 5.3.1 Empirische Validierung
Welche Nutzerstudie sinnvoll wäre. Methoden und Fragestellungen.

#### 5.3.2 Erweiterung des Frameworks
Weitere Komponenten und Bedeutungsdimensionen. Erweiterbarkeit der Mapping-Datenbank.

#### 5.3.3 Integration in Design-Systeme
Wie das Framework als Grundlage für Motion-Token in einem bestehenden Design-System dienen könnte.

---

## 6 Fazit
Zusammenfassung der Ergebnisse. Beantwortung beider Forschungsfragen. Einordnung des Beitrags in den Forschungskontext.

---

## Literaturverzeichnis

---

## Anhang

### A Vollständige Mapping-Tabelle
Alle Einträge der Mapping-Datenbank mit Quellenangaben und Peirce-Klassifikation.

### B Anforderungsanalyse
Verweis auf /docs/anforderungen.md.

### C Stakeholder-Analyse
Verweis auf /docs/stakeholder-analyse.md.

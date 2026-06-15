# Gliederung: Semantic Motion in Web UIs

Status: Kapitel 2-4 vollständig ausgearbeitet, Kapitel 1, 5, 6 als Stichpunktstruktur angelegt.

## 1 Einleitung
*(Stichpunkte, noch nicht ausformuliert)*

### 1.1 Problemstellung
Ausgangsbeobachtung zur Praxis von UI-Animationen und Abgrenzung zu bestehenden Motion-Systemen als Herleitung der Forschungslücke.

### 1.2 Forschungsfragen
FF1 (theoretisches Klassifikationssystem) und FF2 (Operationalisierung im Editor) sowie deren Zusammenhang.

### 1.3 Zielsetzung und Beitrag der Arbeit
Die zwei Artefakte der Arbeit (Framework und Editor-Prototyp) und der wissenschaftliche Beitrag in einem Satz.

### 1.4 Abgrenzung
Keine empirische Validierung, kulturelle Kontextualisierung und der Scope von sechs Komponenten und fünf Bedeutungsdimensionen.

### 1.5 Aufbau der Arbeit
Kurzer Fahrplan durch Kapitel 2-6 mit Hinweis darauf, dass Kapitel 3 und 4 als Einheit aus Theorie und Operationalisierung konzipiert sind.

---

## 2 Theoretische Grundlagen
*(vollständig ausgearbeitet)*

### 2.1 Semiotik als Grundlage des Frameworks
Peirces Trichotomie von Ikon, Index und Symbol als Klassifikationsgrundlage, abgegrenzt von Saussures dyadischem Modell, sowie Normans Signifier-Begriff als Übersetzungslogik.

### 2.2 Wahrnehmungspsychologie
Treismans Feature Integration Theory als Grundlage präattentiver Verarbeitung und Bartrams Befunde zu Bewegung als Aufmerksamkeitskanal, ergänzt um Direction Bias und Ereignisstruktur nach Zacks und Tversky.

### 2.3 Motion-Design-Prinzipien
Selektive Übertragung der Disney-Animationsprinzipien auf Interface-Elemente sowie Easing als wahrnehmungspsychologisch fundierter semantischer Parameter.

### 2.4 Microinteractions und bestehende Motion-Systeme
Saffers Microinteractions-Modell als Anwendungskontext und Abgrenzung zu Material Design, Carbon und Apple HIG, die das Wie, aber nicht das Warum von Animationen begründen.

### 2.5 Zusammenfassung: Das theoretische Dreieck
Das Congruence Principle als verbindendes Prinzip der drei Theoriestränge.

---

## 3 Das Semantic Motion Framework
*(vollständig ausgearbeitet)*

### 3.1 Konzeptionelle Grundlagen
Verbindung der drei Theoriestränge zu einem operationalen Klassifikationssystem auf Basis des Congruence Principle.

### 3.2 Die fünf Bedeutungsdimensionen
Feedback, State Change, Direction, Hierarchie und Aufmerksamkeit als kommunikative Kategorien mit jeweiliger Peirce-Zuordnung und Datenmodell-Verweis.

### 3.3 Die Mapping-Datenbank
Animationsparameter als Kodierungsebene, Datenstruktur der Mapping-Einträge, wissenschaftliche Nachvollziehbarkeit und der semantische Möglichkeitsraum als Reflexionsebene.

### 3.4 Die sechs UI-Komponenten
Button, Toggle, Toast, Modal, Input Field und Skeleton Loader als Demonstration der vollständigen Peirce-Trichotomie.

### 3.5 Scope-Abgrenzung
Fehlende empirische Validierung, kulturelle Kontextualisierung und unvollständige Komponentenabdeckung als bewusste Grenzen des Frameworks.

---

## 4 Prototyp: Semantic Motion Editor
*(vollständig ausgearbeitet)*

### 4.1 Zielsetzung des Prototyps
Der Editor als Demonstrationsartefakt zur Operationalisierung von FF2 und Übersicht über die vier Seiten der Anwendung.

### 4.2 Architektur und Framework-Anbindung
React/TypeScript/Framer-Motion-Stack, Drei-Schichten-Architektur, Classifier-Trennung von Theorie und implementiertem Scope sowie zentrale Validierung.

### 4.3 Der Editor als Operationalisierung
Datengetriebene Auswahl, Vorschau mit generischem Motion-Adapter und Reduced-Motion-Unterstützung, Codeexport für Framer Motion und CSS sowie semantischer Möglichkeitsraum und Framework-Karte.

### 4.4 Deployment
Live-Demo auf Vercel und Voraussetzungen für Nutzung und lokale Entwicklung.

---

## 5 Diskussion
*(Stichpunkte, noch nicht ausformuliert)*

### 5.1 Beitrag des Frameworks
Abgrenzung zu bestehenden Motion-Systemen, Kernbeitrag der Peirce-Trichotomie als Klassifikationsachse und der semantische Möglichkeitsraum als Antwort auf das Prof-Feedback.

### 5.2 Einschränkungen

#### 5.2.1 Fehlende empirische Validierung
Congruence Principle als theoretischer Anker ohne empirische Bestätigung und Abgrenzung von theoretisch begründet zu empirisch bestätigt.

#### 5.2.2 Kulturelle Kodierung
Direction Bias als kulturspezifisches Beispiel und Einschränkung des Frameworks auf den westeuropäischen/nordamerikanischen Kontext.

#### 5.2.3 Accessibility und Reduced Motion
Aktueller Stand der implementierten Reduced-Motion-Strategien und offene Fragen zu Abdeckung und Validierung.

#### 5.2.4 Scope-Begrenzung des Prototyps
Sechs Komponenten und fünf Dimensionen als bewusste Grenze sowie die Mapping-Datenbank als erweiterbare Struktur.

### 5.3 Ausblick
Vollständige Ausblick-Sektion der Arbeit mit den folgenden drei Unterpunkten.

#### 5.3.1 Empirische Validierung
Mögliche Studiendesigns zur Überprüfung der Mapping-Zuordnungen.

#### 5.3.2 Erweiterung des Frameworks
Weitere Komponenten und die Vervollständigung des semantischen Möglichkeitsraums über alle Mapping-Einträge.

#### 5.3.3 Integration in Design-Systeme
Das Framework als zusätzliche Begründungsebene für bestehende Motion-Token.

---

## 6 Fazit und Ausblick
*(Stichpunkte, noch nicht ausformuliert)*

### 6.1 Ausblick
Entscheidung in der Kürzungsrunde offen: entweder streichen (da redundant zu 5.3) oder als sehr kurze Zusammenfassung der wichtigsten Punkte aus 5.3 ohne neue Inhalte.

### 6.2 Selbstreflexion und Abschluss
Rückschau auf die Beantwortung von FF1 und FF2, Reflexion des Entwicklungsprozesses entlang der Architekturentscheidungen und Abschlussbezug zu Krippendorffs Semantic Turn.

---

## Verzeichnisse
Abbildungsverzeichnis, Tabellenverzeichnis, Literaturverzeichnis.
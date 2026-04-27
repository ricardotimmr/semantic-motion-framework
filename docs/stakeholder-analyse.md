# Stakeholder-Analyse und Zielgruppendefinition

## 1. Kontext und Abgrenzung

Das Projekt entwickelt zwei eng verwandte Artefakte: das **Semantic Motion Framework** (ein theoretisch hergeleitetes Klassifikationssystem für UI-Animationen) und den **Semantic Motion Editor** (ein browserbasiertes Werkzeug, das dieses Framework implementiert und erfahrbar macht). Die Stakeholder-Analyse unterscheidet daher zwischen Personen, die den wissenschaftlichen Beitrag rezipieren, und Personen, die das Tool aktiv nutzen. Beide Gruppen sind relevant, aber mit unterschiedlicher Priorität.

Da die Arbeit keine empirische Nutzerstudie durchführt, dient diese Analyse als Grundlage für hypothesengeleitete Design- und Implementierungsentscheidungen, nicht als Ergebnis einer Felduntersuchung.

---

## 2. Stakeholder-Übersicht

### 2.1 Primäre Stakeholder

Das sind Personen, die direkt mit dem Prototyp interagieren oder dessen Ergebnisse direkt verwenden.

#### UI/UX-Designer mit Animations-Verantwortung

**Beschreibung:** Designer, die in Produktteams oder Agenturen Microinteractions, State Changes und Transitions gestalten. Sie haben ein Gefühl dafür, was "gut" aussieht, aber selten ein theoretisch fundiertes Vokabular dafür, warum eine bestimmte Bewegung funktioniert.

**Kontext:** Sie arbeiten mit Figma oder ähnlichen Tools und übergeben Animationsspezifikationen an Entwickler. Oft entstehen dabei Reibungsverluste, weil Bewegungsideen schwer kommunizierbar sind.

**Ziele:**
- Animationsentscheidungen gegenüber Teammitgliedern und Stakeholdern begründen können
- Ein konsistentes, nachvollziehbares Motion-System etablieren
- Schnell geeignete Animationspatterns für konkrete UI-Situationen finden

**Frustrationspunkte:**
- Bestehende Design-Systeme (Material Design, Apple HIG) beschreiben "was", nicht "warum"
- Feedback auf Animationen ist oft subjektiv ("wirkt irgendwie komisch")
- Keine gemeinsame Sprache mit Entwicklern für Bewegungsqualitäten

**Bezug zum Tool:** Sie nutzen den Editor, um für konkrete Komponenten (Button, Modal, Toast) semantisch begründete Animationsvorschläge zu erhalten und diese mit Kolleginnen und Kollegen zu teilen.

---

#### Frontend-Entwickler mit Fokus auf Interaction

**Beschreibung:** Entwicklerinnen und Entwickler, die Animationen implementieren, entweder eigenverantwortlich in kleineren Teams oder nach Design-Vorgaben in größeren Strukturen. Technisch versiert, aber oft ohne tieferes Verständnis für die Bedeutungsebene von Bewegung.

**Kontext:** Sie nutzen Bibliotheken wie Framer Motion, CSS Transitions oder GSAP und suchen nach nachvollziehbaren Regeln, die ihnen helfen, sinnvolle Animationen ohne Designhintergrund zu wählen.

**Ziele:**
- Fertig nutzbaren Animationscode erhalten, der sinnvoll begründet ist
- Entscheidungen zur Animation selbstständig und korrekt treffen können
- Keine Rückfragen beim Designer wegen jeder Kleinigkeit

**Frustrationspunkte:**
- Animationsparameter wie Easing oder Duration werden oft "gefühlt" gewählt
- Es gibt keine klare Regel, wann eine Fehlermeldung zittern soll und wann nicht
- Design-Tokens für Motion fehlen in vielen Projekten

**Bezug zum Tool:** Sie sind an der Code-Export-Funktion interessiert. Der Editor liefert direkt nutzbaren Framer-Motion- oder CSS-Code mit semantischer Begründung, den sie ohne weitere Interpretation einfügen können.

---

### 2.2 Sekundäre Stakeholder

Das sind Personen, die das Framework mittelbar nutzen oder dessen Ergebnisse einordnen und bewerten.

#### Design-System-Verantwortliche

**Beschreibung:** Personen oder Teams, die unternehmensweite Design-Systeme pflegen und weiterentwickeln. Sie suchen nach strukturierten Grundlagen, um Motion-Tokens und -Richtlinien in das System zu integrieren.

**Bezug:** Das Framework bietet eine theoretische Grundlage, auf der ein Motion-System aufgebaut werden kann. Diese Gruppe würde das Framework eher als Referenz und konzeptuellen Ausgangspunkt nutzen als den Editor direkt.

---

#### Lehrende und Studierende in HCI, Interaction Design und Medieninformatik

**Beschreibung:** Hochschulangehörige, die sich wissenschaftlich oder praktisch mit Animationen in Benutzeroberflächen beschäftigen. Sie rezipieren die Arbeit primär als Beitrag zur Fachliteratur.

**Bezug:** Diese Gruppe bewertet den wissenschaftlichen Beitrag der Arbeit: die theoretische Herleitung, die Systematik der Klassifikation und die Stringenz der Argumentation. Der Editor ist für sie Demonstration, nicht Werkzeug.

---

#### Betreuende der Bachelorarbeit (Prof. Christian Noss)

**Beschreibung:** Bewertet die Arbeit nach wissenschaftlichen Kriterien: Argumentationsqualität, Quellenarbeit, Schlüssigkeit der Forschungsfrage und Eignung des Prototyps als Demonstration des Frameworks.

**Bezug:** Kein direkter Nutzer des Tools, aber maßgeblich für die Bewertung des wissenschaftlichen Beitrags. Die Abgrenzung (kein empirischer Anspruch) muss in der Arbeit klar kommuniziert werden.

---

### 2.3 Indirekte Stakeholder

#### Endnutzerinnen und Endnutzer von Produkten mit animierten UIs

Personen, die täglich mit animierten Benutzeroberflächen interagieren, ohne bewusst Animationen wahrzunehmen. Sie profitieren mittelbar, wenn Designer und Entwickler das Framework anwenden und dadurch bedeutungsträgere Bewegungen gestalten. Sie sind keine direkte Zielgruppe des Tools.

---

## 3. Primäre Zielgruppe: Konkretisierung

Für den Semantic Motion Editor werden folgende Nutzerprofile als primäre Zielgruppe priorisiert:

### Profil A: Die Designer-Kommunikatorin

**Hintergrund:** 3 bis 6 Jahre Berufserfahrung im UX/UI-Design. Arbeitet in einem Produktteam oder einer Digitalagentur. Gestaltet eigenverantwortlich Animationen oder gibt Vorgaben an Entwicklerinnen und Entwickler weiter.

**Technisches Niveau:** Versteht CSS-Transitions und kennt Framer Motion dem Namen nach, implementiert aber selbst nicht.

**Nutzungsszenario:** Sie öffnet den Editor, wählt "Toast" als Komponente und sucht nach einem Pattern für eine Fehlermeldung. Der Editor zeigt eine Animation, erklärt, warum Shake/Horizontal eine Ablehnungssemantik transportiert (Direction Bias, Peirce Index), und gibt ihr die Sprache, das im nächsten Design-Review zu begründen.

**Erwartungen an das Tool:**
- Schnell navigierbar ohne Einleitung oder Onboarding
- Visuelle Echtzeit-Preview der Animation ist zentral
- Die theoretische Begründung muss verständlich sein, ohne Fachkenntnis in Semiotik vorauszusetzen
- Exportierbarkeit der Begründung (z.B. als Text, nicht nur als Code)

---

### Profil B: Der Entwickler-Pragmatiker

**Hintergrund:** 2 bis 5 Jahre Erfahrung in der Frontend-Entwicklung. Arbeitet in einem kleinen Team oder als Freelancer, trifft Animationsentscheidungen selbst. Hat keine dedizierte Designerin im Team.

**Technisches Niveau:** Kennt Framer Motion oder CSS Transitions gut. Versteht Easing-Funktionen technisch, aber nicht semantisch.

**Nutzungsszenario:** Er baut einen Checkout-Flow und muss entscheiden, wie eine Validierungsfehlermeldung animiert wird. Er wählt im Editor "Toast / Error" und erhält direkt den Framer-Motion-Code mit Kommentaren zur semantischen Begründung, den er kopiert und einfügt.

**Erwartungen an das Tool:**
- Code-Output muss direkt nutzbar sein (kein Wrapper oder abstraktes Schema)
- Framer Motion als primäres Ausgabeformat
- Begründung kann kurz sein, muss aber technisch nachvollziehbar klingen
- Kein umfangreiches UI, schnelle Auswahl reicht

---

## 4. Abgrenzung der Zielgruppe

Der Semantic Motion Editor richtet sich ausdrücklich **nicht** an:

- Personen ohne Grundkenntnisse in UI-Entwicklung oder Interface-Design (kein pädagogisches Onboarding vorgesehen)
- Teams, die ein vollständiges Motion-Design-System implementieren wollen (dafür ist der Editor zu eng fokussiert)
- Nutzerinnen und Nutzer, die rein ästhetische Animationen suchen (das Tool ist semantisch orientiert, nicht dekorativ)

Diese Abgrenzung ist für die Arbeit wichtig: Der Prototyp ist eine Demonstration des Frameworks, kein allgemeines Animations-Tool.

---

## 5. Relevanz für Design- und Implementierungsentscheidungen

Aus dieser Analyse ergeben sich folgende Prioritäten für den Editor:

**Echtzeit-Preview:** Für beide Primärprofile ist das visuelle Erleben der Animation das zentrale Feature. Ohne funktionierende Preview-Komponente verliert der Editor seinen Hauptzweck.

**Verständliche Begründungstexte:** Die semantische Erklärung muss für Profil A ohne Semiotik-Vorwissen lesbar sein. Fachbegriffe können vorkommen, müssen aber kontextualisiert werden.

**Code-Export als First-Class-Feature:** Profil B wird das Tool nur nutzen, wenn der Export direkt verwertbaren Code liefert. Framer Motion hat Priorität vor CSS.

**Schmale Komponentenauswahl:** Vier Komponenten (Button, Toggle, Toast, Modal) decken die relevantesten Anwendungsfälle ab und halten den Scope realistisch. Keine Erweiterung für den Prototyp geplant.

**Keine Nutzerregistrierung, kein Persistenz-Layer:** Das Tool wird als statische Applikation betrieben. Beide Primärprofile erwarten keine Account-Funktionalität.

---

## 6. Offene Fragen (für spätere Iterationen)

- Wie viel Vorwissen in Semiotik kann bei Profil A vorausgesetzt werden? (Wäre in einer Nutzerstudie klärbar, wird hier als gering angenommen)
- Sind Entwicklerinnen und Entwickler bereit, die theoretische Begründung zu lesen, oder überspringen sie diese? (Beeinflusst die UI-Hierarchie der Informationsdarstellung)
- Gibt es Bedarf an einem Permalink-System, das Animationsauswahlen teilbar macht? (Nicht im Scope des Prototyps, aber architektonisch bedenkenswert)

---

## 7. Stakeholder-Matrix

Die Matrix bewertet jeden Stakeholder nach vier Dimensionen:

- **Einfluss** auf Projekterfolg und Implementierungsentscheidungen (hoch / mittel / niedrig)
- **Interesse** am Ergebnis des Projekts (hoch / mittel / niedrig)
- **Artefakt-Bezug** zum Framework (F), zum Editor/Prototyp (E) oder zu beiden (F+E)
- **Handlungsstrategie** im Umgang mit diesem Stakeholder

| Stakeholder | Einfluss | Interesse | Handlungsstrategie |
|---|---|---|---|
| UI/UX-Designer (Profil A) | hoch | hoch | Primäre Zielgruppe. Alle UI-Entscheidungen an Profil A testen. Begründungstexte auf dieses Vorwissensniveau ausrichten. |
| Frontend-Entwickler (Profil B) | hoch | hoch | Primäre Zielgruppe. Code-Export und technische Qualität der Ausgabe priorisieren. |
| Design-System-Verantwortliche | mittel | mittel | Das Framework so dokumentieren, dass es als konzeptuelle Grundlage für ein Motion-System zitierbar ist. |
| Lehrende und Studierende (HCI/IxD) | mittel | hoch | Wissenschaftliche Argumentation und Quellenarbeit auf diese Gruppe ausrichten. Theoriekapitel muss ohne Toolnutzung verständlich sein. |
| Prof. Christian Noss (Betreuer) | hoch | hoch | Regelmassige Abstimmung/Video-Updates |
| Endnutzer animierter UIs | niedrig | niedrig | Kein direkter Handlungsbedarf. Mittelbare Relevanz als Zielgruppe der Produkte, in denen das Framework angewendet werden könnte. |

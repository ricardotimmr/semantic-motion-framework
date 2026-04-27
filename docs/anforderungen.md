# Anforderungsanalyse

**Projekt:** Semantic Motion in User Interfaces  
**Dokument:** Anforderungsanalyse – Framework und Semantic Motion Editor  
**Abgeleitet aus:** Stakeholder-Analyse und Zielgruppendefinition  
**Stand:** 27. April 2026

---

## 1. Vorbemerkung

Dieses Dokument leitet funktionale und nicht-funktionale Anforderungen direkt aus der Stakeholder-Analyse ab. Es ergänzt diese um Use Cases und User Flows, die das Verhalten des Semantic Motion Editors aus Nutzerperspektive beschreiben.

Die Anforderungen beziehen sich auf zwei Artefakte:

- **Framework:** Das theoretisch hergeleitete Klassifikationssystem, das Animationsparameter auf Bedeutungsdimensionen abbildet.
- **Editor:** Der browserbasierte Prototyp, der das Framework implementiert und erfahrbar macht.

Da keine empirische Nutzerstudie durchgeführt wird, sind alle Anforderungen hypothesengeleitet und aus den in der Stakeholder-Analyse beschriebenen Zielen, Frustrationspunkten und Nutzungsszenarien der Primärprofile abgeleitet.

---

## 2. Funktionale Anforderungen

Funktionale Anforderungen beschreiben, was das System tun muss.

Jede Anforderung ist mit Priorität (hoch / mittel) und der Quelle aus der Stakeholder-Analyse versehen.

---

**FA-01: Komponentenauswahl**

Der Editor ermöglicht die Auswahl einer UI-Komponente aus einer vordefinierten Liste: Button, Toggle, Toast, Modal. Die Auswahl bestimmt, welche Motion-Pattern und Bedeutungsdimensionen angezeigt werden.

Priorität: hoch  
Quelle: Profil A (Designer), Profil B (Entwickler)

---

**FA-02: Motion-Pattern-Auswahl**

Für jede Komponente stehen mehrere Motion-Pattern zur Auswahl, die aus der Mapping-Datenbank des Frameworks stammen. Die Auswahl ist auf semantisch sinnvolle Kombinationen beschränkt. Nicht passende Kombinationen werden nicht angeboten.

Priorität: hoch  
Quelle: Profil A, Profil B

---

**FA-03: Echtzeit-Animationsvorschau**

Die gewählte Animation wird unmittelbar als lebende Vorschau an der ausgewählten Komponente dargestellt. Die Vorschau ist wiederholbar auslösbar, ohne die Seite neu zu laden.

Priorität: hoch  
Quelle: Profil A, Profil B

---

**FA-04: Semantische Begründung**

Zu jeder Kombination aus Komponente und Motion-Pattern wird eine verständliche Begründung angezeigt. Die Begründung benennt den theoretischen Ursprung der Semantik, beispielsweise Direction Bias, Peirce-Zeichentyp oder Disney-Prinzip. Sie ist ohne Fachkenntnis in Semiotik lesbar und kontextualisiert Fachbegriffe beim ersten Auftreten.

Priorität: hoch  
Quelle: Profil A, Design-System-Verantwortliche, Betreuer

---

**FA-05: Code-Export (Framer Motion)**

Der Editor generiert direkt nutzbaren Framer-Motion-Code für die aktuelle Auswahl. Der Code enthält inline Kommentare, die die semantische Bedeutung der Animationsparameter erläutern. Der Output ist ohne Wrapper oder abstraktes Zwischenformat direkt in ein React-Projekt einfügbar.

Priorität: hoch  
Quelle: Profil B (Entwickler)

---

**FA-06: Code-Export (CSS)**

Alternativ zum Framer-Motion-Export steht ein CSS-Animations-Code zur Verfügung. CSS hat geringere Priorität als Framer Motion, muss aber syntaktisch korrekt und direkt verwendbar sein.

Priorität: mittel  
Quelle: Profil B

---

**FA-07: Mapping-Datenbank als Kern des Frameworks**

Das System basiert auf einer strukturierten Mapping-Datenbank, die Animationsparameter (Easing, Duration, Direction, Amplitude) auf Bedeutungsdimensionen (Feedback, State Change, Direction, Hierarchie, Aufmerksamkeit) abbildet. Die Datenbank muss vollständig für alle vier Komponenten vorliegen. Jeder Eintrag ist auf eine Quelle aus dem theoretischen Rahmen zurückführbar.

Priorität: hoch  
Quelle: Betreuer, Lehrende und Studierende (HCI/IxD)

---

**FA-08: Framework-Dokumentation im Prototyp sichtbar**

Der Editor macht das zugrunde liegende Framework erfahrbar, nicht nur die Ergebnisse. Die Klassifikationslogik und die Bedeutungsdimensionen sind im Tool nachvollziehbar, beispielsweise als aufklappbarer Infobereich oder als eigene Ansicht.

Priorität: mittel  
Quelle: Profil A, Betreuer

---

## 3. Nicht-funktionale Anforderungen

Nicht-funktionale Anforderungen beschreiben, wie das System sein muss, unabhängig von konkreten Funktionen.

---

**NFA-01: Kein Onboarding erforderlich**

Der Editor ist ohne Einleitung, Tutorial oder Registrierung nutzbar. Die Benutzeroberfläche erschliesst sich durch ihre Struktur selbst. Beide Primärprofile starten direkt mit der Arbeit.

Priorität: hoch  
Quelle: Profil A, Profil B

---

**NFA-02: Browserbasiert und ohne Installation nutzbar**

Der Editor läuft vollständig im Browser. Es ist keine lokale Installation, kein Login und kein Backend erforderlich. Das Tool ist über eine öffentliche URL erreichbar.

Priorität: hoch  
Quelle: Profil A, Profil B

---

**NFA-03: Ladezeit und Reaktionsgeschwindigkeit**

Die Animationsvorschau reagiert ohne wahrnehmbare Verzögerung auf Nutzereingaben. Die initiale Ladezeit der Applikation liegt unter drei Sekunden bei normaler Verbindung.

Priorität: hoch  
Quelle: Profil A, Profil B

---

**NFA-04: Lesbarkeit der Begründungstexte**

Alle Begründungstexte sind auf einem Sprachniveau verfasst, das für Personen mit Designhintergrund ohne Semiotik-Studium verständlich ist. Fachbegriffe werden beim ersten Auftreten kontextualisiert.

Priorität: hoch  
Quelle: Profil A

---

**NFA-05: Code-Output-Qualität**

Der exportierte Code ist syntaktisch korrekt, direkt in ein bestehendes React-Projekt einfügbar und folgt den Konventionen der jeweiligen Bibliothek. Kein Wrapper, kein abstraktes Zwischenformat.

Priorität: hoch  
Quelle: Profil B

---

**NFA-06: Erweiterbarkeit der Mapping-Datenbank**

Die Datenstruktur der Mapping-Datenbank ist so gestaltet, dass neue Komponenten oder Bedeutungsdimensionen ohne Umbau der Kernlogik ergänzt werden können. Dies ist eine architektonische Anforderung an das Framework, nicht an den Prototyp selbst.

Priorität: mittel  
Quelle: Design-System-Verantwortliche

---

**NFA-07: Wissenschaftliche Nachvollziehbarkeit der Mapping-Entscheidungen**

Jeder Eintrag in der Mapping-Datenbank ist auf eine Quelle aus dem theoretischen Rahmen zurückführbar. Willkürliche Zuordnungen sind nicht zulässig. Dies unterscheidet das Framework von einem rein empirischen oder intuitiven Animationssystem.

Priorität: hoch  
Quelle: Betreuer, Lehrende und Studierende (HCI/IxD)

---

**NFA-08: Scope-Begrenzung als Designprinzip**

Der Editor beschränkt sich auf vier Komponenten und die im Framework definierten Bedeutungsdimensionen. Erweiterungen des Funktionsumfangs über diesen Scope hinaus sind für den Prototyp ausgeschlossen, um den Demonstrationscharakter zu erhalten.

Priorität: hoch  
Quelle: Betreuer

---

## 4. Anforderungen ausserhalb des Scope

Die folgenden Punkte wurden als potenziell relevant identifiziert, liegen aber explizit ausserhalb des Umfangs dieses Prototyps:

- Persistenz von Nutzersitzungen oder gespeicherten Auswahlen
- Permalink-System zum Teilen von Animationsauswahlen
- Empirische Validierung der Bedeutungszuordnungen durch Nutzertests
- Unterstutzung weiterer UI-Komponenten über die vier definierten hinaus
- Integration in bestehende Design-Tools (Figma-Plugin o.a.)

---

## 5. Use Cases

Use Cases beschreiben konkrete Handlungsszenarien aus Nutzerperspektive. Sie sind komponentenbezogen und decken die primären Anwendungsfälle des Editors ab.

---

### UC-01: Semantisch begründete Animation für eine Fehlermeldung finden

**Akteur:** Profil A (Designer)  
**Vorbedingung:** Der Editor ist im Browser geöffnet.  
**Ziel:** Die Nutzerin findet eine Animation für einen Error-Toast, die sie im Design-Review begründen kann.

**Ablauf:**
1. Nutzerin wählt die Komponente Toast.
2. Nutzerin wählt die Bedeutungsdimension Feedback / Error.
3. Der Editor zeigt die verfügbaren Motion-Pattern für diese Kombination.
4. Nutzerin wählt ein Pattern (z.B. Horizontal Shake).
5. Die Animationsvorschau spielt die Animation am Toast ab.
6. Die semantische Begründung erklärt: Direction Bias nach Peirce (Index), horizontale Bewegung als kulturell kodiertes Ablehnungssignal.
7. Nutzerin wiederholt die Vorschau, um die Animation einzuprägen.
8. Nutzerin notiert die Begründung für das Design-Review.

**Ergebnis:** Nutzerin hat eine semantisch begründete Animation und die Sprache, sie zu erklären.

---

### UC-02: Framer-Motion-Code für eine Button-Bestätigung exportieren

**Akteur:** Profil B (Entwickler)  
**Vorbedingung:** Der Editor ist im Browser geöffnet. Der Entwickler implementiert einen Checkout-Flow.  
**Ziel:** Er erhält direkt nutzbaren Framer-Motion-Code für eine Success-Animation am Button.

**Ablauf:**
1. Entwickler wählt die Komponente Button.
2. Entwickler wählt die Bedeutungsdimension Feedback / Success.
3. Der Editor zeigt die verfügbaren Motion-Pattern (z.B. Scale Up + Ease Out).
4. Entwickler wählt das Pattern und prüft die Vorschau.
5. Entwickler öffnet den Code-Export-Bereich.
6. Der Editor zeigt den Framer-Motion-Code mit inline Kommentaren.
7. Entwickler kopiert den Code per Copy-to-Clipboard.
8. Entwickler fügt den Code direkt in sein Projekt ein.

**Ergebnis:** Entwickler hat funktionsfähigen, semantisch kommentierten Framer-Motion-Code ohne Rückfrage an einen Designer.

---

### UC-03: Animation für einen State Change eines Toggle verstehen

**Akteur:** Profil A (Designer)  
**Vorbedingung:** Der Editor ist im Browser geöffnet.  
**Ziel:** Die Nutzerin möchte verstehen, welche Animationsparameter einen Toggle-State-Change semantisch sinnvoll machen.

**Ablauf:**
1. Nutzerin wählt die Komponente Toggle.
2. Nutzerin wählt die Bedeutungsdimension State Change.
3. Der Editor zeigt Pattern für den Wechsel zwischen on und off.
4. Nutzerin vergleicht zwei Pattern durch abwechselnde Auswahl und Vorschau.
5. Die Begründung erklärt den Unterschied: Ease-In-Out als Signal für physische Trägheit (Object Continuity), Ease-Out als Signal für Zielorientierung.
6. Nutzerin entscheidet sich für das semantisch passendere Pattern.

**Ergebnis:** Nutzerin trifft eine informierte Entscheidung und kann sie im Team begründen.

---

### UC-04: Modal-Erscheinen und -Verschwinden semantisch konsistent animieren

**Akteur:** Profil B (Entwickler)  
**Vorbedingung:** Der Editor ist geöffnet. Der Entwickler baut eine Applikation mit mehreren Modal-Dialogen.  
**Ziel:** Er findet konsistente Animationen für Einblenden und Ausblenden eines Modals.

**Ablauf:**
1. Entwickler wählt die Komponente Modal.
2. Entwickler wählt die Bedeutungsdimension Direction / Enter.
3. Der Editor zeigt Pattern für das Einblenden (z.B. Scale + Fade In, Ease Out).
4. Entwickler exportiert den Framer-Motion-Code.
5. Entwickler wählt anschliessend Direction / Exit.
6. Der Editor zeigt das semantisch spiegelbildliche Pattern (Scale + Fade Out, Ease In).
7. Entwickler exportiert auch diesen Code.

**Ergebnis:** Entwickler hat semantisch konsistente Enter- und Exit-Animationen, die eine klare Richtungssprache etablieren.

---

## 6. User Flows

User Flows beschreiben den Weg durch den Editor auf Interaktionsebene. Sie sind unabhängig von einem spezifischen Use Case und zeigen die generische Nutzungslogik des Tools.

---

### UF-01: Hauptflow – Animation auswählen und Begründung lesen

```
Start
  |
  v
Editor öffnen (keine Registrierung, kein Onboarding)
  |
  v
Komponente auswählen
[Button | Toggle | Toast | Modal]
  |
  v
Bedeutungsdimension auswählen
[Feedback | State Change | Direction | Hierarchie | Aufmerksamkeit]
  +-- Unterkategorie auswählen (z.B. Feedback -> Error / Success / Warning)
  |
  v
Verfügbare Motion-Pattern werden angezeigt
  |
  v
Pattern auswählen
  |
  v
Animationsvorschau spielt automatisch ab
  |
  +-- Vorschau wiederholen (Button)
  |
  v
Semantische Begründung lesen
  |
  v
Ende (oder: weiter zu Code-Export -> UF-02)
```

---

### UF-02: Erweiterungsflow – Code exportieren

```
[Fortsetzung aus UF-01 nach Pattern-Auswahl]
  |
  v
Code-Export-Bereich öffnen
  |
  v
Ausgabeformat wählen
[Framer Motion | CSS]
  |
  v
Code wird generiert und angezeigt
(mit inline Kommentaren zur semantischen Begründung)
  |
  v
Code kopieren (Copy-to-Clipboard)
  |
  v
Ende
```

---

### UF-03: Vergleichsflow – Zwei Pattern gegenüberstellen

```
[Fortsetzung aus UF-01 nach erstem Pattern]
  |
  v
Anderes Pattern in derselben Kategorie auswählen
  |
  v
Vorschau spielt ab
  |
  v
Begründung aktualisiert sich
  |
  +-- Zurück zum vorherigen Pattern (Auswahl wechseln)
  |
  v
Entscheidung für ein Pattern
  |
  v
Weiter zu Code-Export (UF-02) oder Ende
```

---

## 7. Anforderungs-Traceability

Die folgende Tabelle zeigt, welche Anforderungen welche Use Cases und User Flows abdecken. Sie dient als Referenz für Implementierungsentscheidungen und zum Nachweis der Vollständigkeit.

| Anforderung | UC-01 | UC-02 | UC-03 | UC-04 | UF-01 | UF-02 | UF-03 |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| FA-01: Komponentenauswahl | x | x | x | x | x | | |
| FA-02: Motion-Pattern-Auswahl | x | x | x | x | x | | x |
| FA-03: Echtzeit-Animationsvorschau | x | x | x | x | x | | x |
| FA-04: Semantische Begründung | x | | x | | x | | x |
| FA-05: Code-Export (Framer Motion) | | x | | x | | x | |
| FA-06: Code-Export (CSS) | | x | | | | x | |
| FA-07: Mapping-Datenbank | x | x | x | x | x | x | x |
| FA-08: Framework sichtbar im Prototyp | x | | x | | x | | |
| NFA-01: Kein Onboarding | x | x | x | x | x | | |
| NFA-02: Browserbasiert | x | x | x | x | x | x | x |
| NFA-03: Reaktionsgeschwindigkeit | x | x | x | x | x | x | x |
| NFA-05: Code-Output-Qualität | | x | | x | | x | |
| NFA-07: Wissenschaftl. Nachvollziehbarkeit | x | | x | | x | | x |

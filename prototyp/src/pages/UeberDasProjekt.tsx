const githubUrl = 'https://github.com/ricardotimmr/semantic-motion-framework';
const documentationUrl =
  'https://github.com/ricardotimmr/semantic-motion-framework/wiki';
const thKoelnUrl = 'https://www.th-koeln.de/';

const projectMeta = [
  ['Autor', 'Ricardo Timm'],
  ['Institution', 'Technische Hochschule Köln'],
  ['Studiengang', 'Medieninformatik'],
  ['Jahr', '2026'],
  ['Erstprüfer', 'Prof. Christian Noss'],
  ['Zweitprüfer', 'Prof. Dr. Hoai Viet Nguyen'],
];

const limitations = [
  {
    question: 'Ist das Framework empirisch validiert?',
    answer:
      'Nein. Die Mappings sind theoretisch hergeleitet und im Prototyp demonstriert, aber nicht durch Nutzerstudien validiert.',
  },
  {
    question: 'Welche Komponenten deckt das Framework ab?',
    answer:
      'Button, Toggle, Toast, Modal, Input und Skeleton. Diese sechs Komponenten decken die fünf Bedeutungsdimensionen und die Peirce-Trichotomie im aktuellen Scope ab.',
  },
  {
    question: 'Sind die Bedeutungszuordnungen universell?',
    answer:
      'Nicht vollständig. Einige Bedeutungen, besonders richtungsbasierte Mappings, hängen von kulturellen Lese- und Nutzungskonventionen ab.',
  },
  {
    question: 'Ist der Prototyp ein produktionsreifes Tool?',
    answer:
      'Nein. Der Editor ist ein Demonstrationsartefakt, das die Operationalisierung des Frameworks zeigt und keinen Anspruch auf Produktreife erhebt.',
  },
];

function UeberDasProjekt() {
  return (
    <main className="main-content about-page">
      <section className="about-header">
        <div>
          <p className="eyebrow">Über das Projekt</p>
          <h1>
            Animation mit
            <br />
            <em>Bedeutung.</em>
          </h1>
        </div>
        <p>
          Dieses Projekt ist eine Bachelorarbeit an der TH Köln im Studiengang
          Medieninformatik. Es entwickelt ein theoretisch fundiertes
          Klassifikationssystem für UI-Animationen und zeigt dieses System in
          einem browserbasierten Editor.
        </p>
      </section>

      <section className="about-content">
        <div className="about-research">
          <p className="section-label">Die Forschung</p>
          <p>
            UI-Animationen sind in digitalen Interfaces allgegenwärtig. In der
            Praxis werden sie aber häufig intuitiv, aus Gewohnheit oder nach
            ästhetischer Präferenz eingesetzt.
          </p>
          <p>
            Das Semantic Motion Framework ordnet Animationsparameter fünf
            Bedeutungsdimensionen zu: Feedback, Zustandswechsel, Richtung,
            Hierarchie und Aufmerksamkeit. Die Herleitung stützt sich auf
            Peirces Semiotik, Wahrnehmungspsychologie und etablierte
            Motion-Design-Prinzipien.
          </p>
          <p>
            Der Editor operationalisiert das Framework. Er macht die
            semantische Begründung der Mappings sichtbar und übersetzt sie in
            eine nutzbare Vorschau- und Exportlogik.
          </p>

          <div className="about-meta">
            {projectMeta.map(([label, value]) => (
              <div className="about-meta-row" key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="about-limitations">
          <p className="section-label">Einschränkungen</p>
          {limitations.map((item) => (
            <article className="about-limitation" key={item.question}>
              <h2>{item.question}</h2>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-links">
        <div>
          <p className="section-label">Ressourcen</p>
          <h2>Repository und Dokumentation</h2>
          <p>
            Quellcode, Wiki und Entwicklungsdokumentation sind im Repository
            gebündelt. Die README beschreibt den aktuellen Projektstand, das
            Wiki sammelt zusätzliche Hintergrundinformationen.
          </p>
        </div>

        <div className="about-link-list">
          <a href={githubUrl} target="_blank" rel="noreferrer">
            <span>GitHub-Repository</span>
            <span>ricardotimmr/semantic-motion-framework</span>
          </a>
          <a href={documentationUrl} target="_blank" rel="noreferrer">
            <span>Dokumentation</span>
            <span>GitHub Wiki</span>
          </a>
          <a href={thKoelnUrl} target="_blank" rel="noreferrer">
            <span>TH Köln</span>
            <span>th-koeln.de</span>
          </a>
        </div>
      </section>
    </main>
  );
}

export default UeberDasProjekt;

import { mappings } from "../../../prototyp/src/data/mappings";
import {
  COMPONENT_IDS,
  DIMENSIONS,
  SUBCATEGORIES_BY_DIMENSION,
} from "../../../prototyp/src/framework/types";
import type {
  ComponentId,
  Dimension,
  MappingEntry,
} from "../../../prototyp/src/framework/types";
import {
  getDimensionsForComponent,
  getMappingFor,
  getOutOfScopeCombinations,
} from "../../../prototyp/src/framework/classifier";
import { validateMappingDatabase } from "../../../prototyp/src/framework/validation";

type ComponentSummary = {
  component: ComponentId;
  mappingCount: number;
  dimensions: Dimension[];
};

const report = validateMappingDatabase();
const hasErrors = report.errors.length > 0;

const componentSummaries: ComponentSummary[] = COMPONENT_IDS.map((component) => ({
  component,
  mappingCount: mappings.filter((entry) => entry.component === component).length,
  dimensions: getDimensionsForComponent(component),
}));

const theoreticalCombinationCount = COMPONENT_IDS.reduce((total) => {
  return (
    total +
    DIMENSIONS.reduce(
      (dimensionTotal, dimension) =>
        dimensionTotal + SUBCATEGORIES_BY_DIMENSION[dimension].length,
      0,
    )
  );
}, 0);

const outOfScopePreview = getOutOfScopeCombinations().slice(0, 12);

function formatEasing(entry: MappingEntry) {
  const { easing } = entry.params;

  if ("preset" in easing) {
    return easing.preset;
  }

  return `[${easing.cubicBezier.join(", ")}]`;
}

function formatParams(entry: MappingEntry) {
  const { params } = entry;
  const parts = [`${params.duration} ms`, formatEasing(entry)];

  if (params.direction !== undefined) {
    parts.push(params.direction);
  }

  if (params.scaleFactor !== undefined) {
    parts.push(`scale ${params.scaleFactor}`);
  }

  if (params.translatePx !== undefined) {
    parts.push(`translate ${params.translatePx}px`);
  }

  if (params.translateDistance !== undefined) {
    parts.push(`translate ${params.translateDistance}`);
  }

  if (params.trackFactor !== undefined) {
    parts.push(`track ${params.trackFactor}`);
  }

  return parts.join(" / ");
}

function lookupSample() {
  const entry = getMappingFor("button", "feedback", "error");

  return {
    query: "button + feedback + error",
    result: entry?.id ?? "null",
    status: entry === null ? "missing" : "resolved",
  };
}

const sample = lookupSample();

export function App() {
  return (
    <main className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">POC 02 / Mapping-Datenbank</p>
          <h1>Mapping Validation Dashboard</h1>
          <p className="hero-copy">
            Dieser POC macht die typisierte Mapping-Datenbank sichtbar. Die UI
            ist read-only und zeigt, ob Lookup-Logik, Scope-Grenzen,
            Quellenstruktur und Parameterregeln konsistent sind.
          </p>
        </div>
        <section className={hasErrors ? "status-panel error" : "status-panel"}>
          <p className="panel-label">Validierungsstatus</p>
          <strong>{hasErrors ? "Fehler gefunden" : "Database valid"}</strong>
          <span>
            {hasErrors
              ? `${report.errors.length} Regelverletzungen`
              : "0 Strukturfehler"}
          </span>
        </section>
      </header>

      <section className="metric-strip" aria-label="Validierungskennzahlen">
        <Metric label="Mappings" value={report.totalEntries.toString()} />
        <Metric label="Unique IDs" value={report.uniqueIds.toString()} />
        <Metric
          label="Komponenten"
          value={report.supportedComponents.length.toString()}
        />
        <Metric
          label="Out of Scope"
          value={report.outOfScopeCombinations.length.toString()}
        />
      </section>

      <section className="content-grid">
        <section className="panel component-panel">
          <p className="panel-label">Komponentenabdeckung</p>
          <div className="component-list">
            {componentSummaries.map((summary) => (
              <div className="component-row" key={summary.component}>
                <div>
                  <strong>{summary.component}</strong>
                  <span>{summary.dimensions.join(", ")}</span>
                </div>
                <b>{summary.mappingCount}</b>
              </div>
            ))}
          </div>
        </section>

        <section className="panel lookup-panel">
          <p className="panel-label">Lookup-Probe</p>
          <div className="lookup-result">
            <span>{sample.query}</span>
            <strong>{sample.result}</strong>
            <em>{sample.status}</em>
          </div>
          <p className="panel-copy">
            Dieselbe Query wird über `getMappingFor(...)` aufgelöst. Nicht
            vorhandene Kombinationen geben `null` zurück und werden nicht als
            Fehler behandelt.
          </p>
        </section>

        <section className="panel scope-panel">
          <p className="panel-label">Theoretischer Scope</p>
          <div className="scope-values">
            <span>{theoreticalCombinationCount}</span>
            <p>
              theoretisch benennbare Kombinationen aus Komponente, Dimension
              und Subkategorie
            </p>
          </div>
          <div className="scope-tags">
            {outOfScopePreview.map((query) => (
              <span
                key={`${query.component}-${query.dimension}-${query.subcategory}`}
              >
                {query.component}-{query.dimension}-{query.subcategory}
              </span>
            ))}
          </div>
        </section>
      </section>

      <section className="table-section">
        <div className="table-header">
          <p className="panel-label">Mapping-Einträge</p>
          <span>{mappings.length} Einträge</span>
        </div>
        <div className="mapping-table" role="table" aria-label="Mapping-Einträge">
          <div className="mapping-row table-head" role="row">
            <span>ID</span>
            <span>Komponente</span>
            <span>Dimension</span>
            <span>Subkategorie</span>
            <span>Parameter</span>
            <span>Zeichen</span>
            <span>Quellen</span>
          </div>
          {mappings.map((entry) => (
            <div className="mapping-row" key={entry.id} role="row">
              <span className="id-cell">{entry.id}</span>
              <span>{entry.component}</span>
              <span>{entry.dimension}</span>
              <span>{entry.subcategory}</span>
              <span>{formatParams(entry)}</span>
              <span className="sign-cell">{entry.rationale.signType}</span>
              <span>{entry.rationale.references.length}</span>
            </div>
          ))}
        </div>
      </section>

      {hasErrors ? (
        <section className="error-list">
          <p className="panel-label">Fehlerliste</p>
          {report.errors.map((error) => (
            <p key={error}>{error}</p>
          ))}
        </section>
      ) : null}
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="metric">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

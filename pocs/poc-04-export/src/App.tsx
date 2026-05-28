import { useMemo, useState } from "react";
import { mappings } from "../../../prototyp/src/data/mappings";
import type { MappingEntry } from "../../../prototyp/src/framework/types";
import { generateExportBundle } from "./exportGenerators";

type ExportTarget = "framerMotion" | "css";

const initialEntry = mappings.find((entry) => entry.id === "button-feedback-error") ?? mappings[0];

function formatLabel(value: string) {
  return value.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase());
}

function getEntrySummary(entry: MappingEntry) {
  return `${formatLabel(entry.component)} / ${formatLabel(entry.dimension)} / ${formatLabel(entry.subcategory)}`;
}

export function App() {
  const [selectedId, setSelectedId] = useState(initialEntry.id);
  const [target, setTarget] = useState<ExportTarget>("framerMotion");
  const [copyState, setCopyState] = useState("Copy");

  const selectedEntry = useMemo(
    () => mappings.find((entry) => entry.id === selectedId) ?? initialEntry,
    [selectedId],
  );

  const bundle = useMemo(() => generateExportBundle(selectedEntry), [selectedEntry]);
  const activeCode = bundle[target];

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(activeCode);
      setCopyState("Copied");
    } catch {
      setCopyState("Failed");
    }

    window.setTimeout(() => setCopyState("Copy"), 1200);
  }

  return (
    <main className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">POC 04 / Code-Export</p>
          <h1>Mapping-Parameter als nutzbarer Animationscode</h1>
          <p className="hero-copy">
            Dieser POC generiert Framer-Motion- und CSS-Code aus denselben
            Mapping-Einträgen. Kommentare erhalten Bedeutung, Zeichentyp und
            Quellenbezug, damit der Export nachvollziehbar bleibt.
          </p>
        </div>
        <section className="decision-box">
          <p className="panel-label">Export-Regel</p>
          <p>
            Framer Motion erhält echte Spring-Transitions. CSS erhält bei Spring
            einen Hinweis und eine approximierte Fallback-Kurve, weil CSS keine
            native Federphysik unterstützt.
          </p>
        </section>
      </header>

      <section className="workspace">
        <aside className="selector-panel">
          <p className="panel-label">Mapping</p>
          <div className="mapping-list">
            {mappings.map((entry) => (
              <button
                className={
                  selectedId === entry.id ? "mapping-button active" : "mapping-button"
                }
                key={entry.id}
                onClick={() => setSelectedId(entry.id)}
                type="button"
              >
                <strong>{entry.id}</strong>
                <span>{getEntrySummary(entry)}</span>
              </button>
            ))}
          </div>
        </aside>

        <section className="export-panel">
          <div className="toolbar">
            <div>
              <p className="panel-label">Export</p>
              <h2>{selectedEntry.id}</h2>
            </div>
            <div className="toolbar-actions">
              <button
                className={target === "framerMotion" ? "tab active" : "tab"}
                onClick={() => setTarget("framerMotion")}
                type="button"
              >
                Framer Motion
              </button>
              <button
                className={target === "css" ? "tab active" : "tab"}
                onClick={() => setTarget("css")}
                type="button"
              >
                CSS
              </button>
              <button className="copy-button" onClick={() => void copyCode()} type="button">
                {copyState}
              </button>
            </div>
          </div>

          <pre className="code-block">
            <code>{activeCode}</code>
          </pre>
        </section>

        <aside className="meta-panel">
          <p className="panel-label">Semantik</p>
          <span className="badge">{selectedEntry.rationale.signType}</span>
          <p className="rationale">{selectedEntry.rationale.short}</p>
          <dl className="params">
            <div>
              <dt>Component</dt>
              <dd>{selectedEntry.component}</dd>
            </div>
            <div>
              <dt>Dimension</dt>
              <dd>{selectedEntry.dimension}</dd>
            </div>
            <div>
              <dt>Subcategory</dt>
              <dd>{selectedEntry.subcategory}</dd>
            </div>
            <div>
              <dt>References</dt>
              <dd>{selectedEntry.rationale.references.length}</dd>
            </div>
          </dl>
        </aside>
      </section>
    </main>
  );
}

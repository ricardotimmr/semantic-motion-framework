import { useEffect, useMemo, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { mappings } from "../../../prototyp/src/data/mappings";
import type { MappingEntry } from "../../../prototyp/src/framework/types";
import { playMappingAnimation } from "../../poc-03-preview/src/motionAdapter";
import { generateExportBundle } from "../../poc-04-export/src/exportGenerators";

const buttonFeedbackMappings = mappings.filter(
  (entry): entry is MappingEntry =>
    entry.component === "button" &&
    entry.dimension === "feedback" &&
    (entry.subcategory === "success" || entry.subcategory === "error"),
);

type CopyResult = {
  entryId: string;
  target: ExportTarget;
  status: "copied" | "failed";
};

type ExportTarget = "framerMotion" | "css";

function formatSubcategory(entry: MappingEntry) {
  switch (entry.subcategory) {
    case "success":
      return "Success";
    case "error":
      return "Error";
    default:
      return entry.subcategory;
  }
}

function formatDuration(entry: MappingEntry) {
  return `${entry.params.duration} ms`;
}

function formatEasing(entry: MappingEntry) {
  return "preset" in entry.params.easing
    ? entry.params.easing.preset
    : "custom cubic-bezier";
}

function getEntrySummary(entry: MappingEntry) {
  return `${entry.component} / ${entry.dimension} / ${entry.subcategory}`;
}

export default function App() {
  const [selectedId, setSelectedId] = useState(buttonFeedbackMappings[0].id);
  const [target, setTarget] = useState<ExportTarget>("framerMotion");
  const [replayKey, setReplayKey] = useState(0);
  const [copyResult, setCopyResult] = useState<CopyResult | null>(null);
  const controls = useAnimationControls();

  const selectedEntry = useMemo(
    () =>
      buttonFeedbackMappings.find((entry) => entry.id === selectedId) ??
      buttonFeedbackMappings[0],
    [selectedId],
  );

  const bundle = useMemo(
    () => generateExportBundle(selectedEntry),
    [selectedEntry],
  );
  const activeCode = bundle[target];
  const copyState =
    copyResult?.entryId === selectedEntry.id && copyResult.target === target
      ? copyResult.status
      : "idle";

  useEffect(() => {
    void playMappingAnimation(selectedEntry, controls);
  }, [controls, selectedEntry, replayKey]);

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(activeCode);
      setCopyResult({ entryId: selectedEntry.id, target, status: "copied" });
    } catch {
      setCopyResult({ entryId: selectedEntry.id, target, status: "failed" });
    }
  }

  return (
    <main className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">POC 05 / Integration</p>
          <h1>End-to-End-Integration</h1>
          <p className="hero-copy">
            Eine kleine Nutzungskette verbindet Mapping-Auswahl, semantische
            Begründung, Live-Preview und Framer-Motion-Export.
          </p>
        </div>

        <aside className="decision-box">
          <p className="panel-label">Integration</p>
          <p>
            Derselbe Mapping-Eintrag steuert Auswahl, Begründung, Preview und
            Export.
          </p>
        </aside>
      </header>

      <section className="workspace" aria-label="Integrationskette">
        <aside className="selector-panel">
          <p className="panel-label">Mapping</p>

          <div className="mapping-list" role="list">
            {buttonFeedbackMappings.map((entry) => (
              <button
                className={
                  entry.id === selectedEntry.id
                    ? "mapping-button active"
                    : "mapping-button"
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

        <section className="preview-panel">
          <div className="preview-header">
            <div>
              <p className="panel-label">Preview</p>
              <h2>{formatSubcategory(selectedEntry)}</h2>
            </div>
            <button
              className="replay-button"
              onClick={() => setReplayKey((value) => value + 1)}
              type="button"
            >
              Replay
            </button>
          </div>

          <div className="stage">
            <motion.button
              className={
                selectedEntry.subcategory === "error"
                  ? "demo-button error"
                  : "demo-button"
              }
              animate={controls}
            >
              Button
            </motion.button>
          </div>

          <dl className="params">
            <div>
              <dt>Duration</dt>
              <dd>{formatDuration(selectedEntry)}</dd>
            </div>
            <div>
              <dt>Easing</dt>
              <dd>{formatEasing(selectedEntry)}</dd>
            </div>
            <div>
              <dt>SignType</dt>
              <dd>{selectedEntry.rationale.signType}</dd>
            </div>
          </dl>
        </section>

        <aside className="export-panel">
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
              <button className="copy-button" onClick={copyCode} type="button">
                {copyState === "copied"
                  ? "Copied"
                  : copyState === "failed"
                    ? "Failed"
                    : "Copy"}
              </button>
            </div>
          </div>

          <pre className="code-block">
            <code>{activeCode}</code>
          </pre>

          <div className="semantic-block">
            <p className="panel-label">Semantik</p>
            <span className="badge">{selectedEntry.rationale.signType}</span>
            <p className="rationale">{selectedEntry.rationale.short}</p>
          </div>
        </aside>
      </section>
    </main>
  );
}

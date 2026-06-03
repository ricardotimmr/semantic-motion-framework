import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { mappings } from "../../../prototyp/src/data/mappings";
import type {
  ComponentId,
  Dimension,
  MappingEntry,
  Subcategory,
} from "../../../prototyp/src/framework/types";
import {
  getDimensionsForComponent,
  getMappingsForComponent,
  getMappingsForDimension,
  getSubcategoriesForDimension,
} from "../../../prototyp/src/framework/classifier";
import { playMappingAnimation } from "./motionAdapter";
import { playInputPreviewAnimation } from "./inputMotionAdapter";

const previewComponents = Array.from(
  new Set(mappings.map((entry) => entry.component)),
) as ComponentId[];

function getFirstMapping(component: ComponentId) {
  return getMappingsForComponent(component)[0];
}

function getInitialMapping() {
  return getFirstMapping(previewComponents[0]);
}

function formatLabel(value: string) {
  return value
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (char) => char.toUpperCase());
}

export function App() {
  const initialMapping = getInitialMapping();
  const [selectedComponent, setSelectedComponent] = useState<ComponentId>(
    initialMapping.component,
  );
  const [selectedDimension, setSelectedDimension] = useState<Dimension>(
    initialMapping.dimension,
  );
  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory>(
    initialMapping.subcategory,
  );
  const [reducedMotionPreview, setReducedMotionPreview] = useState(false);
  const [replayKey, setReplayKey] = useState(0);

  const dimensions = useMemo(
    () => getDimensionsForComponent(selectedComponent),
    [selectedComponent],
  );

  const subcategories = useMemo(
    () => getSubcategoriesForDimension(selectedComponent, selectedDimension),
    [selectedComponent, selectedDimension],
  );

  const activeMapping = useMemo(() => {
    return (
      getMappingsForDimension(selectedComponent, selectedDimension).find(
        (entry) => entry.subcategory === selectedSubcategory,
      ) ?? getMappingsForDimension(selectedComponent, selectedDimension)[0]
    );
  }, [selectedComponent, selectedDimension, selectedSubcategory]);

  function selectComponent(component: ComponentId) {
    const nextMapping = getFirstMapping(component);
    setSelectedComponent(component);
    setSelectedDimension(nextMapping.dimension);
    setSelectedSubcategory(nextMapping.subcategory);
  }

  function selectDimension(dimension: Dimension) {
    const nextMapping = getMappingsForDimension(
      selectedComponent,
      dimension,
    )[0];
    setSelectedDimension(dimension);
    setSelectedSubcategory(nextMapping.subcategory);
  }

  return (
    <main className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">POC 03 / Echtzeit-Preview</p>
          <h1>Mapping-Einträge als Animationsquelle</h1>
          <p className="hero-copy">
            Dieser POC prüft, ob Preview-Komponenten ihre Animation direkt aus
            der Mapping-Datenbank beziehen können. Auswahländerungen lösen die
            Animation automatisch neu aus; Replay nutzt dieselben Mapping-Werte.
          </p>
        </div>
        <section className="decision-box">
          <p className="panel-label">Technische Entscheidung</p>
          <p>
            Die Preview nutzt imperative Framer-Motion-Controls. Dadurch kann
            der laufende Zustand vor jedem Mapping-Wechsel zurückgesetzt werden,
            ohne die Komponente neu zu mounten.
          </p>
        </section>
      </header>

      <section className="workspace">
        <aside className="selector-panel">
          <SelectionGroup title="Komponente">
            {previewComponents.map((component) => (
              <button
                className={
                  selectedComponent === component
                    ? "choice-button active"
                    : "choice-button"
                }
                key={component}
                onClick={() => selectComponent(component)}
                type="button"
              >
                {formatLabel(component)}
              </button>
            ))}
          </SelectionGroup>

          <SelectionGroup title="Dimension">
            {dimensions.map((dimension) => (
              <button
                className={
                  selectedDimension === dimension
                    ? "choice-button active"
                    : "choice-button"
                }
                key={dimension}
                onClick={() => selectDimension(dimension)}
                type="button"
              >
                {formatLabel(dimension)}
              </button>
            ))}
          </SelectionGroup>

          <SelectionGroup title="Subkategorie">
            {subcategories.map((subcategory) => (
              <button
                className={
                  selectedSubcategory === subcategory
                    ? "choice-button active"
                    : "choice-button"
                }
                key={subcategory}
                onClick={() => setSelectedSubcategory(subcategory)}
                type="button"
              >
                {formatLabel(subcategory)}
              </button>
            ))}
          </SelectionGroup>
        </aside>

        <PreviewPanel
          entry={activeMapping}
          reducedMotion={reducedMotionPreview}
          replayKey={replayKey}
          onReplay={() => setReplayKey((current) => current + 1)}
          onToggleReducedMotion={() =>
            setReducedMotionPreview((current) => !current)
          }
        />

        <aside className="info-panel">
          <p className="panel-label">Aktives Mapping</p>
          <h2>{activeMapping.id}</h2>
          <dl className="mapping-meta">
            <div>
              <dt>Component</dt>
              <dd>{activeMapping.component}</dd>
            </div>
            <div>
              <dt>Dimension</dt>
              <dd>{activeMapping.dimension}</dd>
            </div>
            <div>
              <dt>Subcategory</dt>
              <dd>{activeMapping.subcategory}</dd>
            </div>
            <div>
              <dt>SignType</dt>
              <dd>{activeMapping.rationale.signType}</dd>
            </div>
            <div>
              <dt>Reduced Motion</dt>
              <dd>{activeMapping.accessibility?.reducedMotion ?? "none"}</dd>
            </div>
          </dl>
          <div className="param-block">
            <p className="panel-label">Parameter</p>
            <pre>{JSON.stringify(activeMapping.params, null, 2)}</pre>
          </div>
        </aside>
      </section>
    </main>
  );
}

function SelectionGroup({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) {
  return (
    <section className="selection-group">
      <p className="panel-label">{title}</p>
      <div className="choice-list">{children}</div>
    </section>
  );
}

function PreviewPanel({
  entry,
  onReplay,
  onToggleReducedMotion,
  reducedMotion,
  replayKey,
}: {
  entry: MappingEntry;
  onReplay: () => void;
  onToggleReducedMotion: () => void;
  reducedMotion: boolean;
  replayKey: number;
}) {
  const controls = useAnimationControls();

  useEffect(() => {
    if (entry.component === "input") {
      return;
    }

    void playMappingAnimation(entry, controls, { reducedMotion });
  }, [controls, entry, reducedMotion, replayKey]);

  return (
    <section className="preview-panel">
      <div className="preview-header">
        <p className="panel-label">Preview</p>
        <div className="preview-actions">
          <label className="motion-switch">
            <input
              checked={reducedMotion}
              onChange={onToggleReducedMotion}
              type="checkbox"
            />
            <span>Reduced Motion</span>
          </label>
          <button className="replay-button" onClick={onReplay} type="button">
            Replay
          </button>
        </div>
      </div>
      <div className="stage">
        {entry.component === "button" ? (
          <PreviewButton controls={controls} entry={entry} />
        ) : null}
        {entry.component === "modal" ? (
          <PreviewModal controls={controls} entry={entry} />
        ) : null}
        {entry.component === "toast" ? (
          <PreviewToast controls={controls} entry={entry} />
        ) : null}
        {entry.component === "toggle" ? (
          <PreviewToggle controls={controls} entry={entry} />
        ) : null}
        {entry.component === "input" ? (
          <PreviewInput
            entry={entry}
            reducedMotion={reducedMotion}
            replayKey={replayKey}
          />
        ) : null}
        {entry.component === "skeleton" ? (
          <PreviewSkeleton
            entry={entry}
            reducedMotion={reducedMotion}
            replayKey={replayKey}
          />
        ) : null}
      </div>
    </section>
  );
}

function PreviewButton({
  controls,
  entry,
}: {
  controls: ReturnType<typeof useAnimationControls>;
  entry: MappingEntry;
}) {
  return (
    <motion.button
      animate={controls}
      className={
        entry.subcategory === "error" ? "demo-button error" : "demo-button"
      }
      type="button"
    >
      {entry.subcategory === "error" ? "Eingabe prüfen" : "Aktion ausführen"}
    </motion.button>
  );
}

function PreviewModal({
  controls,
  entry,
}: {
  controls: ReturnType<typeof useAnimationControls>;
  entry: MappingEntry;
}) {
  return (
    <motion.div animate={controls} className="demo-modal">
      <div className="modal-topline" />
      <h3>{entry.dimension === "direction" ? "Neue Ebene" : "Dialog"}</h3>
      <p>{formatLabel(entry.subcategory)}</p>
      <button type="button">Bestätigen</button>
    </motion.div>
  );
}

function PreviewToast({
  controls,
  entry,
}: {
  controls: ReturnType<typeof useAnimationControls>;
  entry: MappingEntry;
}) {
  return (
    <motion.div
      animate={controls}
      className={
        entry.subcategory === "error" ? "demo-toast error" : "demo-toast"
      }
    >
      <strong>{formatLabel(entry.subcategory)}</strong>
      <span>{entry.dimension}</span>
    </motion.div>
  );
}

function PreviewToggle({
  controls,
  entry,
}: {
  controls: ReturnType<typeof useAnimationControls>;
  entry: MappingEntry;
}) {
  return (
    <div className="demo-toggle">
      <motion.div animate={controls} className="toggle-thumb" />
      <span>{formatLabel(entry.subcategory)}</span>
    </div>
  );
}

function PreviewInput({
  entry,
  reducedMotion,
  replayKey,
}: {
  entry: MappingEntry;
  reducedMotion: boolean;
  replayKey: number;
}) {
  const containerControls = useAnimationControls();
  const fieldControls = useAnimationControls();
  const labelControls = useAnimationControls();
  const messageControls = useAnimationControls();

  useEffect(() => {
    void playInputPreviewAnimation(
      entry,
      {
        container: containerControls,
        field: fieldControls,
        label: labelControls,
        message: messageControls,
      },
      { reducedMotion },
    );
  }, [
    containerControls,
    entry,
    fieldControls,
    labelControls,
    messageControls,
    reducedMotion,
    replayKey,
  ]);

  return (
    <motion.div
      animate={containerControls}
      className={`demo-input ${entry.subcategory}`}
    >
      <motion.label animate={labelControls} htmlFor="preview-input">
        {formatLabel(entry.subcategory)}
      </motion.label>
      <motion.input
        animate={fieldControls}
        id="preview-input"
        readOnly
        value={
          entry.subcategory === "requiredField"
            ? ""
            : entry.subcategory === "error"
              ? "ungueltige-eingabe"
              : "semantic-motion"
        }
      />
      {entry.subcategory === "warning" ? (
        <motion.span animate={messageControls} className="input-message">
          Eingabe prüfen
        </motion.span>
      ) : null}
      {entry.subcategory === "requiredField" ? (
        <motion.span animate={messageControls} className="input-message">
          Pflichtfeld
        </motion.span>
      ) : null}
    </motion.div>
  );
}

function PreviewSkeleton({
  entry,
  reducedMotion,
  replayKey,
}: {
  entry: MappingEntry;
  reducedMotion: boolean;
  replayKey: number;
}) {
  const isLoading = entry.subcategory === "loading";
  const containerControls = useAnimationControls();
  const shimmerControls = useAnimationControls();

  useEffect(() => {
    if (isLoading) {
      void containerControls.set({ opacity: 1, x: 0, y: 0, scale: 1 });
      void playMappingAnimation(entry, shimmerControls, { reducedMotion });
      return;
    }

    void playMappingAnimation(entry, containerControls, { reducedMotion });
  }, [
    containerControls,
    entry,
    isLoading,
    reducedMotion,
    replayKey,
    shimmerControls,
  ]);

  return (
    <motion.div animate={containerControls} className="demo-skeleton">
      <div className="skeleton-line skeleton-line-wide">
        {isLoading ? (
          <motion.span animate={shimmerControls} className="skeleton-shimmer" />
        ) : null}
      </div>
      <div className="skeleton-line skeleton-line-mid">
        {isLoading ? (
          <motion.span animate={shimmerControls} className="skeleton-shimmer" />
        ) : null}
      </div>
      <div className="skeleton-line skeleton-line-short">
        {isLoading ? (
          <motion.span animate={shimmerControls} className="skeleton-shimmer" />
        ) : null}
      </div>
    </motion.div>
  );
}

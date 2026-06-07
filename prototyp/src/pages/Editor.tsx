import { useMemo, useState } from 'react';
import MotionActionButton from '../components/MotionActionButton';
import EditorExportPanel from '../editor/export/EditorExportPanel';
import EditorPreview from '../editor/preview/EditorPreview';
import {
  getDefinedComponents,
  getDefinedDimensions,
  getDefinedSubcategoriesForDimension,
  getDimensionsForComponent,
  getMapping,
  getMappingsForDimension,
  getSubcategoriesForDimension,
  isSupportedCombination,
} from '../framework/classifier';
import type {
  ComponentId,
  Dimension,
  SignType,
  Subcategory,
} from '../framework/types';
import { validateMappingDatabase } from '../framework/validation';
import {
  componentLabels,
  dimensionLabels,
  getEditorParameterRows,
  signTypeLabels,
  subcategoryLabels,
} from '../editor/editorLabels';

const defaultComponent: ComponentId = 'button';

export type EditorSelection = {
  component: ComponentId;
  dimension: Dimension;
  subcategory: Subcategory;
};

type EditorProps = {
  selection: EditorSelection;
  onSelectionChange: (selection: EditorSelection) => void;
};

function getFirstDimension(component: ComponentId) {
  return getDimensionsForComponent(component)[0] ?? 'feedback';
}

function getFirstSubcategory(component: ComponentId, dimension: Dimension) {
  return (
    getSubcategoriesForDimension(component, dimension)[0] ??
    getDefinedSubcategoriesForDimension(dimension)[0]
  );
}

function getSignClass(signType: SignType) {
  if (signType === 'symbol') {
    return 'symbol';
  }

  if (signType === 'icon') {
    return 'icon';
  }

  return 'index';
}

export const defaultEditorSelection: EditorSelection = {
  component: defaultComponent,
  dimension: getFirstDimension(defaultComponent),
  subcategory: getFirstSubcategory(
    defaultComponent,
    getFirstDimension(defaultComponent),
  ),
};

function Editor({ selection, onSelectionChange }: EditorProps) {
  const [replayKey, setReplayKey] = useState(0);
  const { component, dimension, subcategory } = selection;

  const validationReport = useMemo(() => validateMappingDatabase(), []);
  const selectedEntry = getMapping({ component, dimension, subcategory });
  const entry = selectedEntry ?? getMapping({
    component: defaultComponent,
    dimension: 'feedback',
    subcategory: 'success',
  });

  if (!entry) {
    return <main className="main-content empty-page" />;
  }

  const selectComponent = (nextComponent: ComponentId) => {
    const nextDimension = getFirstDimension(nextComponent);
    const nextSubcategory = getFirstSubcategory(nextComponent, nextDimension);

    onSelectionChange({
      component: nextComponent,
      dimension: nextDimension,
      subcategory: nextSubcategory,
    });
  };

  const selectDimension = (nextDimension: Dimension) => {
    if (getMappingsForDimension(component, nextDimension).length === 0) {
      return;
    }

    onSelectionChange({
      component,
      dimension: nextDimension,
      subcategory: getFirstSubcategory(component, nextDimension),
    });
  };

  const selectSubcategory = (nextSubcategory: Subcategory) => {
    if (!isSupportedCombination(component, dimension, nextSubcategory)) {
      return;
    }

    onSelectionChange({
      component,
      dimension,
      subcategory: nextSubcategory,
    });
  };

  return (
    <main className="main-content editor-page">
      <section className="editor-grid">
        <aside className="editor-panel editor-selection-panel">
          <p className="editor-panel-title">Auswahl</p>

          <div className="editor-option-group">
            <span>Komponente</span>
            <div>
              {getDefinedComponents().map((item) => (
                <MotionActionButton
                  className={component === item ? 'selected' : ''}
                  key={item}
                  onClick={() => selectComponent(item)}
                  type="button"
                >
                  {componentLabels[item]}
                </MotionActionButton>
              ))}
            </div>
          </div>

          <div className="editor-option-group">
            <span>Dimension</span>
            <div>
              {getDefinedDimensions().map((item) => {
                const isAvailable =
                  getMappingsForDimension(component, item).length > 0;

                return (
                  <MotionActionButton
                    className={dimension === item ? 'selected' : ''}
                    disabled={!isAvailable}
                    key={item}
                    onClick={() => selectDimension(item)}
                    type="button"
                  >
                    {dimensionLabels[item]}
                  </MotionActionButton>
                );
              })}
            </div>
          </div>

          <div className="editor-option-group">
            <span>Subkategorie</span>
            <div>
              {getDefinedSubcategoriesForDimension(dimension).map((item) => {
                const isAvailable = isSupportedCombination(
                  component,
                  dimension,
                  item,
                );

                return (
                  <MotionActionButton
                    className={subcategory === item ? 'selected' : ''}
                    disabled={!isAvailable}
                    key={item}
                    onClick={() => selectSubcategory(item)}
                    type="button"
                  >
                    {subcategoryLabels[item]}
                  </MotionActionButton>
                );
              })}
            </div>
          </div>

          <div className="editor-metadata">
            <p>Eintrag-Metadaten</p>
            <div>
              <span>ID</span>
              <strong>{entry.id}</strong>
            </div>
            <div>
              <span>Zeichentyp</span>
              <strong>{signTypeLabels[entry.rationale.signType]}</strong>
            </div>
            <div>
              <span>Validierung</span>
              <strong>
                {validationReport.errors.length === 0
                  ? 'OK'
                  : `${validationReport.errors.length} Fehler`}
              </strong>
            </div>
          </div>
        </aside>

        <section className="editor-panel editor-preview-panel">
          <div className="editor-panel-header">
            <p className="editor-panel-title">Vorschau</p>
          </div>

          <div className="editor-stage">
            <span className="editor-stage-hint">
              {componentLabels[entry.component]} ·{' '}
              {subcategoryLabels[entry.subcategory]}
            </span>
            <EditorPreview entry={entry} replayKey={replayKey} />
          </div>

          <MotionActionButton
            className="editor-replay-button"
            onClick={() => setReplayKey((current) => current + 1)}
            type="button"
          >
            Wiederholen
          </MotionActionButton>

          <div className="editor-parameter-grid">
            {getEditorParameterRows(entry).map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </section>

        <aside className="editor-detail-column">
          <section className="editor-panel editor-rationale-panel">
            <div className="editor-panel-header">
              <p className="editor-panel-title">Semantische Begründung</p>
              <div className="editor-rationale-tools">
                <span
                  className={[
                    'editor-sign-badge',
                    getSignClass(entry.rationale.signType),
                  ].join(' ')}
                >
                  {signTypeLabels[entry.rationale.signType]}
                </span>
                <div className="editor-source-tooltip-wrap">
                  <MotionActionButton
                    aria-label="Theoretische Begründung anzeigen"
                    className="editor-source-tooltip-trigger"
                    type="button"
                  >
                    ?
                  </MotionActionButton>
                  <div className="editor-source-tooltip" role="tooltip">
                    {entry.rationale.source}
                  </div>
                </div>
              </div>
            </div>
            <p>{entry.rationale.short}</p>

            <div className="editor-sign-group">
              {(['icon', 'index', 'symbol'] as const).map((signType) => (
                <span
                  className={
                    entry.rationale.signType.includes(signType)
                      ? 'selected'
                      : ''
                  }
                  key={signType}
                >
                  {signTypeLabels[signType]}
                </span>
              ))}
            </div>
          </section>

          <EditorExportPanel entry={entry} />
        </aside>
      </section>
    </main>
  );
}

export default Editor;

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import MotionActionButton from '../components/MotionActionButton';
import SourceTooltip from '../components/SourceTooltip';
import EditorExportPanel from '../editor/export/EditorExportPanel';
import SemanticContextPanel from '../editor/SemanticContextPanel';
import EditorPreview from '../editor/preview/EditorPreview';
import { getPreviewChoreography } from '../editor/preview/previewChoreography';
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
import {
  componentLabels,
  dimensionLabels,
  getSignClass,
  signTypeLabels,
  subcategoryLabels,
} from '../framework/displayLabels';
import type { ComponentId, Dimension, Subcategory } from '../framework/types';
import { validateMappingDatabase } from '../framework/validation';
import { getEditorParameterRows } from '../editor/editorLabels';

const defaultComponent: ComponentId = 'button';

export type EditorSelection = {
  component: ComponentId;
  dimension: Dimension;
  subcategory: Subcategory;
};

type EditorProps = {
  selection: EditorSelection;
  onSelectionChange: (selection: EditorSelection) => void;
  showSemanticContext: boolean;
};

type MobilePicker = 'component' | 'dimension' | 'subcategory';

function getFirstDimension(component: ComponentId) {
  return getDimensionsForComponent(component)[0] ?? 'feedback';
}

function getFirstSubcategory(component: ComponentId, dimension: Dimension) {
  return (
    getSubcategoriesForDimension(component, dimension)[0] ??
    getDefinedSubcategoriesForDimension(dimension)[0]
  );
}

function getReplayCooldownMs(
  entry: NonNullable<ReturnType<typeof getMapping>>,
) {
  const phases = entry.params.motionPhases;
  const choreography = getPreviewChoreography(entry);
  const animationDuration =
    phases !== undefined
      ? phases.reduce(
          (sum, phase) => sum + phase.duration + (phase.delay ?? 0),
          0,
        )
      : entry.params.duration;

  return Math.min(
    Math.max(animationDuration + choreography.holdInitialMs + 120, 420),
    1400,
  );
}

export const defaultEditorSelection: EditorSelection = {
  component: defaultComponent,
  dimension: getFirstDimension(defaultComponent),
  subcategory: getFirstSubcategory(
    defaultComponent,
    getFirstDimension(defaultComponent),
  ),
};

function Editor({
  selection,
  onSelectionChange,
  showSemanticContext,
}: EditorProps) {
  const [replayKey, setReplayKey] = useState(0);
  const [isReplayCoolingDown, setIsReplayCoolingDown] = useState(false);
  const [openMobilePicker, setOpenMobilePicker] = useState<MobilePicker | null>(
    null,
  );
  const replayCooldownRef = useRef<number | null>(null);
  const { component, dimension, subcategory } = selection;

  const validationReport = useMemo(() => validateMappingDatabase(), []);
  const selectedEntry = getMapping({ component, dimension, subcategory });
  const entry =
    selectedEntry ??
    getMapping({
      component: defaultComponent,
      dimension: 'feedback',
      subcategory: 'success',
    });

  const clearReplayCooldown = () => {
    if (replayCooldownRef.current !== null) {
      window.clearTimeout(replayCooldownRef.current);
      replayCooldownRef.current = null;
    }
  };

  useEffect(() => {
    setIsReplayCoolingDown(false);
    clearReplayCooldown();

    return clearReplayCooldown;
  }, [entry?.id]);

  if (!entry) {
    return <main className="main-content empty-page" />;
  }

  const replayAnimation = () => {
    if (isReplayCoolingDown) {
      return;
    }

    setReplayKey((current) => current + 1);
    setIsReplayCoolingDown(true);
    clearReplayCooldown();
    replayCooldownRef.current = window.setTimeout(() => {
      setIsReplayCoolingDown(false);
      replayCooldownRef.current = null;
    }, getReplayCooldownMs(entry));
  };

  const selectComponent = (nextComponent: ComponentId) => {
    const nextDimension = getFirstDimension(nextComponent);
    const nextSubcategory = getFirstSubcategory(nextComponent, nextDimension);

    onSelectionChange({
      component: nextComponent,
      dimension: nextDimension,
      subcategory: nextSubcategory,
    });
    setOpenMobilePicker(null);
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
    setOpenMobilePicker(null);
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
    setOpenMobilePicker(null);
  };

  const toggleMobilePicker = (picker: MobilePicker) => {
    setOpenMobilePicker((current) => (current === picker ? null : picker));
  };

  return (
    <main className="main-content editor-page">
      <section className="editor-grid">
        <aside className="editor-panel editor-selection-panel">
          <p className="editor-panel-title">Auswahl</p>

          <div
            className={[
              'editor-option-group',
              openMobilePicker === 'component' ? 'mobile-open' : '',
            ].join(' ')}
          >
            <button
              aria-controls="editor-component-options"
              aria-expanded={openMobilePicker === 'component'}
              className="editor-option-summary"
              onClick={() => toggleMobilePicker('component')}
              type="button"
            >
              <span>Komponente</span>
              <strong>{componentLabels[component]}</strong>
            </button>
            <span className="editor-option-label">Komponente</span>
            <div className="editor-option-list" id="editor-component-options">
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

          <div
            className={[
              'editor-option-group',
              openMobilePicker === 'dimension' ? 'mobile-open' : '',
            ].join(' ')}
          >
            <button
              aria-controls="editor-dimension-options"
              aria-expanded={openMobilePicker === 'dimension'}
              className="editor-option-summary"
              onClick={() => toggleMobilePicker('dimension')}
              type="button"
            >
              <span>Dimension</span>
              <strong>{dimensionLabels[dimension]}</strong>
            </button>
            <span className="editor-option-label">Dimension</span>
            <div className="editor-option-list" id="editor-dimension-options">
              {getDefinedDimensions().map((item) => {
                const isAvailable =
                  getMappingsForDimension(component, item).length > 0;

                return (
                  <span
                    key={item}
                    {...(!isAvailable && {
                      'data-disabled-reason': `Für ${componentLabels[component]} ist diese Dimension im Framework nicht modelliert.`,
                    })}
                  >
                    <MotionActionButton
                      className={dimension === item ? 'selected' : ''}
                      disabled={!isAvailable}
                      onClick={() => selectDimension(item)}
                      type="button"
                    >
                      {dimensionLabels[item]}
                    </MotionActionButton>
                  </span>
                );
              })}
            </div>
          </div>

          <div
            className={[
              'editor-option-group',
              openMobilePicker === 'subcategory' ? 'mobile-open' : '',
            ].join(' ')}
          >
            <button
              aria-controls="editor-subcategory-options"
              aria-expanded={openMobilePicker === 'subcategory'}
              className="editor-option-summary"
              onClick={() => toggleMobilePicker('subcategory')}
              type="button"
            >
              <span>Subkategorie</span>
              <strong>{subcategoryLabels[subcategory]}</strong>
            </button>
            <span className="editor-option-label">Subkategorie</span>
            <div className="editor-option-list" id="editor-subcategory-options">
              {getDefinedSubcategoriesForDimension(dimension).map((item) => {
                const isAvailable = isSupportedCombination(
                  component,
                  dimension,
                  item,
                );

                return (
                  <span
                    key={item}
                    {...(!isAvailable && {
                      'data-disabled-reason':
                        'Diese Kombination liegt außerhalb des Framework-Scopes.',
                    })}
                  >
                    <MotionActionButton
                      className={subcategory === item ? 'selected' : ''}
                      disabled={!isAvailable}
                      onClick={() => selectSubcategory(item)}
                      type="button"
                    >
                      {subcategoryLabels[item]}
                    </MotionActionButton>
                  </span>
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
            disabled={isReplayCoolingDown}
            onClick={replayAnimation}
            successFeedback={false}
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
                <SourceTooltip
                  id={`editor-source-${entry.id}`}
                  label="Theoretische Begründung anzeigen"
                  source={entry.rationale.source}
                />
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

          <AnimatePresence initial={false}>
            {showSemanticContext && (
              <SemanticContextPanel
                key="semantic-context"
                semanticContext={entry.rationale.semanticContext}
              />
            )}
          </AnimatePresence>

          <EditorExportPanel entry={entry} />
        </aside>
      </section>
    </main>
  );
}

export default Editor;

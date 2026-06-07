import { motion, useAnimationControls, useReducedMotion } from 'framer-motion';
import { useEffect } from 'react';
import type { MappingEntry } from '../../framework/types';
import { subcategoryLabels } from '../editorLabels';
import { playInputPreviewAnimation } from './inputMotionAdapter';
import { playMappingAnimation } from './motionAdapter';

type EditorPreviewProps = {
  entry: MappingEntry;
  replayKey: number;
};

type MotionControls = ReturnType<typeof useAnimationControls>;

function PreviewButton({
  controls,
  entry,
}: {
  controls: MotionControls;
  entry: MappingEntry;
}) {
  return (
    <div className="editor-preview-actions">
      <motion.button
        animate={controls}
        className="editor-preview-button"
        type="button"
      >
        {entry.subcategory === 'error' ? 'Eingabe prüfen' : 'Absenden'}
      </motion.button>
      <button className="editor-preview-button secondary" type="button">
        Abbrechen
      </button>
    </div>
  );
}

function PreviewToggle({
  controls,
  entry,
}: {
  controls: MotionControls;
  entry: MappingEntry;
}) {
  return (
    <div className="editor-preview-toggle-wrap">
      <div className="editor-preview-toggle" aria-hidden="true">
        <motion.span animate={controls} />
      </div>
      <span>{subcategoryLabels[entry.subcategory]}</span>
    </div>
  );
}

function PreviewToast({
  controls,
  entry,
}: {
  controls: MotionControls;
  entry: MappingEntry;
}) {
  return (
    <motion.div animate={controls} className="editor-preview-toast">
      <strong>{subcategoryLabels[entry.subcategory]}</strong>
      <span>
        {entry.dimension === 'attention'
          ? 'Neue Information liegt vor.'
          : 'Aktion wurde verarbeitet.'}
      </span>
    </motion.div>
  );
}

function PreviewModal({
  controls,
  entry,
}: {
  controls: MotionControls;
  entry: MappingEntry;
}) {
  return (
    <motion.div animate={controls} className="editor-preview-modal">
      <strong>
        {entry.dimension === 'direction' ? 'Neue Ebene' : 'Dialog'}
      </strong>
      <span>{subcategoryLabels[entry.subcategory]}</span>
      <button type="button">Bestätigen</button>
    </motion.div>
  );
}

function PreviewInput({
  entry,
  reducedMotion,
  replayKey,
}: EditorPreviewProps & { reducedMotion: boolean }) {
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
    <motion.div animate={containerControls} className="editor-preview-input">
      <motion.label animate={labelControls} htmlFor="editor-preview-input">
        {subcategoryLabels[entry.subcategory]}
      </motion.label>
      <motion.input
        animate={fieldControls}
        id="editor-preview-input"
        readOnly
        value={
          entry.subcategory === 'requiredField'
            ? ''
            : entry.subcategory === 'error'
              ? 'ungueltige-eingabe'
              : 'semantic-motion'
        }
      />
      <motion.span animate={messageControls} className="editor-input-message">
        {entry.subcategory === 'success'
          ? 'Eingabe valide'
          : entry.subcategory === 'requiredField'
            ? 'Pflichtfeld'
            : 'Eingabe prüfen'}
      </motion.span>
    </motion.div>
  );
}

function PreviewSkeleton({
  entry,
  reducedMotion,
  replayKey,
}: EditorPreviewProps & { reducedMotion: boolean }) {
  const isLoading = entry.subcategory === 'loading';
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
    <motion.div animate={containerControls} className="editor-preview-skeleton">
      {['wide', 'mid', 'short'].map((variant) => (
        <span className={`editor-skeleton-line ${variant}`} key={variant}>
          {isLoading ? (
            <motion.span
              animate={shimmerControls}
              className="editor-skeleton-shimmer"
            />
          ) : null}
        </span>
      ))}
    </motion.div>
  );
}

function GenericPreview({
  entry,
  reducedMotion,
  replayKey,
}: EditorPreviewProps & { reducedMotion: boolean }) {
  const controls = useAnimationControls();

  useEffect(() => {
    void playMappingAnimation(entry, controls, { reducedMotion });
  }, [controls, entry, reducedMotion, replayKey]);

  if (entry.component === 'button') {
    return <PreviewButton controls={controls} entry={entry} />;
  }

  if (entry.component === 'toggle') {
    return <PreviewToggle controls={controls} entry={entry} />;
  }

  if (entry.component === 'toast') {
    return <PreviewToast controls={controls} entry={entry} />;
  }

  if (entry.component === 'modal') {
    return <PreviewModal controls={controls} entry={entry} />;
  }

  return null;
}

function EditorPreview({ entry, replayKey }: EditorPreviewProps) {
  const shouldReduceMotion = useReducedMotion();
  const reducedMotion = shouldReduceMotion === true;

  if (entry.component === 'input') {
    return (
      <PreviewInput
        entry={entry}
        reducedMotion={reducedMotion}
        replayKey={replayKey}
      />
    );
  }

  if (entry.component === 'skeleton') {
    return (
      <PreviewSkeleton
        entry={entry}
        reducedMotion={reducedMotion}
        replayKey={replayKey}
      />
    );
  }

  return (
    <GenericPreview
      entry={entry}
      reducedMotion={reducedMotion}
      replayKey={replayKey}
    />
  );
}

export default EditorPreview;

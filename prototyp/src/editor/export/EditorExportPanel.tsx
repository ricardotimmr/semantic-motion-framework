import { useEffect, useMemo, useState } from 'react';
import MotionActionButton from '../../components/MotionActionButton';
import type { MappingEntry } from '../../framework/types';
import { generateExportBundle } from './exportGenerators';

type ExportMode = 'framerMotion' | 'css';

type EditorExportPanelProps = {
  entry: MappingEntry;
};

const exportModes: Array<{ id: ExportMode; label: string }> = [
  { id: 'framerMotion', label: 'Framer Motion' },
  { id: 'css', label: 'CSS' },
];

function getCssExportNotices(cssCode: string) {
  return cssCode
    .split('\n')
    .filter((line) => line.includes('Hinweis:'))
    .map((line) => line.replace(/^\/\*\s?/, '').replace(/\s?\*\/$/, ''));
}

function EditorExportPanel({ entry }: EditorExportPanelProps) {
  const [activeMode, setActiveMode] = useState<ExportMode>('framerMotion');
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>(
    'idle',
  );
  const exportBundle = useMemo(() => generateExportBundle(entry), [entry]);
  const code = exportBundle[activeMode];
  const cssNotices = useMemo(
    () =>
      activeMode === 'css'
        ? getCssExportNotices(exportBundle.css)
        : [],
    [activeMode, exportBundle.css],
  );

  useEffect(() => {
    setCopyState('idle');
  }, [activeMode, entry.id]);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyState('copied');
    } catch {
      setCopyState('error');
    }
  };

  return (
    <section className="editor-panel editor-export-panel">
      <div className="editor-panel-header">
        <p className="editor-panel-title">Code-Export</p>
        <span>{activeMode === 'framerMotion' ? 'Motion' : 'CSS'}</span>
      </div>

      <div className="editor-export-tabs" role="tablist">
        {exportModes.map((mode) => (
          <MotionActionButton
            aria-selected={activeMode === mode.id}
            className={activeMode === mode.id ? 'selected' : ''}
            key={mode.id}
            onClick={() => setActiveMode(mode.id)}
            role="tab"
            type="button"
          >
            {mode.label}
          </MotionActionButton>
        ))}
      </div>

      {cssNotices.length > 0 ? (
        <div className="editor-export-notices">
          {cssNotices.map((notice) => (
            <p key={notice}>{notice}</p>
          ))}
        </div>
      ) : null}

      <pre>{code}</pre>

      <div className="editor-export-actions">
        <MotionActionButton
          className="editor-copy-button"
          onClick={copyCode}
          type="button"
        >
          Code kopieren
        </MotionActionButton>
        <span aria-live="polite">
          {copyState === 'copied'
            ? 'Kopiert'
            : copyState === 'error'
              ? 'Kopieren nicht möglich'
              : ''}
        </span>
      </div>
    </section>
  );
}

export default EditorExportPanel;

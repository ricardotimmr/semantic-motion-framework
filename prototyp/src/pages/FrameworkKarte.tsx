import { mappings } from '../data/mappings';
import { DIMENSIONS } from '../framework/types';
import MotionActionButton from '../components/MotionActionButton';
import type { Dimension, MappingEntry, SignType } from '../framework/types';

const dimensionMeta: Record<Dimension, { label: string; subtitle: string }> = {
  feedback: {
    label: 'Feedback',
    subtitle: 'Reaktion auf eine abgeschlossene Nutzeraktion',
  },
  stateChange: {
    label: 'Zustandswechsel',
    subtitle: 'Übergang zwischen gleichwertigen Zuständen',
  },
  direction: {
    label: 'Richtung',
    subtitle: 'Navigation mit räumlicher Vorwärts- oder Rückwärtslogik',
  },
  hierarchy: {
    label: 'Hierarchie',
    subtitle: 'Elemente treten in den Vordergrund oder verlieren Priorität',
  },
  attention: {
    label: 'Aufmerksamkeit',
    subtitle: 'Systeminitiiertes Signal ohne direkte Nutzeraktion',
  },
};

const componentLabels: Record<MappingEntry['component'], string> = {
  button: 'Button',
  toggle: 'Toggle',
  toast: 'Toast',
  modal: 'Modal',
  input: 'Input',
  skeleton: 'Skeleton',
};

const subcategoryLabels: Record<MappingEntry['subcategory'], string> = {
  success: 'Erfolg',
  error: 'Fehler',
  warning: 'Warnung',
  toggleOn: 'An',
  toggleOff: 'Aus',
  focus: 'Fokus',
  blur: 'Blur',
  enter: 'Enter',
  exit: 'Exit',
  backEnter: 'Back Enter',
  backExit: 'Back Exit',
  toForeground: 'Vordergrund',
  toBackground: 'Hintergrund',
  oneShot: 'Einmalig',
  persistent: 'Persistent',
  requiredField: 'Pflichtfeld',
  loading: 'Loading',
  resolved: 'Resolved',
};

const signTypeLabels: Record<SignType, string> = {
  icon: 'Ikon',
  index: 'Index',
  symbol: 'Symbol',
  'icon/index': 'Ikon/Index',
};

function getSignClass(signType: SignType) {
  if (signType === 'symbol') {
    return 'symbol';
  }

  if (signType === 'icon') {
    return 'icon';
  }

  return 'index';
}

function formatIteration(iterations: number | typeof Infinity | undefined) {
  if (!iterations || iterations === 1) {
    return null;
  }

  if (iterations === Infinity) {
    return 'Endlos';
  }

  return `${iterations}x`;
}

function formatEasing(entry: MappingEntry) {
  const { easing } = entry.params;

  if ('preset' in easing) {
    return easing.preset;
  }

  return 'cubic-bezier';
}

function getMovementLabel(entry: MappingEntry) {
  const { params } = entry;

  if (params.motionPhases) {
    return `${params.motionPhases.length} Phasen`;
  }

  if (params.scaleMode) {
    return params.scaleMode === 'pulse'
      ? 'Scale-Pulse'
      : params.scaleMode === 'scaleIn'
        ? 'Scale-In'
        : 'Scale-Out';
  }

  if (params.translatePx !== undefined) {
    return `${params.direction ?? 'x'} ${params.translatePx}px`;
  }

  if (params.translateDistance) {
    const edge = params.translateFrom ?? params.translateTo;
    return `${params.direction ?? 'x'} ${edge ?? params.translateDistance}`;
  }

  if (params.trackFactor !== undefined) {
    return 'Track';
  }

  if (params.opacity || params.opacityKeyframes) {
    return 'Opacity';
  }

  return 'Renderer';
}

function getParameterSummary(entry: MappingEntry) {
  const { params } = entry;
  const parts = [
    `${params.duration}ms`,
    formatEasing(entry),
    getMovementLabel(entry),
    formatIteration(params.iterations),
  ].filter(Boolean);

  if (entry.accessibility && entry.accessibility.reducedMotion !== 'none') {
    parts.push('Reduced Motion');
  }

  return parts.join(' · ');
}

function FrameworkKarte() {
  return (
    <main className="main-content framework-map-page">
      <section className="framework-map-header">
        <p className="eyebrow">Übersicht des Klassifikationssystems</p>
        <h1>
          Das <em>vollständige</em> Mapping.
        </h1>
        <p>
          Alle {mappings.length} Einträge des Semantic Motion Frameworks,
          gruppiert nach Bedeutungsdimension. Die Karte zeigt Komponente,
          semantische Kurzbegründung, Schlüsselparameter und Peirce-Zeichentyp.
        </p>
      </section>

      <section className="framework-map-stats" aria-label="Framework-Kennzahlen">
        <div>
          <strong>{mappings.length}</strong>
          <span>Mapping-Einträge</span>
        </div>
        <div>
          <strong>{DIMENSIONS.length}</strong>
          <span>Bedeutungsdimensionen</span>
        </div>
      </section>

      <section className="framework-map-body" aria-label="Mapping-Übersicht">
        {DIMENSIONS.map((dimension) => {
          const entries = mappings.filter((entry) => entry.dimension === dimension);
          const meta = dimensionMeta[dimension];

          return (
            <article className="framework-map-row" key={dimension}>
              <div className="framework-map-dimension">
                <h2>{meta.label}</h2>
                <p>{meta.subtitle}</p>
                <span>{entries.length} Einträge</span>
              </div>

              <div className="framework-map-entries">
                {entries.map((entry) => (
                  <div className="framework-map-entry" key={entry.id}>
                    <div className="framework-map-entry-head">
                      <span>
                        {componentLabels[entry.component]} ·{' '}
                        {subcategoryLabels[entry.subcategory]}
                      </span>
                      <span
                        className={[
                          'framework-map-sign',
                          getSignClass(entry.rationale.signType),
                        ].join(' ')}
                      >
                        {signTypeLabels[entry.rationale.signType]}
                      </span>
                    </div>
                    <p>{entry.rationale.short}</p>
                    <div className="framework-map-entry-foot">
                      <div className="framework-map-param">
                        {getParameterSummary(entry)}
                      </div>
                      <span className="framework-map-source">
                        <MotionActionButton
                          aria-label={`Wissenschaftliche Begründung für ${componentLabels[entry.component]} ${subcategoryLabels[entry.subcategory]}`}
                          type="button"
                        >
                          ?
                        </MotionActionButton>
                        <span className="framework-map-tooltip" role="tooltip">
                          {entry.rationale.source}
                        </span>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}

export default FrameworkKarte;

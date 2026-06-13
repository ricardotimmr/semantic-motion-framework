import {
  motion,
  useReducedMotion,
  type Transition,
  type Variants,
} from 'framer-motion';
import type { SemanticContext, VisualCueId } from '../framework/types';
import { lucidePlaceholderByVisualCueId } from '../framework/visualCues';

type SemanticContextPanelProps = {
  semanticContext: SemanticContext;
};

const visualCueLabels: Record<VisualCueId, string> = {
  refusalGesture: 'Ablehnungsgeste',
  pulseSignal: 'Bedeutungsimpuls',
  toggleTravel: 'Schalterbewegung',
  arrival: 'Ankunft',
  departure: 'Verlassen',
  nudgeSignal: 'Hinweisstoß',
  returnLayer: 'Rückkehrende Ebene',
  foreground: 'Vordergrund',
  backgroundRecede: 'Zurücktreten',
  focusSignal: 'Fokussignal',
  helperMessage: 'Hilfstext',
  shimmerSignal: 'Shimmer',
  fadeResolve: 'Auflösung',
};

const visualCueMarks: Record<VisualCueId, string> = {
  refusalGesture: 'NO',
  pulseSignal: '))',
  toggleTravel: 'ON',
  arrival: 'IN',
  departure: 'OUT',
  nudgeSignal: '!',
  returnLayer: '<-',
  foreground: 'FG',
  backgroundRecede: 'BG',
  focusSignal: '[]',
  helperMessage: '?',
  shimmerSignal: '//',
  fadeResolve: '..',
};

const semanticContextVariants: Variants = {
  hidden: { height: 0, opacity: 0 },
  visible: { height: 'auto', opacity: 1 },
};

const semanticContextTransition: Transition = {
  height: {
    duration: 0.26,
    ease: [0.4, 0, 0.2, 1],
  },
  opacity: {
    duration: 0.16,
    ease: [0.4, 0, 0.2, 1],
  },
};

function getVisualCueList(visualCue: VisualCueId | VisualCueId[]) {
  return Array.isArray(visualCue) ? visualCue : [visualCue];
}

function SemanticContextPanel({ semanticContext }: SemanticContextPanelProps) {
  const visualCues = getVisualCueList(semanticContext.metaphor.visualCue);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className="semantic-context-motion-shell"
      animate={shouldReduceMotion ? { opacity: 1 } : 'visible'}
      exit={shouldReduceMotion ? { opacity: 0 } : 'hidden'}
      initial={shouldReduceMotion ? false : 'hidden'}
      transition={
        shouldReduceMotion ? { duration: 0 } : semanticContextTransition
      }
      variants={semanticContextVariants}
    >
      <section className="editor-panel editor-semantic-context-panel">
        <div className="editor-panel-header">
          <p className="editor-panel-title">Semantischer Möglichkeitsraum</p>
          <span className="semantic-context-field">
            rationale.semanticContext
          </span>
        </div>

        <div className="semantic-context-head">
          <div aria-label="Visuelle Cues" className="semantic-context-cues">
            {visualCues.map((cue) => {
              const placeholder = lucidePlaceholderByVisualCueId[cue];

              return (
                <span
                  aria-label={`${visualCueLabels[cue]} (${placeholder.lucideIcon})`}
                  className={`semantic-context-cue cue-${cue}`}
                  key={cue}
                  title={`${visualCueLabels[cue]} · Lucide-Platzhalter: ${placeholder.lucideIcon}`}
                >
                  <span aria-hidden="true">{visualCueMarks[cue]}</span>
                </span>
              );
            })}
          </div>

          <div className="semantic-context-metaphor">
            <span>Bildhafte Lesart</span>
            <strong>{semanticContext.metaphor.label}</strong>
          </div>
        </div>

        <p className="semantic-context-primary">
          <span>Primäre Lesart</span>
          {semanticContext.primaryReading}
        </p>

        <div
          aria-label="Angrenzende Lesarten"
          className="semantic-reading-chips"
        >
          {semanticContext.adjacentReadings.map((reading) => (
            <span key={reading}>{reading}</span>
          ))}
        </div>

        <details className="semantic-boundaries">
          <summary>Möglichkeitsraum und Abgrenzung</summary>
          <ul>
            {semanticContext.boundaries.map((boundary) => (
              <li key={boundary}>{boundary}</li>
            ))}
          </ul>
        </details>
      </section>
    </motion.div>
  );
}

export default SemanticContextPanel;

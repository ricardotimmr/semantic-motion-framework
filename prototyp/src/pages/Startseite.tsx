import { motion, useAnimationControls, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import MotionActionButton from '../components/MotionActionButton';
import type { PageId } from './pageTypes';

type EasingKey = 'easeOut' | 'easeIn' | 'sharp' | 'spring';

type EasingDemo = {
  label: string;
  curveLabel: string;
  curve: [number, number, number, number] | 'spring';
  path: string;
  message: string;
};

const githubUrl = 'https://github.com/ricardotimmr/semantic-motion-framework';
const documentationUrl =
  'https://github.com/ricardotimmr/semantic-motion-framework/wiki';

const easingDemos: Record<EasingKey, EasingDemo> = {
  easeOut: {
    label: 'Ease-out',
    curveLabel: 'schneller Start, sanftes Ausklingen',
    curve: [0, 0, 0.2, 1],
    path: 'M 16 94 C 32 18, 112 18, 224 16',
    message:
      'Ease-out startet schnell und klingt sanft aus. Im Framework markiert diese Kurve Ankommen, Abschluss und positive Rückmeldung.',
  },
  easeIn: {
    label: 'Ease-in',
    curveLabel: 'langsamer Start, klares Verlassen',
    curve: [0.75, 0, 1, 1],
    path: 'M 16 94 C 92 94, 162 92, 224 16',
    message:
      'Ease-in baut Bewegung auf und endet entschlossen. Es eignet sich für Exit-Animationen und Zustände, die den Fokus verlassen.',
  },
  sharp: {
    label: 'Sharp',
    curveLabel: 'abrupte Reaktion',
    curve: [0.4, 0, 0.6, 1],
    path: 'M 16 94 C 62 88, 120 22, 224 16',
    message:
      'Sharp wirkt direkt und mechanisch. Im Framework verstärkt es Error-Feedback, weil Ablehnung nicht weich oder angenehm wirken soll.',
  },
  spring: {
    label: 'Spring',
    curveLabel: 'physikalischer Überschwinger',
    curve: 'spring',
    path: 'M 16 94 C 48 10, 92 8, 126 22 C 154 34, 178 10, 224 16',
    message:
      'Spring nutzt Überschwingung als physikalisches Signal. Im Framework wird es über springConfig behandelt, nicht als normale cubic-bezier-Kurve.',
  },
};

const dimensions = [
  ['Feedback', 'Success · Error · Warning'],
  ['Zustandswechsel', 'Toggle · Fokus · Blur'],
  ['Richtung', 'Enter · Exit · Back'],
  ['Hierarchie', 'Vordergrund · Hintergrund'],
  ['Aufmerksamkeit', 'OneShot · Persistent · Loading'],
];

function sampleCubicBezier(
  curve: [number, number, number, number],
  progress: number,
) {
  const [x1, y1, x2, y2] = curve;

  const sample = (t: number, a: number, b: number) =>
    3 * a * t * (1 - t) * (1 - t) + 3 * b * t * t * (1 - t) + t * t * t;

  let low = 0;
  let high = 1;

  for (let i = 0; i < 16; i += 1) {
    const mid = (low + high) / 2;

    if (sample(mid, x1, x2) < progress) {
      low = mid;
    } else {
      high = mid;
    }
  }

  return sample((low + high) / 2, y1, y2);
}

function sampleSpring(progress: number) {
  if (progress >= 1) {
    return 1;
  }

  const damping = Math.exp(-5.2 * progress);
  const oscillation = Math.cos(13 * progress);

  return 1 - damping * oscillation;
}

function sampleDemoProgress(easing: EasingDemo, progress: number) {
  if (easing.curve === 'spring') {
    return sampleSpring(progress);
  }

  return sampleCubicBezier(easing.curve, progress);
}

type StartseiteProps = {
  onNavigate: (page: PageId) => void;
};

function Startseite({ onNavigate }: StartseiteProps) {
  const [selectedEasing, setSelectedEasing] = useState<EasingKey>('easeOut');
  const [playKey, setPlayKey] = useState(0);
  const [dotProgress, setDotProgress] = useState(0);
  const replayControls = useAnimationControls();
  const shouldReduceMotion = useReducedMotion();
  const easing = easingDemos[selectedEasing];
  const safeProgress = Math.min(Math.max(dotProgress, 0), 1.045);
  const dotLeft = `calc(${safeProgress * 100}% + ${3 - safeProgress * 22}px)`;

  const replayDemo = () => {
    setPlayKey((current) => current + 1);

    if (!shouldReduceMotion) {
      void replayControls.start({
        scale: [1, 1.05, 1],
        transition: {
          duration: 0.25,
          ease: [0, 0, 0.2, 1],
        },
      });
    }
  };

  useEffect(() => {
    let frame = 0;
    const duration = selectedEasing === 'spring' ? 1800 : 1700;
    const start = performance.now();

    setDotProgress(0);

    const tick = (now: number) => {
      const elapsed = Math.min((now - start) / duration, 1);
      setDotProgress(sampleDemoProgress(easing, elapsed));

      if (elapsed < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frame);
  }, [easing, playKey, selectedEasing]);

  return (
    <main className="main-content">
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Bachelorarbeit · Medieninformatik · TH Köln</p>
          <h1>
            UI-Animation mit
            <br />
            <em>begründeter</em>
            <br />
            Bedeutung.
          </h1>
          <p className="hero-text">
            Diese Arbeit entwickelt ein Klassifikationssystem für
            Interface-Animationen. Das Semantic Motion Framework ordnet
            Motion-Parameter wie Easing, Direction, Scale, Opacity und
            Motion-Phasen semantischen Bedeutungsdimensionen zu.
          </p>
          <div className="hero-actions">
            <MotionActionButton
              className="button-primary"
              onClick={() => onNavigate('editor')}
              type="button"
            >
              Editor öffnen
            </MotionActionButton>
            <a
              className="button-secondary"
              href={documentationUrl}
              target="_blank"
              rel="noreferrer"
            >
              Dokumentation
            </a>
          </div>
        </div>

        <div className="easing-card" aria-label="Easing-Demo">
          <div className="easing-card-head">
            <span>Easing als semantischer Träger</span>
            <div className="easing-tabs">
              {(Object.keys(easingDemos) as EasingKey[]).map((key) => (
                <MotionActionButton
                  className={
                    selectedEasing === key ? 'easing-tab active' : 'easing-tab'
                  }
                  key={key}
                  onClick={() => setSelectedEasing(key)}
                  type="button"
                >
                  {easingDemos[key].label}
                </MotionActionButton>
              ))}
            </div>
          </div>

          <div className="curve-area">
            <svg
              viewBox="0 0 240 110"
              role="img"
              aria-label={easing.curveLabel}
            >
              <line x1="16" y1="94" x2="224" y2="94" />
              <line x1="16" y1="94" x2="16" y2="16" />
              <path d={easing.path} />
              <circle cx="224" cy="16" r="3" />
              <circle cx="16" cy="94" r="3" />
            </svg>
          </div>

          <div className="motion-track">
            <span className="motion-dot" style={{ left: dotLeft }} />
          </div>

          <div className="easing-card-foot">
            <p>{easing.message}</p>
            <motion.button
              animate={replayControls}
              className="replay-button"
              type="button"
              onClick={replayDemo}
              whileHover={shouldReduceMotion ? undefined : { y: -1 }}
            >
              Abspielen
            </motion.button>
          </div>
          <p className="demo-note">
            Hinweis: Die Demo visualisiert die Kurven didaktisch verstärkt. Die
            produktiven Mapping-Werte sind in der Framework-Dokumentation
            definiert.
          </p>
        </div>
      </section>

      <section className="feature-grid" aria-label="Framework-Grundlagen">
        <article>
          <span>01</span>
          <h2>Semiotische Grundlage</h2>
          <p>
            Animationen werden als ikonische, indexikalische oder symbolische
            Zeichen klassifiziert. Der Zeichentyp erklärt, wodurch Bedeutung
            entsteht.
          </p>
        </article>
        <article>
          <span>02</span>
          <h2>Wahrnehmungspsychologie</h2>
          <p>
            Bewegung wird präattentiv verarbeitet. Dadurch können
            Motion-Parameter Aufmerksamkeit, Reaktion und Zustandswechsel
            vorbewusst strukturieren.
          </p>
        </article>
        <article>
          <span>03</span>
          <h2>Editor als Prototyp</h2>
          <p>
            Der Editor macht die Mapping-Logik zugänglich und erzeugt
            kommentierten Framer-Motion- und CSS-Code aus den aktuellen
            Framework-Einträgen.
          </p>
        </article>
      </section>

      <section className="dimension-band" aria-label="Bedeutungsdimensionen">
        <div className="section-label">Fünf Bedeutungsdimensionen</div>
        <div className="dimension-row">
          {dimensions.map(([name, sub]) => (
            <article className="dimension-item" key={name}>
              <h2>{name}</h2>
              <p>{sub}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="quote-section">
        <div>
          <p className="quote-text">
            Designer gestalten Bedeutungsangebote, nicht nur Formen. Motion wird
            damit zu einem Teil der semantischen Oberfläche.
          </p>
          <p className="quote-source">
            Angelehnt an Krippendorffs Semantic Turn
          </p>
        </div>
        <div className="stats-grid" aria-label="Framework-Kennzahlen">
          <div>
            <strong>6</strong>
            <span>Komponenten</span>
          </div>
          <div>
            <strong>5</strong>
            <span>Dimensionen</span>
          </div>
          <div>
            <strong>24</strong>
            <span>
              Mappings · theoretisch hergeleitet, nicht empirisch validiert
            </span>
          </div>
          <div>
            <strong>3</strong>
            <span>Peirce-Zeichentypen</span>
          </div>
        </div>
      </section>

      <footer className="page-footer">
        <span>Bachelorarbeit · TH Köln · Ricardo Timmr · 2026</span>
        <div>
          <a href={githubUrl} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={documentationUrl} target="_blank" rel="noreferrer">
            Dokumentation
          </a>
          <MotionActionButton
            className="footer-link-button"
            onClick={() => onNavigate('ueberDasProjekt')}
            type="button"
          >
            Über das Projekt
          </MotionActionButton>
        </div>
      </footer>
    </main>
  );
}

export default Startseite;

import { useMemo, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";

type AnimationId = "success" | "error";

type SemanticAnimation = {
  id: AnimationId;
  label: string;
  dimension: string;
  signType: string;
  durationMs: number;
  easingName: string;
  easingCurve: [number, number, number, number];
  previewLabel: string;
  rationale: string;
  source: string;
};

const animations: Record<AnimationId, SemanticAnimation> = {
  success: {
    id: "success",
    label: "Success Feedback",
    dimension: "Feedback / Success",
    signType: "Icon / Index",
    durationMs: 250,
    easingName: "easeOut",
    easingCurve: [0.0, 0.0, 0.2, 1.0],
    previewLabel: "Aktion speichern",
    rationale:
      "Die kurze Expansion signalisiert Abschluss und positive Rückmeldung. Das schnelle Abklingen lässt die Aktion beendet wirken, ohne den Button dauerhaft zu verändern.",
    source:
      "Hardcodierter POC-Wert aus dem Framework-Gedanken: Scale 1.0 -> 1.05 -> 1.0, Ease-Out, 250 ms.",
  },
  error: {
    id: "error",
    label: "Error Feedback",
    dimension: "Feedback / Error",
    signType: "Index",
    durationMs: 350,
    easingName: "sharp",
    easingCurve: [0.4, 0.0, 0.6, 1.0],
    previewLabel: "Eingabe prüfen",
    rationale:
      "Die horizontale Shake-Bewegung verweist auf Ablehnung. Sie wirkt abrupt und unterscheidet sich klar vom positiven Scale-Feedback.",
    source:
      "Hardcodierter POC-Wert aus dem Framework-Gedanken: x-Keyframes 0, -8, 8, -8, 8, -4, 0, Sharp-Easing, 350 ms.",
  },
};

export function App() {
  const controls = useAnimationControls();
  const [activeId, setActiveId] = useState<AnimationId>("success");
  const [playCount, setPlayCount] = useState(0);

  const activeAnimation = animations[activeId];

  const easingCurveText = useMemo(
    () => `[${activeAnimation.easingCurve.join(", ")}]`,
    [activeAnimation.easingCurve],
  );

  async function play(animationId: AnimationId) {
    const animation = animations[animationId];
    setActiveId(animationId);
    setPlayCount((current) => current + 1);

    await controls.set({ scale: 1, x: 0 });

    if (animationId === "success") {
      await controls.start({
        scale: [1, 1.05, 1],
        x: 0,
        transition: {
          duration: animation.durationMs / 1000,
          ease: animation.easingCurve,
          times: [0, 0.45, 1],
        },
      });
      return;
    }

    await controls.start({
      x: [0, -8, 8, -8, 8, -4, 0],
      scale: 1,
      transition: {
        duration: animation.durationMs / 1000,
        ease: animation.easingCurve,
        times: [0, 0.15, 0.3, 0.45, 0.6, 0.8, 1],
      },
    });
  }

  return (
    <main className="app-shell">
      <section className="intro">
        <div>
          <p className="eyebrow">POC 01 / Basis-Animationssystem</p>
          <h1>Semantisch unterscheidbare Button-Animationen</h1>
          <p className="intro-copy">
            Dieser Proof of Concept prüft, ob Framer Motion für einfache
            semantische UI-Animationen geeignet ist. Die Werte sind bewusst
            hardcodiert: kein Mapping-System, keine dynamische Datenbank.
          </p>
        </div>
        <div className="decision-box">
          <p className="box-label">Technische Entscheidung</p>
          <p>
            Der POC nutzt direkte `animate`-Controls statt Varianten. Das passt
            gut zum späteren Mapping-System, weil ein Mapping-Eintrag direkt in
            eine Animation übersetzt werden kann.
          </p>
        </div>
      </section>

      <section className="workspace" aria-label="Animationsvorschau">
        <aside className="selector">
          <p className="panel-title">Animation</p>
          {(Object.keys(animations) as AnimationId[]).map((animationId) => {
            const animation = animations[animationId];
            return (
              <button
                className={
                  activeId === animationId
                    ? "selector-button active"
                    : "selector-button"
                }
                key={animation.id}
                onClick={() => void play(animationId)}
                type="button"
              >
                <span>{animation.label}</span>
                <small>{animation.dimension}</small>
              </button>
            );
          })}
        </aside>

        <section className="preview-panel">
          <p className="panel-title">Preview</p>
          <div className="stage">
            <motion.button
              animate={controls}
              className={
                activeId === "error" ? "demo-button error" : "demo-button"
              }
              initial={{ scale: 1, x: 0 }}
              onClick={() => void play(activeId)}
              type="button"
            >
              {activeAnimation.previewLabel}
            </motion.button>
            <button
              className="replay-button"
              onClick={() => void play(activeId)}
              type="button"
            >
              Replay
            </button>
          </div>

          <dl className="params">
            <div>
              <dt>Easing</dt>
              <dd>{activeAnimation.easingName}</dd>
            </div>
            <div>
              <dt>Curve</dt>
              <dd>{easingCurveText}</dd>
            </div>
            <div>
              <dt>Duration</dt>
              <dd>{activeAnimation.durationMs} ms</dd>
            </div>
            <div>
              <dt>Runs</dt>
              <dd>{playCount}</dd>
            </div>
          </dl>
        </section>

        <aside className="rationale">
          <p className="panel-title">Begründung</p>
          <span className="badge">{activeAnimation.signType}</span>
          <h2>{activeAnimation.label}</h2>
          <p>{activeAnimation.rationale}</p>
          <div className="source-note">{activeAnimation.source}</div>
        </aside>
      </section>
    </main>
  );
}

import {
  EASING_CURVES,
  type EasingValue,
  type MappingEntry,
  type MotionPhase,
  type TranslationEdge,
} from "../../framework/types";

type Axis = "x" | "y";

type TransformParts = {
  x?: string;
  y?: string;
  scale?: string;
};

type ScaleAnimation =
  | {
      type: "pulse";
      initial: number;
      animate: number[];
      times: number[];
    }
  | {
      type: "scaleIn" | "scaleOut";
      initial: number;
      animate: number;
    };

function toPascalCase(value: string) {
  return value
    .split(/[-\s]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function toCamelCase(value: string) {
  const pascal = toPascalCase(value);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

function formatArray(values: readonly number[]) {
  return `[${values.join(", ")}]`;
}

function formatMotionArray(values: readonly (number | string)[]) {
  return `[${values
    .map((value) => (typeof value === "string" ? `"${value}"` : String(value)))
    .join(", ")}]`;
}

function formatMotionValue(value: number | string | readonly number[]) {
  if (Array.isArray(value)) {
    return formatArray(value);
  }

  return typeof value === "string" ? `"${value}"` : String(value);
}

function formatPercent(value: number) {
  return Number(value.toFixed(4));
}

function formatEasingValue(easing: EasingValue) {
  if ("preset" in easing) {
    return EASING_CURVES[easing.preset];
  }

  return easing.cubicBezier;
}

function formatFramerEase(easing: EasingValue) {
  if (isSpringEasing(easing)) {
    return null;
  }

  return formatArray(formatEasingValue(easing));
}

function formatCssEase(easing: EasingValue) {
  const curve = formatEasingValue(easing);
  return `cubic-bezier(${curve.join(", ")})`;
}

function isSpringEasing(easing: EasingValue) {
  return "preset" in easing && easing.preset === "spring";
}

function getAxis(entry: MappingEntry): Axis {
  return entry.params.direction ?? "y";
}

function getAxisProperty(axis: Axis) {
  return axis;
}

function edgeToPercent(edge: TranslationEdge) {
  switch (edge) {
    case "left":
      return "-100%";
    case "right":
      return "100%";
    case "top":
      return "-100%";
    case "bottom":
      return "100%";
  }
}

function phaseAxis(phase: MotionPhase): Axis {
  return phase.direction ?? "y";
}

function phaseEasing(entry: MappingEntry, phase: MotionPhase) {
  return phase.easing ?? entry.params.easing;
}

function hasPhaseSpecificEasing(entry: MappingEntry) {
  return entry.params.motionPhases?.some((phase) => phase.easing !== undefined) ?? false;
}

function usesSpringEasing(entry: MappingEntry) {
  if (isSpringEasing(entry.params.easing)) {
    return true;
  }

  return entry.params.motionPhases?.some((phase) => {
    return phase.easing !== undefined && isSpringEasing(phase.easing);
  }) ?? false;
}

function phaseSpringConfig(entry: MappingEntry, phase: MotionPhase) {
  return phase.springConfig ?? entry.params.springConfig;
}

function phaseTimes(phase: MotionPhase) {
  return (
    phase.keyframes?.times ??
    phase.scaleKeyframes?.times ??
    phase.opacityKeyframes?.times
  );
}

function phaseAnimationDuration(entry: MappingEntry) {
  const phases = entry.params.motionPhases;

  if (phases === undefined) {
    return entry.params.duration;
  }

  return phases.reduce(
    (sum, phase) => sum + phase.duration + (phase.delay ?? 0),
    0,
  );
}

function transformString(parts: TransformParts) {
  const transforms = [
    parts.x !== undefined ? `translateX(${parts.x})` : null,
    parts.y !== undefined ? `translateY(${parts.y})` : null,
    parts.scale !== undefined ? `scale(${parts.scale})` : null,
  ].filter(Boolean);

  return transforms.length > 0 ? transforms.join(" ") : "none";
}

function getScaleAnimation(entry: MappingEntry): ScaleAnimation | null {
  const { scaleFactor, scaleMode } = entry.params;

  if (scaleFactor === undefined) {
    return null;
  }

  switch (scaleMode) {
    case "scaleIn":
      return {
        type: "scaleIn",
        initial: 1 - scaleFactor,
        animate: 1,
      };
    case "scaleOut":
      return {
        type: "scaleOut",
        initial: 1,
        animate: 1 - scaleFactor,
      };
    case "pulse":
      return {
        type: "pulse",
        initial: 1,
        animate: [1, 1 + scaleFactor, 1],
        times: [0, 0.45, 1],
      };
    default:
      return null;
  }
}

function sourceComment(entry: MappingEntry, prefix: "//" | "/*") {
  if (prefix === "//") {
    return [
      `// Semantic Motion Framework - ${entry.id}`,
      `// Zeichentyp: ${entry.rationale.signType}`,
      `// Bedeutung: ${entry.rationale.short}`,
      `// Quelle: ${entry.rationale.source}`,
    ].join("\n");
  }

  return [
    `/* Semantic Motion Framework - ${entry.id} */`,
    `/* Zeichentyp: ${entry.rationale.signType} */`,
    `/* Bedeutung: ${entry.rationale.short} */`,
    `/* Quelle: ${entry.rationale.source} */`,
  ].join("\n");
}

function framerTransition(entry: MappingEntry, indent = "    ") {
  const { params } = entry;
  const times = params.keyframes?.times ?? params.opacityKeyframes?.times;

  if ("preset" in params.easing && params.easing.preset === "spring") {
    return [
      `${indent}transition: {`,
      `${indent}  type: "spring", // Spring-Easing muss physikalisch exportiert werden`,
      `${indent}  stiffness: ${params.springConfig?.stiffness ?? 100},`,
      `${indent}  damping: ${params.springConfig?.damping ?? 10},`,
      `${indent}  mass: ${params.springConfig?.mass ?? 1},`,
      `${indent}},`,
    ].join("\n");
  }

  return [
    `${indent}transition: {`,
    `${indent}  duration: ${params.duration / 1000}, // ${params.duration}ms aus dem Mapping`,
    `${indent}  ease: ${formatFramerEase(params.easing)}, // explizite cubicBezier-Kurve`,
    times !== undefined ? `${indent}  times: ${formatArray(times)},` : null,
    `${indent}},`,
  ]
    .filter(Boolean)
    .join("\n");
}

function phaseInitialValues(entry: MappingEntry) {
  const firstPhase = entry.params.motionPhases?.[0];
  const initial = new Map<string, number | string>();

  initial.set("x", 0);
  initial.set("y", 0);
  initial.set("scale", 1);
  initial.set("opacity", 1);

  if (firstPhase === undefined) {
    return initial;
  }

  const axis = phaseAxis(firstPhase);

  if (firstPhase.opacity !== undefined) {
    initial.set("opacity", firstPhase.opacity[0]);
  }

  if (firstPhase.opacityKeyframes !== undefined) {
    initial.set("opacity", firstPhase.opacityKeyframes.values[0]);
  }

  if (firstPhase.scaleKeyframes !== undefined) {
    initial.set("scale", firstPhase.scaleKeyframes.values[0]);
  }

  if (firstPhase.translateFrom !== undefined) {
    initial.set(axis, edgeToPercent(firstPhase.translateFrom));
  }

  if (firstPhase.translateTo !== undefined) {
    initial.set(axis, 0);
  }

  if (firstPhase.keyframes !== undefined) {
    initial.set(axis, firstPhase.keyframes.values[0]);
  }

  return initial;
}

function phaseAnimateValues(phase: MotionPhase) {
  const animate = new Map<string, number | string | readonly number[]>();
  const axis = phaseAxis(phase);

  if (phase.opacity !== undefined) {
    animate.set("opacity", phase.opacity[1]);
  }

  if (phase.opacityKeyframes !== undefined) {
    animate.set("opacity", phase.opacityKeyframes.values);
  }

  if (phase.scaleKeyframes !== undefined) {
    animate.set("scale", phase.scaleKeyframes.values);
  }

  if (phase.translateFrom !== undefined) {
    animate.set(axis, 0);
  }

  if (phase.translateTo !== undefined) {
    animate.set(axis, edgeToPercent(phase.translateTo));
  }

  if (phase.keyframes !== undefined) {
    animate.set(axis, phase.keyframes.values);
  }

  if (phase.translatePx !== undefined) {
    animate.set(axis, [0, phase.translatePx, 0]);
  }

  return animate;
}

function formatObjectLines(
  values: Map<string, number | string | readonly number[]>,
  indent = "    ",
) {
  return Array.from(values.entries())
    .map(([key, value]) => `${indent}${key}: ${formatMotionValue(value)},`)
    .join("\n");
}

function formatPhaseTransition(entry: MappingEntry, phase: MotionPhase) {
  const easing = phaseEasing(entry, phase);
  const times = phaseTimes(phase);

  if (isSpringEasing(easing)) {
    const springConfig = phaseSpringConfig(entry, phase);

    return [
      "      transition: {",
      "        type: \"spring\",",
      `        stiffness: ${springConfig?.stiffness ?? 100},`,
      `        damping: ${springConfig?.damping ?? 10},`,
      `        mass: ${springConfig?.mass ?? 1},`,
      phase.delay !== undefined ? `        delay: ${phase.delay / 1000},` : null,
      "      },",
    ]
      .filter(Boolean)
      .join("\n");
  }

  return [
    "      transition: {",
    `        duration: ${phase.duration / 1000},`,
    phase.delay !== undefined ? `        delay: ${phase.delay / 1000},` : null,
    `        ease: ${formatFramerEase(easing)},`,
    times !== undefined ? `        times: ${formatArray(times)},` : null,
    "      },",
  ]
    .filter(Boolean)
    .join("\n");
}

function generatePhasedFramerCode(entry: MappingEntry) {
  const name = toCamelCase(entry.id);
  const phases = entry.params.motionPhases ?? [];
  const initial = phaseInitialValues(entry);
  const phaseBlocks = phases
    .map((phase) => {
      const animate = phaseAnimateValues(phase);

      return `  // Phase: ${phase.id}
  await controls.start({
${formatObjectLines(animate, "    ")}
${formatPhaseTransition(entry, phase)}
  });`;
    })
    .join("\n\n");

  return `${sourceComment(entry, "//")}

export async function ${name}(controls) {
  await controls.set({
${formatObjectLines(initial)}
  });

${phaseBlocks}
}`;
}

function generateInputWarningFramerCode(entry: MappingEntry) {
  const name = toCamelCase(entry.id);

  return `${sourceComment(entry, "//")}

export const ${name} = {
  field: {
    initial: {
      opacity: 1,
    },
    animate: {
      opacity: 1,
    },
  },
  message: {
    initial: {
      opacity: ${entry.params.opacity?.[0] ?? 0},
      y: 4, // lokales Erscheinen des Helper-Texts
    },
    animate: {
      opacity: ${entry.params.opacity?.[1] ?? 1},
      y: 0,
    },
    transition: {
      duration: ${entry.params.duration / 1000},
      ease: ${formatFramerEase(entry.params.easing)},
    },
  },
};`;
}

function generateInputFocusFramerCode(entry: MappingEntry) {
  const name = toCamelCase(entry.id);

  return `${sourceComment(entry, "//")}

export const ${name} = {
  container: {
    initial: {
      scale: 1,
      filter: "drop-shadow(0 0 0 rgba(47, 84, 70, 0))",
    },
    animate: {
      scale: 1.01,
      filter: "drop-shadow(0 0 0.75rem rgba(47, 84, 70, 0.26))",
    },
  },
  field: {
    initial: {
      borderColor: "var(--line)",
      backgroundColor: "rgba(247, 241, 227, 0.6)",
    },
    animate: {
      borderColor: "rgba(47, 84, 70, 0.76)",
      backgroundColor: "rgba(247, 241, 227, 0.84)",
    },
  },
  label: {
    initial: {
      color: "var(--muted)",
    },
    animate: {
      color: "rgba(47, 84, 70, 0.95)",
    },
  },
  transition: {
    duration: ${entry.params.duration / 1000},
    ease: ${formatFramerEase(entry.params.easing)},
  },
};`;
}

function generateInputBlurFramerCode(entry: MappingEntry) {
  const name = toCamelCase(entry.id);

  return `${sourceComment(entry, "//")}

export const ${name} = {
  container: {
    initial: {
      scale: 1.01,
      filter: "drop-shadow(0 0 0.75rem rgba(47, 84, 70, 0.26))",
    },
    animate: {
      scale: 1,
      filter: "drop-shadow(0 0 0 rgba(47, 84, 70, 0))",
    },
  },
  field: {
    initial: {
      borderColor: "rgba(47, 84, 70, 0.76)",
      backgroundColor: "rgba(247, 241, 227, 0.84)",
    },
    animate: {
      borderColor: "var(--line)",
      backgroundColor: "rgba(247, 241, 227, 0.6)",
    },
  },
  label: {
    initial: {
      color: "rgba(47, 84, 70, 0.95)",
    },
    animate: {
      color: "var(--muted)",
    },
  },
  transition: {
    duration: ${entry.params.duration / 1000},
    ease: ${formatFramerEase(entry.params.easing)},
  },
};`;
}

export function generateFramerMotionCode(entry: MappingEntry): string {
  if (entry.params.motionPhases !== undefined) {
    return generatePhasedFramerCode(entry);
  }

  if (entry.id === "input-feedback-warning") {
    return generateInputWarningFramerCode(entry);
  }

  if (entry.id === "input-stateChange-focus") {
    return generateInputFocusFramerCode(entry);
  }

  if (entry.id === "input-stateChange-blur") {
    return generateInputBlurFramerCode(entry);
  }

  const name = toCamelCase(entry.id);
  const { params } = entry;
  const axis = getAxis(entry);
  const axisProperty = getAxisProperty(axis);
  const initial: string[] = [];
  const animate: string[] = [];
  const scaleAnimation = getScaleAnimation(entry);

  if (params.opacityKeyframes !== undefined) {
    initial.push(
      `opacity: ${params.opacityKeyframes.values[0]}, // Start-Deckkraft`,
    );
    animate.push(
      `opacity: ${formatArray(params.opacityKeyframes.values)}, // mehrstufiges Opacity-Signal`,
    );
  } else if (params.opacity !== undefined) {
    initial.push(`opacity: ${params.opacity[0]}, // Start-Deckkraft`);
    animate.push(`opacity: ${params.opacity[1]}, // Ziel-Deckkraft`);
  }

  if (scaleAnimation !== null) {
    if (scaleAnimation.type === "scaleIn") {
      initial.push(
        `scale: ${scaleAnimation.initial}, // Start kleiner: Element tritt in den Vordergrund`,
      );
      animate.push(`scale: ${scaleAnimation.animate}, // Zielgröße`);
    } else if (scaleAnimation.type === "scaleOut") {
      initial.push(`scale: ${scaleAnimation.initial}, // Startgröße`);
      animate.push(
        `scale: ${scaleAnimation.animate}, // Ziel kleiner: Element tritt zurück`,
      );
    } else if (scaleAnimation.type === "pulse") {
      animate.push(
        `scale: ${formatArray(scaleAnimation.animate)}, // Puls/Scale-Feedback`,
      );
    }
  }

  if (params.translatePx !== undefined) {
    const value = params.keyframes?.values ?? [0, params.translatePx, 0];
    animate.push(
      `${axisProperty}: ${formatArray(value)}, // feste Pixel-Translation`,
    );
  }

  if (params.translateFrom !== undefined) {
    initial.push(
      `${axisProperty}: "${edgeToPercent(params.translateFrom)}", // Startkante: ${params.translateFrom}`,
    );

    if (params.opacityKeyframes !== undefined) {
      const startValue = edgeToPercent(params.translateFrom);
      const values = params.opacityKeyframes.values.map((_, index) =>
        index === 0 ? startValue : "0%",
      );
      animate.push(
        `${axisProperty}: ${formatMotionArray(values)}, // Einfahrt vor Opacity-Pulse`,
      );
    } else {
      animate.push(`${axisProperty}: 0, // Element erreicht Zielposition`);
    }
  }

  if (params.translateTo !== undefined) {
    initial.push(`${axisProperty}: 0, // Startposition`);

    if (params.opacityKeyframes !== undefined) {
      const endValue = edgeToPercent(params.translateTo);
      const lastIndex = params.opacityKeyframes.values.length - 1;
      const values = params.opacityKeyframes.values.map((_, index) =>
        index === lastIndex ? endValue : "0%",
      );
      animate.push(
        `${axisProperty}: ${formatMotionArray(values)}, // Ausfahrt mit Opacity-Keyframes`,
      );
    } else {
      animate.push(
        `${axisProperty}: "${edgeToPercent(params.translateTo)}", // Zielkante: ${params.translateTo}`,
      );
    }
  }

  if (params.trackFactor !== undefined) {
    animate.push(
      `${axisProperty}: "${params.trackFactor * 100}%", // komponenteneigene Bewegungsstrecke`,
    );
  }

  return `${sourceComment(entry, "//")}

export const ${name} = {
  initial: {
    ${initial.length > 0 ? initial.join("\n    ") : "x: 0, // neutraler Startzustand"}
  },
  animate: {
    ${animate.length > 0 ? animate.join("\n    ") : "opacity: 1, // Styling-Transition ohne Transform-Parameter"}
  },
${framerTransition(entry, "  ")}
};`;
}

type CssPhaseState = {
  x: string;
  y: string;
  scale: string;
  opacity: number;
};

type CssFrame = {
  time: number;
  state: CssPhaseState;
};

function cloneCssState(state: CssPhaseState): CssPhaseState {
  return { ...state };
}

function cssTransformFromState(state: CssPhaseState) {
  return transformString({
    x: state.x,
    y: state.y,
    scale: state.scale,
  });
}

function cssFrameLine(frame: CssFrame, totalDuration: number) {
  const percent = totalDuration === 0 ? 100 : formatPercent((frame.time / totalDuration) * 100);

  return `  ${percent}% { opacity: ${frame.state.opacity}; transform: ${cssTransformFromState(frame.state)}; }`;
}

function getInitialCssPhaseState(entry: MappingEntry): CssPhaseState {
  const state: CssPhaseState = {
    x: "0",
    y: "0",
    scale: "1",
    opacity: 1,
  };
  const firstPhase = entry.params.motionPhases?.[0];

  if (firstPhase === undefined) {
    return state;
  }

  const axis = phaseAxis(firstPhase);

  if (firstPhase.opacity !== undefined) {
    state.opacity = firstPhase.opacity[0];
  }

  if (firstPhase.opacityKeyframes !== undefined) {
    state.opacity = firstPhase.opacityKeyframes.values[0];
  }

  if (firstPhase.scaleKeyframes !== undefined) {
    state.scale = String(firstPhase.scaleKeyframes.values[0]);
  }

  if (firstPhase.translateFrom !== undefined) {
    state[axis] = edgeToPercent(firstPhase.translateFrom);
  }

  if (firstPhase.translateTo !== undefined) {
    state[axis] = "0";
  }

  if (firstPhase.keyframes !== undefined) {
    state[axis] = `${firstPhase.keyframes.values[0]}px`;
  }

  return state;
}

function generatePhasedCssKeyframes(entry: MappingEntry) {
  const phases = entry.params.motionPhases ?? [];
  const keyframesName = `smf-${entry.id}`;
  const totalDuration = phaseAnimationDuration(entry);
  const frames: CssFrame[] = [];
  const state = getInitialCssPhaseState(entry);
  let currentTime = 0;

  frames.push({ time: currentTime, state: cloneCssState(state) });

  for (const phase of phases) {
    const axis = phaseAxis(phase);

    if (phase.delay !== undefined && phase.delay > 0) {
      currentTime += phase.delay;
      frames.push({ time: currentTime, state: cloneCssState(state) });
    }

    if (phase.opacity !== undefined) {
      state.opacity = phase.opacity[1];
    }

    if (phase.translateFrom !== undefined) {
      state[axis] = "0";
    }

    if (phase.translateTo !== undefined) {
      state[axis] = edgeToPercent(phase.translateTo);
    }

    if (
      phase.keyframes === undefined &&
      phase.scaleKeyframes === undefined &&
      phase.opacityKeyframes === undefined
    ) {
      frames.push({
        time: currentTime + phase.duration,
        state: cloneCssState(state),
      });
      currentTime += phase.duration;
      continue;
    }

    const times = phaseTimes(phase) ?? [0, 1];

    for (const [index, time] of times.entries()) {
      if (phase.keyframes !== undefined) {
        state[axis] = `${phase.keyframes.values[index]}px`;
      }

      if (phase.scaleKeyframes !== undefined) {
        state.scale = String(phase.scaleKeyframes.values[index]);
      }

      if (phase.opacityKeyframes !== undefined) {
        state.opacity = phase.opacityKeyframes.values[index];
      }

      frames.push({
        time: currentTime + time * phase.duration,
        state: cloneCssState(state),
      });
    }

    currentTime += phase.duration;
  }

  return `@keyframes ${keyframesName} {
${frames.map((frame) => cssFrameLine(frame, totalDuration)).join("\n")}
}`;
}

function cssKeyframes(entry: MappingEntry) {
  const { params } = entry;
  const axis = getAxis(entry);
  const keyframesName = `smf-${entry.id}`;

  if (params.motionPhases !== undefined) {
    return generatePhasedCssKeyframes(entry);
  }

  if (params.opacityKeyframes !== undefined) {
    const lastIndex = params.opacityKeyframes.values.length - 1;
    const frames = params.opacityKeyframes.values.map((opacity, index) => {
      const percent = formatPercent(
        params.opacityKeyframes!.times[index] * 100,
      );
      const parts: TransformParts = {};

      if (params.translateFrom !== undefined) {
        parts[axis] = index === 0 ? edgeToPercent(params.translateFrom) : "0";
      }

      if (params.translateTo !== undefined) {
        parts[axis] =
          index === lastIndex ? edgeToPercent(params.translateTo) : "0";
      }

      return `  ${percent}% { opacity: ${opacity}; transform: ${transformString(parts)}; }`;
    });

    return `@keyframes ${keyframesName} {
${frames.join("\n")}
}`;
  }

  if (params.keyframes !== undefined) {
    const property = axis === "x" ? "translateX" : "translateY";
    const frames = params.keyframes.values.map((value, index) => {
      const percent = formatPercent(params.keyframes!.times[index] * 100);
      return `  ${percent}% { transform: ${property}(${value}px); }`;
    });

    return `@keyframes ${keyframesName} {
${frames.join("\n")}
}`;
  }

  const from: TransformParts = {};
  const to: TransformParts = {};
  let fromOpacity = params.opacity?.[0];
  let toOpacity = params.opacity?.[1];
  const scaleAnimation = getScaleAnimation(entry);

  if (scaleAnimation !== null) {
    if (scaleAnimation.type === "pulse") {
      return `@keyframes ${keyframesName} {
  0% { transform: scale(${scaleAnimation.animate[0]}); }
  45% { transform: scale(${scaleAnimation.animate[1]}); }
  100% { transform: scale(${scaleAnimation.animate[2]}); }
}`;
    }

    from.scale = String(scaleAnimation.initial);
    to.scale = String(scaleAnimation.animate);
  }

  if (params.translateFrom !== undefined) {
    from[axis] = edgeToPercent(params.translateFrom);
    to[axis] = "0";
  }

  if (params.translateTo !== undefined) {
    from[axis] = "0";
    to[axis] = edgeToPercent(params.translateTo);
  }

  if (params.trackFactor !== undefined) {
    from[axis] = "0";
    to[axis] = `${params.trackFactor * 100}%`;
  }

  if (fromOpacity === undefined && toOpacity === undefined) {
    fromOpacity = 1;
    toOpacity = 1;
  }

  return `@keyframes ${keyframesName} {
  0% { opacity: ${fromOpacity ?? 1}; transform: ${transformString(from)}; }
  100% { opacity: ${toOpacity ?? 1}; transform: ${transformString(to)}; }
}`;
}

function generateInputCSSCode(entry: MappingEntry) {
  const className = `smf-${entry.id}`;
  const easing = formatCssEase(entry.params.easing);

  if (entry.id === "input-feedback-warning") {
    return `${sourceComment(entry, "/*")}

@keyframes ${className}-message {
  0% { opacity: ${entry.params.opacity?.[0] ?? 0}; transform: translateY(4px); }
  100% { opacity: ${entry.params.opacity?.[1] ?? 1}; transform: translateY(0); }
}

.${className} .input-message {
  animation: ${className}-message ${entry.params.duration}ms ${easing} both;
}`;
  }

  if (entry.id === "input-stateChange-focus") {
    return `${sourceComment(entry, "/*")}

@keyframes ${className}-ring {
  0% { filter: drop-shadow(0 0 0 rgba(47, 84, 70, 0)); transform: scale(1); }
  100% { filter: drop-shadow(0 0 0.75rem rgba(47, 84, 70, 0.26)); transform: scale(1.01); }
}

@keyframes ${className}-field {
  0% { border-color: var(--line); background: rgba(247, 241, 227, 0.6); }
  100% { border-color: rgba(47, 84, 70, 0.76); background: rgba(247, 241, 227, 0.84); }
}

@keyframes ${className}-label {
  0% { color: var(--muted); }
  100% { color: rgba(47, 84, 70, 0.95); }
}

.${className} {
  animation: ${className}-ring ${entry.params.duration}ms ${easing} both;
}

.${className} input {
  animation: ${className}-field ${entry.params.duration}ms ${easing} both;
}

.${className} label {
  animation: ${className}-label ${entry.params.duration}ms ${easing} both;
}`;
  }

  if (entry.id === "input-stateChange-blur") {
    return `${sourceComment(entry, "/*")}

@keyframes ${className}-ring {
  0% { filter: drop-shadow(0 0 0.75rem rgba(47, 84, 70, 0.26)); transform: scale(1.01); }
  100% { filter: drop-shadow(0 0 0 rgba(47, 84, 70, 0)); transform: scale(1); }
}

@keyframes ${className}-field {
  0% { border-color: rgba(47, 84, 70, 0.76); background: rgba(247, 241, 227, 0.84); }
  100% { border-color: var(--line); background: rgba(247, 241, 227, 0.6); }
}

@keyframes ${className}-label {
  0% { color: rgba(47, 84, 70, 0.95); }
  100% { color: var(--muted); }
}

.${className} {
  animation: ${className}-ring ${entry.params.duration}ms ${easing} both;
}

.${className} input {
  animation: ${className}-field ${entry.params.duration}ms ${easing} both;
}

.${className} label {
  animation: ${className}-label ${entry.params.duration}ms ${easing} both;
}`;
  }

  return null;
}

export function generateCSSCode(entry: MappingEntry): string {
  const inputCSSCode = generateInputCSSCode(entry);

  if (inputCSSCode !== null) {
    return inputCSSCode;
  }

  const className = `smf-${entry.id}`;
  const warnings = [
    usesSpringEasing(entry)
      ? "/* Hinweis: CSS unterstützt keine echte Spring-Physik. Diese Ausgabe nutzt eine approximierte cubic-bezier-Kurve. */"
      : null,
    hasPhaseSpecificEasing(entry)
      ? "/* Hinweis: CSS bildet phase-spezifisches Easing in kombinierten Keyframes nur approximiert ab. Diese Ausgabe nutzt die Top-Level-Easing-Kurve. */"
      : null,
  ].filter(Boolean);
  const warning = warnings.length > 0 ? `${warnings.join("\n")}\n` : "";

  return `${sourceComment(entry, "/*")}
${warning}
${cssKeyframes(entry)}

.${className} {
  animation: smf-${entry.id} ${phaseAnimationDuration(entry)}ms ${formatCssEase(entry.params.easing)} both;
}`;
}

export function generateExportBundle(entry: MappingEntry) {
  return {
    framerMotion: generateFramerMotionCode(entry),
    css: generateCSSCode(entry),
  };
}

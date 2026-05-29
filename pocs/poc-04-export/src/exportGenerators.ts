import {
  EASING_CURVES,
  type EasingValue,
  type MappingEntry,
  type TranslationEdge,
} from "../../../prototyp/src/framework/types";

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
  if ("preset" in easing && easing.preset === "spring") {
    return null;
  }

  return formatArray(formatEasingValue(easing));
}

function formatCssEase(easing: EasingValue) {
  const curve = formatEasingValue(easing);
  return `cubic-bezier(${curve.join(", ")})`;
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

function transformString(parts: TransformParts) {
  const transforms = [
    parts.x !== undefined ? `translateX(${parts.x})` : null,
    parts.y !== undefined ? `translateY(${parts.y})` : null,
    parts.scale !== undefined ? `scale(${parts.scale})` : null,
  ].filter(Boolean);

  return transforms.length > 0 ? transforms.join(" ") : "none";
}

function getScaleAnimation(entry: MappingEntry): ScaleAnimation | null {
  const { scaleFactor } = entry.params;

  if (scaleFactor === undefined) {
    return null;
  }

  if (entry.dimension === "hierarchy" && scaleFactor > 0) {
    return {
      type: "scaleIn",
      initial: 1 - scaleFactor,
      animate: 1,
    };
  }

  if (entry.dimension === "hierarchy" && scaleFactor < 0) {
    return {
      type: "scaleOut",
      initial: 1,
      animate: 1 + scaleFactor,
    };
  }

  return {
    type: "pulse",
    initial: 1,
    animate: [1, 1 + scaleFactor, 1],
    times: [0, 0.45, 1],
  };
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

function generateToastErrorFramerCode(entry: MappingEntry) {
  const name = toCamelCase(entry.id);
  const keyframes = entry.params.keyframes;

  return `${sourceComment(entry, "//")}

export async function ${name}(controls) {
  await controls.set({
    x: 0,
    y: "100%", // Einfahrt von unten
    opacity: ${entry.params.opacity?.[0] ?? 1},
  });

  await controls.start({
    y: 0,
    opacity: ${entry.params.opacity?.[1] ?? 1},
    transition: {
      duration: ${entry.params.duration / 2000}, // erste Phase: y-Einfahrt
      ease: ${formatFramerEase(entry.params.easing)},
    },
  });

  await controls.start({
    x: ${formatArray(keyframes?.values ?? [0])}, // zweite Phase: x-Shake nach Ankunft
    transition: {
      duration: ${entry.params.duration / 2000},
      ease: ${formatFramerEase(entry.params.easing)},
      times: ${formatArray(keyframes?.times ?? [0])},
    },
  });
}`;
}

function generateToastWarningFramerCode(entry: MappingEntry) {
  const name = toCamelCase(entry.id);

  return `${sourceComment(entry, "//")}

export async function ${name}(controls) {
  await controls.set({
    x: 0,
    y: "100%", // Einfahrt von unten
    opacity: ${entry.params.opacity?.[0] ?? 1},
  });

  await controls.start({
    y: 0,
    opacity: ${entry.params.opacity?.[1] ?? 1},
    transition: {
      duration: ${(entry.params.duration * 0.62) / 1000}, // erste Phase: ruhige y-Einfahrt
      delay: ${(entry.params.delay ?? 0) / 1000},
      ease: ${formatFramerEase(entry.params.easing)},
    },
  });

  await controls.start({
    y: [0, -5, 0], // zweite Phase: moderater y-Nudge
    transition: {
      duration: ${(entry.params.duration * 0.38) / 1000},
      ease: ${formatFramerEase(entry.params.easing)},
      times: [0, 0.5, 1],
    },
  });
}`;
}

function generateToastOneShotFramerCode(entry: MappingEntry) {
  const name = toCamelCase(entry.id);

  return `${sourceComment(entry, "//")}

export async function ${name}(controls) {
  await controls.set({
    x: 0,
    y: "100%", // Einfahrt von unten
    scale: 1,
    opacity: ${entry.params.opacity?.[0] ?? 1},
  });

  await controls.start({
    y: 0,
    opacity: ${entry.params.opacity?.[1] ?? 1},
    transition: {
      duration: ${(entry.params.duration * 0.42) / 1000}, // erste Phase: ruhige y-Einfahrt
      ease: ${formatFramerEase(entry.params.easing)},
    },
  });

  await controls.start({
    scale: [1, 1.025, 1, 1.025, 1], // zweite Phase: zwei subtile Scale-Impulse
    transition: {
      duration: ${(entry.params.duration * 0.58) / 1000},
      ease: ${formatFramerEase(entry.params.easing)},
      times: [0, 0.25, 0.5, 0.75, 1],
    },
  });
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
  if (entry.id === "toast-feedback-error") {
    return generateToastErrorFramerCode(entry);
  }

  if (entry.id === "toast-feedback-warning") {
    return generateToastWarningFramerCode(entry);
  }

  if (entry.id === "toast-attention-oneShot") {
    return generateToastOneShotFramerCode(entry);
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

function cssKeyframes(entry: MappingEntry) {
  const { params } = entry;
  const axis = getAxis(entry);
  const keyframesName = `smf-${entry.id}`;

  if (entry.id === "toast-feedback-error" && params.keyframes !== undefined) {
    const shakeFrames = params.keyframes.values
      .map((value, index) => {
        const percent = formatPercent(50 + params.keyframes!.times[index] * 50);
        return `  ${percent}% { opacity: 1; transform: translateY(0) translateX(${value}px); }`;
      })
      .join("\n");

    return `@keyframes ${keyframesName} {
  0% { opacity: ${params.opacity?.[0] ?? 1}; transform: translateY(100%) translateX(0); }
  50% { opacity: ${params.opacity?.[1] ?? 1}; transform: translateY(0) translateX(0); }
${shakeFrames}
}`;
  }

  if (entry.id === "toast-feedback-warning") {
    return `@keyframes ${keyframesName} {
  0% { opacity: ${params.opacity?.[0] ?? 1}; transform: translateY(100%); }
  62% { opacity: ${params.opacity?.[1] ?? 1}; transform: translateY(0); }
  81% { opacity: ${params.opacity?.[1] ?? 1}; transform: translateY(-5px); }
  100% { opacity: ${params.opacity?.[1] ?? 1}; transform: translateY(0); }
}`;
  }

  if (entry.id === "toast-attention-oneShot") {
    return `@keyframes ${keyframesName} {
  0% { opacity: ${params.opacity?.[0] ?? 1}; transform: translateY(100%) scale(1); }
  42% { opacity: ${params.opacity?.[1] ?? 1}; transform: translateY(0) scale(1); }
  56.5% { opacity: ${params.opacity?.[1] ?? 1}; transform: translateY(0) scale(1.025); }
  71% { opacity: ${params.opacity?.[1] ?? 1}; transform: translateY(0) scale(1); }
  85.5% { opacity: ${params.opacity?.[1] ?? 1}; transform: translateY(0) scale(1.025); }
  100% { opacity: ${params.opacity?.[1] ?? 1}; transform: translateY(0) scale(1); }
}`;
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
  const warning =
    "preset" in entry.params.easing && entry.params.easing.preset === "spring"
      ? "/* Hinweis: CSS unterstützt keine echte Spring-Physik. Diese Ausgabe nutzt eine approximierte cubic-bezier-Kurve. */\n"
      : "";

  return `${sourceComment(entry, "/*")}
${warning}
${cssKeyframes(entry)}

.${className} {
  animation: smf-${entry.id} ${entry.params.duration}ms ${formatCssEase(entry.params.easing)} both;
}`;
}

export function generateExportBundle(entry: MappingEntry) {
  return {
    framerMotion: generateFramerMotionCode(entry),
    css: generateCSSCode(entry),
  };
}

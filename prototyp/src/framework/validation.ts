import { mappings } from "../data/mappings";
import {
  COMPONENT_IDS,
  DIMENSIONS,
  SUBCATEGORIES_BY_DIMENSION,
} from "./types";
import type {
  ComponentId,
  Dimension,
  EasingValue,
  KeyframeSequence,
  MappingEntry,
  MappingQuery,
  MotionPhase,
  ReducedMotionStrategy,
  ScaleMode,
  SpringConfig,
  Subcategory,
  TranslationEdge,
} from "./types";
import {
  getMapping,
  getMappingCount,
  getOutOfScopeCombinations,
  getSupportedComponents,
} from "./classifier";

export type ValidationReport = {
  totalEntries: number;
  uniqueIds: number;
  supportedComponents: ComponentId[];
  outOfScopeCombinations: MappingQuery[];
  errors: string[];
};

const componentIds = new Set<ComponentId>(COMPONENT_IDS);
const dimensions = new Set<Dimension>(DIMENSIONS);
const xEdges = new Set<TranslationEdge>(["left", "right"]);
const yEdges = new Set<TranslationEdge>(["top", "bottom"]);
const reducedMotionStrategies = new Set<ReducedMotionStrategy>([
  "none",
  "shorten",
  "replace",
  "static",
]);
const scaleModes = new Set<ScaleMode>(["pulse", "scaleIn", "scaleOut"]);
const durationTolerance = 0.001;

function isFiniteNumber(value: number): boolean {
  return Number.isFinite(value);
}

function validatePositiveNumber(
  ownerId: string,
  label: string,
  value: number,
): string[] {
  if (!isFiniteNumber(value) || value <= 0) {
    return [`${ownerId}: ${label} must be greater than 0`];
  }

  return [];
}

function validateNonNegativeNumber(
  ownerId: string,
  label: string,
  value: number | undefined,
): string[] {
  if (value === undefined) {
    return [];
  }

  if (!isFiniteNumber(value) || value < 0) {
    return [`${ownerId}: ${label} must be greater than or equal to 0`];
  }

  return [];
}

function validateIterations(
  ownerId: string,
  iterations: number | typeof Infinity | undefined,
): string[] {
  if (iterations === undefined) {
    return [];
  }

  if (iterations === Infinity) {
    return [];
  }

  if (!Number.isFinite(iterations) || iterations <= 0) {
    return [`${ownerId}: iterations must be greater than 0 or Infinity`];
  }

  return [];
}

function validateOpacityValue(
  ownerId: string,
  label: string,
  value: number,
): string[] {
  if (!isFiniteNumber(value) || value < 0 || value > 1) {
    return [`${ownerId}: ${label} must be between 0 and 1`];
  }

  return [];
}

function validateOpacityRange(
  ownerId: string,
  label: string,
  opacity: [number, number] | undefined,
): string[] {
  if (opacity === undefined) {
    return [];
  }

  return [
    ...validateOpacityValue(ownerId, `${label}[0]`, opacity[0]),
    ...validateOpacityValue(ownerId, `${label}[1]`, opacity[1]),
  ];
}

function validateEasing(
  ownerId: string,
  label: string,
  easing: EasingValue,
): string[] {
  const errors: string[] = [];

  if ("preset" in easing) {
    return errors;
  }

  const { cubicBezier } = easing;

  if (cubicBezier.length !== 4) {
    errors.push(`${ownerId}: ${label}.cubicBezier must contain 4 values`);
    return errors;
  }

  cubicBezier.forEach((value, index) => {
    if (!isFiniteNumber(value)) {
      errors.push(`${ownerId}: ${label}.cubicBezier[${index}] must be finite`);
    }
  });

  const [x1, , x2] = cubicBezier;

  if (x1 < 0 || x1 > 1 || x2 < 0 || x2 > 1) {
    errors.push(`${ownerId}: ${label}.cubicBezier x values must be between 0 and 1`);
  }

  return errors;
}

function validateSpringConfig(
  ownerId: string,
  label: string,
  springConfig: SpringConfig | undefined,
): string[] {
  if (springConfig === undefined) {
    return [];
  }

  return [
    ...validatePositiveNumber(ownerId, `${label}.stiffness`, springConfig.stiffness),
    ...validatePositiveNumber(ownerId, `${label}.damping`, springConfig.damping),
    ...validatePositiveNumber(ownerId, `${label}.mass`, springConfig.mass),
  ];
}

function validateKeyframeSequence(
  entryId: string,
  label: string,
  sequence: KeyframeSequence,
  options: { opacityValues?: boolean } = {},
): string[] {
  const errors: string[] = [];
  const { values, times } = sequence;

  if (values.length === 0 || times.length === 0) {
    errors.push(`${entryId}: ${label} values/times must not be empty`);
    return errors;
  }

  if (values.length !== times.length) {
    errors.push(`${entryId}: ${label} values/times length mismatch`);
  }

  if (times[0] !== 0 || times[times.length - 1] !== 1) {
    errors.push(`${entryId}: ${label} times must start at 0 and end at 1`);
  }

  values.forEach((value, index) => {
    if (!isFiniteNumber(value)) {
      errors.push(`${entryId}: ${label} values[${index}] must be finite`);
    }

    if (options.opacityValues) {
      errors.push(
        ...validateOpacityValue(entryId, `${label} values[${index}]`, value),
      );
    }
  });

  times.forEach((time, index) => {
    if (!isFiniteNumber(time) || time < 0 || time > 1) {
      errors.push(`${entryId}: ${label} times[${index}] must be between 0 and 1`);
    }
  });

  for (let index = 1; index < times.length; index += 1) {
    if (times[index] < times[index - 1]) {
      errors.push(`${entryId}: ${label} times must be monotonic`);
    }
  }

  return errors;
}

function validateTranslationEdges(
  ownerId: string,
  direction: "x" | "y" | undefined,
  translateFrom: TranslationEdge | undefined,
  translateTo: TranslationEdge | undefined,
): string[] {
  const errors: string[] = [];

  if (direction === undefined) {
    return errors;
  }

  const allowedEdges = direction === "x" ? xEdges : yEdges;

  if (translateFrom !== undefined && !allowedEdges.has(translateFrom)) {
    errors.push(`${ownerId}: translateFrom does not match direction "${direction}"`);
  }

  if (translateTo !== undefined && !allowedEdges.has(translateTo)) {
    errors.push(`${ownerId}: translateTo does not match direction "${direction}"`);
  }

  return errors;
}

function hasSameTimes(
  first: KeyframeSequence,
  second: KeyframeSequence,
): boolean {
  return (
    first.times.length === second.times.length &&
    first.times.every((time, index) => time === second.times[index])
  );
}

function validateSharedPhaseTimes(
  phaseId: string,
  sequences: KeyframeSequence[],
): string[] {
  if (sequences.length <= 1) {
    return [];
  }

  const [firstSequence, ...otherSequences] = sequences;

  if (otherSequences.some((sequence) => !hasSameTimes(firstSequence, sequence))) {
    return [
      `${phaseId}: multiple keyframe sequences in one phase must share the same times`,
    ];
  }

  return [];
}

function validateMotionPhase(
  entry: MappingEntry,
  phase: MotionPhase,
): string[] {
  const errors: string[] = [];
  const phaseId = `${entry.id}.${phase.id}`;
  const phaseHasTranslation =
    phase.translatePx !== undefined ||
    phase.translateDistance !== undefined ||
    phase.translateFrom !== undefined ||
    phase.translateTo !== undefined ||
    phase.keyframes !== undefined;
  const phaseHasAnyMotion =
    phaseHasTranslation ||
    phase.scaleKeyframes !== undefined ||
    phase.opacity !== undefined ||
    phase.opacityKeyframes !== undefined;

  if (!phase.id.trim()) {
    errors.push(`${entry.id}: motion phase requires id`);
  }

  errors.push(...validatePositiveNumber(phaseId, "motion phase duration", phase.duration));
  errors.push(...validateNonNegativeNumber(phaseId, "motion phase delay", phase.delay));

  if (!phaseHasAnyMotion) {
    errors.push(`${phaseId}: motion phase must define motion or opacity`);
  }

  if (phaseHasTranslation && phase.direction === undefined) {
    errors.push(`${phaseId}: translation phase requires direction`);
  }

  if (
    phase.translatePx !== undefined &&
    phase.translateDistance !== undefined
  ) {
    errors.push(`${phaseId}: translatePx and translateDistance are exclusive`);
  }

  if (phase.translatePx !== undefined && !isFiniteNumber(phase.translatePx)) {
    errors.push(`${phaseId}: translatePx must be finite`);
  }

  if (
    (phase.translateFrom !== undefined || phase.translateTo !== undefined) &&
    phase.translateDistance === undefined
  ) {
    errors.push(
      `${phaseId}: translateFrom/translateTo require translateDistance`,
    );
  }

  errors.push(
    ...validateTranslationEdges(
      phaseId,
      phase.direction,
      phase.translateFrom,
      phase.translateTo,
    ),
  );

  if (phase.easing !== undefined) {
    errors.push(...validateEasing(phaseId, "easing", phase.easing));
  }

  if (phase.opacity !== undefined) {
    errors.push(...validateOpacityRange(phaseId, "opacity", phase.opacity));
  }

  if (phase.keyframes !== undefined) {
    errors.push(
      ...validateKeyframeSequence(phaseId, "keyframe", phase.keyframes),
    );
  }

  if (phase.scaleKeyframes !== undefined) {
    errors.push(
      ...validateKeyframeSequence(
        phaseId,
        "scale keyframe",
        phase.scaleKeyframes,
      ),
    );
  }

  if (phase.opacityKeyframes !== undefined) {
    errors.push(
      ...validateKeyframeSequence(
        phaseId,
        "opacity keyframe",
        phase.opacityKeyframes,
        { opacityValues: true },
      ),
    );
  }

  const keyframeSequences = [
    phase.keyframes,
    phase.scaleKeyframes,
    phase.opacityKeyframes,
  ].filter((sequence): sequence is KeyframeSequence => sequence !== undefined);

  errors.push(...validateSharedPhaseTimes(phaseId, keyframeSequences));

  const phaseEasing = phase.easing ?? entry.params.easing;
  const usesSpring =
    "preset" in phaseEasing && phaseEasing.preset === "spring";

  if (
    usesSpring &&
    phase.springConfig === undefined &&
    entry.params.springConfig === undefined
  ) {
    errors.push(`${phaseId}: spring phase requires springConfig`);
  }

  if (!usesSpring && phase.springConfig !== undefined) {
    errors.push(
      `${phaseId}: springConfig must only be used with spring easing`,
    );
  }

  errors.push(...validateSpringConfig(phaseId, "springConfig", phase.springConfig));

  return errors;
}

function usesComponentSpecificRenderer(entry: MappingEntry): boolean {
  return (
    entry.component === "input" &&
    entry.dimension === "stateChange" &&
    (entry.subcategory === "focus" || entry.subcategory === "blur")
  );
}

function requiresReducedMotionStrategy(entry: MappingEntry): boolean {
  const { iterations } = entry.params;

  return iterations === Infinity || (iterations !== undefined && iterations > 1);
}

function validateAccessibility(entry: MappingEntry): string[] {
  const errors: string[] = [];
  const { accessibility } = entry;

  if (accessibility === undefined) {
    if (requiresReducedMotionStrategy(entry)) {
      errors.push(
        `${entry.id}: repeated or endless motion requires accessibility.reducedMotion`,
      );
    }

    return errors;
  }

  if (!reducedMotionStrategies.has(accessibility.reducedMotion)) {
    errors.push(`${entry.id}: unknown accessibility.reducedMotion strategy`);
  }

  return errors;
}

export function validateMappingEntry(entry: MappingEntry): string[] {
  const errors: string[] = [];
  const expectedId = `${entry.component}-${entry.dimension}-${entry.subcategory}`;

  if (entry.id !== expectedId) {
    errors.push(`${entry.id}: expected id "${expectedId}"`);
  }

  if (!componentIds.has(entry.component)) {
    errors.push(`${entry.id}: unknown component "${entry.component}"`);
  }

  if (!dimensions.has(entry.dimension)) {
    errors.push(`${entry.id}: unknown dimension "${entry.dimension}"`);
  }

  if (dimensions.has(entry.dimension)) {
    const allowedSubcategories = SUBCATEGORIES_BY_DIMENSION[
      entry.dimension
    ] as readonly Subcategory[];

    if (!allowedSubcategories.includes(entry.subcategory)) {
      errors.push(
        `${entry.id}: subcategory "${entry.subcategory}" does not belong to "${entry.dimension}"`,
      );
    }
  }

  if (!entry.rationale.short.trim()) {
    errors.push(`${entry.id}: missing rationale.short`);
  }

  if (!entry.rationale.source.trim()) {
    errors.push(`${entry.id}: missing rationale.source`);
  }

  if (entry.rationale.references.length === 0) {
    errors.push(`${entry.id}: missing rationale.references`);
  }

  const params = entry.params;
  const hasTranslation =
    params.translatePx !== undefined ||
    params.translateDistance !== undefined ||
    params.translateFrom !== undefined ||
    params.translateTo !== undefined ||
    params.keyframes !== undefined;
  const hasScale =
    params.scaleFactor !== undefined || params.scaleMode !== undefined;
  const hasTrack = params.trackFactor !== undefined;
  const hasOpacity =
    params.opacity !== undefined || params.opacityKeyframes !== undefined;
  const hasMotionPhases = params.motionPhases !== undefined;
  const movementGroups = [hasTranslation, hasScale, hasTrack].filter(Boolean);

  errors.push(...validatePositiveNumber(entry.id, "duration", params.duration));
  errors.push(...validateNonNegativeNumber(entry.id, "delay", params.delay));
  errors.push(...validateIterations(entry.id, params.iterations));
  errors.push(...validateEasing(entry.id, "easing", params.easing));
  errors.push(...validateAccessibility(entry));

  if (movementGroups.length > 1) {
    errors.push(`${entry.id}: multiple primary movement groups`);
  }

  if ((hasTranslation || hasTrack) && params.direction === undefined) {
    errors.push(`${entry.id}: movement requires direction`);
  }

  if (hasScale && params.direction !== undefined) {
    errors.push(`${entry.id}: scaleFactor must not use direction`);
  }

  if (
    !hasTranslation &&
    !hasScale &&
    !hasTrack &&
    !hasOpacity &&
    !hasMotionPhases &&
    !usesComponentSpecificRenderer(entry)
  ) {
    errors.push(`${entry.id}: params must define motion or opacity`);
  }

  if (
    params.translatePx !== undefined &&
    params.translateDistance !== undefined
  ) {
    errors.push(`${entry.id}: translatePx and translateDistance are exclusive`);
  }

  if (params.translatePx !== undefined) {
    if (!isFiniteNumber(params.translatePx)) {
      errors.push(`${entry.id}: translatePx must be finite`);
    }

    if (params.translatePx === 0) {
      errors.push(`${entry.id}: translatePx must not be 0`);
    }
  }

  if (params.scaleFactor !== undefined) {
    if (!isFiniteNumber(params.scaleFactor)) {
      errors.push(`${entry.id}: scaleFactor must be finite`);
    }

    if (params.scaleFactor <= 0) {
      errors.push(`${entry.id}: scaleFactor must be greater than 0`);
    }

    if (params.scaleMode === undefined) {
      errors.push(`${entry.id}: scaleFactor requires scaleMode`);
    }
  }

  if (params.scaleMode !== undefined) {
    if (!scaleModes.has(params.scaleMode)) {
      errors.push(`${entry.id}: invalid scaleMode "${params.scaleMode}"`);
    }

    if (params.scaleFactor === undefined) {
      errors.push(`${entry.id}: scaleMode requires scaleFactor`);
    }
  }

  if (params.trackFactor !== undefined) {
    if (!isFiniteNumber(params.trackFactor)) {
      errors.push(`${entry.id}: trackFactor must be finite`);
    }

    if (params.trackFactor === 0) {
      errors.push(`${entry.id}: trackFactor must not be 0`);
    }
  }

  if (
    (params.translateFrom !== undefined || params.translateTo !== undefined) &&
    params.translateDistance === undefined
  ) {
    errors.push(
      `${entry.id}: translateFrom/translateTo require translateDistance`,
    );
  }

  errors.push(
    ...validateTranslationEdges(
      entry.id,
      params.direction,
      params.translateFrom,
      params.translateTo,
    ),
  );

  const usesSpring =
    "preset" in params.easing && params.easing.preset === "spring";

  if (usesSpring && params.springConfig === undefined) {
    errors.push(`${entry.id}: spring easing requires springConfig`);
  }

  if (!usesSpring && params.springConfig !== undefined) {
    errors.push(
      `${entry.id}: springConfig must only be used with spring easing`,
    );
  }

  errors.push(...validateSpringConfig(entry.id, "springConfig", params.springConfig));

  if (params.opacity !== undefined) {
    errors.push(...validateOpacityRange(entry.id, "opacity", params.opacity));
  }

  if (params.keyframes !== undefined) {
    errors.push(
      ...validateKeyframeSequence(entry.id, "keyframe", params.keyframes),
    );
  }

  if (params.opacityKeyframes !== undefined) {
    errors.push(
      ...validateKeyframeSequence(
        entry.id,
        "opacity keyframe",
        params.opacityKeyframes,
        { opacityValues: true },
      ),
    );
  }

  if (params.motionPhases !== undefined) {
    const hasFlatMotion =
      params.direction !== undefined ||
      params.translatePx !== undefined ||
      params.translateDistance !== undefined ||
      params.translateFrom !== undefined ||
      params.translateTo !== undefined ||
      params.scaleFactor !== undefined ||
      params.scaleMode !== undefined ||
      params.trackFactor !== undefined ||
      params.keyframes !== undefined ||
      params.opacity !== undefined ||
      params.opacityKeyframes !== undefined ||
      params.delay !== undefined;

    if (params.motionPhases.length === 0) {
      errors.push(`${entry.id}: motionPhases must not be empty`);
    }

    if (hasFlatMotion) {
      errors.push(
        `${entry.id}: motionPhases must not be mixed with flat motion fields`,
      );
    }

    const phaseIds = new Set<string>();
    const phaseDurationSum = params.motionPhases.reduce(
      (total, phase) => total + phase.duration,
      0,
    );

    if (Math.abs(phaseDurationSum - params.duration) > durationTolerance) {
      errors.push(
        `${entry.id}: motionPhases duration sum must match top-level duration`,
      );
    }

    for (const phase of params.motionPhases) {
      if (phaseIds.has(phase.id)) {
        errors.push(`${entry.id}: duplicate motion phase id "${phase.id}"`);
      }

      phaseIds.add(phase.id);
      errors.push(...validateMotionPhase(entry, phase));
    }
  }

  return errors;
}

export function validateMappingDatabase(): ValidationReport {
  const ids = new Set<string>();
  const errors: string[] = [];

  for (const entry of mappings) {
    if (ids.has(entry.id)) {
      errors.push(`${entry.id}: duplicate id`);
    }

    ids.add(entry.id);
    errors.push(...validateMappingEntry(entry));

    const lookupResult = getMapping({
      component: entry.component,
      dimension: entry.dimension,
      subcategory: entry.subcategory,
    });

    if (lookupResult?.id !== entry.id) {
      errors.push(`${entry.id}: lookup does not return this entry`);
    }
  }

  if (getMappingCount() !== mappings.length) {
    errors.push("classifier count differs from mappings length");
  }

  return {
    totalEntries: mappings.length,
    uniqueIds: ids.size,
    supportedComponents: getSupportedComponents(),
    outOfScopeCombinations: getOutOfScopeCombinations(),
    errors,
  };
}

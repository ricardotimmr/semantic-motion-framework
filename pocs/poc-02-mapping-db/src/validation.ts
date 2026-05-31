import { mappings } from "../../../prototyp/src/data/mappings";
import {
  COMPONENT_IDS,
  DIMENSIONS,
  SUBCATEGORIES_BY_DIMENSION,
} from "../../../prototyp/src/framework/types";
import type {
  ComponentId,
  Dimension,
  MappingEntry,
  MappingQuery,
  KeyframeSequence,
  MotionPhase,
  Subcategory,
} from "../../../prototyp/src/framework/types";
import {
  getMapping,
  getMappingCount,
  getOutOfScopeCombinations,
  getSupportedComponents,
} from "../../../prototyp/src/framework/classifier";

export type ValidationReport = {
  totalEntries: number;
  uniqueIds: number;
  supportedComponents: ComponentId[];
  outOfScopeCombinations: MappingQuery[];
  errors: string[];
};

const componentIds = new Set<ComponentId>(COMPONENT_IDS);
const dimensions = new Set<Dimension>(DIMENSIONS);

function validateKeyframeSequence(
  entryId: string,
  label: string,
  sequence: KeyframeSequence,
): string[] {
  const errors: string[] = [];
  const { values, times } = sequence;

  if (values.length !== times.length) {
    errors.push(`${entryId}: ${label} values/times length mismatch`);
  }

  if (times[0] !== 0 || times[times.length - 1] !== 1) {
    errors.push(`${entryId}: ${label} times must start at 0 and end at 1`);
  }

  for (let index = 1; index < times.length; index += 1) {
    if (times[index] < times[index - 1]) {
      errors.push(`${entryId}: ${label} times must be monotonic`);
    }
  }

  return errors;
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

  if (!phase.id.trim()) {
    errors.push(`${entry.id}: motion phase requires id`);
  }

  if (phase.duration <= 0) {
    errors.push(`${phaseId}: motion phase duration must be greater than 0`);
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

  if (
    (phase.translateFrom !== undefined || phase.translateTo !== undefined) &&
    phase.translateDistance === undefined
  ) {
    errors.push(
      `${phaseId}: translateFrom/translateTo require translateDistance`,
    );
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
      ),
    );
  }

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

  const allowedSubcategories = SUBCATEGORIES_BY_DIMENSION[
    entry.dimension
  ] as readonly Subcategory[];

  if (!allowedSubcategories.includes(entry.subcategory)) {
    errors.push(
      `${entry.id}: subcategory "${entry.subcategory}" does not belong to "${entry.dimension}"`,
    );
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
    params.translatePx !== undefined || params.translateDistance !== undefined;
  const hasScale = params.scaleFactor !== undefined;
  const hasTrack = params.trackFactor !== undefined;
  const movementGroups = [hasTranslation, hasScale, hasTrack].filter(Boolean);

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
    params.translatePx !== undefined &&
    params.translateDistance !== undefined
  ) {
    errors.push(`${entry.id}: translatePx and translateDistance are exclusive`);
  }

  if (
    (params.translateFrom !== undefined || params.translateTo !== undefined) &&
    params.translateDistance === undefined
  ) {
    errors.push(
      `${entry.id}: translateFrom/translateTo require translateDistance`,
    );
  }

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

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
    const { values, times } = params.keyframes;

    if (values.length !== times.length) {
      errors.push(`${entry.id}: keyframe values/times length mismatch`);
    }

    if (times[0] !== 0 || times[times.length - 1] !== 1) {
      errors.push(`${entry.id}: keyframe times must start at 0 and end at 1`);
    }

    for (let index = 1; index < times.length; index += 1) {
      if (times[index] < times[index - 1]) {
        errors.push(`${entry.id}: keyframe times must be monotonic`);
      }
    }
  }

  if (params.opacityKeyframes !== undefined) {
    const { values, times } = params.opacityKeyframes;

    if (values.length !== times.length) {
      errors.push(`${entry.id}: opacity keyframe values/times length mismatch`);
    }

    if (times[0] !== 0 || times[times.length - 1] !== 1) {
      errors.push(
        `${entry.id}: opacity keyframe times must start at 0 and end at 1`,
      );
    }

    for (let index = 1; index < times.length; index += 1) {
      if (times[index] < times[index - 1]) {
        errors.push(`${entry.id}: opacity keyframe times must be monotonic`);
      }
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

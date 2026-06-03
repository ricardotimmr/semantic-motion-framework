import { mappings } from "../../../prototyp/src/data/mappings";
import {
  COMPONENT_IDS,
  DIMENSIONS,
} from "../../../prototyp/src/framework/types";
import type {
  Dimension,
  Subcategory,
} from "../../../prototyp/src/framework/types";
import {
  getMapping,
  getMappingById,
  getMappingFor,
  getOutOfScopeCombinations,
  getSupportedComponents,
} from "../../../prototyp/src/framework/classifier";
import {
  validateMappingDatabase,
  validateMappingEntry,
} from "../../../prototyp/src/framework/validation";

describe("POC 02 mapping database validation", () => {
  it("validates the current mapping database without structural errors", () => {
    const report = validateMappingDatabase();

    expect(report.totalEntries).toBe(24);
    expect(report.uniqueIds).toBe(24);
    expect(report.errors).toEqual([]);
  });

  it("keeps all mapping entries reachable through the lookup function", () => {
    for (const entry of mappings) {
      expect(
        getMappingFor(entry.component, entry.dimension, entry.subcategory)?.id,
      ).toBe(entry.id);
      expect(getMappingById(entry.id)?.id).toBe(entry.id);
    }
  });

  it("returns a concrete mapping for a valid semantic combination", () => {
    const entry = getMappingFor("button", "feedback", "error");

    expect(entry).not.toBeNull();
    expect(entry?.id).toBe("button-feedback-error");
    expect(entry?.params.easing).toEqual({ preset: "sharp" });
    expect(entry?.params.direction).toBe("x");
    expect(entry?.params.keyframes?.values).toEqual([
      0, -8, 8, -8, 8, -4, 0,
    ]);
    expect(entry?.rationale.source).toContain("Peirce");
    expect(entry?.rationale.references.length).toBeGreaterThan(0);
  });

  it("returns null for combinations outside the current framework scope", () => {
    expect(getMappingFor("button", "direction", "enter")).toBeNull();
  });

  it("also fails safely for malformed runtime input", () => {
    const malformedResult = getMapping({
      component: "button",
      dimension: "doesNotExist" as Dimension,
      subcategory: "success" as Subcategory,
    });

    expect(malformedResult).toBeNull();
  });

  it("makes the distinction between defined and supported options explicit", () => {
    expect(COMPONENT_IDS).toEqual([
      "button",
      "toggle",
      "toast",
      "modal",
      "input",
      "skeleton",
    ]);
    expect(DIMENSIONS).toEqual([
      "feedback",
      "stateChange",
      "direction",
      "hierarchy",
      "attention",
    ]);
    expect(getSupportedComponents()).toEqual([...COMPONENT_IDS]);
    expect(getOutOfScopeCombinations().length).toBeGreaterThan(0);
  });

  it("requires scaleMode when scaleFactor is used", () => {
    const entry = getMappingById("button-feedback-success");

    expect(entry).not.toBeNull();

    const errors = validateMappingEntry({
      ...entry!,
      params: {
        ...entry!.params,
        scaleMode: undefined,
      },
    });

    expect(errors).toContain("button-feedback-success: scaleFactor requires scaleMode");
  });

  it("rejects negative scaleFactor values", () => {
    const entry = getMappingById("modal-hierarchy-toBackground");

    expect(entry).not.toBeNull();

    const errors = validateMappingEntry({
      ...entry!,
      params: {
        ...entry!.params,
        scaleFactor: -0.04,
      },
    });

    expect(errors).toContain(
      "modal-hierarchy-toBackground: scaleFactor must be greater than 0",
    );
  });
});

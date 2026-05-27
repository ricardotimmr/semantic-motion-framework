import type { MappingEntry } from "../../../prototyp/src/framework/types";

type PreviewChoreography = {
  holdInitialMs: number;
};

const defaultChoreography: PreviewChoreography = {
  holdInitialMs: 0,
};

const choreographyByMappingId: Partial<Record<string, PreviewChoreography>> = {
  "modal-hierarchy-toForeground": {
    holdInitialMs: 140,
  },
  "modal-hierarchy-toBackground": {
    holdInitialMs: 260,
  },
};

export function getPreviewChoreography(entry: MappingEntry): PreviewChoreography {
  return choreographyByMappingId[entry.id] ?? defaultChoreography;
}

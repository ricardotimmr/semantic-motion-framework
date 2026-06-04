import type { MappingEntry } from "../../../prototyp/src/framework/types";

type PreviewChoreography = {
  holdInitialMs: number;
};

const defaultChoreography: PreviewChoreography = {
  holdInitialMs: 0,
};

const choreographyByMappingId: Partial<Record<string, PreviewChoreography>> = {
  "modal-hierarchy-toForeground": {
    holdInitialMs: 180,
  },
  "modal-hierarchy-toBackground": {
    holdInitialMs: 260,
  },
  "card-hierarchy-toForeground": {
    holdInitialMs: 160,
  },
  "card-hierarchy-toBackground": {
    holdInitialMs: 220,
  },
  "modal-direction-enter": {
    holdInitialMs: 140,
  },
  "modal-direction-backEnter": {
    holdInitialMs: 140,
  },
  "modal-direction-exit": {
    holdInitialMs: 180,
  },
  "modal-direction-backExit": {
    holdInitialMs: 180,
  },
  "input-stateChange-blur": {
    holdInitialMs: 220,
  },
  "skeleton-attention-resolved": {
    holdInitialMs: 260,
  },
};

export function getPreviewChoreography(entry: MappingEntry): PreviewChoreography {
  return choreographyByMappingId[entry.id] ?? defaultChoreography;
}

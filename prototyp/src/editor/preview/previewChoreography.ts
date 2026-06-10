import type { MappingEntry } from "../../framework/types";

type PreviewChoreography = {
  holdInitialMs: number;
};

const defaultChoreography: PreviewChoreography = {
  holdInitialMs: 0,
};

const choreographyByMappingId: Partial<Record<string, PreviewChoreography>> = {
  "toggle-stateChange-toggleOn": {
    holdInitialMs: 140,
  },
  "toggle-stateChange-toggleOff": {
    holdInitialMs: 140,
  },
  "modal-hierarchy-toForeground": {
    holdInitialMs: 180,
  },
  "modal-hierarchy-toBackground": {
    holdInitialMs: 260,
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
  "input-stateChange-focus": {
    holdInitialMs: 160,
  },
  "input-feedback-warning": {
    holdInitialMs: 140,
  },
  "skeleton-attention-resolved": {
    holdInitialMs: 260,
  },
};

export function getPreviewChoreography(entry: MappingEntry): PreviewChoreography {
  return choreographyByMappingId[entry.id] ?? defaultChoreography;
}

import type { TargetAndTransition, Transition } from "framer-motion";
import {
  EASING_CURVES,
  type EasingValue,
  type MappingEntry,
} from "../../../prototyp/src/framework/types";
import { getPreviewChoreography } from "./previewChoreography";

type PlaybackControls = {
  set: (definition: TargetAndTransition) => void;
  start: (definition: TargetAndTransition) => Promise<unknown>;
  stop: () => void;
};

type CardPlaybackControls = {
  affected: PlaybackControls;
  counterpart: PlaybackControls;
};

type CardPlaybackOptions = {
  reducedMotion?: boolean;
};

function shouldReduceMotion(entry: MappingEntry, options: CardPlaybackOptions) {
  return (
    options.reducedMotion === true &&
    entry.accessibility?.reducedMotion !== undefined &&
    entry.accessibility.reducedMotion !== "none"
  );
}

function waitForNextFrame() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => resolve());
  });
}

function wait(milliseconds: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, milliseconds);
  });
}

function formatEase(easing: EasingValue) {
  if ("preset" in easing) {
    return EASING_CURVES[easing.preset];
  }

  return easing.cubicBezier;
}

function getTransition(entry: MappingEntry): Transition {
  return {
    duration: entry.params.duration / 1000,
    ease: formatEase(entry.params.easing),
  };
}

function getReducedTransition(): Transition {
  return {
    duration: 0.12,
    ease: EASING_CURVES.easeOut,
  };
}

function getScaleStart(entry: MappingEntry) {
  const factor = entry.params.scaleFactor ?? 0;

  if (entry.params.scaleMode === "scaleIn") {
    return 1 - factor;
  }

  return 1;
}

function getScaleEnd(entry: MappingEntry) {
  const factor = entry.params.scaleFactor ?? 0;

  if (entry.params.scaleMode === "scaleOut") {
    return 1 - factor;
  }

  return 1;
}

function getOpacityStart(entry: MappingEntry) {
  return entry.params.opacity?.[0] ?? 1;
}

function getOpacityEnd(entry: MappingEntry) {
  return entry.params.opacity?.[1] ?? 1;
}

async function resetControls(controls: CardPlaybackControls) {
  await controls.affected.stop();
  await controls.counterpart.stop();
}

async function playToForeground(
  entry: MappingEntry,
  controls: CardPlaybackControls,
  options: CardPlaybackOptions,
) {
  const useReducedMotion = shouldReduceMotion(entry, options);
  const transition = useReducedMotion
    ? getReducedTransition()
    : getTransition(entry);

  await resetControls(controls);
  await controls.affected.set({
    x: useReducedMotion ? 0 : 82,
    scale: getScaleStart(entry),
    opacity: getOpacityStart(entry),
    zIndex: 1,
  });
  await controls.counterpart.set({
    x: 0,
    scale: 1,
    opacity: 1,
    zIndex: 3,
  });
  await waitForNextFrame();
  await wait(getPreviewChoreography(entry).holdInitialMs);

  await Promise.all([
    controls.affected.start({
      x: 0,
      scale: getScaleEnd(entry),
      opacity: getOpacityEnd(entry),
      zIndex: 4,
      transition,
    }),
    controls.counterpart.start({
      x: useReducedMotion ? 0 : -82,
      scale: 0.97,
      opacity: 0.68,
      zIndex: 1,
      transition,
    }),
  ]);
}

async function playToBackground(
  entry: MappingEntry,
  controls: CardPlaybackControls,
  options: CardPlaybackOptions,
) {
  const useReducedMotion = shouldReduceMotion(entry, options);
  const transition = useReducedMotion
    ? getReducedTransition()
    : getTransition(entry);

  await resetControls(controls);
  await controls.affected.set({
    x: 0,
    scale: getScaleStart(entry),
    opacity: getOpacityStart(entry),
    zIndex: 4,
  });
  await controls.counterpart.set({
    x: useReducedMotion ? 0 : 82,
    scale: 0.96,
    opacity: 0.78,
    zIndex: 1,
  });
  await waitForNextFrame();
  await wait(getPreviewChoreography(entry).holdInitialMs);

  await Promise.all([
    controls.affected.start({
      x: useReducedMotion ? 0 : -82,
      scale: getScaleEnd(entry),
      opacity: getOpacityEnd(entry),
      zIndex: 1,
      transition,
    }),
    controls.counterpart.start({
      x: 0,
      scale: 1,
      opacity: 1,
      zIndex: 4,
      transition,
    }),
  ]);
}

export async function playCardPreviewAnimation(
  entry: MappingEntry,
  controls: CardPlaybackControls,
  options: CardPlaybackOptions = {},
) {
  if (entry.subcategory === "toBackground") {
    await playToBackground(entry, controls, options);
    return;
  }

  await playToForeground(entry, controls, options);
}

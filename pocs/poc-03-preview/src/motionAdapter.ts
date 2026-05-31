import type { TargetAndTransition, Transition } from "framer-motion";
import {
  EASING_CURVES,
  type ComponentId,
  type MappingEntry,
  type MotionPhase,
  type TranslationEdge,
} from "../../../prototyp/src/framework/types";
import { getPreviewChoreography } from "./previewChoreography";

type Axis = "x" | "y";

type PreviewSize = {
  width: number;
  height: number;
};

type PlaybackControls = {
  set: (definition: TargetAndTransition) => void;
  start: (definition: TargetAndTransition) => Promise<unknown>;
  stop: () => void;
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

const previewSizes: Record<ComponentId, PreviewSize> = {
  button: { width: 168, height: 42 },
  toggle: { width: 32, height: 0 },
  modal: { width: 340, height: 210 },
  toast: { width: 360, height: 78 },
  input: { width: 320, height: 48 },
  skeleton: { width: 360, height: 0 },
};

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

function getPreviewSize(component: ComponentId): PreviewSize {
  return previewSizes[component];
}

function getAxis(entry: MappingEntry): Axis {
  return entry.params.direction ?? "y";
}

function edgeToValue(edge: TranslationEdge, size: PreviewSize) {
  switch (edge) {
    case "left":
      return -size.width;
    case "right":
      return size.width;
    case "top":
      return -size.height;
    case "bottom":
      return size.height;
  }
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

function getRepeat(entry: MappingEntry) {
  const { iterations } = entry.params;

  if (iterations === Infinity) {
    return Infinity;
  }

  if (iterations !== undefined && iterations > 1) {
    return iterations - 1;
  }

  return undefined;
}

function getTransition(entry: MappingEntry): Transition {
  const { delay, easing, duration, springConfig } = entry.params;
  const repeat = getRepeat(entry);
  const baseTransition: Transition = {
    delay: delay !== undefined ? delay / 1000 : undefined,
    repeat,
    repeatType: repeat !== undefined ? "loop" : undefined,
  };

  if ("preset" in easing && easing.preset === "spring") {
    return {
      ...baseTransition,
      type: "spring",
      stiffness: springConfig?.stiffness,
      damping: springConfig?.damping,
      mass: springConfig?.mass,
    };
  }

  const ease =
    "preset" in easing ? EASING_CURVES[easing.preset] : easing.cubicBezier;

  return {
    ...baseTransition,
    duration: duration / 1000,
    ease,
  };
}

function getPhaseAxis(phase: MotionPhase): Axis {
  return phase.direction ?? "y";
}

function getPhaseTransition(
  entry: MappingEntry,
  phase: MotionPhase,
): Transition {
  const easing = phase.easing ?? entry.params.easing;
  const delay = phase.delay !== undefined ? phase.delay / 1000 : undefined;

  if ("preset" in easing && easing.preset === "spring") {
    const springConfig = phase.springConfig ?? entry.params.springConfig;

    return {
      delay,
      type: "spring",
      stiffness: springConfig?.stiffness,
      damping: springConfig?.damping,
      mass: springConfig?.mass,
    };
  }

  const ease = "preset" in easing ? EASING_CURVES[easing.preset] : easing.cubicBezier;

  return {
    delay,
    duration: phase.duration / 1000,
    ease,
  };
}

function getBaseTarget(entry: MappingEntry): TargetAndTransition {
  const target: TargetAndTransition = {
    x: 0,
    y: 0,
    scale: 1,
  };

  if (entry.params.opacity !== undefined) {
    target.opacity = entry.params.opacity[1];
  }

  return target;
}

function getInitialTarget(entry: MappingEntry): TargetAndTransition {
  const { params } = entry;
  const axis = getAxis(entry);
  const size = getPreviewSize(entry.component);
  const target = getBaseTarget(entry);
  const scaleAnimation = getScaleAnimation(entry);

  if (params.opacity !== undefined) {
    target.opacity = params.opacity[0];
  }

  if (scaleAnimation !== null) {
    target.scale = scaleAnimation.initial;
  }

  if (params.translateFrom !== undefined) {
    target[axis] = edgeToValue(params.translateFrom, size);
  }

  if (params.trackFactor !== undefined && params.trackFactor < 0) {
    target[axis] = Math.abs(params.trackFactor) * size.width;
  }

  if (entry.component === "skeleton" && params.trackFactor !== undefined) {
    target[axis] = -size.width;
  }

  return target;
}

function getPhasedInitialTarget(entry: MappingEntry): TargetAndTransition {
  const target: TargetAndTransition = {
    x: 0,
    y: 0,
    scale: 1,
    opacity: 1,
  };
  const firstPhase = entry.params.motionPhases?.[0];

  if (firstPhase === undefined) {
    return getInitialTarget(entry);
  }

  const axis = getPhaseAxis(firstPhase);
  const size = getPreviewSize(entry.component);

  if (firstPhase.opacity !== undefined) {
    target.opacity = firstPhase.opacity[0];
  }

  if (firstPhase.opacityKeyframes !== undefined) {
    target.opacity = firstPhase.opacityKeyframes.values[0];
  }

  if (firstPhase.scaleKeyframes !== undefined) {
    target.scale = firstPhase.scaleKeyframes.values[0];
  }

  if (firstPhase.translateFrom !== undefined) {
    target[axis] = edgeToValue(firstPhase.translateFrom, size);
  }

  if (firstPhase.translateTo !== undefined) {
    target[axis] = 0;
  }

  if (firstPhase.keyframes !== undefined) {
    target[axis] = firstPhase.keyframes.values[0];
  }

  return target;
}

function getPhaseAnimation(
  entry: MappingEntry,
  phase: MotionPhase,
): TargetAndTransition {
  const axis = getPhaseAxis(phase);
  const size = getPreviewSize(entry.component);
  const target: TargetAndTransition = {
    transition: getPhaseTransition(entry, phase),
  };
  const times =
    phase.keyframes?.times ??
    phase.scaleKeyframes?.times ??
    phase.opacityKeyframes?.times;

  if (times !== undefined) {
    target.transition = {
      ...target.transition,
      times,
    };
  }

  if (phase.opacity !== undefined) {
    target.opacity = phase.opacity[1];
  }

  if (phase.opacityKeyframes !== undefined) {
    target.opacity = phase.opacityKeyframes.values;
  }

  if (phase.scaleKeyframes !== undefined) {
    target.scale = phase.scaleKeyframes.values;
  }

  if (phase.translateFrom !== undefined) {
    target[axis] = 0;
  }

  if (phase.translateTo !== undefined) {
    target[axis] = edgeToValue(phase.translateTo, size);
  }

  if (phase.keyframes !== undefined) {
    target[axis] = phase.keyframes.values;
  }

  if (phase.translatePx !== undefined) {
    target[axis] = [0, phase.translatePx, 0];
  }

  return target;
}

async function playPhasedAnimation(
  entry: MappingEntry,
  controls: PlaybackControls,
) {
  const phases = entry.params.motionPhases;

  if (phases === undefined || phases.length === 0) {
    return;
  }

  await controls.stop();
  await controls.set(getPhasedInitialTarget(entry));
  await waitForNextFrame();
  await wait(getPreviewChoreography(entry).holdInitialMs);

  for (const phase of phases) {
    await controls.start(getPhaseAnimation(entry, phase));
  }
}

function getSingleStageAnimation(entry: MappingEntry): TargetAndTransition {
  const { params } = entry;
  const axis = getAxis(entry);
  const size = getPreviewSize(entry.component);
  const target = getBaseTarget(entry);
  const transition = getTransition(entry);

  if (params.opacityKeyframes !== undefined) {
    target.opacity = params.opacityKeyframes.values;

    if (params.translateFrom !== undefined) {
      const startValue = edgeToValue(params.translateFrom, size);
      target[axis] = params.opacityKeyframes.values.map((_, index) =>
        index === 0 ? startValue : 0,
      );
    }

    if (params.translateTo !== undefined) {
      const endValue = edgeToValue(params.translateTo, size);
      const lastIndex = params.opacityKeyframes.values.length - 1;
      target[axis] = params.opacityKeyframes.values.map((_, index) =>
        index === lastIndex ? endValue : 0,
      );
    }

    target.transition = {
      ...transition,
      times: params.opacityKeyframes.times,
    };
    return target;
  }

  if (params.keyframes !== undefined) {
    target[axis] = params.keyframes.values;
    target.transition = {
      ...transition,
      times: params.keyframes.times,
    };
    return target;
  }

  const scaleAnimation = getScaleAnimation(entry);

  if (scaleAnimation !== null) {
    target.scale = scaleAnimation.animate;

    if (scaleAnimation.type === "pulse") {
      target.transition = {
        ...transition,
        times: scaleAnimation.times,
      };
      return target;
    }
  }

  if (params.translateTo !== undefined) {
    target[axis] = edgeToValue(params.translateTo, size);
  }

  if (params.trackFactor !== undefined) {
    if (entry.component === "skeleton") {
      target[axis] = params.trackFactor * size.width;
    } else {
      target[axis] =
        params.trackFactor > 0 ? params.trackFactor * size.width : 0;
    }
  }

  target.transition = transition;
  return target;
}

async function playInputWarning(
  entry: MappingEntry,
  controls: PlaybackControls,
) {
  await controls.stop();
  await controls.set({
    x: 0,
    y: 0,
    scale: 1,
    opacity: 1,
  });
  await waitForNextFrame();
  await wait(getPreviewChoreography(entry).holdInitialMs);
}

export async function playMappingAnimation(
  entry: MappingEntry,
  controls: PlaybackControls,
) {
  if (entry.params.motionPhases !== undefined) {
    await playPhasedAnimation(entry, controls);
    return;
  }

  if (entry.id === "input-feedback-warning") {
    await playInputWarning(entry, controls);
    return;
  }

  await controls.stop();
  await controls.set(getInitialTarget(entry));
  await waitForNextFrame();
  await wait(getPreviewChoreography(entry).holdInitialMs);
  await controls.start(getSingleStageAnimation(entry));
}

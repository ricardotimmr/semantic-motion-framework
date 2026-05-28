import type { TargetAndTransition, Transition } from "framer-motion";
import {
  EASING_CURVES,
  type ComponentId,
  type MappingEntry,
  type TranslationEdge,
} from "../../../prototyp/src/framework/types";
import { getPreviewChoreography } from "./previewChoreography";

type Axis = "x" | "y";

type PreviewComponent = Extract<ComponentId, "button" | "modal" | "toast">;

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

const previewSizes: Record<PreviewComponent, PreviewSize> = {
  button: { width: 168, height: 42 },
  modal: { width: 340, height: 210 },
  toast: { width: 360, height: 78 },
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

function isPreviewComponent(
  component: ComponentId,
): component is PreviewComponent {
  return (
    component === "button" || component === "modal" || component === "toast"
  );
}

function getPreviewSize(component: ComponentId): PreviewSize {
  if (isPreviewComponent(component)) {
    return previewSizes[component];
  }

  return { width: 240, height: 80 };
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

function getTransition(entry: MappingEntry): Transition {
  const { easing, duration, springConfig } = entry.params;

  if ("preset" in easing && easing.preset === "spring") {
    return {
      type: "spring",
      stiffness: springConfig?.stiffness,
      damping: springConfig?.damping,
      mass: springConfig?.mass,
    };
  }

  const ease =
    "preset" in easing ? EASING_CURVES[easing.preset] : easing.cubicBezier;

  return {
    duration: duration / 1000,
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

  return target;
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

  target.transition = transition;
  return target;
}

async function playToastError(entry: MappingEntry, controls: PlaybackControls) {
  const size = getPreviewSize(entry.component);
  const transition = getTransition(entry);
  const halfDuration = entry.params.duration / 2000;

  await controls.stop();
  await controls.set({
    x: 0,
    y: edgeToValue("bottom", size),
    scale: 1,
    opacity: entry.params.opacity?.[0] ?? 1,
  });
  await waitForNextFrame();

  await controls.start({
    y: 0,
    opacity: entry.params.opacity?.[1] ?? 1,
    transition: {
      ...transition,
      duration: halfDuration,
    },
  });

  if (entry.params.keyframes !== undefined) {
    await controls.start({
      x: entry.params.keyframes.values,
      transition: {
        ...transition,
        duration: halfDuration,
        times: entry.params.keyframes.times,
      },
    });
  }
}

export async function playMappingAnimation(
  entry: MappingEntry,
  controls: PlaybackControls,
) {
  if (entry.id === "toast-feedback-error") {
    await playToastError(entry, controls);
    return;
  }

  await controls.stop();
  await controls.set(getInitialTarget(entry));
  await waitForNextFrame();
  await wait(getPreviewChoreography(entry).holdInitialMs);
  await controls.start(getSingleStageAnimation(entry));
}

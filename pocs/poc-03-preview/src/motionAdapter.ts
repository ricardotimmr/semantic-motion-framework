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

function isPreviewComponent(component: ComponentId): component is PreviewComponent {
  return component === "button" || component === "modal" || component === "toast";
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

  if (params.opacity !== undefined) {
    target.opacity = params.opacity[0];
  }

  if (params.scaleFactor !== undefined) {
    if (entry.dimension === "hierarchy" && params.scaleFactor > 0) {
      target.scale = 1 - params.scaleFactor;
    } else {
      target.scale = 1;
    }
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

  if (params.keyframes !== undefined) {
    target[axis] = params.keyframes.values;
    target.transition = {
      ...transition,
      times: params.keyframes.times,
    };
    return target;
  }

  if (params.scaleFactor !== undefined) {
    if (entry.dimension === "hierarchy") {
      target.scale = params.scaleFactor < 0 ? 1 + params.scaleFactor : 1;
    } else {
      target.scale = [1, 1 + params.scaleFactor, 1];
      target.transition = {
        ...transition,
        times: [0, 0.45, 1],
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

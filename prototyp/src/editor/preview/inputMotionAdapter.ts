import type { TargetAndTransition, Transition } from "framer-motion";
import {
  EASING_CURVES,
  type MappingEntry,
} from "../../framework/types";
import { getPreviewChoreography } from "./previewChoreography";

type InputPreviewControls = {
  container: PlaybackControls;
  field: PlaybackControls;
  label: PlaybackControls;
  message: PlaybackControls;
};

type InputPlaybackOptions = {
  reducedMotion?: boolean;
};

type PlaybackControls = {
  set: (definition: TargetAndTransition) => void;
  start: (definition: TargetAndTransition) => Promise<unknown>;
  stop: () => void;
};

const neutralContainer: TargetAndTransition = {
  x: 0,
  y: 0,
  scale: 1,
  opacity: 1,
  filter: "drop-shadow(0 0 0 rgba(47, 84, 70, 0))",
};

const focusedContainer: TargetAndTransition = {
  x: 0,
  y: 0,
  scale: 1.01,
  opacity: 1,
  filter: "drop-shadow(0 0 0.75rem rgba(47, 84, 70, 0.26))",
};

const neutralField: TargetAndTransition = {
  borderColor: "rgba(28, 28, 30, 0.14)",
  backgroundColor: "rgba(247, 241, 227, 0.6)",
};

const focusedField: TargetAndTransition = {
  borderColor: "rgba(47, 84, 70, 0.76)",
  backgroundColor: "rgba(247, 241, 227, 0.84)",
};

const warningField: TargetAndTransition = {
  borderColor: "rgba(152, 104, 18, 0.62)",
  backgroundColor: "rgba(247, 241, 227, 0.72)",
};

const successField: TargetAndTransition = {
  borderColor: "rgba(47, 122, 86, 0.72)",
  backgroundColor: "rgba(235, 247, 239, 0.72)",
};

const errorField: TargetAndTransition = {
  borderColor: "rgba(139, 46, 46, 0.62)",
  backgroundColor: "rgba(247, 241, 227, 0.72)",
};

const neutralLabel: TargetAndTransition = {
  color: "rgba(28, 28, 30, 0.55)",
};

const focusedLabel: TargetAndTransition = {
  color: "rgba(47, 84, 70, 0.95)",
};

const successLabel: TargetAndTransition = {
  color: "rgba(47, 122, 86, 0.95)",
};

const hiddenMessage: TargetAndTransition = {
  opacity: 0,
  y: 4,
};

const visibleMessage: TargetAndTransition = {
  opacity: 1,
  y: 0,
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

function getTransition(entry: MappingEntry): Transition {
  const { delay, duration, easing, springConfig } = entry.params;

  if ("preset" in easing && easing.preset === "spring") {
    return {
      delay: delay !== undefined ? delay / 1000 : undefined,
      type: "spring",
      stiffness: springConfig?.stiffness,
      damping: springConfig?.damping,
      mass: springConfig?.mass,
    };
  }

  return {
    delay: delay !== undefined ? delay / 1000 : undefined,
    duration: duration / 1000,
    ease: "preset" in easing ? EASING_CURVES[easing.preset] : easing.cubicBezier,
  };
}

function shouldUseReducedMotion(
  entry: MappingEntry,
  options: InputPlaybackOptions = {},
) {
  return (
    options.reducedMotion === true &&
    entry.accessibility?.reducedMotion !== undefined &&
    entry.accessibility.reducedMotion !== "none"
  );
}

function stopInputControls(controls: InputPreviewControls) {
  controls.container.stop();
  controls.field.stop();
  controls.label.stop();
  controls.message.stop();
}

function setInputState(
  controls: InputPreviewControls,
  state: {
    container?: TargetAndTransition;
    field?: TargetAndTransition;
    label?: TargetAndTransition;
    message?: TargetAndTransition;
  },
) {
  controls.container.set(state.container ?? neutralContainer);
  controls.field.set(state.field ?? neutralField);
  controls.label.set(state.label ?? neutralLabel);
  controls.message.set(state.message ?? hiddenMessage);
}

async function playInputFocus(
  entry: MappingEntry,
  controls: InputPreviewControls,
) {
  const transition = getTransition(entry);

  stopInputControls(controls);
  setInputState(controls, {
    container: neutralContainer,
    field: successField,
    label: successLabel,
    message: visibleMessage,
  });
  await waitForNextFrame();
  await wait(getPreviewChoreography(entry).holdInitialMs);

  await Promise.all([
    controls.container.start({ ...focusedContainer, transition }),
    controls.field.start({ ...focusedField, transition }),
    controls.label.start({ ...focusedLabel, transition }),
  ]);
}

async function playInputBlur(
  entry: MappingEntry,
  controls: InputPreviewControls,
) {
  const transition = getTransition(entry);

  stopInputControls(controls);
  setInputState(controls, {
    container: focusedContainer,
    field: focusedField,
    label: focusedLabel,
    message: hiddenMessage,
  });
  await waitForNextFrame();
  await wait(getPreviewChoreography(entry).holdInitialMs);

  await Promise.all([
    controls.container.start({ ...neutralContainer, transition }),
    controls.field.start({ ...neutralField, transition }),
    controls.label.start({ ...neutralLabel, transition }),
  ]);
}

async function playInputWarning(
  entry: MappingEntry,
  controls: InputPreviewControls,
) {
  const transition = getTransition(entry);

  stopInputControls(controls);
  setInputState(controls, {
    container: neutralContainer,
    field: warningField,
    label: neutralLabel,
    message: hiddenMessage,
  });
  await waitForNextFrame();
  await wait(getPreviewChoreography(entry).holdInitialMs);

  await controls.message.start({
    ...visibleMessage,
    transition,
  });
}

async function playInputSuccess(
  entry: MappingEntry,
  controls: InputPreviewControls,
) {
  const transition = getTransition(entry);
  const scaleFactor = entry.params.scaleFactor ?? 0.02;

  stopInputControls(controls);
  setInputState(controls, {
    container: neutralContainer,
    field: neutralField,
    label: neutralLabel,
    message: hiddenMessage,
  });
  await waitForNextFrame();
  await wait(getPreviewChoreography(entry).holdInitialMs);

  await controls.container.start({
    scale: [1, 1 + scaleFactor, 1],
    transition: {
      ...transition,
      times: [0, 0.45, 1],
    },
  });
}

async function playInputRequiredField(
  entry: MappingEntry,
  controls: InputPreviewControls,
) {
  const transition = getTransition(entry);
  const scaleFactor = entry.params.scaleFactor ?? 0.015;

  stopInputControls(controls);
  setInputState(controls, {
    container: neutralContainer,
    field: warningField,
    label: focusedLabel,
    message: visibleMessage,
  });
  await waitForNextFrame();
  await wait(getPreviewChoreography(entry).holdInitialMs);

  await controls.container.start({
    scale: [1, 1 + scaleFactor, 1],
    transition: {
      ...transition,
      repeat: Math.max((entry.params.iterations ?? 1) - 1, 0),
      times: [0, 0.5, 1],
    },
  });
}

async function playInputShake(
  entry: MappingEntry,
  controls: InputPreviewControls,
) {
  const transition = getTransition(entry);
  const values = entry.params.keyframes?.values ?? [0, 0];
  const times = entry.params.keyframes?.times;

  stopInputControls(controls);
  setInputState(controls, {
    container: neutralContainer,
    field: errorField,
    label: neutralLabel,
    message: hiddenMessage,
  });
  await waitForNextFrame();
  await wait(getPreviewChoreography(entry).holdInitialMs);

  await controls.container.start({
    x: values,
    transition: {
      ...transition,
      times,
    },
  });
}

async function playReducedInputMotion(
  entry: MappingEntry,
  controls: InputPreviewControls,
) {
  const isRequiredField = entry.id === "input-attention-requiredField";

  stopInputControls(controls);
  setInputState(controls, {
    container: neutralContainer,
    field: isRequiredField ? warningField : errorField,
    label: isRequiredField ? focusedLabel : neutralLabel,
    message: isRequiredField ? visibleMessage : hiddenMessage,
  });
  await waitForNextFrame();
  await wait(getPreviewChoreography(entry).holdInitialMs);
}

export async function playInputPreviewAnimation(
  entry: MappingEntry,
  controls: InputPreviewControls,
  options: InputPlaybackOptions = {},
) {
  if (shouldUseReducedMotion(entry, options)) {
    await playReducedInputMotion(entry, controls);
    return;
  }

  if (entry.id === "input-stateChange-focus") {
    await playInputFocus(entry, controls);
    return;
  }

  if (entry.id === "input-stateChange-blur") {
    await playInputBlur(entry, controls);
    return;
  }

  if (entry.id === "input-feedback-warning") {
    await playInputWarning(entry, controls);
    return;
  }

  if (entry.id === "input-feedback-success") {
    await playInputSuccess(entry, controls);
    return;
  }

  if (entry.id === "input-attention-requiredField") {
    await playInputRequiredField(entry, controls);
    return;
  }

  if (entry.id === "input-feedback-error") {
    await playInputShake(entry, controls);
    return;
  }

  stopInputControls(controls);
  setInputState(controls, {
    container: neutralContainer,
    field: neutralField,
    label: neutralLabel,
    message: hiddenMessage,
  });
}

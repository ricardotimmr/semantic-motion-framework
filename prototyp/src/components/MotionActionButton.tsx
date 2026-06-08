import {
  motion,
  useAnimationControls,
  useReducedMotion,
  type HTMLMotionProps,
} from 'framer-motion';
import { forwardRef } from 'react';
import { getMappingById } from '../framework/classifier';
import { EASING_CURVES } from '../framework/types';

type MotionActionButtonProps = Omit<HTMLMotionProps<'button'>, 'animate'> & {
  successFeedback?: boolean;
};

const feedbackEntry = getMappingById('button-feedback-success');

function getFeedbackAnimation() {
  const params = feedbackEntry?.params;
  const scaleFactor = params?.scaleFactor ?? 0.05;
  const duration = params?.duration ?? 250;
  const easing = params?.easing;
  const ease =
    easing !== undefined && 'preset' in easing
      ? EASING_CURVES[easing.preset]
      : easing?.cubicBezier ?? EASING_CURVES.easeOut;

  return {
    scale: [1, 1 + scaleFactor, 1],
    transition: {
      duration: duration / 1000,
      ease,
      times: [0, 0.45, 1],
    },
  };
}

const MotionActionButton = forwardRef<
  HTMLButtonElement,
  MotionActionButtonProps
>(function MotionActionButton(
  {
    children,
    disabled,
    onPointerDown,
    successFeedback = true,
    type = 'button',
    ...props
  },
  ref,
) {
  const controls = useAnimationControls();
  const shouldReduceMotion = useReducedMotion();

  const triggerFeedback: NonNullable<
    MotionActionButtonProps['onPointerDown']
  > = (event) => {
    onPointerDown?.(event);

    if (
      disabled ||
      event.defaultPrevented ||
      shouldReduceMotion ||
      !successFeedback
    ) {
      return;
    }

    void controls.start(getFeedbackAnimation());
  };

  return (
    <motion.button
      {...props}
      animate={controls}
      disabled={disabled}
      onPointerDown={triggerFeedback}
      ref={ref}
      type={type}
    >
      {children}
    </motion.button>
  );
});

export default MotionActionButton;

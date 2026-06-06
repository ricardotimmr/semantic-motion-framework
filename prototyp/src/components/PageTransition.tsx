import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import type { PageId } from '../pages/pageTypes';

export type PageTransitionDirection = -1 | 0 | 1;

type PageTransitionProps = {
  children: ReactNode;
  direction: PageTransitionDirection;
  pageKey: PageId;
};

const transition = {
  duration: 0.38,
  ease: [0.4, 0, 0.2, 1],
} as const;

function PageTransition({
  children,
  direction,
  pageKey,
}: PageTransitionProps) {
  const shouldReduceMotion = useReducedMotion();

  const variants = {
    enter: (pageDirection: PageTransitionDirection) => ({
      opacity: shouldReduceMotion ? 0 : 1,
      x: shouldReduceMotion ? 0 : `${pageDirection * 100}%`,
    }),
    center: {
      opacity: 1,
      x: 0,
    },
    exit: (pageDirection: PageTransitionDirection) => ({
      opacity: shouldReduceMotion ? 0 : 1,
      x: shouldReduceMotion ? 0 : `${pageDirection * -100}%`,
    }),
  };

  return (
    <div className="page-transition-shell">
      <AnimatePresence custom={direction} initial={false} mode="sync">
        <motion.div
          animate="center"
          className="page-transition-panel"
          custom={direction}
          exit="exit"
          initial="enter"
          key={pageKey}
          transition={transition}
          variants={variants}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default PageTransition;

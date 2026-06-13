import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import type { PageId } from '../pages/pageTypes';

export type PageTransitionDirection = -1 | 0 | 1;

type PageTransitionProps = {
  children: ReactNode;
  direction: PageTransitionDirection;
  frozenPage: PageId | null;
  isFixedTransitioning: boolean;
  onTransitionComplete?: () => void;
  pageKey: PageId;
  placeholderHeight: number;
  scrollOffset: number;
};

type PageTransitionCustom = {
  direction: PageTransitionDirection;
};

const transition = {
  opacity: {
    duration: 0.38,
    ease: [0.4, 0, 0.2, 1],
  },
  x: {
    duration: 0.38,
    ease: [0.4, 0, 0.2, 1],
  },
} as const;

function PageTransition({
  children,
  direction,
  frozenPage,
  isFixedTransitioning,
  onTransitionComplete,
  pageKey,
  placeholderHeight,
  scrollOffset,
}: PageTransitionProps) {
  const shouldReduceMotion = useReducedMotion();
  const custom = { direction };
  const isFrozenPage = frozenPage === pageKey;

  const variants = {
    enter: ({ direction: pageDirection }: PageTransitionCustom) => ({
      opacity: shouldReduceMotion ? 0 : 1,
      x: shouldReduceMotion ? 0 : `${pageDirection * 100}%`,
    }),
    center: {
      opacity: 1,
      x: 0,
    },
    exit: ({ direction: pageDirection }: PageTransitionCustom) => ({
      opacity: shouldReduceMotion ? 0 : 1,
      x: shouldReduceMotion ? 0 : `${pageDirection * -100}%`,
    }),
  };

  return (
    <div className="page-transition-host">
      {isFixedTransitioning && (
        <div
          aria-hidden="true"
          className="page-transition-placeholder"
          style={{ height: placeholderHeight }}
        />
      )}
      <div
        className={[
          'page-transition-shell',
          isFixedTransitioning ? 'is-fixed-transitioning' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <AnimatePresence
          custom={custom}
          initial={false}
          mode="sync"
          onExitComplete={onTransitionComplete}
        >
          <motion.div
            animate="center"
            className="page-transition-panel"
            custom={custom}
            exit="exit"
            initial="enter"
            key={pageKey}
            style={{ y: isFrozenPage ? -scrollOffset : 0 }}
            transition={transition}
            variants={variants}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default PageTransition;

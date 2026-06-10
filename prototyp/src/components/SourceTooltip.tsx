import { useEffect, useRef, useState } from 'react';
import MotionActionButton from './MotionActionButton';

type SourceTooltipProps = {
  align?: 'auto' | 'left' | 'right';
  id: string;
  label: string;
  placement?: 'top' | 'bottom';
  source: string;
};

function isMobileTooltipViewport() {
  return window.matchMedia('(max-width: 1120px)').matches;
}

function SourceTooltip({
  align = 'right',
  id,
  label,
  placement = 'bottom',
  source,
}: SourceTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [resolvedAlign, setResolvedAlign] = useState<'left' | 'right'>(
    align === 'left' ? 'left' : 'right',
  );
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const tooltipId = `${id}-tooltip`;
  const mobilePanelId = `${id}-mobile-panel`;

  const resolveDesktopAlign = () => {
    if (align !== 'auto' || isMobileTooltipViewport()) {
      return;
    }

    const trigger = triggerRef.current;

    if (!trigger) {
      return;
    }

    const rect = trigger.getBoundingClientRect();
    const viewportPadding = 16;
    const tooltipWidth = Math.min(416, window.innerWidth * 0.7);
    const wouldOverflowRight =
      rect.left + tooltipWidth > window.innerWidth - viewportPadding;
    const wouldOverflowLeft = rect.right - tooltipWidth < viewportPadding;

    if (wouldOverflowRight && !wouldOverflowLeft) {
      setResolvedAlign('right');
      return;
    }

    if (wouldOverflowLeft && !wouldOverflowRight) {
      setResolvedAlign('left');
      return;
    }

    setResolvedAlign('right');
  };

  useEffect(() => {
    setIsOpen(false);
    setResolvedAlign(align === 'left' ? 'left' : 'right');
  }, [align, id, source]);

  return (
    <span
      className={[
        'source-tooltip-wrap',
        `align-${resolvedAlign}`,
        `placement-${placement}`,
        isOpen ? 'is-open' : '',
      ].join(' ')}
    >
      <MotionActionButton
        aria-controls={mobilePanelId}
        aria-describedby={tooltipId}
        aria-expanded={isOpen}
        aria-label={label}
        className="source-tooltip-trigger"
        onClick={() => {
          if (isMobileTooltipViewport()) {
            setIsOpen((current) => !current);
          }
        }}
        onFocus={resolveDesktopAlign}
        onMouseEnter={resolveDesktopAlign}
        ref={triggerRef}
        successFeedback={false}
        type="button"
      >
        ?
      </MotionActionButton>
      <span className="source-tooltip-bubble" id={tooltipId} role="tooltip">
        {source}
      </span>
      <span className="source-tooltip-mobile-panel" id={mobilePanelId}>
        {source}
      </span>
    </span>
  );
}

export default SourceTooltip;

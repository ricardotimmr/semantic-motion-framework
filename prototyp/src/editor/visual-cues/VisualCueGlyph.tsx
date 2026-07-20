import type { ComponentType, SVGProps } from 'react';
import type { VisualCueId } from '../../framework/types';
import { RefusalGestureGlyph } from './glyphs/RefusalGestureGlyph';
import { PulseSignalGlyph } from './glyphs/PulseSignalGlyph';
import { ToggleTravelGlyph } from './glyphs/ToggleTravelGlyph';
import { ArrivalGlyph } from './glyphs/ArrivalGlyph';
import { DepartureGlyph } from './glyphs/DepartureGlyph';
import { NudgeSignalGlyph } from './glyphs/NudgeSignalGlyph';
import { ReturnLayerGlyph } from './glyphs/ReturnLayerGlyph';
import { ForegroundGlyph } from './glyphs/ForegroundGlyph';
import { BackgroundRecedeGlyph } from './glyphs/BackgroundRecedeGlyph';
import { FocusSignalGlyph } from './glyphs/FocusSignalGlyph';
import { HelperMessageGlyph } from './glyphs/HelperMessageGlyph';
import { ShimmerSignalGlyph } from './glyphs/ShimmerSignalGlyph';
import { FadeResolveGlyph } from './glyphs/FadeResolveGlyph';

type VisualCueGlyphProps = SVGProps<SVGSVGElement> & {
  cue: VisualCueId;
};

type GlyphComponent = ComponentType<SVGProps<SVGSVGElement>>;

const glyphByVisualCueId = {
  refusalGesture: RefusalGestureGlyph,
  pulseSignal: PulseSignalGlyph,
  toggleTravel: ToggleTravelGlyph,
  arrival: ArrivalGlyph,
  departure: DepartureGlyph,
  nudgeSignal: NudgeSignalGlyph,
  returnLayer: ReturnLayerGlyph,
  foreground: ForegroundGlyph,
  backgroundRecede: BackgroundRecedeGlyph,
  focusSignal: FocusSignalGlyph,
  helperMessage: HelperMessageGlyph,
  shimmerSignal: ShimmerSignalGlyph,
  fadeResolve: FadeResolveGlyph,
} satisfies Record<VisualCueId, GlyphComponent>;

export function VisualCueGlyph({
  cue,
  className,
  ...svgProps
}: VisualCueGlyphProps) {
  const Glyph = glyphByVisualCueId[cue];
  const glyphClassName = ['visual-cue-glyph', className]
    .filter(Boolean)
    .join(' ');

  return (
    <Glyph
      aria-hidden="true"
      className={glyphClassName}
      focusable="false"
      {...svgProps}
    />
  );
}

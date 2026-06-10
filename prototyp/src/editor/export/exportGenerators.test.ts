import { describe, expect, it } from 'vitest';
import { mappings } from '../../data/mappings';
import { getMappingById } from '../../framework/classifier';
import type { MappingEntry } from '../../framework/types';
import {
  generateCSSCode,
  generateExportBundle,
  generateFramerMotionCode,
} from './exportGenerators';

describe('editor export generators', () => {
  it('generates Framer Motion and CSS code for every mapping entry', () => {
    for (const entry of mappings) {
      const bundle = generateExportBundle(entry);

      expect(bundle.framerMotion).toContain(entry.id);
      expect(bundle.framerMotion).toContain(entry.rationale.short);
      expect(bundle.css).toContain(`smf-${entry.id}`);
      expect(bundle.css).toContain(entry.rationale.short);
    }
  });

  it('exports button error as x keyframes in both targets', () => {
    const entry = getMappingById('button-feedback-error');

    expect(entry).not.toBeNull();

    const framerCode = generateFramerMotionCode(entry!);
    const cssCode = generateCSSCode(entry!);

    expect(framerCode).toContain('x: [0, -8, 8, -8, 8, -4, 0]');
    expect(framerCode).toContain('times: [0, 0.15, 0.3, 0.45, 0.6, 0.8, 1]');
    expect(cssCode).toContain('translateX(-8px)');
    expect(cssCode).toContain('translateX(8px)');
  });

  it('exports spring mappings as Framer Motion spring transitions', () => {
    const entry = getMappingById('toast-feedback-success');

    expect(entry).not.toBeNull();

    const framerCode = generateFramerMotionCode(entry!);
    const cssCode = generateCSSCode(entry!);

    expect(framerCode).toContain('type: "spring"');
    expect(framerCode).toContain('stiffness: 360');
    expect(framerCode).toContain('damping: 20');
    expect(framerCode).not.toContain('ease: [0, 0, 0.2, 1]');
    expect(cssCode).toContain('CSS unterstützt keine echte Spring-Physik');
    expect(cssCode).toContain('cubic-bezier');
  });

  it('exports toast error as a two-phase sequence', () => {
    const entry = getMappingById('toast-feedback-error');

    expect(entry).not.toBeNull();

    const framerCode = generateFramerMotionCode(entry!);
    const cssCode = generateCSSCode(entry!);

    expect(framerCode).toContain('async function toastFeedbackError');
    expect(framerCode).toContain('Phase: enter');
    expect(framerCode).toContain('Phase: shake');
    expect(cssCode).toContain('translateY(100%)');
    expect(cssCode).toContain('translateX(-6px)');
  });

  it('exports toast warning as enter plus y nudge', () => {
    const entry = getMappingById('toast-feedback-warning');

    expect(entry).not.toBeNull();

    const framerCode = generateFramerMotionCode(entry!);
    const cssCode = generateCSSCode(entry!);

    expect(framerCode).toContain('async function toastFeedbackWarning');
    expect(framerCode).toContain('Phase: enter');
    expect(framerCode).toContain('Phase: nudge');
    expect(framerCode).toContain('y: [0, -5, 0]');
    expect(cssCode).toContain(
      '84% { opacity: 1; transform: translateX(0) translateY(-5px) scale(1); }',
    );
  });

  it('exports toast one-shot attention as enter plus scale pulses', () => {
    const entry = getMappingById('toast-attention-oneShot');

    expect(entry).not.toBeNull();

    const framerCode = generateFramerMotionCode(entry!);
    const cssCode = generateCSSCode(entry!);

    expect(framerCode).toContain('async function toastAttentionOneShot');
    expect(framerCode).toContain('Phase: enter');
    expect(framerCode).toContain('Phase: pulse');
    expect(framerCode).toContain('scale: [1, 1.025, 1, 1.025, 1]');
    expect(cssCode).toContain(
      '56.5789% { opacity: 1; transform: translateX(0) translateY(0) scale(1.025); }',
    );
    expect(cssCode).toContain(
      '85.5263% { opacity: 1; transform: translateX(0) translateY(0) scale(1.025); }',
    );
  });

  it('warns when CSS approximates phase-specific easing', () => {
    const baseEntry = getMappingById('toast-feedback-error');

    expect(baseEntry).not.toBeNull();

    const entry: MappingEntry = {
      ...baseEntry!,
      params: {
        ...baseEntry!.params,
        motionPhases: baseEntry!.params.motionPhases!.map((phase, index) =>
          index === 1 ? { ...phase, easing: { preset: 'easeInOut' } } : phase,
        ),
      },
    };

    const cssCode = generateCSSCode(entry);

    expect(cssCode).toContain('phase-spezifisches Easing');
    expect(cssCode).toContain('Top-Level-Easing-Kurve');
  });

  it('exports input warning as helper text motion plus opacity pulses', () => {
    const entry = getMappingById('input-feedback-warning');

    expect(entry).not.toBeNull();

    const framerCode = generateFramerMotionCode(entry!);
    const cssCode = generateCSSCode(entry!);

    expect(framerCode).toContain('message');
    expect(framerCode).toContain('y: 4');
    expect(framerCode).toContain('y: [4, 0, 0, 0, 0, 0]');
    expect(framerCode).toContain('0.72');
    expect(cssCode).toContain('.smf-input-feedback-warning .input-message');
    expect(cssCode).toContain('transform: translateY(4px)');
    expect(cssCode).toContain('opacity: 0.72');
  });

  it('exports input focus and blur as ring, field, and label transitions', () => {
    const focus = getMappingById('input-stateChange-focus');
    const blur = getMappingById('input-stateChange-blur');

    expect(focus).not.toBeNull();
    expect(blur).not.toBeNull();

    const focusCode = generateFramerMotionCode(focus!);
    const blurCSS = generateCSSCode(blur!);

    expect(focusCode).toContain('scale: 1.01');
    expect(focusCode).toContain('borderColor');
    expect(focusCode).toContain('label');
    expect(blurCSS).toContain('smf-input-stateChange-blur-ring');
    expect(blurCSS).toContain('210ms');
    expect(blurCSS).toContain('transform: scale(1);');
  });

  it('exports scaleFactor as pulse, scale-in, or scale-out by scaleMode', () => {
    const buttonSuccess = getMappingById('button-feedback-success');
    const modalForeground = getMappingById('modal-hierarchy-toForeground');
    const modalBackground = getMappingById('modal-hierarchy-toBackground');

    expect(buttonSuccess).not.toBeNull();
    expect(modalForeground).not.toBeNull();
    expect(modalBackground).not.toBeNull();

    const buttonCode = generateFramerMotionCode(buttonSuccess!);
    const foregroundCode = generateFramerMotionCode(modalForeground!);
    const backgroundCode = generateFramerMotionCode(modalBackground!);

    expect(buttonCode).toContain('scale: [1, 1.05, 1]');
    expect(foregroundCode).toContain('scale: 0.95');
    expect(foregroundCode).toContain('scale: 1, // Zielgröße');
    expect(backgroundCode).toContain('scale: 1, // Startgröße');
    expect(backgroundCode).toContain('scale: 0.96');
  });
});

import { mappings } from "../../../prototyp/src/data/mappings";
import { getMappingById } from "../../../prototyp/src/framework/classifier";
import {
  generateCSSCode,
  generateExportBundle,
  generateFramerMotionCode,
} from "./exportGenerators";

describe("POC 04 export generators", () => {
  it("generates Framer Motion and CSS code for every mapping entry", () => {
    for (const entry of mappings) {
      const bundle = generateExportBundle(entry);

      expect(bundle.framerMotion).toContain(entry.id);
      expect(bundle.framerMotion).toContain(entry.rationale.short);
      expect(bundle.css).toContain(`smf-${entry.id}`);
      expect(bundle.css).toContain(entry.rationale.short);
    }
  });

  it("exports button error as x keyframes in both targets", () => {
    const entry = getMappingById("button-feedback-error");

    expect(entry).not.toBeNull();

    const framerCode = generateFramerMotionCode(entry!);
    const cssCode = generateCSSCode(entry!);

    expect(framerCode).toContain("x: [0, -8, 8, -8, 8, -4, 0]");
    expect(framerCode).toContain("times: [0, 0.15, 0.3, 0.45, 0.6, 0.8, 1]");
    expect(cssCode).toContain("translateX(-8px)");
    expect(cssCode).toContain("translateX(8px)");
  });

  it("exports spring mappings as Framer Motion spring transitions", () => {
    const entry = getMappingById("toast-feedback-success");

    expect(entry).not.toBeNull();

    const framerCode = generateFramerMotionCode(entry!);
    const cssCode = generateCSSCode(entry!);

    expect(framerCode).toContain('type: "spring"');
    expect(framerCode).toContain("stiffness: 320");
    expect(framerCode).not.toContain("ease: [0, 0, 0.2, 1]");
    expect(cssCode).toContain("CSS unterstützt keine echte Spring-Physik");
    expect(cssCode).toContain("cubic-bezier");
  });

  it("exports toast error as a two-phase sequence", () => {
    const entry = getMappingById("toast-feedback-error");

    expect(entry).not.toBeNull();

    const framerCode = generateFramerMotionCode(entry!);
    const cssCode = generateCSSCode(entry!);

    expect(framerCode).toContain("async function toastFeedbackError");
    expect(framerCode).toContain("erste Phase: y-Einfahrt");
    expect(framerCode).toContain("zweite Phase: x-Shake");
    expect(cssCode).toContain("translateY(100%)");
    expect(cssCode).toContain("translateY(0) translateX(-6px)");
  });

  it("exports toast one-shot attention with opacity pulse", () => {
    const entry = getMappingById("toast-attention-oneShot");

    expect(entry).not.toBeNull();

    const framerCode = generateFramerMotionCode(entry!);
    const cssCode = generateCSSCode(entry!);

    expect(framerCode).toContain("opacity: [0, 1, 0.86, 1, 0.86, 1]");
    expect(framerCode).toContain('y: ["100%", "0%", "0%", "0%", "0%", "0%"]');
    expect(framerCode).toContain("times: [0, 0.4, 0.55, 0.7, 0.85, 1]");
    expect(cssCode).toContain("55% { opacity: 0.86; transform: translateY(0); }");
    expect(cssCode).toContain("85% { opacity: 0.86; transform: translateY(0); }");
  });

  it("exports scaleFactor as pulse, scale-in, or scale-out by semantic context", () => {
    const buttonSuccess = getMappingById("button-feedback-success");
    const modalForeground = getMappingById("modal-hierarchy-toForeground");
    const modalBackground = getMappingById("modal-hierarchy-toBackground");

    expect(buttonSuccess).not.toBeNull();
    expect(modalForeground).not.toBeNull();
    expect(modalBackground).not.toBeNull();

    const buttonCode = generateFramerMotionCode(buttonSuccess!);
    const foregroundCode = generateFramerMotionCode(modalForeground!);
    const backgroundCode = generateFramerMotionCode(modalBackground!);

    expect(buttonCode).toContain("scale: [1, 1.05, 1]");
    expect(foregroundCode).toContain("scale: 0.95");
    expect(foregroundCode).toContain("scale: 1, // Zielgröße");
    expect(backgroundCode).toContain("scale: 1, // Startgröße");
    expect(backgroundCode).toContain("scale: 0.96");
  });
});

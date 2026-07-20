import type { SVGProps } from 'react';

export function ShimmerSignalGlyph(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" {...props}>
      <rect
        x="12"
        y="14"
        width="40"
        height="36"
        rx="6"
        fill="currentColor"
        opacity="0.08"
      />
      <path
        d="M18 24H42"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M18 33H35"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M18 42H46"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M36 50L48 14"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
        opacity="0.2"
      />
      <path
        d="M39 50L51 14"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M51 19V27M47 23H55"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M23 47V53M20 50H26"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.75"
      />
    </svg>
  );
}

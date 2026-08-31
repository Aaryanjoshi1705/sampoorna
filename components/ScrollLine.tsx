"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

interface ScrollLineProps {
  /** SVG path data ("d" attribute). Draw your curve in Figma/SVG and paste here. */
  path: string;
  /** viewBox e.g. "0 0 1440 600" — must match the coordinate space of `path` */
  viewBox: string;
  from?: string;   // gradient start color
  to?: string;     // gradient end color
  strokeWidth?: number;
  className?: string;
}

export default function ScrollLine({
  path,
  viewBox,
  from = "var(--brass)",
  to = "var(--brass-2)",
  strokeWidth = 20,
  className = "",
}: ScrollLineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Track scroll of THIS wrapper relative to viewport.
  // "start end" = wrapper top hits viewport bottom (progress 0)
  // "end start" = wrapper bottom hits viewport top   (progress 1)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Map scroll 0->1 to pathLength 0->1
  // Extending to [0, 1] so the line completes its full draw across the section
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Leading-tip dot: we fake its travel by moving a small dash that follows the draw.
  // (optional glow dot — offsetDistance drives it along the same path)
  const dotOffset = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  if (shouldReduceMotion) {
    return (
      <div className={`pointer-events-none absolute inset-0 ${className}`}>
        <svg viewBox={viewBox} preserveAspectRatio="none" className="w-full h-full">
          <defs>
            <linearGradient id="sl-grad-static" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={from} />
              <stop offset="100%" stopColor={to} />
            </linearGradient>
          </defs>
          <path
            d={path}
            fill="none"
            stroke="url(#sl-grad-static)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }

  return (
    <div ref={ref} className={`pointer-events-none absolute inset-0 ${className}`}>
      <svg viewBox={viewBox} preserveAspectRatio="none" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="sl-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={from} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
          {/* soft glow for the ribbon */}
          <filter id="sl-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* The scroll-drawn ribbon */}
        <motion.path
          d={path}
          fill="none"
          stroke="url(#sl-grad)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#sl-glow)"
          style={{ pathLength }}   // <-- the whole trick is here
        />

        {/* Leading tip glow dot that rides along the path */}
        <motion.circle
          r={strokeWidth * 0.7}
          fill={to}
          style={{
            offsetPath: `path("${path}")`,
            offsetDistance: dotOffset,
            filter: "drop-shadow(0 0 12px var(--brass-2))",
          } as any}
        />
      </svg>
    </div>
  );
}

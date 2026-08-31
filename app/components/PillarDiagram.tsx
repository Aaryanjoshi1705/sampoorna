"use client";

import type { CSSProperties } from "react";

/* Small looping SVG that illustrates each SEZ pillar. CSS-driven (no JS),
   so it runs on mobile + desktop and respects reduced-motion. */

type Type = "enclave" | "window" | "gst";

const v = (o: Record<string, string | number>) => o as CSSProperties;

export default function PillarDiagram({ type }: { type: Type }) {
  if (type === "enclave") {
    return (
      <svg className="pd" viewBox="0 0 120 80" role="img" aria-label="Duty-free enclave">
        <rect
          className="pd-stroke pd-enclave-border"
          x="6"
          y="10"
          width="108"
          height="60"
          rx="8"
          strokeWidth="1.5"
        />
        <g className="pd-box">
          <rect x="18" y="36" width="22" height="15" rx="2" fill="#1f3d63" />
          <line x1="23" y1="36" x2="23" y2="51" stroke="#4f74a3" />
          <line x1="29" y1="36" x2="29" y2="51" stroke="#4f74a3" />
          <line x1="35" y1="36" x2="35" y2="51" stroke="#4f74a3" />
        </g>
        <text x="84" y="27" fill="#8a8f98" fontSize="8" fontFamily="monospace">
          DUTY
        </text>
        <line className="pd-strike" x1="82" y1="24" x2="110" y2="24" />
      </svg>
    );
  }

  if (type === "window") {
    return (
      <svg className="pd" viewBox="0 0 120 80" role="img" aria-label="Single-window clearance">
        {/* the one window */}
        <rect className="pd-stroke" x="80" y="27" width="26" height="26" rx="3" strokeWidth="1.5" />
        <line className="pd-stroke" x1="93" y1="27" x2="93" y2="53" strokeWidth="1" />
        <line className="pd-stroke" x1="80" y1="40" x2="106" y2="40" strokeWidth="1" />
        {/* documents funnelling in */}
        {[
          { dy: "-9px", d: "0s" },
          { dy: "0px", d: "0.5s" },
          { dy: "9px", d: "1s" },
        ].map((p, i) => (
          <g key={i} className="pd-doc" style={v({ "--dy": p.dy, animationDelay: p.d })}>
            <rect x="12" y="33" width="14" height="18" rx="2" fill="#ffffff" stroke="#1f3d63" />
            <line x1="15" y1="38" x2="23" y2="38" stroke="#9fb0c8" />
            <line x1="15" y1="42" x2="23" y2="42" stroke="#9fb0c8" />
            <line x1="15" y1="46" x2="21" y2="46" stroke="#9fb0c8" />
          </g>
        ))}
        {/* approved tick */}
        <polyline
          className="pd-stroke pd-check"
          points="85,40 91,47 101,33"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // gst
  return (
    <svg className="pd" viewBox="0 0 120 80" role="img" aria-label="Customs and GST exemption">
      {/* zone bracket */}
      <path className="pd-stroke" d="M68 18 h38 v44 h-38" strokeWidth="1.5" fill="none" />
      {/* conveyor */}
      <line x1="6" y1="60" x2="106" y2="60" stroke="#c9ccd2" strokeWidth="2" />
      <g className="pd-conveyor">
        {[-24, 0, 24, 48, 72].map((o) => (
          <rect key={o} x={8 + o} y="45" width="15" height="15" rx="2" fill="#1f3d63" />
        ))}
      </g>
      {/* 0% stamp */}
      <g className="pd-stamp">
        <circle cx="87" cy="36" r="14" fill="none" stroke="#c0563f" strokeWidth="2" />
        <text
          x="87"
          y="40"
          textAnchor="middle"
          fill="#c0563f"
          fontSize="11"
          fontWeight="700"
          fontFamily="var(--font-manrope), sans-serif"
        >
          0%
        </text>
      </g>
    </svg>
  );
}

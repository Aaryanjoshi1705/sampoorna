"use client";

import { useLenis } from "lenis/react";
import { useRef } from "react";

export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  useLenis((lenis) => {
    if (ref.current) {
      ref.current.style.transform = `scaleX(${lenis.progress || 0})`;
    }
  });
  return (
    <div className="fixed inset-x-0 top-0 z-[90] h-[2px] bg-transparent">
      <div
        ref={ref}
        className="h-full origin-left bg-gradient-to-r from-brass-3 via-brass to-brass-2"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}

"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* Drifts its children vertically as the section scrolls through the viewport.
   Put this inside an `overflow-hidden` frame with children slightly oversized
   so the drift never reveals an edge. */
export default function Parallax({
  children,
  className = "",
  speed = 14,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -speed },
        {
          yPercent: speed,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement ?? el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });
    return () => ctx.revert();
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

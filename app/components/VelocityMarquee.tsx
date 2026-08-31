"use client";

import { useLenis } from "lenis/react";
import { useEffect, useRef } from "react";

/* A running text strip that always drifts, then speeds up and skews with the
   reader's scroll velocity — the signature "kinetic" scroll cue. */
export default function VelocityMarquee({
  items,
  baseSpeed = 0.8,
}: {
  items: string[];
  baseSpeed?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const velocity = useRef(0);

  useLenis((lenis) => {
    velocity.current = lenis.velocity || 0;
  });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let x = 0;
    let raf = 0;
    const step = () => {
      const v = velocity.current;
      const half = track.scrollWidth / 2 || 1;
      x -= baseSpeed + Math.abs(v) * 0.35;
      if (-x >= half) x += half;
      const skew = Math.max(-10, Math.min(10, v * -0.35));
      track.style.transform = `translate3d(${x}px,0,0) skewX(${reduce ? 0 : skew}deg)`;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [baseSpeed]);

  // duplicate the run so the wrap is seamless
  const run = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-[var(--line)] py-6 md:py-8">
      <div ref={trackRef} className="flex w-max flex-nowrap will-change-transform">
        {run.map((item, i) => (
          <span key={i} className="flex items-center">
            <span className="whitespace-nowrap font-display text-[clamp(1.6rem,4vw,3rem)] font-light text-ivory/85">
              {item}
            </span>
            <span className="mx-8 text-brass md:mx-12">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

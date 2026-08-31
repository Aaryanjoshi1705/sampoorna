"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // lock scroll while the loader is up
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let raf = 0;
    const finish = () => {
      setProgress(100);
      setDone(true);
      document.body.style.overflow = prevOverflow;
    };
    const start = performance.now();
    const DURATION = 1700;
    const tick = (now: number) => {
      const p = Math.min((now - start) / DURATION, 1);
      // ease-out so the count decelerates
      const eased = 1 - Math.pow(1 - p, 2.2);
      setProgress(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else finish();
    };
    raf = requestAnimationFrame(tick);
    // safety: never leave the page scroll-locked if rAF stalls (e.g. tab hidden)
    const guard = setTimeout(finish, 3200);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(guard);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  return (
    <div
      aria-hidden={done}
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[var(--ink)] transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        done ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={{ visibility: done ? "hidden" : "visible", transitionProperty: "opacity, visibility", transitionDelay: done ? "0s, 0.7s" : "0s" }}
    >
      {/* monogram */}
      <div
        className={`mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-[var(--brass)] font-display text-3xl text-brass transition-transform duration-700 ${
          done ? "scale-90" : "scale-100"
        }`}
      >
        S
      </div>

      <div className="font-display text-lg tracking-[0.35em] text-ivory">
        SAMPOORNA
      </div>
      <div className="mt-2 text-[0.6rem] uppercase tracking-[0.4em] text-brass">
        SEZ Consultancy
      </div>

      {/* progress line */}
      <div className="mt-10 h-px w-56 overflow-hidden bg-[rgba(31,61,99,0.18)]">
        <div
          className="h-full bg-gradient-to-r from-brass-3 via-brass to-brass-2"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-4 font-display text-sm tabular-nums text-ivory-dim">
        {progress}
        <span className="text-brass">%</span>
      </div>
    </div>
  );
}

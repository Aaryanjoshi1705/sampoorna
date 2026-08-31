"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* Keep GSAP ScrollTrigger perfectly in sync with Lenis' smoothed scroll,
   so scrubbed animations track the same position on mobile and desktop. */
function GsapLenisSync() {
  useLenis(() => ScrollTrigger.update());
  useEffect(() => {
    gsap.ticker.lagSmoothing(0);
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, []);
  return null;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        // heavier, weighted glide (United Carriers feel):
        // lower lerp = more inertia/trail, lower wheelMultiplier = more deliberate
        lerp: 0.055,
        duration: 1.6,
        smoothWheel: true,
        wheelMultiplier: 0.82,
        touchMultiplier: 1.6,
        syncTouch: false,
      }}
    >
      <GsapLenisSync />
      {children}
    </ReactLenis>
  );
}

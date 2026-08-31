"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";

export default function LoadLine({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const shouldReduceMotion = useReducedMotion();

  return (
    <div ref={ref} className={`relative h-px w-full overflow-hidden ${className}`}>
      {/* Base faint line */}
      <div className="absolute inset-0 bg-[var(--line)]" />

      {/* Glow fill — triggers once when scrolled into view, left to right */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute inset-y-0 left-0 w-full origin-left bg-gradient-to-r from-transparent via-[var(--brass)] to-[var(--brass-2)]"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={inView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1.1, ease: "easeOut" }}
          style={{
            boxShadow: "0 0 8px var(--brass), 0 0 16px var(--brass-2)",
          }}
        />
      )}
      {shouldReduceMotion && inView && (
        <div className="absolute inset-0 bg-[var(--brass)]" />
      )}
    </div>
  );
}

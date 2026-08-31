"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, animate } from "framer-motion";

// ---- Count-up: 0 se target tak, jab view me aaye ----
export function CountUp({
  to,
  suffix = "",
  prefix = "",
  duration = 1.4,
  className = "",
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (shouldReduceMotion) {
      setVal(to);
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to, duration, shouldReduceMotion]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {Math.round(val)}
      {suffix}
    </span>
  );
}

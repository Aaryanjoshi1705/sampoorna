"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

export function ShimmerHeading({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5, once: true });
  const shouldReduceMotion = useReducedMotion();

  const base = "font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-light leading-[1.1] tracking-tight";

  if (shouldReduceMotion) {
    return <h2 className={`${base} text-[var(--ivory)] ${className}`}>{text}</h2>;
  }

  return (
    <motion.h2
      ref={ref}
      className={`${base} ${className}`}
      initial={{ backgroundPosition: "200% 0%" }}
      animate={inView ? { backgroundPosition: "-200% 0%" } : {}}
      transition={{ duration: 1.4, ease: "easeInOut" }}
      style={{
        backgroundImage:
          "linear-gradient(100deg, var(--ivory) 42%, var(--brass-2) 48%, var(--brass-2) 52%, var(--ivory) 58%)",
        backgroundSize: "300% 100%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
      }}
    >
      {text}
    </motion.h2>
  );
}

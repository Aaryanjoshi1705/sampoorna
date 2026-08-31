"use client";

import { useEffect, useRef, useState } from "react";

export default function Counter({
  to,
  suffix = "",
  prefix = "",
  duration = 1800,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const p = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - p, 3);
              setVal(Math.round(eased * to));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {val.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

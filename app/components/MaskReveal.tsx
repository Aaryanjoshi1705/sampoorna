"use client";

import { useEffect, useRef, type ReactNode, type ElementType } from "react";

/* Editorial "rise from a mask" reveal: the heading slides up from behind a
   clipped edge when it enters view. Works identically on mobile and desktop. */
export default function MaskReveal({
  children,
  as: Tag = "h2",
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("mask-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const TagComponent: any = Tag || "h2";

  return (
    <div ref={ref} className="mask-clip">
      <TagComponent
        className={`mask-inner ${className}`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </TagComponent>
    </div>
  );
}

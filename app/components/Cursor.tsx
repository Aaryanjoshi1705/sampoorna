"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // touch / coarse pointers: no custom cursor at all
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let dx = mx,
      dy = my,
      rx = mx,
      ry = my,
      scale = 1,
      targetScale = 1,
      opacity = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      opacity = 1;
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      targetScale =
        t && t.closest("a, button, input, textarea, .magnetic, [data-cursor='hover']")
          ? 1.8
          : 1;
    };
    // don't strand the cursor when the pointer leaves the window
    const onLeave = () => (opacity = 0);
    const onEnter = () => (opacity = 1);

    const loop = () => {
      dx += (mx - dx) * 0.4;
      dy += (my - dy) * 0.4;
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      scale += (targetScale - scale) * 0.15;

      dot.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
      dot.style.opacity = String(opacity);
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) scale(${scale})`;
      ring.style.opacity = String(opacity * 0.85);
      if (scale > 1.25) ring.classList.add("is-hover");
      else ring.classList.remove("is-hover");

      raf = requestAnimationFrame(loop);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}

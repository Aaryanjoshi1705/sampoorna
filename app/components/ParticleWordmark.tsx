"use client";

import { useEffect, useRef } from "react";

/* Interactive particle wordmark — the brand name rendered as a field of dots
   that scatter away from the cursor and ease back home. Devanagari: संपूर्णा. */

const WORD = "संपूर्णा";

export default function ParticleWordmark() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const wrap = wrapRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    type P = { hx: number; hy: number; x: number; y: number; vx: number; vy: number };
    let particles: P[] = [];
    let W = 0;
    let H = 0;
    const mouse = { x: -9999, y: -9999 };
    const RADIUS = 90 * dpr;
    const DOT = Math.max(1.2, 1.5 * dpr);

    function build() {
      const rect = wrap.getBoundingClientRect();
      W = Math.floor(rect.width * dpr);
      H = Math.floor(rect.height * dpr);
      canvas.width = W;
      canvas.height = H;
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";

      // render the word to an offscreen buffer, then sample its pixels
      const off = document.createElement("canvas");
      off.width = W;
      off.height = H;
      const octx = off.getContext("2d")!;
      octx.fillStyle = "#000";
      octx.textAlign = "center";
      octx.textBaseline = "middle";

      // fit the word to ~96% of the width
      let fontSize = H * 0.72;
      const font = (s: number) =>
        `700 ${s}px 'Nirmala UI','Noto Sans Devanagari','Mangal','Kohinoor Devanagari',sans-serif`;
      octx.font = font(fontSize);
      const maxW = W * 0.96;
      let m = octx.measureText(WORD).width;
      if (m > maxW) {
        fontSize *= maxW / m;
        octx.font = font(fontSize);
      }
      octx.fillText(WORD, W / 2, H / 2);

      const img = octx.getImageData(0, 0, W, H).data;
      const step = Math.max(4, Math.round(6 * dpr)); // sampling density
      const next: P[] = [];
      for (let y = 0; y < H; y += step) {
        for (let x = 0; x < W; x += step) {
          const alpha = img[(y * W + x) * 4 + 3];
          if (alpha > 128) {
            const existing = particles[next.length];
            next.push({
              hx: x,
              hy: y,
              x: existing ? existing.x : Math.random() * W,
              y: existing ? existing.y : Math.random() * H,
              vx: 0,
              vy: 0,
            });
          }
        }
      }
      particles = next;
    }

    function frame() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "rgba(22,24,29,0.82)";
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!reduce) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < RADIUS * RADIUS) {
            const d = Math.sqrt(d2) || 1;
            const force = (RADIUS - d) / RADIUS;
            p.vx += (dx / d) * force * 6;
            p.vy += (dy / d) * force * 6;
          }
          // spring home + friction
          p.vx += (p.hx - p.x) * 0.02;
          p.vy += (p.hy - p.y) * 0.02;
          p.vx *= 0.88;
          p.vy *= 0.88;
          p.x += p.vx;
          p.y += p.vy;
        } else {
          p.x = p.hx;
          p.y = p.hy;
        }
        ctx.fillRect(p.x, p.y, DOT, DOT);
      }

      // faint interaction ring echoing the reference
      if (mouse.x > -9000 && !reduce) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 34 * dpr, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(31,61,99,0.5)";
        ctx.lineWidth = 1 * dpr;
        ctx.stroke();
      }
      raf = requestAnimationFrame(frame);
    }

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = (e.clientX - r.left) * dpr;
      mouse.y = (e.clientY - r.top) * dpr;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    // only run while visible
    let raf = 0;
    let running = false;
    const start = () => {
      if (!running) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? start() : stop()),
      { threshold: 0 }
    );

    const onResize = () => build();

    build();
    io.observe(wrap);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", onResize);

    return () => {
      stop();
      io.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section className="relative overflow-hidden border-t border-[var(--line)] bg-ink py-10">
      <div
        ref={wrapRef}
        className="relative mx-auto h-[26vh] min-h-[180px] w-full max-w-[1400px] px-6 md:h-[34vh] md:px-10"
      >
        <canvas ref={canvasRef} className="absolute inset-0" />
      </div>
      <p className="mt-2 text-center text-xs uppercase tracking-[0.4em] text-ivory-dim">
        Sampoorna · संपूर्णा
      </p>
    </section>
  );
}

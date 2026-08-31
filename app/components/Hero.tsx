"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";

const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Stop the 3D render loop entirely once the hero scrolls out of view —
  // frees the main thread for smooth scrolling everywhere below.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // hand-off: content parallaxes up and fades as you scroll past the hero
  useLenis((lenis) => {
    const p = Math.min((lenis.scroll || 0) / window.innerHeight, 1);
    if (contentRef.current) {
      contentRef.current.style.transform = `translateY(${p * 70}px)`;
      contentRef.current.style.opacity = String(Math.max(0, 1 - p * 1.15));
    }
    if (wrapRef.current) {
      wrapRef.current.style.transform = `scale(${1 + p * 0.08})`;
      wrapRef.current.style.opacity = String(Math.max(0, 1 - p * 0.6));
    }
  });

  useEffect(() => {
    setMounted(true);
    // R3F's auto-measure can miss the first layout under Next; nudge it.
    let n = 0;
    const id = setInterval(() => {
      window.dispatchEvent(new Event("resize"));
      if (++n > 8) clearInterval(id);
    }, 120);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative h-[100svh] w-full overflow-hidden"
      style={{
        background:
          "radial-gradient(55% 75% at 12% 42%, rgba(96,52,24,0.32), transparent 60%), radial-gradient(130% 120% at 78% 25%, #12203c 0%, #0a1220 45%, #05070f 100%)",
      }}
    >
      {/* 3D scene */}
      <div ref={wrapRef} className="absolute inset-0 z-0">
        {mounted && <HeroCanvas active={active} />}
      </div>

      {/* left scrim for type legibility + fade into the light content below */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(5,7,15,0.86)_0%,rgba(5,7,15,0.45)_42%,transparent_72%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-56 bg-gradient-to-t from-[var(--ink)] to-transparent" />

      {/* content */}
      <div ref={contentRef} className="pointer-events-none relative z-20 flex h-full flex-col justify-center px-6 md:px-10 will-change-transform">
        <div className="mx-auto w-full max-w-[1400px]">
          <p
            className="eyebrow mb-6 opacity-0 !text-[#8aa6d6]"
            style={{ animation: "heroIn 1s var(--ease-out-expo) 0.2s forwards" }}
          >
            Your partner in compliance · Mumbai, India · Est. 2018
          </p>
          <h1 className="max-w-4xl font-display text-[clamp(2.6rem,7vw,6rem)] font-light leading-[0.98] tracking-tight text-balance text-white">
            <span
              className="block opacity-0"
              style={{ animation: "heroIn 1.1s var(--ease-out-expo) 0.35s forwards" }}
            >
              We turn Special
            </span>
            <span
              className="block opacity-0"
              style={{ animation: "heroIn 1.1s var(--ease-out-expo) 0.5s forwards" }}
            >
              Economic Zones into
            </span>
            <span
              className="block italic opacity-0 text-[#a9c2e6]"
              style={{ animation: "heroIn 1.1s var(--ease-out-expo) 0.65s forwards" }}
            >
              running enterprises.
            </span>
          </h1>

          <p
            className="mt-8 max-w-xl text-base leading-relaxed text-white/65 opacity-0 md:text-lg"
            style={{ animation: "heroIn 1s var(--ease-out-expo) 0.9s forwards" }}
          >
            End-to-end SEZ consultancy for Developers, Co-Developers and Units —
            from approvals and demarcation to customs clearance, compliance and IFSC.
          </p>

          <div
            className="pointer-events-auto mt-10 flex flex-wrap items-center gap-4 opacity-0"
            style={{ animation: "heroIn 1s var(--ease-out-expo) 1.05s forwards" }}
          >
            <a href="#services" className="btn-primary magnetic">
              Explore our services
              <span aria-hidden>→</span>
            </a>
            <a href="#contact" className="btn-ghost magnetic !border-white/25 !text-white hover:!bg-white/10">
              Talk to a specialist
            </a>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
        style={{ animation: "heroIn 1s ease 1.4s forwards" }}>
        <span className="text-[0.65rem] tracking-[0.3em] text-white/60">SCROLL</span>
        <span className="h-10 w-px bg-gradient-to-b from-white/70 to-transparent animate-pulse" />
      </div>

      <style>{`
        @keyframes heroIn {
          from { opacity: 0; transform: translateY(28px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const LINKS = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Expertise", href: "/our-expertise" },
  { label: "IFSC", href: "/ifsc" },
  { label: "Team", href: "/our-team" },
];

export default function Nav({ isLightHero = false }: { isLightHero?: boolean } = {}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // at the top we sit over the dark hero → use light text
  // unless explicitly told the hero is light
  const onDark = !scrolled && !isLightHero;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[rgba(245,245,243,0.8)] backdrop-blur-xl border-b border-[var(--line)]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5 md:px-10">
        <Link href="/" className="group flex items-center gap-3">
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-full border font-display text-lg transition-colors ${
              onDark ? "border-white/70 text-white" : "border-[var(--brass)] text-brass"
            }`}
          >
            S
          </span>
          <span
            className={`font-display text-xl tracking-tight transition-colors ${
              onDark ? "text-white" : "text-ivory"
            }`}
          >
            Sampoorna
            <span
              className={`ml-1.5 align-super text-[0.55rem] tracking-[0.2em] ${
                onDark ? "text-[#9db8e6]" : "text-brass"
              }`}
            >
              SEZ
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-9 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`relative text-sm transition-colors ${
                onDark ? "text-white/70 hover:text-white" : "text-ivory-dim hover:text-ivory"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <Link href="/contact" className="hidden md:inline-flex btn-primary !py-3 !px-6 magnetic">
          Get in touch
        </Link>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Menu"
        >
          <span className={`h-px w-6 transition-all ${onDark ? "bg-white" : "bg-ivory"} ${open ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`h-px w-6 transition-all ${onDark ? "bg-white" : "bg-ivory"} ${open ? "opacity-0" : ""}`} />
          <span className={`h-px w-6 transition-all ${onDark ? "bg-white" : "bg-ivory"} ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </nav>

      {/* mobile drawer */}
      <div
        className={`overflow-hidden border-t border-[var(--line)] bg-[rgba(245,245,243,0.98)] backdrop-blur-xl transition-all duration-500 md:hidden ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-6 py-4">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-3 text-lg text-ivory-dim"
            >
              {l.label}
            </Link>
          ))}
          <Link href="/contact" onClick={() => setOpen(false)} className="btn-primary mt-3 justify-center">
            Get in touch
          </Link>
        </div>
      </div>
    </header>
  );
}

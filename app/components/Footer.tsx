import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--line)] bg-ink-2/40">
      {/* Faint Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <span className="text-[25vw] font-bold text-ivory/[0.06] whitespace-nowrap leading-none">
          संपूर्ण
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-16 md:px-10">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--brass)] font-display text-lg text-brass">
                S
              </span>
              <span className="font-display text-xl text-ivory">
                Sampoorna <span className="align-super text-sm text-brass">SEZ</span>
              </span>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-ivory-dim">
              End-to-end Special Economic Zone consultancy — approvals, compliance,
              customs and IFSC — led by ex-Government of India specialists.
            </p>
          </div>
          <div className="flex gap-16">
            <div className="flex flex-col gap-3">
              <span className="text-xs uppercase tracking-[0.25em] text-brass">Explore</span>
              <Link href="/about" className="text-sm text-ivory-dim hover:text-ivory">About</Link>
              <Link href="/#services" className="text-sm text-ivory-dim hover:text-ivory">Services</Link>
              <Link href="/#team" className="text-sm text-ivory-dim hover:text-ivory">Team</Link>
              <Link href="/#ifsc" className="text-sm text-ivory-dim hover:text-ivory">IFSC</Link>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-xs uppercase tracking-[0.25em] text-brass">Contact</span>
              <a href="mailto:info@sampoornasez.com" className="text-sm text-ivory-dim hover:text-ivory">info@sampoornasez.com</a>
              <a href="tel:+919930466732" className="text-sm text-ivory-dim hover:text-ivory">+91 99304 66732</a>
              <span className="text-sm text-ivory-dim">Andheri East, Mumbai</span>
            </div>
          </div>
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-[var(--line)] pt-6 text-xs text-ivory-dim/60 md:flex-row">
          <span>© 2026 Sampoorna SEZ Consultancy Services. All rights reserved.</span>
          <span>Concept revamp · built with Next.js &amp; React Three Fiber</span>
        </div>
      </div>
    </footer>
  );
}

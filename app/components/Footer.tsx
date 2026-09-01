import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-black/10 bg-[#f4f2ee]">
      {/* Faint Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
        <span className="text-[25vw] font-bold text-black/[0.04] whitespace-nowrap leading-none">
          संपूर्ण
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-16 md:px-10">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          <div className="max-w-sm">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#1f3d63] font-display text-lg font-bold text-[#1f3d63]">
                S
              </span>
              <span className="font-display text-xl font-bold text-slate-900">
                Sampoorna <span className="align-super text-sm font-bold text-[#1f3d63]">SEZ</span>
              </span>
            </div>
            <p className="mt-5 text-sm font-medium leading-relaxed text-slate-700">
              End-to-end Special Economic Zone consultancy — approvals, compliance,
              customs and IFSC — led by ex-Government of India specialists.
            </p>
          </div>
          <div className="flex gap-16">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#1f3d63]">Explore</span>
              <Link href="/about" className="text-sm font-medium text-slate-700 hover:text-slate-950 transition-colors">About</Link>
              <Link href="/#services" className="text-sm font-medium text-slate-700 hover:text-slate-950 transition-colors">Services</Link>
              <Link href="/#team" className="text-sm font-medium text-slate-700 hover:text-slate-950 transition-colors">Team</Link>
              <Link href="/#ifsc" className="text-sm font-medium text-slate-700 hover:text-slate-950 transition-colors">IFSC</Link>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#1f3d63]">Contact</span>
              <a href="mailto:info@sampoornasez.com" className="text-sm font-medium text-slate-700 hover:text-slate-950 transition-colors">info@sampoornasez.com</a>
              <a href="tel:+919930466732" className="text-sm font-medium text-slate-700 hover:text-slate-950 transition-colors">+91 99304 66732</a>
              <span className="text-sm font-medium text-slate-700">Andheri East, Mumbai</span>
            </div>
          </div>
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-black/10 pt-6 text-xs font-medium text-slate-600 md:flex-row">
          <span>© 2026 Sampoorna SEZ Consultancy Services. All rights reserved.</span>
          <span>Concept revamp · built with Next.js &amp; React Three Fiber</span>
        </div>
      </div>
    </footer>
  );
}

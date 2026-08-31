import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Cursor from "./components/Cursor";
import Preloader from "./components/Preloader";
import SmoothScroll from "./components/SmoothScroll";
import Reveal from "./components/Reveal";
import Counter from "./components/Counter";
import ScrollProgress from "./components/ScrollProgress";
import MaskReveal from "./components/MaskReveal";
import Parallax from "./components/Parallax";
import VelocityMarquee from "./components/VelocityMarquee";
import DutyFreePassage from "./components/DutyFreePassage";
import ParticleWordmark from "./components/ParticleWordmark";
import PillarDiagram from "./components/PillarDiagram";

/* ------------------------------ data ------------------------------ */
const PILLARS = [
  {
    title: "Duty-Free Enclave",
    type: "enclave" as const,
    body: "An SEZ is a specifically delineated duty-free enclave, deemed foreign territory for trade operations, duties and tariffs.",
  },
  {
    title: "Single-Window Clearance",
    type: "window" as const,
    body: "One inter-ministerial Board of Approval clears proposals; at zone level the Approval Committee under the Development Commissioner handles units.",
  },
  {
    title: "Customs & GST Exemption",
    type: "gst" as const,
    body: "Units import or procure capital goods, raw materials and consumables at zero-rated GST within the validity of the Letter of Approval.",
  },
];

const SERVICES = [
  {
    tag: "01",
    title: "Developers",
    img: "/images/port-cranes.jpg",
    points: [
      "Application & Project Report for setting up an SEZ",
      "In-Principle / Formal Approvals from the Board",
      "Notification of the SEZ",
      "Demarcation into Processing & Non-Processing areas",
      "Increase or decrease of notified area",
    ],
  },
  {
    tag: "02",
    title: "Co-Developers",
    img: "/images/port-yard.jpg",
    points: [
      "Co-Developer approval from the Board of Approval",
      "Approval of Authorised Operations",
      "List of goods & list of services approval",
      "Ongoing compliance support",
    ],
  },
  {
    tag: "03",
    title: "SEZ Units",
    img: "/images/port-containers.jpg",
    points: [
      "Unit application & Project Report preparation",
      "Approval from the Approval Committee",
      "Bond-cum-Legal Undertaking approval",
      "Authorised-operations service list",
      "List of goods for factory construction",
    ],
  },
];

const CAPABILITIES = [
  "SEZ Approval Services",
  "DCR / Planning Services",
  "SEZ Online Services",
  "IFSC Advisory",
  "GST & Customs",
  "Business Setup — India",
];

const TEAM = [
  { role: "Ex-Zonal Development Commissioner", note: "FALTA SEZ & Visakhapatnam SEZ" },
  { role: "Ex-Director, Government of India", note: "Policy & Board of Approval matters" },
  { role: "Ex-Joint Development Commissioner", note: "SEEPZ SEZ" },
  { role: "Ex-Chief Planner & Architect", note: "DCR, demarcation & planning" },
];

/* ---------------------------- component ---------------------------- */
export default function Home() {
  return (
    <SmoothScroll>
      <Preloader />
      <ScrollProgress />
      <Cursor />
      <Nav />
      <main className="relative">
        <Hero />

        {/* ---------------- TRUST STRIP ---------------- */}
        <section className="border-y border-[var(--line)] bg-ink-2/40 py-6">
          <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6 text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-ivory-dim">
              We interface with
            </span>
            {["Board of Approval", "Development Commissioner", "Customs & DGFT", "IFSCA", "State Governments"].map(
              (n) => (
                <span key={n} className="font-display text-sm text-ivory/80">
                  {n}
                </span>
              )
            )}
          </div>
        </section>

        {/* ---------------- ABOUT / WHAT IS SEZ ---------------- */}
        <section id="about" className="relative mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-40">
          <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
            <div>
              <Reveal as="p" className="eyebrow mb-6">
                What is a Special Economic Zone
              </Reveal>
              <MaskReveal as="h2" className="font-display text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.05] tracking-tight text-balance">
                A duty-free enclave, engineered for <span className="italic brass-gradient">growth.</span>
              </MaskReveal>
              <Reveal as="p" delay={120} className="mt-8 max-w-md text-ivory-dim leading-relaxed">
                SEZs are centres designed to promote both foreign and domestic
                enterprise through liberal policy — a deemed foreign territory
                for trade, duties and tariffs. Getting in, and staying compliant,
                is where we come in.
              </Reveal>
              <Reveal delay={200} className="mt-10">
                <a href="#services" className="btn-ghost magnetic">Our services →</a>
              </Reveal>
              <Reveal delay={260} className="mt-12">
                <div className="relative h-64 overflow-hidden rounded-2xl border border-[var(--line)] md:h-80">
                  <Parallax className="absolute inset-x-0 -top-[16%] h-[132%]" speed={12}>
                    <img
                      src="/images/port-ship.jpg"
                      alt="Container vessel berthed at an SEZ port"
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </Parallax>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                  <span className="absolute bottom-4 left-5 text-xs uppercase tracking-[0.25em] text-ivory/80">
                    Deemed foreign territory
                  </span>
                </div>
              </Reveal>
            </div>

            <div className="flex flex-col gap-5">
              {PILLARS.map((p, i) => (
                <Reveal key={p.title} delay={i * 120}>
                  <div className="group relative overflow-hidden rounded-2xl border border-[var(--line)] bg-ink-2/40 p-8 transition-colors duration-500 hover:border-brass/60">
                    <div className="absolute right-6 top-6 font-display text-5xl text-brass/15 transition-colors group-hover:text-brass/30">
                      0{i + 1}
                    </div>
                    <PillarDiagram type={p.type} />
                    <h3 className="mt-5 font-display text-2xl text-ivory">{p.title}</h3>
                    <p className="mt-3 max-w-md text-sm leading-relaxed text-ivory-dim">{p.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- CINEMATIC BAND ---------------- */}
        <section className="relative flex h-[75vh] min-h-[520px] items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-scroll md:bg-fixed"
            style={{ backgroundImage: "url(/images/port-aerial.jpg)" }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,18,22,0.68),rgba(16,18,22,0.5),rgba(16,18,22,0.88))]" />
          <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
            <Reveal as="p" className="eyebrow mb-6 !text-[#a9c2e6]">The opportunity</Reveal>
            <MaskReveal as="h2" className="font-display text-[clamp(1.8rem,4.2vw,3.6rem)] font-light leading-[1.12] tracking-tight text-balance text-white">
              India&apos;s Special Economic Zones move a substantial share of the nation&apos;s exports.
              <span className="italic text-[#a9c2e6]"> We make sure yours moves with them.</span>
            </MaskReveal>
            <Reveal delay={150} className="mt-10">
              <a href="#contact" className="btn-primary magnetic">Start your SEZ journey →</a>
            </Reveal>
          </div>
        </section>

        {/* ---------------- SERVICES ---------------- */}
        <section id="services" className="relative bg-ink-2/30 py-28 md:py-40">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10">
            <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <Reveal as="p" className="eyebrow mb-5">End-to-end SEZ consultancy</Reveal>
                <MaskReveal as="h2" className="max-w-2xl font-display text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.05] tracking-tight text-balance">
                  One partner across the entire SEZ lifecycle.
                </MaskReveal>
              </div>
              <Reveal as="p" delay={120} className="max-w-xs text-sm text-ivory-dim">
                Whether you are setting up a zone or moving a unit into one, we
                carry the file from first application to final clearance.
              </Reveal>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {SERVICES.map((s, i) => (
                <Reveal key={s.title} delay={i * 130}>
                  <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-ink-3 transition-all duration-500 hover:-translate-y-1 hover:border-brass/50 hover:shadow-[0_30px_70px_-38px_rgba(20,22,28,0.35)]">
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={s.img}
                        alt={`${s.title} — SEZ`}
                        loading="lazy"
                        className="h-full w-full object-cover grayscale-[0.3] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                      <span className="absolute left-5 top-4 font-display text-sm text-brass-2 drop-shadow">{s.tag}</span>
                      <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--line)] bg-ink/40 text-brass backdrop-blur transition-colors group-hover:border-brass/60">→</span>
                    </div>
                    <div className="flex flex-1 flex-col p-8 pt-5">
                    <h3 className="font-display text-3xl text-ivory">{s.title}</h3>
                    <ul className="mt-6 flex flex-col gap-3">
                      {s.points.map((pt) => (
                        <li key={pt} className="flex gap-3 text-sm leading-relaxed text-ivory-dim">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brass" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* capability chips */}
            <Reveal delay={120} className="mt-14">
              <div className="flex flex-wrap items-center gap-3">
                <span className="mr-2 text-xs uppercase tracking-[0.25em] text-ivory-dim">Also</span>
                {CAPABILITIES.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-[var(--line)] px-4 py-2 text-sm text-ivory/80 transition-colors hover:border-brass/60 hover:text-ivory"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ---------------- DUTY-FREE PASSAGE (scroll story) ---------------- */}
        <DutyFreePassage />

        {/* ---------------- IMPACT STATS ---------------- */}
        <section id="impact" className="relative mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-40">
          <MaskReveal as="h2" className="mb-16 max-w-3xl font-display text-[clamp(2rem,4vw,3.4rem)] font-light leading-[1.05] tracking-tight text-balance">
            Depth you can only get from the people who <span className="italic brass-gradient">wrote the rulebook.</span>
          </MaskReveal>
          <div className="grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-4">
            {[
              { n: 25, s: "+", l: "Years of SEZ experience" },
              { n: 100, s: "+", l: "Approvals & files handled" },
              { n: 6, s: "", l: "Ex-Government specialists" },
              { n: 360, s: "°", l: "Compliance coverage" },
            ].map((stat, i) => (
              <Reveal key={stat.l} delay={i * 100}>
                <div className="border-t border-[var(--line)] pt-6">
                  <div className="font-display text-[clamp(2.6rem,6vw,4.5rem)] font-light leading-none brass-gradient">
                    <Counter to={stat.n} suffix={stat.s} />
                  </div>
                  <p className="mt-3 text-sm text-ivory-dim">{stat.l}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------------- KINETIC MARQUEE ---------------- */}
        <VelocityMarquee
          items={[
            "SEZ Approvals",
            "DCR & Planning",
            "Customs Clearance",
            "Compliance",
            "IFSC Advisory",
            "GST",
          ]}
        />



        {/* ---------------- IFSC ---------------- */}
        <section id="ifsc" className="relative mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-40">
          <div className="relative overflow-hidden rounded-3xl border border-[var(--line)] bg-gradient-to-br from-ink-3/60 to-ink p-10 md:p-16">
            <img
              src="/images/port-night.jpg"
              alt=""
              aria-hidden
              loading="lazy"
              className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-ink/80 to-ink/40" />
            <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <Reveal as="p" className="eyebrow mb-5">Beyond SEZ</Reveal>
                <MaskReveal as="h2" className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-light leading-[1.08] tracking-tight text-balance">
                  IFSC advisory at GIFT City — your gateway to global finance.
                </MaskReveal>
                <Reveal as="p" delay={120} className="mt-6 max-w-md text-ivory-dim leading-relaxed">
                  From unit registration with the IFSCA to structuring and ongoing
                  compliance, we help enterprises tap India&apos;s International
                  Financial Services Centre with the same rigour we bring to SEZs.
                </Reveal>
                <Reveal delay={200} className="mt-8">
                  <a href="/ifsc" className="btn-primary magnetic">Explore IFSC Advisory →</a>
                </Reveal>
              </div>
              <Reveal delay={150}>
                <div className="grid grid-cols-2 gap-4">
                  {["IFSCA Registration", "Entity Structuring", "Tax & Compliance", "Banking Units"].map((f) => (
                    <div key={f} className="rounded-xl border border-[var(--line)] bg-ink/50 p-5">
                      <div className="mb-3 h-8 w-8 rounded-full bg-brass/15 ring-1 ring-brass/30" />
                      <p className="text-sm text-ivory/90">{f}</p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---------------- GALLERY ---------------- */}
        <section className="relative mx-auto max-w-[1400px] px-6 pb-8 md:px-10">
          <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <MaskReveal as="h2" className="max-w-xl font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-light leading-[1.1] tracking-tight text-balance">
              Where compliance meets the quayside.
            </MaskReveal>
            <Reveal as="p" delay={100} className="max-w-xs text-sm text-ivory-dim">
              From notified processing areas to bonded warehousing and customs
              gates — we work across the full footprint of a zone.
            </Reveal>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { src: "/images/port-cranes.jpg", cap: "Processing area" },
              { src: "/images/port-yard.jpg", cap: "Bonded warehousing" },
              { src: "/images/port-containers.jpg", cap: "Customs clearance" },
            ].map((g, i) => (
              <Reveal key={g.cap} delay={i * 110}>
                <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-[var(--line)]">
                  <Parallax className="absolute inset-x-0 -top-[16%] h-[132%]" speed={12}>
                    <img
                      src={g.src}
                      alt={g.cap}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                    />
                  </Parallax>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />
                  <span className="absolute bottom-5 left-5 font-display text-lg text-ivory">{g.cap}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------------- CONTACT ---------------- */}
        <section id="contact" className="relative mx-auto max-w-[1400px] px-6 py-28 md:px-10 md:py-40">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <Reveal as="p" className="eyebrow mb-5">Get in touch</Reveal>
              <MaskReveal as="h2" className="font-display text-[clamp(2.2rem,5vw,4rem)] font-light leading-[1.02] tracking-tight text-balance">
                Let&apos;s move your <span className="italic brass-gradient">SEZ file</span> forward.
              </MaskReveal>
              <Reveal delay={120} className="mt-10 flex flex-col gap-6">
                <a href="mailto:info@sampoornasez.com" className="group flex items-center justify-between border-b border-[var(--line)] pb-4 magnetic">
                  <span className="text-ivory-dim">Email</span>
                  <span className="font-display text-lg text-ivory transition-colors group-hover:text-brass">info@sampoornasez.com</span>
                </a>
                <a href="tel:+919930466732" className="group flex items-center justify-between border-b border-[var(--line)] pb-4 magnetic">
                  <span className="text-ivory-dim">Phone</span>
                  <span className="font-display text-lg text-ivory transition-colors group-hover:text-brass">+91 99304 66732</span>
                </a>
                <div className="flex items-center justify-between border-b border-[var(--line)] pb-4">
                  <span className="text-ivory-dim">Studio</span>
                  <span className="font-display text-lg text-ivory">Mumbai, India</span>
                </div>
              </Reveal>
            </div>

            <Reveal delay={100}>
              <form className="flex flex-col gap-5 rounded-2xl border border-[var(--line)] bg-ink-2/40 p-8 md:p-10">
                {[
                  { id: "name", label: "Your name", type: "text", ph: "Priya Sharma" },
                  { id: "email", label: "Work email", type: "email", ph: "priya@company.com" },
                  { id: "org", label: "Organisation", type: "text", ph: "Company / Developer name" },
                ].map((f) => (
                  <div key={f.id} className="flex flex-col gap-2">
                    <label htmlFor={f.id} className="text-xs uppercase tracking-[0.2em] text-ivory-dim">{f.label}</label>
                    <input
                      id={f.id}
                      type={f.type}
                      placeholder={f.ph}
                      suppressHydrationWarning
                      className="rounded-lg border border-[var(--line)] bg-ink/60 px-4 py-3 text-ivory outline-none transition-colors placeholder:text-ivory-dim/50 focus:border-brass"
                    />
                  </div>
                ))}
                <div className="flex flex-col gap-2">
                  <label htmlFor="msg" className="text-xs uppercase tracking-[0.2em] text-ivory-dim">How can we help?</label>
                  <textarea
                    id="msg"
                    rows={4}
                    placeholder="Tell us about your SEZ, unit or IFSC requirement…"
                    suppressHydrationWarning
                    className="resize-none rounded-lg border border-[var(--line)] bg-ink/60 px-4 py-3 text-ivory outline-none transition-colors placeholder:text-ivory-dim/50 focus:border-brass"
                  />
                </div>
                <button type="button" suppressHydrationWarning className="btn-primary mt-2 justify-center magnetic">
                  Request a consultation →
                </button>
                <p className="text-center text-xs text-ivory-dim/60">
                  Demo form — not wired to a backend yet.
                </p>
              </form>
            </Reveal>
          </div>
        </section>

        {/* ---------------- PARTICLE WORDMARK ---------------- */}
        <ParticleWordmark />

        {/* ---------------- FOOTER ---------------- */}
        <footer className="border-t border-[var(--line)] bg-ink-2/40">
          <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10">
            <div className="flex flex-col justify-between gap-12 md:flex-row">
              <div className="max-w-sm">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--brass)] font-display text-lg text-brass">S</span>
                  <span className="font-display text-xl text-ivory">Sampoorna <span className="align-super text-sm text-brass">SEZ</span></span>
                </div>
                <p className="mt-5 text-sm leading-relaxed text-ivory-dim">
                  End-to-end Special Economic Zone consultancy — approvals,
                  compliance, customs and IFSC — led by ex-Government of India
                  specialists.
                </p>
              </div>
              <div className="flex gap-16">
                <div className="flex flex-col gap-3">
                  <span className="text-xs uppercase tracking-[0.25em] text-brass">Explore</span>
                  <a href="#about" className="text-sm text-ivory-dim hover:text-ivory">About</a>
                  <a href="#services" className="text-sm text-ivory-dim hover:text-ivory">Services</a>
                  <a href="/our-team" className="text-sm text-ivory-dim hover:text-ivory">Team</a>
                  <a href="/ifsc" className="text-sm text-ivory-dim hover:text-ivory">IFSC</a>
                </div>
                <div className="flex flex-col gap-3">
                  <span className="text-xs uppercase tracking-[0.25em] text-brass">Contact</span>
                  <a href="mailto:info@sampoornasez.com" className="text-sm text-ivory-dim hover:text-ivory">info@sampoornasez.com</a>
                  <a href="tel:+919930466732" className="text-sm text-ivory-dim hover:text-ivory">+91 99304 66732</a>
                  <span className="text-sm text-ivory-dim">Mumbai, India</span>
                </div>
              </div>
            </div>
            <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-[var(--line)] pt-6 text-xs text-ivory-dim/60 md:flex-row">
              <span>© 2026 Sampoorna SEZ Consultancy Services. All rights reserved.</span>
              <span>Concept revamp · built with Next.js &amp; React Three Fiber</span>
            </div>
          </div>
        </footer>
      </main>
    </SmoothScroll>
  );
}

"use client";

import Link from "next/link";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Reveal from "../components/Reveal";
import MaskReveal from "../components/MaskReveal";
import RevealText from "../components/RevealText";
import { CountUp } from "../components/CountUp";
import { ShimmerHeading } from "../components/ShimmerHeading";
import ScrollLine from "../../components/ScrollLine";

const FRAMEWORK = [
  {
    title: "SEZ Act, 2005",
    desc: "The primary legislation enabling the establishment of Units within an SEZ that has been explicitly approved by the Central Government under Section 18(1).",
  },
  {
    title: "SEBI (IFSC) Guidelines, 2015",
    desc: "Provides a streamlined regulatory framework for securities market intermediaries and exchanges operating within the IFSC.",
  },
  {
    title: "IRDAI (IFSC) Guidelines, 2015",
    desc: "Governs the setup and operation of insurance and reinsurance branches, offering a highly conducive environment for global insurers.",
  },
];

const INCENTIVES = [
  {
    value: <><CountUp to={9} suffix="%" className="font-display text-5xl lg:text-6xl text-[var(--brass)] leading-none block" /></>,
    title: "Reduced MAT / AMT",
    desc: <>Under Section <CountUp to={115} className="font-semibold text-[var(--brass)]" />JB / <CountUp to={115} className="font-semibold text-[var(--brass)]" />JC of the Income Tax Act, for units located in IFSC deriving income solely in convertible foreign exchange.</>,
  },
  {
    value: <><CountUp to={100} suffix="%" className="font-display text-5xl lg:text-6xl text-[var(--brass)] leading-none block" /></>,
    title: "Tax Holiday",
    desc: <>Complete tax holiday under Section <CountUp to={80} className="font-semibold text-[var(--brass)]" />LA of the Income Tax Act for designated periods, maximizing retained earnings.</>,
  },
  {
    value: <><span className="font-display text-5xl lg:text-6xl text-[var(--brass)] leading-none block">Exempt</span></>,
    title: "STT Exemption",
    desc: <>Under Section <CountUp to={111} className="font-semibold text-[var(--brass)]" />A / <CountUp to={112} className="font-semibold text-[var(--brass)]" />A on transfer of specified capital assets on a recognized stock exchange in foreign currency.</>,
  },
  {
    value: <><span className="font-display text-5xl lg:text-6xl text-[var(--brass)] leading-none block">Relief</span></>,
    title: "Dividend Distribution",
    desc: <>Dividend Distribution Relief with an exemption under Section <CountUp to={115} className="font-semibold text-[var(--brass)]" />-O for income derived in foreign exchange.</>,
  },
  {
    value: <><span className="font-display text-5xl lg:text-6xl text-[var(--brass)] leading-none block">Exempt</span></>,
    title: "Capital Gains",
    desc: <>Under Section <CountUp to={47} className="font-semibold text-[var(--brass)]" />, on transfer of specified assets (Bonds, GDRs, Derivatives) by non-residents on a recognized stock exchange in foreign currency.</>,
  },
];

export default function IfscClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll();

  // Morph background color of the entire page
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    ["var(--paper)", "var(--ink)", "var(--ink)", "var(--ink-2)"]
  );

  // Parallax transforms for images
  const heroY = useTransform(scrollYProgress, [0, 0.3], ["0%", "20%"]);
  const spotlightY = useTransform(scrollYProgress, [0.6, 1], ["-15%", "15%"]);
  const spineHeight = useTransform(scrollYProgress, [0.1, 0.4], ["0%", "100%"]);

  return (
    <motion.div 
      className="relative text-[var(--ivory)] overflow-hidden transition-colors duration-1000"
      style={shouldReduceMotion ? { backgroundColor: "var(--paper)" } : { backgroundColor: bgColor }}
    >
      
      {/* ---------------- 1. HERO SECTION ---------------- */}
      <section ref={containerRef} className="relative h-[90vh] min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <motion.div 
          style={shouldReduceMotion ? {} : { y: heroY }}
          className="absolute inset-0"
        >
          <Image
            src="/ifsc/hero-bg.jpg"
            alt="Abstract Financial Growth"
            fill
            className="object-cover opacity-60 mix-blend-multiply"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--paper)] via-transparent to-[var(--ink)]" />
        </motion.div>

        {/* Scroll-drawn SVG ribbon line */}
        {!shouldReduceMotion && (
          <div className="absolute inset-0 pointer-events-none z-0">
            <svg width="100%" height="100%" viewBox="0 0 1000 1000" preserveAspectRatio="none">
              <motion.path
                d="M 0,200 Q 250,300 500,500 T 1000,800"
                fill="none"
                stroke="url(#brass-gradient)"
                strokeWidth="16"
                strokeLinecap="round"
                style={{ pathLength: scrollYProgress, opacity: 0.3 }}
              />
              <defs>
                <linearGradient id="brass-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--brass)" />
                  <stop offset="100%" stopColor="var(--brass-2)" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        )}

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-10 text-center">
          <Reveal as="p" className="eyebrow mb-6 text-[var(--brass)]">IFSC Services</Reveal>
          <ShimmerHeading 
            text="Global Finance, Onshore in India" 
            className="text-balance mx-auto justify-center" 
          />
          <div className="mt-8 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed text-[var(--ivory)]/80">
            <RevealText text="Sampoorna SEZ Consultancy Services helps you establish and operate Units within India's International Financial Services Centre (IFSC) — the country's gateway to world-class, globally-benchmarked financial services on home soil." />
          </div>
        </div>
      </section>

      {/* ---------------- 2. LEGAL FRAMEWORK ---------------- */}
      <section className="relative z-20 py-24 md:py-32">
        <div className="absolute inset-0 opacity-10">
          <Image src="/ifsc/framework.jpg" alt="Framework Architecture" fill className="object-cover" />
          <div className="absolute inset-0 bg-[var(--ink)] opacity-90" />
        </div>

        <div className="relative mx-auto max-w-[1400px] px-6 md:px-10">
          <div className="text-center mb-16">
            <Reveal as="p" className="eyebrow mb-4 text-[var(--brass)]">Regulatory Backbone</Reveal>
            <ShimmerHeading text="The Legal Framework" className="justify-center" />
            <Reveal delay={100} className="mt-6 max-w-3xl mx-auto text-lg text-[var(--ivory)]/70">
              The setting up of Units in an IFSC is enabled by a robust regulatory backbone. Units can be established in an International Financial Services Centre located within an SEZ that has been approved by the Central Government.
            </Reveal>
          </div>

          <div className="relative grid gap-8 md:grid-cols-3">
            {/* Horizontal connecting line on desktop */}
            <div className="hidden md:block absolute top-[40%] left-10 right-10 h-[2px] bg-[var(--line)] -z-10">
              <motion.div className="h-full bg-[var(--brass)] origin-left" style={{ scaleX: scrollYProgress }} />
            </div>

            {FRAMEWORK.map((item, i) => (
              <Reveal key={item.title} delay={i * 150}>
                <motion.div 
                  initial={shouldReduceMotion ? {} : { rotateY: -15, opacity: 0, y: 40 }}
                  whileInView={shouldReduceMotion ? {} : { rotateY: 0, opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="bg-[var(--paper)] rounded-2xl p-8 border border-[var(--line)] shadow-sm h-full flex flex-col justify-center items-center text-center hover:border-[var(--brass)]/30 transition-colors"
                  style={{ transformPerspective: 1000 }}
                >
                  <div className="h-16 w-16 rounded-full bg-[var(--ink-2)] flex items-center justify-center text-[var(--brass)] font-display text-2xl mb-6">
                    0{i + 1}
                  </div>
                  <h3 className="font-display text-xl text-[var(--ivory)] mb-3">{item.title}</h3>
                  <p className="text-sm text-[var(--ivory-dim)] leading-relaxed">{item.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- 3. FISCAL INCENTIVES ---------------- */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background Image behind incentives */}
        <div className="absolute inset-0 opacity-10">
          <Image src="/ifsc/incentives.jpg" alt="Upward Financial Growth" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--ink)] via-[var(--ink)] to-[var(--ink)] opacity-80" />
        </div>

        {/* Background scroll line (Horizontal Curve) */}
        <ScrollLine
          viewBox="0 0 1440 900"
          path="M 1520 100 C 1300 120, 1200 300, 850 350 C 500 400, 300 850, -80 750"
          strokeWidth={22}
          from="#2C5488"
          to="var(--brass-2)"
          className="-z-0 opacity-60"
        />

        <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-10">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <Reveal as="p" className="eyebrow mb-4 text-[var(--brass)]">Global Competitiveness</Reveal>
            <ShimmerHeading text="Unmatched Fiscal Incentives" className="justify-center" />
            <Reveal delay={100} className="mt-6 text-lg text-[var(--ivory)]/80">
              Beyond standard SEZ incentives — Units in an IFSC enjoy the full suite of SEZ benefits, plus a distinct set of fiscal incentives designed to make India globally competitive.
            </Reveal>
          </div>

          <div className="flex flex-col gap-12">
            {INCENTIVES.map((inc, i) => {
              const isEven = i % 2 === 0;
              return (
                <Reveal key={inc.title} delay={100}>
                  <motion.div 
                    initial={shouldReduceMotion ? {} : { x: isEven ? -50 : 50, opacity: 0 }}
                    whileInView={shouldReduceMotion ? {} : { x: 0, opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className={`flex flex-col md:flex-row gap-8 items-center bg-[var(--paper)] rounded-2xl p-8 border border-[var(--line)] shadow-sm relative z-10 hover:border-[var(--brass)]/30 transition-colors ${
                      isEven ? "md:mr-auto" : "md:ml-auto"
                    } md:w-[80%]`}
                  >
                    <div className={`md:w-1/3 flex ${isEven ? "justify-start" : "md:justify-end justify-start"} shrink-0`}>
                      {inc.value}
                    </div>
                    <div className="md:w-2/3">
                      <h3 className="font-display text-2xl text-[var(--ivory)] mb-3">{inc.title}</h3>
                      <p className="text-[var(--ivory)]/70 leading-relaxed text-lg">{inc.desc}</p>
                    </div>
                  </motion.div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- 4. GIFT CITY SPOTLIGHT ---------------- */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-[var(--ivory)] text-white">
        <motion.div 
          style={shouldReduceMotion ? {} : { y: spotlightY }}
          className="absolute inset-0"
        >
          <Image
            src="/ifsc/gift-city.jpg"
            alt="GIFT City Skyline"
            fill
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--ivory)] via-[var(--ivory)]/80 to-[var(--ivory)]/30" />
        </motion.div>

        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-10 text-center">
          <Reveal as="div" className="mb-8">
            <span className="font-display text-7xl md:text-9xl font-light text-[var(--brass)] opacity-90 inline-flex items-center">
              <CountUp to={100} duration={2} />%
            </span>
            <p className="text-xl md:text-2xl mt-4 font-light tracking-wide text-white/80">Operational & Growing</p>
          </Reveal>
          
          <MaskReveal as="h2" className="max-w-4xl mx-auto font-display text-[clamp(2rem,5vw,4.5rem)] font-light leading-[1.05] tracking-tight text-white">
            India's first IFSC at GIFT City, Gujarat is fully operational — and the momentum is only building.
          </MaskReveal>
          
          <Reveal delay={150} className="mt-8 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed text-white/70">
            If you're planning a presence in India's financial gateway, we'll guide you end-to-end. Let's structure your future.
          </Reveal>
        </div>
      </section>

      {/* ---------------- 5. CTA ---------------- */}
      <section className="relative bg-[var(--ink-2)] py-32 text-center border-t border-[var(--line)]">
        <div className="mx-auto max-w-2xl px-6">
          <Reveal as="h2" className="font-display text-3xl font-light text-[var(--ivory)] mb-8">
            Ready to explore your IFSC strategy?
          </Reveal>
          <Reveal delay={100}>
            <Link href="/contact" className="group inline-flex items-center gap-2 font-medium text-[var(--brass)] text-lg border-b border-[var(--brass)] pb-1 transition-colors hover:text-[var(--brass-2)] hover:border-[var(--brass-2)]">
              Schedule a Consultation
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </motion.div>
  );
}

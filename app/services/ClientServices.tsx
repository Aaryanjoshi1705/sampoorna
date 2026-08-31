"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { Factory, Settings, BarChart3, Laptop, BookOpen, Database } from "lucide-react";
import Nav from "../components/Nav";
import Cursor from "../components/Cursor";
import SmoothScroll from "../components/SmoothScroll";
import Footer from "../components/Footer";

// Colors for background morphing
const COLOR_PAPER = "#F5F5F3";
const COLOR_INK = "#16181D";

const SERVICES = [
  {
    id: "01",
    title: "For Developers",
    icon: Factory,
    tagline: "Building the zone, from application to notification.",
    content: "End-to-end support for SEZ Developers — from Project Report preparation through In-Principle and Formal Approvals, Notification, and ongoing area demarcation and sector changes as your project evolves.",
    cta: "See the Full Developer Process →",
    link: "/sez-approval-services",
    image: "/images/registry/services-hub-01.jpg"
  },
  {
    id: "02",
    title: "For Co-Developers",
    icon: Settings,
    tagline: "Partnering on the zone, with full BOA approval.",
    content: "Approval support for Co-Developers joining an existing SEZ project — Board of Approval sign-off, authorized operations approval, and goods/services list approval.",
    cta: "See the Full Co-Developer Process →",
    link: "/sez-approval-services",
    image: "/images/registry/services-hub-02.jpg"
  },
  {
    id: "03",
    title: "For SEZ Units",
    icon: BarChart3,
    tagline: "Getting your unit operational, and keeping it compliant.",
    content: "Unit-level approval support — application and project report preparation, Approval Committee sign-off, Bond-cum-Legal Undertaking, and ongoing LOA amendments as you scale.",
    cta: "See the Full Unit Approval Process →",
    link: "/sez-approval-services",
    image: "/images/registry/services-hub-03.jpg"
  },
  {
    id: "04",
    title: "Our Expertise",
    icon: Laptop,
    tagline: "One desk, every stage of your SEZ business.",
    content: "From day-to-day SEZ operations and customs clearance through business advisory, tax compliance, GST, and audit — the complete range of services your business needs beyond initial approval.",
    cta: "Explore Our Full Expertise →",
    link: "/our-expertise",
    image: "/images/registry/services-hub-04.jpg"
  },
  {
    id: "05",
    title: "IFSC Services",
    icon: BookOpen,
    tagline: "Setting up in India's International Financial Services Centres.",
    content: "Support for setting up units in an IFSC under section 18(1) of the SEZ Act, 2005 — including guidance on the fiscal incentives available under the SEZ Act, SEBI Guidelines, and IRDAI (IFSC) Guidelines.",
    cta: "See IFSC Details →",
    link: "/ifsc",
    image: "/images/registry/services-hub-05.jpg"
  },
  {
    id: "06",
    title: "Other Services",
    icon: Database,
    tagline: "The details that keep an SEZ unit running smoothly.",
    content: "Import/local procurement consultancy, customs department liaison, C&F agent services, statutory register maintenance, periodic returns to the Development Commissioner, and on-site help desk support.",
    cta: "See All Services →",
    link: "/our-expertise",
    image: "/images/registry/services-hub-06.jpg"
  }
];

function PinnedRegistryBrowser() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  const totalHeight = 450; 
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let index = Math.floor(latest * SERVICES.length);
    if (index >= SERVICES.length) index = SERVICES.length - 1;
    if (index < 0) index = 0;
    setActiveIndex(index);
  });

  // Global background morphing happens at the page level now.
  
  const renderMobileStacked = () => (
    <section className="py-12 px-6">
      <div className="flex overflow-x-auto gap-2 pb-6 mb-8 hide-scrollbar">
        {SERVICES.map((s, i) => (
          <div key={`chip-${s.id}`} className="shrink-0 px-4 py-2 border border-current opacity-60 rounded-full font-mono text-xs uppercase tracking-wider whitespace-nowrap">
            {s.id} // {s.title}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-16">
        {SERVICES.map((s) => (
          <div key={s.id} className="flex flex-col gap-6">
            <img src={s.image} alt={s.title} className="w-full aspect-[4/3] object-cover rounded-xl shadow-lg" />
            <div>
              <div className="flex items-center gap-3 mb-3 text-brass">
                <s.icon className="w-5 h-5" />
                <span className="font-mono text-xs uppercase tracking-widest">{s.id} // {s.title}</span>
              </div>
              <h3 className="font-display text-2xl mb-3">{s.tagline}</h3>
              <p className="text-sm opacity-80 leading-relaxed mb-6">{s.content}</p>
              <Link href={s.link} className="text-brass font-medium hover:underline text-sm">{s.cta}</Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  if (shouldReduceMotion) {
    return renderMobileStacked();
  }

  return (
    <>
      {/* Mobile Version - Stacked (Hidden on MD+) */}
      <div className="md:hidden">
        {renderMobileStacked()}
      </div>

      {/* Desktop Version - Pinned (Hidden on Mobile) */}
      <section 
        ref={containerRef} 
        className="relative w-full hidden md:block"
        style={{ height: `${totalHeight}vh` }}
      >
        <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
          <div className="mx-auto w-full max-w-[1400px] px-10 grid grid-cols-[1fr_1.5fr_1fr] lg:grid-cols-[1fr_2fr_1fr] gap-12 items-center h-full max-h-[800px]">
            
            {/* Left Column: Index */}
            <div className="flex flex-col gap-6 w-full pr-6" style={{ borderRight: "1px solid currentColor" }}>
              <p className="font-mono text-xs text-brass tracking-[0.2em] mb-4 uppercase">Registry Index</p>
              {SERVICES.map((s, i) => (
                <button 
                  key={s.id}
                  className={`text-left font-mono text-sm lg:text-base uppercase tracking-wider transition-all duration-300 ${activeIndex === i ? "text-current scale-105 origin-left font-medium" : "opacity-30 hover:opacity-60"}`}
                  onClick={() => {
                    if (containerRef.current) {
                      const scrollTarget = containerRef.current.offsetTop + ((i / SERVICES.length) * (containerRef.current.offsetHeight - window.innerHeight));
                      window.scrollTo({ top: scrollTarget, behavior: 'smooth' });
                    }
                  }}
                >
                  {s.title}
                </button>
              ))}
            </div>

            {/* Center Column: Wipe Reveal Image */}
            <div className="relative w-full aspect-square max-h-[70vh] rounded-2xl overflow-hidden shadow-2xl bg-ink-2">
              {SERVICES.map((s, i) => {
                const start = i / SERVICES.length;
                const end = (i + 1) / SERVICES.length;
                
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const clipProgress = useTransform(
                  scrollYProgress,
                  [start, end],
                  [100, 0] 
                );

                return (
                  <motion.div
                    key={s.id}
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${s.image})`,
                      zIndex: i,
                      clipPath: useTransform(clipProgress, (val) => `inset(${val}% 0 0 0)`)
                    }}
                  />
                );
              })}
              
              {/* Flash Boundary Effect */}
              <div className="absolute inset-0 pointer-events-none z-50">
                {SERVICES.map((s, i) => {
                  const start = i / SERVICES.length;
                  const end = (i + 1) / SERVICES.length;
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  const lineY = useTransform(scrollYProgress, [start, end], ["100%", "0%"]);
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  const opacity = useTransform(scrollYProgress, [start, start + 0.05, end - 0.05, end], [0, 1, 1, 0]);
                  
                  if (i === 0) return null; 
                  
                  return (
                    <motion.div
                      key={`line-${s.id}`}
                      className="absolute left-0 right-0 h-[2px] bg-brass shadow-[0_0_20px_5px_rgba(212,175,55,0.4)]"
                      style={{ top: lineY, opacity, zIndex: 100 }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Right Column: Cross-fading Content */}
            <div className="relative w-full h-[400px] flex items-center pl-6">
              {SERVICES.map((s, i) => (
                <motion.div 
                  key={s.id}
                  className="absolute inset-0 flex flex-col justify-center"
                  initial={false}
                  animate={{
                    opacity: activeIndex === i ? 1 : 0,
                    y: activeIndex === i ? 0 : 20,
                    pointerEvents: activeIndex === i ? "auto" : "none"
                  }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <s.icon strokeWidth={1.5} className="w-8 h-8 text-brass" />
                  </div>
                  <h3 className="font-display text-[clamp(1.5rem,2.5vw,2.5rem)] font-light leading-tight mb-4">
                    {s.tagline}
                  </h3>
                  <p className="text-sm opacity-70 leading-relaxed mb-8 max-w-sm">
                    {s.content}
                  </p>
                  <Link 
                    href={s.link} 
                    className="mt-auto text-xs font-mono uppercase tracking-[0.1em] text-brass border border-brass/30 px-6 py-3 rounded-full hover:bg-brass hover:text-ink transition-colors w-fit"
                  >
                    {s.cta}
                  </Link>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

export default function ClientServices() {
  const pageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"]
  });

  // The page consists of a Hero (approx 50vh) and the Registry (450vh).
  // Total scrollable is roughly 400vh.
  // Let's morph colors very early as they leave the hero.
  // 10% of page scroll is roughly 40vh (nearly end of hero).
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.05, 0.15, 1],
    [COLOR_PAPER, COLOR_PAPER, COLOR_INK, COLOR_INK]
  );
  
  const textColor = useTransform(
    scrollYProgress,
    [0, 0.05, 0.15, 1],
    [COLOR_INK, COLOR_INK, COLOR_PAPER, COLOR_PAPER]
  );

  return (
    <SmoothScroll>
      <Cursor />
      <Nav isLightHero={true} />
      
      <motion.main 
        ref={pageRef}
        className="relative w-full"
        style={{ backgroundColor, color: textColor }}
      >
        <section className="relative pt-48 pb-24 px-6 md:px-10">
          <div className="mx-auto max-w-[1400px]">
            <p className="font-mono text-sm tracking-[0.2em] uppercase text-brass mb-6">Home / Our Services</p>
            <h1 className="font-display text-[clamp(3rem,8vw,6rem)] font-light leading-none tracking-tight">
              Our Services
            </h1>
          </div>
        </section>

        <PinnedRegistryBrowser />
        
        <Footer />
      </motion.main>
    </SmoothScroll>
  );
}

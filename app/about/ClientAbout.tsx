"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import Nav from "../components/Nav";
import Cursor from "../components/Cursor";
import SmoothScroll from "../components/SmoothScroll";
import Footer from "../components/Footer";
import { CheckCircle2 } from "lucide-react";
import StickyWordStack from "../components/StickyWordStack";
import VisionMissionReveal from "../components/VisionMissionReveal";
import ValuesHoverList from "../components/ValuesHoverList";

// Color constants matching the design system
const COLOR_PAPER = "#F5F5F3";
const COLOR_INK = "#16181D";
const COLOR_BRASS = "#d4af37";

// -------------------------------------------------------------
// 1. Scroll-Progress Ring Component
// -------------------------------------------------------------
function ProgressRing({ scrollYProgress, isDark }: { scrollYProgress: any, isDark: boolean }) {
  const pathLength = useSpring(scrollYProgress, { stiffness: 400, damping: 90 });
  const strokeBase = isDark ? "rgba(245,245,243,0.1)" : "rgba(22,24,29,0.1)";
  const textFill = isDark ? COLOR_PAPER : COLOR_INK;

  return (
    <div className="absolute top-10 left-6 md:left-10 w-12 h-12 z-10 hidden md:block">
      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
        <circle cx="50" cy="50" r="40" stroke={strokeBase} fill="none" strokeWidth="4" />
        <motion.circle
          cx="50"
          cy="50"
          r="40"
          stroke={COLOR_BRASS}
          fill="none"
          strokeWidth="4"
          style={{ pathLength }}
        />
        {/* Seal Motif S */}
        <text x="50" y="55" fontSize="24" fill={textFill} textAnchor="middle" fontFamily="sans-serif" className="font-display font-light rotate-90 origin-center">
          S
        </text>
      </svg>
    </div>
  );
}

// -------------------------------------------------------------
// 2. Karaoke-Style Text Reveal Component
// -------------------------------------------------------------
function KaraokeText({ text, targetRef }: { text: string, targetRef: React.RefObject<HTMLElement | null> }) {
  const fallbackRef = useRef(null);
  const { scrollYProgress } = useScroll({ 
    target: targetRef || fallbackRef, 
    offset: ["start 60%", "end 60%"] 
  });
  const words = text.split(" ");

  return (
    <p ref={targetRef ? undefined : fallbackRef} className="font-display text-[clamp(1.25rem,2.5vw,2rem)] font-light leading-[1.3] text-balance">
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
        return (
          <span key={i} className="mr-[0.25em] inline-block">
            <motion.span style={{ opacity }}>
              {word}
            </motion.span>
          </span>
        );
      })}
    </p>
  );
}

// -------------------------------------------------------------
// 3. Stacked Word Spotlight (Our Difference)
// -------------------------------------------------------------
const DIFFERENCE_DATA = [
  { prefix: "WE ARE YOUR", word: "CONTACT" },
  { prefix: "WE SPEAK WITH", word: "FLUENCY" },
  { prefix: "WE DELIVER", word: "OUTCOMES" },
  { prefix: "WE ALSO", word: "EXECUTE" }
];

// -------------------------------------------------------------
// 4. Numbered Row Spotlight (Credentials)
// -------------------------------------------------------------
const CREDENTIALS = [
  { label: "Ex-Zonal DC", desc: "Former Zonal Development Commissioner for FALTA SEZ and Vishakhapatnam SEZ, overseeing vast infrastructural and regulatory mandates." },
  { label: "Ex-Director (GoI)", desc: "Former Director with the Government of India, driving national-level policy implementation and oversight." },
  { label: "Ex-Joint DC", desc: "Former Joint Development Commissioner for SEEPZ SEZ, administering one of India's most critical export processing zones." },
  { label: "Ex-Chief Planner", desc: "Former Chief Planner & Architect with the Maharashtra Industrial Development Corporation (MIDC), mastering industrial master-planning." },
  { label: "Ex-Addl. Comm. Customs", desc: "Former Additional Commissioner of Customs, bringing unparalleled insight into material movement and border compliances." }
];

function CredentialsSpotlight() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  
  return (
    <div ref={ref} className="h-[500vh] relative border-t border-[var(--line)] text-white">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <ProgressRing scrollYProgress={scrollYProgress} isDark={true} />
        
        <div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
          <p className="eyebrow text-brass mb-8 md:mb-12">Who We Are</p>
          
          <div className="flex flex-col gap-6">
            {CREDENTIALS.map((cred, i) => {
              const step = 1 / CREDENTIALS.length;
              const start = i * step;
              const activeStart = start + step * 0.1;
              const activeEnd = start + step * 0.9;
              const end = (i + 1) * step;

              const isActive = useTransform(
                scrollYProgress,
                [start, activeStart, activeEnd, end],
                [0, 1, 1, 0]
              );
              
              const opacity = useTransform(isActive, [0, 1], [0.3, 1]);
              const height = useTransform(isActive, [0, 1], ["0px", "80px"]);
              const y = useTransform(isActive, [0, 1], [10, 0]);

              return (
                <motion.div 
                  key={i} 
                  style={{ opacity }}
                  className="group relative flex flex-col border-b border-white/10 pb-4 md:pb-6"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 md:gap-6">
                      <span className="font-mono text-xs md:text-sm text-brass/70">0{i+1}</span>
                      <h3 className="font-display text-[clamp(1.2rem,3vw,2.5rem)] tracking-tight text-white">{cred.label}</h3>
                    </div>
                    <motion.div style={{ opacity: isActive }} className="hidden md:flex gap-1">
                      {[...Array(6)].map((_, j) => (
                        <div key={j} className="w-1 h-1 rounded-full bg-brass/40" />
                      ))}
                    </motion.div>
                  </div>
                  
                  <motion.div style={{ height, opacity: isActive }} className="overflow-hidden">
                    <motion.p style={{ y }} className="mt-3 md:mt-4 pl-8 md:pl-11 pr-2 max-w-2xl opacity-70 leading-snug md:leading-relaxed text-sm md:text-base text-white/90">
                      {cred.desc}
                    </motion.p>
                  </motion.div>
                  
                  <motion.div style={{ scaleX: isActive, transformOrigin: "left" }} className="absolute bottom-0 left-0 h-[1px] w-full bg-brass" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 4. Pinned Takeover (Mission & Vision)
// -------------------------------------------------------------

const VISION_TEXT = "To be the most trusted name in SEZ and IFSC consultancy in India — recognised not for the volume of services offered, but for the depth of regulatory understanding behind each one, built by professionals who have worked on both sides of the approval process.";
const MISSION_TEXT = "Sampoorna SEZ Consultancy Services exists to give SEZ developers, co-developers, and units a single, reliable partner for every stage of SEZ compliance — from initial approval through material clearance, customs, GST, and day-to-day regulatory upkeep — so our clients can focus on operating their business, not decoding regulation.";

// -------------------------------------------------------------
// 5. Where We Work (Parallax Collage)
// -------------------------------------------------------------
function WhereWeWork() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section ref={ref} className="relative py-32 md:py-48 overflow-hidden">
      {/* Background with Diff Lights */}
      <div className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-luminosity" style={{ backgroundImage: "url(/images/corporate_boardroom.jpg)" }} />
      <div className="absolute inset-0 bg-gradient-to-b from-[#16181D] via-[#16181D]/90 to-[#16181D]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[60%] bg-[#d4af37]/15 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative z-20 mx-auto max-w-[1400px] px-6 md:px-10 grid lg:grid-cols-2 gap-20 items-center">
        
        <motion.div 
          className="relative z-20"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow opacity-60 mb-6 text-[#d4af37]">Where We Work</p>
          <h2 className="font-sans text-[clamp(3rem,5vw,5rem)] font-black uppercase tracking-tighter leading-[1.05] mb-8 text-white">
            Across India's <br />premier SEZs <br />and IFSCs
          </h2>
          <p className="text-[clamp(1.1rem,1.5vw,1.3rem)] opacity-80 leading-relaxed font-light mb-12 max-w-lg text-white/90">
            Sampoorna is based in Mumbai and has worked extensively with SEZ units across SEEPZ SEZ, alongside developers and co-developers in zones including FALTA SEZ and Vishakhapatnam SEZ. Our team's IFSC experience extends to India's first International Financial Services Centre at GIFT City, Gujarat. We work across industries including manufacturing, gems & jewellery, IT/ITES, pharmaceuticals, textiles, and warehousing & logistics.
          </p>

          <div className="flex flex-col sm:flex-row gap-8">
            <Link href="/our-team" className="text-[#d4af37] hover:text-white font-medium transition-colors border-b border-[#d4af37]/30 pb-1 hover:border-white">
              Explore our team's credentials →
            </Link>
            <Link href="/our-expertise" className="text-[#d4af37] hover:text-white font-medium transition-colors border-b border-[#d4af37]/30 pb-1 hover:border-white">
              View full range of services →
            </Link>
          </div>
        </motion.div>

        <div className="relative h-[500px] lg:h-[700px] w-full mt-12 lg:mt-0">
          {/* Main Background Image */}
          <motion.div style={{ y: y1 }} className="absolute left-[10%] top-[10%] w-[80%] h-[80%] rounded-2xl overflow-hidden shadow-2xl bg-[#d4af37]/20">
             <div className="absolute inset-0 bg-cover bg-center grayscale mix-blend-multiply opacity-70" style={{ backgroundImage: "url(/images/sez_port_aerial.jpg)" }} />
          </motion.div>
          
          {/* Parallax Floating Image 1 (GIFT City) */}
          <motion.div style={{ y: y2 }} className="absolute bottom-0 right-0 w-[55%] h-[45%] rounded-xl overflow-hidden shadow-2xl border-4 border-[#F5F5F3]">
             <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-110" style={{ backgroundImage: "url(/images/port-night.jpg)" }} />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
             <div className="absolute bottom-5 left-5 text-white font-mono text-xs uppercase tracking-widest pointer-events-none">GIFT City, Gujarat</div>
          </motion.div>

          {/* Parallax Floating Image 2 (Mumbai) */}
          <motion.div style={{ y: y3 }} className="absolute top-[5%] left-0 w-[45%] h-[35%] rounded-xl overflow-hidden shadow-2xl border-4 border-[#F5F5F3]">
             <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-110" style={{ backgroundImage: "url(/images/clean_aerial_port.jpg)" }} />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
             <div className="absolute bottom-5 left-5 text-white font-mono text-xs uppercase tracking-widest pointer-events-none">Mumbai / SEEPZ</div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

// -------------------------------------------------------------
// MAIN PAGE COMPONENT (The 5-Beat Scroll Tracker)
// -------------------------------------------------------------
export default function ClientAbout() {
  const containerRef = useRef(null);
  const ourStoryRef = useRef<HTMLElement>(null);
  
  // Track scroll over the ENTIRE page
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  // BEAT 1 (0 to 0.2): Intro (Light)
  // BEAT 2 (0.2 to 0.4): Who We Are (Interpolate Light -> Dark)
  // BEAT 3 (0.4 to 0.55): Why Sampoorna (Dark)
  // BEAT 4 (0.55 to 0.8): The Event / Pinned Takeover (Dark)
  // BEAT 5 (0.8 to 1.0): Where We Work (Interpolate Dark -> Light)
  
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.15, 0.3, 0.85, 1],
    [COLOR_PAPER, COLOR_PAPER, COLOR_INK, COLOR_INK, COLOR_INK]
  );

  const color = useTransform(
    scrollYProgress,
    [0, 0.15, 0.3, 0.85, 1],
    [COLOR_INK, COLOR_INK, COLOR_PAPER, COLOR_PAPER, COLOR_PAPER]
  );

  return (
    <SmoothScroll>
      <Cursor />
      <Nav />

      {/* 
        Wrap the entire page in a motion.main that responds to the global scroll progress. 
        This handles the continuous color interpolation seamlessly.
      */}
      <motion.main 
        ref={containerRef} 
        className="relative w-full transition-colors duration-0"
        style={{ backgroundColor, color }}
      >
        
        {/* 1. HERO (Fixed as is) */}
        <section className="relative h-screen min-h-[600px] flex items-end pb-24 overflow-hidden text-white">
          <motion.div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(/images/futuristic_port_aerial.jpg)" }}
            animate={{
              scale: [1.05, 1.15, 1.05],
              x: ["-2%", "2%", "-2%"],
              y: ["-2%", "2%", "-2%"],
            }}
            transition={{
              duration: 40,
              ease: "linear",
              repeat: Infinity,
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(22,24,29,0.3),rgba(22,24,29,0.8))]" />
          
          <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-10">
            <p className="font-mono text-sm uppercase tracking-[0.3em] text-[#d4af37] font-semibold mb-6 opacity-100 drop-shadow-md">About · Mumbai, India</p>
            <h1 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] font-light leading-[1.05] tracking-tight text-white drop-shadow-xl">
              About Sampoorna <br />SEZ Consultancy Services
            </h1>
          </div>
        </section>

        {/* BEAT 1: OUR STORY (Karaoke Text + Scrolling Image Stack) */}
        <section ref={ourStoryRef} className="relative py-24 md:py-40">
          <div className="mx-auto max-w-[1400px] px-6 md:px-10 grid lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24">
            
            {/* Left Side: Stretches to full height of grid, contains sticky text */}
            <div>
              <div className="sticky top-40 pt-12 pb-24 h-max">
                <p className="eyebrow opacity-40 mb-8">Our Story</p>
                <KaraokeText 
                  text="Sampoorna SEZ Consultancy Services is a Mumbai-based consultancy built around one idea: SEZ approvals shouldn't require a company to become its own regulatory expert. We provide end-to-end SEZ, IFSC, customs, and compliance consultancy — from the first application to ongoing day-to-day compliance — for developers, co-developers, and units operating inside India's Special Economic Zones." 
                  targetRef={ourStoryRef} 
                />
              </div>
            </div>

            {/* Right Side: Scrolling Image Stack */}
            <div className="flex flex-col gap-10">
              <div 
                className="h-[400px] lg:h-[600px] w-full bg-cover bg-center rounded-2xl border border-white/5 shadow-xl"
                style={{ backgroundImage: "url(/images/corporate_boardroom.jpg)" }}
              />
              <div 
                className="h-[400px] lg:h-[600px] w-full bg-cover bg-center rounded-2xl border border-white/5 shadow-xl"
                style={{ backgroundImage: "url(/images/office_handshake.jpg)" }}
              />
              <div 
                className="h-[400px] lg:h-[600px] w-full bg-cover bg-center rounded-2xl border border-white/5 shadow-xl"
                style={{ backgroundImage: "url(/images/blueprints.jpg)" }}
              />
            </div>
            
          </div>
        </section>

        {/* BEAT 2: WHO WE ARE (Numbered Row Spotlight) */}
        {/* As you scroll into this, background morphs to dark automatically via global useTransform */}
        <CredentialsSpotlight />

        {/* BEAT 3: OUR DIFFERENCE (Sticky Stacked Spotlight) */}
        <StickyWordStack label="Our Difference" items={DIFFERENCE_DATA} />

        {/* BEAT 4: THE EVENT (Pinned Takeover Mission/Vision) */}
        <VisionMissionReveal visionText={VISION_TEXT} missionText={MISSION_TEXT} />

        {/* BEAT 4.5: WHAT WE STAND FOR (Hover-Driven List) */}
        <ValuesHoverList />

        {/* BEAT 5: WHERE WE WORK */}
        {/* As you scroll into this, background morphs back to light automatically */}
        <WhereWeWork />

        <Footer />
      </motion.main>
    </SmoothScroll>
  );
}

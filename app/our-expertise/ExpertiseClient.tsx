"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  useMotionValueEvent, 
  useReducedMotion,
  useMotionTemplate,
  useMotionValue,
  AnimatePresence,
  useAnimation,
  useInView
} from "framer-motion";
import RevealText from '../components/RevealText';
import Link from "next/link";
import Image from "next/image";
import {
  FileCheck2, Landmark, PackageCheck, ShieldCheck, HeadphonesIcon, Search,
  ClipboardList, Globe, Compass, TrendingUp, Target, Workflow, FileText,
  Building2, Scale, Receipt, Settings, LayoutGrid, CheckCircle2
} from "lucide-react";
import Footer from "../components/Footer";
import ScrollLine from "../../components/ScrollLine";

// Colors for background morphing
const COLOR_PAPER = "#F5F5F3";
const COLOR_INK_2 = "#ecebe8";
const COLOR_INK = "#16181D";

/* -------------------------------------------------------------------------- */
/*                                    DATA                                    */
/* -------------------------------------------------------------------------- */

const CORE_SERVICES = [
  {
    title: "SEZ Approval Services", icon: FileCheck2,
    desc: "End-to-end approval support for Developers, Co-Developers, and Units under the SEZ Act, 2005.",
    link: "/sez-approval-services", size: "large",
  
    image: "/images/corporate.jpg",
  },
  {
    title: "IFSC Setup", icon: Landmark,
    desc: "Setting up units in India's International Financial Services Centres, including GIFT City.",
    link: "/ifsc", size: "large",
  
    image: "/images/port.jpg",
  },
  {
    title: "Customs Clearance", icon: PackageCheck,
    desc: "Bill of Entry/Export filing, DTA sale clearance, and material movement compliance.",
    link: null, size: "small",
  
    image: "/images/corporate.jpg",
  },
  {
    title: "Compliance & Audit", icon: ShieldCheck,
    desc: "Statutory, internal, and due diligence audits alongside ongoing regulatory compliance.",
    link: null, size: "small",
  
    image: "/images/port.jpg",
  },
  {
    title: "SEZ Site Helpdesk", icon: HeadphonesIcon,
    desc: "On-ground support at the SEZ site for day-to-day operational matters.",
    link: null, size: "small",
  
    image: "/images/network.jpg",
  },
  {
    title: "B2B Research", icon: Search,
    desc: "Market entry research and regulatory landscape analysis for India expansion.",
    link: null, size: "small",
  
    image: "/images/corporate.jpg",
  },
];

// ---- 1. BulletList: bullets ab ek-ek karke stagger reveal honge ----
const bulletContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};
const bulletItemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const BulletList = ({ items }: { items: string[] }) => (
  <motion.ul
    className="mt-6 flex flex-col gap-3"
    variants={bulletContainerVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-80px" }}
  >
    {items.map((pt, i) => (
      <motion.li
        key={i}
        variants={bulletItemVariants}
        className="flex gap-3 text-ivory-dim leading-relaxed"
      >
        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-brass" />
        {pt}
      </motion.li>
    ))}
  </motion.ul>
);

const REGISTRY = [
  {
    id: "01", title: "SEZ Management & Operational Services", icon: ClipboardList,
    teaser: "Material clearance, record keeping, and day-to-day SEZ management.",
    content: (
      <BulletList items={[
        "Material clearance services under Bill of Entry / Bill of Export",
        "Export clearance by filing shipping bill for export",
        "DTA sale clearance service",
        "Scrap and wastage removal",
        "Temporary removal permissions under Rule 50 & 51 of SEZ Rules 2006",
        "Space relinquishment and addition of area / new location",
        "Executing Bond-cum-Legal Undertaking and ensuring sufficient balance",
        "Handling all day-to-day SEZ operational activities"
      ]} />
    ),
  
    image: "/images/corporate.jpg",
  },
  {
    id: "02", title: "SEZ Online Services", icon: Globe,
    teaser: "Digital compliance, from new user IDs to MPR/APR filing.",
    content: (
      <BulletList items={[
        "Creation of New User ID and Company Admin",
        "Mapping of various modules (e.g. Bill of Entry, Shipping Bill, DTA Sale, MPR, APR, Softex)",
        "Filing Monthly Performance Reports (MPR) and Annual Performance Reports (APR)",
        "Filing of all required declarations and applications via the SEZ Online portal"
      ]} />
    ),
  
    image: "/images/network.jpg",
  },
  {
    id: "03", title: "DCR/Planning Services", icon: Compass,
    teaser: "Master planning, zone demarcation, and architectural compliance.",
    content: (
      <BulletList items={[
        "Filing application for In-principle / Formal Approval and notification",
        "Assistance in demarcation of the processing / non-processing area",
        "Guidance on master planning / zoning as per prevailing DCR",
        "Applying for Default Authorized Operations",
        "Preparation of necessary documentation for Board of Approval / UAC"
      ]} />
    ),
  
    image: "/images/interior.jpg",
  },
  {
    id: "04", title: "Business Advisory", icon: TrendingUp,
    teaser: "Strategic initiatives and implementation partnerships for growth.",
    content: (
      <BulletList items={[
        "Business consulting including market research, strategy and operations",
        "Financial and process consulting",
        "Greenfield and brownfield projects advisory",
        "Transaction advisory including M&A, due diligence, valuations, economic analysis",
        "Technology and risk consulting",
        "Strategic initiatives management and special projects"
      ]} />
    ),
  
    image: "/images/corporate.jpg",
  },
  {
    id: "05", title: "Business Consulting", icon: Target,
    teaser: "B2B market research and customized India expansion strategies.",
    content: (
      <BulletList items={[
        "Market structure and size",
        "Growth rate (historical and projected)",
        "Available product/service offerings",
        "Key customers and customer segmentation",
        "Market trends — drivers and challenges",
        "Regulatory and tax aspects",
        "Competition mapping"
      ]} />
    ),
  
    image: "/images/interior.jpg",
  },
  {
    id: "06", title: "Process Consulting", icon: Workflow,
    teaser: "Redesigning business processes to maximize efficiency and cut costs.",
    content: (
      <BulletList items={[
        "Our team identifies key processes where your company can increase efficiencies",
        "Lower cost and decrease the time taken within the process",
        "We prioritize key processes based on their potential to improve",
        "The process is redesigned and improvements are implemented",
        "We monitor the performance of the new processes to ensure smooth functioning"
      ]} />
    ),
  
    image: "/images/port.jpg",
  },
  {
    id: "07", title: "Business Plan Services", icon: FileText,
    teaser: "Validation and end-to-end development of comprehensive business plans.",
    content: (
      <BulletList items={[
        "Challenge the current assumptions",
        "Identify the gaps in planning",
        "Conduct independent research and analysis to corroborate assumptions",
        "Prepare a comprehensive business plan to get you to your goals",
        "Identify competitive, economic, social, technological, regulatory factors"
      ]} />
    ),
  
    image: "/images/interior.jpg",
  },
  {
    id: "08", title: "Business Setup in India", icon: Building2,
    teaser: "Company incorporation and strategy for Indian market entry.",
    content: (
      <BulletList items={["Entry Strategy", "Growth Strategy", "Diversification Strategy", "Incorporation of Companies", "Relevant licenses/certificates required"]} />
    ),
  
    image: "/images/corporate.jpg",
  },
  {
    id: "09", title: "Tax & Regulatory Compliance", icon: Scale,
    teaser: "Comprehensive advisory across India's complex regulatory regime.",
    content: (
      <BulletList items={[
        "Foreign direct investment regulations",
        "Company law",
        "Direct and Indirect taxation",
        "Exchange control regulations",
        "Foreign Trade Policy & Customs Laws",
        "Labour, employment, and factory regulations",
        "TDS & Certification Work"
      ]} />
    ),
  
    image: "/images/port.jpg",
  },
  {
    id: "10", title: "Audit & Assurance", icon: ShieldCheck,
    teaser: "Statutory, internal, management, SOX, and due diligence audits.",
    content: (
      <BulletList items={["Statutory Audit", "Internal Audit", "Management Audit", "SOX Audit & SEBI LODR Regulations", "Due Diligence Audit"]} />
    ),
  
    image: "/images/interior.jpg",
  },
  {
    id: "11", title: "GST Services", icon: Receipt,
    teaser: "End-to-end GST registration, compliance, returns, and refunds.",
    content: (
      <BulletList items={["GST Registration", "GST Consultancy", "GST Refund", "GST Return", "GST Compliances", "GST Audit"]} />
    ),
  
    image: "/images/interior.jpg",
  },
  {
    id: "12", title: "Maintain My Business", icon: Settings,
    teaser: "Routine registrations and licenses for continuous compliance.",
    content: (
      <BulletList items={["Business License / Registration", "ESI Registration", "EPF Registration", "FCRA Registration", "MSME Registration", "Food Business License"]} />
    ),
  
    image: "/images/network.jpg",
  },
  {
    id: "13", title: "Other Services", icon: LayoutGrid,
    teaser: "On-ground SEZ support, C&F duties, and routine liaison work.",
    content: (
      <BulletList items={[
        "Consultancy on the procedure to be followed for Import & Local procurement",
        "Handling customs department at SEZ",
        "Work as a C&F agent on behalf of the developer/unit",
        "Maintain registers/records as per SEZ Rules",
        "Submission of returns to the Development Commissioner",
        "Providing a help desk at the SEZ site"
      ]} />
    ),
  
    image: "/images/port.jpg",
  },
];

/* -------------------------------------------------------------------------- */
/*                                 COMPONENTS                                 */
/* -------------------------------------------------------------------------- */

// 1. Dynamic Bento Grid Card
function BentoCard({ service, index, shouldReduceMotion }: { service: any, index: number, shouldReduceMotion: boolean }) {
  const Icon = service.icon;
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Gradient that tracks mouse, only visible on hover (handled by opacity in CSS)
  const background = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(212, 175, 55, 0.12), transparent 80%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <motion.div 
      variants={shouldReduceMotion ? {} : itemVariants}
      onMouseMove={handleMouseMove}
      className={`group relative flex flex-col p-8 md:p-10 outline-none overflow-hidden transition-all duration-300 ${
        service.size === 'large' ? 'md:col-span-2 lg:col-span-2' : ''
      } bg-[var(--paper)] hover:bg-[var(--ink-2)] border border-[var(--line)] shadow-sm hover:shadow-xl hover:-translate-y-1`}
    >
      
      {/* Background Image Layer */}
      {service.image && (
        <div className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-luminosity group-hover:opacity-[0.08] transition-opacity duration-700">
          <Image src={service.image} alt={service.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--paper)]" />
        </div>
      )}

      {/* Mouse Tracking Glow Layer */}
      {!shouldReduceMotion && (
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background }}
        />
      )}
      
      {/* Structural Card Layout */}
      <div className="relative z-10 flex flex-col h-full">
        <Icon strokeWidth={1} className="w-10 h-10 text-[var(--brass)] mb-auto transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1" />
        <h3 className="font-display text-2xl text-[var(--ivory)] mt-8">{service.title}</h3>
        <p className="mt-3 text-sm text-[var(--ivory-dim)] leading-relaxed max-w-sm">{service.desc}</p>
        
        {service.link && (
          <Link href={service.link} className="mt-6 text-xs font-semibold uppercase tracking-widest text-[var(--brass)] hover:text-[var(--brass-2)] transition-colors before:absolute before:inset-0 focus-visible:outline-none">
            Learn more →
          </Link>
        )}
      </div>
    </motion.div>
  );
}

// Animated Background Lines for the Grid
function AnimatedGridLines({ shouldReduceMotion }: { shouldReduceMotion: boolean }) {
  if (shouldReduceMotion) return null;
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
      <motion.line x1="33%" y1="0" x2="33%" y2="100%" stroke="var(--brass)" strokeWidth="1" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }} viewport={{ once: true }} />
      <motion.line x1="66%" y1="0" x2="66%" y2="100%" stroke="var(--brass)" strokeWidth="1" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut", delay: 0.4 }} viewport={{ once: true }} />
      <motion.line x1="0" y1="50%" x2="100%" y2="50%" stroke="var(--brass)" strokeWidth="1" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} transition={{ duration: 1.5, ease: "easeInOut", delay: 0.6 }} viewport={{ once: true }} />
    </svg>
  );
}

// 2. Orbital StampWall (Magnetic Stamp)
function MagneticStamp({ service, index, shouldReduceMotion }: { service: any, index: number, shouldReduceMotion: boolean }) {
  const ref = useRef<HTMLButtonElement>(null);
  
  // Magnetic Pull
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15, mass: 0.1 });

  useEffect(() => {
    if (shouldReduceMotion) return;
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      
      // Magnetic radius = 120px
      if (distance < 120) {
        mouseX.set(distanceX * 0.3); // Pull strength
        mouseY.set(distanceY * 0.3);
      } else {
        mouseX.set(0);
        mouseY.set(0);
      }
    };
    
    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, [mouseX, mouseY, shouldReduceMotion]);

  // Floating Idle Physics
  // We use standard React motion properties. The random delay offsets the floating sync.
  const floatVariants = {
    idle: {
      y: [0, -8, 0],
      transition: {
        duration: 4 + (index % 3), // 4s to 6s
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.2
      }
    },
    static: { y: 0 }
  };

  const scrollToEntry = (id: string) => {
    const el = document.getElementById(`entry-${id}`);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <motion.button
      ref={ref}
      onClick={() => scrollToEntry(service.id)}
      style={shouldReduceMotion ? {} : { x: springX, y: springY }}
      animate={shouldReduceMotion ? "static" : "idle"}
      variants={floatVariants}
      className="group relative flex flex-col items-center gap-4 outline-none active:scale-[0.92] transition-transform duration-300 w-full hover:z-50"
    >
      <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[var(--paper)] ring-1 ring-[var(--ivory)]/20 transition-all duration-500 group-hover:ring-[var(--ivory)] group-hover:shadow-lg group-hover:-translate-y-1 z-10">
        <service.icon strokeWidth={1} className="w-8 h-8 text-[var(--brass)] group-hover:scale-110 transition-transform duration-500" />
      </div>
      
      <div className="text-center font-mono text-[0.65rem] uppercase tracking-widest text-[var(--ivory)]/80 max-w-[120px] group-hover:text-[var(--ivory)] transition-colors">
        {service.title}
      </div>
      
      {/* Glassmorphism Tooltip */}
      <div className="absolute top-full left-1/2 mt-4 -translate-x-1/2 w-48 rounded-xl bg-[rgba(245,245,243,0.85)] backdrop-blur-md border border-[var(--line)] p-4 text-center text-xs text-[var(--ivory)] opacity-0 pointer-events-none transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-1 z-20 shadow-xl">
        {service.teaser}
      </div>
    </motion.button>
  );
}

// ---- 2. RegistryTimelineNode: alternating entry + 3D tilt + filling spine ----
function RegistryTimelineNode({ service, index, shouldReduceMotion }: { service: any, index: number, shouldReduceMotion: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasRippled, setHasRippled] = useState(false);

  // odd/even ke hisaab se side decide (left se ya right se aaye)
  const fromLeft = index % 2 === 0;

  // Node-level scroll: focus effect (jo pehle tha)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end 40%"],
  });

  const nodeOpacity = useTransform(scrollYProgress, [0, 0.25, 0.85, 1], [0.25, 1, 1, 0.4]);

  // Card entry: slide from side + slight 3D rotate as it enters
  const cardX = useTransform(scrollYProgress, [0, 0.35], [fromLeft ? -70 : 70, 0]);
  const cardRotateY = useTransform(scrollYProgress, [0, 0.35], [fromLeft ? -8 : 8, 0]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  // Spine line: brass fill jo scroll ke saath grow karti hai (connects all nodes)
  const spineFill = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

  // Ghost entry number background parallax
  const ghostY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  // ---- Approved stamp physics (same as before) ----
  const stampOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const targetScale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [1.3, 1, 1, 1.3]);
  const targetRotate = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [15, 0, 0, -15]);
  const stampScaleSpring = useSpring(targetScale, { stiffness: 400, damping: 15, mass: 0.5 });
  const stampRotateSpring = useSpring(targetRotate, { stiffness: 400, damping: 15, mass: 0.5 });
  const branchPathLength = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (shouldReduceMotion) return;
    if (v > 0.1 && v < 0.9 && !hasRippled) {
      setHasRippled(true);
    } else if (v <= 0 || v >= 1) {
      setHasRippled(false);
    }
  });

  return (
    <motion.div
      id={`entry-${service.id}`}
      ref={ref}
      style={shouldReduceMotion ? {} : { opacity: nodeOpacity }}
      className="relative flex flex-col md:flex-row gap-6 md:gap-16 scroll-mt-32 pt-10 md:pt-16 pb-10 md:pb-16 z-10"
    >
      {/* Filling spine line */}
      <div className="hidden md:block absolute left-8 top-0 bottom-0 w-px bg-[var(--line)]" />
      {!shouldReduceMotion && (
        <motion.div
          className="hidden md:block absolute left-8 top-0 w-px bg-[var(--brass)] origin-top"
          style={{ bottom: 0, scaleY: spineFill }}
        />
      )}

      {/* Left Column: Icon + circuit branch */}
      <div className="relative w-full md:w-32 shrink-0 flex flex-col items-center md:items-start justify-start pt-0 md:pt-2 mb-4 md:mb-0">
        {!shouldReduceMotion && (
          <svg className="absolute left-8 top-8 w-16 h-px pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <motion.line x1="0" y1="0" x2="64" y2="0" stroke="var(--brass)" strokeWidth="2" style={{ pathLength: branchPathLength, opacity: branchPathLength }} />
          </svg>
        )}
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[var(--paper)] ring-1 ring-[var(--line)] z-10 shadow-sm">
          <service.icon strokeWidth={1.5} className="w-6 h-6 text-[var(--brass)]" />
        </div>
      </div>

      {/* Right Column: Content card (slides + tilts in) */}
      <motion.div
        style={shouldReduceMotion ? {} : { x: cardX, rotateY: cardRotateY, opacity: cardOpacity, transformPerspective: 1200 }}
        className="flex-1 bg-[var(--paper)] border border-[var(--line)] p-8 md:p-12 rounded-2xl shadow-sm relative overflow-hidden"
      >
        {/* Ghost entry number in background */}
        {!shouldReduceMotion && (
          <motion.span
            style={{ y: ghostY }}
            className="hidden md:block pointer-events-none absolute -bottom-6 right-4 font-display text-[8rem] leading-none text-[var(--brass)]/[0.06] select-none"
          >
            {service.id}
          </motion.span>
        )}

        {/* Approved stamp */}
        <motion.div
          className="absolute -top-6 -right-6 md:-top-10 md:-right-10 pointer-events-none z-20"
          style={{ opacity: stampOpacity, scale: stampScaleSpring, rotate: stampRotateSpring }}
        >
          <div className="relative">
            <svg viewBox="0 0 120 120" className="w-24 h-24 md:w-32 md:h-32 text-[var(--brass)] drop-shadow-[0_10px_20px_rgba(212,175,55,0.25)]">
              <circle cx="60" cy="60" r="54" stroke="currentColor" strokeWidth="2" fill="var(--paper)" />
              <circle cx="60" cy="60" r="48" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="4 2" />
              <circle cx="60" cy="60" r="32" stroke="currentColor" strokeWidth="1" fill="none" />
              <text x="60" y="72" textAnchor="middle" className="font-display" fontSize="42" fill="currentColor" fontWeight="300">S</text>
              <defs>
                <path id={`topCurve-${index}`} d="M 26,60 A 34,34 0 0,1 94,60" />
                <path id={`bottomCurve-${index}`} d="M 94,60 A 34,34 0 0,1 26,60" />
              </defs>
              <text fontSize="11" fill="currentColor" fontWeight="600" letterSpacing="0.1em" className="font-mono">
                <textPath href={`#topCurve-${index}`} startOffset="50%" textAnchor="middle">VERIFIED</textPath>
              </text>
              <text fontSize="11" fill="currentColor" fontWeight="600" letterSpacing="0.1em" className="font-mono">
                <textPath href={`#bottomCurve-${index}`} startOffset="50%" textAnchor="middle">SAMPOORNA</textPath>
              </text>
              <circle cx="26" cy="60" r="2" fill="currentColor" />
              <circle cx="94" cy="60" r="2" fill="currentColor" />
            </svg>
            <AnimatePresence>
              {hasRippled && (
                <motion.div
                  initial={{ scale: 1, opacity: 0.6 }}
                  animate={{ scale: 1.6, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute inset-0 rounded-full bg-[var(--brass)]/30"
                />
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <div className="relative z-10">
          
        {/* Banner Image */}
        {service.image && (
          <div className="relative w-full h-48 md:h-64 mb-10 rounded-xl overflow-hidden shadow-inner border border-[var(--line)]">
            <Image src={service.image} alt={service.title} fill className="object-cover hover:scale-105 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--paper)]/80 to-transparent mix-blend-overlay pointer-events-none" />
          </div>
        )}

        <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--brass)]">Entry {service.id}</span>
          </div>
          <h3 className="font-display text-[clamp(1.5rem,2.5vw,2.5rem)] text-[var(--ivory)] mb-6 leading-tight">
            {service.title}
          </h3>
          {service.content}
        </div>
      </motion.div>
    </motion.div>
  );
}

function ServiceRegistrySection({ shouldReduceMotion }: { shouldReduceMotion: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.4, once: true });

  const bigStampControls = useAnimation();
  const gridControls = useAnimation();

  useEffect(() => {
    if (!isInView) return;

    const runSequence = async () => {
      if (shouldReduceMotion) {
        // Skip big stamp slam and watermark, just fade grid
        bigStampControls.set({ opacity: 0 });
        gridControls.start('visible');
        return;
      }

      // Stage 1: big stamp slams in
      await bigStampControls.start({
        opacity: 1,
        scale: 1,
        rotate: 0,
        transition: { type: 'spring', stiffness: 380, damping: 14 },
      });

      // Stage 2: big stamp settles into background watermark
      await bigStampControls.start({
        scale: 2.4,
        opacity: 0.08,
        transition: { duration: 0.8, ease: 'easeOut' },
      });

      // Stage 3: real 13 stamps cascade in
      await gridControls.start('visible');
    };

    runSequence();
  }, [isInView, bigStampControls, gridControls, shouldReduceMotion]);

  const gridVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.06, delayChildren: 0.1 },
    },
  };

  const stampVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 24 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 260, damping: 20 },
    },
  };

  return (
    <section ref={sectionRef} className="relative border-t border-[var(--line)] bg-[var(--ink-2)] py-20 md:py-28 overflow-hidden z-10">
      
      {/* Big center "APPROVED" stamp -> becomes background watermark */}
      <motion.div
        initial={{ opacity: 0, scale: 1.6, rotate: -8 }}
        animate={bigStampControls}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
      >
        <svg viewBox="0 0 120 120" className="w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] max-w-[500px] max-h-[500px] text-[var(--brass)] drop-shadow-[0_10px_30px_rgba(212,175,55,0.4)]">
          <circle cx="60" cy="60" r="54" stroke="currentColor" strokeWidth="2" fill="var(--paper)" />
          <circle cx="60" cy="60" r="48" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="4 2" />
          <text x="60" y="72" textAnchor="middle" className="font-display" fontSize="42" fill="currentColor" fontWeight="300">S</text>
          <defs>
            <path id="topCurve-bg2" d="M 26,60 A 34,34 0 0,1 94,60" />
            <path id="bottomCurve-bg2" d="M 94,60 A 34,34 0 0,1 26,60" />
          </defs>
          <text fontSize="11" fill="currentColor" fontWeight="600" letterSpacing="0.1em" className="font-mono">
            <textPath href="#topCurve-bg2" startOffset="50%" textAnchor="middle">VERIFIED</textPath>
          </text>
          <text fontSize="11" fill="currentColor" fontWeight="600" letterSpacing="0.1em" className="font-mono">
            <textPath href="#bottomCurve-bg2" startOffset="50%" textAnchor="middle">SAMPOORNA</textPath>
          </text>
          <circle cx="26" cy="60" r="1.5" fill="currentColor" />
          <circle cx="94" cy="60" r="1.5" fill="currentColor" />
        </svg>
      </motion.div>

      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10 z-10">
        <div className="text-center">
          <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-light leading-[1.1] tracking-tight text-[var(--ivory)]">
            The Complete Service Registry
          </h2>
          <p className="mt-5 max-w-2xl mx-auto text-lg leading-relaxed text-[var(--ivory-dim)]">
            Browse our full range of services below, or select a stamp to jump straight to an entry.
          </p>
        </div>
        
        {/* 13 real service stamps, staggered on top */}
        <motion.div
          variants={gridVariants}
          initial="hidden"
          animate={gridControls}
          className="mt-20 mb-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-y-12 gap-x-6 justify-items-center"
        >
          {REGISTRY.map((r, i) => (
            <motion.div key={r.id} variants={stampVariants} className="w-full flex justify-center">
              <MagneticStamp service={r} index={i} shouldReduceMotion={shouldReduceMotion} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CoreServicesHeadline({ text, shouldReduceMotion }: { text: string, shouldReduceMotion: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once: true });

  const baseClasses = "font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-light leading-[1.1] tracking-tight";

  if (shouldReduceMotion) {
    return <h2 className={`${baseClasses} text-[var(--ivory)]`}>{text}</h2>;
  }

  return (
    <motion.h2
      ref={ref}
      className={baseClasses}
      initial={{ backgroundPosition: '200% 0%' }}
      animate={isInView ? { backgroundPosition: '-200% 0%' } : {}}
      transition={{ duration: 1.4, ease: 'easeInOut' }}
      style={{
        backgroundImage: 'linear-gradient(100deg, var(--ivory) 42%, var(--brass-2) 48%, var(--brass-2) 52%, var(--ivory) 58%)',
        backgroundSize: '300% 100%',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        color: 'transparent',
      }}
    >
      {text}
    </motion.h2>
  );
}

function SampoornaSignatureReveal({ shouldReduceMotion }: { shouldReduceMotion: boolean }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 80%', 'center center']
  });

  const maskPercentage = useTransform(scrollYProgress, [0, 0.8], [0, 100]);
  const maskImage = useMotionTemplate`linear-gradient(to right, black ${maskPercentage}%, transparent calc(${maskPercentage}% + 10%))`;
  
  const fillOpacity = useTransform(scrollYProgress, [0.85, 1], [0, 1]);
  const dropShadow = useTransform(scrollYProgress, [0.95, 1], ["drop-shadow(0 0 0px transparent)", "drop-shadow(0 15px 30px rgba(44,84,136,0.3))"]);

  if (shouldReduceMotion) {
    return (
      <section className="py-32 md:py-48 bg-[var(--paper)] flex justify-center items-center">
        <h2 className="font-display text-[6rem] sm:text-[8rem] md:text-[12rem] text-[var(--brass)] drop-shadow-md leading-none">
          संपूर्णा
        </h2>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="py-32 md:py-48 bg-[var(--paper)] flex flex-col justify-center items-center z-20 relative overflow-hidden">
      <motion.div style={{ filter: dropShadow }} className="relative flex justify-center items-center px-6 md:px-10">
        
        {/* OUTLINE LAYER - Revealed by wiping left to right */}
        <motion.h2 
          className="font-display text-[5rem] sm:text-[8rem] md:text-[12rem] font-light leading-none tracking-tight"
          style={{ 
            WebkitTextStroke: '2px var(--brass)', 
            color: 'transparent',
            WebkitMaskImage: maskImage,
            maskImage: maskImage
          }}
        >
          संपूर्णा
        </motion.h2>

        {/* FILLED LAYER - Fades in after wipe completes */}
        <motion.h2 
          className="absolute inset-0 flex items-center justify-center font-display text-[5rem] sm:text-[8rem] md:text-[12rem] font-light leading-none tracking-tight text-[var(--brass)]"
          style={{ 
            opacity: fillOpacity,
            WebkitMaskImage: maskImage,
            maskImage: maskImage
          }}
        >
          संपूर्णा
        </motion.h2>

      </motion.div>
    </section>
  );
}

const GRID_COLS = 60;
const GRID_ROWS = 20; // Devanagari ko top matra + main + bottom matra ke liye thodi zyada height chahiye

// Runtime pe asli font se grid banao — hardcode mat karo
function useDevanagariGrid(text: string, cols: number, rows: number) {
  const [grid, setGrid] = useState<boolean[][] | null>(null);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const SS = 16; // super-sampling: har cell = 16x16 px, crisp sampling ke liye
    const W = cols * SS;
    const H = rows * SS;

    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const font = `700 100px "Noto Sans Devanagari", "Mangal", "Nirmala UI", sans-serif`;

    const build = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Font size ko width me fit karo (92% tak), phir height check
      let fontSize = H * 0.82;
      const setF = (s: number) => (ctx.font = `700 ${s}px "Noto Sans Devanagari", "Mangal", "Nirmala UI", sans-serif`);
      setF(fontSize);

      const maxW = W * 0.92;
      const m = ctx.measureText(text);
      if (m.width > maxW) {
        fontSize = fontSize * (maxW / m.width);
        setF(fontSize);
      }

      ctx.fillText(text, W / 2, H / 2);

      const data = ctx.getImageData(0, 0, W, H).data;
      const g = [];
      for (let y = 0; y < rows; y++) {
        const row = [];
        for (let x = 0; x < cols; x++) {
          // Cell ke andar coverage count karo (single point sample thin strokes miss kar deta hai)
          let hits = 0;
          let total = 0;
          for (let sy = 2; sy < SS - 2; sy += 3) {
            for (let sx = 2; sx < SS - 2; sx += 3) {
              const px = x * SS + sx;
              const py = y * SS + sy;
              const alpha = data[(py * W + px) * 4 + 3];
              if (alpha > 110) hits++;
              total++;
            }
          }
          row.push(hits / total > 0.18); // ~18% cell bhara ho to dot ON
        }
        g.push(row);
      }
      setGrid(g);
    };

    // Font load ho jaaye tabhi render karo, warna fallback font pick ho jaata hai
    if (document.fonts && document.fonts.load) {
      document.fonts.load(font, text).then(build).catch(build);
    } else {
      build();
    }
  }, [text, cols, rows]);

  return grid;
}

function DotMatrixMorph({ shouldReduceMotion }: { shouldReduceMotion: boolean }) {
  const [isHovered, setIsHovered] = useState(false);
  const wordGrid = useDevanagariGrid("संपूर्णा", GRID_COLS, GRID_ROWS);

  const dots = useMemo(() => {
    const arr = [];
    for (let y = 0; y < GRID_ROWS; y++) {
      for (let x = 0; x < GRID_COLS; x++) {
        arr.push({ x, y, key: `${x}-${y}` });
      }
    }
    return arr;
  }, []);

  return (
    <section className="bg-black py-32 md:py-48 flex flex-col justify-center items-center overflow-hidden border-t border-[var(--line)] z-10 relative">
      <div className="w-full max-w-[1600px] px-6 md:px-10 flex flex-col items-center">
        <div
          className="w-full inline-grid gap-[1px] sm:gap-[3px] md:gap-[8px] cursor-crosshair"
          style={{ gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)` }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setIsHovered(!isHovered)}
        >
          {dots.map(({ x, y, key }) => {
            // grid abhi load nahi hua to sab OFF
            const isOn = isHovered && wordGrid ? wordGrid[y][x] : false;

            const delay = shouldReduceMotion
              ? 0
              : isHovered
              ? (x / GRID_COLS) * 0.9
              : ((GRID_COLS - x) / GRID_COLS) * 0.3;

            return (
              <motion.div
                key={key}
                className="w-full aspect-square rounded-full bg-white mx-auto"
                initial={false}
                animate={{
                  opacity: isOn ? 1 : 0.04,
                  scale: isOn ? 1 : 0.4,
                  boxShadow: isOn
                    ? "0 0 10px rgba(255,255,255,0.6), 0 0 20px rgba(255,255,255,0.3)"
                    : "none",
                }}
                transition={{ duration: shouldReduceMotion ? 0.15 : 0.4, delay, ease: "easeOut" }}
              />
            );
          })}
        </div>
        <p className="text-white/30 mt-16 text-sm font-mono tracking-widest uppercase">Hover to resolve</p>
      </div>
    </section>
  );
}

// 4. Main Page Component (Global Scroll Wrapper)
export default function ExpertiseClient() {
  const shouldReduceMotion = useReducedMotion();
  const pageRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"]
  });

  // Global Background Morphing:
  // Starts Dark (Hero), turns Light (Paper) for Bento & Registry, turns Dark (Ink) for Footer
  // We'll just transition back to Dark at the very end.
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.05, 0.9, 1],
    [COLOR_PAPER, COLOR_PAPER, COLOR_PAPER, COLOR_INK] // Keep it paper for the registry to match the clean aesthetic
  );
  
  const textColor = useTransform(
    scrollYProgress,
    [0, 0.05, 0.9, 1],
    [COLOR_INK, COLOR_INK, COLOR_INK, COLOR_PAPER]
  );

  return (
    <motion.main 
      ref={pageRef}
      className="relative w-full"
      style={shouldReduceMotion ? {} : { backgroundColor, color: textColor }}
    >
      
      {/* ---------------- CORE SERVICES (DYNAMIC BENTO GRID) ---------------- */}
      <section className="relative py-20 md:py-28 overflow-hidden z-20">
        {/* line overlay — flows deep into the section behind cards */}
        <ScrollLine
          viewBox="0 0 1440 1200"
          path="M -50 150 C 400 -200, 900 1300, 1540 950"
          strokeWidth={22}
          className="hidden md:block -z-0 opacity-80"
        />

        <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-10">
          <motion.div 
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }} 
            whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <CoreServicesHeadline text="Core Services" shouldReduceMotion={shouldReduceMotion!} />
            <RevealText
              className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--ivory-dim)]"
              text="The foundational services most SEZ developers, co-developers, and units engage us for."
            />
          </motion.div>
          
          <div className="relative mt-14">
            <AnimatedGridLines shouldReduceMotion={shouldReduceMotion!} />
            
            <motion.div 
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
              }}
              initial={shouldReduceMotion ? "visible" : "hidden"}
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[280px] gap-6"
            >
              {CORE_SERVICES.map((s, i) => (
                <BentoCard key={s.title} service={s} index={i} shouldReduceMotion={shouldReduceMotion!} />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ---------------- ORBITAL STAMPWALL & BACKGROUND WATERMARK ---------------- */}
      <ServiceRegistrySection shouldReduceMotion={shouldReduceMotion!} />

      {/* ---------------- DOT-MATRIX HOVER MORPH ---------------- */}
      <DotMatrixMorph shouldReduceMotion={shouldReduceMotion!} />

      {/* ---------------- REGISTRY SCROLL JOURNEY (TIMELINE) ---------------- */}
      <section className="relative bg-[var(--paper)] py-20 z-10 border-t border-[var(--line)]">
        <div className="mx-auto max-w-[1000px] px-6 md:px-10">
          {REGISTRY.map((r, idx) => (
            <RegistryTimelineNode key={r.id} service={r} index={idx} shouldReduceMotion={shouldReduceMotion!} />
          ))}
        </div>
      </section>

      {/* ---------------- SAMPOORNA SIGNATURE REVEAL ---------------- */}
      <SampoornaSignatureReveal shouldReduceMotion={shouldReduceMotion!} />

      {/* ---------------- CLOSING CTA ---------------- */}
      <section className="border-t border-[var(--line)] py-20 md:py-24 z-10">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <p className="max-w-4xl text-lg leading-relaxed">
            For the SEZ and unit approval process specifically, see our{" "}
            <Link href="/sez-approval-services" className="text-[var(--brass)] underline decoration-[var(--brass)]/30 underline-offset-4 transition-colors hover:decoration-[var(--brass)] font-medium">
              SEZ Approval Services
            </Link>{" "}
            page. For setting up in an International Financial Services Centre, see{" "}
            <Link href="/ifsc" className="text-[var(--brass)] underline decoration-[var(--brass)]/30 underline-offset-4 transition-colors hover:decoration-[var(--brass)] font-medium">
              IFSC Services
            </Link>
            . Ready to talk through your requirements?{" "}
            <Link href="/#contact" className="text-[var(--brass)] underline decoration-[var(--brass)]/30 underline-offset-4 transition-colors hover:decoration-[var(--brass)] font-medium">
              Get in touch
            </Link>
            .
          </p>
        </div>
      </section>
      
      <Footer />
    </motion.main>
  );
}

"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useReducedMotion,
  useMotionTemplate,
  AnimatePresence,
  useInView
} from "framer-motion";
import RevealText from '../components/RevealText';
import Link from "next/link";
import Image from "next/image";
import {
  FileCheck2, Landmark, PackageCheck, ShieldCheck, HeadphonesIcon, Search,
  ClipboardList, Globe, Compass, TrendingUp, Target, Workflow, FileText,
  Building2, Scale, Receipt, Settings, LayoutGrid, CheckCircle2, ChevronLeft, ChevronRight
} from "lucide-react";
import Footer from "../components/Footer";
import ScrollLine from "../../components/ScrollLine";

// Colors for background morphing
const COLOR_PAPER = "#F5F5F3";
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

const BulletList = ({ items }: { items: string[] }) => (
  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
    {items.map((pt, i) => (
      <li
        key={i}
        className="flex items-start gap-3 text-slate-700 leading-relaxed text-sm sm:text-base font-medium bg-slate-50/80 p-3.5 rounded-xl border border-slate-200/60 hover:border-[#1f3d63]/30 transition-colors"
      >
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#1f3d63]" />
        <span>{pt}</span>
      </li>
    ))}
  </ul>
);

const REGISTRY = [
  {
    id: "01", 
    title: "SEZ Management & Operational Services", 
    icon: ClipboardList,
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
    image: "/images/corporate_boardroom.jpg",
  },
  {
    id: "02", 
    title: "SEZ Online Services", 
    icon: Globe,
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
    id: "03", 
    title: "DCR/Planning Services", 
    icon: Compass,
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
    image: "/images/blueprints.jpg",
  },
  {
    id: "04", 
    title: "Business Advisory", 
    icon: TrendingUp,
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
    image: "/images/office_handshake.jpg",
  },
  {
    id: "05", 
    title: "Business Consulting", 
    icon: Target,
    teaser: "B2B market research and customized India expansion strategies.",
    content: (
      <BulletList items={[
        "Market structure and size assessment",
        "Growth rate (historical and projected)",
        "Available product/service offerings",
        "Key customers and customer segmentation",
        "Market trends — drivers and challenges",
        "Regulatory and tax aspects",
        "Competition mapping"
      ]} />
    ),
    image: "/images/corporate.jpg",
  },
  {
    id: "06", 
    title: "Process Consulting", 
    icon: Workflow,
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
    image: "/images/futuristic_architecture.jpg",
  },
  {
    id: "07", 
    title: "Business Plan Services", 
    icon: FileText,
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
    id: "08", 
    title: "Business Setup in India", 
    icon: Building2,
    teaser: "Company incorporation and strategy for Indian market entry.",
    content: (
      <BulletList items={[
        "Entry Strategy",
        "Growth Strategy",
        "Diversification Strategy",
        "Incorporation of Companies",
        "Relevant licenses and certificates required"
      ]} />
    ),
    image: "/images/clean_aerial_port.jpg",
  },
  {
    id: "09", 
    title: "Tax & Regulatory Compliance", 
    icon: Scale,
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
    image: "/images/sez_port_aerial.jpg",
  },
  {
    id: "10", 
    title: "Audit & Assurance", 
    icon: ShieldCheck,
    teaser: "Statutory, internal, management, SOX, and due diligence audits.",
    content: (
      <BulletList items={[
        "Statutory Audit",
        "Internal Audit",
        "Management Audit",
        "SOX Audit & SEBI LODR Regulations",
        "Due Diligence Audit"
      ]} />
    ),
    image: "/images/corporate_boardroom.jpg",
  },
  {
    id: "11", 
    title: "GST Services", 
    icon: Receipt,
    teaser: "End-to-end GST registration, compliance, returns, and refunds.",
    content: (
      <BulletList items={[
        "GST Registration",
        "GST Consultancy",
        "GST Refund",
        "GST Return",
        "GST Compliances",
        "GST Audit"
      ]} />
    ),
    image: "/images/interior.jpg",
  },
  {
    id: "12", 
    title: "Maintain My Business", 
    icon: Settings,
    teaser: "Routine registrations and licenses for continuous compliance.",
    content: (
      <BulletList items={[
        "Business License / Registration",
        "ESI Registration",
        "EPF Registration",
        "FCRA Registration",
        "MSME Registration",
        "Food Business License"
      ]} />
    ),
    image: "/images/network.jpg",
  },
  {
    id: "13", 
    title: "Other Services", 
    icon: LayoutGrid,
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
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
      }}
      className={`group relative flex flex-col justify-between p-8 rounded-2xl bg-[var(--paper)] border border-[var(--line)] shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden ${
        service.size === "large" ? "md:col-span-2 lg:col-span-2" : "col-span-1"
      }`}
    >
      {service.image && (
        <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none">
          <Image src={service.image} alt={service.title} fill className="object-cover scale-105 group-hover:scale-100 transition-transform duration-1000" />
        </div>
      )}

      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 border border-slate-200 text-[#1f3d63] group-hover:bg-[#1f3d63] group-hover:text-white transition-colors duration-500 shadow-sm">
            <service.icon strokeWidth={1.5} className="w-6 h-6" />
          </div>
          <span className="font-mono text-xs font-semibold text-[#1f3d63]/70 uppercase tracking-widest">
            0{index + 1}
          </span>
        </div>
        
        <h3 className="mt-6 font-display text-2xl font-light text-[var(--ivory)] group-hover:text-[#1f3d63] transition-colors duration-300">
          {service.title}
        </h3>
        
        <p className="mt-3 text-sm leading-relaxed text-[var(--ivory-dim)] line-clamp-3">
          {service.desc}
        </p>
      </div>

      <div className="relative z-10 mt-6 pt-4 border-t border-[var(--line)] flex items-center justify-between">
        {service.link ? (
          <Link href={service.link} className="text-xs font-semibold uppercase tracking-widest text-[#1f3d63] hover:text-[#2c5488] transition-colors before:absolute before:inset-0 focus-visible:outline-none">
            Learn more →
          </Link>
        ) : (
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
            Full Service Scope
          </span>
        )}
      </div>
    </motion.div>
  );
}

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

/* -------------------------------------------------------------------------- */
/*             2. INTERACTIVE SERVICE REGISTRY (ALL 13 UPFRONT)                */
/* -------------------------------------------------------------------------- */

function InteractiveServiceRegistry({ shouldReduceMotion }: { shouldReduceMotion: boolean }) {
  const [selectedId, setSelectedId] = useState("01");
  const showcaseRef = useRef<HTMLDivElement>(null);

  const activeService = useMemo(() => {
    return REGISTRY.find((r) => r.id === selectedId) || REGISTRY[0];
  }, [selectedId]);

  const activeIndex = useMemo(() => {
    return REGISTRY.findIndex((r) => r.id === selectedId);
  }, [selectedId]);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    if (showcaseRef.current) {
      const top = showcaseRef.current.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    const prevIndex = (activeIndex - 1 + REGISTRY.length) % REGISTRY.length;
    setSelectedId(REGISTRY[prevIndex].id);
  };

  const handleNext = () => {
    const nextIndex = (activeIndex + 1) % REGISTRY.length;
    setSelectedId(REGISTRY[nextIndex].id);
  };

  return (
    <section className="relative border-t border-[var(--line)] bg-[#f6f5f2] py-20 md:py-28 overflow-hidden z-10">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="eyebrow mb-3 !text-[#1f3d63] !font-bold tracking-widest text-xs">
            Complete Service Registry · 13 Specializations
          </p>
          <h2 className="font-display text-[clamp(2rem,3.8vw,3.2rem)] font-light leading-[1.1] tracking-tight text-slate-900">
            Explore All Areas of Expertise
          </h2>
          <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed">
            Click on any expertise domain below to instantly view its detailed scope of work, compliance mandates, and deliverables.
          </p>
        </div>

        {/* 1. TOP OVERVIEW GRID (ALL 13 HEADINGS VISIBLE DIRECTLY AT TOP) */}
        <div className="mb-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5 sm:gap-3">
            {REGISTRY.map((service) => {
              const isActive = service.id === selectedId;
              const Icon = service.icon;
              return (
                <button
                  key={service.id}
                  onClick={() => handleSelect(service.id)}
                  className={`group relative flex flex-col items-start p-3 sm:p-4 rounded-xl text-left transition-all duration-300 border cursor-pointer ${
                    isActive
                      ? "bg-[#1f3d63] text-white border-[#1f3d63] shadow-lg scale-[1.02] ring-2 ring-[#2c5488]/40"
                      : "bg-white text-slate-800 border-black/10 hover:border-[#1f3d63]/40 hover:bg-[#fafafa] shadow-sm hover:shadow"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <span
                      className={`font-mono text-[0.65rem] font-bold px-1.5 py-0.5 rounded ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                      }`}
                    >
                      {service.id}
                    </span>
                    <Icon
                      strokeWidth={1.75}
                      className={`w-4 h-4 ${
                        isActive ? "text-amber-300" : "text-[#1f3d63] group-hover:scale-110 transition-transform"
                      }`}
                    />
                  </div>
                  <h4
                    className={`font-display text-xs sm:text-[0.82rem] font-semibold leading-snug line-clamp-2 ${
                      isActive ? "text-white" : "text-slate-900 group-hover:text-[#1f3d63]"
                    }`}
                  >
                    {service.title}
                  </h4>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. ACTIVE SERVICE SHOWCASE STAGE */}
        <div ref={showcaseRef} className="scroll-mt-28">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="relative bg-white border border-black/10 rounded-2xl md:rounded-3xl shadow-xl overflow-hidden p-6 sm:p-8 md:p-12"
            >
              {/* Circular Sampoorna Verified Stamp */}
              <div className="absolute top-4 right-4 md:top-8 md:right-8 pointer-events-none z-20">
                <svg
                  viewBox="0 0 120 120"
                  className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 text-[#1f3d63] drop-shadow-md"
                >
                  <circle cx="60" cy="60" r="54" stroke="currentColor" strokeWidth="2" fill="#ffffff" />
                  <circle cx="60" cy="60" r="48" stroke="currentColor" strokeWidth="1" fill="none" strokeDasharray="4 2" />
                  <circle cx="60" cy="60" r="32" stroke="currentColor" strokeWidth="1" fill="none" />
                  <text x="60" y="72" textAnchor="middle" className="font-display" fontSize="40" fill="currentColor" fontWeight="300">S</text>
                  <defs>
                    <path id="topCurve-active" d="M 26,60 A 34,34 0 0,1 94,60" />
                    <path id="bottomCurve-active" d="M 94,60 A 34,34 0 0,1 26,60" />
                  </defs>
                  <text fontSize="10" fill="currentColor" fontWeight="700" letterSpacing="0.12em" className="font-mono">
                    <textPath href="#topCurve-active" startOffset="50%" textAnchor="middle">VERIFIED</textPath>
                  </text>
                  <text fontSize="10" fill="currentColor" fontWeight="700" letterSpacing="0.12em" className="font-mono">
                    <textPath href="#bottomCurve-active" startOffset="50%" textAnchor="middle">SAMPOORNA</textPath>
                  </text>
                  <circle cx="26" cy="60" r="2" fill="currentColor" />
                  <circle cx="94" cy="60" r="2" fill="currentColor" />
                </svg>
              </div>

              {/* Banner Image */}
              {activeService.image && (
                <div className="relative w-full h-56 sm:h-72 md:h-80 mb-8 md:mb-10 rounded-xl md:rounded-2xl overflow-hidden shadow-md border border-black/10">
                  <Image
                    src={activeService.image}
                    alt={activeService.title}
                    fill
                    priority
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-white z-10">
                    <span className="font-mono text-xs uppercase tracking-widest bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/30 font-semibold">
                      Specialization {activeService.id}
                    </span>
                  </div>
                </div>
              )}

              {/* Title & Scope */}
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#1f3d63]">
                  ENTRY {activeService.id} OF {REGISTRY.length}
                </span>
                <span className="h-1 w-1 rounded-full bg-slate-300" />
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Full Compliance Checklist
                </span>
              </div>

              <h3 className="font-display text-[clamp(1.8rem,3vw,2.8rem)] font-light text-slate-900 mb-3 leading-tight">
                {activeService.title}
              </h3>

              <p className="text-base sm:text-lg text-slate-600 mb-8 max-w-3xl leading-relaxed">
                {activeService.teaser}
              </p>

              {/* Bullet points checklist */}
              <div className="border-t border-black/10 pt-6">
                <h5 className="font-mono text-xs font-bold uppercase tracking-widest text-[#1f3d63] mb-4">
                  Scope of Services &amp; Key Deliverables
                </h5>
                {activeService.content}
              </div>

              {/* Bottom Control Bar */}
              <div className="mt-10 pt-6 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrev}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-300 bg-slate-50 text-slate-800 text-xs font-semibold hover:bg-slate-100 hover:border-slate-400 transition-colors shadow-sm cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" /> Previous
                  </button>
                  <button
                    onClick={handleNext}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-slate-300 bg-slate-50 text-slate-800 text-xs font-semibold hover:bg-slate-100 hover:border-slate-400 transition-colors shadow-sm cursor-pointer"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  {REGISTRY.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => handleSelect(r.id)}
                      aria-label={`Go to service ${r.id}`}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        r.id === selectedId ? "w-6 bg-[#1f3d63]" : "w-2 bg-slate-300 hover:bg-slate-400"
                      }`}
                    />
                  ))}
                </div>

                <Link
                  href="/#contact"
                  className="text-xs font-semibold uppercase tracking-widest text-[#1f3d63] hover:text-[#2c5488] transition-colors underline decoration-[#1f3d63]/30 underline-offset-4"
                >
                  Consult on this service →
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                        3. DEVANAGARI DOT-MATRIX                            */
/* -------------------------------------------------------------------------- */

const GRID_COLS = 60;
const GRID_ROWS = 20;

function useDevanagariGrid(text: string, cols: number, rows: number) {
  const [grid, setGrid] = useState<boolean[][] | null>(null);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const SS = 16;
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
          row.push(hits / total > 0.18);
        }
        g.push(row);
      }
      setGrid(g);
    };

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
        
        {/* OUTLINE LAYER */}
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

        {/* FILLED LAYER */}
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

/* -------------------------------------------------------------------------- */
/*                               MAIN COMPONENT                               */
/* -------------------------------------------------------------------------- */

export default function ExpertiseClient() {
  const shouldReduceMotion = useReducedMotion();
  const pageRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"]
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.05, 0.9, 1],
    [COLOR_PAPER, COLOR_PAPER, COLOR_PAPER, COLOR_INK]
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
      
      {/* ---------------- INTRO & CORE SERVICES WRAPPER (SCROLL LINE STARTS UNDER HEADER IMAGE) ---------------- */}
      <section className="relative overflow-hidden z-20">
        {/* line overlay — starts immediately below the header image and flows gracefully */}
        <ScrollLine
          viewBox="0 0 1440 1600"
          path="M -40 30 C 350 -10, 800 240, 500 700 C 240 1100, 1050 1400, 1540 1300"
          strokeWidth={22}
          className="hidden md:block -z-0 opacity-80"
        />

        {/* ---------------- INTRO ---------------- */}
        <div className="relative z-10 mx-auto max-w-[1400px] px-6 pt-16 pb-10 md:pt-24 md:pb-16 md:px-10">
          <p className="max-w-4xl text-[clamp(1.1rem,1.8vw,1.4rem)] leading-[1.6] text-ivory text-balance">
            Most companies engage a different specialist for every stage of an SEZ&apos;s life — one firm for approvals, another for customs, another for tax, another for GST. Sampoorna consolidates all of it onto a single desk. Our expertise spans the full lifecycle of an SEZ business: from the first approval application through material clearance, ongoing compliance, GST, audit, and the broader business advisory work that supports growth once you&apos;re operational.
          </p>
          <p className="mt-6 max-w-4xl text-[clamp(1.1rem,1.8vw,1.4rem)] leading-[1.6] text-ivory text-balance">
            Below is the full breadth of what we handle — start with the six areas clients engage us for most, or browse the complete service registry for the full list.
          </p>
        </div>

        {/* ---------------- CORE SERVICES (DYNAMIC BENTO GRID) ---------------- */}
        <div className="relative z-10 mx-auto max-w-[1400px] px-6 pb-20 md:pb-28 md:px-10">
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

      {/* ---------------- INTERACTIVE SERVICE REGISTRY (ALL 13 SHOWN UPFRONT & CLICKABLE) ---------------- */}
      <InteractiveServiceRegistry shouldReduceMotion={shouldReduceMotion!} />

      {/* ---------------- DOT-MATRIX HOVER MORPH ---------------- */}
      <DotMatrixMorph shouldReduceMotion={shouldReduceMotion!} />

      {/* ---------------- SAMPOORNA SIGNATURE REVEAL ---------------- */}
      <SampoornaSignatureReveal shouldReduceMotion={shouldReduceMotion!} />

      {/* ---------------- CLOSING CTA ---------------- */}
      <section className="border-t border-[var(--line)] py-20 md:py-24 z-10 bg-white">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10">
          <p className="max-w-4xl text-lg leading-relaxed text-slate-800">
            For the SEZ and unit approval process specifically, see our{" "}
            <Link href="/sez-approval-services" className="text-[#1f3d63] underline decoration-[#1f3d63]/30 underline-offset-4 transition-colors hover:decoration-[#1f3d63] font-semibold">
              SEZ Approval Services
            </Link>{" "}
            page. For setting up in an International Financial Services Centre, see{" "}
            <Link href="/ifsc" className="text-[#1f3d63] underline decoration-[#1f3d63]/30 underline-offset-4 transition-colors hover:decoration-[#1f3d63] font-semibold">
              IFSC Services
            </Link>
            . Ready to talk through your requirements?{" "}
            <Link href="/#contact" className="text-[#1f3d63] underline decoration-[#1f3d63]/30 underline-offset-4 transition-colors hover:decoration-[#1f3d63] font-semibold">
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

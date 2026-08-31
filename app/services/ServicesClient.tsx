"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Factory, Settings, BarChart, Laptop, BookOpen, Database } from "lucide-react";
import Reveal from "../components/Reveal";
import LoadLine from "../components/LoadLine";
import ScrollLine from "../../components/ScrollLine";
import { ShimmerHeading } from "../components/ShimmerHeading";
import { CountUp } from "../components/CountUp";

const SERVICES = [
  {
    id: "developers",
    icon: Factory,
    title: "For Developers",
    tagline: "Building the zone, from application to notification.",
    content: "End-to-end support for SEZ Developers — from Project Report preparation through In-Principle and Formal Approvals, Notification, and ongoing area demarcation and sector changes as your project evolves.",
    features: [
      "Preparation of application & Project Report",
      "In-Principle & Formal Approvals",
      "Extension of In-principle / Formal approval",
      "Notification of SEZ",
      "Demarcation into Processing & Non-processing area",
      "Increase/Decrease in notified area",
      "Change of sector",
      "Approval of authorized operations",
      "List of goods & services approval"
    ],
    cta: "Contact us for SEZ setup →",
    link: "/contact",
    image: "/images/clean_aerial_port.jpg"
  },
  {
    id: "codevelopers",
    icon: Settings,
    title: "For Co-Developers",
    tagline: "Partnering on the zone, with full BOA approval.",
    content: "Approval support for Co-Developers joining an existing SEZ project — Board of Approval sign-off, authorized operations approval, and goods/services list approval.",
    features: [
      "Approval for co-developer from BOA",
      "Approval of Authorized operations",
      "List of goods and list of services approval"
    ],
    cta: "Contact us for Co-Developer setup →",
    link: "/contact",
    image: "/images/office_handshake.jpg"
  },
  {
    id: "units",
    icon: BarChart,
    title: "For SEZ Units",
    tagline: "Getting your unit operational, and keeping it compliant.",
    content: "Unit-level approval support — application and project report preparation, Approval Committee sign-off, Bond-cum-Legal Undertaking, and ongoing LOA amendments as you scale.",
    features: [
      "Preparation of application for unit approval with project report",
      "Approval for SEZ unit from Approval Committee",
      "Approval for Bond-cum-Legal Undertaking",
      "Approval of list of services required for Authorized operations. In case of construction of factory building, approval of list of goods required",
      "Approvals for amendment to LOA relating to capacity enhancement, Broad banding of item of manufacture, change of name / implementing agency etc."
    ],
    cta: "Contact us for SEZ Unit setup →",
    link: "/contact",
    image: "/images/registry/services-hub-01.jpg"
  },
  {
    id: "expertise",
    icon: Laptop,
    title: "Our Expertise",
    tagline: "One desk, every stage of your SEZ business.",
    content: "From day-to-day SEZ operations and customs clearance through business advisory, tax compliance, GST, and audit — the complete range of services your business needs beyond initial approval.",
    cta: "Explore Our Full Expertise →",
    link: "/our-expertise",
    image: "/images/corporate_boardroom.jpg"
  },
  {
    id: "ifsc",
    icon: BookOpen,
    title: "IFSC Services",
    tagline: "Setting up in India's International Financial Services Centres.",
    content: "Support for setting up units in an IFSC under section 18(1) of the SEZ Act, 2005 — including guidance on the fiscal incentives available under the SEZ Act, SEBI Guidelines, and IRDAI (IFSC) Guidelines.",
    cta: "See IFSC Details →",
    link: "/ifsc",
    image: "/images/futuristic_architecture.jpg"
  },
  {
    id: "other",
    icon: Database,
    title: "Other Services",
    tagline: "The details that keep an SEZ unit running smoothly.",
    content: "Import/local procurement consultancy, customs department liaison, C&F agent services, statutory register maintenance, periodic returns to the Development Commissioner, and on-site help desk support.",
    cta: "See All Services →",
    link: "/our-expertise",
    image: "/images/blueprints.jpg"
  }
];

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence } from "framer-motion";

function ServiceRow({ service, index, shouldReduceMotion }: { service: any, index: number, shouldReduceMotion: boolean }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isEven = index % 2 === 0;
  const Icon = service.icon;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 60, rotateY: shouldReduceMotion ? 0 : (isEven ? -8 : 8) }}
      whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
      className={`flex flex-col gap-12 md:gap-20 items-center ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Image Side */}
      <div className="w-full md:w-1/2 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-[var(--ink)]">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover transition-transform duration-1000 hover:scale-105"
        />
      </div>

      {/* Text Side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center">
        <div className="w-14 h-14 rounded-full border border-[var(--line)] bg-white/5 flex items-center justify-center text-[var(--brass)] mb-8 shadow-sm">
          <Icon size={24} strokeWidth={1.5} />
        </div>
        
        <h3 className="font-display text-4xl md:text-5xl text-[var(--ink)] !text-[var(--ivory)] mb-4">
          {service.title}
        </h3>
        <p className="text-xl md:text-2xl text-[var(--brass-2)] font-light mb-6">
          {service.tagline}
        </p>
        <p className="text-lg text-[var(--ivory-dim)] leading-relaxed font-light mb-10">
          {service.content}
        </p>
        
        {service.features && (
          <div className="mb-8 w-full border border-[var(--line)] rounded-xl overflow-hidden bg-[var(--ink-2)]/30 backdrop-blur-sm">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full px-6 py-4 flex items-center justify-between text-[var(--ivory)] hover:bg-white/5 transition-colors"
            >
              <span className="font-medium text-lg">Detailed Process</span>
              <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                <ChevronDown className="text-[var(--brass)] w-5 h-5" />
              </motion.div>
            </button>
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <ul className="px-6 pb-6 pt-2 space-y-3">
                    {service.features.map((feature: string, idx: number) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="flex items-start gap-3 text-[var(--ivory-dim)]"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--brass)] mt-2 shrink-0 shadow-[0_0_8px_var(--brass)]" />
                        <span className="leading-relaxed">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        <LoadLine className="mb-10" />
        
        <a href={service.link} className="btn-ghost self-start">
          {service.cta}
        </a>
      </div>
    </motion.div>
  );
}

export default function ServicesClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.6, 1],
    ["var(--paper)", "var(--ink-2)", "var(--ink)"]
  );

  return (
    <motion.div ref={containerRef} style={{ backgroundColor }} className="transition-colors duration-1000 relative">
      
      {/* Background ScrollLine spanning the entire page */}
      <ScrollLine 
        viewBox="0 0 1440 4000"
        path="M -100 200 C 400 400, 1200 800, 900 1400 S 100 2000, 500 2700 S 1300 3400, 700 3900"
        strokeWidth={20}
        className="z-0 opacity-30 pointer-events-none"
      />

      {/* 1. HERO */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-20 overflow-hidden">
        {/* Abstract Background Image */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <Image
            src="/images/services/hero-services-bg.jpg"
            alt="Services background"
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-10 text-center flex flex-col items-center">
          <ShimmerHeading text="Our Services" />
          <Reveal as="h2" delay={150} className="mt-8 font-display text-2xl md:text-4xl text-[var(--brass)] max-w-2xl text-balance">
            Every stage of your SEZ journey, handled by one desk.
          </Reveal>
          
          <div className="mt-8 max-w-3xl text-lg md:text-xl text-[var(--ivory-dim)] leading-relaxed font-light flex flex-wrap justify-center gap-x-1.5">
            {"From establishing a Special Economic Zone to setting up an IFSC unit and staying compliant year after year — explore how Sampoorna supports Developers, Co-Developers, and SEZ Units at every stage.".split(" ").map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 + 0.3 }}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* 2. SIX SERVICE CATEGORIES */}
      <section className="py-12 md:py-24">
        <div className="mx-auto max-w-[1400px] px-6 md:px-10 flex flex-col gap-24 md:gap-40">
          {SERVICES.map((service, index) => (
            <ServiceRow 
              key={service.id} 
              service={service} 
              index={index} 
              shouldReduceMotion={shouldReduceMotion} 
            />
          ))}
        </div>
      </section>

      {/* 3. STATS STRIP */}
      <section className="py-24 md:py-32 relative z-10">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 border-y border-[var(--line)] py-16">
            <div className="flex flex-col items-center text-center">
              <CountUp to={5} className="font-display text-6xl text-[var(--brass)] mb-4" />
              <p className="text-sm uppercase tracking-widest text-[var(--ivory-dim)]">SEZ Zones Worked</p>
            </div>
            <div className="flex flex-col items-center text-center md:border-x border-[var(--line)] px-4">
              <CountUp to={13} className="font-display text-6xl text-[var(--brass)] mb-4" />
              <p className="text-sm uppercase tracking-widest text-[var(--ivory-dim)]">Service Categories</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <CountUp to={3} className="font-display text-6xl text-[var(--brass)] mb-4" />
              <p className="text-sm uppercase tracking-widest text-[var(--ivory-dim)]">Approval Tracks</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CLOSING CTA */}
      <section className="py-24 md:py-32 flex flex-col items-center text-center px-6">
        <ShimmerHeading text="Ready to talk through your SEZ requirements?" />
        
        <div className="w-full max-w-md mx-auto mt-16 mb-12">
          <LoadLine />
        </div>
        
        <a href="/contact" className="btn-primary text-lg px-8 py-4">
          Get in touch
        </a>
      </section>

    </motion.div>
  );
}

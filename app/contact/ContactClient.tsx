"use client";

import { motion, useReducedMotion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";
import { MapPin, Mail, Phone } from "lucide-react";
import Reveal from "../components/Reveal";

function BackgroundWord() {
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 40, damping: 20 });
  const sy = useSpring(y, { stiffness: 40, damping: 20 });

  useEffect(() => {
    if (shouldReduceMotion) return;
    const handle = (e: MouseEvent) => {
      x.set((e.clientX / window.innerWidth - 0.5) * 40);
      y.set((e.clientY / window.innerHeight - 0.5) * 40);
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, [x, y, shouldReduceMotion]);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center select-none overflow-hidden">
      <motion.span
        style={shouldReduceMotion ? {} : { x: sx, y: sy }}
        className="text-[25vw] font-bold leading-none text-[#1a1a1a]/[0.08] whitespace-nowrap"
      >
        संपूर्ण
      </motion.span>
    </div>
  );
}

export default function ContactClient() {
  return (
    <section className="relative pt-40 pb-20 px-6 md:px-10 min-h-screen flex flex-col justify-center overflow-hidden">
      
      {/* Huge Faint Background Text (Parallax) */}
      <BackgroundWord />

      <div className="relative z-10 max-w-[1200px] mx-auto w-full text-neutral-900">
        
        {/* Top Heading */}
        <div className="text-center mb-24">
          <Reveal as="h1" className="font-display text-[clamp(3rem,6vw,5.5rem)] leading-none font-light mb-6 text-neutral-900">
            Let's build <span className="text-[var(--brass-2)] italic">together.</span>
          </Reveal>
          <Reveal delay={150} className="text-lg text-neutral-800 max-w-2xl mx-auto leading-relaxed">
            Whether you're exploring SEZ development, IFSC strategies, or navigating complex customs compliance, our team of ex-government experts is ready to assist.
          </Reveal>
        </div>

        {/* Contact Info Row */}
        <Reveal delay={300} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 divide-y md:divide-y-0 md:divide-x divide-neutral-200">
          
          {/* Location */}
          <div className="flex flex-col items-center justify-center p-8 text-center group">
            <div className="w-16 h-16 rounded-full border border-neutral-300 bg-neutral-100 flex items-center justify-center mb-6 text-neutral-900 group-hover:text-[var(--brass)] group-hover:border-[var(--brass)] transition-all duration-300 shadow-sm">
              <MapPin size={28} strokeWidth={1.5} />
            </div>
            <p className="text-neutral-900 text-lg font-light tracking-wide">
              Mumbai, India
            </p>
          </div>

          {/* Email */}
          <div className="flex flex-col items-center justify-center p-8 text-center group">
            <div className="w-16 h-16 rounded-full border border-neutral-300 bg-neutral-100 flex items-center justify-center mb-6 text-neutral-900 group-hover:text-[var(--brass)] group-hover:border-[var(--brass)] transition-all duration-300 shadow-sm">
              <Mail size={28} strokeWidth={1.5} />
            </div>
            <a href="mailto:info@sampoornasez.com" className="text-neutral-900 text-lg font-light tracking-wide hover:text-[var(--brass-2)] transition-colors">
              info@sampoornasez.com
            </a>
          </div>

          {/* Phone */}
          <div className="flex flex-col items-center justify-center p-8 text-center group">
            <div className="w-16 h-16 rounded-full border border-neutral-300 bg-neutral-100 flex items-center justify-center mb-6 text-neutral-900 group-hover:text-[var(--brass)] group-hover:border-[var(--brass)] transition-all duration-300 shadow-sm">
              <Phone size={28} strokeWidth={1.5} />
            </div>
            <div className="flex flex-col items-center gap-1">
              <a href="tel:+919930466732" className="text-neutral-900 text-lg font-light tracking-wide hover:text-[var(--brass-2)] transition-colors">
                +91 9930 466 732
              </a>
              <a href="tel:+919820676806" className="text-neutral-900 text-lg font-light tracking-wide hover:text-[var(--brass-2)] transition-colors">
                +91 9820676 806
              </a>
            </div>
          </div>

        </Reveal>

        {/* Form Container */}
        <div className="max-w-3xl mx-auto">
          <Reveal delay={400} className="bg-[var(--ink-2)] p-8 md:p-14 rounded-[2.5rem] border border-[var(--line)] relative overflow-hidden shadow-2xl backdrop-blur-sm">
            {/* Glow line at top of form */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[var(--brass)] to-transparent opacity-50" />
            
            <form className="flex flex-col gap-10" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex flex-col gap-3">
                  <label className="text-xs uppercase tracking-widest text-[var(--ivory-dim)] font-semibold">Full Name</label>
                  <input type="text" className="bg-transparent border-b border-[var(--line)] pb-3 text-[var(--ivory)] outline-none focus:border-[var(--brass-2)] transition-colors font-light placeholder-[var(--ivory-dim)]/30 text-lg" placeholder="John Doe" />
                </div>
                
                <div className="flex flex-col gap-3">
                  <label className="text-xs uppercase tracking-widest text-[var(--ivory-dim)] font-semibold">Email Address</label>
                  <input type="email" className="bg-transparent border-b border-[var(--line)] pb-3 text-[var(--ivory)] outline-none focus:border-[var(--brass-2)] transition-colors font-light placeholder-[var(--ivory-dim)]/30 text-lg" placeholder="john@company.com" />
                </div>
              </div>
              
              <div className="flex flex-col gap-3">
                <label className="text-xs uppercase tracking-widest text-[var(--ivory-dim)] font-semibold">Message</label>
                <textarea rows={4} className="bg-transparent border-b border-[var(--line)] pb-3 text-[var(--ivory)] outline-none focus:border-[var(--brass-2)] transition-colors font-light resize-none placeholder-[var(--ivory-dim)]/30 text-lg" placeholder="How can we help you?" />
              </div>

              <div className="pt-4 flex justify-center">
                <button className="btn-primary text-lg px-10 py-4 w-full md:w-auto">
                  Send Message
                </button>
              </div>
            </form>
          </Reveal>
        </div>

      </div>
    </section>
  );
}

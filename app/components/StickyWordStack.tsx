"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, useTransform } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

function FourDotSpinner({ active }: { active: boolean }) {
  return (
    <div className={cn("grid grid-cols-2 gap-[3px] transition-opacity duration-300", active ? "opacity-40" : "opacity-0")}>
      <div className="w-[4px] h-[4px] bg-[#16181D] rounded-full" />
      <div className="w-[4px] h-[4px] bg-[#16181D] rounded-full" />
      <div className="w-[4px] h-[4px] bg-[#16181D] rounded-full" />
      <div className="w-[4px] h-[4px] bg-[#16181D] rounded-full" />
    </div>
  );
}

export interface WordStackItem {
  prefix: string;
  word: string;
}

interface StickyWordStackProps {
  label: string;
  items: WordStackItem[];
}

export default function StickyWordStack({ label, items }: StickyWordStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({ 
    target: containerRef, 
    offset: ["start start", "end end"] 
  });

  // Calculate ring stroke-dashoffset (0 to 1 maps to full ring)
  const ringOffset = useTransform(scrollYProgress, [0, 1], [251.2, 0]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let index = Math.floor(latest * items.length);
    if (index >= items.length) index = items.length - 1;
    if (index < 0) index = 0;
    setActiveIndex(index);
  });

  return (
    <div 
      ref={containerRef} 
      style={{ height: `${items.length * 65}vh` }} 
      className="relative bg-[#f2f2f0] w-full text-[#16181D]"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
        
        {/* Progress Ring - Top Left */}
        <div className="absolute top-10 left-6 md:left-10 w-16 h-16 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle cx="50" cy="50" r="40" stroke="rgba(22,24,29,0.1)" fill="none" strokeWidth="3" />
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              stroke="#16181D"
              fill="none"
              strokeWidth="3"
              strokeDasharray="251.2"
              style={{ strokeDashoffset: ringOffset }}
            />
            {/* Center dot */}
            <circle cx="50" cy="50" r="3" fill="#16181D" />
          </svg>
        </div>

        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10">
          <div className="flex flex-col gap-4">
            {items.map((item, i) => {
              const isActive = i === activeIndex;
              return (
                <div key={i} className="flex flex-col md:flex-row md:items-center w-full">
                  
                  {/* Left Side (Label, Dots, Prefix) */}
                  <div className="w-full md:w-[45%] flex items-end md:items-center justify-start md:justify-end mb-1 md:mb-0 pr-0 md:pr-16 relative">
                    <div 
                      className={cn(
                        "flex flex-col md:flex-row md:items-center w-full justify-start md:justify-between transition-opacity duration-300",
                        isActive ? "opacity-100" : "opacity-0 md:invisible hidden md:flex"
                      )}
                    >
                      <div className="flex items-center gap-4 sm:gap-8 mb-1 md:mb-0">
                        <p className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] opacity-50 whitespace-nowrap text-[#16181D]">
                          {label}
                        </p>
                        <div className="hidden md:block">
                          <FourDotSpinner active={isActive} />
                        </div>
                      </div>
                      
                      <h3 className="font-sans font-bold uppercase tracking-wider text-[clamp(1rem,1.5vw,1.5rem)] text-left md:text-right leading-tight text-[#16181D]">
                        {item.prefix}
                      </h3>
                    </div>
                  </div>

                  {/* Right Side (Stacked Word + Right Dots) */}
                  <div className="w-full md:w-[55%] flex items-center justify-between">
                    <h2 
                      className={cn(
                        "font-sans text-[clamp(3.5rem,8vw,6rem)] uppercase tracking-tighter leading-[1.1] transition-colors duration-300",
                        isActive ? "font-black text-[#16181D]" : "font-bold text-[#d4d4d2]"
                      )}
                    >
                      {item.word}
                    </h2>
                    
                    <div className={cn("transition-opacity duration-300 pl-4 hidden md:block", isActive ? "opacity-100" : "opacity-0 invisible")}>
                      <FourDotSpinner active={isActive} />
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

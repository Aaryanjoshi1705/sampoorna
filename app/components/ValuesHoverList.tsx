"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import LoadLine from "./LoadLine";

// Helper to parse 10x10 string grids into boolean arrays
const parseGrid = (str: string) => {
  return str
    .trim()
    .split("\n")
    .map((row) =>
      row
        .trim()
        .split(" ")
        .map((char) => char === "1")
    );
};

// 1. Expertise (Upward steps)
const iconExpertise = parseGrid(`
0 0 0 0 0 0 0 0 0 1
0 0 0 0 0 0 0 0 1 1
0 0 0 0 0 0 0 1 1 1
0 0 0 0 0 0 1 1 1 1
0 0 0 0 0 1 1 1 1 1
0 0 0 0 1 1 1 1 1 1
0 0 0 1 1 1 1 1 1 1
0 0 1 1 1 1 1 1 1 1
0 1 1 1 1 1 1 1 1 1
1 1 1 1 1 1 1 1 1 1
`);

// 2. Confidence (Bullseye/Target)
const iconConfidence = parseGrid(`
0 0 1 1 1 1 1 1 0 0
0 1 1 1 1 1 1 1 1 0
1 1 0 0 0 0 0 0 1 1
1 1 0 1 1 1 1 0 1 1
1 1 0 1 1 1 1 0 1 1
1 1 0 1 1 1 1 0 1 1
1 1 0 1 1 1 1 0 1 1
1 1 0 0 0 0 0 0 1 1
0 1 1 1 1 1 1 1 1 0
0 0 1 1 1 1 1 1 0 0
`);

// 3. Attitude (Plus)
const iconAttitude = parseGrid(`
0 0 0 0 1 1 0 0 0 0
0 0 0 0 1 1 0 0 0 0
0 0 0 0 1 1 0 0 0 0
0 0 0 0 1 1 0 0 0 0
1 1 1 1 1 1 1 1 1 1
1 1 1 1 1 1 1 1 1 1
0 0 0 0 1 1 0 0 0 0
0 0 0 0 1 1 0 0 0 0
0 0 0 0 1 1 0 0 0 0
0 0 0 0 1 1 0 0 0 0
`);

// 4. Integrity (Checkmark)
const iconIntegrity = parseGrid(`
0 0 0 0 0 0 0 0 0 1
0 0 0 0 0 0 0 0 1 1
0 0 0 0 0 0 0 1 1 0
0 0 0 0 0 0 1 1 0 0
1 1 0 0 0 1 1 0 0 0
0 1 1 0 1 1 0 0 0 0
0 0 1 1 1 0 0 0 0 0
0 0 0 1 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0
`);

// 5. Excellence (Star)
const iconExcellence = parseGrid(`
0 0 0 0 1 1 0 0 0 0
0 0 0 0 1 1 0 0 0 0
0 0 1 1 1 1 1 1 0 0
0 1 1 1 1 1 1 1 1 0
1 1 1 1 1 1 1 1 1 1
0 1 1 1 1 1 1 1 1 0
0 0 1 1 0 0 1 1 0 0
0 1 1 0 0 0 0 1 1 0
1 1 0 0 0 0 0 0 1 1
0 0 0 0 0 0 0 0 0 0
`);

const values = [
  {
    num: "01",
    name: "EXPERTISE",
    desc: "We give advice, it comes from experience. We pride ourselves on having the knowledge to help you succeed.",
    grid: iconExpertise,
  },
  {
    num: "02",
    name: "CONFIDENCE",
    desc: "Our confidence is backed by our expertise, so you can rest assured that you can rely on us.",
    grid: iconConfidence,
  },
  {
    num: "03",
    name: "ATTITUDE",
    desc: "We will bring a positive attitude that will facilitate success for our partners and our teams.",
    grid: iconAttitude,
  },
  {
    num: "04",
    name: "INTEGRITY",
    desc: "Integrity is at the heart of our business, embracing honesty, responsibility and accountability.",
    grid: iconIntegrity,
  },
  {
    num: "05",
    name: "EXCELLENCE",
    desc: "Excellence can only be achieved by delivering on our values and the only measure of this is the way our customers perceive us.",
    grid: iconExcellence,
  },
];

const DotMatrix = ({ grid, isActive, animationStyle = "top-down" }: { grid: boolean[][]; isActive: boolean; animationStyle?: "top-down" | "center-out" }) => {
  return (
    <div className="grid grid-cols-10 grid-rows-10 gap-1 w-[60px] h-[60px]">
      {grid.map((row, r) =>
        row.map((isOn, c) => {
          const delay = isActive && isOn
            ? animationStyle === "center-out"
              ? (Math.abs(r - 4.5) + Math.abs(c - 4.5)) * 0.04
              : (r * 10 + c) * 0.005
            : 0;

          return (
            <motion.div
              key={`${r}-${c}`}
              initial={false}
              animate={{
                opacity: isActive && isOn ? 1 : 0.08,
              }}
              transition={{
                duration: 0.2,
                delay,
                ease: "easeOut",
              }}
              className="w-1 h-1 rounded-sm bg-white"
            />
          );
        })
      )}
    </div>
  );
};

export default function ValuesHoverList() {
  const [activeRow, setActiveRow] = useState<number | null>(null);
  
  // Custom cursor logic
  const cursorX = useMotionValue(0);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 40 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    cursorX.set(e.clientX - rect.left);
  };

  return (
    <section className="bg-[#0a0a0a] text-white w-full py-24 md:py-32 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <h2 className="font-sans text-[clamp(2.5rem,4vw,4rem)] font-black uppercase tracking-tighter leading-none">
            WHAT WE<br />STAND FOR
          </h2>
          <p className="max-w-md font-sans text-lg font-light text-white/70 leading-relaxed">
            Our values aren’t just a list on the wall. They shape every decision we make, every conversation we have and every shipment we move.
          </p>
        </div>

        {/* Rows */}
        <div className="flex flex-col border-t border-white/10">
          {values.map((val, idx) => {
            const isActive = activeRow === idx;

            return (
              <div
                key={idx}
                onMouseEnter={() => setActiveRow(idx)}
                onMouseLeave={() => setActiveRow(null)}
                onMouseMove={handleMouseMove}
                onClick={() => setActiveRow(isActive ? null : idx)} // Mobile fallback
                className="group relative cursor-default overflow-hidden"
              >
                {/* Hover-triggered sweep line (divider) */}
                <div className="relative h-px w-full overflow-hidden">
                  {/* base faint line, always visible */}
                  <div className="absolute inset-0 bg-[var(--line)]" />
                  
                  {/* glow sweep */}
                  <div
                    className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-gradient-to-r from-transparent via-white/80 to-white transition-transform duration-700 ease-out group-hover:scale-x-100 motion-reduce:transition-opacity motion-reduce:duration-300 motion-reduce:scale-x-100 motion-reduce:opacity-0 motion-reduce:group-hover:opacity-100"
                    style={{ boxShadow: "0 0 8px rgba(255,255,255,0.6), 0 0 16px rgba(255,255,255,0.3)" }}
                  />
                </div>

                {/* Custom Ring Cursor (only visible when active) */}
                <motion.div
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/50 flex items-center justify-center pointer-events-none z-10 hidden lg:flex"
                  style={{ x: springX, opacity: isActive ? 1 : 0 }}
                  initial={false}
                  animate={{ scale: isActive ? 1 : 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-1 h-1 bg-white rounded-full" />
                </motion.div>

                {/* ========================================= */}
                {/* DESKTOP LAYOUT (>= 1024px)                */}
                {/* ========================================= */}
                <div className="hidden lg:grid grid-cols-[100px_minmax(350px,400px)_1fr_80px] items-center py-12 relative z-20">
                  {/* Col 1: Number */}
                  <div className="text-white/30 font-mono text-sm tracking-widest">
                    {val.num}
                  </div>

                  {/* Col 2: Name */}
                  <motion.h3
                    className="font-sans text-[3.5rem] uppercase tracking-tighter"
                    animate={{
                      color: isActive ? "#ffffff" : "rgba(255,255,255,0.3)",
                      fontWeight: isActive ? 900 : 400,
                    }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    {val.name}
                  </motion.h3>

                  {/* Col 3: Description */}
                  <div className="pr-12">
                    <motion.div
                      initial={false}
                      animate={{ opacity: isActive ? 1 : 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                      <p className="font-sans text-lg font-light text-white/80 leading-relaxed max-w-lg">
                        {val.desc}
                      </p>
                    </motion.div>
                  </div>

                  {/* Col 4: Icon */}
                  <div className="flex justify-end">
                    <DotMatrix grid={val.grid} isActive={isActive} animationStyle={val.name === "CONFIDENCE" ? "center-out" : "top-down"} />
                  </div>
                </div>

                {/* ========================================= */}
                {/* MOBILE / TABLET LAYOUT (< 1024px)         */}
                {/* ========================================= */}
                <div className="flex flex-row items-start lg:hidden py-8 md:py-10 relative z-20">
                  {/* Left: Number */}
                  <div className="w-12 md:w-24 flex-shrink-0 text-white/30 font-mono text-sm tracking-widest mt-2 md:mt-3">
                    {val.num}
                  </div>

                  {/* Center: Content (Name + Accordion Description) */}
                  <div className="flex-grow flex flex-col pr-4 md:pr-8">
                    <motion.h3
                      className="font-sans text-[clamp(1.75rem,6vw,3rem)] uppercase tracking-tighter"
                      animate={{
                        color: isActive ? "#ffffff" : "rgba(255,255,255,0.3)",
                        fontWeight: isActive ? 900 : 400,
                      }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                      {val.name}
                    </motion.h3>

                    {/* Accordion Description */}
                    <motion.div
                      className="w-full overflow-hidden"
                      initial={false}
                      animate={{ 
                        height: isActive ? "auto" : 0, 
                        opacity: isActive ? 1 : 0,
                        marginTop: isActive ? 12 : 0
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <p className="font-sans text-sm md:text-base font-light text-white/80 leading-relaxed pb-2">
                        {val.desc}
                      </p>
                    </motion.div>
                  </div>

                  {/* Right: Icon */}
                  <div className="flex-shrink-0 mt-1 md:mt-2">
                    <DotMatrix grid={val.grid} isActive={isActive} animationStyle={val.name === "CONFIDENCE" ? "center-out" : "top-down"} />
                  </div>
                </div>

                {/* Hover-triggered sweep line (divider) - BOTTOM for last row only */}
                {idx === values.length - 1 && (
                  <div className="relative h-px w-full overflow-hidden">
                    {/* base faint line, always visible */}
                    <div className="absolute inset-0 bg-[var(--line)]" />
                    
                    {/* glow sweep */}
                    <div
                      className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-gradient-to-r from-transparent via-white/80 to-white transition-transform duration-700 ease-out group-hover:scale-x-100 motion-reduce:transition-opacity motion-reduce:duration-300 motion-reduce:scale-x-100 motion-reduce:opacity-0 motion-reduce:group-hover:opacity-100"
                      style={{ boxShadow: "0 0 8px rgba(255,255,255,0.6), 0 0 16px rgba(255,255,255,0.3)" }}
                    />
                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

"use client";

import assetPath from "../utils/assetPath";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

// -------------------------------------------------------------
// Pinned Takeover (Mission & Vision) Component
// -------------------------------------------------------------

export default function VisionMissionReveal({ 
  visionText, 
  missionText 
}: { 
  visionText: string, 
  missionText: string 
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({ 
    target: containerRef, 
    offset: ["start start", "end end"] 
  });

  // ----------------------------------------------------
  // 1. VISION WIPE & POSITIONING
  // ----------------------------------------------------
  const visionWipePct = useTransform(scrollYProgress, [0, 0.35], [0, 100]);
  const visionWipeBackground = useTransform(
    visionWipePct,
    (val) => `linear-gradient(90deg, #ffffff 0%, #ffffff ${val}%, #5a6b78 ${val}%, #5a6b78 100%)`
  );

  // Starts perfectly centered. Moves up exactly 120px.
  const visionScale = useTransform(scrollYProgress, [0.35, 0.45], [1, 0.28]);
  const visionY = useTransform(scrollYProgress, [0.35, 0.45], ["-50%", "calc(-50% - 130px)"]); 
  const visionOpacity = useTransform(scrollYProgress, [0.35, 0.45], [1, 0.5]); 

  // ----------------------------------------------------
  // 2. DIVIDER
  // ----------------------------------------------------
  // Appears exactly between the two (-65px from center)
  const dividerScale = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]);
  const dividerOpacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 0.3]);

  // ----------------------------------------------------
  // 3. MISSION WIPE & POSITIONING
  // ----------------------------------------------------
  // Moves from below center to exactly centered
  const missionBlockOpacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]);
  const missionBlockY = useTransform(scrollYProgress, [0.35, 0.45], ["calc(-50% + 80px)", "-50%"]);

  const missionWipePct = useTransform(scrollYProgress, [0.45, 0.85], [0, 100]);
  const missionWipeBackground = useTransform(
    missionWipePct,
    (val) => `linear-gradient(90deg, #ffffff 0%, #ffffff ${val}%, #5a6b78 ${val}%, #5a6b78 100%)`
  );

  // ----------------------------------------------------
  // 4. RIGHT SIDE COPY (Stacked Shift)
  // ----------------------------------------------------
  // Instead of absolute crossfading, we stack them naturally and shift the container up
  const rightSideY = useTransform(scrollYProgress, [0.35, 0.45], [120, -120]);
  const visionRightOpacity = useTransform(scrollYProgress, [0.35, 0.45], [1, 0.3]); // Dims down to match label
  const missionRightOpacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]);

  // ----------------------------------------------------
  // 5. BACKGROUND CROSSFADE
  // ----------------------------------------------------
  const visionBgOpacity = useTransform(scrollYProgress, [0.35, 0.45], [0.4, 0]);
  const missionBgOpacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 0.4]);

  // ----------------------------------------------------
  // Progress Ring
  // ----------------------------------------------------
  const ringOffset = useTransform(scrollYProgress, [0, 1], [251.2, 0]);

  return (
    <div ref={containerRef} className="relative h-[250vh] bg-[#16181D] w-full text-white">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden">
        
        {/* Background Image 1 (Vision) */}
        <motion.div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/images/clean_aerial_port.jpg)", opacity: visionBgOpacity }}
        />
        
        {/* Background Image 2 (Mission) */}
        <motion.div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/images/office_handshake.jpg)", opacity: missionBgOpacity }}
        />
        
        <div className="absolute inset-0 bg-[#16181D]/80" />

        {/* Progress Ring - Top Left */}
        <div className="absolute top-10 left-6 md:left-10 w-16 h-16 z-10 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle cx="50" cy="50" r="40" stroke="rgba(255,255,255,0.1)" fill="none" strokeWidth="2" />
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              stroke="#fff"
              fill="none"
              strokeWidth="2"
              strokeDasharray="251.2"
              style={{ strokeDashoffset: ringOffset }}
            />
            <circle cx="50" cy="50" r="3" fill="#fff" />
          </svg>
        </div>

        <motion.div 
          className="relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-10 grid grid-cols-12 gap-8 lg:gap-16 items-center h-full max-h-[800px]"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          
          {/* Left Column (Headlines) */}
          <div className="col-span-12 md:col-span-6 relative h-[250px] md:h-[400px]">
              
            {/* SINGLE VISION BLOCK */}
            <motion.div 
              className="absolute left-0 w-full flex items-center gap-4 md:gap-6"
              style={{ top: "50%", y: visionY, opacity: visionOpacity }}
            >
              <p className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-white/50">OUR</p>
              
              {/* Isolate scale transform */}
              <motion.div style={{ scale: visionScale, transformOrigin: "left center" }}>
                <motion.h2 
                  className="font-sans text-[clamp(2.5rem,8vw,7rem)] font-black uppercase tracking-tighter leading-none"
                  style={{
                    backgroundImage: visionWipeBackground,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text"
                  }}
                >
                  VISION
                </motion.h2>
              </motion.div>
            </motion.div>

            {/* DIVIDER LINE */}
            <motion.div 
              className="absolute left-0 w-full h-[1px] bg-white origin-left"
              style={{ top: "50%", y: "-40px", scaleX: dividerScale, opacity: dividerOpacity }}
            />

            {/* MISSION BLOCK */}
            <motion.div
              className="absolute left-0 w-full flex items-center gap-4 md:gap-6"
              style={{ top: "50%", opacity: missionBlockOpacity, y: missionBlockY }}
            >
              <p className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-white/50">OUR</p>
              <motion.h2 
                className="font-sans text-[clamp(2.5rem,8vw,7rem)] font-black uppercase tracking-tighter leading-none"
                style={{
                  backgroundImage: missionWipeBackground,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text"
                }}
              >
                MISSION
              </motion.h2>
            </motion.div>

          </div>

          {/* Right Column (Body Copy) */}
          <div className="col-span-12 md:col-span-6 relative h-full flex flex-col justify-center mt-8 md:mt-0 pt-16 md:pt-0">
            
            <motion.div 
              className="flex flex-col gap-12 md:gap-24"
              style={{ y: rightSideY }}
            >
              {/* Vision Text */}
              <motion.div style={{ opacity: visionRightOpacity }}>
                <p className="font-sans text-[clamp(1.25rem,2vw,1.75rem)] font-light leading-relaxed text-white">
                  {visionText}
                </p>
              </motion.div>

              {/* Mission Text */}
              <motion.div style={{ opacity: missionRightOpacity }}>
                <p className="font-sans text-[clamp(1.25rem,2vw,1.75rem)] font-light leading-relaxed text-white">
                  {missionText}
                </p>
              </motion.div>
            </motion.div>

          </div>

        </motion.div>
      </div>
    </div>
  );
}

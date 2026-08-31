"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const TEAM = [
  { 
    name: "Sanjeev Nandwani", 
    role: "ITS (Retd.)", 
    image: "/images/sanjeev-nandwani.jpg", 
    note: "He is a former Civil Servant, and in a career spanning three decades as a member of the Indian Trade Service (1986 batch), he has worked, inter alia, as ED-CAPEXIL, Additional DGFT and Zonal Development Commissioner, SEZ’s for East and North-East India, Andhra Pradesh and Telangana under the Union Commerce Ministry. He took an early separation from the Government in 2016 after thirty years of service, and thereafter had a stint of three years as President of a Steel and Mining Company based out of Mumbai and Odisha. He then moved on to join Apparel Export Promotion Council (AEPC), under the Ministry of Textiles, as their Secretary General till October, 2020. He was a ‘Chevening Gurukul Scholar’ at the London School of Economics and a ‘Mason Fellow’ at the Harvard Kennedy School where he did his Master’s in Public Policy and Management. He is currently into Strategic Advisory in International Trade." 
  },
  { 
    name: "P.S Raman", 
    role: "Ex-Joint Development Commissioner, SEEPZ SEZ, Mumbai", 
    image: "/images/ps-raman.jpg", 
    note: "Has more than 30 years of working expertise in various capacities in the field of SEZs. Was a member of Sub-Committee constituted by Ministry of Commerce and Industry for drafting of procedures relating to SEZs and for drafting SEZ Rules/ Authority Rules/ simplification of procedures. Had worked with World Free Zones Organization, as its Regional Head for SAARC region, as a post-retirement assignment for 2 years. The World FZO provides a number of services to its members and partners. These services have been designed to support members in achieving their strategic objectives and enhancing operational performance, as well as bringing new insights and learnings around best practices." 
  },
  { 
    name: "I.Vikraman", 
    role: "IRS (Retd.) - Ex-Addl. Commissioner of Central Excise and Customs", 
    image: "/images/i-vikraman.jpg", 
    note: "Had worked in SEEPZ SEZ over 10 years including 5 years as Dy. Commissioner of Customs, SEEPZ, during which period authored two Manuals on procedures to be followed which were published as Public Notice giving the manuals authority of Law. Recipient of most prestigious award from the President of India for Specially Distinguished Record of Service on the occasion of the Republic Day 1997. Had worked as Asst. Director in Mumbai Zonal Unit of Directorate of Enforcement and had detected several FEMA cases. Post retirement, worked as Consultant for ESSAR Group for two and half years. Working in the capacity of Executive Director of SEEPZ Gem and Jewellery Manufacturers’ Association, looking after the Policy and Legal issues of more than 150 Gems & Jewelry Units in SEEPZ SEZ." 
  },
  {
    name: "Anand Golas",
    role: "LLB, CISA, FCA",
    image: "/images/anand-golas.png",
    note: "A senior partner in Devendra kumar and Associates which is one of the CAG empanelled auditors for major PSUs. He has several years of experience in SEZ compliances. Also an expert in corporate banking, Audit and Assurance Services Forensic, and various regulatory and tax compliances. He is expert in setting up new businesses in India."
  }
];

const CELL = 9;        // dot grid cell size in px
const DOT_MAX = 4.2;   // max dot radius

function DottedPortrait({ src, active }: { src: string; active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    img.onload = () => {
      const W = 360;
      const H = 480;
      canvas.width = W;
      canvas.height = H;

      const off = document.createElement("canvas");
      off.width = W;
      off.height = H;
      const octx = off.getContext("2d");
      if (!octx) return;

      const ir = img.width / img.height;
      const cr = W / H;
      let dw = W, dh = H, dx = 0, dy = 0;
      if (ir > cr) { dh = H; dw = H * ir; dx = (W - dw) / 2; }
      else { dw = W; dh = W / ir; dy = (H - dh) / 2; }
      octx.drawImage(img, dx, dy, dw, dh);

      const data = octx.getImageData(0, 0, W, H).data;

      ctx.clearRect(0, 0, W, H);
      for (let y = 0; y < H; y += CELL) {
        for (let x = 0; x < W; x += CELL) {
          const px = Math.min(x + (CELL >> 1), W - 1);
          const py = Math.min(y + (CELL >> 1), H - 1);
          const i = (py * W + px) * 4;
          const r = data[i], g = data[i + 1], b = data[i + 2];

          const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
          const radius = DOT_MAX * (0.45 + (1 - lum) * 0.55);

          ctx.beginPath();
          ctx.fillStyle = `rgb(${r},${g},${b})`;
          ctx.arc(x + CELL / 2, y + CELL / 2, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };
  }, [src]);

  return (
    <motion.canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      style={{ backgroundColor: "var(--ink-2)" }}
      initial={false}
      animate={{ opacity: active ? 0 : 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    />
  );
}

function TeamCard({ member, index, shouldReduceMotion }: any) {
  const [hovered, setHovered] = useState(false);
  const active = shouldReduceMotion || hovered;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group flex flex-col md:flex-row items-center gap-8 md:gap-16 lg:gap-24 py-12 md:py-20 border-b border-[var(--line)] cursor-pointer"
    >
      {/* Left side: Details */}
      <div className="w-full md:w-1/2 flex flex-col justify-center">
        <h3 className="font-display text-[clamp(2.5rem,4vw,4rem)] leading-none text-[var(--ink)] transition-colors duration-500 group-hover:text-[var(--brass)]">
          {member.name}
        </h3>
        <p className="mt-4 font-mono text-sm md:text-base uppercase tracking-widest text-[var(--brass-2)]">
          {member.role}
        </p>
        <div className="mt-8">
          <p className="text-lg md:text-xl text-[var(--ivory-dim)] max-w-md leading-relaxed transition-opacity duration-500">
            {member.note}
          </p>
        </div>
      </div>

      {/* Right side: Photo */}
      <div className="w-full md:w-1/2 lg:w-5/12 aspect-[3/4] relative overflow-hidden rounded-2xl bg-[var(--ink-2)] shadow-xl shrink-0">
        {/* Real photo — underneath, fades+zooms in on hover */}
        <motion.div
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 1.08 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 50vw"
          />
        </motion.div>

        {/* Dot-matrix layer on top (hover pe fade out) */}
        {!shouldReduceMotion && <DottedPortrait src={member.image} active={active} />}
      </div>
    </motion.div>
  );
}

export default function TeamClient() {
  const shouldReduceMotion = useReducedMotion();
  
  // Failsafe: Next.js Fast Refresh sometimes leaves the body locked if a Preloader is removed mid-animation
  useEffect(() => {
    document.body.style.overflow = "";
  }, []);

  return (
    <section className="pb-20 md:pb-28">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="flex flex-col">
          {TEAM.map((m, i) => (
            <TeamCard key={m.name} member={m} index={i} shouldReduceMotion={shouldReduceMotion} />
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { useReducedMotion } from "framer-motion";

const BLUE = "#3B4CF5"; // apna brand blue / --brass jo chahe

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.045 }, // har word ke beech gap
  },
};

// Har word: neeche se float in + blue se black me settle
const word = {
  hidden: { opacity: 0, y: 14, color: BLUE },
  visible: {
    opacity: 1,
    y: 0,
    color: ["#000000"], // final black
    transition: {
      opacity: { duration: 0.4, ease: "easeOut" },
      y: { duration: 0.4, ease: "easeOut" },
      // color thodi der baad settle ho — pehle blue dikhe phir black
      color: { duration: 0.5, delay: 0.35, ease: "easeInOut" },
    },
  },
};

export default function RevealText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <p className={`text-black ${className}`}>{text}</p>;
  }

  const words = text.split(" ");

  return (
    <motion.p
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          variants={word as any}
          style={{ display: "inline-block", marginRight: "0.28em" }}
        >
          {w}
        </motion.span>
      ))}
    </motion.p>
  );
}

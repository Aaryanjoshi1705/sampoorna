"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import { useLenis } from "lenis/react";
import * as THREE from "three";

/* ---------------------------------------------------------------
   "Duty-Free Passage" — a pinned, scroll-scrubbed journey:
   crane lifts a container -> through a Single-Window Clearance gate
   -> onto a cargo ship -> sails to the horizon.
   Progress (0..1) is driven by how far the tall section has scrolled;
   the 3D reads it every frame (ref-driven, no React churn).
---------------------------------------------------------------- */

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (t: number) => t * t * (3 - 2 * t); // smoothstep
// remap p from [a,b] -> [0,1] eased
const seg = (p: number, a: number, b: number) => smooth(clamp((p - a) / (b - a)));

function Rig({ progress }: { progress: React.MutableRefObject<number> }) {
  const container = useRef<THREE.Group>(null!);
  const truck = useRef<THREE.Group>(null!);
  const spreader = useRef<THREE.Group>(null!);
  const trolley = useRef<THREE.Mesh>(null!);
  const cable = useRef<THREE.Mesh>(null!);
  const ship = useRef<THREE.Group>(null!);
  const gateMat = useRef<THREE.MeshStandardMaterial>(null!);

  const STOP_X = -3.2;
  const X_GATE = 0;
  const X_SHIP = 3.4;
  const Y_TRUCKBED = 1.5;
  const Y_TRAVEL = 3.0;
  const Y_DECK = 1.7;
  const BEAM_Y = 5.0;

  useFrame(() => {
    const p = progress.current;

    // ---- choreography ----
    // truck drives in -> spreader lowers & attaches -> lifts off trailer ->
    // truck drives away -> traverse through gate -> lower onto ship -> sail
    const pDriveIn = seg(p, 0.0, 0.12);
    const pAttach = seg(p, 0.12, 0.22);
    const pLift = seg(p, 0.22, 0.4);
    const pDriveOut = seg(p, 0.3, 0.44);
    const pTraverse = seg(p, 0.44, 0.62);
    const pLower = seg(p, 0.62, 0.8);
    const pDetach = seg(p, 0.8, 0.9);
    const pSail = seg(p, 0.86, 1);

    // truck position
    let truckX = lerp(-9, STOP_X, pDriveIn);
    if (pDriveOut > 0) truckX = lerp(STOP_X, -9, pDriveOut);
    truck.current.position.x = truckX;

    // container: rides the trailer until it is lifted (p < 0.22), then flies
    let cx: number;
    let cy: number;
    if (p < 0.22) {
      cx = truckX;
      cy = Y_TRUCKBED;
    } else {
      cy = lerp(Y_TRUCKBED, Y_TRAVEL, pLift);
      cx = lerp(STOP_X, X_SHIP, pTraverse);
      if (pTraverse >= 1) cx = X_SHIP;
      if (pLower > 0) cy = lerp(Y_TRAVEL, Y_DECK, pLower);
    }

    const shipDx = pSail * 13;
    const finalX = cx + (pLower > 0.99 ? shipDx : 0);
    container.current.position.set(finalX, cy, 0);

    // spreader descends to attach, rides with the container, then lifts away
    const attach = seg(p, 0.12, 0.22);
    const attachedY = cy + 0.85;
    let sy = lerp(BEAM_Y - 0.5, attachedY, attach);
    sy = lerp(sy, BEAM_Y - 0.5, pDetach);
    const sx = p < 0.22 ? STOP_X : finalX;
    spreader.current.position.set(sx, sy, 0);
    trolley.current.position.x = sx;

    // hoist rope from trolley down to the spreader
    const len = Math.max(0.1, BEAM_Y - (sy + 0.2));
    cable.current.position.set(sx, sy + 0.2 + len / 2, 0);
    cable.current.scale.y = len;

    // ship bob + sail
    ship.current.position.x = X_SHIP + 0.6 + shipDx;
    ship.current.position.y = Math.sin(performance.now() * 0.0012) * 0.06;

    // gate glows as the container passes through
    const near = 1 - clamp(Math.abs(finalX - X_GATE) / 1.6);
    gateMat.current.emissiveIntensity = near * 1.4;

    // fade container out at the very end
    container.current.scale.setScalar(1 - seg(p, 0.97, 1));
  });

  return (
    <group position={[2.6, -0.6, 0]}>
      {/* ground / quay apron */}
      <mesh position={[-2, -0.1, 0]}>
        <boxGeometry args={[11, 0.2, 5]} />
        <meshStandardMaterial color="#dcdad4" roughness={0.95} metalness={0} />
      </mesh>
      {/* water */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[6, -0.02, 0]}>
        <planeGeometry args={[44, 28]} />
        <meshStandardMaterial color="#c3ccd4" roughness={0.6} metalness={0.1} />
      </mesh>

      {/* gantry crane: legs + beam + trolley */}
      <mesh position={[-5, 2.5, 0]}>
        <boxGeometry args={[0.3, 5, 0.3]} />
        <meshStandardMaterial color="#3a4453" metalness={0.3} roughness={0.5} />
      </mesh>
      <mesh position={[4, 2.5, 0]}>
        <boxGeometry args={[0.3, 5, 0.3]} />
        <meshStandardMaterial color="#3a4453" metalness={0.3} roughness={0.5} />
      </mesh>
      <mesh position={[-0.5, BEAM_Y, 0]}>
        <boxGeometry args={[10, 0.3, 0.5]} />
        <meshStandardMaterial color="#434e5e" metalness={0.3} roughness={0.5} />
      </mesh>
      <mesh ref={trolley} position={[STOP_X, BEAM_Y, 0]}>
        <boxGeometry args={[0.7, 0.35, 1.1]} />
        <meshStandardMaterial color="#2c5488" />
      </mesh>

      {/* hoist rope */}
      <mesh ref={cable}>
        <boxGeometry args={[0.05, 1, 0.05]} />
        <meshStandardMaterial color="#20262f" />
      </mesh>

      {/* spreader (lifting frame) */}
      <group ref={spreader} position={[STOP_X, BEAM_Y - 0.5, 0]}>
        <mesh>
          <boxGeometry args={[2.5, 0.18, 1.3]} />
          <meshStandardMaterial color="#2b3240" metalness={0.4} roughness={0.4} />
          <Edges threshold={15} color="#5f86c9" />
        </mesh>
        {[
          [-1.15, 0.6],
          [1.15, 0.6],
          [-1.15, -0.6],
          [1.15, -0.6],
        ].map(([x, z], i) => (
          <mesh key={i} position={[x, -0.14, z]}>
            <boxGeometry args={[0.16, 0.22, 0.16]} />
            <meshStandardMaterial color="#ff8a4c" />
          </mesh>
        ))}
      </group>

      {/* semi-truck: chassis + trailer + cab + wheels */}
      <group ref={truck} position={[-9, 0, 0]}>
        <mesh position={[0, 0.66, 0]}>
          <boxGeometry args={[4.6, 0.16, 1.0]} />
          <meshStandardMaterial color="#2a313c" />
        </mesh>
        <mesh position={[0, 0.9, 0]}>
          <boxGeometry args={[4.3, 0.16, 1.5]} />
          <meshStandardMaterial color="#c9ccd2" metalness={0.2} roughness={0.6} />
        </mesh>
        <mesh position={[2.95, 1.05, 0]}>
          <boxGeometry args={[1.2, 1.5, 1.42]} />
          <meshStandardMaterial color="#1e2530" metalness={0.4} roughness={0.4} />
          <Edges threshold={20} color="#3f4a5a" />
        </mesh>
        <mesh position={[2.38, 1.35, 0]}>
          <boxGeometry args={[0.1, 0.62, 1.2]} />
          <meshStandardMaterial color="#8fb0d8" metalness={0.3} roughness={0.2} />
        </mesh>
        {[-1.7, -1.0, -0.3, 2.5, 3.4].map((wx) =>
          [0.62, -0.62].map((wz) => (
            <mesh key={`${wx}-${wz}`} position={[wx, 0.28, wz]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.3, 0.3, 0.24, 20]} />
              <meshStandardMaterial color="#14171c" roughness={0.7} />
            </mesh>
          ))
        )}
      </group>

      {/* the container */}
      <group ref={container} position={[-9, 1.5, 0]}>
        <mesh castShadow>
          <boxGeometry args={[2.6, 1.1, 1.25]} />
          <meshStandardMaterial color="#1f3d63" roughness={0.55} metalness={0.15} />
          <Edges threshold={15} color="#4f74a3" />
        </mesh>
      </group>

      {/* Single-Window Clearance gate (posts + beam) */}
      <group position={[0, 0, 0]}>
        {[-1.1, 1.1].map((z) => (
          <mesh key={z} position={[0, 1.7, z]}>
            <boxGeometry args={[0.22, 3.6, 0.22]} />
            <meshStandardMaterial
              ref={z === -1.1 ? gateMat : undefined}
              color="#20406a"
              emissive="#2c6bd0"
              emissiveIntensity={0}
              roughness={0.4}
              metalness={0.3}
            />
          </mesh>
        ))}
        <mesh position={[0, 3.5, 0]}>
          <boxGeometry args={[0.22, 0.22, 2.4]} />
          <meshStandardMaterial color="#20406a" emissive="#2c6bd0" emissiveIntensity={0.1} />
        </mesh>
      </group>

      {/* cargo ship */}
      <group ref={ship} position={[4, 0, 0]}>
        <mesh position={[0, 0.1, 0]} castShadow>
          <boxGeometry args={[5.2, 1, 2.1]} />
          <meshStandardMaterial color="#233247" roughness={0.6} metalness={0.2} />
          <Edges threshold={15} color="#3f5a7a" />
        </mesh>
        <mesh position={[0, 0.75, 0]}>
          <boxGeometry args={[4.8, 0.3, 1.8]} />
          <meshStandardMaterial color="#33465f" roughness={0.7} />
        </mesh>
        <mesh position={[1.9, 1.4, 0]}>
          <boxGeometry args={[0.9, 1.1, 1.3]} />
          <meshStandardMaterial color="#42586f" roughness={0.7} />
        </mesh>
      </group>
    </group>
  );
}

export default function DutyFreePassage() {
  const sectionRef = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const [active, setActive] = useState(false);
  const capsRef = useRef<(HTMLDivElement | null)[]>([]);
  const stampRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  const CAPTIONS = [
    { c: 0.09, t: "Goods enter a duty-free enclave" },
    { c: 0.3, t: "Lifted for single-window clearance" },
    { c: 0.52, t: "Cleared — customs & GST exempt" },
    { c: 0.72, t: "Loaded for export" },
    { c: 0.92, t: "Shipped to the world" },
  ];

  // activate the render loop only while the pinned scene is on screen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), {
      threshold: 0,
      rootMargin: "25% 0px 25% 0px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // progress from scroll position through the tall section
  useLenis(() => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const total = el.offsetHeight - window.innerHeight;
    const p = total > 0 ? clamp(-rect.top / total) : 0;
    progress.current = p;

    capsRef.current.forEach((node, i) => {
      if (!node) return;
      const dist = Math.abs(p - CAPTIONS[i].c);
      node.style.opacity = String(clamp(1 - dist / 0.11));
      node.style.transform = `translateY(${clamp(1 - dist / 0.11) * 0 + (1 - clamp(1 - dist / 0.11)) * 12}px)`;
    });
    if (stampRef.current) {
      const s = clamp(1 - Math.abs(p - 0.52) / 0.07);
      stampRef.current.style.opacity = String(s);
      stampRef.current.style.transform = `scale(${0.8 + s * 0.2}) rotate(-8deg)`;
    }
    if (railRef.current) railRef.current.style.transform = `scaleX(${p})`;
  });

  return (
    <section ref={sectionRef} className="relative h-[320vh] bg-ink-2/40">
      {/* pinned stage */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <div className="absolute inset-0">
          {active && (
            <Canvas
              frameloop={active ? "always" : "never"}
              dpr={[1, 1.6]}
              resize={{ debounce: 0, scroll: false }}
              camera={{ position: [1.6, 3.2, 13.2], fov: 38 }}
              gl={{ antialias: true, alpha: true }}
              onCreated={({ camera }) => camera.lookAt(1.4, 1.3, 0)}
              style={{ width: "100%", height: "100%" }}
            >
              <ambientLight intensity={0.85} />
              <hemisphereLight args={["#ffffff", "#c8c9cc", 0.6]} />
              <directionalLight position={[6, 12, 6]} intensity={2} color="#ffffff" />
              <directionalLight position={[-7, 5, -4]} intensity={0.6} color="#dfe4ee" />
              <Rig progress={progress} />
            </Canvas>
          )}
        </div>

        {/* section label */}
        <div className="pointer-events-none absolute left-6 top-24 z-20 md:left-12 max-w-lg">
          <p className="eyebrow mb-2 !text-[#1f3d63] !font-bold tracking-widest">The duty-free journey</p>
          <h2 className="font-display text-[clamp(1.8rem,3.2vw,2.8rem)] font-light leading-[1.15] tracking-tight text-[#16181d]">
            One partner, from the quayside to the open sea.
          </h2>
        </div>

        {/* APPROVED stamp */}
        <div
          ref={stampRef}
          className="pointer-events-none absolute left-1/2 top-[36%] z-30 -translate-x-1/2 rounded-xl border-[3px] border-emerald-600 bg-white/95 px-6 py-3 opacity-0 shadow-[0_12px_36px_rgba(0,0,0,0.3)] backdrop-blur-md"
          style={{ transform: "scale(0.8) rotate(-8deg)" }}
        >
          <div className="flex flex-col items-center justify-center rounded-md border border-dashed border-emerald-600/70 px-4 py-1.5">
            <div className="font-display text-2xl md:text-3xl font-black tracking-widest text-emerald-700">
              APPROVED
            </div>
            <div className="text-center text-[0.65rem] md:text-xs font-bold uppercase tracking-[0.25em] text-emerald-800">
              Zero-Rated GST
            </div>
          </div>
        </div>

        {/* captions */}
        <div className="pointer-events-none absolute inset-x-0 bottom-20 z-10 flex justify-center px-6">
          <div className="relative h-8 w-full max-w-2xl text-center">
            {CAPTIONS.map((cap, i) => (
              <div
                key={cap.t}
                ref={(el) => {
                  capsRef.current[i] = el;
                }}
                className="absolute inset-0 font-display text-lg text-ivory opacity-0 md:text-2xl"
              >
                {cap.t}
              </div>
            ))}
          </div>
        </div>

        {/* progress rail */}
        <div className="pointer-events-none absolute bottom-12 left-1/2 z-10 h-px w-40 -translate-x-1/2 overflow-hidden bg-[var(--line)]">
          <div
            ref={railRef}
            className="h-full origin-left bg-brass"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </section>
  );
}

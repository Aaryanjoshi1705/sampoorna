"use client";

import assetPath from "../utils/assetPath";
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, Html } from "@react-three/drei";
import * as THREE from "three";

/* United-Carriers-style globe: dotted continents, country labels + markers,
   warm-top / cool-bottom atmosphere, orbit rings, shining trade arcs
   (orange = India's exports out) and dollar streams (green = investment in). */

const R = 3.0;
const CORNER_POS: [number, number, number] = [5.0, -0.4, 0];
const CORNER_SCALE = 1.3;

function latLonToVec3(lonDeg: number, latDeg: number, r: number) {
  const lat = (latDeg * Math.PI) / 180;
  const lon = (lonDeg * Math.PI) / 180;
  return new THREE.Vector3(
    r * Math.cos(lat) * Math.cos(lon),
    r * Math.sin(lat),
    r * Math.cos(lat) * Math.sin(lon)
  );
}

const INDIA: [number, number] = [78, 22];
const PLACES: { name: string; ll: [number, number]; india?: boolean }[] = [
  { name: "INDIA", ll: [78, 22], india: true },
  { name: "USA", ll: [-95, 40] },
  { name: "U.K.", ll: [0, 51] },
  { name: "U.A.E.", ll: [55, 25] },
  { name: "SINGAPORE", ll: [104, 1] },
  { name: "CHINA", ll: [116, 39] },
  { name: "JAPAN", ll: [138, 36] },
  { name: "AUSTRALIA", ll: [151, -33] },
];

const OUT_DESTS: [number, number][] = [
  [-95, 40], [2, 48], [55, 25], [104, 1], [116, 39], [-47, -15], [151, -33],
];
const IN_SOURCES: [number, number][] = [
  [-95, 40], [0, 51], [104, 1], [55, 25], [138, 36], [57, -20],
];
const OUT_SEGMENTS: [[number, number], [number, number]][] = OUT_DESTS.map((d) => [INDIA, d]);
const IN_SEGMENTS: [[number, number], [number, number]][] = IN_SOURCES.map((s) => [s, INDIA]);

/* ---- gradient atmosphere (warm rim on top, cool on bottom) ---- */
const atmosphereVertex = /* glsl */ `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const atmosphereFragment = /* glsl */ `
  varying vec3 vNormal;
  uniform vec3 uWarm;
  uniform vec3 uCool;
  void main() {
    float intensity = pow(0.62 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
    intensity = clamp(intensity, 0.0, 1.0);
    float m = smoothstep(-0.5, 0.55, vNormal.y);
    vec3 col = mix(uCool, uWarm, m);
    gl_FragColor = vec4(col, 1.0) * intensity;
  }
`;

function AnimatedArcs({
  segments,
  lineColor,
  cometColor,
  midScale = 1.4,
  speed = 0.18,
  sprite,
  size = 0.13,
  lineOpacity = 0.3,
}: {
  segments: [[number, number], [number, number]][];
  lineColor: string;
  cometColor: string;
  midScale?: number;
  speed?: number;
  sprite?: THREE.Texture;
  size?: number;
  lineOpacity?: number;
}) {
  const curves = useMemo(
    () =>
      segments.map(([a, b]) => {
        const start = latLonToVec3(a[0], a[1], R);
        const end = latLonToVec3(b[0], b[1], R);
        const mid = start.clone().add(end).normalize().multiplyScalar(R * midScale);
        return new THREE.QuadraticBezierCurve3(start, mid, end);
      }),
    [segments, midScale]
  );
  const basePoints = useMemo(
    () => curves.map((c) => c.getPoints(50).map((p) => [p.x, p.y, p.z] as [number, number, number])),
    [curves]
  );

  const TRAIL = 6;
  const cometRef = useRef<THREE.Points>(null!);
  const cometPos = useMemo(() => new Float32Array(curves.length * TRAIL * 3), [curves.length]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const arr = cometRef.current.geometry.attributes.position.array as Float32Array;
    let idx = 0;
    for (let a = 0; a < curves.length; a++) {
      const base = (t * speed + a * 0.16) % 1;
      for (let k = 0; k < TRAIL; k++) {
        let tt = base - k * 0.02;
        tt = ((tt % 1) + 1) % 1;
        const p = curves[a].getPoint(tt);
        arr[idx++] = p.x;
        arr[idx++] = p.y;
        arr[idx++] = p.z;
      }
    }
    cometRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group>
      {basePoints.map((pts, i) => (
        <Line key={i} points={pts} color={lineColor} lineWidth={1.1} transparent opacity={lineOpacity} />
      ))}
      <points ref={cometRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[cometPos, 3]} />
        </bufferGeometry>
        {sprite ? (
          <pointsMaterial map={sprite} size={size} transparent alphaTest={0.02} sizeAttenuation depthWrite={false} />
        ) : (
          <pointsMaterial
            size={size}
            color={cometColor}
            transparent
            opacity={0.95}
            sizeAttenuation
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        )}
      </points>
    </group>
  );
}

function LandDots() {
  const [positions, setPositions] = useState<Float32Array | null>(null);
  useEffect(() => {
    let cancelled = false;
    const img = new Image();
    img.onload = () => {
      const W = 1024,
        H = 512;
      const c = document.createElement("canvas");
      c.width = W;
      c.height = H;
      const g = c.getContext("2d")!;
      g.drawImage(img, 0, 0, W, H);
      const data = g.getImageData(0, 0, W, H).data;
      const N = 30000;
      const golden = Math.PI * (3 - Math.sqrt(5));
      const pts: number[] = [];
      for (let i = 0; i < N; i++) {
        const y = 1 - (i / (N - 1)) * 2;
        const rad = Math.sqrt(1 - y * y);
        const th = i * golden;
        const x = Math.cos(th) * rad;
        const z = Math.sin(th) * rad;
        const lon = Math.atan2(z, x);
        const lat = Math.asin(y);
        const u = (lon + Math.PI) / (2 * Math.PI);
        const v = (Math.PI / 2 - lat) / Math.PI;
        const px = Math.min(W - 1, Math.max(0, Math.floor(u * (W - 1))));
        const py = Math.min(H - 1, Math.max(0, Math.floor(v * (H - 1))));
        if (data[(py * W + px) * 4] < 90) pts.push(x * R, y * R, z * R);
      }
      if (!cancelled) setPositions(new Float32Array(pts));
    };
    img.src = "/images/earth-mask.jpg";
    return () => {
      cancelled = true;
    };
  }, []);
  if (!positions) return null;
  return (
    <points key={positions.length}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#ffffff" sizeAttenuation depthWrite />
    </points>
  );
}

function Stars() {
  const positions = useMemo(() => {
    const N = 700;
    const arr = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 34;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 22;
      arr[i * 3 + 2] = -4 - Math.random() * 12;
    }
    return arr;
  }, []);
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#c8d3e6" transparent opacity={0.75} sizeAttenuation />
    </points>
  );
}

function OrbitRings() {
  const ref = useRef<THREE.Group>(null!);
  useFrame((s) => {
    ref.current.rotation.y = s.clock.elapsedTime * 0.05;
  });
  return (
    <group ref={ref}>
      <mesh rotation={[Math.PI / 2 - 0.35, 0, 0.25]}>
        <torusGeometry args={[R * 1.38, 0.008, 8, 140]} />
        <meshBasicMaterial color="#ff8a3c" transparent opacity={0.55} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh rotation={[Math.PI / 2 + 0.5, 0.4, -0.2]}>
        <torusGeometry args={[R * 1.52, 0.006, 8, 140]} />
        <meshBasicMaterial color="#ff9a4c" transparent opacity={0.4} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

type DragState = { dragging: boolean; velX: number; velY: number; lastX: number; lastY: number };

function Rig({ drag }: { drag: React.MutableRefObject<DragState> }) {
  const inner = useRef<THREE.Group>(null!);
  const ocean = useRef<THREE.Mesh>(null!);
  const atmoUniforms = useMemo(
    () => ({ uWarm: { value: new THREE.Color("#ff7a2e") }, uCool: { value: new THREE.Color("#2f6bd0") } }),
    []
  );

  const dollarTex = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 64;
    c.height = 64;
    const g = c.getContext("2d")!;
    g.clearRect(0, 0, 64, 64);
    g.font = "bold 46px Manrope, Arial, sans-serif";
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.shadowColor = "#3fd08a";
    g.shadowBlur = 10;
    g.fillStyle = "#8ff5bd";
    g.fillText("$", 32, 34);
    const tex = new THREE.CanvasTexture(c);
    tex.needsUpdate = true;
    return tex;
  }, []);

  useFrame(() => {
    const g = inner.current;
    if (!g) return;
    const d = drag.current;
    g.rotation.y += d.velY;
    g.rotation.x += d.velX;
    g.rotation.x = Math.max(-0.9, Math.min(0.9, g.rotation.x));
    if (!d.dragging) {
      d.velY *= 0.94;
      d.velX *= 0.94;
      g.rotation.y += 0.0006; // gentle idle drift like UC
    }
  });

  return (
    <group position={CORNER_POS} scale={CORNER_SCALE}>
      {/* atmosphere (camera-fixed gradient) */}
      <mesh>
        <sphereGeometry args={[R * 1.2, 64, 64]} />
        <shaderMaterial
          vertexShader={atmosphereVertex}
          fragmentShader={atmosphereFragment}
          uniforms={atmoUniforms}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          transparent
          depthWrite={false}
        />
      </mesh>
      <OrbitRings />

      {/* rotating globe */}
      <group ref={inner} rotation={[0.2, -1.0, 0]}>
        <mesh ref={ocean}>
          <sphereGeometry args={[R * 0.99, 64, 64]} />
          <meshStandardMaterial color="#24518f" roughness={0.65} metalness={0.15} />
        </mesh>
        <LandDots />

        <AnimatedArcs
          segments={OUT_SEGMENTS}
          lineColor="#ff9a4c"
          cometColor="#ffc27a"
          midScale={1.42}
          speed={0.18}
          size={0.16}
          lineOpacity={0.42}
        />
        <AnimatedArcs
          segments={IN_SEGMENTS}
          lineColor="#3f8f6f"
          cometColor="#6fe6ad"
          midScale={1.24}
          speed={0.13}
          sprite={dollarTex}
          size={0.5}
          lineOpacity={0.3}
        />

        {PLACES.map((pl) => {
          const pos = latLonToVec3(pl.ll[0], pl.ll[1], R * 1.01);
          return (
            <group key={pl.name} position={pos}>
              <mesh>
                <sphereGeometry args={[pl.india ? 0.09 : 0.05, 12, 12]} />
                <meshBasicMaterial color={pl.india ? "#ffd9a0" : "#ff8a4c"} />
              </mesh>
              <Html center occlude={[ocean]} pointerEvents="none">
                <div className={`globe-label${pl.india ? " globe-label--india" : ""}`}>{pl.name}</div>
              </Html>
            </group>
          );
        })}
      </group>
    </group>
  );
}

export default function HeroCanvas({ active = true }: { active?: boolean }) {
  const drag = useRef<DragState>({ dragging: false, velX: 0, velY: 0, lastX: 0, lastY: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px), (pointer: coarse)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={isMobile ? [1, 1.3] : [1, 1.75]}
      resize={{ debounce: 0, scroll: false }}
      camera={{ position: [0, 0.2, 9.2], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        const dom = gl.domElement;
        const d = drag.current;
        const onDown = (e: PointerEvent) => {
          d.dragging = true;
          d.lastX = e.clientX;
          d.lastY = e.clientY;
          d.velX = 0;
          d.velY = 0;
        };
        const onMove = (e: PointerEvent) => {
          if (!d.dragging) return;
          d.velY = (e.clientX - d.lastX) * 0.003;
          d.velX = (e.clientY - d.lastY) * 0.003;
          d.lastX = e.clientX;
          d.lastY = e.clientY;
        };
        const onUp = () => (d.dragging = false);
        dom.addEventListener("pointerdown", onDown);
        window.addEventListener("pointermove", onMove);
        window.addEventListener("pointerup", onUp);
      }}
      style={{ width: "100%", height: "100%", display: "block", cursor: "grab" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[-4, 4, 6]} intensity={1.5} color="#bcd2ff" />
      <Stars />
      <Rig drag={drag} />
    </Canvas>
  );
}

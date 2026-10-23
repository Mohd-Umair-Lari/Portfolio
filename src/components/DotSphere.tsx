import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, Suspense } from "react";
import * as THREE from "three";

/**
 * Resolve a CSS custom property (any colour syntax, incl. oklch) to an sRGB
 * THREE.Color by painting it on a 1px canvas. Works the same in every browser,
 * so the sphere always follows the theme tokens in styles.css.
 */
function resolveCssColor(varName: string, fallback: string) {
  try {
    const raw = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
    const ctx = document.createElement("canvas").getContext("2d");
    if (!raw || !ctx) return new THREE.Color(fallback);
    ctx.fillStyle = fallback;
    ctx.fillStyle = raw;
    ctx.fillRect(0, 0, 1, 1);
    const [r = 0, g = 0, b = 0] = ctx.getImageData(0, 0, 1, 1).data;
    return new THREE.Color(r / 255, g / 255, b / 255);
  } catch {
    return new THREE.Color(fallback);
  }
}

/** Soft round sprite so points render as dots instead of squares. */
function makeDotTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.55, "rgba(255,255,255,1)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function fibonacciSphere(count: number, radius: number) {
  const positions = new Float32Array(count * 3);
  const phi = Math.PI * (Math.sqrt(5) - 1);
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    positions[i * 3] = Math.cos(theta) * r * radius;
    positions[i * 3 + 1] = y * radius;
    positions[i * 3 + 2] = Math.sin(theta) * r * radius;
  }
  return positions;
}

function ring(count: number, radius: number) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2;
    positions[i * 3] = Math.cos(a) * radius;
    positions[i * 3 + 1] = 0;
    positions[i * 3 + 2] = Math.sin(a) * radius;
  }
  return positions;
}

function Dots({
  positions,
  size,
  color,
  opacity,
  map,
}: {
  positions: Float32Array;
  size: number;
  color: THREE.Color;
  opacity: number;
  map: THREE.Texture;
}) {
  return (
    <>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        map={map}
        alphaTest={0.05}
        sizeAttenuation
        transparent
        opacity={opacity}
        depthWrite={false}
      />
    </>
  );
}

function DottedGlobe() {
  const inner = useRef<THREE.Points>(null!);
  const outer = useRef<THREE.Points>(null!);
  const orbit = useRef<THREE.Points>(null!);
  const group = useRef<THREE.Group>(null!);
  const mouse = useRef({ x: 0, y: 0 });

  const colors = useMemo(
    () => ({
      core: resolveCssColor("--gold", "#1f6b3a"),
      halo: resolveCssColor("--gold-soft", "#3f9a5c"),
      fill: resolveCssColor("--bg-mid", "#eef6ee"),
    }),
    [],
  );
  const dot = useMemo(() => makeDotTexture(), []);
  const innerPositions = useMemo(() => fibonacciSphere(3200, 1.0), []);
  const outerPositions = useMemo(() => fibonacciSphere(1100, 1.42), []);
  const orbitPositions = useMemo(() => ring(260, 1.75), []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    mouse.current.x += (state.pointer.x - mouse.current.x) * 0.04;
    mouse.current.y += (state.pointer.y - mouse.current.y) * 0.04;

    inner.current.rotation.y += delta * 0.14;
    inner.current.rotation.x = Math.sin(t * 0.2) * 0.15;
    outer.current.rotation.y -= delta * 0.06;
    outer.current.rotation.z = Math.cos(t * 0.15) * 0.1;
    orbit.current.rotation.y += delta * 0.25;

    group.current.rotation.y = mouse.current.x * 0.4;
    group.current.rotation.x = -mouse.current.y * 0.3;
    group.current.position.y = Math.sin(t * 0.4) * 0.05;
  });

  return (
    <group ref={group}>
      {/* Light core hides back-facing dots so the globe reads as solid */}
      <mesh renderOrder={-1}>
        <sphereGeometry args={[0.97, 64, 64]} />
        <meshBasicMaterial color={colors.fill} transparent opacity={0.45} />
      </mesh>

      <points ref={inner}>
        <Dots positions={innerPositions} size={0.042} color={colors.core} opacity={1} map={dot} />
      </points>

      <points ref={outer}>
        <Dots positions={outerPositions} size={0.032} color={colors.halo} opacity={0.6} map={dot} />
      </points>

      {/* Tilted orbit ring */}
      <group rotation={[Math.PI / 2.6, 0, Math.PI / 10]}>
        <points ref={orbit}>
          <Dots
            positions={orbitPositions}
            size={0.045}
            color={colors.core}
            opacity={0.85}
            map={dot}
          />
        </points>
      </group>
    </group>
  );
}

export default function DotSphere() {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        eventSource={document.body}
        eventPrefix="client"
      >
        <Suspense fallback={null}>
          <DottedGlobe />
        </Suspense>
      </Canvas>
    </div>
  );
}

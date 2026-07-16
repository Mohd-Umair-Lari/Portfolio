import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, Suspense } from "react";
import * as THREE from "three";

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

function DottedGlobe() {
  const inner = useRef<THREE.Points>(null!);
  const outer = useRef<THREE.Points>(null!);
  const group = useRef<THREE.Group>(null!);
  const mouse = useRef({ x: 0, y: 0 });

  const innerPositions = useMemo(() => fibonacciSphere(2500, 1.0), []);
  const outerPositions = useMemo(() => fibonacciSphere(900, 1.45), []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    mouse.current.x += (state.mouse.x - mouse.current.x) * 0.04;
    mouse.current.y += (state.mouse.y - mouse.current.y) * 0.04;

    if (inner.current) {
      inner.current.rotation.y += delta * 0.12;
      inner.current.rotation.x = Math.sin(t * 0.2) * 0.15;
    }
    if (outer.current) {
      outer.current.rotation.y -= delta * 0.05;
      outer.current.rotation.z = Math.cos(t * 0.15) * 0.1;
    }
    if (group.current) {
      group.current.rotation.y = mouse.current.x * 0.4;
      group.current.rotation.x = -mouse.current.y * 0.3;
      group.current.position.y = Math.sin(t * 0.4) * 0.05;
    }
  });

  return (
    <group ref={group}>

      <points ref={inner}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[innerPositions, 3]}
            count={innerPositions.length / 3}
            array={innerPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.009}
          color={"#bdbdbd"}
          sizeAttenuation
          transparent
          opacity={0.85}
          depthWrite={false}
        />
      </points>

      <points ref={outer}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[outerPositions, 3]}
            count={outerPositions.length / 3}
            array={outerPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.014}
          color={"#7a7a7a"}
          sizeAttenuation
          transparent
          opacity={0.5}
          depthWrite={false}
        />
      </points>

      <mesh>
        <sphereGeometry args={[0.95, 64, 64]} />
        <meshBasicMaterial color={"#0a0a0a"} transparent opacity={0.55} />
      </mesh>
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
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <DottedGlobe />
        </Suspense>
      </Canvas>
    </div>
  );
}

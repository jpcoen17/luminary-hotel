'use client';

import { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  OrbitControls,
  Float,
  Stars,
  MeshReflectorMaterial,
  Environment,
} from '@react-three/drei';
import * as THREE from 'three';

function Rain({ count = 1500 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);
  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 80;
      positions[i * 3 + 1] = Math.random() * 40 - 5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80;
      velocities[i]        = 0.1 + Math.random() * 0.2;
    }
    return { positions, velocities };
  }, [count]);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  useFrame(() => {
    if (!meshRef.current) return;
    const pos = meshRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] -= velocities[i];
      if (pos[i * 3 + 1] < -5) {
        pos[i * 3 + 1] = 35;
        pos[i * 3]     = (Math.random() - 0.5) * 80;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 80;
      }
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial size={0.04} color="#a0c4ff" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

function Building() {
  return (
    <group position={[0, 0, -15]}>
      {/* Main tower */}
      <mesh position={[0, 8, 0]} castShadow>
        <boxGeometry args={[6, 32, 4]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Wing left */}
      <mesh position={[-5, 4, 0]} castShadow>
        <boxGeometry args={[4, 16, 3]} />
        <meshStandardMaterial color="#16213e" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Wing right */}
      <mesh position={[5, 4, 0]} castShadow>
        <boxGeometry args={[4, 16, 3]} />
        <meshStandardMaterial color="#16213e" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Windows — tower */}
      {Array.from({ length: 10 }).map((_, row) =>
        Array.from({ length: 4 }).map((_, col) => (
          <mesh key={`w-${row}-${col}`} position={[-2.25 + col * 1.5, 2 + row * 2.8, 2.05]}>
            <planeGeometry args={[0.8, 1.2]} />
            <meshStandardMaterial
              color={Math.random() > 0.3 ? '#ffd700' : '#1a1a2e'}
              emissive={Math.random() > 0.3 ? '#ffd700' : '#000000'}
              emissiveIntensity={0.8}
            />
          </mesh>
        ))
      )}
    </group>
  );
}

function CityBackground() {
  const buildings = useMemo(() =>
    Array.from({ length: 30 }).map((_, i) => ({
      x: (Math.random() - 0.5) * 120,
      z: -20 - Math.random() * 40,
      h: 5 + Math.random() * 25,
      w: 2 + Math.random() * 5,
    })), []);

  return (
    <group>
      {buildings.map((b, i) => (
        <mesh key={i} position={[b.x, b.h / 2 - 2, b.z]} castShadow>
          <boxGeometry args={[b.w, b.h, b.w * 0.8]} />
          <meshStandardMaterial
            color={`hsl(${220 + Math.random() * 30}, 30%, ${8 + Math.random() * 8}%)`}
            metalness={0.6}
            roughness={0.4}
          />
        </mesh>
      ))}
    </group>
  );
}

function CameraRig({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  useFrame((state) => {
    state.camera.position.x += (mouseX * 0.8 - state.camera.position.x) * 0.03;
    state.camera.position.y += (mouseY * 0.3 + 2 - state.camera.position.y) * 0.03;
    state.camera.lookAt(0, 4, -10);
  });
  return null;
}

function SceneContent({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  return (
    <>
      <fog attach="fog" args={['#0a0a1a', 20, 80]} />
      <ambientLight intensity={0.15} color="#1a1a3e" />
      <directionalLight position={[10, 20, 5]} intensity={0.4} color="#4060ff" castShadow />
      <pointLight position={[0, 15, -5]} intensity={2} color="#d4922a" distance={40} />
      <pointLight position={[-8, 5, 5]} intensity={1} color="#2244aa" distance={30} />

      <Rain count={1500} />
      <Building />
      <CityBackground />
      <Stars radius={80} depth={30} count={2000} factor={3} fade speed={0.5} />

      {/* Wet ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <MeshReflectorMaterial
          blur={[200, 100]}
          resolution={512}
          mixBlur={0.8}
          mixStrength={40}
          roughness={0.9}
          depthScale={1}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050510"
          metalness={0.7}
          mirror={0}
        />
      </mesh>

      <CameraRig mouseX={mouseX} mouseY={mouseY} />
    </>
  );
}

export default function HeroScene({ mouseX = 0, mouseY = 0 }: { mouseX?: number; mouseY?: number }) {
  return (
    <Canvas
      camera={{ position: [0, 3, 12], fov: 60 }}
      shadows
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 0.7,
      }}
      dpr={[1, 1.5]}
    >
      <Suspense fallback={null}>
        <SceneContent mouseX={mouseX} mouseY={mouseY} />
      </Suspense>
    </Canvas>
  );
}

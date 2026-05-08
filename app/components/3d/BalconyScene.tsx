'use client';

import { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Stars, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function CityBuildings() {
  const buildings = useMemo(() =>
    Array.from({ length: 60 }).map((_, i) => ({
      x: (Math.random() - 0.5) * 150,
      z: -10 - Math.random() * 60,
      h: 4 + Math.random() * 30,
      w: 1.5 + Math.random() * 4,
      hue: 200 + Math.random() * 40,
    })), []);

  return (
    <group>
      {buildings.map((b, i) => (
        <group key={i} position={[b.x, b.h / 2 - 3, b.z]}>
          <mesh castShadow>
            <boxGeometry args={[b.w, b.h, b.w * 0.8]} />
            <meshStandardMaterial
              color={`hsl(${b.hue}, 25%, ${6 + Math.random() * 6}%)`}
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
          {/* Window lights */}
          {Array.from({ length: Math.floor(b.h / 2) }).map((_, j) => (
            <mesh key={j} position={[0, -b.h / 2 + 1.5 + j * 2, b.w * 0.41]}>
              <planeGeometry args={[b.w * 0.6, 0.6]} />
              <meshStandardMaterial
                color={Math.random() > 0.3 ? '#ffd580' : '#2244aa'}
                emissive={Math.random() > 0.3 ? '#ffd580' : '#2244aa'}
                emissiveIntensity={Math.random() * 0.8 + 0.2}
              />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

function Balcony() {
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 1]} receiveShadow>
        <planeGeometry args={[8, 4]} />
        <meshStandardMaterial color="#1a1510" roughness={0.8} metalness={0.1} />
      </mesh>

      {/* Glass railing */}
      <mesh position={[0, 0.5, -1]} castShadow>
        <boxGeometry args={[8, 1.2, 0.04]} />
        <meshStandardMaterial color="#80b0ff" transparent opacity={0.15} metalness={0.9} roughness={0} />
      </mesh>
      {/* Railing top bar */}
      <mesh position={[0, 1.1, -1]}>
        <boxGeometry args={[8, 0.06, 0.06]} />
        <meshStandardMaterial color="#c9a96e" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Outdoor chair */}
      <group position={[-1.5, -0.1, 0.5]}>
        <mesh castShadow>
          <boxGeometry args={[0.7, 0.08, 0.7]} />
          <meshStandardMaterial color="#1a1208" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.35, -0.3]} castShadow>
          <boxGeometry args={[0.7, 0.7, 0.06]} />
          <meshStandardMaterial color="#1a1208" roughness={0.8} />
        </mesh>
      </group>

      {/* Side table */}
      <group position={[1, -0.2, 0.5]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.25, 0.25, 0.06, 16]} />
          <meshStandardMaterial color="#c9a96e" metalness={0.6} roughness={0.3} />
        </mesh>
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.4, 8]} />
          <meshStandardMaterial color="#c9a96e" metalness={0.8} />
        </mesh>
      </group>
    </group>
  );
}

function MovingClouds() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.x = Math.sin(state.clock.elapsedTime * 0.02) * 5;
    }
  });
  return (
    <group ref={ref}>
      {[[-15, 8, -20], [10, 12, -30], [-5, 10, -25]].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]}>
          <sphereGeometry args={[3 + i, 8, 8]} />
          <meshStandardMaterial color="#1a2030" transparent opacity={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function SceneContent() {
  return (
    <>
      <fog attach="fog" args={['#080818', 30, 120]} />
      <ambientLight intensity={0.05} color="#101828" />
      <pointLight position={[0, 5, 5]} intensity={1} color="#ffd580" distance={20} />
      <pointLight position={[-3, 2, 0]} intensity={0.5} color="#4466ff" distance={15} />

      <CityBuildings />
      <Balcony />
      <MovingClouds />
      <Stars radius={100} depth={50} count={3000} factor={4} fade speed={0.3} />
      <Sparkles count={30} scale={[10, 5, 5]} size={1.5} speed={0.1} color="#ffd580" opacity={0.4} />
      <Environment preset="night" />
    </>
  );
}

export default function BalconyScene() {
  return (
    <Canvas
      camera={{ position: [0, 1.5, 6], fov: 65 }}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 0.6,
      }}
      dpr={[1, 1.5]}
    >
      <Suspense fallback={null}>
        <SceneContent />
      </Suspense>
    </Canvas>
  );
}

'use client';

import { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Environment,
  Float,
  MeshReflectorMaterial,
  Sparkles,
} from '@react-three/drei';
import * as THREE from 'three';

function Chandelier({ position = [0, 8, 0] as [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  const crystals = useMemo(() =>
    Array.from({ length: 24 }).map((_, i) => {
      const angle = (i / 24) * Math.PI * 2;
      const r = 0.8 + (i % 3) * 0.4;
      return { x: Math.cos(angle) * r, z: Math.sin(angle) * r, y: -(i % 4) * 0.3 };
    }), []);

  return (
    <group ref={groupRef} position={position}>
      <mesh>
        <cylinderGeometry args={[0.05, 0.05, 0.5, 8]} />
        <meshStandardMaterial color="#c9a96e" metalness={1} roughness={0.1} />
      </mesh>
      <mesh position={[0, -0.5, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#ffd700" emissive="#ffaa00" emissiveIntensity={1} metalness={1} roughness={0} />
      </mesh>
      {crystals.map((c, i) => (
        <mesh key={i} position={[c.x, c.y - 0.3, c.z]}>
          <octahedronGeometry args={[0.06]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.8} metalness={0} roughness={0} envMapIntensity={3} />
        </mesh>
      ))}
      <pointLight intensity={4} distance={20} color="#ffd580" decay={2} />
    </group>
  );
}

function MarbleColumn({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <cylinderGeometry args={[0.3, 0.35, 8, 16]} />
        <meshStandardMaterial color="#e8e0d5" metalness={0.1} roughness={0.4} />
      </mesh>
      <mesh position={[0, 4.2, 0]}>
        <boxGeometry args={[0.8, 0.2, 0.8]} />
        <meshStandardMaterial color="#d5c9bc" metalness={0.1} roughness={0.3} />
      </mesh>
      <mesh position={[0, -4.2, 0]}>
        <boxGeometry args={[0.8, 0.2, 0.8]} />
        <meshStandardMaterial color="#d5c9bc" metalness={0.1} roughness={0.3} />
      </mesh>
    </group>
  );
}

function ReceptionDesk() {
  return (
    <group position={[0, -0.5, -6]}>
      <mesh castShadow>
        <boxGeometry args={[6, 1.4, 1.5]} />
        <meshStandardMaterial color="#1a120a" metalness={0.3} roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.75, 0]}>
        <boxGeometry args={[6.1, 0.08, 1.6]} />
        <meshStandardMaterial color="#c9a96e" metalness={0.8} roughness={0.1} />
      </mesh>
      <pointLight position={[0, -0.3, 0.5]} intensity={1} color="#ffd580" distance={5} />
    </group>
  );
}

function Sofa({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow>
        <boxGeometry args={[3, 0.4, 1.2]} />
        <meshStandardMaterial color="#2a2018" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.5, -0.5]} castShadow>
        <boxGeometry args={[3, 0.8, 0.2]} />
        <meshStandardMaterial color="#2a2018" roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[3, 0.5, 1]} />
        <meshStandardMaterial color="#3a3028" roughness={0.9} />
      </mesh>
    </group>
  );
}

function SceneContent() {
  return (
    <>
      <fog attach="fog" args={['#0a0800', 15, 60]} />
      <ambientLight intensity={0.2} color="#2a1f0a" />
      <directionalLight position={[5, 10, 5]} intensity={0.3} color="#ffd580" />
      <pointLight position={[0, 6, 0]} intensity={3} color="#ffd580" distance={30} />
      <pointLight position={[-5, 3, 2]} intensity={0.8} color="#4466ff" distance={15} />
      <pointLight position={[5, 3, 2]} intensity={0.8} color="#4466ff" distance={15} />

      {/* Marble floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={512}
          mixBlur={0.6}
          mixStrength={60}
          roughness={0.4}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#c8b89a"
          metalness={0.3}
          mirror={0}
        />
      </mesh>

      {/* Ceiling */}
      <mesh position={[0, 9, 0]}>
        <boxGeometry args={[30, 0.2, 30]} />
        <meshStandardMaterial color="#0f0c06" />
      </mesh>

      <Chandelier position={[0, 8.5, -2]} />
      <Chandelier position={[-4, 8, 4]} />
      <Chandelier position={[4, 8, 4]} />

      <MarbleColumn position={[-5, 2, -4]} />
      <MarbleColumn position={[5, 2, -4]} />
      <MarbleColumn position={[-5, 2, 2]} />
      <MarbleColumn position={[5, 2, 2]} />

      <ReceptionDesk />
      <Sofa position={[-4, -1.8, 1]} />
      <Sofa position={[4, -1.8, 1]} />

      <Sparkles count={60} scale={[20, 10, 20]} size={1.5} speed={0.2} color="#ffd580" opacity={0.5} />
      <Environment preset="night" />
    </>
  );
}

export default function LobbyScene() {
  return (
    <Canvas
      camera={{ position: [0, 2, 10], fov: 55 }}
      shadows
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 0.8,
      }}
      dpr={[1, 1.5]}
    >
      <Suspense fallback={null}>
        <SceneContent />
      </Suspense>
    </Canvas>
  );
}

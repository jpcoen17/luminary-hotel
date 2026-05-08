'use client';

import { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, Sparkles, MeshReflectorMaterial } from '@react-three/drei';
import * as THREE from 'three';

function InfinityPool() {
  const waterRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (waterRef.current) {
      (waterRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        0.3 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group>
      {/* Pool basin */}
      <mesh position={[0, -0.5, 0]} receiveShadow>
        <boxGeometry args={[10, 0.2, 6]} />
        <meshStandardMaterial color="#0a1a2a" metalness={0.1} roughness={0.3} />
      </mesh>
      {/* Water surface */}
      <mesh ref={waterRef} position={[0, -0.35, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[9.8, 5.8, 32, 32]} />
        <meshStandardMaterial
          color="#0066aa"
          transparent
          opacity={0.85}
          metalness={0.1}
          roughness={0}
          emissive="#003366"
          emissiveIntensity={0.3}
        />
      </mesh>
      {/* Pool walls */}
      {[[-5, 0, 0, 0.2, 1.2, 6], [5, 0, 0, 0.2, 1.2, 6], [0, 0, -3, 10, 1.2, 0.2], [0, 0, 3, 10, 1.2, 0.2]].map(([x,y,z,w,h,d], i) => (
        <mesh key={i} position={[x as number, y as number, z as number]}>
          <boxGeometry args={[w as number, h as number, d as number]} />
          <meshStandardMaterial color="#0d1f2d" metalness={0.2} roughness={0.5} />
        </mesh>
      ))}
      {/* Deck chairs */}
      {[-3, 0, 3].map((x, i) => (
        <group key={i} position={[x, -0.2, 4.5]}>
          <mesh castShadow>
            <boxGeometry args={[0.6, 0.06, 1.8]} />
            <meshStandardMaterial color="#c9a96e" metalness={0.3} roughness={0.6} />
          </mesh>
        </group>
      ))}
      {/* Underwater lights */}
      <pointLight position={[0, -0.6, 0]} intensity={3} color="#0088dd" distance={12} />
      <pointLight position={[-3, -0.6, 0]} intensity={1.5} color="#0066bb" distance={8} />
      <pointLight position={[3, -0.6, 0]} intensity={1.5} color="#0066bb" distance={8} />
      {/* Deck */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, 5.5]} receiveShadow>
        <planeGeometry args={[12, 3]} />
        <meshStandardMaterial color="#1a1208" roughness={0.8} />
      </mesh>
    </group>
  );
}

function GymScene() {
  return (
    <group>
      {/* Floor with neon lines */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[12, 10]} />
        <meshStandardMaterial color="#0f0f0f" roughness={0.9} />
      </mesh>
      {/* Neon floor lines */}
      {[-3, 0, 3].map((x, i) => (
        <mesh key={i} position={[x, -0.99, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.04, 10]} />
          <meshStandardMaterial color="#00ffaa" emissive="#00ffaa" emissiveIntensity={2} />
        </mesh>
      ))}
      {/* Mirror wall */}
      <mesh position={[0, 1, -5]}>
        <boxGeometry args={[12, 5, 0.05]} />
        <meshStandardMaterial color="#c0c0c0" metalness={1} roughness={0} />
      </mesh>
      {/* Treadmills */}
      {[-3, 0, 3].map((x, i) => (
        <group key={i} position={[x, -0.7, -2]}>
          <mesh castShadow>
            <boxGeometry args={[0.8, 0.3, 1.8]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.5, -0.4]} castShadow>
            <boxGeometry args={[0.7, 1, 0.05]} />
            <meshStandardMaterial color="#111" metalness={0.8} />
          </mesh>
          <mesh position={[0, 0.5, -0.38]}>
            <boxGeometry args={[0.6, 0.4, 0.01]} />
            <meshStandardMaterial color="#001a33" emissive="#0044aa" emissiveIntensity={0.6} />
          </mesh>
        </group>
      ))}
      {/* Weight rack */}
      <group position={[4, -0.5, -3]}>
        <mesh castShadow>
          <boxGeometry args={[0.1, 2, 0.8]} />
          <meshStandardMaterial color="#333" metalness={0.9} />
        </mesh>
        {[0, 0.5, 1].map((y, i) => (
          <mesh key={i} position={[0.3, y - 0.5, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
            <meshStandardMaterial color="#444" metalness={0.8} />
          </mesh>
        ))}
      </group>
      <pointLight position={[0, 3, 0]} intensity={2} color="#00ffaa" distance={20} />
      <pointLight position={[0, 3, -3]} intensity={1} color="#ffffff" distance={15} />
    </group>
  );
}

function CoworkScene() {
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[14, 10]} />
        <meshStandardMaterial color="#0c0c0c" roughness={0.8} />
      </mesh>
      {/* Workstations */}
      {[-4, 0, 4].map((x, i) => (
        <group key={i} position={[x, -0.7, 0]}>
          <mesh castShadow>
            <boxGeometry args={[2.5, 0.06, 1]} />
            <meshStandardMaterial color="#1a1510" metalness={0.2} roughness={0.5} />
          </mesh>
          {/* Monitor */}
          <mesh position={[0, 0.4, -0.3]} castShadow>
            <boxGeometry args={[1.2, 0.7, 0.04]} />
            <meshStandardMaterial color="#111" metalness={0.9} />
          </mesh>
          <mesh position={[0, 0.4, -0.28]}>
            <boxGeometry args={[1.1, 0.6, 0.01]} />
            <meshStandardMaterial
              color="#000820"
              emissive={i === 1 ? '#0044aa' : '#002244'}
              emissiveIntensity={0.8}
            />
          </mesh>
          {/* Chair */}
          <mesh position={[0, -0.15, 0.8]} castShadow>
            <boxGeometry args={[0.7, 0.06, 0.7]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.8} />
          </mesh>
        </group>
      ))}
      {/* Coffee bar */}
      <group position={[0, -0.3, -4]}>
        <mesh castShadow>
          <boxGeometry args={[3, 1.2, 0.6]} />
          <meshStandardMaterial color="#0f0c06" metalness={0.3} roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.65, 0]}>
          <boxGeometry args={[3.1, 0.06, 0.7]} />
          <meshStandardMaterial color="#c9a96e" metalness={0.6} roughness={0.2} />
        </mesh>
        <pointLight position={[0, 0.5, 0.5]} intensity={1.5} color="#ffd580" distance={8} />
      </group>
      <Sparkles count={30} scale={[10, 4, 8]} size={1} speed={0.1} color="#c9a96e" opacity={0.4} />
      <pointLight position={[0, 3, 0]} intensity={1.5} color="#ffd580" distance={20} />
      <pointLight position={[-4, 2, 0]} intensity={0.5} color="#80aaff" distance={10} />
    </group>
  );
}

export default function FacilityScene({ type = 'pool' }: { type?: 'pool' | 'gym' | 'cowork' }) {
  return (
    <Canvas
      camera={{ position: [0, 3, 10], fov: 60 }}
      shadows
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 0.8,
      }}
      dpr={[1, 1.5]}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.1} />
        {type === 'pool' && <InfinityPool />}
        {type === 'gym' && <GymScene />}
        {type === 'cowork' && <CoworkScene />}
        <fog attach="fog" args={['#050508', 15, 50]} />
        <Environment preset="night" />
      </Suspense>
    </Canvas>
  );
}

'use client';

import { useRef, Suspense, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Environment,
  Float,
  MeshReflectorMaterial,
  OrbitControls,
  Sparkles,
} from '@react-three/drei';
import * as THREE from 'three';
import { RoomStyle, LightingMood } from '../../types';

const STYLE_COLORS: Record<string, { wall: string; accent: string; fabric: string }> = {
  'japandi': { wall: '#1a1812', accent: '#8b7355', fabric: '#2a2420' },
  'luxury-modern': { wall: '#0f0f1a', accent: '#c9a96e', fabric: '#1a1520' },
  'industrial': { wall: '#141414', accent: '#808080', fabric: '#1f1f1f' },
  'futuristic': { wall: '#050518', accent: '#00d4ff', fabric: '#0a0a20' },
};

const MOOD_LIGHT: Record<string, { color: string; intensity: number }> = {
  'warm':     { color: '#ffd580', intensity: 1.2 },
  'cool':     { color: '#80b0ff', intensity: 0.8 },
  'dramatic': { color: '#ff4466', intensity: 1.8 },
  'soft':     { color: '#ffe8cc', intensity: 0.6 },
  // legacy aliases
  'dim':      { color: '#ff8040', intensity: 0.4 },
  'bright':   { color: '#ffffff', intensity: 2.0 },
};

function Bed({ colors }: { colors: typeof STYLE_COLORS[string] }) {
  return (
    <group position={[0, -0.8, -2]}>
      {/* Frame */}
      <mesh castShadow>
        <boxGeometry args={[3.2, 0.3, 2.2]} />
        <meshStandardMaterial color={colors.accent} metalness={0.4} roughness={0.6} />
      </mesh>
      {/* Mattress */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <boxGeometry args={[3, 0.3, 2]} />
        <meshStandardMaterial color="#f0ece4" roughness={0.9} />
      </mesh>
      {/* Pillow x2 */}
      <mesh position={[-0.7, 0.5, -0.7]} castShadow>
        <boxGeometry args={[1, 0.15, 0.5]} />
        <meshStandardMaterial color="#ffffff" roughness={1} />
      </mesh>
      <mesh position={[0.7, 0.5, -0.7]} castShadow>
        <boxGeometry args={[1, 0.15, 0.5]} />
        <meshStandardMaterial color="#ffffff" roughness={1} />
      </mesh>
      {/* Duvet */}
      <mesh position={[0, 0.45, 0.2]} castShadow>
        <boxGeometry args={[3, 0.12, 1.5]} />
        <meshStandardMaterial color={colors.fabric} roughness={0.95} />
      </mesh>
      {/* Headboard */}
      <mesh position={[0, 0.8, -1.1]} castShadow>
        <boxGeometry args={[3.2, 1.4, 0.1]} />
        <meshStandardMaterial color={colors.accent} metalness={0.3} roughness={0.5} />
      </mesh>
    </group>
  );
}

function CityWindow({ curtainOpen }: { curtainOpen: boolean }) {
  const cityLights = Array.from({ length: 20 }, (_, i) => ({
    x: (Math.random() - 0.5) * 8,
    y: (Math.random() - 0.5) * 4,
    color: Math.random() > 0.5 ? '#ffd580' : '#80aaff',
  }));

  return (
    <group position={[0, 0.5, -4.9]}>
      {/* Window frame */}
      <mesh>
        <boxGeometry args={[5, 4, 0.1]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Glass */}
      <mesh position={[0, 0, 0.06]}>
        <boxGeometry args={[4.6, 3.6, 0.02]} />
        <meshStandardMaterial color="#102040" transparent opacity={0.3} metalness={0.9} roughness={0} />
      </mesh>
      {/* City lights behind */}
      {cityLights.map((l, i) => (
        <pointLight key={i} position={[l.x, l.y, -1]} intensity={0.3} color={l.color} distance={5} />
      ))}
      {/* Curtains */}
      {!curtainOpen && (
        <>
          <mesh position={[-2, 0, 0.1]} castShadow>
            <boxGeometry args={[0.8, 4, 0.05]} />
            <meshStandardMaterial color="#2a2020" roughness={0.95} />
          </mesh>
          <mesh position={[2, 0, 0.1]} castShadow>
            <boxGeometry args={[0.8, 4, 0.05]} />
            <meshStandardMaterial color="#2a2020" roughness={0.95} />
          </mesh>
        </>
      )}
    </group>
  );
}

function Desk({ colors }: { colors: typeof STYLE_COLORS[string] }) {
  return (
    <group position={[3.5, -0.5, -1]}>
      <mesh castShadow>
        <boxGeometry args={[1.5, 0.06, 0.8]} />
        <meshStandardMaterial color={colors.accent} metalness={0.3} roughness={0.5} />
      </mesh>
      {[-0.6, 0.6].map((x, i) => (
        <mesh key={i} position={[x, -0.35, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.7, 8]} />
          <meshStandardMaterial color="#888" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}
      {/* Monitor */}
      <mesh position={[0, 0.35, -0.2]} castShadow>
        <boxGeometry args={[0.8, 0.5, 0.04]} />
        <meshStandardMaterial color="#111" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.35, -0.18]}>
        <boxGeometry args={[0.74, 0.44, 0.01]} />
        <meshStandardMaterial color="#001433" emissive="#002266" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

function SceneContent({
  roomStyle = 'luxury-modern',
  lightingMood = 'warm',
  curtainOpen = true,
}: {
  roomStyle?: string;
  lightingMood?: string;
  curtainOpen?: boolean;
}) {
  const colors = STYLE_COLORS[roomStyle] || STYLE_COLORS['luxury-modern'];
  const mood = MOOD_LIGHT[lightingMood] || MOOD_LIGHT['warm'];

  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 3, 0]} intensity={mood.intensity} color={mood.color} distance={20} />
      <pointLight position={[-3, 2, 3]} intensity={0.5} color={mood.color} distance={10} />
      <pointLight position={[3, 1, -3]} intensity={0.3} color="#4466ff" distance={10} />

      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
        <planeGeometry args={[12, 10]} />
        <MeshReflectorMaterial
          blur={[200, 100]}
          resolution={512}
          mixBlur={0.7}
          mixStrength={30}
          roughness={0.6}
          depthScale={1}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color={colors.wall}
          metalness={0.2}
          mirror={0}
        />
      </mesh>

      {/* Walls */}
      <mesh position={[0, 1, -5]} receiveShadow>
        <boxGeometry args={[12, 6, 0.1]} />
        <meshStandardMaterial color={colors.wall} roughness={0.8} />
      </mesh>
      <mesh position={[-6, 1, 0]} receiveShadow>
        <boxGeometry args={[0.1, 6, 10]} />
        <meshStandardMaterial color={colors.wall} roughness={0.8} />
      </mesh>
      <mesh position={[6, 1, 0]} receiveShadow>
        <boxGeometry args={[0.1, 6, 10]} />
        <meshStandardMaterial color={colors.wall} roughness={0.8} />
      </mesh>
      {/* Ceiling */}
      <mesh position={[0, 3, 0]}>
        <boxGeometry args={[12, 0.1, 10]} />
        <meshStandardMaterial color={colors.wall} roughness={0.9} />
      </mesh>

      <CityWindow curtainOpen={curtainOpen} />
      <Bed colors={colors} />
      <Desk colors={colors} />

      {lightingMood === 'warm' && (
        <Sparkles count={20} scale={[8, 4, 6]} size={1} speed={0.1} color={mood.color} opacity={0.3} />
      )}

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.8}
        minAzimuthAngle={-Math.PI / 4}
        maxAzimuthAngle={Math.PI / 4}
        autoRotate
        autoRotateSpeed={0.3}
      />
      <Environment preset="night" />
    </>
  );
}

interface RoomSceneProps {
  // Names used by RoomSection
  roomStyle?: string;
  lightingMood?: string;
  curtainOpen?: boolean;
  lightOn?: boolean;
  // Names used by ConfiguratorSection
  style?: string;
  lighting?: string;
  timeOfDay?: string;
  curtainsOpen?: boolean;
  lightsOn?: boolean;
}

export default function RoomScene(props: RoomSceneProps) {
  // Resolve prop names from either naming convention
  const roomStyle   = props.roomStyle   ?? props.style   ?? 'luxury-modern';
  const lightingMood = props.lightingMood ?? props.lighting ?? 'warm';
  const curtainOpen  = props.curtainsOpen ?? props.curtainOpen ?? true;

  return (
    <Canvas
      camera={{ position: [3, 1.5, 5], fov: 55 }}
      shadows
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 0.8,
      }}
      dpr={[1, 1.5]}
    >
      <Suspense fallback={null}>
        <SceneContent
          roomStyle={roomStyle}
          lightingMood={lightingMood}
          curtainOpen={curtainOpen}
        />
      </Suspense>
    </Canvas>
  );
}

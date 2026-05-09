'use client';

import dynamic from 'next/dynamic';
import { useState, Suspense } from 'react';
import { useScrollProgress, useMousePosition, useLenis } from './hooks';

import LoadingScreen from './components/ui/LoadingScreen';
import CustomCursor from './components/ui/CustomCursor';
import Navigation from './components/ui/Navigation';
import SectionMinimap from './components/ui/SectionMinimap';
import AIConcierge from './components/ui/AIConcierge';
import Footer from './components/ui/Footer';

const HeroSection       = dynamic(() => import('./components/ui/HeroSection'),       { ssr: false });
const LobbySection      = dynamic(() => import('./components/ui/LobbySection'),      { ssr: false });
const ElevatorSection   = dynamic(() => import('./components/ui/ElevatorSection'),   { ssr: false });
const RoomSection       = dynamic(() => import('./components/ui/RoomSection'),       { ssr: false });
const BalconySection    = dynamic(() => import('./components/ui/BalconySection'),    { ssr: false });
const FacilitiesSection = dynamic(() => import('./components/ui/FacilitiesSection'), { ssr: false });
const ConfiguratorSection = dynamic(() => import('./components/ui/ConfiguratorSection'), { ssr: false });
const GallerySection    = dynamic(() => import('./components/ui/GallerySection'),    { ssr: false });
const BookingSection    = dynamic(() => import('./components/ui/BookingSection'),    { ssr: false });

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const scrollProgress = useScrollProgress();
  const { x: mouseX, y: mouseY } = useMousePosition();

  useLenis();

  return (
    <>
      <LoadingScreen onComplete={() => setIsLoaded(true)} />

      {isLoaded && (
        <>
          <CustomCursor />
          <Navigation
            scrollProgress={scrollProgress.progress}
            muted={isMuted}
            onToggleMute={() => setIsMuted(m => !m)}
          />
          <SectionMinimap
            currentSection={scrollProgress.section}
            onNavigate={() => {}}
          />
          <AIConcierge />
        </>
      )}

      <main className="relative bg-[#080808] overflow-x-hidden">
        <Suspense fallback={<div className="h-screen bg-[#080808]" />}>
          <HeroSection mouseX={mouseX} mouseY={mouseY} />
        </Suspense>
        <Suspense fallback={<div className="h-screen bg-[#080808]" />}>
          <LobbySection />
        </Suspense>
        <Suspense fallback={<div className="h-[60vh] bg-[#080808]" />}>
          <ElevatorSection />
        </Suspense>
        <Suspense fallback={<div className="h-screen bg-[#080808]" />}>
          <RoomSection />
        </Suspense>
        <Suspense fallback={<div className="h-screen bg-[#080808]" />}>
          <BalconySection />
        </Suspense>
        <Suspense fallback={<div className="h-screen bg-[#080808]" />}>
          <FacilitiesSection />
        </Suspense>
        <Suspense fallback={<div className="h-screen bg-[#080808]" />}>
          <ConfiguratorSection />
        </Suspense>
        <Suspense fallback={<div className="h-screen bg-[#080808]" />}>
          <GallerySection />
        </Suspense>
        <Suspense fallback={<div className="h-[60vh] bg-[#080808]" />}>
          <BookingSection />
        </Suspense>
        <Footer />
      </main>
    </>
  );
}
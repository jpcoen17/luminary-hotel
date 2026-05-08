'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect, Suspense } from 'react';
import { useScrollProgress, useMousePosition, useLenis } from './hooks';

// UI Components
import LoadingScreen from './components/ui/LoadingScreen';
import CustomCursor from './components/ui/CustomCursor';
import Navigation from './components/ui/Navigation';
import SectionMinimap from './components/ui/SectionMinimap';
import AIConcierge from './components/ui/AIConcierge';
import Footer from './components/ui/Footer';

// Sections (lazy-loaded)
const HeroSection = dynamic(() => import('./components/ui/HeroSection'), { ssr: false });
const LobbySection = dynamic(() => import('./components/ui/LobbySection'), { ssr: false });
const ElevatorSection = dynamic(() => import('./components/ui/ElevatorSection'), { ssr: false });
const RoomSection = dynamic(() => import('./components/ui/RoomSection'), { ssr: false });
const BalconySection = dynamic(() => import('./components/ui/BalconySection'), { ssr: false });
const FacilitiesSection = dynamic(() => import('./components/ui/FacilitiesSection'), { ssr: false });
const ConfiguratorSection = dynamic(() => import('./components/ui/ConfiguratorSection'), { ssr: false });
const GallerySection = dynamic(() => import('./components/ui/GallerySection'), { ssr: false });
const BookingSection = dynamic(() => import('./components/ui/BookingSection'), { ssr: false });

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const scrollProgress = useScrollProgress();
  const { x: mouseX, y: mouseY } = useMousePosition();

  useLenis();

  useEffect(() => {
    // Simulate cinematic loading
    const timer = setTimeout(() => setIsLoaded(true), 3200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen />

      {isLoaded && (
        <>
          <CustomCursor />
          <Navigation scrollProgress={scrollProgress.progress} muted={isMuted} onToggleMute={() => setIsMuted(m => !m)} />
          <SectionMinimap currentSection={scrollProgress.section} onNavigate={() => {}} />
          <AIConcierge />
        </>
      )}

      <main className="relative bg-[#080808] overflow-x-hidden">
        {/* Hero */}
        <Suspense fallback={<div className="h-screen bg-[#080808]" />}>
          <HeroSection mouseX={mouseX} mouseY={mouseY} />
        </Suspense>

        {/* Lobby */}
        <Suspense fallback={<div className="h-screen bg-[#080808]" />}>
          <LobbySection />
        </Suspense>

        {/* Elevator transition */}
        <Suspense fallback={<div className="h-[60vh] bg-[#080808]" />}>
          <ElevatorSection />
        </Suspense>

        {/* Room showcase */}
        <Suspense fallback={<div className="h-screen bg-[#080808]" />}>
          <RoomSection />
        </Suspense>

        {/* Balcony */}
        <Suspense fallback={<div className="h-screen bg-[#080808]" />}>
          <BalconySection />
        </Suspense>

        {/* Facilities */}
        <Suspense fallback={<div className="h-screen bg-[#080808]" />}>
          <FacilitiesSection />
        </Suspense>

        {/* Room Configurator */}
        <Suspense fallback={<div className="h-screen bg-[#080808]" />}>
          <ConfiguratorSection />
        </Suspense>

        {/* Gallery */}
        <Suspense fallback={<div className="h-screen bg-[#080808]" />}>
          <GallerySection />
        </Suspense>

        {/* Booking */}
        <Suspense fallback={<div className="h-[60vh] bg-[#080808]" />}>
          <BookingSection />
        </Suspense>

        <Footer />
      </main>
    </>
  );
}

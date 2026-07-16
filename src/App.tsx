import React, { useState, lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import CustomCursor from './components/ui/CustomCursor';
import { ScanLines, NoiseOverlay, MouseSpotlight } from './components/ui/ScanLines';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LoadingScreen from './sections/LoadingScreen';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import UpcomingProjects from './sections/UpcomingProjects';
import Technologies from './sections/Technologies';
import Process from './sections/Process';
import Verticals from './sections/Verticals';
import Experience from './sections/Experience';
import GitHub from './sections/GitHub';
import Contact from './sections/Contact';
import SocialMedia from './sections/SocialMedia';

// Lazy load the heavy R3F scene
const Scene = lazy(() => import('./components/three/Scene'));

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Initialize Lenis smooth scroll
  useSmoothScroll();

  return (
    <>
      {/* === Loading Screen === */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* === Custom Cursor === */}
      <CustomCursor />

      {/* === Global Overlays === */}
      <ScanLines />
      <NoiseOverlay />
      <MouseSpotlight />

      {/* === 3D Background (lazy) === */}
      {!isLoading && (
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      )}

      {/* === Main Content === */}
      {!isLoading && (
        <div className="relative z-[5]">
          <Navbar />

          <main>
            <Hero />
            <About />
            <Projects />
            <UpcomingProjects />
            <Technologies />
            <Process />
            <Verticals />
            <Experience />
            <GitHub />
            <Contact />
            <SocialMedia />
          </main>

          <Footer />
        </div>
      )}
    </>
  );
}

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './components/Navigation';
import HeroSection from './sections/HeroSection';
import VerifySection from './sections/VerifySection';
import HowItWorksSection from './sections/HowItWorksSection';
import ListingsSection from './sections/ListingsSection';
import PartnersSection from './sections/PartnersSection';
import ReportsSection from './sections/ReportsSection';
import CoverageSection from './sections/CoverageSection';
import ContactSection from './sections/ContactSection';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Global scroll snap for pinned sections
    const setupGlobalSnap = () => {
      const pinned = ScrollTrigger.getAll()
        .filter((st) => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map((st) => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(
              (r) => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            if (!inPinned) return value;

            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    };

    // Delay to allow all section ScrollTriggers to initialize
    const timer = setTimeout(setupGlobalSnap, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative bg-background min-h-screen">
      {/* Grain Overlay */}
      <div className="grain-overlay" />
      
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative">
        {/* Section 1: Hero */}
        <HeroSection />
        
        {/* Section 2: Verify Panel */}
        <VerifySection />
        
        {/* Section 3: How It Works */}
        <HowItWorksSection />
        
        {/* Section 4: Compare Properties */}
        <ListingsSection />
        
        {/* Section 5: Inspectors & Partners */}
        <PartnersSection />
        
        {/* Section 6: Deep-Dive Reports */}
        <ReportsSection />
        
        {/* Section 7: Coverage Map */}
        <CoverageSection />
        
        {/* Section 8: Contact */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;

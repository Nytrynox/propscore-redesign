import { useRef, useLayoutEffect } from 'react';
import { Compass, Navigation, Crosshair } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CoverageSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const pinsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // 3D Map Tilt & Pan
      gsap.fromTo(mapContainerRef.current,
        { rotateX: 20, rotateY: -10, scale: 0.9 },
        {
          rotateX: 0,
          rotateY: 10,
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          }
        }
      );

      // Floating Pins Parallax (Z-Axis Separation simulation via faster Y movement)
      const pins = pinsRef.current?.children;
      if (pins) {
         Array.from(pins).forEach((pin, i) => {
            gsap.fromTo(pin, 
               { y: 0 },
               { 
                  y: -150 * (i + 1), // Different speeds for depth
                  ease: 'none',
                  scrollTrigger: {
                     trigger: sectionRef.current,
                     start: 'top bottom',
                     end: 'bottom top',
                     scrub: 1,
                  }
               }
            );
         });
      }

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const coverage = [
    { city: 'Mumbai', zones: 'West, Central, Navi', score: 'A+' },
    { city: 'Hyderabad', zones: 'Gachibowli, HITEC', score: 'B+' },
    { city: 'Pune', zones: 'Hinjewadi, Viman Nagar', score: 'A' },
  ];

  return (
    <section ref={sectionRef} id="coverage" className="relative w-full bg-[#F9F9F7] py-40 overflow-hidden perspective-[1500px]">
      
      <div className="max-w-7xl mx-auto px-6 relative z-20">
        
        <div className="grid grid-cols-12 gap-16 items-center">
          
          {/* Left Column: 3D Holographic Map */}
          <div className="col-span-12 lg:col-span-7 relative flex justify-center py-20 perspective-[2000px]">
             
             {/* The Map Base Plate */}
             <div 
              ref={mapContainerRef}
              className="relative w-full max-w-xl aspect-[4/3] bg-white border border-black/5 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] rounded-sm transform-style-3d will-change-transform"
             >
                <div className="w-full h-full overflow-hidden relative">
                   <img src="/map-city.jpg" alt="Territory Map" className="w-full h-full object-cover grayscale opacity-30" />
                   
                   {/* Grid Overlay */}
                   <div style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)' }} className="absolute inset-0 bg-[length:20px_20px] opacity-10" />
                </div>

                {/* Floating Pins Layer (Parallaxed) */}
                <div ref={pinsRef} className="absolute inset-0 pointer-events-none z-20">
                   {/* Pin 1 */}
                   <div className="absolute top-[30%] left-[30%] flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full border border-primary/50 flex items-center justify-center animate-pulse">
                         <div className="w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_#F5C518]" />
                      </div>
                      <div className="h-20 w-[1px] bg-gradient-to-b from-primary to-transparent" />
                      <div className="px-3 py-1 bg-black text-white text-[8px] font-black uppercase tracking-widest mt-2">MUM_South</div>
                   </div>

                   {/* Pin 2 */}
                   <div className="absolute top-[50%] right-[20%] flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full border border-black/20 flex items-center justify-center">
                          <Crosshair className="w-4 h-4 text-black/40" />
                      </div>
                      <div className="h-12 w-[1px] bg-gradient-to-b from-black/20 to-transparent" />
                      <div className="px-3 py-1 bg-white border border-black/10 text-black text-[8px] font-black uppercase tracking-widest mt-2">PUN_North</div>
                   </div>
                </div>

                {/* Compass HUD */}
                <div className="absolute bottom-6 right-6 p-4 border border-black/10 rounded-full">
                   <Compass className="w-8 h-8 text-black/20 animate-spin-slow" />
                </div>
             </div>
          </div>

          {/* Right Column: Content */}
          <div className="col-span-12 lg:col-span-5 space-y-12 pl-12">
            <div className="flex items-center gap-4">
              <span className="w-12 h-[1px] bg-primary" />
              <p className="text-[10px] font-black uppercase tracking-[0.6em] text-black">ZONE EXPANSION</p>
            </div>

            <h2 className="text-7xl lg:text-9xl font-bold text-black tracking-tighter leading-[0.8]">
              Territory <br /> <span className="text-black/10 italic">Map.</span>
            </h2>

            <div className="space-y-8">
               {coverage.map((c, i) => (
                 <div key={i} className="group border-b border-black/5 pb-6 last:border-0 hover:border-primary transition-colors cursor-crosshair">
                   <div className="flex justify-between items-end mb-2">
                      <h4 className="text-2xl font-bold text-black">{c.city}</h4>
                      <span className="font-mono text-xs text-primary">{c.score} VERIFIED</span>
                   </div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">{c.zones}</p>
                 </div>
               ))}
            </div>

            <button className="flex items-center gap-4 group">
              <span className="text-xs font-black uppercase tracking-[0.3em] border-b-2 border-primary pb-1 group-hover:border-black transition-all">Verify Your Zone</span>
              <Navigation className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default CoverageSection;

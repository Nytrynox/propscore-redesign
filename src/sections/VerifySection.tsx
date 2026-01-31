import { useRef, useLayoutEffect } from 'react';
import { Fingerprint } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// ... other imports ... 

const VerifySection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Keep existing animations but adjust triggers if needed for compactness
      // ... (animations remain similar but with shorter scrub distances) ...
      
       // SVG Path Animation (Drawing Effect)
      const paths = svgRef.current?.querySelectorAll('path, circle');
      if (paths) {
        gsap.set(paths, { strokeDasharray: 1000, strokeDashoffset: 1000 });
        gsap.to(paths, {
          strokeDashoffset: 0,
          duration: 3,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 50%', // Trigger earlier
            end: 'bottom 20%',
            scrub: 1,
          }
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    // REDUCED PADDING HERE: py-40 -> py-20
    <section
      ref={containerRef}
      id="verify"
      className="relative w-full py-20 lg:py-24 overflow-hidden bg-[#F9F9F7]"
    >
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply" 
           style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/natural-paper.png")' }} />

      {/* SVG Drafting Layer (Human Annotations) */}
      <svg 
        ref={svgRef}
        className="absolute inset-0 w-full h-full z-10 pointer-events-none opacity-40"
        viewBox="0 0 1440 900" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M500 150 Q700 120 900 300" stroke="#000" strokeWidth="0.5" strokeDasharray="3 6" />
        <circle cx="1050" cy="450" r="120" stroke="#F5C518" strokeWidth="2" opacity="0.6" />
        <path d="M1050 450 L1200 600" stroke="#F5C518" strokeWidth="1" strokeDasharray="5 5" />
        
        {/* Drafting "X" Marks */}
        <path d="M980 400 L1020 440" stroke="#000" strokeWidth="0.5" />
        <path d="M1020 400 L980 440" stroke="#000" strokeWidth="0.5" />
      </svg>

      {/* Compact Main Layout */}
      <div className="relative z-20 max-w-7xl mx-auto px-6">
        {/* Reduce Grid Gap: gap-16 -> gap-8 */}
        <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Content */}
          <div ref={contentRef} className="col-span-12 lg:col-span-5 space-y-8 order-2 lg:order-1"> {/* Reduced space-y */}
            <div className="flex items-center gap-4">
               <span className="w-12 h-[1px] bg-black" />
               <p className="text-[10px] font-black uppercase tracking-[0.6em] text-black">VERIFICATION 2.0</p>
            </div>
            
            <h2 className="text-5xl lg:text-7xl font-serif italic text-black leading-[0.9]">
              The <span className="not-italic font-black tracking-tighter">Human</span> <br /> 
              Factor.
            </h2>

            <p className="text-lg text-gray-500 font-light leading-relaxed">
               We believe algorithms are only as good as the hands that build them. That's why every PropScore audit starts with a physical, human inspection.
               <strong className="block text-black font-bold mt-2">No AI hallucination. Just raw, verified structural reality.</strong>
            </p>

            {/* Signature Block */}
            <div className="pt-8 border-t border-black/5 flex items-center justify-between opacity-80">
              <div className="space-y-1">
                <p className="text-[8px] font-bold uppercase tracking-widest text-black/30">Verified By</p>
                <p className="text-3xl font-serif italic text-black/60 pt-1 select-none">Alexander Rossi</p>
              </div>
              <div className="relative">
                <div className="w-14 h-14 rounded-full border border-black/10 flex items-center justify-center rotate-12">
                   <Fingerprint className="w-6 h-6 text-black/10" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[8px] font-bold text-black/20 tracking-tighter -rotate-12">VERIFIED</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Physical Prints (Compact Height) */}
          <div className="col-span-12 lg:col-span-7 relative flex justify-center items-center h-[500px] lg:h-auto order-1 lg:order-2"> {/* Reduced height */}
            
            <div 
              ref={mainImageRef}
              className="relative w-full max-w-md aspect-[4/5] bg-white p-4 shadow-2xl rounded-sm border border-black/5 z-20 rotate-1"
            >
              <div className="w-full h-full overflow-hidden relative group">
                {/* Full Color Image as Requested */}
                <img 
                  src="/process-inspect.jpg" 
                  alt="Inspection" 
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />
              </div>
              
              {/* Scale Label */}
              <div className="absolute bottom-6 right-6 bg-black/80 backdrop-blur text-white px-2 py-1 text-[8px] font-mono tracking-widest">
                 SCALE 1:50
              </div>
            </div>

            {/* Polaroid Detail */}
            <div className="absolute -left-4 bottom-10 w-40 aspect-[3/4] bg-white p-3 pb-8 shadow-xl z-30 -rotate-6 hover:rotate-0 transition-transform duration-300">
               <div className="w-full h-full bg-gray-100 overflow-hidden">
                  <img src="/listing-thumb-01.jpg" className="w-full h-full object-cover" />
               </div>
               <p className="absolute bottom-2 left-0 right-0 text-center text-[8px] font-handwriting text-black/60">Site Visit #4</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default VerifySection;

import { useRef, useLayoutEffect } from 'react';
import { FileText, Camera, ShieldCheck, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ReportsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const folderRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const stampRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // 3D Folder Opening Animation
      gsap.set(flapRef.current, { transformOrigin: 'top center' });
      gsap.fromTo(flapRef.current, 
        { rotateX: -180, opacity: 0 },
        {
           rotateX: 0,
           opacity: 1,
           duration: 1.5,
           ease: 'power2.inOut',
           scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              end: 'bottom 80%',
              scrub: 1,
           }
        }
      );

      // Physics Stamp Slam
      gsap.fromTo(stampRef.current, 
        { scale: 5, opacity: 0, z: 500, rotate: 45 },
        { 
          scale: 1, 
          opacity: 0.8, 
          z: 0, 
          rotate: -15, 
          duration: 0.6, 
          ease: 'bounce.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'center 60%',
          }
        }
      );

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const reportFeatures = [
    { icon: FileText, label: 'Structural' },
    { icon: FileText, label: 'MEP Integrity' },
    { icon: Camera, label: 'Verification Photos' },
    { icon: ShieldCheck, label: 'Sustainability Audit' },
  ];

  return (
    <section ref={sectionRef} id="reports" className="relative w-full bg-[#F9F9F7] py-40 overflow-hidden perspective-[2000px]">
      
      {/* Background Aesthetic Text - Deep Parallax */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-black text-black/[0.015] leading-none pointer-events-none select-none italic uppercase">
        ARCHIVE
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-20">
        
        <div className="grid grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Content */}
          <div className="col-span-12 lg:col-span-6 space-y-12">
            <div className="flex items-center gap-4">
              <span className="w-12 h-[1px] bg-primary" />
              <p className="text-[10px] font-black uppercase tracking-[0.6em] text-black">FILE STORAGE</p>
            </div>

            <h2 className="text-7xl lg:text-9xl font-bold text-black tracking-tighter leading-[0.8] mix-blend-multiply">
              The <br /> <span className="text-black/10 italic">Dossier.</span>
            </h2>

            <p className="max-w-md text-gray-500 text-2xl leading-relaxed font-light italic">
              Every property audit is a unique anthology of technical truth. Encapsulated in a versioned, immutable digital file.
            </p>

            <div className="grid grid-cols-2 gap-8 pt-8">
              {reportFeatures.map((f, i) => (
                <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-black">{f.label}</span>
                </div>
              ))}
            </div>

            <button className="flex items-center gap-4 group pt-8">
              <span className="text-xs font-black uppercase tracking-[0.3em] border-b-2 border-primary pb-1 group-hover:border-black transition-all">Download Sample Dossier</span>
              <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center transition-transform group-hover:rotate-45 block bg-white">
                 <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>

          {/* Right Column: 3D Folder Element */}
          <div ref={folderRef} className="col-span-12 lg:col-span-6 relative h-[600px] flex items-center justify-center perspective-[1000px]">
             
             {/* The Back Folder Plate */}
             <div className="absolute w-[80%] aspect-[4/5] bg-[#dcd0bb] rounded-r-2xl border-l-4 border-black/5 shadow-2xl transform rotate-y-12 translate-x-10">
                {/* Folder Tab */}
                <div className="absolute -top-8 right-0 w-32 h-10 bg-[#dcd0bb] rounded-t-xl opacity-90" />
                
                {/* Papers Inside */}
                <div className="absolute inset-4 bg-white shadow-sm rotate-1 flex flex-col p-8 gap-4">
                    <div className="w-full h-32 bg-gray-50 mb-4 overflow-hidden relative grayscale opacity-50">
                        <img src="/reports-blueprint.jpg" className="object-cover w-full h-full" alt="Report Header" />
                    </div>
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="w-full h-2 bg-black/5" style={{ width: `${Math.random() * 40 + 60}%`}} />
                    ))}
                </div>
             </div>

             {/* The Front Flap (Animated) */}
             <div 
                ref={flapRef}
                className="absolute w-[82%] aspect-[4/5] bg-[#E8DCC4] rounded-r-2xl border border-black/5 shadow-[20px_0_40px_rgba(0,0,0,0.1)] origin-left flex items-center justify-center"
             >
                <div className="text-center opacity-40 mix-blend-multiply">
                    <ShieldCheck className="w-20 h-20 mx-auto mb-4 text-black/20" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-black/40">CONFIDENTIAL</p>
                </div>

                {/* The Stamp (Slam Animation) */}
                <div 
                    ref={stampRef}
                    className="absolute bottom-10 right-10 border-4 border-primary/50 p-4 rotate-[-15deg] backdrop-blur-sm bg-white/10"
                >
                    <p className="text-xl font-black text-primary/80 uppercase tracking-tight">VERIFIED</p>
                </div>
             </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default ReportsSection;

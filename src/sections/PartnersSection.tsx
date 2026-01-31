import { useRef, useLayoutEffect } from 'react';
import { Shield, Award, CheckCircle, Boxes } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const partners = [
  { name: 'National Real Estate Council', icon: Shield, id: 'ID_882' },
  { name: 'Architectural Institute of India', icon: Award, id: 'ID_912' },
  { name: 'Bureau of Property Standards', icon: CheckCircle, id: 'ID_445' },
  { name: 'Standardization Alliance', icon: Boxes, id: 'ID_102' },
];

const PartnersSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 3D Monolith Tilt
      gsap.fromTo(gridRef.current,
        { rotateX: 30, opacity: 0, scale: 0.9, y: 100 },
        {
          rotateX: 0,
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'top 20%',
            scrub: 1,
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      gsap.to(e.currentTarget, {
          z: 50,
          scale: 1.05,
          boxShadow: '0 30px 60px rgba(0,0,0,0.1)',
          duration: 0.4,
          ease: 'power2.out'
      });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      gsap.to(e.currentTarget, {
          z: 0,
          scale: 1,
          boxShadow: 'none',
          duration: 0.4,
          ease: 'power2.out'
      });
  };

  return (
    <section ref={sectionRef} id="partners" className="relative w-full bg-[#F9F9F7] py-40 overflow-hidden perspective-[1500px]">
      <div className="max-w-7xl mx-auto px-6 relative z-20">
        
        {/* Section Header */}
        <div className="mb-24 text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="w-12 h-[1px] bg-primary" />
            <p className="text-[10px] font-black uppercase tracking-[0.6em] text-black">STRATEGIC ALLIANCE</p>
            <span className="w-12 h-[1px] bg-primary" />
          </div>
          <h2 className="text-7xl lg:text-9xl font-bold text-black tracking-tighter leading-[0.8]">
            The Board of <br /> <span className="text-black/10 italic">Quality.</span>
          </h2>
        </div>

        {/* 3D Partners Grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-l border-t border-black/5 transform-style-3d will-change-transform"
        >
          {partners.map((p, i) => (
            <div 
              key={i} 
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="partner-cell aspect-square flex flex-col items-center justify-center p-12 border-r border-b border-black/5 bg-[#F9F9F7] hover:bg-white transition-colors duration-300 cursor-default relative transform-gpu"
            >
               <div className="relative mb-8 pointer-events-none">
                  <p className="absolute -top-6 left-1/2 -translate-x-1/2 text-[8px] font-mono text-black/20 tracking-widest">{p.id}</p>
                  <p.icon className="w-12 h-12 text-black/10 group-hover:text-primary transition-colors duration-500" />
                  <div className="absolute -inset-4 border border-black/[0.03] rounded-full scale-0 group-hover:scale-100 transition-transform duration-700" />
               </div>
               <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-center text-black/40 group-hover:text-black transition-colors leading-relaxed pointer-events-none">
                  {p.name}
               </h4>
            </div>
          ))}
        </div>

        {/* Deep Parallax Background Text */}
        <div className="absolute bottom-[-10%] left-0 w-full text-center text-[15rem] font-black text-black/[0.02] leading-none pointer-events-none select-none uppercase italic">
          AUDIT_BOARD
        </div>

      </div>
    </section>
  );
};

export default PartnersSection;

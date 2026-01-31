import { useRef, useLayoutEffect } from 'react';
import { ArrowRight, Star, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ListingsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
       const items = gridRef.current?.children;
       if (items) {
          gsap.from(items, {
             y: 50,
             opacity: 0,
             duration: 1.2,
             stagger: 0.1,
             ease: 'power3.out',
             scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 75%',
             }
          });
       }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="listings" className="relative w-full bg-[#F9F9F7] py-32 overflow-hidden border-b border-black/5">
      
      <div className="max-w-7xl mx-auto px-6 relative z-20">
        
        {/* Header */}
        <div className="mb-24">
            <h2 className="text-7xl lg:text-9xl font-black text-black tracking-tighter leading-none mb-6">
                Market <span className="text-black/10 italic">Bento.</span>
            </h2>
             <p className="max-w-2xl text-xl text-gray-500 font-light italic">
                Curated assets. Verified by hand.
            </p>
        </div>

        {/* HUMAN BENTO GRID LAYOUT */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[220px]">
            
            {/* 1. Large Feature Card (Span 2x2) - Editorial Style */}
            <div className="md:col-span-2 md:row-span-2 relative bg-white p-2 shadow-sm border border-black/5 group cursor-pointer hover:shadow-2xl transition-all duration-700">
                <div className="w-full h-full relative overflow-hidden">
                    <img src="/listing-featured.jpg" alt="Featured" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" />
                    <div className="absolute top-4 left-4 bg-white px-3 py-1 text-[10px] font-black uppercase tracking-widest text-black z-10 border border-black/10">
                        Editor's Choice
                    </div>
                    <div className="absolute bottom-0 w-full bg-white p-6 border-t border-black/5">
                        <h3 className="text-3xl font-bold text-black mb-1">Skyline Residence</h3>
                        <p className="text-gray-500 font-serif italic text-sm">Mumbai, Sector 04 • Verified Jan 12</p>
                    </div>
                </div>
            </div>

            {/* 2. Text Block (Span 1x1) - Manifesto */}
            <div className="bg-black p-8 flex flex-col justify-between group cursor-default">
                <p className="text-white/60 text-xs font-mono leading-relaxed">
                    "We don't trust algorithms with your home. We trust architects."
                </p>
                <div className="w-8 h-[1px] bg-white/20" />
            </div>

            {/* 3. Small Image (Span 1x1) - Polaroid */}
            <div className="relative bg-white p-3 shadow-sm border border-black/5 group cursor-pointer hover:-translate-y-2 transition-transform duration-500">
                <div className="w-full h-[80%] overflow-hidden bg-gray-100 mb-3">
                    <img src="/listing-thumb-01.jpg" alt="Thumb" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                </div>
                <div className="text-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-black">Pune, MH</span>
                </div>
            </div>

            {/* 4. Wide Text (Span 2x1) - Certification */}
            <div className="md:col-span-2 bg-white p-8 flex items-center justify-between border border-black/5 hover:border-black transition-colors duration-500 group cursor-default">
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-black" />
                        <span className="text-xs font-black uppercase tracking-widest text-black">100% Human Audit</span>
                    </div>
                    <p className="text-gray-500 font-light text-sm max-w-sm">
                        Every listing here has been physically walked, inspected, and signed off by a certified engineer.
                    </p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full border border-black flex items-center justify-center">
                        <ArrowRight className="w-4 h-4 text-black" />
                    </div>
                </div>
            </div>

            {/* 5. Tall Image (Span 1x2) - Portrait */}
            <div className="md:row-span-2 relative bg-white p-2 shadow-sm border border-black/5 group cursor-pointer">
                <div className="w-full h-full relative overflow-hidden">
                    <img src="/listing-thumb-02.jpg" alt="Tall" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110" />
                    <div className="absolute top-4 right-4 bg-black text-white px-2 py-1 flex items-center gap-1">
                        <span className="text-xs font-bold font-mono">4.9</span>
                        <Star className="w-2 h-2 text-white fill-white" />
                    </div>
                    <div className="absolute bottom-6 left-6">
                        <h3 className="text-white text-xl font-bold mix-blend-difference">The Grid Lofts</h3>
                        <p className="text-white/80 text-xs font-light mix-blend-difference">Hyderabad</p>
                    </div>
                </div>
            </div>

            {/* 6. Link Card (Span 1x1) - Action */}
            <div className="bg-[#F5C518] p-8 flex flex-col justify-between group cursor-pointer hover:bg-yellow-400 transition-colors">
                <h4 className="text-black font-black text-lg leading-tight uppercase tracking-tight">
                    View Full <br /> Archive
                </h4>
                <div className="self-end w-8 h-8 rounded-full bg-black flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-3 h-3 text-[#F5C518]" />
                </div>
            </div>

        </div>

      </div>
    </section>
  );
};

export default ListingsSection;

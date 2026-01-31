import { useRef, useLayoutEffect } from 'react';
import { Fingerprint } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const signatureRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
       // Huge Signature Reveal
       gsap.fromTo(signatureRef.current, 
         { y: -200, opacity: 0 },
         { 
            y: 0, 
            opacity: 1, 
            ease: 'none',
            scrollTrigger: {
               trigger: footerRef.current,
               start: 'top bottom',
               end: 'bottom bottom',
               scrub: 1,
            }
         }
       );
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} id="footer" className="relative w-full bg-[#F9F9F7] pt-40 pb-20 overflow-hidden border-t border-black/5 perspective-[1000px]">
      
      {/* Deep Background - Signature */}
      <div 
        ref={signatureRef}
        className="absolute top-0 left-1/2 -translate-x-1/2 text-[15rem] lg:text-[25rem] font-black text-black/[0.03] leading-none pointer-events-none select-none uppercase italic"
      >
        PROPSCORE
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-12 gap-16 mb-40">
          
          {/* Logo and Credo */}
          <div className="col-span-12 lg:col-span-6 space-y-8">
             <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-sm bg-black flex items-center justify-center text-primary shadow-xl">
                   <Fingerprint className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-[0.4em] text-black">PropScore</h3>
             </div>
             <p className="max-w-md text-xs font-bold uppercase tracking-[0.4em] text-black/40 leading-relaxed">
               Bespoke Property Intelligence. <br />
               Audit-Verified by Humans. <br />
               Established MMXXIV.
             </p>
          </div>

          {/* Links Grid */}
          <div className="col-span-12 lg:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-12">
             <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-black border-b border-black/10 pb-2 inline-block">Philosophy</h4>
                <ul className="space-y-3">
                   {['Our Origin', 'The Audit', 'Human-Made', 'Manifesto'].map(link => (
                     <li key={link}>
                        <a href="#" className="text-[10px] font-bold uppercase tracking-widest text-black/40 hover:text-black transition-colors">{link}</a>
                     </li>
                   ))}
                </ul>
             </div>
             <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-black border-b border-black/10 pb-2 inline-block">Architecture</h4>
                <ul className="space-y-3">
                   {['Case Studies', 'Methodology', 'API_v1.0', 'System Status'].map(link => (
                     <li key={link}>
                        <a href="#" className="text-[10px] font-bold uppercase tracking-widest text-black/40 hover:text-black transition-colors">{link}</a>
                     </li>
                   ))}
                </ul>
             </div>
             <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-black border-b border-black/10 pb-2 inline-block">Inquiry</h4>
                <ul className="space-y-3">
                   {['Instagram', 'Twitter', 'LinkedIn', 'Press Kit'].map(link => (
                     <li key={link}>
                        <a href="#" className="text-[10px] font-bold uppercase tracking-widest text-black/40 hover:text-black transition-colors">{link}</a>
                     </li>
                   ))}
                </ul>
             </div>
          </div>
        </div>

        {/* Final Signature Line */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 pt-20 border-t border-black/5 opacity-80 backdrop-blur-sm">
           <div className="flex items-center gap-8">
              <div className="flex flex-col gap-1">
                 <p className="text-[8px] font-black uppercase tracking-widest text-black/30">Release Phase</p>
                 <p className="text-xs font-bold text-black font-mono">STABLE_V1.03_HUMAN</p>
              </div>
              <div className="w-[1px] h-8 bg-black/10 hidden md:block" />
              <div className="flex flex-col gap-1">
                 <p className="text-[8px] font-black uppercase tracking-widest text-black/30">System Status</p>
                 <p className="text-xs font-bold text-green-600 font-mono flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse" />
                    OPERATIONAL
                 </p>
              </div>
           </div>

           <div className="flex flex-col items-center md:items-end gap-2">
              <p className="text-[8px] font-black uppercase tracking-widest text-black/30">Aesthetic Direction</p>
              <div className="flex items-center gap-4">
                 <span className="text-xl font-serif italic text-black/60">Verified by Human Architects</span>
                 <div className="h-6 w-[1px] bg-black/10" />
                 <span className="text-[10px] font-black tracking-[0.4em] text-black">© MMXXIV</span>
              </div>
           </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

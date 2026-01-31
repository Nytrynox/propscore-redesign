import { useRef, useLayoutEffect } from 'react';
import { Send, Phone, Mail, MapPin } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const deskItemsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // Desk Form Slide In
      gsap.from(formRef.current, {
        y: 100,
        opacity: 0,
        rotateX: 10,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      });

      // Floating Desk Items (Rulers, Pens) - Parallax
      const items = deskItemsRef.current?.children;
      if (items) {
          Array.from(items).forEach((item, i) => {
            gsap.to(item, {
                y: -50 * (i + 1), // Different speeds
                rotation: 5 * (i + 1),
                ease: 'none',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1.2,
                }
            });
          });
      }

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="relative w-full bg-[#F9F9F7] py-40 overflow-hidden perspective-[2000px]">
      
      {/* Deep Background - Inquiry Text */}
      <div className="absolute top-[20%] right-[-10%] text-[20rem] font-black text-black/[0.02] leading-none pointer-events-none select-none uppercase -rotate-90 origin-right">
        INQUIRY
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-20">
        
        <div className="grid grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: 3D Form Sheet */}
          <div className="col-span-12 lg:col-span-7 relative">
             <div className="flex items-center gap-4 mb-12">
                <span className="w-12 h-[1px] bg-primary" />
                <p className="text-[10px] font-black uppercase tracking-[0.6em] text-black">REQUEST AN AUDIT</p>
             </div>

             <h2 className="text-7xl lg:text-9xl font-bold text-black tracking-tighter leading-[0.8] mb-16">
               Secure Your <br /> <span className="text-black/10 italic">Assets.</span>
             </h2>

             <form 
              ref={formRef}
              className="space-y-8 bg-white p-12 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border border-black/5 rounded-sm relative transform-style-3d will-change-transform"
             >
                {/* Parallax Desk Items Overlay */}
                <div ref={deskItemsRef} className="absolute -right-20 -top-20 bottom-0 w-40 pointer-events-none hidden lg:block">
                    {/* Ruler */}
                    <div className="absolute top-1/2 right-0 w-8 h-96 bg-[#e0d6c2] shadow-xl border border-black/10 opacity-80 flex flex-col items-center justify-between py-2">
                        {[...Array(20)].map((_,i) => <div key={i} className="w-4 h-[1px] bg-black/30" />)}
                    </div>
                    {/* Pencil */}
                    <div className="absolute top-20 right-20 w-2 h-64 bg-yellow-400 shadow-lg rotate-12 rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                   <div className="space-y-2 group">
                      <label className="text-[10px] font-black uppercase tracking-widest text-black/40 group-focus-within:text-primary transition-colors">Property Name</label>
                      <input 
                        type="text" 
                        placeholder="e.g. Skyline Residence"
                        className="w-full bg-transparent border-b border-black/10 py-3 text-xl font-bold text-black placeholder:text-black/5 focus:outline-none focus:border-primary transition-all"
                      />
                   </div>
                   <div className="space-y-2 group">
                      <label className="text-[10px] font-black uppercase tracking-widest text-black/40 group-focus-within:text-primary transition-colors">Location</label>
                      <input 
                        type="text" 
                        placeholder="Mumbai, Sector 04"
                        className="w-full bg-transparent border-b border-black/10 py-3 text-xl font-bold text-black placeholder:text-black/5 focus:outline-none focus:border-primary transition-all"
                      />
                   </div>
                </div>

                <div className="space-y-2 group">
                   <label className="text-[10px] font-black uppercase tracking-widest text-black/40 group-focus-within:text-primary transition-colors">Audit Type</label>
                   <div className="flex flex-wrap gap-4 pt-2">
                      {['Structural', 'Full MEP', 'Handover'].map((type) => (
                        <button 
                          key={type} 
                          type="button" 
                          className="px-6 py-2 border border-black/5 text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all transform hover:translate-y-[-2px]"
                        >
                          {type}
                        </button>
                      ))}
                   </div>
                </div>

                <div className="space-y-2 group">
                   <label className="text-[10px] font-black uppercase tracking-widest text-black/40 group-focus-within:text-primary transition-colors">Contact Information</label>
                   <input 
                    type="email" 
                    placeholder="official@company.com"
                    className="w-full bg-transparent border-b border-black/10 py-3 text-xl font-bold text-black placeholder:text-black/5 focus:outline-none focus:border-primary transition-all font-mono"
                   />
                </div>

                <button className="flex items-center gap-6 group pt-8">
                   <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-black shadow-xl group-hover:scale-110 transition-transform">
                      <Send className="w-6 h-6" />
                   </div>
                   <span className="text-xs font-black uppercase tracking-[0.4em] text-black border-b-2 border-transparent group-hover:border-primary transition-all">Submit Audit Request</span>
                </button>
             </form>
          </div>

          {/* Right Column: Info Block */}
          <div className="col-span-12 lg:col-span-5 space-y-16 lg:pt-32 pl-12">
             <div className="space-y-8">
                <div className="flex items-start gap-6 group cursor-default">
                   <div className="p-4 bg-white border border-black/5 shadow-lg group-hover:scale-110 transition-transform">
                      <Phone className="w-4 h-4 text-primary" />
                   </div>
                   <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-black/40 mb-1">Direct Line</h4>
                      <p className="text-2xl font-bold text-black">+91 22 8829 3000</p>
                   </div>
                </div>

                <div className="flex items-start gap-6 group cursor-default">
                   <div className="p-4 bg-white border border-black/5 shadow-lg group-hover:scale-110 transition-transform">
                      <Mail className="w-4 h-4 text-primary" />
                   </div>
                   <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-black/40 mb-1">Global Audit Desk</h4>
                      <p className="text-2xl font-bold text-black">verify@propscore.tech</p>
                   </div>
                </div>

                <div className="flex items-start gap-6 group cursor-default">
                   <div className="p-4 bg-white border border-black/5 shadow-lg group-hover:scale-110 transition-transform">
                      <MapPin className="w-4 h-4 text-primary" />
                   </div>
                   <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-black/40 mb-1">Headquarters</h4>
                      <p className="text-2xl font-bold text-black">The Design House Antop Hill, Mumbai</p>
                   </div>
                </div>
             </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ContactSection;

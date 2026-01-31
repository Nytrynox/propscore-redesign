import { useRef, useLayoutEffect } from 'react';
import { Play, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ProcessCardProps {
  number: string;
  title: string;
  description: string;
  image: string;
  tag: string;
  color: string;
}

const ProcessCard = ({ number, title, description, image, tag, color }: ProcessCardProps) => {
  return (
    <div className="relative w-[400px] lg:w-[500px] h-[600px] flex-shrink-0 bg-white rounded-sm overflow-hidden border border-black/5 group mx-4 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-500">
      {/* Image Layer */}
      <div className="absolute inset-0 h-[65%]">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
        
        {/* Play Button Overlay - Minimalist */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
             <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-2xl scale-90 group-hover:scale-100 transition-transform duration-500">
                <Play className="w-6 h-6 text-black fill-black ml-1" />
             </div>
        </div>
      </div>

      {/* Content Layer - Pure & Clean */}
      <div className="absolute bottom-0 inset-x-0 h-[35%] bg-white p-8 flex flex-col justify-between border-t border-black/5">
         <div>
            <div className="flex items-center gap-4 mb-4">
                <span className="text-sm font-black text-black border border-black rounded-full w-8 h-8 flex items-center justify-center">{number}</span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40">{tag}</span>
            </div>
            <h3 className="text-3xl font-bold text-black leading-none mb-3 tracking-tight group-hover:text-primary transition-colors">
                {title}
            </h3>
            <p className="text-sm text-gray-500 font-light leading-relaxed line-clamp-2 italic">
                {description}
            </p>
         </div>
      </div>
    </div>
  );
};

const HowItWorksSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Endless Horizontal Scroll Animation
      const track = trackRef.current;
      if (track) {
         const content = track.innerHTML;
         track.innerHTML = content + content + content; // Triple content for smoother loop on wide screens

         gsap.to(track, {
            x: '-33.33%', // Move one full set
            duration: 60, // Slower, more elegant speed
            ease: 'none',
            repeat: -1,
         });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const steps = [
    {
      number: '01',
      title: 'Structural Audit',
      description: 'Hand-verified inspection. We analyze the physical reality, not just the digital paperwork.',
      image: '/process-inspect.jpg',
      tag: 'Phase One',
      color: 'bg-black'
    },
    {
      number: '02',
      title: 'Human Scoring',
      description: 'Our architects compare findings against 50+ livability benchmarks. No algorithms here.',
      image: '/process-standardize.jpg',
      tag: 'Phase Two',
      color: 'bg-black'
    },
    {
      number: '03',
      title: 'The Publication',
      description: 'A permanent, stamped record of truth. Signed by our chief auditor.',
      image: '/process-publish.jpg',
      tag: 'Phase Three',
      color: 'bg-black'
    },
    {
      number: '04',
      title: 'Post-Handover',
      description: 'We stay with the asset. Monitoring structural integrity for the first 12 months.',
      image: '/listing-thumb-01.jpg',
      tag: 'Phase Four',
      color: 'bg-black'
    }
  ];

  return (
    <section ref={sectionRef} id="how-it-works" className="relative w-full bg-white py-32 overflow-hidden border-b border-black/5">
      
      {/* Header - Minimalist */}
      <div className="max-w-7xl mx-auto px-6 mb-24 flex items-end justify-between">
          <div>
            <h2 className="text-7xl lg:text-9xl font-black text-black tracking-tighter leading-none">
                The <span className="text-black/10 italic">Process.</span>
            </h2>
          </div>
          <div className="hidden lg:block">
             <p className="text-right text-xs font-bold uppercase tracking-widest text-black/40">
                Continuous Workflow <br />
                <span className="text-black">Est. 2024</span>
             </p>
          </div>
      </div>

      {/* Endless Scroller Track */}
      <div className="relative w-full overflow-hidden py-10">
         <div ref={trackRef} className="flex gap-12 w-max px-6">
             {steps.map((step, idx) => (
                <ProcessCard key={idx} {...step} />
             ))}
         </div>
      </div>

    </section>
  );
};

export default HowItWorksSection;

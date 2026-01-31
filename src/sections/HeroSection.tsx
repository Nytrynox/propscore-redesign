import { useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const detailImageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Staggered text entrance
      tl.fromTo(
        contentRef.current!.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15 }
      );

      // Main image entrance (Swipe reveal)
      tl.fromTo(
        mainImageRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 1.2, ease: 'expo.out' },
        '<0.2'
      );

      // Detail image float in
      tl.fromTo(
        detailImageRef.current,
        { y: 40, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1 },
        '<0.4'
      );

      // Parallax effect on scroll
      gsap.to(detailImageRef.current, {
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToVerify = () => {
    document.querySelector('#verify')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToListings = () => {
    document.querySelector('#listings')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center bg-white overflow-hidden pt-24 lg:pt-0"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Editorial Content (Cols 1-5) */}
        <div ref={contentRef} className="lg:col-span-5 flex flex-col items-start z-20 relative">
          
          {/* Eyebrow Label */}
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px w-8 bg-black"></div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] font-bold text-black">
              THE CURATED STANDARD
            </span>
          </div>

          {/* Headline with mixed weights */}
          <h1 className="font-heading text-6xl lg:text-[5.5rem] leading-[0.95] text-black mb-8 tracking-tight">
            <span className="font-bold">Trust</span> is <br />
            <span className="font-light italic font-serif">in the details.</span>
          </h1>

          <p className="text-lg text-gray-600 max-w-md leading-relaxed mb-10 border-l-2 border-primary/40 pl-6">
            We don't just aggregate data. We inspect the structure, verify the finish, and validate the pricing. Real humans, real scores.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto">
            <button
              onClick={scrollToListings}
              className="primary-btn w-full sm:w-auto group flex items-center justify-center gap-2"
            >
              Find Verified Homes
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              onClick={scrollToVerify}
              className="group flex items-center gap-2 text-sm font-bold text-black border-b border-black/20 pb-0.5 hover:border-black transition-all"
            >
              How we verify
            </button>
          </div>

          {/* Human Touch / Specialist Sign-off */}
          <div className="mt-16 flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100 max-w-sm">
            <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden flex-shrink-0 border-2 border-white shadow-sm">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100&h=100" alt="Specialist" className="w-full h-full object-cover" />
            </div>
            <div>
                <p className="text-xs font-bold text-primary uppercase tracking-wider mb-0.5">Verified by Specialist</p>
                <p className="text-sm font-medium text-black">Sarah Jenkins <span className="text-gray-400 font-normal">| Senior Structural Engineer</span></p>
            </div>
          </div>
        </div>

        {/* Right Column: Collage Visuals (Cols 6-12) */}
        <div className="lg:col-span-7 relative h-[600px] lg:h-[800px] w-full flex items-center justify-center lg:justify-end">
            
            {/* Main Context Video (Big Box) */}
            <div 
                ref={mainImageRef}
                className="relative w-[90%] h-[85%] lg:w-[85%] lg:h-[90%] rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100" 
                style={{ clipPath: 'inset(0 100% 0 0)' }}
            >
                <video
                 autoPlay
                 muted
                 loop
                 playsInline
                 className="w-full h-full object-cover grayscale-[0%] contrast-[1.05]"
                 poster="/hero-property.jpg"
                >
                  <source src="https://videos.pexels.com/video-files/7578552/7578552-uhd_2560_1440_30fps.mp4" type="video/mp4" />
                </video>
            </div>

            {/* Floating Detail Photo (Asymmetry) */}
            <div 
                ref={detailImageRef}
                className="absolute -bottom-6 left-4 lg:bottom-12 lg:-left-12 w-[260px] h-[340px] bg-white p-3 rounded-2xl shadow-2xl rotate-3 lg:rotate-0"
            >
                <div className="w-full h-full rounded-xl overflow-hidden relative">
                    <img 
                      src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop" 
                      alt="Property Detail" 
                      className="w-full h-full object-cover"
                    />
                    
                    <div className="absolute top-3 right-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-black shadow-md z-10">
                        <CheckCircle className="w-5 h-5" />
                    </div>
                </div>
            </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;

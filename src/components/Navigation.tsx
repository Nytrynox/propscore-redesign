import { useState, useEffect, useRef } from 'react';
import { Menu, X, Landmark, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const hoverBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Philosophy', href: '#verify' },
    { name: 'Properties', href: '#listings' },
    { name: 'Verification', href: '#partners' },
    { name: 'Standards', href: '#reports' },
    { name: 'Support', href: '#contact' },
  ];

  // Magnetic Hover Effect Logic
  useEffect(() => {
    if (hoveredIndex !== null && hoverBgRef.current) {
        const links = navContainerRef.current?.querySelectorAll('.nav-link');
        if (links && links[hoveredIndex]) {
            const link = links[hoveredIndex] as HTMLElement;
            gsap.to(hoverBgRef.current, {
                x: link.offsetLeft,
                width: link.offsetWidth,
                opacity: 1,
                duration: 0.4,
                ease: 'power3.out'
            });
        }
    } else if (hoverBgRef.current) {
        gsap.to(hoverBgRef.current, {
            opacity: 0,
            duration: 0.3,
            ease: 'power3.out'
        });
    }
  }, [hoveredIndex]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 lg:px-12 flex justify-center pointer-events-none">
        <div 
          className={`w-full max-w-7xl flex items-center justify-between transition-all duration-700 rounded-[24px] px-6 lg:px-8 border pointer-events-auto ${
            isScrolled
              ? 'bg-white/80 backdrop-blur-[40px] border-white/50 shadow-[0_12px_40px_rgba(0,0,0,0.06)] h-16'
              : 'bg-white/20 backdrop-blur-md border-white/20 h-20'
          }`}
        >
          {/* Left: Brand */}
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="flex items-center gap-3 group"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <div className="p-2 bg-black rounded-xl transition-transform group-hover:rotate-12">
                <Landmark className="w-5 h-5 text-primary" />
              </div>
              <span className="font-heading text-lg font-bold text-black tracking-tight leading-none pt-1">
                PropScore
              </span>
            </a>
          </div>

          {/* Center: Ultra-Aesthetic Links */}
          <div ref={navContainerRef} className="hidden lg:flex items-center gap-10 relative py-1">
            <div 
                ref={hoverBgRef}
                className="absolute h-full rounded-2xl bg-gray-50/50 backdrop-blur-sm -z-10 opacity-0 pointer-events-none border border-white/20"
            />
            {navLinks.map((link, index) => (
              <button
                key={link.name}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => scrollToSection(link.href)}
                className="nav-link px-2 py-2 flex items-center gap-3 transition-colors duration-500 group relative"
              >
                <span className="w-1 h-1 rounded-full bg-primary scale-0 group-hover:scale-100 transition-transform duration-500" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400 group-hover:text-black transition-colors duration-300">
                  {link.name}
                </span>
                {/* Dash Underline */}
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-black transition-all duration-500 group-hover:w-4 opacity-0 group-hover:opacity-100" />
              </button>
            ))}
          </div>

          {/* Right: Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <button
               onClick={() => scrollToSection('#contact')}
               className="flex items-center gap-2.5 bg-black px-6 py-2.5 rounded-full group transition-all hover:bg-black/90 active:scale-95 shadow-[0_4px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)]"
            >
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white">Get a Score</span>
                <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-black transition-transform group-hover:translate-x-1">
                    <ArrowUpRight className="w-3 h-3" />
                </div>
            </button>
          </div>

          {/* Mobile Trigger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2.5 bg-white border border-gray-100 rounded-xl shadow-sm text-black transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden transition-all duration-700 flex flex-col bg-white ${
          isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="p-10 flex items-center justify-between">
            <span className="font-heading text-2xl font-bold tracking-tight text-black">PropScore</span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-3 bg-gray-50 rounded-2xl">
                <X className="w-7 h-7 text-black" />
            </button>
        </div>

        <div className="flex-1 overflow-y-auto px-10 py-6 flex flex-col gap-10">
          {navLinks.map((link, index) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className="text-left group flex flex-col"
            >
              <div className="flex items-baseline gap-4">
                  <span className="text-xs font-mono text-primary font-bold">0{index + 1}</span>
                  <span className="text-5xl font-bold text-black border-b-4 border-transparent group-hover:border-primary transition-all">{link.name}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="p-10 bg-gray-50">
            <button
                onClick={() => scrollToSection('#contact')}
                className="w-full py-6 rounded-3xl bg-black text-white font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-4 group"
            >
                Initialize Scoring
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-black group-hover:rotate-45 transition-transform">
                    <ArrowUpRight className="w-4 h-4" />
                </div>
            </button>
        </div>
      </div>
    </>
  );
};

export default Navigation;

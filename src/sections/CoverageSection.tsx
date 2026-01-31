import { useRef, useLayoutEffect } from 'react';
import { Navigation } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CoverageSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      
      // Cards stagger animation
      const cards = cardsRef.current?.children;
      if (cards) {
         gsap.fromTo(cards, 
            { y: 60, opacity: 0 },
            { 
               y: 0,
               opacity: 1,
               stagger: 0.15,
               ease: 'power3.out',
               scrollTrigger: {
                  trigger: sectionRef.current,
                  start: 'top 80%',
                  end: 'top 40%',
                  scrub: 1,
               }
            }
         );
      }

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const cities = [
    { 
      city: 'Mumbai', 
      areas: ['Bandra', 'Andheri', 'Powai', 'Worli'],
      properties: '2,400+',
      status: 'Live'
    },
    { 
      city: 'Hyderabad', 
      areas: ['Gachibowli', 'HITEC City', 'Madhapur', 'Kondapur'],
      properties: '1,800+',
      status: 'Live'
    },
    { 
      city: 'Pune', 
      areas: ['Hinjewadi', 'Viman Nagar', 'Kharadi', 'Baner'],
      properties: '1,500+',
      status: 'Live'
    },
    { 
      city: 'Bangalore', 
      areas: ['Whitefield', 'Koramangala', 'HSR Layout', 'Indiranagar'],
      properties: '—',
      status: 'Coming Soon'
    },
  ];

  return (
    <section ref={sectionRef} id="coverage" className="relative w-full bg-white py-16 lg:py-32 overflow-hidden">
      
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <p className="text-sm font-medium text-primary mb-3">Where We Operate</p>
          <h2 className="text-3xl lg:text-5xl font-bold text-black mb-4">
            Available in Major Cities
          </h2>
          <p className="text-base lg:text-lg text-black/50 max-w-2xl mx-auto">
            We're actively scoring properties across India's fastest-growing real estate markets. 
            More cities coming soon.
          </p>
        </div>

        {/* City Cards Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cities.map((city, i) => (
            <div 
              key={i} 
              className={`group relative p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg ${
                city.status === 'Live' 
                  ? 'bg-[#FAFAFA] border-black/5 hover:border-primary/30' 
                  : 'bg-black/[0.02] border-dashed border-black/10'
              }`}
            >
              {/* Status Badge */}
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-4 ${
                city.status === 'Live' 
                  ? 'bg-green-50 text-green-600' 
                  : 'bg-black/5 text-black/40'
              }`}>
                {city.status === 'Live' && (
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                )}
                {city.status}
              </div>

              {/* City Name */}
              <h3 className="text-2xl font-bold text-black mb-3">{city.city}</h3>

              {/* Areas */}
              <div className="flex flex-wrap gap-2 mb-6">
                {city.areas.map((area, j) => (
                  <span 
                    key={j} 
                    className="text-xs text-black/50 bg-white border border-black/5 px-2 py-1 rounded"
                  >
                    {area}
                  </span>
                ))}
              </div>

              {/* Properties Count */}
              <div className="pt-4 border-t border-black/5">
                <p className="text-xs text-black/40 mb-1">Properties Scored</p>
                <p className="text-xl font-bold text-black">{city.properties}</p>
              </div>

              {/* Hover Arrow */}
              {city.status === 'Live' && (
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity hidden lg:block">
                  <Navigation className="w-4 h-4 text-primary" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-sm text-black/40 mb-4">Don't see your city?</p>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-sm font-medium rounded-full hover:bg-black/80 transition-colors">
            Request Your City
            <Navigation className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default CoverageSection;

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  { 
    label: 'Gourmet Chicken Burger', 
    category: 'Signature', 
    description: 'Perfectly grilled chicken burger with fresh greens, melted cheese & crispy fries.',
    img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800' 
  },
  { 
    label: 'Veggies Oomph Pizza', 
    category: 'Pizza', 
    description: 'Loaded with fresh vegetables, gooey cheese & a punch of flavour in every slice.',
    img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800' 
  },
  { 
    label: 'Chicken Satay', 
    category: 'Starters', 
    description: 'Skewered grilled chicken with rich peanut sauce — savoury, smoky & satisfying.',
    img: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?q=80&w=800' 
  },
  { 
    label: 'Chicken Burrito Bowl', 
    category: 'Mains', 
    description: 'Hearty rice bowl with spiced chicken, beans, salsa & creamy guacamole.',
    img: 'https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?q=80&w=800' 
  },
  { 
    label: 'London Double Decker', 
    category: 'The Vibe', 
    description: 'Step inside our iconic red double decker bus — dine like you\'re in London, right in Camp, Pune.',
    img: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1200', 
    wide: true 
  },
  { 
    label: 'Loaded Nachos', 
    category: 'Snacks', 
    description: 'Crispy tortilla chips loaded with melted cheese, salsa, sour cream & jalapeños.',
    img: 'https://images.unsplash.com/photo-1513456852971-30e7b8199c6f?q=80&w=800' 
  },
  { 
    label: 'Cheese Fondue', 
    category: 'Starters', 
    description: 'Rich melted cheese fondue served with bread, veggies & dipping goodness.',
    img: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=800' 
  },
];

export function ProductGallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const items = gsap.utils.toArray('.gallery-item');
    gsap.from(items, {
      y: 40,
      duration: 0.7,
      ease: 'power3.out',
      stagger: 0.08,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        once: true
      }
    });
  }, { scope: containerRef });

  return (
    <div className="bg-white py-16 md:py-24 flex flex-col items-center justify-center overflow-hidden" ref={containerRef}>
      <div className="w-[90%] md:w-[65%]">
        
        <div className="text-center mb-16">
          <span className="text-gold uppercase tracking-[0.25em] text-[11px] font-bold font-manrope">London Eats • Pune Vibes</span>
          <h2 className="font-luxurious text-4xl md:text-5xl text-black mt-2">
            What's Cooking
          </h2>
          <div className="w-12 h-[1px] bg-gold mx-auto my-4" />
          <p className="text-neutral-500 font-manrope text-sm max-w-lg mx-auto leading-relaxed">
            From sizzling chicken satay and wood-fired pizzas to gourmet burgers, loaded nachos, and cheesy fondue — every plate is a passport to flavour.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-4 md:gap-x-6">
          {ITEMS.slice(0, 4).map((item) => (
            <GalleryCard key={item.label} item={item} />
          ))}

          <GalleryCard item={ITEMS[4]} extraClasses="col-span-2" />
          <GalleryCard item={ITEMS[5]} />
          <GalleryCard item={ITEMS[6]} />
        </div>

      </div>
    </div>
  );
}

function GalleryCard({ item, extraClasses = '' }: { key?: string; item: any; extraClasses?: string }) {
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <div className={`p-1 gallery-item flex flex-col group ${extraClasses}`}>
      <div 
        className="overflow-hidden rounded-sm relative bg-neutral-100 shadow-sm" 
        style={{ aspectRatio: item.wide ? '8/3' : '3/4' }}
      >
        {!isLoaded && (
          <div className="absolute inset-0 bg-neutral-100 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-100 via-neutral-200 to-neutral-100 -translate-x-full animate-[shimmer_1.5s_infinite]" />
            <div className="w-6 h-6 border-2 border-gold/20 border-t-gold rounded-full animate-spin" />
          </div>
        )}

        <img 
          src={item.img}
          alt={item.label}
          loading="lazy"
          referrerPolicy="no-referrer"
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover object-center transition-all duration-[4000ms] group-hover:scale-[1.15] group-hover:ease-[cubic-bezier(0.22,0.61,0.36,1)] ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
          } transition-opacity duration-700 ease-out`}
        />
        
        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded text-[9px] uppercase tracking-wider text-white font-manrope font-semibold">
          {item.category}
        </div>
      </div>

      <div className="text-left mt-3">
        <h3 className="text-black text-[15px] font-manrope font-semibold tracking-wide">
          {item.label}
        </h3>
        <p className="text-neutral-500 text-xs font-manrope mt-1.5 leading-relaxed">
          {item.description}
        </p>
      </div>
    </div>
  );
}

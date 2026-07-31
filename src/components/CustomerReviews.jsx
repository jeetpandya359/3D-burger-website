import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote, CheckCircle2, MessageSquare } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CustomerReviews() {
  const sectionRef = useRef(null);
  const reviewCardsRef = useRef([]);

  const reviews = [
    {
      id: 1,
      name: 'Chef Jean-Luc Dubois',
      role: 'Michelin Star Inspector',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      title: 'An Architectural Feat in Gastronomy',
      quote: 'BURGER MANIA has managed the impossible: elevating the classic burger into a 3-star Michelin sensory experience. The Wagyu marbling and black truffle glaze are pure perfection.',
      verified: 'Verified Food Critic'
    },
    {
      id: 2,
      name: 'Elena Rostova',
      role: 'Culinary Editor, Vogue Gourmand',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      title: 'Unrivaled Luxury & Presentation',
      quote: 'From the black ceramic aesthetic to the thermal vault packaging, every detail is engineered like an Apple product launch. Absolutely breathtaking taste.',
      verified: 'Verified Epicure'
    },
    {
      id: 3,
      name: 'Marcus Vance',
      role: 'Tech Executive & Connoisseur',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      title: 'The Best Burger in New York & Beyond',
      quote: 'I ordered the Truffle Royale and Double Cheese for our launch party. The ingredients separated in the floating preview look exact in real life. Unforgettable.',
      verified: 'Verified VIP Buyer'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        reviewCardsRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="reviews" ref={sectionRef} className="relative py-32 bg-[#050505] px-6 md:px-12 z-30 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-goldAccent/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-goldAccent/10 border border-goldAccent/30 mb-4">
            <MessageSquare className="w-4 h-4 text-goldAccent" />
            <span className="text-xs uppercase tracking-[0.25em] text-goldAccent font-bold">
              Critical Acclaim
            </span>
          </div>
          <h2 className="syne-font text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
            CUSTOMER <span className="gold-gradient-text">REVIEWS</span>
          </h2>
          <p className="text-subText text-base md:text-lg font-light tracking-wide">
            Praised by Michelin critics, global food editors, and burger enthusiasts worldwide.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, index) => (
            <motion.div
              key={rev.id}
              ref={(el) => (reviewCardsRef.current[index] = el)}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="glass-panel p-8 rounded-3xl border border-white/10 hover:border-goldAccent/40 transition-all duration-500 flex flex-col justify-between shadow-2xl relative"
            >
              <Quote className="w-10 h-10 text-goldAccent/20 absolute top-6 right-6" />

              <div>
                {/* Stars */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-goldAccent text-goldAccent" />
                  ))}
                </div>

                <h3 className="syne-font text-xl font-bold text-white mb-3">
                  "{rev.title}"
                </h3>

                <p className="text-xs text-subText leading-relaxed font-light mb-8 italic">
                  "{rev.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-goldAccent/40 shadow-gold-glow"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">{rev.name}</h4>
                  <p className="text-[11px] text-subText font-mono">{rev.role}</p>
                  <div className="flex items-center gap-1 text-[10px] text-goldAccent mt-1 font-mono">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{rev.verified}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

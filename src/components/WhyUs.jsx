import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Leaf, Award, Sparkles, Flame, Truck, ShieldCheck, Clock, HeartHandshake } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function WhyUs() {
  const sectionRef = useRef(null);
  const featureCardsRef = useRef([]);

  const features = [
    {
      icon: Leaf,
      title: 'Fresh Ingredients',
      subtitle: 'Harvested Daily',
      desc: 'We partner exclusively with local organic biodynamic farms to harvest heirloom crisp greens and vine-ripened tomatoes within 6 hours of serving.',
      highlight: '100% Organic'
    },
    {
      icon: Award,
      title: 'Premium Beef',
      subtitle: 'Japanese A5 & Prime Angus',
      desc: 'Our master butchers dry-age certified Wagyu and Prime Angus beef for 28 days, creating unmatched tender marbling and umami flavor.',
      highlight: 'Dry-Aged 28 Days'
    },
    {
      icon: Sparkles,
      title: 'Fresh Vegetables',
      subtitle: 'Peak Crispness',
      desc: 'Hydroponic butterhead lettuce, sweet Vidalia onions, and non-GMO garlic crafted into artisanal toppings with pristine crunch.',
      highlight: 'Farm To Table'
    },
    {
      icon: Flame,
      title: 'Secret Sauce',
      subtitle: '72-Hour Aged Elixir',
      desc: 'A closely guarded secret recipe blending roasted smoked peppers, white truffle essence, and aged balsamic glaze.',
      highlight: 'House Secret'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      subtitle: 'Precision Thermal Vaults',
      desc: 'Custom climate-controlled delivery pods maintain exact 140°F heat and crisp texture. Guaranteed hot to your door in 25 mins.',
      highlight: '< 25 Mins Guarantee'
    }
  ];

  const metrics = [
    { value: '99.8%', label: 'Flavor Approval Score' },
    { value: '15 Min', label: 'Average Kitchen Prep' },
    { value: '100%', label: 'Traceable Organic Produce' },
    { value: '500k+', label: 'Delighted Culinary Epicures' }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        featureCardsRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
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
    <section id="why-us" ref={sectionRef} className="relative py-32 bg-[#050505] px-6 md:px-12 z-30 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-goldAccent/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-goldAccent/10 border border-goldAccent/30 mb-4">
            <ShieldCheck className="w-4 h-4 text-goldAccent" />
            <span className="text-xs uppercase tracking-[0.25em] text-goldAccent font-bold">
              Unrivaled Quality Standard
            </span>
          </div>
          <h2 className="syne-font text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
            WHY <span className="gold-gradient-text">BURGER MANIA</span>
          </h2>
          <p className="text-subText text-base md:text-lg font-light tracking-wide">
            Every layer is engineered to deliver a sensory crescendo that redefines luxury dining.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                ref={(el) => (featureCardsRef.current[index] = el)}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group glass-panel p-8 rounded-3xl border border-white/10 hover:border-goldAccent/50 transition-all duration-500 relative flex flex-col justify-between shadow-2xl"
              >
                <div>
                  {/* Icon Box */}
                  <div className="w-14 h-14 rounded-2xl bg-cardBg border border-goldAccent/30 flex items-center justify-center mb-6 shadow-gold-glow group-hover:bg-gold-gradient group-hover:text-darkBg transition-all duration-500">
                    <Icon className="w-7 h-7 text-goldAccent group-hover:text-darkBg transition-colors" />
                  </div>

                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-goldAccent bg-goldAccent/10 px-3 py-1 rounded-full border border-goldAccent/20">
                    {item.highlight}
                  </span>

                  <h3 className="syne-font text-2xl font-bold text-white mt-4 mb-1 group-hover:text-goldAccent transition-colors">
                    {item.title}
                  </h3>

                  <h4 className="text-xs font-mono text-subText uppercase tracking-wider mb-4">
                    {item.subtitle}
                  </h4>

                  <p className="text-xs text-subText leading-relaxed font-light">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-goldAccent/80">
                  <span>Standard 1.0</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Metrics Counter Bar */}
        <div className="glass-panel p-8 md:p-12 rounded-3xl border border-goldAccent/30 shadow-gold-glow grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {metrics.map((m, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="syne-font text-3xl md:text-5xl font-extrabold gold-gradient-text mb-2">
                {m.value}
              </span>
              <span className="text-xs font-medium uppercase tracking-wider text-subText">
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera, Maximize2, X, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const [activeImage, setActiveImage] = useState(null);
  const sectionRef = useRef(null);
  const galleryItemsRef = useRef([]);

  const galleryItems = [
    {
      id: 1,
      title: 'The Wagyu Sear',
      category: 'Kitchen Artistry',
      aspect: 'h-96',
      src: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 2,
      title: 'Black Ceramic Plating',
      category: 'Presentation',
      aspect: 'h-72',
      src: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 3,
      title: 'Melted Gold Cheddar Drizzle',
      category: 'Ingredient Craft',
      aspect: 'h-80',
      src: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 4,
      title: 'Truffle Glaze Infusion',
      category: 'Secret Sauce',
      aspect: 'h-96',
      src: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 5,
      title: 'Artisan Brioche Toasting',
      category: 'Bakery',
      aspect: 'h-72',
      src: 'https://images.unsplash.com/photo-1607013251379-e6eecfffe234?auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 6,
      title: 'Thermal Vault Sealed Packaging',
      category: 'Logistics',
      aspect: 'h-80',
      src: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=1000&q=80'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        galleryItemsRef.current,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
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
    <section id="gallery" ref={sectionRef} className="relative py-32 bg-[#050505] px-6 md:px-12 z-30 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-goldAccent/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-goldAccent/10 border border-goldAccent/30 mb-4">
            <Camera className="w-4 h-4 text-goldAccent" />
            <span className="text-xs uppercase tracking-[0.25em] text-goldAccent font-bold">
              Visual Exhibition
            </span>
          </div>
          <h2 className="syne-font text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
            GALLERY <span className="gold-gradient-text">MANIA</span>
          </h2>
          <p className="text-subText text-base md:text-lg font-light tracking-wide">
            A visual showcase of culinary craftsmanship, black ceramic elegance, and flame-seared artistry.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryItems.map((item, index) => (
            <motion.div
              key={item.id}
              ref={(el) => (galleryItemsRef.current[index] = el)}
              whileHover={{ scale: 1.02 }}
              onClick={() => setActiveImage(item)}
              className="break-inside-avoid relative rounded-3xl overflow-hidden glass-panel border border-white/10 group cursor-pointer shadow-2xl"
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-95 group-hover:brightness-105"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-6 flex flex-col justify-end">
                <span className="text-[10px] uppercase font-mono tracking-widest text-goldAccent font-bold">
                  {item.category}
                </span>
                <h3 className="syne-font text-xl font-bold text-white mt-1">
                  {item.title}
                </h3>
                <div className="mt-3 flex items-center gap-2 text-xs text-goldAccent font-semibold">
                  <Maximize2 className="w-4 h-4" />
                  <span>Expand High-Res View</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12"
            onClick={() => setActiveImage(null)}
          >
            <motion.div
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              className="relative max-w-5xl w-full rounded-3xl overflow-hidden glass-panel border border-white/20 p-2"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveImage(null)}
                className="absolute top-6 right-6 z-10 p-3 rounded-full bg-darkBg/80 border border-white/20 text-white hover:bg-goldAccent hover:text-darkBg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <img
                src={activeImage.src}
                alt={activeImage.title}
                className="w-full max-h-[80vh] object-contain rounded-2xl"
              />

              <div className="p-6 flex justify-between items-center bg-cardBg/90 backdrop-blur-md rounded-b-2xl">
                <div>
                  <span className="text-xs uppercase font-mono tracking-widest text-goldAccent font-bold">
                    {activeImage.category}
                  </span>
                  <h3 className="syne-font text-2xl font-bold text-white mt-1">
                    {activeImage.title}
                  </h3>
                </div>
                <span className="text-xs text-subText font-mono border border-white/10 px-3 py-1.5 rounded-full">
                  BURGER MANIA 4K HDR
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

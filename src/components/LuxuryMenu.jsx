import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flame, Star, Plus, Check, Info, Sparkles, X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const MENU_ITEMS = [
  {
    id: 'classic-burger',
    title: 'Classic Burger',
    category: 'Signature',
    price: '$18.00',
    numericPrice: 18.00,
    tagline: 'The timeless masterpiece that started the mania.',
    description: '100% Prime Angus Beef patty, 18-month aged cheddar, caramelized onion relish, crisp heirloom tomatoes, homemade secret sauce on toasted brioche.',
    rating: 4.9,
    calories: '780 kcal',
    prepTime: '12 mins',
    badge: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Prime Angus Patty', 'Aged Cheddar', 'Caramelized Onion Jam', 'Secret Sauce', 'Artisan Brioche']
  },
  {
    id: 'double-cheese',
    title: 'Double Cheese',
    category: 'Signature',
    price: '$22.00',
    numericPrice: 22.00,
    tagline: 'Decadence doubled for true cheese epicures.',
    description: 'Dual smashed Wagyu beef patties layered with melted Vintage Red Leicester, melted Monterey Jack, crispy shallot crunch, and house pickle aioli.',
    rating: 5.0,
    calories: '1,050 kcal',
    prepTime: '14 mins',
    badge: 'Chef Choice',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Double Wagyu Patties', 'Vintage Red Leicester', 'Monterey Jack', 'Crispy Shallots', 'Pickle Aioli']
  },
  {
    id: 'bbq-beast',
    title: 'BBQ Beast',
    category: 'Gourmet',
    price: '$24.00',
    numericPrice: 24.00,
    tagline: 'Smoky, bold, and unapologetically indulgence.',
    description: 'Hickory-smoked Wagyu beef, thick-cut Applewood smoked bacon, crispy onion crown, aged gouda cheese, and 12-hour bourbon barbecue drizzle.',
    rating: 4.8,
    calories: '1,120 kcal',
    prepTime: '15 mins',
    badge: 'Smoked Special',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Hickory Smoked Wagyu', 'Applewood Bacon Bark', 'Aged Gouda', 'Crispy Onion Crown', 'Bourbon BBQ Glaze']
  },
  {
    id: 'spicy-inferno',
    title: 'Spicy Inferno',
    category: 'Spicy',
    price: '$21.00',
    numericPrice: 21.00,
    tagline: 'A fiery symphony of heat and refined flavor.',
    description: 'Habanero-infused dry-aged Angus beef, spicy Pepper Jack, pickled jalapeños, smoked chipotle relish, and ghost pepper garlic aioli.',
    rating: 4.9,
    calories: '860 kcal',
    prepTime: '12 mins',
    badge: 'Extremely Hot 🔥',
    image: 'https://images.unsplash.com/photo-1607013251379-e6eecfffe234?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Habanero Angus Patty', 'Pepper Jack Cheese', 'Ghost Pepper Aioli', 'Pickled Jalapeños', 'Chipotle Relish']
  },
  {
    id: 'chicken-supreme',
    title: 'Chicken Supreme',
    category: 'Poultry',
    price: '$19.00',
    numericPrice: 19.00,
    tagline: 'Golden crispy perfection with fresh avocado.',
    description: 'Buttermilk 24-hour marinated crispy organic chicken breast, smashed fresh Hass avocado, spicy coleslaw, and honey Dijon mustard dressing.',
    rating: 4.9,
    calories: '720 kcal',
    prepTime: '12 mins',
    badge: 'Crispy Favorite',
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Buttermilk Crispy Chicken', 'Smashed Hass Avocado', 'Spicy Slaw', 'Honey Dijon', 'Brioche Bun']
  },
  {
    id: 'truffle-royale',
    title: 'Truffle Royale',
    category: 'Gourmet',
    price: '$29.00',
    numericPrice: 29.00,
    tagline: 'The ultimate luxury burger with 24k edible gold.',
    description: 'Dry-aged Wagyu beef patty, shaved fresh Italian black truffle, foie gras butter, 36-month aged Parmigiano-Reggiano, and 24k gold leaf brioche.',
    rating: 5.0,
    calories: '990 kcal',
    prepTime: '18 mins',
    badge: 'Ultra Luxury 👑',
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=800&q=80',
    ingredients: ['Dry-Aged Wagyu', 'Black Winter Truffle', 'Foie Gras Butter', '24k Gold Leaf', 'Parmigiano-Reggiano']
  }
];

export default function LuxuryMenu({ onSelectItem, onOpenOrder }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedModalItem, setSelectedModalItem] = useState(null);
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const categories = ['All', 'Signature', 'Gourmet', 'Spicy', 'Poultry'];

  const filteredItems = activeCategory === 'All'
    ? MENU_ITEMS
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  // GSAP scroll trigger upward stagger animation for cards
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <section id="menu" ref={sectionRef} className="relative py-32 bg-[#050505] px-6 md:px-12 z-30 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-goldAccent/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-goldAccent/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-goldAccent/10 border border-goldAccent/30 mb-4">
            <Sparkles className="w-4 h-4 text-goldAccent" />
            <span className="text-xs uppercase tracking-[0.25em] text-goldAccent font-bold">
              The Culinary Selection
            </span>
          </div>
          <h2 className="syne-font text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
            LUXURY <span className="gold-gradient-text">GASTRONOMY</span>
          </h2>
          <p className="text-subText text-base md:text-lg font-light tracking-wide">
            Handcrafted with uncompromising culinary passion, premium imported cuts, and organic artisan produce.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-gold-gradient text-darkBg shadow-gold-glow scale-105'
                    : 'bg-cardBg border border-white/10 text-subText hover:text-white hover:border-goldAccent/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              ref={(el) => (cardsRef.current[index] = el)}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="group glass-panel rounded-3xl overflow-hidden border border-white/10 hover:border-goldAccent/40 transition-all duration-500 flex flex-col justify-between shadow-2xl relative"
            >
              {/* Card Image Header */}
              <div className="relative h-64 overflow-hidden bg-black">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cardBg via-transparent to-transparent" />
                
                {/* Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-darkBg/80 border border-goldAccent/50 text-goldAccent text-[10px] font-bold uppercase tracking-widest backdrop-blur-md">
                  {item.badge}
                </div>

                {/* Rating */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-darkBg/80 border border-white/20 text-white text-xs font-bold flex items-center gap-1 backdrop-blur-md">
                  <Star className="w-3.5 h-3.5 fill-goldAccent text-goldAccent" />
                  <span>{item.rating}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="syne-font text-2xl font-bold text-white group-hover:text-goldAccent transition-colors">
                      {item.title}
                    </h3>
                    <span className="text-xl font-extrabold text-goldAccent font-mono">
                      {item.price}
                    </span>
                  </div>

                  <p className="text-xs text-goldAccent/80 font-medium mb-3 italic">
                    "{item.tagline}"
                  </p>

                  <p className="text-xs text-subText line-clamp-2 leading-relaxed mb-6 font-light">
                    {item.description}
                  </p>

                  {/* Ingredient pills */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {item.ingredients.slice(0, 3).map((ing, i) => (
                      <span key={i} className="text-[10px] px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-subText font-mono">
                        {ing}
                      </span>
                    ))}
                    {item.ingredients.length > 3 && (
                      <span className="text-[10px] px-2.5 py-1 rounded-md bg-goldAccent/10 text-goldAccent font-mono">
                        +{item.ingredients.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <button
                    onClick={() => setSelectedModalItem(item)}
                    className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-semibold uppercase tracking-wider hover:bg-white/10 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Info className="w-4 h-4 text-goldAccent" />
                    <span>View Details</span>
                  </button>

                  <button
                    onClick={() => {
                      onSelectItem(item);
                      onOpenOrder();
                    }}
                    className="w-12 h-12 rounded-xl bg-gold-gradient text-darkBg font-bold flex items-center justify-center shadow-gold-glow hover:scale-105 transition-transform cursor-pointer"
                    title="Add to Order"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Item Detail Modal */}
      <AnimatePresence>
        {selectedModalItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-panel w-full max-w-2xl rounded-3xl overflow-hidden border border-white/20 p-6 md:p-8 relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedModalItem(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-goldAccent hover:text-darkBg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col md:flex-row gap-6 items-center">
                <img
                  src={selectedModalItem.image}
                  alt={selectedModalItem.title}
                  className="w-full md:w-1/2 h-64 object-cover rounded-2xl border border-white/10"
                />

                <div className="flex-1">
                  <span className="px-3 py-1 rounded-full bg-goldAccent/20 text-goldAccent text-[10px] font-bold uppercase tracking-widest">
                    {selectedModalItem.badge}
                  </span>
                  <h3 className="syne-font text-3xl font-extrabold text-white mt-2">
                    {selectedModalItem.title}
                  </h3>
                  <div className="text-2xl font-mono font-bold text-goldAccent mt-1">
                    {selectedModalItem.price}
                  </div>
                  <p className="text-xs text-subText mt-3 leading-relaxed">
                    {selectedModalItem.description}
                  </p>
                </div>
              </div>

              <div className="mt-8 border-t border-white/10 pt-6">
                <h4 className="text-xs uppercase tracking-widest text-goldAccent font-bold mb-3">
                  Complete Ingredient Master List
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {selectedModalItem.ingredients.map((ing, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-subText bg-white/5 p-2.5 rounded-lg border border-white/5">
                      <Check className="w-3.5 h-3.5 text-goldAccent" />
                      <span>{ing}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <button
                  onClick={() => {
                    onSelectItem(selectedModalItem);
                    setSelectedModalItem(null);
                    onOpenOrder();
                  }}
                  className="w-full py-4 rounded-xl bg-gold-gradient text-darkBg font-bold text-sm uppercase tracking-wider shadow-gold-glow flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add to Order — {selectedModalItem.price}</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

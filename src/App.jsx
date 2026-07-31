import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import HeroScrollExperience from './components/HeroScrollExperience';
import LuxuryMenu from './components/LuxuryMenu';
import WhyUs from './components/WhyUs';
import CustomerReviews from './components/CustomerReviews';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import OrderModal from './components/OrderModal';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-[#050505] text-white min-h-screen relative font-sans">
      {/* Preloader */}
      {loading && (
        <Preloader onComplete={() => setLoading(false)} />
      )}

      {/* Main Website Content */}
      <div className={loading ? 'opacity-0 pointer-events-none' : 'opacity-100 transition-opacity duration-1000'}>
        {/* Navigation Bar */}
        <Navbar onOpenOrder={() => setIsOrderOpen(true)} />

        {/* Hero & Scroll Experience (Scene 1 -> Scene 2 -> Scene 3) */}
        <HeroScrollExperience onOpenOrder={() => setIsOrderOpen(true)} />

        {/* Luxury Menu Section */}
        <LuxuryMenu
          onSelectItem={(item) => setSelectedMenuItem(item)}
          onOpenOrder={() => setIsOrderOpen(true)}
        />

        {/* Why Burger Mania Section */}
        <WhyUs />

        {/* Customer Reviews Section */}
        <CustomerReviews />

        {/* Gallery Section */}
        <Gallery />

        {/* Footer */}
        <Footer />

        {/* Interactive Order Modal / Drawer */}
        <OrderModal
          isOpen={isOrderOpen}
          onClose={() => setIsOrderOpen(false)}
          initialSelectedItem={selectedMenuItem}
        />
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, ShoppingBag, Menu, X, ChevronRight } from 'lucide-react';

export default function Navbar({ onOpenOrder }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Experience', href: '#hero' },
    { name: 'Luxury Menu', href: '#menu' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Gallery', href: '#gallery' },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-4 bg-[#050505]/80 backdrop-blur-xl border-b border-white/10 shadow-2xl'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-cardBg border border-goldAccent/40 flex items-center justify-center transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110 shadow-gold-glow">
            <Flame className="w-5 h-5 text-goldAccent" />
          </div>
          <div className="flex flex-col">
            <span className="syne-font text-xl font-extrabold tracking-wider text-white group-hover:text-goldAccent transition-colors">
              BURGER<span className="text-goldAccent">MANIA</span>
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-subText -mt-1 font-mono">
              Crafted Beyond Taste
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-8 glass-panel px-8 py-3 rounded-full border border-white/10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-subText hover:text-goldAccent transition-colors tracking-wide relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-goldAccent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={onOpenOrder}
            className="glass-button px-6 py-2.5 rounded-full text-sm font-semibold text-white flex items-center gap-2 group hover:shadow-gold-glow cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-goldAccent group-hover:scale-110 transition-transform" />
            <span>Order Now</span>
            <ChevronRight className="w-4 h-4 opacity-60 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2.5 rounded-full bg-cardBg border border-white/10 text-white hover:text-goldAccent transition-colors"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-cardBg/95 backdrop-blur-2xl border-b border-white/10 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-medium text-white hover:text-goldAccent transition-colors border-b border-white/5 pb-3 flex items-center justify-between"
                >
                  {link.name}
                  <ChevronRight className="w-4 h-4 text-goldAccent" />
                </a>
              ))}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenOrder();
                }}
                className="w-full py-4 rounded-xl bg-gold-gradient text-darkBg font-bold flex items-center justify-center gap-2 shadow-gold-glow mt-2"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Order Now — Gourmet Delivery</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

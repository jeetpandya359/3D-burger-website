import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Instagram, Twitter, Youtube, MapPin, Phone, Mail, Clock, Send, Check } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="relative bg-[#050505] text-white border-t border-white/10 pt-24 pb-12 px-6 md:px-12 z-30 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-goldAccent/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Col 1: Brand & Slogan */}
          <div className="lg:col-span-2">
            <a href="#hero" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-cardBg border border-goldAccent/40 flex items-center justify-center shadow-gold-glow">
                <Flame className="w-5 h-5 text-goldAccent" />
              </div>
              <span className="syne-font text-2xl font-extrabold tracking-wider text-white">
                BURGER<span className="text-goldAccent">MANIA</span>
              </span>
            </a>

            <p className="text-xs text-subText leading-relaxed font-light max-w-sm mb-6">
              An award-winning cinematic culinary experience. We combine 28-day dry-aged Wagyu beef with black ceramic presentation and thermal precision delivery.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {[
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Youtube, href: '#', label: 'YouTube' }
              ].map((s, i) => {
                const Icon = s.icon;
                return (
                  <a
                    key={i}
                    href={s.href}
                    aria-label={s.label}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-subText hover:text-goldAccent hover:border-goldAccent/50 hover:bg-white/10 transition-all duration-300 shadow-lg"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="syne-font text-sm font-bold text-white uppercase tracking-wider mb-6">
              Navigation
            </h4>
            <ul className="space-y-3 text-xs text-subText font-medium">
              <li><a href="#hero" className="hover:text-goldAccent transition-colors">The Cinematic Hero</a></li>
              <li><a href="#menu" className="hover:text-goldAccent transition-colors">Luxury Gastronomy Menu</a></li>
              <li><a href="#why-us" className="hover:text-goldAccent transition-colors">Why Burger Mania</a></li>
              <li><a href="#reviews" className="hover:text-goldAccent transition-colors">Michelin Reviews</a></li>
              <li><a href="#gallery" className="hover:text-goldAccent transition-colors">Visual Exhibition</a></li>
            </ul>
          </div>

          {/* Col 3: Location & Contact */}
          <div>
            <h4 className="syne-font text-sm font-bold text-white uppercase tracking-wider mb-6">
              Flagship Vaults
            </h4>
            <ul className="space-y-3 text-xs text-subText font-light">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-goldAccent shrink-0 mt-0.5" />
                <span>740 Fifth Avenue, Suite 100, New York, NY 10019</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-goldAccent shrink-0" />
                <span className="font-mono text-white">+1 (800) 555-MANIA</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-goldAccent shrink-0" />
                <span>concierge@burgermania.com</span>
              </li>
              <li className="flex items-start gap-2.5 pt-2">
                <Clock className="w-4 h-4 text-goldAccent shrink-0 mt-0.5" />
                <span>Mon – Sun: 11:00 AM – 2:00 AM EST</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="syne-font text-sm font-bold text-white uppercase tracking-wider mb-6">
              VIP Culinary Circle
            </h4>
            <p className="text-xs text-subText font-light leading-relaxed mb-4">
              Subscribe for private tasting invitations, seasonal truffle drops, and secret menu unlocks.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your VIP email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-subText focus:outline-none focus:border-goldAccent pr-10"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 p-1.5 rounded-lg bg-gold-gradient text-darkBg hover:scale-105 transition-transform"
                >
                  {subscribed ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                </button>
              </div>
              {subscribed && (
                <p className="text-[10px] text-goldAccent font-mono animate-fade-in">
                  ✓ Welcome to the VIP Circle.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[11px] text-subText font-mono gap-4">
          <p>© {new Date().getFullYear()} BURGER MANIA INC. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-goldAccent transition-colors">PRIVACY POLICY</a>
            <a href="#" className="hover:text-goldAccent transition-colors">TERMS OF SERVICE</a>
            <a href="#" className="hover:text-goldAccent transition-colors">NUTRITIONAL INFO</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

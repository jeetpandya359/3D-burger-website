import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingBag, ChevronDown, Sparkles, Flame, Eye } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroScrollExperience({ onOpenOrder }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const videoRef = useRef(null);

  const [loaded, setLoaded] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [currentStage, setCurrentStage] = useState('hero'); // 'hero' | 'lift' | 'box'

  // Preloaded image caches for 60fps canvas scroll-scrubbing
  const heroFrames = useRef([]);
  const liftFrames = useRef([]);
  const boxFrames = useRef([]);

  // Frame counts
  const TOTAL_HERO = 120;
  const TOTAL_LIFT = 119;
  const TOTAL_BOX = 120;
  const TOTAL_FRAMES = TOTAL_HERO + TOTAL_LIFT + TOTAL_BOX;

  useEffect(() => {
    let loadedCount = 0;
    const checkAllLoaded = () => {
      loadedCount++;
      if (loadedCount >= TOTAL_FRAMES - 10) { // allow margin
        setLoaded(true);
      }
    };

    // 1. Load Hero frames (1..120)
    for (let i = 1; i <= TOTAL_HERO; i++) {
      const img = new Image();
      img.src = `/first scene/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;
      img.onload = checkAllLoaded;
      img.onerror = checkAllLoaded;
      heroFrames.current.push(img);
    }

    // 2. Load Lift frames (2..120) -> 119 frames
    for (let i = 2; i <= 120; i++) {
      const img = new Image();
      img.src = `/second scene/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;
      img.onload = checkAllLoaded;
      img.onerror = checkAllLoaded;
      liftFrames.current.push(img);
    }

    // 3. Load Box frames (1..120)
    for (let i = 1; i <= TOTAL_BOX; i++) {
      const img = new Image();
      img.src = `/third scene/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;
      img.onload = checkAllLoaded;
      img.onerror = checkAllLoaded;
      boxFrames.current.push(img);
    }

  }, []);

  // Canvas drawing helper with crisp high-DPI aspect-ratio filling
  const renderFrame = (img) => {
    const canvas = canvasRef.current;
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    // Cover crop math
    const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
    const x = (canvasWidth - imgWidth * scale) / 2;
    const y = (canvasHeight - imgHeight * scale) / 2;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, x, y, imgWidth * scale, imgHeight * scale);
  };

  // Hero loop animation when user is idle at top of screen
  useEffect(() => {
    let animFrameId;
    let heroFrameIdx = 0;
    let lastTime = performance.now();

    const loopHero = (now) => {
      if (!hasScrolled) {
        if (now - lastTime > 33) { // ~30 fps loop
          heroFrameIdx = (heroFrameIdx + 1) % TOTAL_HERO;
          const img = heroFrames.current[heroFrameIdx];
          if (img) renderFrame(img);
          lastTime = now;
        }
        animFrameId = requestAnimationFrame(loopHero);
      }
    };

    if (loaded && !hasScrolled) {
      animFrameId = requestAnimationFrame(loopHero);
    }

    return () => cancelAnimationFrame(animFrameId);
  }, [loaded, hasScrolled]);

  // Setup GSAP ScrollTrigger timeline across the 3 scenes
  useEffect(() => {
    if (!loaded) return;

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        // render frame 0 initially
        renderFrame(heroFrames.current[0]);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const frameObj = { frameIndex: 0 };

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=400%', // 400vh total scroll distance for luxury cinematic pace
        pin: true,
        scrub: 0.4, // ultra-smooth spring response
        onUpdate: (self) => {
          const progress = self.progress;

          if (progress > 0.02 && !hasScrolled) {
            setHasScrolled(true);
          } else if (progress <= 0.02 && hasScrolled) {
            setHasScrolled(false);
          }

          // Determine stage and frame index
          if (progress < 0.25) {
            // Stage 1: Hero resting on black ceramic plate (frames 0..119)
            setCurrentStage('hero');
            const norm = progress / 0.25;
            const idx = Math.min(TOTAL_HERO - 1, Math.floor(norm * TOTAL_HERO));
            renderFrame(heroFrames.current[idx]);
          } else if (progress < 0.65) {
            // Stage 2: Burger lifts & ingredients float (frames 0..118)
            setCurrentStage('lift');
            const norm = (progress - 0.25) / 0.40;
            const idx = Math.min(TOTAL_LIFT - 1, Math.floor(norm * TOTAL_LIFT));
            renderFrame(liftFrames.current[idx]);
          } else {
            // Stage 3: Ingredients descend into burger box & box closes (frames 0..119)
            setCurrentStage('box');
            const norm = (progress - 0.65) / 0.35;
            const idx = Math.min(TOTAL_BOX - 1, Math.floor(norm * TOTAL_BOX));
            renderFrame(boxFrames.current[idx]);
          }
        }
      });
    }, containerRef);

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, [loaded]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-screen bg-[#050505] overflow-hidden select-none"
    >
      {/* 60 FPS Canvas Renderer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* HTML5 Video fallback reference for hero.mp4, lift.mp4, box.mp4 */}
      <video
        ref={videoRef}
        muted
        playsInline
        className="hidden"
        src="/hero.mp4"
      />

      {/* Cinematic Dark Vignette & Ambient Radial Lighting */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/70 pointer-events-none z-10" />
      <div className="absolute inset-0 bg-radial-glow pointer-events-none z-10 opacity-80" />

      {/* Overlay UI - STAGE 1: HERO OVERLAY */}
      {currentStage === 'hero' && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-between p-6 md:p-12 text-center pointer-events-auto">
          {/* Top subtle badge */}
          <div className="mt-20 md:mt-24">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-goldAccent/30 backdrop-blur-md"
            >
              <Sparkles className="w-3.5 h-3.5 text-goldAccent" />
              <span className="text-xs uppercase tracking-[0.25em] text-goldAccent font-semibold">
                The Pinnacle of Gourmet Engineering
              </span>
            </motion.div>
          </div>

          {/* Main Title & CTA */}
          <div className="flex flex-col items-center max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="syne-font text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight gold-gradient-text drop-shadow-2xl mb-4"
            >
              BURGER MANIA
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-lg md:text-2xl text-subText font-light tracking-[0.2em] uppercase mb-10 max-w-2xl"
            >
              Crafted Beyond Taste
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-5"
            >
              <button
                onClick={onOpenOrder}
                className="px-8 py-4 rounded-full bg-gold-gradient text-darkBg font-bold text-sm tracking-wider uppercase shadow-gold-glow hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-3 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Order Now</span>
              </button>

              <a
                href="#menu"
                className="glass-button px-8 py-4 rounded-full text-white font-semibold text-sm tracking-wider uppercase flex items-center gap-3"
              >
                <Eye className="w-4 h-4 text-goldAccent" />
                <span>Explore Menu</span>
              </a>
            </motion.div>
          </div>

          {/* Scroll Down Indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="mb-6 flex flex-col items-center gap-2 text-subText text-xs font-mono tracking-widest uppercase"
          >
            <span>Scroll to Experience</span>
            <ChevronDown className="w-5 h-5 text-goldAccent" />
          </motion.div>
        </div>
      )}

      {/* Overlay UI - STAGE 2: INGREDIENT EXPANSION CALLOUTS */}
      {currentStage === 'lift' && (
        <div className="absolute inset-0 z-20 pointer-events-none p-8 flex flex-col justify-between">
          <div className="pt-24 text-center">
            <motion.span
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-4 py-1.5 rounded-full bg-goldAccent/20 border border-goldAccent/50 text-goldAccent text-xs uppercase tracking-[0.3em] font-bold backdrop-blur-md"
            >
              Deconstructed Excellence
            </motion.span>
            <h2 className="syne-font text-3xl md:text-5xl font-extrabold text-white mt-4">
              FLOATING ARTISAN INGREDIENTS
            </h2>
          </div>

          {/* Floating Callout Badges around screen */}
          <div className="relative w-full h-full max-w-6xl mx-auto flex items-center justify-between">
            {/* Left Top Callout */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-panel p-4 rounded-2xl border border-white/10 max-w-xs absolute left-4 md:left-12 top-1/4 shadow-2xl"
            >
              <span className="text-goldAccent font-mono text-xs font-bold block mb-1">01. ARTISAN BRIOCHE</span>
              <p className="text-xs text-subText leading-relaxed">Glazed with organic French butter and slow-baked for velvet softness.</p>
            </motion.div>

            {/* Right Middle Callout */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-panel p-4 rounded-2xl border border-white/10 max-w-xs absolute right-4 md:right-12 top-2/5 shadow-2xl"
            >
              <span className="text-goldAccent font-mono text-xs font-bold block mb-1">02. JAPANESE WAGYU A5</span>
              <p className="text-xs text-subText leading-relaxed">Hand-selected marble score 9+ beef, seared at 700°F to seal rich juices.</p>
            </motion.div>

            {/* Left Bottom Callout */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-panel p-4 rounded-2xl border border-white/10 max-w-xs absolute left-4 md:left-16 bottom-1/4 shadow-2xl"
            >
              <span className="text-goldAccent font-mono text-xs font-bold block mb-1">03. AGED CHEDDAR & TRUFFLE</span>
              <p className="text-xs text-subText leading-relaxed">Melted 24-month aged vintage cheddar infused with black winter truffle glaze.</p>
            </motion.div>
          </div>
        </div>
      )}

      {/* Overlay UI - STAGE 3: BOX PACKAGING REVEAL */}
      {currentStage === 'box' && (
        <div className="absolute inset-0 z-20 pointer-events-none p-8 flex flex-col justify-between">
          <div className="pt-24 text-center">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="px-4 py-1.5 rounded-full bg-goldAccent/20 border border-goldAccent/50 text-goldAccent text-xs uppercase tracking-[0.3em] font-bold backdrop-blur-md"
            >
              Uncompromising Protection
            </motion.span>
            <h2 className="syne-font text-3xl md:text-6xl font-extrabold gold-gradient-text mt-4">
              SEALED IN LUXURY
            </h2>
            <p className="text-subText text-sm md:text-base mt-2 max-w-lg mx-auto font-light tracking-wide">
              Custom-engineered thermal vaults maintain exact 140°F serving temperature from kitchen to your hands.
            </p>
          </div>

          <div className="pb-16 text-center pointer-events-auto">
            <a
              href="#menu"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gold-gradient text-darkBg font-bold text-sm tracking-wider uppercase shadow-gold-glow hover:scale-105 transition-all duration-300"
            >
              <span>Explore The Menu Below</span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </a>
          </div>
        </div>
      )}
    </section>
  );
}

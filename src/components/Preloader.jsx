import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame } from 'lucide-react';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing Culinary Experience...');

  useEffect(() => {
    // Total frames across 3 scenes: 120 + 119 + 120 = 359 frames
    const scene1Count = 120;
    const scene2Count = 119;
    const scene3Count = 120;
    const totalItems = scene1Count + scene2Count + scene3Count;

    let loadedCount = 0;

    const updateProgress = () => {
      loadedCount++;
      const currentPct = Math.min(100, Math.floor((loadedCount / totalItems) * 100));
      setProgress(currentPct);

      if (currentPct < 35) {
        setStatusText('Preparing Black Ceramic Plate...');
      } else if (currentPct < 70) {
        setStatusText('Floating Fresh Artisan Ingredients...');
      } else if (currentPct < 99) {
        setStatusText('Sealing Luxury Packaging...');
      } else {
        setStatusText('Crafted Beyond Taste.');
      }

      if (loadedCount >= totalItems) {
        setTimeout(() => {
          onComplete();
        }, 600);
      }
    };

    // Fast batch preloader for high performance
    const loadBatch = (folder, start, count, padLen = 3) => {
      for (let i = start; i < start + count; i++) {
        const frameStr = String(i).padStart(padLen, '0');
        const img = new Image();
        img.src = `/${folder}/ezgif-frame-${frameStr}.jpg`;
        img.onload = updateProgress;
        img.onerror = updateProgress;
      }
    };

    loadBatch('first scene', 1, scene1Count);
    loadBatch('second scene', 2, scene2Count); // starts from ezgif-frame-002.jpg
    loadBatch('third scene', 1, scene3Count);

  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
      className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center p-6 text-white overflow-hidden select-none"
    >
      {/* Background ambient glow */}
      <div className="absolute w-[500px] h-[500px] bg-goldAccent/10 rounded-full blur-[140px] pointer-events-none animate-pulse-slow" />

      {/* Center Branding */}
      <div className="relative z-10 flex flex-col items-center max-w-md text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8 p-4 rounded-full bg-cardBg/80 border border-goldAccent/30 shadow-gold-glow flex items-center justify-center"
        >
          <Flame className="w-10 h-10 text-goldAccent animate-bounce" />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="syne-font text-4xl md:text-5xl font-extrabold tracking-tight mb-2 gold-gradient-text"
        >
          BURGER MANIA
        </motion.h1>

        <p className="text-sm font-medium tracking-[0.3em] uppercase text-subText mb-12">
          Crafted Beyond Taste
        </p>

        {/* Progress Bar Container */}
        <div className="w-full max-w-xs bg-white/5 border border-white/10 h-2 rounded-full overflow-hidden p-0.5 relative mb-4">
          <motion.div
            className="h-full bg-gold-gradient rounded-full shadow-gold-glow"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Progress % and Status Text */}
        <div className="flex justify-between items-center w-full max-w-xs text-xs font-mono text-subText">
          <span className="text-goldAccent font-bold">{progress}%</span>
          <span className="truncate max-w-[180px] text-right">{statusText}</span>
        </div>
      </div>
    </motion.div>
  );
}

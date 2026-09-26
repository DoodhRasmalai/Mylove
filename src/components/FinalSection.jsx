import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { siteConfig } from '../data/content';

export default function FinalSection() {
  const { finalSection } = siteConfig;

  const triggerLoveShower = () => {
    try {
      const count = 40;
      const defaults = {
        origin: { y: 0.72 },
        colors: ['#F8CAD4', '#F4B8C5', '#E48A9C', '#FFF0F3', '#D97388'],
        disableForReducedMotion: true,
      };

      confetti({
        ...defaults,
        particleCount: Math.floor(count * 0.5),
        spread: 45,
      });
      confetti({
        ...defaults,
        particleCount: Math.floor(count * 0.5),
        spread: 85,
      });
    } catch {}
  };

  return (
    <footer className="relative py-28 sm:py-36 px-4 sm:px-6 text-center overflow-hidden border-t border-[#F5DFE4]/40">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] rounded-full bg-gradient-to-b from-[#FCE4EA]/40 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-2xl mx-auto flex flex-col items-center">
        {/* Main Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#3B2025] font-normal tracking-tight mb-4"
        >
          {finalSection.heading}
        </motion.h2>

        {/* Revealed Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif italic text-xl sm:text-2xl md:text-3xl text-[#B84E66] font-medium leading-relaxed mb-6"
        >
          {finalSection.revealedHeading}
        </motion.p>

        {/* Glowing Heart with Gentle Animation */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5, type: 'spring' }}
          className="my-5"
        >
          <button
            onClick={triggerLoveShower}
            className="group relative p-3.5 rounded-full bg-white/80 border border-[#F4B8C5] shadow-soft-glow hover:shadow-rose-hover hover:scale-110 active:scale-95 transition-all duration-300"
            aria-label="Tap for love shower"
          >
            <Heart className="w-6 h-6 text-[#D97388] fill-[#D97388] animate-pulse" />
            <span className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[11px] font-serif italic text-[#B84E66] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              tap me ♡
            </span>
          </button>
        </motion.div>

        {/* Small Footer Text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.8 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="pt-8 border-t border-[#F5DEE3]/60 w-full max-w-xs flex items-center justify-center gap-2 text-xs text-[#77585E]"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#D97388]" />
          <span className="font-serif italic text-sm tracking-wide">
            {finalSection.footerNote}
          </span>
          <span className="text-[#D97388]">♡</span>
        </motion.div>
      </div>
    </footer>
  );
}

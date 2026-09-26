import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ChevronDown, Heart } from 'lucide-react';
import HeroCanvas from './HeroCanvas';
import { siteConfig } from '../data/content';

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const yText = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const scrollToEdits = () => {
    const editsSection = document.getElementById('edits');
    if (editsSection) {
      editsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-between items-center text-center px-4 sm:px-6 pt-28 pb-12 overflow-hidden"
    >
      {/* Soft radial background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-gradient-to-b from-[#FCE6EC]/55 via-[#FDF0F3]/30 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Main Hero Container */}
      <motion.div
        style={{ y: yText, opacity }}
        className="max-w-3xl mx-auto flex flex-col items-center justify-center my-auto z-10"
      >
        {/* Subtle romantic badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/75 backdrop-blur-md border border-[#F4B8C5]/60 shadow-sm mb-6 text-xs font-medium text-[#77585E]"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#D97388] animate-pulse" />
          <span className="tracking-widest uppercase text-[11px]">dedicated to someone irreplaceable</span>
          <Heart className="w-3 h-3 text-[#D97388] fill-[#D97388]/30" />
        </motion.div>

        {/* 3D Centerpiece - Translucent Glass Heart */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="my-1 sm:my-2 relative"
        >
          <HeroCanvas />
        </motion.div>

        {/* Romantic Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-[#3B2025] leading-[1.12] mb-5"
        >
          <span className="block font-serif italic text-[#3B2025]">for my favorite person</span>
          <span className="inline-block text-[#D97388] animate-pulse-subtle font-sans ml-2 text-3xl sm:text-4xl md:text-5xl">♡</span>
        </motion.h1>

        {/* Supporting Text */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-lg md:text-xl text-[#77585E] max-w-xl mx-auto font-light leading-relaxed mb-8 px-2"
        >
          {siteConfig.heroSubtitle}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <button
            onClick={scrollToEdits}
            className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FCE4EA] via-[#F8D0DA] to-[#FCE4EA] text-[#3B2025] font-medium text-sm sm:text-base border border-[#F4BAC7] shadow-rose-card hover:shadow-rose-hover hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 overflow-hidden"
          >
            {/* Shimmer light pass */}
            <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out" />
            <span className="font-serif italic text-lg sm:text-xl tracking-wide">{siteConfig.heroCta}</span>
            <span className="w-6 h-6 rounded-full bg-white/70 flex items-center justify-center text-[#B84E66] group-hover:rotate-12 transition-transform duration-300">
              🌸
            </span>
          </button>
        </motion.div>
      </motion.div>

      {/* Gentle Scroll Indicator */}
      <motion.button
        onClick={scrollToEdits}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        whileHover={{ opacity: 1, y: 2 }}
        className="z-10 flex flex-col items-center gap-1.5 text-xs text-[#77585E] hover:text-[#B84E66] transition-colors cursor-pointer"
        aria-label="Scroll to edits section"
      >
        <span className="font-serif italic tracking-wider text-xs">scroll to edits</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-[#D97388]" />
      </motion.button>
    </section>
  );
}

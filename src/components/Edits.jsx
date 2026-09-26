import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';
import VideoModal from './VideoModal';
import { siteConfig } from '../data/content';

export default function Edits() {
  const { editsSection } = siteConfig;
  const [activeEdit, setActiveEdit] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section id="edits" className="relative py-24 sm:py-32 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Background ambient blush blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full bg-gradient-to-r from-[#FCE4EA]/40 to-[#F7D2DB]/30 blur-3xl pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-widest text-[#B84E66] font-semibold mb-2 block font-sans"
        >
          {editsSection.tag}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#3B2025] font-normal tracking-tight mb-4"
        >
          {editsSection.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif italic text-lg sm:text-xl text-[#B84E66]"
        >
          {editsSection.subtitle}
        </motion.p>
      </div>

      {/* 3 Visual-First Cartoon Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-7 sm:gap-8">
        {editsSection.edits.map((edit, index) => {
          const isHovered = hoveredCard === edit.id;

          return (
            <motion.div
              key={edit.id}
              layoutId={`edit-card-${edit.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setHoveredCard(edit.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => setActiveEdit(edit)}
              className="group relative cursor-pointer glass-card rounded-3xl overflow-hidden flex flex-col transition-all duration-500 hover:shadow-rose-hover hover:-translate-y-2 border border-[#F4BAC7]/70 bg-white/60"
            >
              {/* Cute Floating Emoji / Hearts on hover */}
              <AnimatePresence>
                {isHovered && (
                  <>
                    <motion.span
                      initial={{ opacity: 0, y: 10, scale: 0.6 }}
                      animate={{ opacity: 0.9, y: -24, scale: 1.1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="absolute top-4 right-4 z-20 text-xl pointer-events-none drop-shadow-sm select-none"
                    >
                      {edit.floatingEmoji}
                    </motion.span>
                    <motion.span
                      initial={{ opacity: 0, y: 6, scale: 0.5 }}
                      animate={{ opacity: 0.85, y: -28, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.9, delay: 0.1, ease: 'easeOut' }}
                      className="absolute top-5 right-11 z-20 text-sm pointer-events-none select-none text-[#E48A9C]"
                    >
                      ♡
                    </motion.span>
                  </>
                )}
              </AnimatePresence>

              {/* Main Visual Thumbnail Area */}
              <div className="relative aspect-[16/11] overflow-hidden bg-[#FAF0F3]">
                <img
                  src={edit.thumbnail}
                  alt={edit.label}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  loading="lazy"
                />

                {/* Subtle soft gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-45 group-hover:opacity-65 transition-opacity duration-300" />

                {/* Center Glowing Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/90 backdrop-blur-md text-[#B84E66] flex items-center justify-center shadow-lg group-hover:scale-115 group-hover:bg-[#B84E66] group-hover:text-white transition-all duration-300 border border-white">
                    <Play className="w-6 h-6 fill-current translate-x-0.5" />
                  </div>
                </div>
              </div>

              {/* Minimal Card Header/Footer - ONLY Edit Number & Cute Emojis */}
              <div className="p-4 sm:p-5 flex items-center justify-center bg-white/80 border-t border-[#F5DEE3]/70">
                <span className="font-serif italic text-lg sm:text-xl font-medium tracking-wide text-[#3B2025] group-hover:text-[#B84E66] transition-colors select-none">
                  {edit.label}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Cinematic Modal / Video Viewer */}
      <AnimatePresence>
        {activeEdit && (
          <VideoModal edit={activeEdit} onClose={() => setActiveEdit(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

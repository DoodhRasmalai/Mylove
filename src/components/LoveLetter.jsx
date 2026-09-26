import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Sparkles, Heart, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { siteConfig } from '../data/content';

// Slow, emotional staggered reveal for paragraphs
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.22,
      delayChildren: 0.2,
    },
  },
};

const paragraphVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function LoveLetter() {
  const { loveLetterSection } = siteConfig;
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenLetter = () => {
    if (!isOpen) {
      setIsOpen(true);
      // Soft gentle sprinkle of pastel confetti
      try {
        confetti({
          particleCount: 28,
          spread: 55,
          origin: { y: 0.62 },
          colors: ['#F8CAD4', '#F4B8C5', '#E48A9C', '#FAF0F3'],
          disableForReducedMotion: true,
        });
      } catch {}
    }
  };

  const handleCloseLetter = (e) => {
    if (e) e.stopPropagation();
    setIsOpen(false);
  };

  return (
    <section id="love-letter" className="relative py-24 sm:py-32 px-4 sm:px-6 max-w-4xl mx-auto">
      {/* Background dreamy radial glow */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full blur-3xl pointer-events-none transition-all duration-1000 -z-10 ${
          isOpen
            ? 'bg-gradient-to-tr from-[#FCDDE5]/60 via-[#F8D2DB]/40 to-[#FAF0F3]/30 scale-110'
            : 'bg-gradient-to-tr from-[#FCE4EA]/40 via-[#FAF0F3]/25 to-transparent scale-100'
        }`}
      />

      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs uppercase tracking-widest text-[#B84E66] font-semibold mb-2 block font-sans"
        >
          {loveLetterSection.tag}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#3B2025] font-normal tracking-tight mb-3"
        >
          {loveLetterSection.heading}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif italic text-base sm:text-lg text-[#77585E]"
        >
          {loveLetterSection.subheading}
        </motion.p>
      </div>

      {/* Envelope & Letter Container */}
      <div className="relative flex flex-col items-center justify-center min-h-[460px] sm:min-h-[520px]">
        {/* Unfolded Letter Sheet (Slides out, slow emotional reveal) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 80, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 60, scale: 0.95 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-xl bg-[#FFFDF9] border border-[#F3CAD4] rounded-3xl p-6 sm:p-10 md:p-12 shadow-rose-hover relative z-30 mb-8 overflow-hidden"
              style={{
                backgroundImage:
                  'radial-gradient(rgba(224, 150, 168, 0.05) 1px, transparent 0)',
                backgroundSize: '22px 22px',
              }}
            >
              {/* Subtle top delicate bar */}
              <div className="flex items-center justify-between border-b border-[#F5DEE3] pb-4 mb-8 text-xs text-[#A4868C]">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#D97388]" />
                  <span className="font-serif italic text-xs tracking-wider">written with love</span>
                </div>
                <button
                  onClick={handleCloseLetter}
                  className="flex items-center gap-1.5 text-xs text-[#77585E] hover:text-[#B84E66] transition-colors px-3 py-1 rounded-full bg-[#FAF5F2] hover:bg-[#FCE7EB] border border-[#F2CAD3] font-serif italic"
                  title="Close letter"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{loveLetterSection.closeButtonText}</span>
                </button>
              </div>

              {/* Letter Content: Animate one paragraph at a time */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6 text-[#3B2025]"
              >
                {/* Salutation */}
                <motion.div variants={paragraphVariants}>
                  <p className="font-serif text-2xl sm:text-3xl font-medium text-[#3B2025] tracking-tight">
                    {loveLetterSection.salutation}
                  </p>
                </motion.div>

                {/* Paragraph 1 */}
                <motion.p
                  variants={paragraphVariants}
                  className="font-serif text-base sm:text-lg text-[#4A2D33] font-light leading-relaxed"
                >
                  Sometimes I wonder what our future will look like, and somehow, I always find myself imagining you in it.
                </motion.p>

                {/* Paragraph 2 */}
                <motion.p
                  variants={paragraphVariants}
                  className="font-serif text-base sm:text-lg text-[#4A2D33] font-light leading-relaxed"
                >
                  I want to see you achieve every dream you've been working for. I want to achieve mine too. And more than anything, I want us to be there for each other while we do it.
                </motion.p>

                {/* Paragraph 3 */}
                <motion.p
                  variants={paragraphVariants}
                  className="font-serif text-base sm:text-lg text-[#4A2D33] font-light leading-relaxed"
                >
                  I want to be beside you on the days when everything feels perfect, and hold your hand on the days when nothing does.
                </motion.p>

                {/* Paragraph 4 */}
                <motion.p
                  variants={paragraphVariants}
                  className="font-serif text-base sm:text-lg text-[#4A2D33] font-light leading-relaxed"
                >
                  I want us to grow together, laugh over the smallest things, travel, make our own little memories, and one day look back at these days and smile because we made it through everything together.
                </motion.p>

                {/* Paragraph 5 */}
                <motion.div variants={paragraphVariants} className="space-y-2">
                  <p className="font-serif text-base sm:text-lg text-[#4A2D33] font-light leading-relaxed">
                    And someday, I hope we get to celebrate our love with a beautiful wedding, build a little home filled with happiness, and maybe have tiny little versions of us running around saying,
                  </p>
                  <p className="font-serif italic text-lg sm:text-xl font-medium text-[#B84E66] pl-4 border-l-2 border-[#F4B8C5] bg-[#FFF9FA] py-2 rounded-r-xl">
                    “We have the cutest mom and the best parents.” ♡
                  </p>
                </motion.div>

                {/* Paragraph 6 */}
                <motion.div variants={paragraphVariants} className="space-y-1 pt-1">
                  <p className="font-serif text-base sm:text-lg text-[#4A2D33] font-light leading-relaxed">
                    I don't know exactly where life will take us.
                  </p>
                  <p className="font-serif text-base sm:text-lg text-[#4A2D33] font-light leading-relaxed">
                    But if I get to choose one thing about my future,
                  </p>
                </motion.div>

                {/* SPECIAL CINEMATIC REVEAL: "I'd choose you." */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, scale: 0.94, y: 16 },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      y: 0,
                      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                  className="py-2 text-center"
                >
                  <div className="inline-block px-6 py-2.5 rounded-2xl bg-gradient-to-r from-[#FDF0F3] via-[#FCE4EA] to-[#FDF0F3] border border-[#F4B8C5] shadow-xs">
                    <span className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-[#B84E66] font-semibold tracking-wide">
                      I'd choose you.
                    </span>
                  </div>
                </motion.div>

                {/* Paragraph 8 */}
                <motion.p
                  variants={paragraphVariants}
                  className="font-serif text-base sm:text-lg text-[#4A2D33] font-light leading-relaxed text-center"
                >
                  Through the highs, the lows, the chaos and the beautiful moments —
                </motion.p>

                {/* Paragraph 9 */}
                <motion.p
                  variants={paragraphVariants}
                  className="font-serif text-xl sm:text-2xl text-[#3B2025] font-medium text-center"
                >
                  I want to keep choosing you.
                </motion.p>

                {/* THEN REVEAL: "Our story is only getting started. ♡" */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 18, scale: 0.95 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                  className="pt-3 pb-2 text-center"
                >
                  <p className="font-serif italic text-2xl sm:text-3xl text-[#B84E66] font-medium tracking-wide">
                    Our story is only getting started. ♡
                  </p>
                </motion.div>

                {/* Signature & Close Button */}
                <motion.div
                  variants={paragraphVariants}
                  className="pt-6 border-t border-[#F5DEE3]/70 flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                  <button
                    onClick={handleCloseLetter}
                    className="order-2 sm:order-1 text-xs text-[#77585E] hover:text-[#B84E66] transition-colors flex items-center gap-1 font-serif italic underline underline-offset-4"
                  >
                    <span>{loveLetterSection.closeButtonText}</span>
                  </button>

                  <div className="order-1 sm:order-2 text-right">
                    <p className="font-handwriting text-3xl sm:text-4xl text-[#B84E66] font-medium tracking-wide">
                      {loveLetterSection.signature}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3D Envelope Base (Click to Open) */}
        {!isOpen && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.025, y: -4 }}
            onClick={handleOpenLetter}
            className="cursor-pointer group relative w-full max-w-md aspect-[16/10] rounded-3xl bg-[#FAF0F3] border border-[#F4B8C5] shadow-rose-card hover:shadow-rose-hover transition-all duration-400 p-6 flex flex-col justify-between overflow-hidden"
          >
            {/* Envelope flap folded down effect */}
            <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-[#FCE4EA] to-[#F8D2DB]/65 border-b border-[#F4BAC7] [clip-path:polygon(0_0,100%_0,50%_100%)] transition-transform duration-500 origin-top group-hover:-translate-y-1" />

            {/* Top Bar inside envelope preview */}
            <div className="relative z-10 flex justify-between items-center text-xs text-[#A4868C]">
              <span className="font-serif italic tracking-wide">for your eyes only</span>
              <Mail className="w-4 h-4 text-[#D97388]" />
            </div>

            {/* Wax Seal Stamp in the center */}
            <div className="relative z-20 flex flex-col items-center justify-center my-auto">
              <motion.div
                whileHover={{ scale: 1.12, rotate: 6 }}
                className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-tr from-[#B84E66] via-[#D97388] to-[#E48A9C] text-white flex items-center justify-center shadow-lg border-2 border-white/60 relative"
              >
                {/* Embossed ring */}
                <div className="absolute inset-1 rounded-full border border-white/30" />
                <Heart className="w-7 h-7 fill-white text-white drop-shadow-sm" />
              </motion.div>

              {/* Envelope Headings */}
              <span className="mt-4 font-serif italic text-lg sm:text-xl text-[#3B2025] group-hover:text-[#B84E66] transition-colors tracking-wide font-medium">
                {loveLetterSection.envelopeTitle}
              </span>
              <span className="text-xs text-[#A4868C] font-light mt-0.5">
                {loveLetterSection.envelopeSubtitle}
              </span>
            </div>

            {/* Bottom prompt note */}
            <div className="relative z-10 flex justify-center text-[11px] font-sans tracking-widest uppercase text-[#B84E66]/80 font-medium">
              tap to open ♡
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

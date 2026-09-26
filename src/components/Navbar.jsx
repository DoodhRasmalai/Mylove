import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart } from 'lucide-react';
import AudioPlayer from './AudioPlayer';
import { siteConfig } from '../data/content';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Track active section for Home | Edits | Letter
      const sections = ['hero', 'edits', 'love-letter'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 py-3 px-4 sm:px-8 flex justify-center ${
        scrolled ? 'backdrop-blur-md bg-[#FAF7F5]/80 shadow-sm border-b border-[#F5DFE4]/50' : 'bg-transparent'
      }`}
    >
      <nav
        aria-label="Main Navigation"
        className={`w-full max-w-4xl flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-full transition-all duration-300 ${
          scrolled ? 'glass-nav shadow-soft-glow' : 'bg-white/50 backdrop-blur-sm border border-white/60'
        }`}
      >
        {/* Brand / Name */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('#hero');
          }}
          className="flex items-center gap-2 group cursor-pointer select-none"
        >
          <span className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#F8D2DB] to-[#FCE7EB] flex items-center justify-center text-[#B84E66] shadow-sm transition-transform duration-300 group-hover:scale-110">
            <Heart className="w-3.5 h-3.5 fill-[#D97388] text-[#D97388]" />
          </span>
          <span className="font-serif italic text-lg sm:text-xl font-medium tracking-tight text-[#3B2025]">
            {siteConfig.recipientName.toLowerCase()}
            <span className="text-[#D97388] not-italic ml-1">♡</span>
          </span>
        </a>

        {/* Desktop Links: strictly Home | Edits | Letter */}
        <div className="hidden md:flex items-center gap-2">
          {siteConfig.navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.href);
                }}
                className={`relative px-4 py-1.5 rounded-full text-xs tracking-wider uppercase font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-[#B84E66] font-semibold'
                    : 'text-[#77585E] hover:text-[#3B2025]'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-[#FCE7EB]/90 rounded-full -z-10 border border-[#F6CAD3]"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                {link.name}
              </a>
            );
          })}
        </div>

        {/* Right side controls: Audio Player + Mobile Toggle */}
        <div className="flex items-center gap-2">
          <AudioPlayer />

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-[#77585E] hover:text-[#3B2025] hover:bg-[#FCE7EB]/50 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer/Modal */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed top-20 inset-x-4 max-w-sm mx-auto glass-card rounded-3xl p-5 shadow-2xl border border-[#F4BAC7] flex flex-col gap-3 z-50"
          >
            <div className="flex items-center justify-between border-b border-[#F4BAC7]/30 pb-3">
              <span className="font-serif italic text-sm text-[#77585E]">
                for {siteConfig.recipientName} ♡
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-[#77585E] hover:text-[#3B2025]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col gap-1 py-1">
              {siteConfig.navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollTo(link.href)}
                  className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-[#4A282E] hover:bg-[#FDF0F3] hover:text-[#B84E66] transition-colors flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <span className="text-xs text-[#D97388]">♡</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

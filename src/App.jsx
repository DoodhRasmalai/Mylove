import React from 'react';
import FloatingPetals from './components/FloatingPetals';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Edits from './components/Edits';
import LoveLetter from './components/LoveLetter';
import FinalSection from './components/FinalSection';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#FAF7F5] text-[#3B2025] selection:bg-[#F8CAD4] selection:text-[#3B2025]">
      {/* Ambient floating petals and stardust */}
      <FloatingPetals />

      {/* Floating Glass Navigation: strictly Home | Edits | Letter */}
      <Navbar />

      {/* 4 Core Sections */}
      <main className="relative z-10">
        <Hero />
        <Edits />
        <LoveLetter />
        <FinalSection />
      </main>
    </div>
  );
}

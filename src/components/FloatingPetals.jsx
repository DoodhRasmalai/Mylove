import React, { useMemo } from 'react';

/**
 * FloatingPetals: Generates gentle, randomized soft rose petals and tiny stardust specks
 * that drift smoothly in the background for a dreamy, poetic atmosphere.
 */
export default function FloatingPetals() {
  const petals = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      size: Math.floor(Math.random() * 12) + 10, // 10px to 22px
      left: Math.random() * 100, // percentage
      top: Math.random() * 100, // initial top percentage
      duration: Math.random() * 12 + 16, // 16s to 28s
      delay: Math.random() * 8,
      rotation: Math.random() * 360,
      opacity: Math.random() * 0.45 + 0.25,
      type: i % 4 === 0 ? 'sparkle' : 'petal',
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute will-change-transform"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            opacity: p.opacity,
            animation: `driftPetal ${p.duration}s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.type === 'sparkle' ? (
            <svg
              width={p.size}
              height={p.size}
              viewBox="0 0 24 24"
              fill="none"
              stroke="#E89BAE"
              strokeWidth="1.5"
              className="animate-pulse"
              style={{ filter: 'drop-shadow(0 0 6px rgba(244, 184, 197, 0.6))' }}
            >
              <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" />
            </svg>
          ) : (
            <div
              style={{
                width: `${p.size}px`,
                height: `${p.size * 1.3}px`,
                borderRadius: '50% 0 50% 50%',
                background: 'linear-gradient(135deg, #FDE8EC 0%, #F5BAC7 60%, #E891A4 100%)',
                transform: `rotate(${p.rotation}deg)`,
                boxShadow: '0 4px 12px rgba(235, 145, 164, 0.18)',
              }}
            />
          )}
        </div>
      ))}

      <style>{`
        @keyframes driftPetal {
          0% {
            transform: translateY(0vh) translateX(0px) rotate(0deg);
          }
          33% {
            transform: translateY(30vh) translateX(25px) rotate(120deg);
          }
          66% {
            transform: translateY(65vh) translateX(-20px) rotate(240deg);
          }
          100% {
            transform: translateY(110vh) translateX(15px) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

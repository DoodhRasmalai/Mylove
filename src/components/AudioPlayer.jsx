import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

/**
 * AudioPlayer: A dreamy, non-intrusive ambient melody player.
 * Uses Web Audio API synth to generate a soft, lofi romantic chime chord progression
 * (or toggleable melody) without depending on flaky external audio hosts.
 */
export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const intervalRef = useRef(null);

  // Soft pentatonic romantic notes (frequencies in Hz: F3, G#3, C4, D#4, F4, G#4, C5)
  const notes = [174.61, 207.65, 261.63, 311.13, 349.23, 415.30, 523.25];

  const playChime = (freq) => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // Warm soft envelope: slow attack, long gentle decay
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.045, ctx.currentTime + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 3.4);
  };

  const startMelody = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }

    let noteIndex = 0;
    // Dreamy arpeggiated romantic sequence
    const sequence = [0, 2, 4, 3, 2, 4, 5, 4, 2, 3, 1, 3];

    // Play first note immediately
    playChime(notes[sequence[0]]);

    intervalRef.current = setInterval(() => {
      noteIndex = (noteIndex + 1) % sequence.length;
      playChime(notes[sequence[noteIndex]]);
      // Occasional gentle harmony note
      if (noteIndex % 3 === 0) {
        setTimeout(() => {
          playChime(notes[(sequence[noteIndex] + 2) % notes.length]);
        }, 320);
      }
    }, 1800);
  };

  const stopMelody = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopMelody();
      setIsPlaying(false);
    } else {
      startMelody();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      stopMelody();
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <button
      onClick={toggleMusic}
      title={isPlaying ? 'Pause romantic melody' : 'Play soft melody'}
      className={`group flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 border ${
        isPlaying
          ? 'bg-[#FBE4E9] text-[#B84E66] border-[#F4B8C5] shadow-sm'
          : 'bg-white/80 text-[#77585E] hover:text-[#B84E66] border-[#F2D5DC]/60 hover:bg-[#FDF0F3]'
      }`}
    >
      {isPlaying ? (
        <>
          <div className="flex items-end gap-[2px] h-3 w-3.5">
            <span className="w-0.5 bg-[#B84E66] rounded-full animate-bounce [animation-duration:800ms]" style={{ height: '70%' }} />
            <span className="w-0.5 bg-[#B84E66] rounded-full animate-bounce [animation-duration:1100ms] [animation-delay:150ms]" style={{ height: '100%' }} />
            <span className="w-0.5 bg-[#B84E66] rounded-full animate-bounce [animation-duration:900ms] [animation-delay:300ms]" style={{ height: '50%' }} />
          </div>
          <span className="font-serif italic tracking-wide text-xs">our melody</span>
          <Volume2 className="w-3.5 h-3.5 opacity-80" />
        </>
      ) : (
        <>
          <Music className="w-3 h-3 text-[#D97388] group-hover:scale-110 transition-transform" />
          <span className="font-serif italic tracking-wide text-xs">play melody</span>
          <VolumeX className="w-3 h-3 opacity-50" />
        </>
      )}
    </button>
  );
}

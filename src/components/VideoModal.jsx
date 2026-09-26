import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  Sparkles,
  Film
} from 'lucide-react';

export default function VideoModal({ edit, onClose }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.85);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [duration, setDuration] = useState('0:00');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [autoplayBlockedSound, setAutoplayBlockedSound] = useState(false);
  const controlsTimeoutRef = useRef(null);

  // Format seconds to mm:ss
  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Autoplay video on mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = volume;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // If browser policy blocks sound with autoplay, mute and try again
          video.muted = true;
          setIsMuted(true);
          setAutoplayBlockedSound(true);
          video.play().then(() => setIsPlaying(true)).catch(() => {});
        });
    }

    return () => {
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.muted) {
      video.muted = false;
      setIsMuted(false);
      setAutoplayBlockedSound(false);
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (videoRef.current) {
      videoRef.current.volume = newVol;
      videoRef.current.muted = newVol === 0;
      setIsMuted(newVol === 0);
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;
    const current = video.currentTime;
    const total = video.duration || 1;
    setProgress((current / total) * 100);
    setCurrentTime(formatTime(current));
    setDuration(formatTime(total));
  };

  const handleSeek = (e) => {
    const video = videoRef.current;
    if (!video) return;
    const seekPercent = parseFloat(e.target.value);
    const newTime = (seekPercent / 100) * (video.duration || 1);
    video.currentTime = newTime;
    setProgress(seekPercent);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Auto-hide controls after inactivity
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3200);
  };

  const displayName = edit.label || `EDIT 0${edit.id} ♡`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/90 backdrop-blur-2xl overflow-y-auto"
      onClick={onClose}
    >
      {/* Background cinematic bokeh glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-gradient-to-r from-[#D97388]/20 via-[#E48A9C]/15 to-[#B84E66]/20 blur-3xl pointer-events-none -z-10" />

      {/* Main Theater Container */}
      <motion.div
        ref={containerRef}
        layoutId={`edit-card-${edit.id}`}
        initial={{ scale: 0.88, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 20 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        onMouseMove={handleMouseMove}
        className="relative w-full max-w-4xl bg-[#140D10]/95 border border-[#F2CAD3]/25 rounded-3xl sm:rounded-4xl shadow-cinema overflow-hidden flex flex-col my-auto"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-white/10 bg-gradient-to-r from-black/40 to-transparent">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-full bg-[#B84E66]/25 border border-[#F4B8C5]/30 flex items-center justify-center text-[#F4B8C5]">
              <Film className="w-4 h-4" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-serif italic text-white/90 tracking-wide">
                  {displayName}
                </span>
                <span className="text-[11px] text-white/50">• private cinema</span>
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-all duration-200 border border-white/10 hover:scale-105 active:scale-95"
            aria-label="Close cinematic video viewer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Canvas Area */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center group overflow-hidden">
          <video
            ref={videoRef}
            src={edit.video}
            poster={edit.thumbnail}
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
            onClick={togglePlay}
            playsInline
            className="w-full h-full object-contain cursor-pointer"
          />

          {/* Unmute Notification Banner (if autoplay muted by browser) */}
          <AnimatePresence>
            {autoplayBlockedSound && isMuted && (
              <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onClick={toggleMute}
                className="absolute top-4 left-1/2 -translate-x-1/2 z-30 px-4 py-2 rounded-full bg-[#B84E66]/90 hover:bg-[#D97388] text-white text-xs sm:text-sm font-medium flex items-center gap-2 shadow-xl border border-white/20 backdrop-blur-md transition-transform hover:scale-105"
              >
                <Volume2 className="w-4 h-4 animate-bounce" />
                <span>Tap to enable sound ♡</span>
              </motion.button>
            )}
          </AnimatePresence>

          {/* Big Center Play/Pause Overlay indicator when paused */}
          {!isPlaying && (
            <button
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/40 transition-colors z-20"
              aria-label="Play video"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#B84E66]/90 text-white flex items-center justify-center shadow-2xl border border-white/30 hover:scale-110 active:scale-95 transition-all">
                <Play className="w-8 h-8 fill-white translate-x-0.5" />
              </div>
            </button>
          )}

          {/* Elegant Floating Player Controls */}
          <div
            className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 sm:p-6 transition-opacity duration-300 z-30 ${
              showControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            {/* Scrubber timeline */}
            <div className="flex items-center gap-3 mb-3">
              <input
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={progress}
                onChange={handleSeek}
                className="w-full h-1.5 rounded-lg appearance-none bg-white/20 accent-[#E48A9C] cursor-pointer hover:h-2 transition-all"
                aria-label="Video timeline scrubber"
              />
            </div>

            <div className="flex items-center justify-between text-white text-xs sm:text-sm">
              <div className="flex items-center gap-3 sm:gap-4">
                {/* Play / Pause button */}
                <button
                  onClick={togglePlay}
                  className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 fill-white" />
                  ) : (
                    <Play className="w-5 h-5 fill-white" />
                  )}
                </button>

                {/* Volume / Mute button */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleMute}
                    className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors"
                    aria-label={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-4 h-4 text-[#F4BAC7]" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="hidden sm:block w-16 h-1 rounded-lg appearance-none bg-white/20 accent-[#E48A9C] cursor-pointer"
                    aria-label="Volume slider"
                  />
                </div>

                {/* Timestamp */}
                <span className="text-[11px] sm:text-xs text-white/70 font-mono">
                  {currentTime} / {duration}
                </span>
              </div>

              {/* Right controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleFullscreen}
                  className="p-1.5 rounded-full hover:bg-white/10 text-white transition-colors"
                  aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                >
                  {isFullscreen ? (
                    <Minimize2 className="w-4 h-4" />
                  ) : (
                    <Maximize2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Minimal Clean Footer */}
        <div className="px-5 sm:px-7 py-3.5 bg-gradient-to-b from-[#140D10] to-[#1C1217] flex items-center justify-between border-t border-white/5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#E48A9C]" />
            <span className="font-serif italic text-xs sm:text-sm text-white/80">
              a private little cinema just for you ♡
            </span>
          </div>

          <span className="text-xs text-[#E48A9C]/70 font-mono">Esc to close</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

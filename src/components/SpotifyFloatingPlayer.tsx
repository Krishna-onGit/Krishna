'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function SpotifyFloatingPlayer() {
  const [isExpanded, setIsExpanded] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsExpanded(true);
    }, 180);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsExpanded(false);
    }, 250);
  };

  const noiseSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`;

  return (
    <div 
      className="fixed bottom-6 left-4 md:bottom-12 md:left-10 z-[100] pointer-events-auto group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex flex-col items-start relative">
        {/* Persistent Card Container - Stays in DOM so music keeps playing */}
        <motion.div
          initial={false}
          animate={{ 
            opacity: isExpanded ? 1 : 0,
            scale: isExpanded ? 1 : 0.98,
            y: isExpanded ? 0 : 15,
            filter: isExpanded ? 'blur(0px)' : 'blur(15px)',
            pointerEvents: isExpanded ? 'auto' : 'none'
          }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="absolute bottom-full left-0 mb-6"
        >
          <div className="relative group/card">
            {/* Premium Glass Frame */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-3xl rounded-[16px] border border-white/10 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.6)]" />
            
            {/* Surface Texture */}
            <div 
              className="absolute inset-0 opacity-[0.01] pointer-events-none rounded-[16px]" 
              style={{ backgroundImage: noiseSvg }}
            />

            <div className="relative w-[340px] pt-10 pb-2 overflow-hidden rounded-[16px]">
              {/* Subtle Label Overlay - Centered for balance */}
              <div className="flex items-center justify-center gap-2.5 mb-5 opacity-40">
                <svg className="w-3.5 h-3.5 text-[#1DB954]" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.49 17.306c-.215.353-.673.465-1.025.248-2.853-1.745-6.445-2.14-10.675-1.173-.404.093-.812-.163-.905-.566-.093-.404.163-.813.566-.906 4.63-1.06 8.618-.61 11.79 1.336.353.216.465.673.249 1.025zm1.465-3.265c-.27.439-.844.58-1.282.311-3.262-2.005-8.232-2.585-12.088-1.414-.495.15-.1.022-.646-.128-.15-.495.128-1.022.646-1.17 4.406-1.338 9.888-.69 13.56 1.564.438.27.58.844.31 1.282zm.126-3.413c-3.913-2.324-10.366-2.538-14.123-1.398-.6.183-1.235-.164-1.418-.763-.183-.6.164-1.235.763-1.418 4.305-1.306 11.433-1.053 15.93 1.62.54.32.716 1.015.396 1.555-.32.54-1.015.716-1.554.397z"/>
                </svg>
                <span className="text-mono text-[9px] tracking-[0.4em] uppercase text-white font-medium">Current Rotation</span>
              </div>

              {/* Masked Spotify Engine */}
              <div className="relative h-[310px] w-full mt-2 overflow-hidden px-4">
                <div className="absolute top-0 left-0 w-full -translate-y-[215px]">
                  <iframe
                    src="https://open.spotify.com/embed/playlist/7eW612B55r4DXl3ucXYvLf?utm_source=generator&theme=0"
                    width="100%"
                    height="650"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="opacity-90 grayscale-[0.2] hover:grayscale-0 transition-all duration-700 brightness-110 contrast-125 rounded-2xl"
                  />
                </div>
                
                {/* Surgical Precision Masks */}
                <div className="absolute top-0 inset-x-0 h-6 bg-gradient-to-b from-black/40 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 inset-x-0 h-6 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trigger Button */}
        <motion.div
          whileTap={{ scale: 0.98 }}
          className="relative cursor-pointer"
        >
          {/* Ambient Glow - Matched to Football logic */}
          <div className="absolute inset-0 bg-[#1DB954]/10 rounded-full blur-xl scale-0 group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
          
          <div className="w-10 h-10 md:w-12 md:h-12 bg-black/40 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center group-hover:border-[#1DB954]/20 transition-all duration-500 shadow-2xl relative">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 md:w-5 md:h-5 text-[#1DB954] opacity-70 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              style={{ filter: 'drop-shadow(0 0 3px rgba(29, 185, 84, 0.5))' }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.49 17.306c-.215.353-.673.465-1.025.248-2.853-1.745-6.445-2.14-10.675-1.173-.404.093-.812-.163-.905-.566-.093-.404.163-.813.566-.906 4.63-1.06 8.618-.61 11.79 1.336.353.216.465.673.249 1.025zm1.465-3.265c-.27.439-.844.58-1.282.311-3.262-2.005-8.232-2.585-12.088-1.414-.495.15-.1.022-.646-.128-.15-.495.128-1.022.646-1.17 4.406-1.338 9.888-.69 13.56 1.564.438.27.58.844.31 1.282zm.126-3.413c-3.913-2.324-10.366-2.538-14.123-1.398-.6.183-1.235-.164-1.418-.763-.183-.6.164-1.235.763-1.418 4.305-1.306 11.433-1.053 15.93 1.62.54.32.716 1.015.396 1.555-.32.54-1.015.716-1.554.397z"/>
              </svg>
            </motion.div>
            <div className="absolute inset-0 border border-white/5 rounded-full" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

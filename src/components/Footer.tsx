'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';



function SocialIcon({ icon, color }: { icon: React.ReactNode, color: string }) {
  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className={`w-12 h-12 rounded-xl flex items-center justify-center text-white cursor-pointer transition-all grayscale opacity-60 hover:grayscale-0 hover:opacity-100 ${color}`}
    >
      {icon}
    </motion.div>
  );
}

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });



  const textY = useTransform(scrollYProgress, [0, 1], [120, 0]);
  const krishnaOpacity = useTransform(scrollYProgress, [0.4, 0.8], [0, 0.4]);

  return (
    <footer
      ref={containerRef}
      className="w-full min-h-0 bg-black pb-12 page-padding relative overflow-hidden flex flex-col items-center group/footer"
      onMouseMove={(e) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          containerRef.current?.style.setProperty('--mouse-x', `${x}px`);
          containerRef.current?.style.setProperty('--mouse-y', `${y}px`);
        }
      }}
      id="contact"
    >
      {/* Top Label - Desktop Only Absolute Positioning */}
      <div className="hidden lg:block absolute top-20 left-1/2 -translate-x-1/2 z-10">
        <span className="text-mono text-textTertiary opacity-60">08 / CONTACT</span>
      </div>

      {/* Background Big Text "KRISHNA" - Desktop Only Spotlight Effect */}
      <div 
        className="hidden lg:block absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center select-none pointer-events-none z-0"
      >
        {/* Base Layer */}
        <h1 className="text-[20vw] font-display font-semibold tracking-tighter uppercase leading-none bg-gradient-to-b from-white/20 via-white/5 to-transparent bg-clip-text text-transparent">
          KRISHNA
        </h1>
        
        {/* Shine Layer (Revealed by Mask) */}
        <h1 
          className="absolute inset-0 text-[20vw] font-display font-semibold tracking-tighter uppercase leading-none text-white/60 pointer-events-none"
          style={{
            maskImage: `radial-gradient(circle 125px at var(--mouse-x) var(--mouse-y), white, transparent)`,
            WebkitMaskImage: `radial-gradient(circle 125px at var(--mouse-x) var(--mouse-y), white, transparent)`,
          }}
        >
          KRISHNA
        </h1>
      </div>

      <div className="max-w-[1500px] mx-auto w-full relative z-10 flex flex-col items-center">
        {/* Mobile Label - Integrated into flow */}
        <div className="lg:hidden mb-12 opacity-40">
          <span className="text-mono text-textTertiary">08 / CONTACT</span>
        </div>

        {/* Mobile Name - Only visible on mobile, follows order */}
        <div className="lg:hidden w-full text-center mb-6">
          <h1 className="text-[18vw] font-display font-semibold tracking-tighter uppercase leading-none bg-gradient-to-b from-white/40 to-white/10 bg-clip-text text-transparent">
            KRISHNA
          </h1>
        </div>

        {/* Vertical Spacer to push content down after the big text (Desktop Only) */}
        <div className="hidden lg:block h-[40vh]" aria-hidden="true" />

        {/* 3-Zone Contact Component (Socials - Email - Headline) */}
        <div className="flex flex-col lg:grid lg:grid-cols-3 items-center gap-8 lg:gap-8 w-full">
          
          {/* Social Icons - Order 2 on mobile */}
          <div className="flex items-center gap-5 justify-center lg:justify-start lg:pb-2 order-2 lg:order-1">
            <SocialIcon 
              color="bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]" 
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              } 
            />
            <SocialIcon 
              color="bg-[#0077B5]" 
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              } 
            />
            <SocialIcon 
              color="bg-[#24292e] text-white" 
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.041-1.416-4.041-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              } 
            />
            <SocialIcon 
              color="bg-white text-black" 
              icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              } 
            />
          </div>

          {/* Center Zone: Email - Order 3 on mobile */}
          <div className="flex flex-col items-center text-center order-3 lg:order-2">
            <div className="flex flex-col items-center gap-4">
              <motion.a
                href="mailto:hello@krishna.design"
                className="text-mono text-[12px] text-textSecondary hover:text-white transition-colors tracking-[0.2em]"
                whileHover={{ y: -2 }}
              >
                HELLO@KRISHNA.DESIGN
              </motion.a>
            </div>
          </div>

          {/* Right Zone: Headline - Order 4 on mobile */}
          <div className="text-center lg:text-right order-4 lg:order-3">
            <h2 className="text-h2 text-white whitespace-nowrap">
              Let's build something.
            </h2>
          </div>
        </div>

        {/* Vertical Spacer - Minimal on mobile */}
        <div className="h-4 lg:h-48" aria-hidden="true" />

        {/* Footer Bar - Plain Text in Footer Flow */}
        <div className="w-full border-t border-white/5 pt-24 mb-20">
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-16">
            <span className="text-nav text-white/40 whitespace-nowrap">
              Design & Dev by Krsna <span className="mx-2">•</span> © {new Date().getFullYear()}
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}

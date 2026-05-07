'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';



function SocialIcon({ icon, color }: { icon: React.ReactNode, color: string }) {
  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className={`w-12 h-12 rounded-xl flex items-center justify-center text-textPrimary cursor-pointer transition-all grayscale opacity-60 hover:grayscale-0 hover:opacity-100 ${color}`}
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
      className="w-full min-h-0 bg-bgPrimary pb-24 page-padding relative overflow-hidden flex flex-col items-center group/footer transition-colors duration-500"
      onMouseMove={(e) => {
        if (window.innerWidth <= 768) return;
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
        <span className="text-mono text-textTertiary opacity-60">CONTACT</span>
      </div>

      {/* Background Big Text "KRISHNA" */}
      <div 
        className="absolute top-[35%] md:top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center select-none pointer-events-none z-0"
      >
        {/* Base Layer */}
        <h1 className="text-[22vw] md:text-[20vw] font-display font-semibold tracking-normal md:tracking-tighter uppercase leading-none bg-gradient-to-b from-textPrimary/20 via-textPrimary/5 to-transparent bg-clip-text text-transparent transition-all duration-700">
          KRISHNA
        </h1>
        
        {/* Shine Layer (Revealed by Mask) - Desktop Only */}
        <h1 
          className="absolute inset-0 text-[20vw] font-display font-semibold tracking-tighter uppercase leading-none text-textPrimary/60 pointer-events-none hidden md:block"
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
        <div className="lg:hidden mt-20 mb-12 flex flex-col items-center">
          <span className="section-number">08</span>
          <span className="text-mono text-textTertiary uppercase tracking-widest text-[12px]">CONTACT</span>
        </div>

        {/* Vertical Spacer to push content down after the big text (Desktop Only) */}
        <div className="hidden lg:block h-[40vh]" aria-hidden="true" />

        {/* Contact UI */}
        <div className="flex flex-col items-center gap-8 w-full max-w-[500px] md:max-w-none md:grid md:grid-cols-3">
          
          {/* Social Icons */}
          <div className="flex items-center gap-5 justify-center lg:justify-start lg:pb-2 order-2 md:order-1">
            <SocialIcon color="bg-bgSurface border border-line" icon={<span className="text-[12px] font-bold uppercase tracking-tighter">In</span>} />
            <SocialIcon color="bg-bgSurface border border-line" icon={<span className="text-[12px] font-bold uppercase tracking-tighter">Tw</span>} />
            <SocialIcon color="bg-bgSurface border border-line" icon={<span className="text-[12px] font-bold uppercase tracking-tighter">Gh</span>} />
          </div>

          {/* Email / CTA - Order 1 on mobile */}
          <div className="w-full flex flex-col items-center justify-center order-1 md:order-2">
            <a 
              href="mailto:krishna@example.com"
              className="group/cta relative flex items-center gap-4 text-textPrimary hover:opacity-70 transition-all duration-500"
            >
              <span className="text-[clamp(32px,5vw,64px)] font-medium tracking-tight whitespace-nowrap">
                Send a message
              </span>
              <motion.span 
                className="text-[clamp(32px,5vw,64px)] font-light"
                initial={{ x: 0 }}
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                &rarr;
              </motion.span>
            </a>
            <a href="#" className="mt-6 text-textTertiary text-[13px] hover:text-textPrimary transition-colors uppercase tracking-[0.2em] font-medium">
              Or book a call via Cal.com
            </a>
          </div>

          {/* Slogan - Desktop Only */}
          <div className="hidden lg:flex justify-end items-end order-3">
            <p className="text-[13px] text-textSecondary text-right leading-relaxed max-w-[200px]">
              Available for full-time roles and high-impact freelance projects.
            </p>
          </div>
        </div>

        {/* Vertical Spacer - Minimal on mobile */}
        <div className="h-4 lg:h-48" aria-hidden="true" />

        {/* Footer Bar - Plain Text in Footer Flow */}
        <div className="w-full border-t border-line pt-24 mb-20">
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-16">
            <span className="text-nav text-textSecondary whitespace-nowrap">
              Design & Dev by Krsna <span className="mx-2">•</span> © {new Date().getFullYear()}
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}

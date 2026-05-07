'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  // Very subtle parallax for the background image
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  return (
    <motion.section
      ref={containerRef}
      className="relative w-full min-h-[100dvh] bg-bgPrimary flex flex-col md:grid md:grid-cols-2 overflow-hidden selection:bg-accent selection:text-bgPrimary transition-colors duration-500"
      id="hero"
    >

      {/* Global Subtle Grain */}
      <div
        className="absolute inset-0 z-30 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}
      />

      {/* LEFT (Desktop) / BOTTOM (Mobile): Typography & Content */}
      <div className="flex flex-col justify-center page-padding pt-10 pb-8 md:py-0 z-20 relative h-auto md:h-full bg-bgPrimary md:bg-gradient-to-br md:from-bgSurface/20 md:to-transparent order-2 md:order-1 -mt-[1px] md:mt-0 transition-colors duration-500">
        <div className="flex flex-col gap-8 md:gap-14 max-w-[600px]">
          
          {/* Headline */}
          <div className="flex flex-col">
            <span className="text-mono text-[10px] text-textTertiary tracking-[0.2em] mb-4">01</span>
            <h1 className="text-textPrimary font-display">
              <motion.span 
                initial={{ opacity: 0, filter: 'blur(8px)', y: 10 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="block font-medium tracking-tight text-textPrimary/90"
                style={{ fontSize: 'clamp(40px, 10vw, 64px)', lineHeight: '1.1' }}
              >
                Krishna Enagandula
              </motion.span>
            </h1>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.75, y: 0 }}
            transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-body text-textSecondary max-w-[460px] text-[15px] md:text-[18px] leading-[1.7] md:leading-relaxed font-light"
          >
            I stopped trying to fit into titles. <br className="hidden md:block" />
            I care about the tiny interactions people overlook— <br className="hidden md:block" />
            because that's where software starts feeling human.
          </motion.p>
        </div>

        {/* Mobile Availability Footer */}
        <div className="flex md:hidden items-center justify-between mt-20 pt-8 border-t border-line transition-colors">
          <div className="w-10 h-10 rounded-full border border-line flex items-center justify-center">
            <span className="text-textPrimary text-[12px] font-bold">K</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent/40 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span className="text-mono text-[10px] text-textSecondary tracking-[0.2em] uppercase">AVAILABLE</span>
          </div>
        </div>
      </div>

      {/* RIGHT (Desktop) / TOP (Mobile): Image — Cinematic Treatment */}
      <div className="relative h-[50vh] md:h-[100dvh] w-full z-10 overflow-hidden bg-bgSecondary order-1 md:order-2 border-b md:border-b-0 border-line transition-colors">

        {/* Base image with tone tuning */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1.02 }}
          transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 origin-center"
          style={{ y: imageY }}
        >
          <Image
            src="/profileimage.png"
            alt="Krishna Enagandula"
            fill
            className="object-cover object-top md:object-[35%_center] grayscale contrast-[1.1] brightness-[0.8]"
            priority
          />
        </motion.div>

        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-bgPrimary via-transparent to-bgPrimary/20 z-10 md:hidden transition-colors" />
        <div className="absolute inset-y-0 left-0 w-[30%] z-10 pointer-events-none hidden md:block" style={{ backdropFilter: 'blur(30px)', maskImage: 'linear-gradient(to right, black 20%, transparent)' }} />
        <div className="absolute inset-0 z-20 pointer-events-none hidden md:block transition-opacity duration-700 dark:opacity-100 opacity-20" style={{ background: 'linear-gradient(to right, var(--bg-primary) 0%, var(--bg-primary) 20%, transparent 70%)' }} />

        {/* Mobile Metadata Overlay */}
        <div className="md:hidden absolute bottom-6 left-6 z-40 flex flex-col gap-1">
          <span className="text-mono text-[10px] text-textTertiary uppercase tracking-[0.2em]">MUMBAI / 2026</span>
        </div>

        {/* Desktop Metadata */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 2, delay: 1 }}
          className="absolute bottom-10 right-10 z-30 hidden md:block"
        >
          <span className="text-mono text-[8px] text-textPrimary tracking-[0.5em] uppercase">Mumbai / 2026</span>
        </motion.div>
      </div>
    </motion.section>
  );
}

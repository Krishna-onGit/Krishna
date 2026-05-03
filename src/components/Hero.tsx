'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import MobileNotice from './MobileNotice';

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  // Very subtle parallax for the background image
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[100dvh] bg-black grid grid-cols-1 md:grid-cols-2 overflow-hidden selection:bg-white selection:text-black"
      id="hero"
    >
      <MobileNotice />

      {/* Global Subtle Grain */}
      <div
        className="absolute inset-0 z-30 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}
      />

      {/* LEFT: Typography & Content */}
      <div className="flex flex-col justify-center page-padding py-32 md:py-0 z-20 relative h-full bg-gradient-to-br from-white/[0.015] to-transparent">
        <div className="flex flex-col gap-10 md:gap-14 max-w-[600px]">
          
          {/* Headline */}
          <h1 className="text-[#F2EDE6] flex flex-col font-display">
            <div className="overflow-visible">
              <motion.span 
                initial={{ opacity: 0, filter: 'blur(8px)', y: 10 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="block font-medium tracking-normal text-white/80"
                style={{ fontSize: 'clamp(48px, 6vw, 72px)', lineHeight: '1' }}
              >
                Krishna
              </motion.span>
            </div>
            <div className="overflow-visible -mt-2 md:-mt-4">
              <motion.span 
                initial={{ opacity: 0, filter: 'blur(8px)', y: 10 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                transition={{ duration: 1.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="block font-semibold tracking-[-0.04em]"
                style={{ fontSize: 'clamp(64px, 8vw, 96px)', lineHeight: '0.95' }}
              >
                Enagandula
              </motion.span>
            </div>
          </h1>

          {/* Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.75, y: 0 }}
            transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-body text-[#EAEAEA] max-w-[460px]"
          >
            I stopped trying to fit into titles. <br />
            I care about the tiny interactions people overlook— <br />
            because that’s where software starts feeling human.
          </motion.p>
        </div>
      </div>

      {/* RIGHT: Image — Cinematic Treatment */}
      <div className="relative h-[50vh] md:h-[100dvh] w-full z-10 overflow-hidden bg-[#0A0A0A]">

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
            className="object-cover object-center md:object-[35%_center]"
            style={{ 
              filter: 'saturate(90%) contrast(105%) brightness(95%)',
              transition: 'transform 0.1s ease-out',
              willChange: 'transform'
            }}
            priority
          />
        </motion.div>

        {/* Layer 1 — Seamless "Blurred" Merge Strip */}
        <div
          className="absolute inset-y-0 left-0 w-[30%] z-10 pointer-events-none"
          style={{
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            maskImage: 'linear-gradient(to right, black 20%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, black 20%, transparent)'
          }}
        />

        {/* Layer 2 — Cinematic left-to-right gradient fade (primary blend) */}
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            background: `linear-gradient(
              to right,
              rgba(0,0,0,1.0)  0%,
              rgba(0,0,0,1.0) 8%,
              rgba(0,0,0,0.8) 20%,
              rgba(0,0,0,0.4) 35%,
              rgba(0,0,0,0.1) 50%,
              rgba(0,0,0,0)    70%
            )`
          }}
        />

        {/* Layer 2 — Mobile top fade */}
        <div className="absolute inset-x-0 top-0 h-[45%] bg-gradient-to-b from-black to-transparent pointer-events-none md:hidden z-10" />

        {/* Layer 3 — Subtle bottom vignette */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: `linear-gradient(
              to top,
              rgba(0,0,0,0.6) 0%,
              rgba(0,0,0,0.2) 25%,
              rgba(0,0,0,0) 50%
            )`
          }}
        />

        {/* Layer 4 — Grain overlay (felt, not seen) */}
        <div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{
            backgroundImage: `url("/grain.png")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '256px 256px',
            opacity: 0.03,
            mixBlendMode: 'overlay'
          }}
        />

        {/* Personality Signature */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 2, delay: 1 }}
          className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-30"
        >
          <span className="text-mono text-[8px] text-white tracking-[0.5em] uppercase">Mumbai / 2026</span>
        </motion.div>
      </div>
      {/* Bottom fade into About section */}
      <div
        className="absolute bottom-0 left-0 w-full pointer-events-none z-40"
        style={{
          height: '280px',
          background: `linear-gradient(
            to bottom,
            rgba(0,0,0,0)   0%,
            rgba(0,0,0,0.2) 20%,
            rgba(0,0,0,0.6) 45%,
            rgba(0,0,0,0.85) 65%,
            rgba(0,0,0,1)   85%,
            rgba(0,0,0,1)   100%
          )`,
        }}
      />
    </section>
  );
}

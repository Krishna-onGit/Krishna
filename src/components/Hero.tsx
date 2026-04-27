'use client';

import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import Image from 'next/image';
import { useRef, useEffect } from 'react';
import MobileNotice from './MobileNotice';

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  // Mouse move parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(useTransform(mouseX, [0, 1000], [-5, 5]), springConfig);
  const yTranslate = useSpring(useTransform(mouseY, [0, 1000], [-5, 5]), springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Improved Motion System
  const imageY = useTransform(scrollYProgress, [0, 1], ['0px', '-40px']);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const textYScroll = useTransform(scrollYProgress, [0, 1], ['0px', '-20px']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[100dvh] overflow-hidden bg-black"
      id="hero"
    >
      <MobileNotice />
      {/* --- BACKGROUND IMAGE WITH PARALLAX --- */}
      <motion.div
        className="absolute inset-0 z-0 w-full h-[115%]"
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ 
          y: imageY, 
          scale: imageScale,
          WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
        }}
      >
        <Image
          src="/profileimage.png"
          alt="Krishna Enagandula"
          fill
          className="object-cover object-center brightness-90 contrast-[1.02]"
          priority
        />
      </motion.div>

      {/* --- OVERLAYS --- */}
      {/* 1. Dark Gradient Overlay (Depth & Readability) */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ 
          background: `linear-gradient(to top, rgba(0,0,0,0.55), transparent 60%)`,
        }}
      />
      
      {/* Dynamic dark overlay on scroll */}
      <motion.div 
        className="absolute inset-0 z-10 pointer-events-none bg-black"
        style={{ opacity: useTransform(scrollYProgress, [0, 1], [0, 0.3]) }}
      />

      {/* 2. Vignette Effect (Dark edges) */}
      <div
        className="absolute inset-0 z-10 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.5)]"
      />

      {/* 3. Bottom Blur Mask Shade (Transition Continuity) */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[30vh] z-15 pointer-events-none"
        style={{ 
          background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0.8) 70%, black 100%)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          maskImage: 'linear-gradient(to bottom, transparent, black 40%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 40%)'
        }}
      />

      {/* 4. Noise/Grain Texture */}
      <div
        className="absolute inset-0 z-10 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}
      />

      {/* --- BOTTOM BLOCK: Name + Tagline --- */}
      <motion.div
        className="absolute bottom-[8vh] left-0 right-0 page-padding z-50 flex flex-col items-center text-center gap-10"
        style={{ y: textYScroll, opacity: textOpacity, x, translateY: yTranslate }}
      >
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.45, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-mono text-white"
        >
          01 / Hero
        </motion.span>

        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1
            className="text-display font-medium text-[#F2EDE6] leading-[1.2] tracking-[-1px] transition-colors duration-300 hover:text-white"
            style={{ fontSize: 'clamp(48px, 8vw, 110px)' }}
          >
            <div className="overflow-visible">
              <motion.span 
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                Krishna
              </motion.span>
            </div>
            <div className="overflow-visible opacity-90">
              <motion.span 
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                Enagandula
              </motion.span>
            </div>
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="text-[12px] md:text-body-lg text-textSecondary max-w-xl font-mono mt-4 leading-relaxed"
        >
          Designing systems. Building experiences. <br />
          <span className="opacity-80">Bridging the gap between code and craft.</span>
        </motion.p>
      </motion.div>
    </section>
  );
}

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate } from 'framer-motion';

const QUOTES = [
  "Design and dev aren't separate workflows.",
  'Good UI looks nice. Great UI feels inevitable.',
  "If it doesn't feel right, it isn't done.",
  'Speed is nothing without clarity.',
  'Systems beat screens every time.',
  "People don't use features. They use experiences.",
];

const BASE_QUOTE_DATE = new Date('2025-01-01T00:00:00');

function getDailyQuote() {
  const today = new Date();
  const startUTC = Date.UTC(
    BASE_QUOTE_DATE.getUTCFullYear(),
    BASE_QUOTE_DATE.getUTCMonth(),
    BASE_QUOTE_DATE.getUTCDate()
  );
  const todayUTC = Date.UTC(
    today.getUTCFullYear(),
    today.getUTCMonth(),
    today.getUTCDate()
  );
  const diffDays = Math.floor((todayUTC - startUTC) / (1000 * 60 * 60 * 24));
  const index = ((diffDays % QUOTES.length) + QUOTES.length) % QUOTES.length;

  return {
    quote: QUOTES[index],
    index,
    dayCount: diffDays + 1,
  };
}

export default function ThoughtCard() {
  const philosophyRef = useRef<HTMLElement>(null);
  const [isQuoteHovered, setIsQuoteHovered] = useState(false);
  const dailyQuote = getDailyQuote();
  const [activeQuoteLayer, setActiveQuoteLayer] = useState<0 | 1>(0);
  const [quoteLayerA, setQuoteLayerA] = useState(dailyQuote.quote);
  const [quoteLayerB, setQuoteLayerB] = useState(dailyQuote.quote);
  const inkX = useMotionValue(240);
  const inkY = useMotionValue(180);

  const { scrollYProgress: philosophyScroll } = useScroll({
    target: philosophyRef,
    offset: ["start end", "end start"]
  });

  const quoteTextY = useTransform(philosophyScroll, [0, 1], [24, -24]);
  const quoteMarksY = useTransform(philosophyScroll, [0, 1], [12, -12]);
  const editorialGlowY = useTransform(philosophyScroll, [0, 1], [40, -40]);
  const inkOpacity = useTransform(inkX, () => (isQuoteHovered ? 0.08 : 0));
  const inkGradient = useMotionTemplate`radial-gradient(220px circle at ${inkX}px ${inkY}px, var(--color-textPrimary), transparent 72%)`;

  const handleQuoteMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    inkX.set(e.clientX - rect.left);
    inkY.set(e.clientY - rect.top);
  };

  const morphText = (nextText: string) => {
    setActiveQuoteLayer((prev) => {
      if (prev === 0) {
        setQuoteLayerB(nextText);
        return 1;
      }
      setQuoteLayerA(nextText);
      return 0;
    });
  };

  useEffect(() => {
    morphText(dailyQuote.quote);
  }, [dailyQuote.quote]);

  return (
    <section 
      ref={philosophyRef}
      className="w-full bg-bgPrimary philosophy-section relative overflow-visible md:overflow-hidden page-padding py-0 min-h-0 flex flex-col items-center touch-pan-y transition-colors duration-500"
    >
      <div className="w-full max-w-[1000px] mx-auto relative z-20 flex items-center justify-center">
        <motion.div
          style={{ y: editorialGlowY }}
          className="absolute -left-[10%] top-[8%] h-[380px] w-[380px] rounded-full pointer-events-none"
        >
          <div className="h-full w-full bg-[radial-gradient(circle,var(--color-line),transparent_70%)]" />
        </motion.div>

        <motion.div
          className="relative w-full max-w-[900px] mx-auto border border-line rounded-3xl min-h-[360px] md:min-h-[400px] overflow-visible md:overflow-hidden flex flex-col items-center justify-center touch-pan-y transition-colors duration-500 bg-bgSurface/50"
          onMouseMove={(e) => { if (window.innerWidth > 768) handleQuoteMouseMove(e); }}
          onMouseEnter={() => { if (window.innerWidth > 768) setIsQuoteHovered(true); }}
          onMouseLeave={() => { if (window.innerWidth > 768) setIsQuoteHovered(false); }}
          data-cursor="Read"
          whileHover={{ scale: 1.003 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0"
            style={{ background: inkGradient, opacity: inkOpacity }}
          />

          <motion.div
            style={{ y: quoteMarksY }}
            className="absolute right-[5%] top-[14%] text-[240px] leading-[0.8] text-textPrimary/[0.04] blur-[4px] pointer-events-none select-none z-0 transition-colors"
          >
            "
          </motion.div>

          {/* Badge - Absolute anchored to top */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.7 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-8 left-1/2 -translate-x-1/2 z-10 inline-flex items-center gap-2 rounded-md border border-line bg-bgSurface/80 px-[12px] py-[8px] backdrop-blur-[6px] transition-colors duration-300"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-textSecondary font-medium">
              Day {dailyQuote.dayCount} / Thought
            </span>
          </motion.div>

          {/* Quote Body - Centered perfectly */}
          <div className="relative z-10 flex flex-col items-center justify-center px-8 md:px-20">
            <motion.h2
              style={{ y: quoteTextY }}
              className="w-full max-w-[760px] text-center font-display leading-[1.05] tracking-[-0.4px] text-[clamp(42px,5.4vw,68px)] grid"
            >
              <motion.span
                aria-hidden={activeQuoteLayer !== 0}
                animate={{
                  opacity: activeQuoteLayer === 0 ? 1 : 0,
                  filter: activeQuoteLayer === 0 ? 'blur(0px)' : 'blur(10px)',
                  y: activeQuoteLayer === 0 ? 0 : 30,
                }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="col-start-1 row-start-1 block font-semibold text-white"
              >
                {quoteLayerA}
              </motion.span>
              <motion.span
                aria-hidden={activeQuoteLayer !== 1}
                animate={{
                  opacity: activeQuoteLayer === 1 ? 1 : 0,
                  filter: activeQuoteLayer === 1 ? 'blur(0px)' : 'blur(10px)',
                  y: activeQuoteLayer === 1 ? 0 : 30,
                }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="col-start-1 row-start-1 block font-semibold text-white"
              >
                {quoteLayerB}
              </motion.span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 0.4, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-5 md:mt-8 flex flex-col items-center gap-1"
            >
              <div className="w-8 h-[1px] bg-line mb-2" />
              <span className="text-mono text-[11px] uppercase tracking-[0.3em] text-textSecondary">Perspective</span>
              <span className="text-serif italic text-sm text-textTertiary font-medium">Krishna Enagandula</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

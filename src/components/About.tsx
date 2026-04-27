'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useInView, useMotionValueEvent, useTransform } from 'framer-motion';

const NARRATIVE_BLOCKS = [
  "I went deep into both — design and engineering. Not because I had to, but because I couldn't imagine one without the other.",
  "Most people pick a lane. I built a bridge. I don't just design interfaces; I engineer the logic that breathes life into them.",
  "Today, I sit at the intersection of aesthetic intent and technical execution, building products that feel as good as they look."
];

const METRICS = [
  { value: 2, label: "SaaS Products in Production" },
  { value: 10, label: "Client Projects Shipped", suffix: "+" },
  { value: 1, label: "Person Doing the Work of Three" }
];

function CountUp({ value, suffix = "", startTrigger }: { value: number, suffix?: string, startTrigger: boolean }) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (startTrigger && !hasAnimated.current) {
      hasAnimated.current = true;
      let start = 0;
      const end = value;
      const duration = 800;
      let startTimestamp: number | null = null;
      
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        setCount(Math.floor(progress * (end - start) + start));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [startTrigger, value]);

  return <span>{count}{suffix}</span>;
}

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const [shouldAnimateMetrics, setShouldAnimateMetrics] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax for watermark
  const watermarkX = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const watermarkOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.03, 0]);

  // Section fall-off
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.1, 0.8, 1], [0, 1, 1, 0]);
  const sectionScale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.98, 1, 1, 0.98]);
  const sectionBlur = useTransform(scrollYProgress, [0.8, 1], ["blur(0px)", "blur(10px)"]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.4 && !shouldAnimateMetrics) {
      setShouldAnimateMetrics(true);
    }
  });

  return (
    <motion.section 
      ref={containerRef} 
      className="relative w-full section-padding page-padding overflow-hidden bg-black" 
      id="about"
      style={{ opacity: sectionOpacity, scale: sectionScale, filter: sectionBlur }}
    >
      {/* Background Watermark with Parallax */}
      <div className="absolute inset-0 z-0 flex items-center justify-end pointer-events-none select-none overflow-hidden pr-[10%]">
        <motion.span 
          style={{ x: watermarkX, opacity: watermarkOpacity }}
          className="text-[200px] md:text-[320px] font-serif font-semibold text-white tracking-[-0.05em]"
        >
          INTERSECTION
        </motion.span>
      </div>

      <div className="max-w-[1000px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[0.45fr_0.55fr] gap-10 md:gap-24 items-start">
          
          {/* LEFT SIDE: Hero Statement */}
          <div className="flex flex-col items-start">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 0.45, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-mono text-white mb-4 md:mb-8"
            >
              02 / About
            </motion.span>
            <div className="h-8 md:hidden" aria-hidden="true" />
            <h2 
              className="font-display leading-[1.1] text-white tracking-[-0.02em]"
              style={{ fontSize: 'clamp(42px, 5vw, 64px)' }}
            >
              <div className="overflow-hidden">
                <motion.span 
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  I was the kid who
                </motion.span>
              </div>
              <div className="overflow-hidden mt-1 md:mt-2">
                <motion.span 
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  couldn't choose
                </motion.span>
              </div>
              <div className="overflow-hidden mt-1 md:mt-2">
                <motion.span 
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  between art and tech —
                </motion.span>
              </div>
              <div className="overflow-hidden mt-2 md:mt-4">
                <motion.span 
                  initial={{ y: "100%", scale: 0.95 }}
                  whileInView={{ y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="block italic text-[#A67C52] origin-left"
                >
                  so I didn't.
                </motion.span>
              </div>
            </h2>
          </div>

          {/* RIGHT SIDE: Structured Narrative */}
          <div className="flex flex-col gap-6 md:gap-10 md:pt-4">
            {NARRATIVE_BLOCKS.map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 0.75, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 + (i * 0.1) }}
                className="text-[15px] md:text-[16px] text-white/75 leading-relaxed max-w-lg font-mono"
              >
                {text}
              </motion.p>
            ))}

            {/* Signature Line */}
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="mt-6 py-6 border-t border-white/5"
              data-cursor="ink"
            >
              <span className="text-[15px] md:text-[16px] text-white/90 font-mono tracking-wide">
                I don't hand off. I don't translate. <br className="hidden md:block" />
                <span className="text-[#A67C52]">I build the whole thing.</span>
              </span>
            </motion.div>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="mt-16 md:mt-32 grid grid-cols-3 gap-2 md:gap-16 border-t border-white/5 pt-12">
          {METRICS.map((metric, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1 + (i * 0.1) }}
              className="flex flex-col gap-3 group cursor-default"
            >
              <span className="text-[28px] md:text-[48px] font-serif text-[#A67C52] leading-none transition-transform duration-500 group-hover:-translate-y-2">
                <CountUp value={metric.value} suffix={metric.suffix} startTrigger={shouldAnimateMetrics} />
              </span>
               <span className="text-[8px] md:text-[12px] uppercase tracking-[0.1em] md:tracking-[0.2em] text-white/60 max-w-[80px] md:max-w-[140px] leading-snug font-mono">
                {metric.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

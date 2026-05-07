'use client';

import React, { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';

interface CardData {
  label: string;
  content: React.ReactNode;
}

export default function About() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

    const cards = [
    {
      label: "WHAT I DO",
      content: (
        <>
          <p className="text-[16px] text-white font-medium leading-relaxed mb-1">
            I build digital products end-to-end
          </p>
          <p className="text-[15px] text-white/50 leading-relaxed font-light">
            Visual systems to functional builds. I design the core system, then I scale it.
          </p>
        </>
      )
    },
    {
      label: "HOW I WORK",
      content: (
        <>
          <p className="text-[16px] text-white font-medium leading-relaxed mb-1">
            AI is my execution engine
          </p>
          <div className="space-y-3">
            <p className="text-[15px] text-white/50 leading-relaxed font-light">
              Utilizing advanced LLMs to accelerate build cycles and ensure pixel-perfect logic.
            </p>
            <p className="text-[14px] text-white/30 font-mono tracking-tight">
              idea→system→build→refine
            </p>
          </div>
        </>
      )
    },
    {
      label: "WHY I WORK",
      content: (
        <>
          <p className="text-[15px] text-textSecondary leading-relaxed font-light mb-1">
            I don't just design. I don't just build.
          </p>
          <p className="text-[16px] text-textPrimary font-medium leading-relaxed">
            I take products from idea to reality.
          </p>
        </>
      )
    }
  ];

  const metrics = [
    { value: "2 SaaS", label: "" },
    { value: "10+ Clients", label: "" },
    { value: "1 Solo", label: "" }
  ];

  return (
    <section ref={containerRef} className="relative w-full bg-bgPrimary py-0 page-padding overflow-hidden transition-colors duration-500" id="about">
      <div className="max-w-[1600px] mx-auto flex flex-col">
        {/* Huge Headline */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="pb-10 md:pb-12"
        >
          <h2 className="text-[32px] md:text-h2 font-display font-medium text-textPrimary leading-[1.1] tracking-[-0.02em]">
            I design. I build. <span className="opacity-90 italic">No gap.</span>
          </h2>
        </motion.div>

        {/* Extra Spacer to ensure gap */}
        <div className="h-8 md:h-10" />

        {/* Carousel / Grid Container */}
        <div className="flex md:grid md:grid-cols-3 overflow-x-auto md:overflow-visible snap-x snap-mandatory hide-scrollbar border border-line mb-6 md:mb-8 transition-colors">
          {cards.map((card, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`flex-none w-[85vw] md:w-auto flex flex-col min-h-[380px] pt-8 pb-6 pl-10 snap-center md:pt-12 md:pb-8 md:pl-16 ${
                index !== 0 ? 'md:border-l border-line' : ''
              } ${index !== 0 ? 'border-l md:border-l-0 border-line' : ''}`}
            >
              <span className="text-mono text-textTertiary text-[11px] tracking-[0.2em]">
                {card.label}
              </span>
              
              {/* Spacer to push content to bottom */}
              <div className="flex-1" />
              
              <div className="min-h-[110px] flex flex-col justify-start pr-6 pb-2 md:pr-10 md:pb-4 max-w-[280px] md:max-w-[320px]">
                {card.content}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Horizontal Line */}
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="w-full h-px bg-line mt-16 md:mt-24 mb-12 md:mb-16 origin-left" 
        />

        {/* Metrics Section */}
        <div className="grid grid-cols-3 gap-4 md:gap-8 pt-8 md:pt-12">
          {metrics.map((metric, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
              className="flex justify-center"
            >
              <span className="text-[16px] md:text-[28px] font-display text-textPrimary/90 tracking-tight whitespace-nowrap transition-colors">
                {metric.value}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

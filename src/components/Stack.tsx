'use client';

import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';

const TOOL_GROUPS = [
  {
    category: 'AI',
    tools: ['ChatGPT', 'Claude', 'Gemini', 'Grok']
  },
  {
    category: 'Design',
    tools: ['Figma', 'Framer']
  },
  {
    category: 'Frontend',
    tools: ['React', 'Next.js', 'Tailwind', 'TypeScript']
  },
  {
    category: 'Infra',
    tools: ['Vercel', 'AWS']
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const groupVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.05
    }
  }
};

const toolVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    } 
  }
};

export default function Stack() {
  const [hoveredGroup, setHoveredGroup] = useState<string | null>(null);
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.6, 1, 1, 0.6]);
  const sectionScale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.98, 1, 1, 0.98]);

  return (
    <motion.section 
      ref={containerRef}
      className="relative w-full py-0 page-padding overflow-hidden bg-black" 
      id="stack"
      style={{ opacity: sectionOpacity, scale: sectionScale }}
    >
      <div className="max-w-[960px] mx-auto relative z-10 flex flex-col gap-8 md:gap-10">
        {/* Header Section */}
        <div className="mb-0">
          <motion.span 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 0.4, x: 0 }}
            viewport={{ once: true }}
            className="text-[12px] font-mono tracking-[2px] uppercase text-white block mb-2 md:mb-4"
          >
            07 / STACK
          </motion.span>
          <div className="h-8 md:hidden" aria-hidden="true" />
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-medium text-[#EAEAEA] leading-[1.2] mb-4"
            style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}
          >
            Capabilities.
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[15px] md:text-[16px] text-white/60 max-w-[560px] leading-relaxed font-mono"
          >
            A focused ecosystem designed for high-performance delivery and refined visual standards.
          </motion.p>
        </div>

        {/* Groups */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col gap-8 md:gap-12"
        >
          {TOOL_GROUPS.map((group) => (
            <motion.div
              key={group.category}
              variants={groupVariants}
              onMouseEnter={() => setHoveredGroup(group.category)}
              onMouseLeave={() => setHoveredGroup(null)}
              animate={{
                opacity: hoveredGroup === null || hoveredGroup === group.category ? 1 : 0.4
              }}
              transition={{ duration: 0.4 }}
              className="group/item flex flex-col md:flex-row md:items-baseline border-b border-white/[0.03] py-6 md:py-8 last:border-none"
            >
              <div className="w-[120px] mb-4 md:mb-0">
                <span className="text-[11px] font-mono tracking-[3px] uppercase text-white/30 group-hover/item:text-white/60 transition-colors duration-500">
                  {group.category}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-x-12 gap-y-4 md:gap-x-16 md:gap-y-6">
                {group.tools.map((tool) => (
                  <motion.span
                    key={tool}
                    variants={toolVariants}
                    className="text-[16px] md:text-[18px] text-white/70 hover:text-white transition-colors duration-300 font-mono"
                  >
                    {tool}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

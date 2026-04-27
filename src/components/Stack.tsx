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
      className="relative w-full section-padding page-padding overflow-hidden bg-black" 
      id="stack"
      style={{ opacity: sectionOpacity, scale: sectionScale }}
    >
      <div className="max-w-[960px] mx-auto relative z-10">
        {/* Header Section */}
        <div className="mb-0">
          <motion.span 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 0.4, x: 0 }}
            viewport={{ once: true }}
            className="text-[12px] font-mono tracking-[2px] uppercase text-white block mb-2 md:mb-4"
          >
            07 / STACK / TOOLS
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
          className="flex flex-col gap-8 md:gap-12 mt-6 md:mt-10"
          style={{ marginTop: '24px' }}
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
              className="flex items-start gap-6 md:gap-10 group/category"
            >
              <h3 className="w-[88px] md:w-[110px] shrink-0 text-[13px] font-mono tracking-[1.5px] uppercase text-white/40 pt-1">
                {group.category}
              </h3>
              
              <div className="flex flex-wrap flex-1 gap-x-7 gap-y-5">
                {group.tools.map((tool) => (
                  <motion.div
                    key={tool}
                    variants={toolVariants}
                    className="relative py-1 group/tool cursor-default"
                  >
                    <motion.span 
                      whileHover={{ 
                        color: '#FFFFFF',
                        y: -3,
                        scale: 1.05,
                      }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="text-[16px] md:text-[17px] text-white/75 inline-block transition-all duration-300 font-mono"
                    >
                      {tool}
                    </motion.span>
                    
                    {/* Underline reveal */}
                    <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-white/40 transition-all duration-300 origin-left group-hover/tool:w-full" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}

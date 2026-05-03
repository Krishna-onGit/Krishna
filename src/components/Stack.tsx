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
      <div className="w-full relative z-10 flex flex-col gap-8 md:gap-10">
        {/* Section Header */}
        <div className="w-full relative mb-8 md:mb-16 pt-[120px] md:pt-[160px] flex flex-col md:flex-row md:justify-between items-start">
          
          {/* Mobile Title */}
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 0.8, y: 0 }}
            viewport={{ once: true }}
            className="md:hidden text-mono text-white text-[13px] uppercase font-medium mb-6"
          >
            07 / STACK
          </motion.span>

          {/* Main Content (Left) */}
          <div className="text-left max-w-[700px]">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-h2 text-[#EAEAEA] mb-4"
            >
              Capabilities.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-body text-white/60 max-w-[560px]"
            >
              A focused ecosystem designed for high-performance delivery and refined visual standards.
            </motion.p>
          </div>

          {/* Desktop Title (Right edge, slightly higher offset) */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 0.8, y: 0 }}
            viewport={{ once: true }}
            className="hidden md:block -mt-[6px]"
          >
            <span className="text-mono text-white/80 text-[13px] uppercase tracking-[0.2em] font-medium">
              07 / STACK
            </span>
          </motion.div>
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
                <span className="text-ui-label text-white/30 group-hover/item:text-white/60 transition-colors duration-500">
                  {group.category}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-x-12 gap-y-4 md:gap-x-16 md:gap-y-6">
                {group.tools.map((tool) => (
                  <motion.span
                    key={tool}
                    variants={toolVariants}
                    className="text-card-title text-white/70 hover:text-white transition-colors duration-300"
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

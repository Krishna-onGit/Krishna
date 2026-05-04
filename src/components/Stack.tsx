'use client';

import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';

const TOOL_GROUPS = [
  {
    category: 'AI',
    tools: [
      { name: 'Claude', sub: 'Architecture · code review', slug: 'simple-icons:anthropic' },
      { name: 'ChatGPT', sub: 'Research · copy', slug: 'simple-icons:openai' },
      { name: 'Gemini', sub: 'Design feedback', slug: 'simple-icons:googlegemini' },
      { name: 'v0', sub: 'UI scaffolding', slug: 'simple-icons:vercel' }
    ]
  },
  {
    category: 'Design',
    tools: [
      { name: 'Figma', sub: 'Systems · wireframes', slug: 'simple-icons:figma' },
      { name: 'Framer', sub: 'Client sites · landing pages', slug: 'simple-icons:framer' }
    ]
  },
  {
    category: 'Frontend',
    tools: [
      { name: 'Next.js 15', sub: 'App Router · SSR', slug: 'simple-icons:nextdotjs' },
      { name: 'TypeScript', sub: 'Type-safe throughout', slug: 'simple-icons:typescript' },
      { name: 'Tailwind', sub: 'Utility-first styling', slug: 'simple-icons:tailwindcss' },
      { name: 'shadcn/ui', sub: 'Component primitives', slug: 'simple-icons:shadcnui' },
      { name: 'TanStack Query', sub: 'Server state · caching', slug: 'simple-icons:reactquery' }
    ]
  },
  {
    category: 'Backend',
    tools: [
      { name: 'Node.js', sub: 'ES Modules · runtime', slug: 'simple-icons:nodedotjs' },
      { name: 'Express v5', sub: 'API layer', slug: 'simple-icons:express' },
      { name: 'Prisma', sub: 'ORM · schema management', slug: 'simple-icons:prisma' },
      { name: 'BullMQ', sub: 'Job queues · cron', slug: 'simple-icons:redis' }
    ]
  },
  {
    category: 'Database',
    tools: [
      { name: 'Supabase', sub: 'PostgreSQL · auth · RLS', slug: 'simple-icons:supabase' },
      { name: 'Redis', sub: 'Upstash · session · queues', slug: 'simple-icons:redis' }
    ]
  },
  {
    category: 'Infra',
    tools: [
      { name: 'Vercel', sub: 'Frontend · edge deploy', slug: 'simple-icons:vercel' },
      { name: 'Render', sub: 'Backend · API servers', slug: 'simple-icons:render' },
      { name: 'Resend', sub: 'Email operations', slug: 'simple-icons:resend' },
      { name: 'GoDaddy', sub: 'DNS · domain management', slug: 'simple-icons:godaddy' }
    ]
  },
  {
    category: 'Motion',
    tools: [
      { name: 'GSAP', sub: '3D motions', slug: 'simple-icons:gsap' },
      { name: 'Motion', sub: 'Animations · transitions', slug: 'simple-icons:framer' },
      { name: 'AWS S3', sub: 'Bucket · storage', slug: 'simple-icons:amazons3' },
      { name: 'Kite', sub: 'Demo videos', slug: 'lucide:monitor-play' },
      { name: 'Higgsfield', sub: 'AI videos', slug: 'lucide:video' }
    ]
  },
  {
    category: 'Media',
    tools: [
      { name: 'Ideogram', sub: 'AI images', slug: 'lucide:wand-2' },
      { name: 'Leonardo', sub: 'AI images', slug: 'lucide:image-plus' },
      { name: 'Media.io', sub: 'Video edits', slug: 'lucide:clapperboard' },
      { name: 'Jitter', sub: 'Video edits', slug: 'simple-icons:framer' }
    ]
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
      <div className="w-full max-w-[1200px] mx-auto relative z-10 flex flex-col gap-8 md:gap-10">
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
              className="text-[32px] md:text-h2 text-[#EAEAEA] mb-4"
            >
              Capabilities.
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="text-body text-white/60 max-w-[620px]"
            >
              Every tool chosen for a reason. Every layer owned end-to-end — from the first Figma frame to the deployed production system.
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
          className="flex flex-col gap-2 md:gap-4"
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
              className="group/item flex flex-col md:flex-row md:items-start border-b border-white/[0.03] py-4 md:py-12 last:border-none"
            >
              <div className="w-[140px] shrink-0 mb-2 md:mb-0 pt-1">
                <span className="text-ui-label text-white/30 group-hover/item:text-white/60 transition-colors duration-500 uppercase tracking-widest text-[11px]">
                  {group.category}
                </span>
              </div>
              
              <div className="grid grid-cols-5 md:flex md:flex-row items-start w-full gap-x-1 md:gap-x-0">
                {group.tools.map((tool, idx) => (
                  <React.Fragment key={tool.name}>
                    {idx > 0 && (
                      <div className="hidden md:flex items-center justify-center w-[40px] shrink-0">
                        <div className="h-6 w-[1px] bg-white/20" />
                      </div>
                    )}
                    <motion.div
                      variants={toolVariants}
                      className="flex flex-col items-center md:items-start gap-1.5 md:gap-2 md:w-[180px]"
                    >
                      <div className="flex flex-col md:flex-row items-center gap-1.5 md:gap-2.5">
                        <img 
                          src={`https://api.iconify.design/${tool.slug}.svg?color=white&v=1`} 
                          alt="" 
                          className="w-[14px] h-[14px] md:w-[18px] md:h-[18px] opacity-80 group-hover/tool:opacity-100 transition-opacity"
                        />
                        <span className="text-[10px] md:text-[18px] font-semibold text-white/90 hover:text-white transition-colors duration-300 text-center md:text-left leading-tight">
                          {tool.name}
                        </span>
                      </div>
                      <span className="hidden md:block text-[9px] uppercase tracking-[0.2em] text-white/30 font-medium">
                        {tool.sub}
                      </span>
                    </motion.div>
                  </React.Fragment>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}


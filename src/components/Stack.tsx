'use client';

import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import { Icon } from '@iconify/react';

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
      <div className="w-full relative z-10 flex flex-col gap-8 md:gap-10">
        {/* Section Header */}
        <div className="w-full relative mb-24 md:mb-32 pt-[120px] md:pt-[160px] flex flex-col md:flex-row md:justify-between items-start">
          <div className="flex flex-col text-left max-w-[700px]">
            {/* Mobile Title / Section Number */}
            <div className="flex flex-col">
              <span className="md:hidden section-number">07</span>
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 0.8, y: 0 }}
                viewport={{ once: true }}
                className="md:hidden text-mono text-white text-[13px] uppercase font-medium mb-6"
              >
                STACK
              </motion.span>
            </div>

            {/* Main Content */}
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

          {/* Desktop Title */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 0.8, y: 0 }}
            viewport={{ once: true }}
            className="hidden md:block -mt-[6px]"
          >
            <span className="text-mono text-white/80 text-[13px] uppercase tracking-[0.2em] font-medium">
              STACK
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
              className="group/item flex flex-col md:flex-row md:items-start border-b border-white/[0.03] pt-12 pb-16 md:pt-20 md:pb-20 last:border-none"
            >
              <div className="w-full md:w-[130px] shrink-0 mb-6 md:mb-0 pt-1">
                <span className="text-ui-label text-white/30 group-hover/item:text-white/60 transition-colors duration-500 uppercase tracking-widest text-[11px]">
                  {group.category}
                </span>
              </div>
              
              <div className="flex flex-row md:flex-nowrap items-start w-full gap-2 md:gap-0 pb-6 md:pb-12">
                {group.tools.map((tool, idx) => (
                  <React.Fragment key={tool.name}>
                    {idx > 0 && (
                      <div className="hidden md:flex items-center justify-center w-[50px] shrink-0">
                        <div className="h-6 w-[1px] bg-white/20" />
                      </div>
                    )}
                    <motion.div
                      variants={toolVariants}
                      className="flex flex-col items-center md:items-start gap-1 md:gap-2 w-[20%] md:flex-none min-w-0 md:w-[165px] md:shrink-0"
                    >
                      <div className="flex flex-col md:flex-row items-center md:items-center gap-1.5 md:gap-2.5 text-center md:text-left">
                        <Icon icon={tool.slug} className="w-5 h-5 md:w-6 md:h-6 text-white/50 group-hover/item:text-white transition-colors duration-500" />
                        <span className="text-[10px] md:text-[18px] font-semibold text-white/90 hover:text-white transition-colors duration-300 leading-tight md:whitespace-nowrap">
                          {tool.name}
                        </span>
                      </div>
                      <span className="hidden md:block text-[10px] md:text-[9px] uppercase tracking-widest md:tracking-[0.2em] text-white/30 font-medium md:whitespace-nowrap">
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


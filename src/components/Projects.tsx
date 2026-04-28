'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValue, useMotionTemplate } from 'framer-motion';

const CLIENT_WORK = [
  { name: 'Area Realty', type: 'Landing Page', notes: 'Real estate developer' },
  { name: 'Lead-AI.in', type: 'Landing Page', notes: 'AI SaaS product' },
  { name: 'Yacht Mumbai', type: 'Website', notes: 'Boats & experiences brand' },
  { name: 'Sailing Mumbai', type: 'Website', notes: 'Boats & experiences brand' },
  { name: 'Cyber Expert', type: 'Portfolio', notes: 'Cybersecurity professional' },
  { name: 'Creative Head', type: 'Portfolio', notes: 'Creative director' },
  { name: 'The Beautiful Game', type: 'Landing Page', notes: 'Football brand' },
];

const SIDE_PROJECTS = [
  'Orbii Clone — Landing page rebuild, design study',
  'Workflow AI Clone — Landing page rebuild',
  'Messi Storyboard — 3D interaction-based visual narrative',
  'Manga Reading Website — UI exploration',
];

function ProjectRow({ 
  work, 
  index, 
  onHover, 
  onLeave, 
  onMouseMove 
}: { 
  work: any, 
  index: number, 
  onHover: (work: any, rect: DOMRect) => void,
  onLeave: () => void,
  onMouseMove: (e: React.MouseEvent) => void
}) {
  const [isHovered, setIsHovered] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (rowRef.current) {
      onHover(work, rowRef.current.getBoundingClientRect());
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onLeave();
  };

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={onMouseMove}
      className="group relative pt-8 pb-[10px] mb-[12px] last:mb-0 grid grid-cols-[1fr_auto] items-center z-10"
      data-cursor="View →"
    >
      <div className="flex flex-col gap-0">
        <motion.h3 
          animate={{ x: isHovered ? 8 : 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="m-0 text-[26px] md:text-[34px] font-medium text-white/80 group-hover:text-white transition-colors duration-300 tracking-[-0.3px]"
        >
          {work.name}
        </motion.h3>
        <span className="m-0 text-[13px] text-white/40 font-mono group-hover:text-white/60 transition-colors mt-0">
          {work.type}
        </span>
      </div>

      <div className="text-right">
        <span className="text-[12px] text-white/20 group-hover:text-white/60 transition-all duration-300 font-mono">
          {work.notes}
        </span>
      </div>

      <div className="col-span-2 h-3" aria-hidden />

      {/* Animated Divider */}
      <motion.div 
        initial={{ scaleX: 0.3, opacity: 0.5 }}
        animate={{ scaleX: isHovered ? 1 : 0.3, opacity: isHovered ? 1 : 0.5 }}
        className="col-span-2 w-full h-[1px] bg-white/10 origin-left transition-all duration-500"
      />

      {/* Subtle Row Highlight */}
      <div className="absolute inset-0 bg-white/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
}

export default function Projects() {
  const containerRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);

  const [hoveredWork, setHoveredWork] = useState<any>(null);
  const [rowRect, setRowRect] = useState<DOMRect | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Section fall-off
  const projectsOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.8, 1, 1, 0.8]);
  const projectsScale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.98, 1, 1, 0.98]);

  // Derived preview position
  const springTop = useSpring(0, { stiffness: 100, damping: 20 });
  const springReactivity = useSpring(0, { stiffness: 50, damping: 25 });

  useEffect(() => {
    if (rowRect) {
      const center = rowRect.top + rowRect.height / 2;
      springTop.set(center);
    }
  }, [rowRect, springTop]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (rowRect) {
      const relY = (e.clientY - rowRect.top) / rowRect.height;
      const delta = (relY - 0.5) * 40;
      springReactivity.set(delta);
    }
  };

  const previewYTranslate = useTransform(springReactivity, (val) => `calc(-50% + ${val}px)`);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (scrollContainerRef.current && scrollWrapperRef.current) {
        const getScrollAmount = () => {
          const containerWidth = scrollContainerRef.current!.scrollWidth;
          return -(containerWidth - window.innerWidth + 100);
        };

        const tween = gsap.to(scrollContainerRef.current, {
          x: getScrollAmount,
          ease: 'none',
        });

        ScrollTrigger.create({
          trigger: scrollWrapperRef.current,
          start: 'top top',
          end: () => `+=${getScrollAmount() * -1}`,
          pin: true,
          animation: tween,
          scrub: 1,
          invalidateOnRefresh: true,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <motion.section 
      ref={containerRef} 
      className="w-full relative" 
      id="work"
      style={{ opacity: projectsOpacity, scale: projectsScale }}
    >
      {/* ── Horizontal Scroll Panel ── */}
      <div
        ref={scrollWrapperRef}
        className="h-[100dvh] w-full overflow-hidden bg-black relative flex items-center"
      >
        {/* Section label */}
        <div className="absolute top-12 md:top-24 page-padding z-10 flex gap-12">
          <div className="hidden md:block">
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-mono text-textTertiary"
            >
              03 / Work
            </motion.div>
          </div>
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:hidden text-mono text-textTertiary"
          >
            03 / Work
          </motion.div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex h-full items-center page-padding gap-16 md:gap-32 w-[300vw] md:w-[250vw] pt-4"
        >
          {/* Card 1 — LeadFlow AI */}
          <div
            className="w-[85vw] md:w-[65vw] h-[60vh] md:h-[65vh] shrink-0 group relative cursor-pointer"
            data-cursor="Open →"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full bg-[#0a0a0a] border border-white/10 overflow-hidden rounded-2xl relative transform transition-all duration-700 group-hover:border-[#A67C52]/30 group-hover:-translate-y-2 shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
              <div className="w-full h-full bg-black absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-20 transition-opacity">
                <span className="text-mono text-white/20">crm.lead-ai.in preview</span>
              </div>
              <div className="absolute bottom-12 left-12 right-12 md:bottom-16 md:left-16 md:right-16 z-20 flex flex-col justify-end">
                <div className="flex gap-4 mb-6">
                  <span className="text-mono text-[#A67C52] bg-[#A67C52]/5 px-4 py-1.5 rounded-full border border-[#A67C52]/10">
                    Fullstack SaaS
                  </span>
                </div>
                <h2 className="text-[32px] md:text-[48px] font-medium font-display text-white mb-6 self-start">
                  <span className="relative">
                    LeadFlow AI
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#A67C52] transition-all duration-700 ease-out group-hover:w-full" />
                  </span>
                </h2>
                <p className="text-[15px] md:text-[16px] text-white/60 max-w-2xl leading-relaxed hidden md:block font-mono">
                  A multi-tenant real estate SaaS with two core products: a CRM for managing leads and a Lead Platform for discovery.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Card 2 — StarConnect */}
          <div
            className="w-[75vw] md:w-[50vw] h-[55vh] md:h-[60vh] shrink-0 group relative cursor-pointer"
            data-cursor="Open →"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full bg-[#0a0a0a] border border-white/10 overflow-hidden rounded-2xl relative transform transition-all duration-700 group-hover:border-[#A67C52]/30 group-hover:-translate-y-2 shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
              <div className="w-full h-full bg-black absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-20 transition-opacity">
                <span className="text-mono text-white/20">StarConnect preview</span>
              </div>
              <div className="absolute bottom-12 left-12 right-12 md:bottom-16 md:left-16 md:right-16 z-20 flex flex-col justify-end">
                <span className="text-mono text-[#A67C52] mb-6 block">
                  Fullstack · AI Driven
                </span>
                <h2 className="text-[32px] md:text-[48px] font-medium font-display text-white mb-6 self-start">
                  <span className="relative">
                    StarConnect
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#A67C52] transition-all duration-700 ease-out group-hover:w-full" />
                  </span>
                </h2>
                <p className="text-[15px] md:text-[16px] text-white/60 leading-relaxed hidden md:block font-mono">
                  LinkedIn-style social platform for Bollywood. Built using AI-assisted development workflows.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Trailing spacer */}
          <div className="w-[30vw] shrink-0 flex items-center justify-center">
            <span className="font-serif text-3xl md:text-4xl text-white/50 italic animate-pulse">Keep scrolling</span>
          </div>
        </div>
      </div>

      {/* ── Client Work & Side Projects Section ── */}
      <div className="w-full section-padding page-padding relative bg-black text-white">
        <div className="max-w-[1000px] mx-auto relative z-10">
          
          {/* Client Work Index */}
          <div className="relative">
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 0.4, y: 0 }}
              viewport={{ once: true }}
              className="text-mono text-white/40 mb-4 md:mb-8 tracking-[0.4em] uppercase text-[10px] font-semibold"
            >
              04 / Client Work Index
            </motion.p>
            <div className="h-10 md:hidden" aria-hidden="true" />
            
            <div className="flex flex-col relative">
              {CLIENT_WORK.map((work, i) => (
                <ProjectRow 
                  key={i} 
                  work={work} 
                  index={i} 
                  onHover={(w, r) => { setHoveredWork(w); setRowRect(r); }}
                  onLeave={() => { setHoveredWork(null); setRowRect(null); }}
                  onMouseMove={handleMouseMove}
                />
              ))}
            </div>

            {/* Shared Anchored Preview */}
            <AnimatePresence mode="wait">
              {hoveredWork && (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, scale: 0.96, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 0.96, filter: 'blur(10px)' }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="fixed right-[28%] xl:right-[34%] z-50 pointer-events-none hidden lg:block"
                  style={{
                    top: springTop,
                    y: previewYTranslate,
                    width: '320px',
                    aspectRatio: '16/10'
                  }}
                >
                  <div className="w-full h-full rounded-lg overflow-hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] bg-neutral-900 relative">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={hoveredWork.name}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0"
                      >
                        <div className="w-full h-full flex items-center justify-center p-8 text-center">
                          <span className="text-mono text-[10px] uppercase tracking-widest text-white/20">
                            {hoveredWork.name} <br /> Case Study Preview
                          </span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Robust Vertical Spacer */}
          <div className="h-32 md:h-[240px]" aria-hidden="true" />

          {/* Side Projects Grid */}
          <div className="max-w-4xl">
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 0.7, y: 0 }}
              viewport={{ once: true }}
              className="text-mono text-white/40 mb-4 md:mb-8 tracking-[0.4em] uppercase text-[10px] font-semibold"
            >
              05 / Side Projects
            </motion.p>
            <div className="h-10 md:hidden" aria-hidden="true" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-6">
              {SIDE_PROJECTS.map((proj, i) => {
                const [title, desc] = proj.split(' — ');
                return (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative rounded-md px-4 py-6 border-b border-white/10 flex flex-col gap-3 cursor-default transition-all duration-300 hover:bg-white/[0.02] hover:border-white/20"
                  >
                    <div className="relative inline-block self-start overflow-hidden">
                      <span className="text-[20px] md:text-[22px] leading-[1.15] text-white/85 group-hover:text-white transition-all duration-300 font-display tracking-[-0.01em]">
                        {title}
                      </span>
                      <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#A67C52]/60 transition-all duration-500 group-hover:w-full" />
                    </div>
                    <span className="text-[13px] md:text-[14px] text-white/50 group-hover:text-white/65 transition-colors font-mono leading-[1.5]">
                      {desc}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

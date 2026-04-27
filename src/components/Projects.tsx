'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionValue, useMotionTemplate } from 'framer-motion';
import Image from 'next/image';

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

const QUOTES = [
  "Design and dev aren't separate workflows.",
  'Good UI looks nice. Great UI feels inevitable.',
  "If it doesn't feel right, it isn't done.",
  'Speed is nothing without clarity.',
  'Systems beat screens every time.',
  "People don't use features. They use experiences.",
];

const BASE_QUOTE_DATE = new Date('2025-01-01T00:00:00');
const ENABLE_AUTO_MORPH = false;
const MORPH_INTERVAL_MS = 6000;

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
  const philosophyRef = useRef<HTMLElement>(null);

  const [hoveredWork, setHoveredWork] = useState<any>(null);
  const [rowRect, setRowRect] = useState<DOMRect | null>(null);
  const [isQuoteHovered, setIsQuoteHovered] = useState(false);
  const dailyQuote = getDailyQuote();
  const [activeQuoteLayer, setActiveQuoteLayer] = useState<0 | 1>(0);
  const [quoteLayerA, setQuoteLayerA] = useState(dailyQuote.quote);
  const [quoteLayerB, setQuoteLayerB] = useState(dailyQuote.quote);
  const inkX = useMotionValue(240);
  const inkY = useMotionValue(180);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const { scrollYProgress: philosophyScroll } = useScroll({
    target: philosophyRef,
    offset: ["start end", "end start"]
  });

  const quoteTextY = useTransform(philosophyScroll, [0, 1], [24, -24]);
  const quoteMarksY = useTransform(philosophyScroll, [0, 1], [12, -12]);
  const editorialGlowY = useTransform(philosophyScroll, [0, 1], [40, -40]);
  const inkOpacity = useTransform(inkX, () => (isQuoteHovered ? 0.08 : 0));
  const inkGradient = useMotionTemplate`radial-gradient(220px circle at ${inkX}px ${inkY}px, rgba(255,255,255,0.08), transparent 72%)`;

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
    <>
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
                04 / Work
              </motion.div>
            </div>
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="md:hidden text-mono text-textTertiary"
            >
              04 / Work
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
              <span className="font-serif text-4xl text-white/20 italic opacity-40 animate-pulse">Keep scrolling</span>
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
                05 / Client Work Index
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
                06 / Side Projects
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

      {/* ── Philosophy Section ── */}
      <section 
        ref={philosophyRef}
        className="w-full bg-black philosophy-section relative overflow-visible md:overflow-hidden page-padding section-padding min-h-[calc(100vh-240px)] flex items-center justify-center touch-pan-y"
      >
        <div className="w-full max-w-[1000px] mx-auto relative z-20 flex items-center justify-center">
          <motion.div
            style={{ y: editorialGlowY }}
            className="absolute -left-[10%] top-[8%] h-[380px] w-[380px] rounded-full pointer-events-none"
          >
            <div className="h-full w-full bg-[radial-gradient(circle,rgba(255,255,255,0.05),transparent_70%)]" />
          </motion.div>

          <motion.div
            className="relative w-full max-w-[900px] mx-auto border border-white/[0.06] rounded-3xl min-h-[360px] md:min-h-[400px] overflow-visible md:overflow-hidden flex flex-col items-center justify-center touch-pan-y"
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
              className="absolute right-[5%] top-[14%] text-[240px] leading-[0.8] text-white/[0.08] blur-[4px] pointer-events-none select-none z-0"
            >
              "
            </motion.div>

            {/* Badge - Absolute anchored to top */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-8 left-1/2 -translate-x-1/2 z-10 inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-[12px] py-[8px] backdrop-blur-[6px] transition-colors duration-300 hover:bg-white/[0.08]"
            >
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/60 font-medium">
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
                <div className="w-8 h-[1px] bg-white/20 mb-2" />
                <span className="text-mono text-[11px] uppercase tracking-[0.3em] text-white/80">Perspective</span>
                <span className="text-serif italic text-sm text-white/40 font-medium">Krishna Enagandula</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

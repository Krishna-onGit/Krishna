'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
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

const PROJECTS_DATA = [
  {
    id: "01 / 02",
    title: "LeadFlow AI",
    type: "FULLSTACK SAAS · 18 MONTHS",
    accentColor: "#FF5F1F", // Bright Neon Orange
    tagline: "Built alone. 18 months. Three real estate developers running their business on it today.",
    cta: "View case study",
    href: "/work/leadflow",
    previewImage: "/work-leadflow.png",
    bgColor: "#FF5F1F"
  },
  {
    id: "02 / 02",
    title: "StarConnect",
    type: "FULLSTACK · AI DRIVEN",
    accentColor: "#CCFF00", // Bright Electric Lime
    tagline: "A social network for an industry that doesn't have one.",
    cta: "View project",
    href: "/work/starconnect",
    previewImage: "/work-starconnect.png",
    bgColor: "#CCFF00"
  }
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
    if (window.innerWidth <= 768) return;
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
      className="group relative pt-6 md:pt-8 pb-[10px] min-h-[52px] md:min-h-[80px] mb-[12px] last:mb-0 grid grid-cols-[1fr_auto] items-center z-10"
    >
      <div className="flex flex-col gap-1 min-w-0">
        <motion.h3 
          animate={{ x: (isHovered && window.innerWidth > 768) ? 8 : 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="m-0 text-[15px] md:text-[34px] font-semibold md:font-semibold tracking-[-0.02em] text-white/80 group-hover:text-white transition-colors duration-300 whitespace-nowrap"
        >
          {work.name}
        </motion.h3>
        <span className="m-0 text-[10px] md:text-[11px] uppercase tracking-[0.1em] text-white/40 group-hover:text-white/60 transition-colors mt-0">
          {work.type}
        </span>
      </div>

      <div className="text-right">
        <span className="text-[11px] md:text-[13px] text-white/30 group-hover:text-white/60 transition-all duration-300 font-mono italic">
          {work.notes}
        </span>
      </div>

      <div className="col-span-2 h-2 md:h-3" aria-hidden />

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
  const [hoveredWork, setHoveredWork] = useState<any>(null);
  const [rowRect, setRowRect] = useState<DOMRect | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Derived preview position
  const springTop = useSpring(0, { stiffness: 100, damping: 20 });
  const springReactivity = useSpring(0, { stiffness: 50, damping: 25 });

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
    
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  return (
    <section ref={containerRef} className="relative w-full bg-black selection:bg-white selection:text-black pt-20" id="work">
      {/* WORK HEADER */}
      <div className="flex flex-col md:flex-row md:justify-end page-padding mb-12 md:mb-40 z-30">
        <span className="md:hidden section-number">03</span>
        <span className="font-mono text-[11px] text-white/20 uppercase tracking-[0.1em]">WORK</span>
      </div>

      {/* FEATURED PROJECTS (New UI) */}
      <div className="flex flex-col">
        {PROJECTS_DATA.map((project, index) => (
          <React.Fragment key={project.title}>
            <div 
              className="group relative w-full h-[70vh] md:h-[88vh] flex flex-col overflow-hidden transition-colors duration-500"
              style={{ 
                backgroundColor: project.bgColor,
                backgroundImage: isMobile
                  ? (index === 0 ? 'linear-gradient(135deg, #0d1117, #111827)' : 'linear-gradient(135deg, #0d0d12, #1a1025)')
                  : 'none'
              }}
            >
              {/* 1. TOP BAR */}
              <div className="h-[40px] border-b border-black/10 md:border-black/10 border-white/[0.06] flex items-center justify-between px-5 md:px-8 shrink-0 z-10">
                <span className="text-[10px] uppercase tracking-[0.12em] font-medium text-white/40 md:text-black/60">{project.type}</span>
              </div>

              {/* 2. TITLE ZONE */}
              <div className="p-[40px_20px_20px] md:p-[60px_32px_20px] shrink-0 z-10">
                <h2 className="font-extrabold tracking-[-0.04em] text-white md:text-black m-0 text-[clamp(36px,10vw,96px)] leading-[0.95] break-words" style={{ fontWeight: 800 }}>
                  {project.title}
                </h2>
              </div>

              {/* 3. SPACER */}
              <div className="flex-1 z-10" />

              {/* 4. BOTTOM BAR */}
              <div className="p-[16px_20px_48px] md:p-[16px_32px_96px] flex justify-between items-end shrink-0 z-10">
                <p className="text-[14px] md:text-[16px] italic text-white/60 md:text-black/60 max-w-[70%] md:max-w-[55%] m-0 leading-[1.55]">{project.tagline}</p>
                <Link href={project.href} className="group/link flex items-center gap-1.5 text-[13px] text-white/50 md:text-black/60 hover:text-white md:hover:text-black transition-colors duration-150">
                  <span className="font-medium">{project.cta}</span>
                  <motion.span className="inline-block" initial={{ x: 0 }} whileHover={{ x: 4 }} transition={{ duration: 0.15 }}>&rarr;</motion.span>
                </Link>
              </div>
            </div>

            {index < PROJECTS_DATA.length - 1 && (
              <div className="relative w-full h-[1px] bg-white/[0.08] flex items-center justify-center my-40">
                {/* Clean line separator */}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* ── Client Work & Side Projects Section (Old UI) ── */}
      <div className="w-full relative bg-black text-white page-padding">
        <div className="w-full relative z-10">
          
          <div className="h-32 md:h-[120px]" />

          {/* Client Work Index */}
          <div className="relative pt-[64px] md:pt-[120px] page-padding">
            <div className="w-full flex flex-col md:flex-row md:justify-end mb-8 md:mb-16">
              <span className="md:hidden section-number">04</span>
              <span className="text-mono text-white/20 text-[11px] uppercase tracking-[0.1em]">Client Work Index</span>
            </div>
            
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

            {/* Anchored Preview */}
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
                    <div className="w-full h-full flex items-center justify-center p-8 text-center">
                      <span className="text-mono text-[10px] uppercase tracking-widest text-white/20">
                        {hoveredWork.name} <br /> Case Study Preview
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="h-32 md:h-[120px]" />

          {/* Side Projects Grid */}
          <div className="w-full pt-[64px] md:pt-[120px] pb-40 page-padding">
            <div className="w-full flex flex-col md:flex-row md:justify-end mb-8 md:mb-16">
              <span className="md:hidden section-number">05</span>
              <span className="text-mono text-white/20 text-[11px] uppercase tracking-[0.1em]">Side Projects</span>
            </div>
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
                      <span className="text-[18px] text-white/85 group-hover:text-white transition-all duration-300">
                        {title}
                      </span>
                      <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-white/40 transition-all duration-500 group-hover:w-full" />
                    </div>
                    <span className="text-[13px] text-white/50 group-hover:text-white/65 transition-colors">
                      {desc}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

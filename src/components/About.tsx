'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate } from 'framer-motion';

// --- BENTO CARD COMPONENT ---

interface BentoCardProps {
  width: string | number;
  height: string | number;
  label: string;
  graphic?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  isDimmed?: boolean;
  onHover?: (hovered: boolean) => void;
}

const BentoCard = ({ width, height, label, graphic, children, className = "", isDimmed, onHover }: BentoCardProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    onHover?.(false);
  };

  return (
    <motion.div
      ref={cardRef}
      style={{ 
        width, 
        height,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d"
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative bg-white/[0.03] border border-white/10 rounded-[20px] backdrop-blur-md overflow-hidden group p-[28px] transition-all duration-500 ease-out ${isDimmed ? 'opacity-40 grayscale-[0.5] scale-[0.98]' : 'opacity-100 grayscale-0 scale-100'} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Spotlight Glow */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: useMotionTemplate`radial-gradient(400px circle at ${useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"])} ${useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"])}, rgba(255,255,255,0.06), transparent 80%)`
        }}
      />

      {/* Label */}
      <span className="absolute top-[18px] left-[18px] text-[10px] tracking-[0.3em] font-mono text-white/30 uppercase z-20">
        {label}
      </span>

      {/* Graphic - System-specific flow animation wrapper */}
      {graphic && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10" style={{ transform: "translateZ(20px)" }}>
          <motion.div 
            animate={{ 
              y: [0, -4, 0],
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="group-hover:scale-105 transition-transform duration-700 ease-out"
          >
            {graphic}
          </motion.div>
        </div>
      )}

      {/* Text - Subtle Reveal Container */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute bottom-[28px] left-[28px] right-[28px] z-20"
        style={{ transform: "translateZ(30px)" }}
      >
        {children}
      </motion.div>

      {/* Subtle Frame Highlight */}
      <div className="absolute inset-0 border border-white/5 rounded-[20px] pointer-events-none" />
    </motion.div>
  );
};

export default function About() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const containerRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const watermarkX = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const watermarkOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.02, 0]);

  const cards = [
    {
      id: 1,
      label: "WHAT I DO",
      width: 420,
      height: 440,
      graphic: <img src="/bento-stack-WHAT-I-DO.png" alt="" className="h-[230px] w-auto object-contain mix-blend-screen opacity-100 brightness-[1.2] contrast-[1.1] -translate-y-[44px]" />,
      children: (
        <div className="max-w-[80%]">
          <p className="text-[18px] text-white font-medium leading-tight">
            I build digital products end-to-end
          </p>
          <p className="text-[14px] text-white/50 mt-2 leading-relaxed">
            Visual systems to functional builds. I design the core system, then I scale it.
          </p>
        </div>
      )
    },
    {
      id: 2,
      label: "WHERE I’VE BUILT",
      width: 368,
      height: 440,
      graphic: <img src="/bento-stack-WHERE I’VE BUILT.png" alt="" className="w-[100%] h-auto object-contain mix-blend-screen opacity-100 brightness-[1.2] contrast-[1.1]" />,
      children: (
        <div className="flex flex-col gap-2">
          <p className="text-[14px] text-white font-medium">QUAN (2025 — Present)</p>
          <ul className="text-[13px] text-white/50 space-y-1.5 list-none">
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[#A67C52]" />
              2+ SaaS products
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[#A67C52]" />
              3+ brand-focused platforms
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[#A67C52]" />
              UI + graphic systems
            </li>
          </ul>
        </div>
      )
    },
    {
      id: 3,
      label: "EDGE",
      width: 348,
      height: 440,
      graphic: <img src="/bento-stack-EDGE.png" alt="" className="w-[100%] h-auto object-contain mix-blend-screen opacity-100 brightness-[1.2] contrast-[1.1]" />,
      children: (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col text-[14px] text-white/60 leading-relaxed border-l border-white/10 pl-4">
            <span>Most pick a lane.</span>
            <span className="text-white/90">I built the bridge.</span>
          </div>
          <div className="flex justify-between items-center text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] pt-4 border-t border-white/[0.03]">
            <span>looks</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>works</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>feels</span>
          </div>
        </div>
      )
    },
    {
      id: 4,
      label: "HOW I WORK",
      width: 732,
      height: 304,
      children: (
        <div className="flex h-full items-center flex-col md:flex-row">
          <div className="w-full md:w-1/2 md:pr-8">
            <p className="text-[20px] text-white font-semibold leading-tight mb-3">
              AI is my execution engine
            </p>
            <p className="text-[14px] text-white/50 leading-relaxed mb-4">
              Utilizing advanced LLMs to accelerate build cycles and ensure pixel-perfect logic.
            </p>
            <div className="flex gap-4 text-[9px] font-mono text-[#A67C52] uppercase tracking-[0.2em]">
              <span>idea</span>
              <span className="opacity-30">→</span>
              <span>system</span>
              <span className="opacity-30">→</span>
              <span>build</span>
              <span className="opacity-30">→</span>
              <span>refine</span>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center items-center mt-6 md:mt-0">
            <img src="/bento-stack-HOW I WORK.png" alt="" className="w-[140%] h-auto object-contain mix-blend-screen opacity-100 brightness-[1.2] contrast-[1.1]" />
          </div>
        </div>
      )
    },
    {
      id: 5,
      label: "FINAL STATEMENT",
      width: 420,
      height: 304,
      children: (
        <div className="flex flex-col h-full justify-end">
          <div className="flex flex-col text-[18px] leading-tight font-medium">
            <span className="text-white/40">I don’t just design.</span>
            <span className="text-white/40">I don’t just build.</span>
            <span className="text-[#A67C52] mt-1 italic">I take products from idea to reality.</span>
          </div>
        </div>
      )
    }
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  // Update active slide on scroll
  const handleScroll = () => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    const { scrollLeft, clientWidth } = scrollContainer;
    const index = Math.round(scrollLeft / (clientWidth * 0.85));
    setActiveSlide(index);
  };

  // Auto-scroll logic for mobile
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || window.innerWidth >= 768) return;

    const interval = setInterval(() => {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
      const nextIndex = (activeSlide + 1) % cards.length;
      
      if (nextIndex === 0) {
        scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scrollContainer.scrollTo({ 
          left: nextIndex * (clientWidth * 0.85 + 16), 
          behavior: 'smooth' 
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [activeSlide, cards.length]);

  return (
    <section ref={containerRef} className="relative w-full min-h-0 flex flex-col items-center bg-black overflow-hidden py-0" id="about">
      {/* Background Watermark */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <motion.span 
          style={{ x: watermarkX, opacity: watermarkOpacity }}
          className="text-[200px] md:text-[400px] font-serif font-semibold text-white tracking-tight whitespace-nowrap"
        >
          INTERSECTION
        </motion.span>
      </div>

      <div className="w-full max-w-[1200px] mx-auto relative z-10 px-6 flex flex-col items-center gap-12">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.4 }}
            className="text-mono text-white tracking-[0.4em] uppercase text-[10px] mb-8"
          >
            02 / About
          </motion.span>
          <h2 className="text-[clamp(32px,5vw,64px)] font-display text-white tracking-tight leading-none mb-6">
            I design. I build. <span className="italic text-[#A67C52]">No gap.</span>
          </h2>
        </div>

        {/* --- DESKTOP GRID LAYOUT --- */}
        <div className="hidden md:flex relative mx-auto flex-col items-center" style={{ height: '800px' }}>
          <div className="flex flex-col gap-[28px]">
            {/* ROW 1 */}
            <div className="flex gap-[24px] items-start" style={{ height: '440px' }}>
              {cards.slice(0, 3).map((card) => (
                <BentoCard
                  key={card.id}
                  width={card.width}
                  height={card.height}
                  label={card.label}
                  graphic={card.graphic}
                  isDimmed={hoveredCard !== null && hoveredCard !== card.id}
                  onHover={(h) => setHoveredCard(h ? card.id : null)}
                >
                  {card.children}
                </BentoCard>
              ))}
            </div>
            {/* ROW 2 */}
            <div className="flex gap-[24px] items-start" style={{ height: '304px' }}>
              {cards.slice(3).map((card) => (
                <BentoCard
                  key={card.id}
                  width={card.width}
                  height={card.height}
                  label={card.label}
                  graphic={card.graphic}
                  isDimmed={hoveredCard !== null && hoveredCard !== card.id}
                  onHover={(h) => setHoveredCard(h ? card.id : null)}
                >
                  {card.children}
                </BentoCard>
              ))}
            </div>
          </div>
        </div>

        {/* --- MOBILE CAROUSEL LAYOUT --- */}
        <div className="md:hidden w-full relative">
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {cards.map((card) => (
              <div key={card.id} className="min-w-[85vw] snap-center">
                <BentoCard
                  width="100%"
                  height={480}
                  label={card.label}
                  graphic={card.graphic}
                  className="!p-6"
                >
                  {card.children}
                </BentoCard>
              </div>
            ))}
          </div>
          
          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mt-2">
            {cards.map((_, i) => (
              <div 
                key={i} 
                className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                  activeSlide === i ? 'bg-[#A67C52] w-4' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom Metrics */}
        <div className="mt-20 md:mt-32 w-full pt-12 border-t border-white/[0.05] grid grid-cols-3 gap-4 md:gap-8">
          {[
            { v: "2", l: "SaaS" },
            { v: "10+", l: "Clients" },
            { v: "1", l: "Person Execution" }
          ].map((m, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-1">
              <span className="text-[24px] md:text-[32px] font-serif text-white">{m.v}</span>
              <span className="text-[8px] md:text-[10px] uppercase tracking-widest text-white/40 font-mono">{m.l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

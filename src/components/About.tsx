'use client';

import React, { useRef, useState } from 'react';
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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const watermarkX = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const watermarkOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.02, 0]);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen flex items-center justify-center bg-black overflow-hidden pt-32 pb-64" id="about">
      {/* Background Watermark */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <motion.span 
          style={{ x: watermarkX, opacity: watermarkOpacity }}
          className="text-[400px] font-serif font-semibold text-white tracking-tight whitespace-nowrap"
        >
          INTERSECTION
        </motion.span>
      </div>

      <div className="max-w-[1200px] mx-auto relative z-10 px-6">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.4 }}
            className="text-mono text-white tracking-[0.4em] uppercase text-[10px] mb-8"
          >
            02 / About
          </motion.span>
          <h2 className="text-[clamp(32px,5vw,64px)] font-display text-white tracking-tight leading-none mb-4">
            I design. I build. <span className="italic text-[#A67C52]">No gap.</span>
          </h2>
        </div>

        {/* --- THE BENTO GRID (800px FIXED HEIGHT SYSTEM) --- */}
        <div className="relative mx-auto flex flex-col items-center" style={{ height: '800px' }}>
          
          <div className="flex flex-col gap-[28px]">
            {/* ROW 1: 440px height */}
            <div className="flex gap-[24px] items-start" style={{ height: '440px' }}>
              
              {/* WHAT I DO */}
              <BentoCard 
                width={420} 
                height={440} 
                label="WHAT I DO" 
                isDimmed={hoveredCard !== null && hoveredCard !== 1}
                onHover={(h) => setHoveredCard(h ? 1 : null)}
                graphic={<img src="/bento-stack-WHAT-I-DO.png" alt="" className="h-[230px] w-auto object-contain mix-blend-screen opacity-100 brightness-[1.2] contrast-[1.1] -translate-y-[44px]" />}
              >
                <div className="max-w-[80%]">
                  <p className="text-[18px] text-white font-medium leading-tight">
                    I build digital products end-to-end
                  </p>
                  <p className="text-[14px] text-white/50 mt-2 leading-relaxed">
                    Visual systems to functional builds. I design the core system, then I scale it.
                  </p>
                </div>
              </BentoCard>

              {/* WHERE I’VE BUILT */}
              <BentoCard 
                width={368} 
                height={440} 
                label="WHERE I’VE BUILT" 
                isDimmed={hoveredCard !== null && hoveredCard !== 2}
                onHover={(h) => setHoveredCard(h ? 2 : null)}
                graphic={<img src="/bento-stack-WHERE I’VE BUILT.png" alt="" className="w-[100%] h-auto object-contain mix-blend-screen opacity-100 brightness-[1.2] contrast-[1.1]" />}
              >
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
              </BentoCard>

              {/* EDGE */}
              <BentoCard 
                width={348} 
                height={440} 
                label="EDGE" 
                isDimmed={hoveredCard !== null && hoveredCard !== 3}
                onHover={(h) => setHoveredCard(h ? 3 : null)}
                graphic={<img src="/bento-stack-EDGE.png" alt="" className="w-[100%] h-auto object-contain mix-blend-screen opacity-100 brightness-[1.2] contrast-[1.1]" />}
              >
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
              </BentoCard>

            </div>

            {/* ROW 2: 304px height */}
            <div className="flex gap-[24px] items-start" style={{ height: '304px' }}>
              
              {/* HOW I WORK */}
              <BentoCard 
                width={732} 
                height={304} 
                label="HOW I WORK"
                isDimmed={hoveredCard !== null && hoveredCard !== 4}
                onHover={(h) => setHoveredCard(h ? 4 : null)}
              >
                <div className="flex h-full items-center">
                  <div className="w-1/2 pr-8">
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
                  <div className="w-1/2 flex justify-center items-center">
                    <img src="/bento-stack-HOW I WORK.png" alt="" className="w-[140%] h-auto object-contain mix-blend-screen opacity-100 brightness-[1.2] contrast-[1.1]" />
                  </div>
                </div>
              </BentoCard>

              {/* FINAL STATEMENT */}
              <BentoCard 
                width={420} 
                height={304} 
                label="FINAL STATEMENT"
                isDimmed={hoveredCard !== null && hoveredCard !== 5}
                onHover={(h) => setHoveredCard(h ? 5 : null)}
              >
                <div className="flex flex-col h-full justify-end">
                  <div className="flex flex-col text-[18px] leading-tight font-medium">
                    <span className="text-white/40">I don’t just design.</span>
                    <span className="text-white/40">I don’t just build.</span>
                    <span className="text-[#A67C52] mt-1 italic">I take products from idea to reality.</span>
                  </div>
                </div>
              </BentoCard>

            </div>
          </div>

        </div>

        {/* Bottom Metrics */}
        <div className="mt-32 w-full pt-12 border-t border-white/[0.05] grid grid-cols-3 gap-8">
          {[
            { v: "2", l: "SaaS" },
            { v: "10+", l: "Clients" },
            { v: "1", l: "Person Execution" }
          ].map((m, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-1">
              <span className="text-[32px] font-serif text-white">{m.v}</span>
              <span className="text-[10px] uppercase tracking-widest text-white/40 font-mono">{m.l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

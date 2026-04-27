'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import Image from 'next/image';

const PROCESS_STAGES = [
  {
    id: 'thinking',
    num: '01',
    title: 'Thinking First.',
    desc: 'Most people start with tools. I start with the "why" and define the core user journey before a single pixel is moved.',
    image: '/thinking-first.png',
  },
  {
    id: 'visual',
    num: '02',
    title: 'Visual Language.',
    desc: 'Setting the aesthetic tone. A cohesive system that balances beauty with functional hierarchy to ensure brand resonance.',
    image: '/visual-language.png',
  },
  {
    id: 'delivery',
    num: '03',
    title: 'High-Octane Delivery.',
    desc: 'Executing at speed. Building robust, scalable solutions using AI-augmented workflows without quality compromise.',
    image: '/high-octane-delivery.png',
  }
];

const PATH_NORMAL = "M40,0 C80,150 0,250 40,350 C80,500 0,650 40,800 C80,900 40,1000 40,1000";
const PATH_DODGE  = "M0,0  C20,150 -20,250 0,350  C20,500 -20,650 0,800  C20,900 0,1000 0,1000";

function ProcessStage({ 
  stage, 
  index 
}: { 
  stage: typeof PROCESS_STAGES[0], 
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    amount: 0.5,
    margin: "-10% 0px -10% 0px"
  });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <motion.div
      ref={ref}
      className={`min-h-0 md:min-h-screen flex items-center py-0 md:py-24 mb-24 md:mb-0 last:mb-0 process-stage-snap transition-all duration-700 ${isInView ? 'opacity-100 scale-100' : 'opacity-100 md:opacity-30 scale-100 md:scale-95'}`}
    >
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-24 items-center">
        <div className="flex flex-col items-start pl-6 md:pl-32 relative z-20">
          <motion.span 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 0.4, x: 0 }}
            viewport={{ once: true }}
            className="text-mono text-[12px] tracking-[0.3em] uppercase text-white/40 mb-3 md:mb-6"
          >
            {stage.num} / 03
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-medium text-white leading-[1.1] tracking-[-1px] font-display mb-4 md:mb-8"
            style={{ fontSize: 'clamp(40px, 5vw, 60px)' }}
          >
            {stage.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 0.7, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[15px] md:text-[16px] text-white/70 font-mono leading-relaxed max-w-[420px]"
          >
            {stage.desc}
          </motion.p>
        </div>
        <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/5 flex items-center justify-center">
          <motion.div 
            className="w-full h-full relative"
            style={{ y: imageY }}
          >
            <Image 
              src={stage.image} 
              alt={stage.title} 
              fill 
              className="object-contain" 
              priority={index === 0}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);

  const { scrollYProgress: sectionVisibility } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  const entryThreshold = 0.18;
  const exitThreshold = 0.72;

  const drawOffset = useTransform(sectionVisibility, [entryThreshold, exitThreshold], [pathLength || 1500, 0]);
  
  const lineOpacity = useTransform(sectionVisibility, 
    [0, entryThreshold - 0.01, entryThreshold, exitThreshold, exitThreshold + 0.02, 1], 
    [0, 0, 1, 1, 0, 0]
  );

  const currentPath = useTransform(sectionVisibility, 
    [0, entryThreshold, entryThreshold + 0.05, exitThreshold - 0.05, exitThreshold, 1],
    [PATH_NORMAL, PATH_NORMAL, PATH_DODGE, PATH_DODGE, PATH_NORMAL, PATH_NORMAL]
  );

  const dotY = useTransform(sectionVisibility, 
    [entryThreshold, 0.28, 0.50, 0.72, exitThreshold], 
    ["10%", "28%", "50%", "72%", "85%"]
  );
  
  const dotX = useTransform(sectionVisibility,
    [entryThreshold, 0.28, 0.35, 0.50, 0.65, 0.72, exitThreshold],
    [40, 40, 0, 40, 0, 40, 40] 
  );
  
  const springX = useSpring(dotX, { stiffness: 400, damping: 40 });

  const sectionOpacity = useTransform(sectionVisibility, [0, 0.1, 0.9, 1], [0.6, 1, 1, 0.6]);
  const sectionScale = useTransform(sectionVisibility, [0, 0.1, 0.9, 1], [0.98, 1, 1, 0.98]);

  const dotRef = useRef<HTMLDivElement>(null);

  // Expose dot position to CustomCursor
  useEffect(() => {
    const updateDotPos = () => {
      const visibility = sectionVisibility.get();
      const isActive = visibility > entryThreshold && visibility < exitThreshold; 

      if (dotRef.current && isActive) {
        const rect = dotRef.current.getBoundingClientRect();
        const event = new CustomEvent('process-dot-move', { 
          detail: { x: rect.left + rect.width/2, y: rect.top + rect.height/2, active: true } 
        });
        window.dispatchEvent(event);
      } else {
        window.dispatchEvent(new CustomEvent('process-dot-move', { detail: { active: false } }));
      }
    };

    const interval = setInterval(updateDotPos, 16); 
    return () => {
      clearInterval(interval);
      window.dispatchEvent(new CustomEvent('process-dot-move', { detail: { active: false } }));
    };
  }, [sectionVisibility, entryThreshold, exitThreshold]);

  return (
    <motion.section 
      ref={containerRef} 
      className="relative w-full page-padding bg-black process-section-snap" 
      id="process"
      style={{ opacity: sectionOpacity, scale: sectionScale }}
    >
      <div className="max-w-[1000px] mx-auto relative">
        
        <motion.div 
          className="process-svg hidden md:block"
          style={{ opacity: lineOpacity, zIndex: 15 }}
        >
          <svg viewBox="0 0 200 1000" preserveAspectRatio="none" className="w-full h-full overflow-visible">
            <path d={PATH_NORMAL} stroke="transparent" fill="none" />
            <motion.path
              ref={pathRef}
              d={currentPath}
              className="path-progress"
              style={{ 
                strokeDasharray: pathLength || 1500,
                strokeDashoffset: drawOffset
              }}
            />
          </svg>

          <motion.div 
            ref={dotRef}
            className="process-node-fixed active"
            style={{ 
              top: dotY, 
              left: springX,
              opacity: lineOpacity
            }}
          />
        </motion.div>

        <div className="pt-24 h-auto">
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 0.45, x: 0 }}
            viewport={{ once: true }}
            className="text-mono text-white mb-4 md:mb-8 block pl-6 md:pl-0"
          >
            03 / Process
          </motion.span>
        </div>
        <div className="h-24 md:hidden" aria-hidden="true" />
        <div className="flex flex-col mt-0">
          {PROCESS_STAGES.map((stage, index) => (
            <React.Fragment key={stage.id}>
              <ProcessStage stage={stage} index={index} />
              {index < PROCESS_STAGES.length - 1 && <div className="h-40 lg:hidden" aria-hidden="true" />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

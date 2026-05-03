'use client';

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

function Magnetic({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.4);
    y.set((clientY - centerY) * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.div>
  );
}

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('');
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const sections = ['about', 'process', 'work', 'stack', 'contact'];
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
          setIsHidden(entry.target.id === 'contact');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: isHidden ? 0 : 1, 
          y: isHidden ? -40 : 0,
          pointerEvents: isHidden ? 'none' : 'auto'
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full z-[60] page-padding pb-8 flex items-center justify-between pointer-events-none"
        style={{ paddingTop: 'clamp(40px, 6vh, 80px)' }}
      >
        {/* --- Availability Tag (Desktop Only) --- */}
        <div className="hidden md:block">
          <Magnetic>
            <div className="flex items-center gap-3 pointer-events-auto group cursor-pointer py-2">
              <div className="relative flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#EAEAEA] relative z-10" />
                <motion.div 
                  animate={{ 
                    scale: [1, 2.5, 1],
                    opacity: [0.3, 0.1, 0.3]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-white blur-[2px]"
                />
              </div>
              <span className="text-ui-label text-white/50 group-hover:text-white/80 transition-all duration-300">
                Available
              </span>
            </div>
          </Magnetic>
        </div>

        <div className="hidden md:flex items-center gap-8 pointer-events-auto py-2">
          {['About', 'Work', 'Process', 'Stack'].map((item) => {
            const isActive = activeSection === item.toLowerCase();
            return (
              <Magnetic key={item}>
                <a 
                  href={`#${item.toLowerCase()}`} 
                  className={`text-nav transition-all duration-300 block ${
                    isActive 
                    ? 'text-white' 
                    : 'text-white/40 hover:text-white/80'
                  }`}
                  data-cursor="ink"
                >
                  {item}
                </a>
              </Magnetic>
            );
          })}
        </div>
      </motion.nav>

      {/* --- Availability Tag (Mobile Only - Fixed at Bottom) --- */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: isHidden ? 0 : 1, 
          y: isHidden ? 40 : 0
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] md:hidden pointer-events-auto"
      >
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-white relative z-10" />
            <motion.div 
              animate={{ 
                scale: [1, 2.5, 1],
                opacity: [0.4, 0.1, 0.4]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 w-1.5 h-1.5 rounded-full bg-white blur-[2px]"
            />
          </div>
          <span className="text-ui-label text-white/60 whitespace-nowrap">
            Available
          </span>
        </div>
      </motion.div>
    </>
  );
}

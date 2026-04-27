'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function MobileNotice() {
  const [isVisible, setIsVisible] = useState(true);
  
  // Auto-hide after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="absolute top-[22vh] left-0 right-0 z-40 md:hidden pointer-events-none flex flex-col items-center"
    >
      <div className="flex flex-col items-center gap-1.5 opacity-50">
        <span className="text-mono text-[7px] text-white tracking-[0.4em] uppercase font-medium">
          Best experienced on desktop
        </span>
        <div className="w-8 h-[1px] bg-white/50" />
      </div>
    </motion.div>
  );
}

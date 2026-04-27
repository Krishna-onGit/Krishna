'use client';

import { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(false);
  const controls = useAnimation();

  // On mount, check if there's a saved theme preference or just start the rolling animation
  useEffect(() => {
    // Start continuous rotation (the ball rolling)
    controls.start({
      rotate: 360,
      transition: { duration: 4, repeat: Infinity, ease: 'linear' }
    });
  }, [controls]);

  const handleToggle = async () => {
    // Stop the continuous rotation and play the "hit" effect
    // 1. Squish (anticipation)
    // 2. Rapid shoot to right, rotate fast
    await controls.start({
      scaleX: [1, 1.3, 0.8],
      scaleY: [1, 0.7, 1.2],
      x: [0, -10, 150], // pull back slightly left, then shoot right off-screen
      y: [0, 5, -50], // dip down, then shoot up
      rotate: '+=1080',
      opacity: [1, 1, 0],
      transition: { duration: 0.5, times: [0, 0.3, 1], ease: 'easeIn' }
    });
    
    // Toggle the actual CSS theme
    const newTheme = !isLight;
    setIsLight(newTheme);
    if (newTheme) {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }

    // Reset position invisibly to the left side
    controls.set({ x: -150, y: -50, opacity: 0, scaleX: 1, scaleY: 1 });

    // Roll back in from the left
    await controls.start({
      x: 0,
      y: 0,
      opacity: 1,
      rotate: '+=720',
      transition: { duration: 0.6, ease: 'easeOut', type: 'spring', bounce: 0.4 }
    });

    // Resume continuous rotation
    controls.start({
      rotate: "+=360",
      transition: { duration: 4, repeat: Infinity, ease: 'linear' }
    });
  };

  return (
    <div className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-50 pointer-events-auto">
      <div className="relative group cursor-pointer" onClick={handleToggle}>
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-accent/20 rounded-full blur-xl scale-0 group-hover:scale-150 transition-transform duration-500 pointer-events-none" />
        
        {/* The Button Container */}
        <div className="w-16 h-16 flex items-center justify-center bg-bgSurface border border-glassBorder shadow-[inset_0_1px_0_var(--color-glassShadow)] rounded-full text-3xl relative z-10 transition-colors backdrop-blur-md hover:bg-glassBg">
          
          {/* The Football */}
          <motion.div animate={controls} style={{ originX: 0.5, originY: 0.5 }}>
            ⚽
          </motion.div>
          
        </div>
      </div>
    </div>
  );
}

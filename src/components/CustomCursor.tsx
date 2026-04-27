'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isInkHovering, setIsInkHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [targetPoint, setTargetPoint] = useState<{ x: number, y: number } | null>(null);

  useEffect(() => {
    // 1. Mouse Position Logic
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // 2. Cursor State Logic (Ordered for priority)
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const cursorAttr = target.dataset.cursor || target.closest('[data-cursor]')?.getAttribute('data-cursor');
      
      // Priority 1: Ink Effects
      if (cursorAttr === 'ink' || cursorAttr === 'ink-diffusion') {
        setIsInkHovering(true);
        setIsHovering(false);
        return;
      }

      // Priority 2: Interactive Elements
      const isLink = target.tagName.toLowerCase() === 'a' || target.closest('a');
      const isButton = target.tagName.toLowerCase() === 'button' || target.closest('button');
      
      if (isLink || isButton || cursorAttr) {
        setIsHovering(true);
        setIsInkHovering(false);
      } else {
        setIsHovering(false);
        setIsInkHovering(false);
      }
    };

    const handleDotMove = (e: any) => {
      if (e.detail.active) {
        setTargetPoint({ x: e.detail.x, y: e.detail.y });
      } else {
        setTargetPoint(null);
      }
    };

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('process-dot-move', handleDotMove);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('process-dot-move', handleDotMove);
    };
  }, []);

  return (
    <motion.div
      className={`custom-cursor flex items-center justify-center ${isHovering ? 'hovering' : ''} ${isInkHovering ? 'ink-active' : ''}`}
      animate={{
        x: targetPoint ? targetPoint.x : mousePosition.x,
        y: targetPoint ? targetPoint.y : mousePosition.y,
        scale: isInkHovering ? 1.1 : 1,
        opacity: 1,
      }}
      transition={{ 
        type: 'spring',
        damping: 30,
        stiffness: 150,
        mass: 0.5,
        restDelta: 0.001
      }}
      style={{
        translateX: '-50%',
        translateY: '-50%'
      }}
    />
  );
}

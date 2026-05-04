'use client';

import { motion } from 'framer-motion';
import { Home, User, Briefcase, Code } from 'lucide-react';

export default function MobileNav() {
  return (
    <motion.nav 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="md:hidden fixed bottom-0 left-0 w-full h-[52px] bg-[#080808]/95 backdrop-blur-xl border-t border-white/[0.06] z-[100] flex items-center justify-around px-6"
    >
      <a href="#hero" className="flex flex-col items-center gap-1 text-white/50 active:text-white">
        <Home size={18} />
      </a>
      <a href="#about" className="flex flex-col items-center gap-1 text-white/50 active:text-white">
        <User size={18} />
      </a>
      <a href="#work" className="flex flex-col items-center gap-1 text-white/50 active:text-white">
        <Briefcase size={18} />
      </a>
      <a href="#stack" className="flex flex-col items-center gap-1 text-white/50 active:text-white">
        <Code size={18} />
      </a>
    </motion.nav>
  );
}

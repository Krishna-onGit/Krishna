'use client';

import { motion } from 'framer-motion';
import { Home, User, Briefcase, Code } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export default function MobileNav() {
  return (
    <motion.nav 
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="md:hidden fixed bottom-0 left-0 w-full h-[64px] bg-bgPrimary/95 backdrop-blur-xl border-t border-line z-[100] flex items-center justify-around px-6 pb-2"
    >
      <a href="#hero" className="flex flex-col items-center gap-1 text-textSecondary active:text-textPrimary transition-colors">
        <Home size={18} />
      </a>
      <a href="#about" className="flex flex-col items-center gap-1 text-textSecondary active:text-textPrimary transition-colors">
        <User size={18} />
      </a>
      <a href="#work" className="flex flex-col items-center gap-1 text-textSecondary active:text-textPrimary transition-colors">
        <Briefcase size={18} />
      </a>
      <a href="#stack" className="flex flex-col items-center gap-1 text-textSecondary active:text-textPrimary transition-colors">
        <Code size={18} />
      </a>
      <div className="flex items-center">
        <ThemeToggle />
      </div>
    </motion.nav>
  );
}

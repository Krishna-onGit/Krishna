'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

export default function FootballDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1); // 1: Selection, 2: Friends
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      rotate: 360,
      transition: { duration: 6, repeat: Infinity, ease: 'linear' }
    });
  }, [controls]);

  const resetDialog = () => {
    setIsOpen(false);
    setTimeout(() => setStep(1), 300);
  };

  return (
    <>
      {/* --- Football Icon Button --- */}
      <div className="fixed bottom-6 right-4 md:bottom-12 md:right-10 z-[100] pointer-events-auto">
        <motion.div 
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative group cursor-pointer w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-black/40 backdrop-blur-xl border border-white/10 rounded-full text-base md:text-lg shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all hover:border-white/20"
          data-cursor="Interact"
        >
          <div className="absolute inset-0 bg-white/5 rounded-full blur-xl scale-0 group-hover:scale-125 transition-transform duration-500 pointer-events-none" />
          <motion.div 
            animate={controls} 
            className="relative z-10"
            style={{ filter: 'drop-shadow(0 0 3px rgba(255, 255, 255, 0.5))' }}
          >
            ⚽
          </motion.div>
        </motion.div>
      </div>

      {/* --- Dialog Modal --- */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={resetDialog}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="relative w-full max-w-md bg-[#111111] border border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden"
            >
              {/* Subtle background glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-white/5 blur-[80px] pointer-events-none" />

              <div className="relative z-10 text-center">
                {step === 1 ? (
                  <>
                    <h3 className="font-serif text-[28px] md:text-[34px] text-white mb-8 leading-tight">
                      Choose your side
                    </h3>
                    <div className="flex flex-col gap-4">
                      <button 
                        onClick={() => setStep(2)}
                        className="group relative py-4 px-8 rounded-2xl bg-white/5 border border-white/10 text-white font-mono text-[11px] tracking-[0.2em] uppercase transition-all hover:bg-white hover:text-black hover:border-white"
                      >
                        Football ⚽
                      </button>
                      <button 
                        onClick={() => setStep(2)}
                        className="group relative py-4 px-8 rounded-2xl bg-white/5 border border-white/10 text-white font-mono text-[11px] tracking-[0.2em] uppercase transition-all hover:bg-white hover:text-black hover:border-white"
                      >
                        Cricket 🏏
                      </button>
                    </div>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center gap-6"
                  >
                    <div className="text-6xl mb-4">🤝</div>
                    <h3 className="font-serif text-[32px] md:text-[40px] text-white leading-tight">
                      We are friends now!
                    </h3>
                    <p className="text-white/40 font-serif italic text-lg">
                      Great choices define great people.
                    </p>
                    <button 
                      onClick={resetDialog}
                      className="mt-6 text-mono text-[10px] text-white/30 hover:text-white transition-colors"
                    >
                      Close
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

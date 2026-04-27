"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const MyStory = () => {
  return (
    <section className="relative w-full py-[140px] page-padding overflow-hidden bg-bgSecondary">
      {/* Subtle Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] bg-paper-grain" />

      <div className="max-w-[960px] mx-auto relative z-10 flex flex-col md:flex-row items-center gap-16 md:gap-24">
        
        {/* Left Side - Visual */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full md:w-1/2 aspect-[4/5] max-w-[400px]"
        >
          <div className="absolute inset-0 bg-[#F5F1EA]/10 border border-glassBorder rounded-2xl overflow-hidden group">
            <Image 
              src="/BublumGumGuy.png" 
              alt="Story Visualization" 
              fill
              className="object-contain p-8 transform group-hover:scale-105 transition-transform duration-1000 opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bgSecondary via-transparent to-transparent z-10 opacity-60" />
          </div>
        </motion.div>

        {/* Right Side - Narrative */}
        <div className="w-full md:w-1/2 flex flex-col items-start">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.4 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-mono text-textTertiary mb-5 md:mb-8 tracking-[0.4em] uppercase text-[10px] font-semibold"
          >
            02 / Story
          </motion.p>
          <div className="h-6 md:hidden" /> {/* Mobile Spacer */}

          <h2 
            className="font-medium text-textPrimary leading-[1.05] tracking-[-0.5px] font-serif mb-6 md:mb-10"
            style={{ fontSize: 'clamp(42px, 5vw, 64px)' }}
            data-cursor="ink-diffusion"
          >
            Building driven <br />
            <span className="italic serif text-accent opacity-90">by curiosity.</span>
          </h2>

          <div className="space-y-6 md:space-y-10 max-w-lg">
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-[18px] md:text-[20px] text-textSecondary font-serif leading-relaxed italic border-l border-accent/30 pl-6 md:pl-8 py-2"
            >
              "I explored everything — from editing and content creation to full-spectrum development."
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.7 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-[16px] text-textSecondary font-serif leading-relaxed"
            >
              Today, I combine design, technology, and product thinking to build solutions that balance business goals with user needs. My path has been one of continuous learning, building, and refinement.
            </motion.p>
          </div>

          {/* Micro Stats */}
          <div className="grid grid-cols-3 gap-12 mt-16 pt-10 border-t border-line w-full">
            {[
              { val: "4+", lab: "Years Exp" },
              { val: "50+", lab: "Projects" },
              { val: "100%", lab: "Passion" }
            ].map((m, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 + (i * 0.1) }}
                className="flex flex-col gap-1 group"
                data-cursor="ink"
              >
                <span className="text-2xl font-serif text-textPrimary group-hover:text-accent transition-colors">{m.val}</span>
                <span className="text-mono text-textTertiary text-[9px] tracking-widest uppercase">{m.lab}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyStory;

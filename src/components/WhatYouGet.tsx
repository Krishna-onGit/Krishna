"use client";

import React from "react";
import { motion } from "framer-motion";

const WhatYouGet = () => {
  return (
    <section className="relative w-full py-[140px] page-padding overflow-hidden bg-bgPrimary">
      {/* Subtle Texture */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] bg-paper-grain" />

      <div className="max-w-[960px] mx-auto relative z-10 flex flex-col items-start">
        {/* Label */}
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.4 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-mono text-textTertiary mb-4 md:mb-8 tracking-[0.4em] uppercase text-[10px] font-semibold"
        >
          04 / Value
        </motion.p>
        <div className="h-8 md:hidden" aria-hidden="true" />

        {/* Heading */}
        <div className="mb-10 md:mb-16">
          <h2 
            className="font-medium text-textPrimary leading-[1.05] tracking-[-0.5px] font-serif"
            style={{ fontSize: 'clamp(42px, 5vw, 64px)' }}
            data-cursor="ink-diffusion"
          >
            Creative × <br />
            <span className="italic serif text-accent opacity-90">Technical DNA.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-24 w-full">
          {/* Left Column - Philosophy */}
          <div className="flex flex-col gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-[18px] md:text-[20px] text-textSecondary font-serif leading-relaxed italic">
                "I bridge the gap between aesthetic vision and engineering reality. Every project is an opportunity to craft a seamless experience that scales."
              </p>
            </motion.div>

            <div className="space-y-6">
              {[
                "Precision in design execution.",
                "High-performance architecture.",
                "Conversion-focused strategy.",
                "Scalable product thinking."
              ].map((line, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + (i * 0.1) }}
                  className="flex items-center gap-6 group"
                  data-cursor="ink"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-accent/40 transition-transform duration-300 group-hover:scale-125" />
                  <span className="text-[16px] text-textPrimary font-serif transition-colors duration-300 group-hover:text-accent">
                    {line}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column - Stats */}
          <div className="flex flex-col gap-12 md:pl-16 md:border-l border-line">
            {[
              { val: "0", lab: "Compromise", desc: "No quality sacrifice for speed." },
              { val: "100%", lab: "Precision", desc: "Every pixel & line matters." },
              { val: "∞", lab: "Scalability", desc: "Built to grow with your vision." }
            ].map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 + (i * 0.1) }}
                className="flex flex-col gap-2 group"
                data-cursor="ink"
              >
                <div className="flex items-baseline gap-4">
                  <span className="text-4xl md:text-5xl font-serif text-textPrimary group-hover:text-accent transition-colors duration-500">
                    {s.val}
                  </span>
                  <span className="text-mono text-accent/80 text-[10px] tracking-widest uppercase">
                    {s.lab}
                  </span>
                </div>
                <p className="text-[14px] text-textTertiary font-serif leading-relaxed max-w-xs group-hover:text-textSecondary transition-colors">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default WhatYouGet;

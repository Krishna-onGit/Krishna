'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { WobbleCard } from './ui/wobble-card';

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative w-full page-padding bg-bgPrimary py-0 transition-colors duration-500"
      id="process"
    >
      {/* Section Header */}
      <div className="w-full flex flex-col md:flex-row md:justify-end mb-12 md:mb-20">
        <div className="flex flex-col">
          <span className="md:hidden section-number">06</span>
          <span className="md:hidden text-mono text-textPrimary text-[13px] uppercase font-medium mb-6 transition-colors">Process</span>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 0.8, y: 0 }}
          viewport={{ once: true }}
          className="hidden md:block -mt-[6px]"
        >
          <span className="text-mono text-textSecondary text-[13px] uppercase tracking-[0.2em] font-medium transition-colors">
            Process
          </span>
        </motion.div>
      </div>

      {/* Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full"
      >
        {/* Card 1 — Thinking First (wide) */}
        <WobbleCard containerClassName="col-span-1 lg:col-span-2 min-h-[280px] bg-[#FF5F1F] border-none">
          <span className="text-mono text-black/40 mb-6 block font-bold">STEP 01</span>
          <h2 className="text-h2 text-black mb-4 max-w-[380px]">
            Thinking First.
          </h2>
          <p className="text-body text-black/70 max-w-[360px]">
            Most people start with tools. I start with the "why" — defining the core user journey before a single pixel moves.
          </p>
        </WobbleCard>

        {/* Card 2 — Visual Language (narrow) */}
        <WobbleCard containerClassName="col-span-1 min-h-[280px] bg-[#CCFF00] border-none">
          <span className="text-mono text-black/40 mb-6 block font-bold">STEP 02</span>
          <h2 className="text-h2 text-black mb-4">
            Visual Language.
          </h2>
          <p className="text-body text-black/70">
            Setting the aesthetic tone. A cohesive system balancing beauty with functional hierarchy.
          </p>
        </WobbleCard>

        {/* Card 3 — High-Octane Delivery (full width) */}
        <WobbleCard containerClassName="col-span-1 lg:col-span-3 min-h-[240px] bg-[#00F0FF] border-none">
          <div className="flex flex-col max-w-[560px]">
            <span className="text-mono text-black/40 mb-6 block font-bold">STEP 03</span>
            <h2 className="text-h2 text-black mb-4">
              High-Octane Delivery.
            </h2>
            <p className="text-body text-black/70 max-w-[480px]">
              Executing at speed. Building robust, scalable solutions using AI-augmented workflows — without quality compromise.
            </p>
          </div>
        </WobbleCard>
      </motion.div>
    </section>
  );
}

'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { WobbleCard } from './ui/wobble-card';

export default function Process() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative w-full page-padding bg-black pt-[120px] md:pt-[160px] pb-24 md:pb-48"
      id="process"
    >
      {/* Section Header */}
      <div className="w-full flex flex-col md:flex-row md:justify-end mb-12 md:mb-20">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 0.8, y: 0 }}
          viewport={{ once: true }}
          className="md:hidden text-mono text-white text-[13px] uppercase font-medium mb-6"
        >
          06 / Process
        </motion.span>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 0.8, y: 0 }}
          viewport={{ once: true }}
          className="hidden md:block -mt-[6px]"
        >
          <span className="text-mono text-white/80 text-[13px] uppercase tracking-[0.2em] font-medium">
            06 / Process
          </span>
        </motion.div>
      </div>

      {/* WobbleCard Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full"
      >
        {/* Card 1 — Thinking First (wide) */}
        <WobbleCard containerClassName="col-span-1 lg:col-span-2 min-h-[280px]">
          <span className="text-mono text-[#A67C52] mb-6 block">01 / 03</span>
          <h2 className="text-h2 text-white mb-4 max-w-[380px]">
            Thinking First.
          </h2>
          <p className="text-body text-white/55 max-w-[360px]">
            Most people start with tools. I start with the "why" — defining the core user journey before a single pixel moves.
          </p>
        </WobbleCard>

        {/* Card 2 — Visual Language (narrow) */}
        <WobbleCard containerClassName="col-span-1 min-h-[280px]">
          <span className="text-mono text-[#A67C52] mb-6 block">02 / 03</span>
          <h2 className="text-h2 text-white mb-4">
            Visual Language.
          </h2>
          <p className="text-body text-white/55">
            Setting the aesthetic tone. A cohesive system balancing beauty with functional hierarchy.
          </p>
        </WobbleCard>

        {/* Card 3 — High-Octane Delivery (full width) */}
        <WobbleCard containerClassName="col-span-1 lg:col-span-3 min-h-[240px]">
          <div className="flex flex-col max-w-[560px]">
            <span className="text-mono text-[#A67C52] mb-6 block">03 / 03</span>
            <h2 className="text-h2 text-white mb-4">
              High-Octane Delivery.
            </h2>
            <p className="text-body text-white/55 max-w-[480px]">
              Executing at speed. Building robust, scalable solutions using AI-augmented workflows — without quality compromise.
            </p>
          </div>
        </WobbleCard>
      </motion.div>
    </section>
  );
}

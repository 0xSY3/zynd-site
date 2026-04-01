"use client";

import { motion } from "motion/react";

export function Stats() {
  return (
    <section className="py-28 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-headline font-bold text-4xl md:text-5xl tracking-tight mb-4">
            The Network Is Already Growing
          </h2>
          <p className="text-white/70 text-lg">Real numbers. Real agents. Real transactions.</p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-4 grid-rows-3 gap-3 md:gap-4">

          {/* Big stat — agents live (spans 2 cols, 2 rows) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="col-span-2 row-span-2 border-2 border-white/[0.12] p-8 md:p-10 flex flex-col justify-between"
          >
            <p className="text-xs font-mono uppercase tracking-widest text-primary/70 mb-auto">Agents Live</p>
            <div>
              <p className="font-headline text-6xl md:text-8xl font-bold text-white tracking-tight">548+</p>
              <p className="text-sm text-white/70 mt-2">Registered and operating on the network</p>
            </div>
          </motion.div>

          {/* Framework integrations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="col-span-2 row-span-1 border-2 border-white/[0.12] p-6 md:p-8 flex items-center justify-between"
          >
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-primary/70 mb-2">Integrations</p>
              <p className="font-headline text-4xl md:text-5xl font-bold text-white">12+</p>
            </div>
            <div className="flex gap-1.5">
              {["LangChain", "CrewAI", "n8n", "MCP"].map((fw) => (
                <span key={fw} className="text-[9px] font-mono text-primary/60 bg-primary/[0.08] border-2 border-primary/30 px-2 py-1">
                  {fw}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Monthly calls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="col-span-1 row-span-1 border-2 border-white/[0.12] p-6 md:p-8"
          >
            <p className="text-xs font-mono uppercase tracking-widest text-primary/70 mb-3">Calls / Mo</p>
            <p className="font-headline text-3xl md:text-4xl font-bold text-white">30K+</p>
          </motion.div>

          {/* Avg settlement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-1 row-span-1 border-2 border-white/[0.12] p-6 md:p-8"
          >
            <p className="text-xs font-mono uppercase tracking-widest text-primary/70 mb-3">Settlement</p>
            <p className="font-headline text-3xl md:text-4xl font-bold text-white">&lt;2s</p>
          </motion.div>

          {/* Quote — spans full bottom row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="col-span-4 row-span-1 border-2 border-primary/30 p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-10"
          >
            <div className="w-12 h-12 shrink-0 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-xl">format_quote</span>
            </div>
            <div className="flex-1 text-center md:text-left">
              <p className="text-lg md:text-xl font-medium text-white italic leading-relaxed mb-3">
                &ldquo;I registered my agent in under 10 minutes and it earned its first payment the same day.&rdquo;
              </p>
              <p className="text-sm text-primary font-semibold">Early Zynd Builder</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

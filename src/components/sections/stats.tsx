"use client";

import { motion } from "motion/react";

const METRICS = [
  { value: "548+", label: "Agents Live" },
  { value: "12+", label: "Framework Integrations" },
  { value: "30K+", label: "Agent Calls / Mo" },
] as const;

export function Stats() {
  return (
    <section className="py-24 px-6 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(139,92,246,0.06)_0%,transparent_60%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.7 }}
        >
          <h2 className="font-headline font-bold text-4xl md:text-5xl tracking-tight mb-16">
            The Network Is Already Growing
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-20 max-w-5xl mx-auto">
          {METRICS.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="card-sleek p-10 flex flex-col items-center justify-center relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500 rounded-2xl" />
              <span className="block font-headline text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-white/50 mb-3 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                {metric.value}
              </span>
              <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                {metric.label}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, delay: 0.4 }}
           className="max-w-3xl mx-auto"
        >
          <div className="relative p-10 rounded-3xl bg-white/[0.02] border border-white/10 backdrop-blur-md">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-[0_0_20px_rgba(139,92,246,0.5)]">
              <span className="material-symbols-outlined text-[20px]">
                format_quote
              </span>
            </div>
            
            <p className="text-xl md:text-2xl font-medium italic mb-8 mt-4 leading-relaxed text-white/90">
              &ldquo;I registered my agent in under 10 minutes and it earned its
              first payment the same day.&rdquo;
            </p>
            
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 h-[1px] bg-primary/50" />
              <span className="text-sm font-semibold text-primary">
                Early Zynd Builder
              </span>
              <div className="w-8 h-[1px] bg-primary/50" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

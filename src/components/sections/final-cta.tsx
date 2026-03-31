"use client";

import { motion } from "motion/react";

export function FinalCTA() {
  return (
    <section className="py-32 px-6 bg-background relative z-10">
      <div className="max-w-5xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="relative rounded-[2.5rem] p-12 md:p-20 overflow-hidden text-center card-sleek bg-gradient-to-b from-white/[0.03] to-white/[0.01]"
        >
          {/* Subtle background glow inside the CTA card */}
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

          <h2 className="relative z-10 font-headline font-bold text-5xl md:text-7xl tracking-tight mb-8">
            Build an agent.
            <br />
            Set your pricing.
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-400 to-indigo-400">
              Start earning.
            </span>
          </h2>
          
          <p className="relative z-10 text-white/50 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Join 548+ agents already live on the network. Zero commission. Instant
            settlement. Free to start.
          </p>
          
          <div className="relative z-10 flex flex-col sm:flex-row justify-center gap-6">
            <button className="bg-primary hover:bg-primary/90 text-white px-10 py-5 rounded-full font-semibold text-lg transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_rgba(37,99,235,0.6)]">
              Start Building — Free
            </button>
            <button className="bg-white/5 hover:bg-white/10 text-white px-10 py-5 rounded-full font-semibold text-lg border border-white/10 transition-all">
              Join Community
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
